import type { ReactNode } from 'react'

export default function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 flex items-center rounded-lg border border-l-4 border-primary/50 bg-secondary p-4 text-secondary-foreground">
      <div className="mr-4 text-2xl">💡</div>
      <div>{children}</div>
    </div>
  )
}
