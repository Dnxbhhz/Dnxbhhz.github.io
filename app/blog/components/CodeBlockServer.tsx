// app/blog/components/CodeBlockServer.tsx
import { highlightCode } from '@/lib/highlight'
import CopyButtonClient from './CopyButtonClient'

export default async function CodeBlockServer({
  code,
  language,
}: {
  code: string
  language: string
}) {
  const html = await highlightCode(code, language)

  // 嵌套一个客户端组件用于复制按钮
  return (
    <div className="relative group my-4">
      <pre className="rounded p-4 overflow-x-auto text-sm">
        <code
          className={language ? `language-${language}` : ''}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
      <CopyButtonClient code={code} />
    </div>
  )
}
