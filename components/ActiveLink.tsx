'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ActiveLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <Link
      href={href}
      className={
        'block rounded px-2 py-1 text-sm hover:bg-accent' +
        (isActive ? ' bg-accent font-bold' : '')
      }>
      {children}
    </Link>
  )
}
