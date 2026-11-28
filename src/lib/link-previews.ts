import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { previewKey } from './preview-url.ts'

/**
 * Build-time thumbnails for the external-link preview card.
 *
 * The card opens for external links inside `.note-prose`. Those links are
 * written in `src/content` (home and the notes), so that directory is the
 * whole set. Each URL gets one small WebP, named by a hash of the URL.
 *
 * Cache layers, newest `fetchedAt` wins:
 * - `public/link-previews/` is committed, so a cold build (and local dev)
 *   can skip the network.
 * - On Vercel, `.vercel/cache/link-previews/` is restored before the build
 *   and saved after a successful one. A scheduled rebuild refreshes entries
 *   older than {@link DEFAULT_TTL_DAYS} and the build cache then serves
 *   that refresh until the TTL passes again.
 *
 * Set `LINK_PREVIEW_REFRESH=1` to ignore the TTL. Set `LINK_PREVIEW_TTL_DAYS`
 * to override the window (`0` refetches every build).
 *
 * Screenshots come from microlink at build time, so the Vercel build does
 * not need a headless browser. Microlink also returns the page's og:image,
 * which is the fallback when the screenshot fails. If microlink itself
 * fails, the HTML is fetched and `og:image` / `twitter:image` is read from
 * it. When both fail, an existing thumbnail is kept; otherwise the URL is
 * omitted and the card stays in its failed state. Nothing here throws.
 */

const DEFAULT_TTL_DAYS = 7
/** Card slot is `aspect-8/5` and at most 18rem (288px) wide. 800×500 covers ~2.8×. */
const CARD_WIDTH = 800
const CARD_HEIGHT = 500
const WEBP_QUALITY = 64
const MAX_IMAGE_BYTES = 8_000_000
const PUBLIC_DIR_NAME = 'link-previews'
const MANIFEST_NAME = 'manifest.json'

type PreviewSource = 'screenshot' | 'og:image'

type PreviewEntry = {
  file: string
  fetchedAt: string
  source: PreviewSource
}

type PreviewManifest = Record<string, PreviewEntry>

type PreviewLogger = {
  info: (message: string) => void
  warn: (message: string) => void
}

type StoredPreview = {
  entry: PreviewEntry
  directory: string
}

const consoleLogger: PreviewLogger = {
  info: (message) => console.info(`[link-previews] ${message}`),
  warn: (message) => console.warn(`[link-previews] ${message}`),
}

/**
 * Read the committed manifest and return `{ pageUrl: publicPath }`.
 * Missing or unreadable cache yields an empty map, which the card treats
 * as a failed image.
 */
export function loadPreviewMap(root = process.cwd()): Record<string, string> {
  const manifest = readManifest(publicDir(root))
  const map: Record<string, string> = {}
  for (const [url, entry] of Object.entries(manifest)) {
    if (!existsSync(join(publicDir(root), entry.file))) continue
    map[url] = `/${PUBLIC_DIR_NAME}/${entry.file}`
  }
  return map
}

/** Collect, refresh, and write thumbnails. Never throws. */
export async function generateLinkPreviews(root = process.cwd(), logger: PreviewLogger = consoleLogger): Promise<void> {
  const started = Date.now()
  try {
    await refreshPreviews(root, logger)
    logger.info(`finished in ${Date.now() - started}ms`)
  } catch (error) {
    logger.warn(`skipped, build continues: ${errorMessage(error)}`)
  }
}

async function refreshPreviews(root: string, logger: PreviewLogger): Promise<void> {
  const contentDir = join(root, 'src/content')
  if (!existsSync(contentDir)) {
    logger.warn('src/content is missing; left the preview cache untouched')
    return
  }

  const urls = collectPreviewUrls(contentDir)
  const directories = previewDirs(root)
  const stored = directories.map((directory) => ({ directory, manifest: readManifest(directory) }))
  const next: PreviewManifest = {}
  let hits = 0
  let fetched = 0
  let kept = 0
  let missing = 0

  for (const url of urls) {
    const cached = freshest(url, stored)
    if (cached && !shouldRefresh(cached.entry)) {
      next[url] = cached.entry
      publish(cached, directories)
      hits += 1
      logger.info(`cache hit ${url}`)
      continue
    }

    try {
      const image = await fetchPreview(url)
      const entry: PreviewEntry = {
        file: fileNameFor(url),
        fetchedAt: new Date().toISOString(),
        source: image.source,
      }
      for (const directory of directories) {
        mkdirSync(directory, { recursive: true })
        writeIfChanged(join(directory, entry.file), image.bytes)
      }
      next[url] = entry
      fetched += 1
      logger.info(`fetched ${url} via ${image.source} (${image.bytes.length} bytes)`)
    } catch (error) {
      if (cached) {
        next[url] = cached.entry
        publish(cached, directories)
        kept += 1
        logger.warn(`refresh failed, kept ${url}: ${errorMessage(error)}`)
      } else {
        missing += 1
        logger.warn(`no preview for ${url}: ${errorMessage(error)}`)
      }
    }
  }

  for (const directory of directories) {
    prune(directory, next, logger)
    mkdirSync(directory, { recursive: true })
    writeIfChanged(join(directory, MANIFEST_NAME), Buffer.from(serializeManifest(next)))
  }
  logger.info(`${urls.length} links, ${hits} cached, ${fetched} fetched, ${kept} kept, ${missing} missing`)
}

/** External http(s) links in markdown and MDX that render as anchors. */
export function collectPreviewUrls(contentDir: string): string[] {
  const urls = new Set<string>()
  for (const file of walk(contentDir)) {
    if (!/\.(md|mdx)$/.test(file)) continue
    for (const href of extractHrefCandidates(readFileSync(file, 'utf8'))) {
      const key = previewKey(href)
      if (key) urls.add(key)
    }
  }
  return [...urls].sort()
}

function extractHrefCandidates(source: string): string[] {
  const text = stripNonLinks(source)
  const hrefs: string[] = []
  for (const match of text.matchAll(/^\s{0,3}\[[^\]]+\]:[ \t]+(\S+)/gm)) {
    hrefs.push(unwrapDefinedUrl(match[1]))
  }
  for (const match of text.matchAll(/(?<!!)\[[^\]]*\]\(\s*(https?:\/\/[^)\s]+)/g)) {
    hrefs.push(match[1])
  }
  for (const match of text.matchAll(/<(https?:\/\/[^>\s]+)>/g)) {
    hrefs.push(match[1])
  }
  for (const match of text.matchAll(/\bhref\s*=\s*(?:\{\s*)?["'](https?:\/\/[^"']+)["']/g)) {
    hrefs.push(decodeEntities(match[1]))
  }
  return hrefs
}

function stripNonLinks(source: string): string {
  const withoutFrontmatter = source.startsWith('---')
    ? source.replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
    : source
  return withoutFrontmatter
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]*`/g, '')
}

function unwrapDefinedUrl(raw: string): string {
  let url = raw.trim()
  if (url.startsWith('<') && url.endsWith('>')) url = url.slice(1, -1)
  return url
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

async function fetchPreview(url: string): Promise<{ bytes: Buffer, source: PreviewSource }> {
  const fromMicrolink = await microlinkAssets(url)
  if (fromMicrolink.screenshot) {
    try {
      return { bytes: await toCardWebp(await downloadImage(fromMicrolink.screenshot)), source: 'screenshot' }
    } catch (error) {
      console.warn(`[link-previews] screenshot unusable for ${url}: ${errorMessage(error)}`)
    }
  }

  const ogImage = fromMicrolink.image ?? await scrapeSocialImage(url)
  if (!ogImage) throw new Error('screenshot and og:image unavailable')
  return { bytes: await toCardWebp(await downloadImage(ogImage)), source: 'og:image' }
}

type MicrolinkAssets = { screenshot: string | null, image: string | null }

async function microlinkAssets(url: string): Promise<MicrolinkAssets> {
  const empty: MicrolinkAssets = { screenshot: null, image: null }
  const api = new URL('https://api.microlink.io/')
  api.searchParams.set('url', url)
  api.searchParams.set('screenshot', 'true')
  api.searchParams.set('meta', 'true')
  api.searchParams.set('screenshot.type', 'jpeg')
  api.searchParams.set('screenshot.quality', '60')
  api.searchParams.set('viewport.width', String(CARD_WIDTH))
  api.searchParams.set('viewport.height', String(CARD_HEIGHT))
  api.searchParams.set('viewport.deviceScaleFactor', '1')
  api.searchParams.set('filter', 'screenshot,image')
  api.searchParams.set('timeout', '20000')

  try {
    const response = await fetch(api, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(45_000),
    })
    if (!response.ok) throw new Error(`microlink HTTP ${response.status}`)
    const body = await response.json() as {
      status?: string
      message?: string
      data?: { screenshot?: unknown, image?: unknown }
    }
    const screenshot = assetUrl(body.data?.screenshot)
    const image = assetUrl(body.data?.image)
    if (!screenshot && !image) {
      throw new Error(body.message || `microlink ${body.status ?? 'failed'}`)
    }
    return { screenshot, image }
  } catch (error) {
    console.warn(`[link-previews] microlink failed for ${url}: ${errorMessage(error)}`)
    return empty
  }
}

function assetUrl(asset: unknown): string | null {
  if (typeof asset === 'string') return asset
  if (asset && typeof asset === 'object' && 'url' in asset && typeof asset.url === 'string') return asset.url
  return null
}

async function scrapeSocialImage(pageUrl: string): Promise<string | null> {
  const response = await fetch(pageUrl, {
    redirect: 'follow',
    headers: {
      accept: 'text/html',
      'user-agent': 'AllisonSiteLinkPreview/1.0',
    },
    signal: AbortSignal.timeout(15_000),
  })
  if (!response.ok) throw new Error(`page HTTP ${response.status}`)
  const html = await response.text()
  const wanted = new Set(['og:image', 'og:image:url', 'twitter:image', 'twitter:image:src'])
  for (const tag of html.match(/<meta\s[^>]*>/gi) ?? []) {
    const attrs = new Map<string, string>()
    for (const match of tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/gi)) {
      attrs.set(match[1].toLowerCase(), decodeEntities(match[2]))
    }
    const key = attrs.get('property') ?? attrs.get('name') ?? ''
    const content = attrs.get('content')
    if (!wanted.has(key) || !content) continue
    try {
      return new URL(content, pageUrl).href
    } catch {
      continue
    }
  }
  return null
}

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20_000) })
  if (!response.ok) throw new Error(`image HTTP ${response.status}`)
  const type = response.headers.get('content-type') ?? ''
  if (type && !type.startsWith('image/') && !type.includes('octet-stream')) {
    throw new Error(`not an image (${type})`)
  }
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length < 32) throw new Error('image too small')
  if (bytes.length > MAX_IMAGE_BYTES) throw new Error('image too large')
  return bytes
}

/**
 * Fit the card's 8:5 frame and encode WebP. Uses the `sharp` Astro already
 * installs for its image pipeline, so this project does not add a dependency.
 */
async function toCardWebp(input: Buffer): Promise<Buffer> {
  const { default: sharp } = await import('sharp')
  return sharp(input, { animated: false, limitInputPixels: 40_000_000 })
    .rotate()
    .resize(CARD_WIDTH, CARD_HEIGHT, { fit: 'cover', position: 'attention' })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer()
}

function shouldRefresh(entry: PreviewEntry): boolean {
  if (process.env.LINK_PREVIEW_REFRESH === '1') return true
  const fetchedAt = Date.parse(entry.fetchedAt)
  if (Number.isNaN(fetchedAt)) return true
  return Date.now() - fetchedAt >= ttlMs()
}

function ttlMs(): number {
  const raw = process.env.LINK_PREVIEW_TTL_DAYS
  if (raw === undefined || raw === '') return DEFAULT_TTL_DAYS * 24 * 60 * 60 * 1000
  const days = Number(raw)
  if (!Number.isFinite(days) || days < 0) return DEFAULT_TTL_DAYS * 24 * 60 * 60 * 1000
  return days * 24 * 60 * 60 * 1000
}

function freshest(url: string, stored: { directory: string, manifest: PreviewManifest }[]): StoredPreview | null {
  const found: StoredPreview[] = []
  for (const { directory, manifest } of stored) {
    const entry = manifest[url]
    if (!entry) continue
    if (!existsSync(join(directory, entry.file))) continue
    found.push({ entry, directory })
  }
  found.sort((a, b) => Date.parse(b.entry.fetchedAt) - Date.parse(a.entry.fetchedAt))
  return found[0] ?? null
}

function publish(stored: StoredPreview, directories: string[]): void {
  const bytes = readFileSync(join(stored.directory, stored.entry.file))
  for (const directory of directories) {
    mkdirSync(directory, { recursive: true })
    writeIfChanged(join(directory, stored.entry.file), bytes)
  }
}

function prune(directory: string, manifest: PreviewManifest, logger: PreviewLogger): void {
  if (!existsSync(directory)) return
  const keep = new Set(Object.values(manifest).map((entry) => entry.file))
  for (const name of readdirSync(directory)) {
    if (!/^[a-f0-9]{16}\.webp$/.test(name)) continue
    if (keep.has(name)) continue
    unlinkSync(join(directory, name))
    logger.info(`removed ${name}`)
  }
}

function previewDirs(root: string): string[] {
  const directories = [publicDir(root)]
  if (process.env.VERCEL === '1') directories.push(join(root, '.vercel/cache/link-previews'))
  return directories
}

function publicDir(root: string): string {
  return join(root, 'public', PUBLIC_DIR_NAME)
}

function readManifest(directory: string): PreviewManifest {
  try {
    const parsed = JSON.parse(readFileSync(join(directory, MANIFEST_NAME), 'utf8')) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    const manifest: PreviewManifest = {}
    for (const [url, entry] of Object.entries(parsed)) {
      if (previewKey(url) !== url || !isEntry(entry)) continue
      manifest[url] = entry
    }
    return manifest
  } catch {
    return {}
  }
}

function isEntry(value: unknown): value is PreviewEntry {
  if (!value || typeof value !== 'object') return false
  const entry = value as PreviewEntry
  return /^[a-f0-9]{16}\.webp$/.test(entry.file)
    && typeof entry.fetchedAt === 'string'
    && (entry.source === 'screenshot' || entry.source === 'og:image')
}

function serializeManifest(manifest: PreviewManifest): string {
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
  return `${JSON.stringify(sorted, null, 2)}\n`
}

function fileNameFor(url: string): string {
  return `${createHash('sha256').update(url).digest('hex').slice(0, 16)}.webp`
}

function writeIfChanged(path: string, bytes: Buffer): void {
  if (existsSync(path) && readFileSync(path).equals(bytes)) return
  writeFileSync(path, bytes)
}

function walk(directory: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...walk(path))
    else files.push(path)
  }
  return files
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

const invokedDirectly = process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(process.argv[1]).href

if (invokedDirectly) await generateLinkPreviews()
