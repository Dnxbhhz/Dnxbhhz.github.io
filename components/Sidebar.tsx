import { getDocTree, DocNode } from '@/lib/getDocTree'
import ActiveLink from './ActiveLink'

function Tree({ tree, base = '/blog' }: { tree: DocNode[]; base?: string }) {
  return (
    <ul className="pl-2">
      {tree.map((node) =>
        node.type === 'folder' ? (
          <li key={node.path} className="mb-2">
            <div className="font-bold text-sm text-muted-foreground mb-1">
              {node.name}
            </div>
            <Tree tree={node.children || []} base={base} />
          </li>
        ) : (
          <li key={node.path}>
            <ActiveLink href={`${base}/${node.path}`}>{node.name}</ActiveLink>
          </li>
        ),
      )}
    </ul>
  )
}

export default function Sidebar() {
  const tree = getDocTree()
  return (
    <aside className="sticky top-[88px] h-[calc(100vh-88px)] w-64 shrink-0 border-r bg-background/80 p-4 overflow-y-auto">
      <h2 className="mb-4 text-lg font-semibold">文档导航</h2>
      <Tree tree={tree} />
    </aside>
  )
}
