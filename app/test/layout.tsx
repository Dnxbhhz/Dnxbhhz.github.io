import React from 'react'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full px-4 w-full">
      <main className="pt-5 w-full">{children}</main>
    </div>
  )
}
