import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: ['./**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: '#f6f8fa',
              color: '#24292f',
              borderRadius: '0.375rem',
              padding: '1em',
              fontSize: '0.95em',
              lineHeight: '1.6',
              overflowX: 'auto',
              border: '1px solid #d0d7de',
            },
            code: {
              color: '#24292f',
              backgroundColor: '#f6f8fa',
              padding: '0.2em 0.4em',
              borderRadius: '0.3em',
              fontSize: '0.95em',
              fontWeight: 'normal',
              border: '1px solid #d0d7de',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: 0,
              border: 'none',
              borderRadius: 0,
            },
            blockquote: {
              borderLeft: '4px solid #d0d7de',
              color: '#6a737d',
              backgroundColor: '#f6f8fa',
              paddingLeft: '1em',
              fontStyle: 'normal',
            },
            'h1, h2, h3, h4': {
              fontWeight: '700',
              borderBottom: '1px solid #d0d7de',
              paddingBottom: '0.3em',
              marginBottom: '0.5em',
            },
            'ul, ol': {
              paddingLeft: '1.5em',
            },
            table: {
              borderCollapse: 'collapse',
              width: '100%',
              fontSize: '0.95em',
            },
            'th, td': {
              border: '1px solid #d0d7de',
              padding: '0.4em 0.8em',
            },
            tr: {
              backgroundColor: '#fff',
            },
            'tr:nth-child(even)': {
              backgroundColor: '#f6f8fa',
            },
          },
        },
        invert: {
          css: {
            pre: {
              backgroundColor: '#161b22',
              color: '#c9d1d9',
              border: '1px solid #30363d',
            },
            code: {
              color: '#c9d1d9',
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              border: 'none',
            },
            blockquote: {
              borderLeft: '4px solid #30363d',
              color: '#8b949e',
              backgroundColor: '#161b22',
            },
            'h1, h2, h3, h4': {
              color: '#c9d1d9',
              borderBottom: '1px solid #30363d',
            },
            'th, td': {
              border: '1px solid #30363d',
            },
            tr: {
              backgroundColor: '#0d1117',
            },
            'tr:nth-child(even)': {
              backgroundColor: '#161b22',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}
export default config
