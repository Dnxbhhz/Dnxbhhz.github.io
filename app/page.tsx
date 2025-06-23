export default function Home() {
  return (
    <section className="container grid items-center gap-6 px-4 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          欢迎来到我的网站
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          这是一个使用 Next.js 和 magic-ui 构建的现代化网站。
          <br />
          在这里我会分享我的项目和博客。
        </p>

        <div className="prose dark:prose-invert">
          <h1>Prose 测试</h1>
          <p>这是一段测试文本。</p>
          <pre>
            <code>{`console.log('hello world')`}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
