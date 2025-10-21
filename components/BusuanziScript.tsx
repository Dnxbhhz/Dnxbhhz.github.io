'use client'

import Script from 'next/script'

declare global {
  interface Window {
    Busuanzi?: { fetch: () => void }
  }
}

export default function BusuanziScript() {
  return (
    <Script
      src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          window.Busuanzi?.fetch?.()
        } catch {}
      }}
    />
  )
}
