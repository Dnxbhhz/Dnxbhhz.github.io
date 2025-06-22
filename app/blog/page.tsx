export default function Blog() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-4xl font-bold tracking-tight text-primary">
        我的博客
      </h1>
      <p className="mt-4 text-muted-foreground">
        欢迎来到我的个人博客。这里会记录我的学习、思考和一些技术分享。
      </p>
      <div className="mt-8">
        {/* 在这里，您可以映射您的博客文章列表 */}
        <div className="py-4">
          <h2 className="text-2xl font-semibold text-accent-foreground">
            博客文章标题
          </h2>
          <p className="mt-2 text-muted-foreground">这是博客文章的摘要...</p>
          <a href="#" className="mt-2 inline-block text-primary">
            阅读更多 &rarr;
          </a>
        </div>
        {/* 更多文章... */}
      </div>
    </div>
  )
}
