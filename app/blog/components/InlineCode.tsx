import React from 'react'

export default function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={
        'not-prose bg-gray-100 text-[color:var(--my-purple)] px-1 rounded ' +
        (props.className ?? '')
      }
      {...props}
    />
  )
}
