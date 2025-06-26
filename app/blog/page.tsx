import Link from 'next/link'
import { getAllPostsMeta } from '@/lib/postCache'
import React from 'react'

export default function Blog() {
  const allPosts = getAllPostsMeta()

  return (
    <div className="mx-auto max-w-3xl px-4">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-primary">
        我的博客
      </h1>

      <ul className="space-y-8">
        {allPosts.map(({ slug, title, date, summary }) => (
          <li
            key={slug}
            className="rounded-lg border p-6 transition-all hover:bg-secondary">
            <Link href={`/blog/${slug}`} className="block">
              <p className="text-sm text-muted-foreground">
                {new Date(date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-accent-foreground">
                {title}
              </h2>
              <p className="mt-3 text-muted-foreground">{summary}</p>
              <span className="mt-4 inline-block font-medium text-primary">
                阅读更多 &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
