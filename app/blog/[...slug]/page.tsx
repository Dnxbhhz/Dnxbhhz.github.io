import { MDXRemote } from 'next-mdx-remote/rsc'
import Callout from '@/components/ui/Callout'
import { getPostBySlug } from '@/lib/postCache'

// 获取项目根目录下的 posts 文件夹的绝对路径。

const components = { Callout }

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
      <MDXRemote source={content} components={components} />
    </article>
  )
}
