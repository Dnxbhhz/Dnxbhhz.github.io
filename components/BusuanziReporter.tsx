'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    Busuanzi?: { fetch: () => void }
  }
}

export default function BusuanziReporter() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const paramsString = searchParams ? searchParams.toString() : ''

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Busuanzi) {
      window.Busuanzi.fetch()
    }
    // 监听路径与查询参数变化，确保开启 stats=1 时能立即刷新
  }, [pathname, paramsString])

  return null
}
