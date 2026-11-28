/**
 * Canonical key for an external-link preview.
 *
 * The hover card looks thumbnails up with this same function, so a URL
 * stored at build time matches `anchor.href` in the browser. `new URL`
 * adds a trailing slash to bare origins and sorts nothing else, which is
 * what HTML anchor elements already do.
 */
export function previewKey(href: string): string | null {
  try {
    const url = new URL(href)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    return url.href
  } catch {
    return null
  }
}
