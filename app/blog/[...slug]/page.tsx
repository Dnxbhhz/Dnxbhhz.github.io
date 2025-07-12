import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import Callout from '@/components/ui/Callout'
import { getPostBySlug, getAllPostsMeta } from '@/lib/postCache'
import InlineCode from '@/app/blog/components/InlineCode'
import dynamic from 'next/dynamic'
import remarkGfm from 'remark-gfm'

const CodeBlockServer = dynamic(
  () => import('@/app/blog/components/CodeBlockServer'),
  { ssr: true },
)

// 获取项目根目录下的 posts 文件夹的绝对路径。

const components = {
  Callout,
  code: (props: React.HTMLAttributes<HTMLElement>) => <InlineCode {...props} />,
  pre: async (props: React.HTMLAttributes<HTMLElement>) => {
    let code = ''
    let language = ''
    if (
      props.children &&
      typeof props.children === 'object' &&
      'props' in props.children
    ) {
      const codeElement = props.children as React.ReactElement<{
        className?: string
        children?: string
      }>
      code = codeElement.props.children || ''
      language = codeElement.props.className?.replace('language-', '') || ''
    }
    return <CodeBlockServer code={code} language={language} />
  },
}

export async function generateStaticParams() {
  const posts = getAllPostsMeta() // 从缓存获取所有文章元数据

  // 将文章元数据转换为 generateStaticParams 需要的格式
  return posts.map((post) => ({
    slug: post.slug.split('/'), // 将 'devlog/my-post' 这样的 slug 转换为 ['devlog', 'my-post']
  }))
}

export default async function BlogDocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const slugArr = Array.isArray(slug) ? slug : [slug]
  const slugStr = slugArr.map((s) => decodeURIComponent(s)).join('/')
  const post = getPostBySlug(slugStr)
  if (!post) throw new Error('Not found: ' + slugStr)

  const { content, title, date } = post
  const mdx = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  })

  return (
    <article className="prose prose-zinc mx-auto max-w-3xl dark:prose-invert">
      <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">
        {date &&
          new Date(date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
      </p>
      {mdx.content}
    </article>
  )
}
