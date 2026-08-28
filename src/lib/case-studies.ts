import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

// Case studies are markdown under src/content/case-studies/. The FILENAME stem is
// the canonical slug (the wiring-contract join key with the logo registry +
// /case-studies/<slug> URL), regardless of any org-slug in frontmatter.
//
// Public tile loop = files where ready-to-publish && !nda-flagged && not "_"-prefixed.
// `_aggregate-nda-engagements.md` is consumed only as approved aggregate framing.

const DIR = path.join(process.cwd(), 'src/content/case-studies')

export type CaseStudyMeta = {
  slug: string
  orgName: string
  engagementType: string
  heroHeadline: string
  completionDate: string
  readyToPublish: boolean
  ndaFlagged: boolean
  endorsementsPending: boolean
}

export type CaseStudy = CaseStudyMeta & { contentHtml: string }

// Strongest-credibility-forward order (case-studies INDEX recommendation).
const ORDER = [
  'hawaii-baptist-academy',
  'hawaii-doe-counselor-plc-maui',
  'asu-office-of-sex-trafficking-intervention-research',
  'leeward-community-church',
  'first-assembly-of-god',
]

function metaFrom(slug: string, data: Record<string, unknown>): CaseStudyMeta {
  return {
    slug,
    orgName: String(data['org-name'] ?? slug),
    engagementType: String(data['engagement-type'] ?? ''),
    heroHeadline: String(data['hero-headline'] ?? ''),
    completionDate: String(data['completion-date'] ?? ''),
    readyToPublish: data['ready-to-publish'] !== false,
    ndaFlagged: Boolean(data['nda-flagged']),
    endorsementsPending: Boolean(data['endorsements-pending']),
  }
}

function readRaw(slug: string): string | null {
  const file = path.join(DIR, `${slug}.md`)
  if (!fsSync.existsSync(file)) return null
  return fsSync.readFileSync(file, 'utf8')
}

/** Slugs that render as public case-study pages (published, non-NDA, non "_"). */
export function getPublishableSlugs(): string[] {
  if (!fsSync.existsSync(DIR)) return []
  const slugs = fsSync
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => f.replace(/\.md$/, ''))
    .filter((slug) => {
      const raw = readRaw(slug)
      if (!raw) return false
      const m = metaFrom(slug, matter(raw).data)
      return m.readyToPublish && !m.ndaFlagged
    })
  // Sort by ORDER first, then anything else alphabetically.
  return slugs.sort((a, b) => {
    const ia = ORDER.indexOf(a)
    const ib = ORDER.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
}

export function getPublishableCaseStudies(): CaseStudyMeta[] {
  return getPublishableSlugs().map((slug) => metaFrom(slug, matter(readRaw(slug)!).data))
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const raw = readRaw(slug)
  if (!raw) return null
  const { data, content } = matter(raw)
  // Strip the leading H1 (title is rendered from frontmatter via PageIntro).
  const body = content.replace(/^\s*#\s.*(\r?\n)+/, '')
  const processed = await remark().use(remarkHtml).process(body)
  return { ...metaFrom(slug, data), contentHtml: processed.toString() }
}

/** Approved aggregate framing for NDA-flagged engagements (About / collection intro). */
export async function getNdaAggregateHtml(): Promise<string | null> {
  const raw = readRaw('_aggregate-nda-engagements')
  if (!raw) return null
  const body = matter(raw).content.replace(/^\s*#\s.*(\r?\n)+/, '')
  const processed = await remark().use(remarkHtml).process(body)
  return processed.toString()
}
