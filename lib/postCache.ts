import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')
type PostMeta = { title: string; date: string; summary: string; slug: string }
type PostData = PostMeta & { content: string }

const postCache = new Map<string, PostData>()

function loadAllPosts(dir = postsDirectory, baseSlug = ''): PostData[] {
  const entries = fs.readdirSync(dir)
  let allPosts: PostData[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      allPosts = allPosts.concat(
        loadAllPosts(fullPath, path.join(baseSlug, entry)),
      )
    } else if (stat.isFile() && entry.endsWith('.mdx')) {
      const slug = path
        .join(baseSlug, entry.replace(/\.mdx$/, ''))
        .replace(/\\/g, '/')
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const post: PostData = {
        ...(data as PostMeta),
        slug,
        content,
      }
      postCache.set(slug, post)
      allPosts.push(post)
    }
  }
  return allPosts
}

// 初始化时加载所有文章
const allPosts = loadAllPosts()

export function getAllPostsMeta(): PostMeta[] {
  return allPosts.map(({ ...meta }) => meta)
}

export function getPostBySlug(slug: string): PostData | undefined {
  return postCache.get(slug)
}
