'use client'
import { useState } from 'react'
import { Clipboard, Check } from 'lucide-react'

export default function CopyButtonClient({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert('复制失败，请手动复制')
    }
  }

  return (
    <button
      className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200 transition shadow group-hover:opacity-100 opacity-80"
      onClick={handleCopy}
      type="button"
      aria-label="复制代码">
      {copied ? (
        <Check className="text-[color:var(--my-purple)]" size={18} />
      ) : (
        <Clipboard className="text-gray-500" size={18} />
      )}
    </button>
  )
}
