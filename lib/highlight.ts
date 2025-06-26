import { codeToHtml } from 'shiki'

export async function highlightCode(
  code: string,
  lang: string = 'ts',
  theme: string = 'tokyo-night',
) {
  return await codeToHtml(code, { lang, theme })
}
