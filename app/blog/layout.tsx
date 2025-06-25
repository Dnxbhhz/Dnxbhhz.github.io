import Sidebar from '@/components/Sidebar'
import { getDocTree } from '@/lib/getDocTree'
import React from 'react'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tree = getDocTree()

  return (
    <div className="flex min-h-screen">
      <Sidebar tree={tree} />
      <main className="flex-1 pt-22 min-w-0">{children}</main>
    </div>
  )
}
