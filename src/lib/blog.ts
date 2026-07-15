import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

// Blog / Resources content. Markdown files live in src/content/blog/*.md with
// frontmatter: title, date (YYYY-MM-DD), excerpt, optional featured, tags.
// Researched posts (e.g. the Hawaii Governor award article) are dropped in here.

export type PostMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  featured: boolean
  tags: string[]
}

export type Post = PostMeta & { contentHtml: string }

const DIR = path.join(process.cwd(), 'src/content/blog')

export function getAllPostSlugs(): string[] {
  if (!fsSync.existsSync(DIR)) return []
  return fsSync
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    excerpt: String(data.excerpt ?? data.tldr ?? ''),
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const file = path.join(DIR, `${slug}.md`)
  if (!fsSync.existsSync(file)) return null
  const raw = await fs.readFile(file, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkHtml).process(content)
  return { ...toMeta(slug, data), contentHtml: processed.toString() }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = getAllPostSlugs()
  const metas = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await fs.readFile(path.join(DIR, `${slug}.md`), 'utf8')
      return toMeta(slug, matter(raw).data)
    }),
  )
  return metas.sort((a, z) => (z.date > a.date ? 1 : z.date < a.date ? -1 : 0))
}
