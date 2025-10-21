'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    Busuanzi?: { fetch: () => void }
  }
}

export default function BusuanziReporter() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Busuanzi) {
      window.Busuanzi.fetch()
    }
  }, [pathname])

  return null
}
