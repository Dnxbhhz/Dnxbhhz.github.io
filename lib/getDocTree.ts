import fs from 'fs'
import path from 'path'

export type DocNode = {
  type: 'folder' | 'file'
  name: string
  path: string
  children?: DocNode[]
}

export function getDocTree(dir = 'posts', basePath = ''): DocNode[] {
  const fullPath = path.join(process.cwd(), dir)
  if (!fs.existsSync(fullPath)) return []
  return fs
    .readdirSync(fullPath)
    .map((name) => {
      const filePath = path.join(fullPath, name)
      const relPath = path.join(basePath, name)
      const stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        return {
          type: 'folder',
          name,
          path: relPath,
          children: getDocTree(path.join(dir, name), relPath),
        }
      } else if (stat.isFile() && name.endsWith('.mdx')) {
        return {
          type: 'file',
          name: name.replace(/\.mdx$/, ''),
          path: relPath.replace(/\.mdx$/, ''),
        }
      }
      return undefined
    })
    .filter(Boolean) as DocNode[]
}
