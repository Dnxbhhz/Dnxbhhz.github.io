import Sidebar from '@/components/Sidebar'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="grow pt-22">{children}</main>
    </div>
  )
}
