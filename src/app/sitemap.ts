import type { MetadataRoute } from 'next'
import { siteConfig, authoredWorks } from '@/lib/site-config'
import { getPublishableSlugs } from '@/lib/case-studies'
import { projectRoutes } from '@/lib/projects'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'

/**
 * Priority is a RELATIVE ranking within this one site, not a score Google
 * compares across domains. The ordering below says: the home page first, then
 * the four pages that carry Michele's four hats, then the work itself.
 */
const PRIORITY = {
  home: 1.0,
  topLevel: 0.9,
  secondary: 0.8,
  caseStudy: 0.7,
  post: 0.6,
} as const

/**
 * The four hats plus home. `/coach` and `/speaker` replaced `/coaching` and
 * `/speak` on 2026-08-23; the old paths 301 in next.config.ts and are
 * deliberately absent here, because a sitemap should only ever list canonical
 * URLs. Listing a redirecting URL is a crawl error.
 */
const TOP_LEVEL = ['/coach', '/author', '/speaker', '/about']
const SECONDARY = ['/works', '/projects', '/case-studies', '/resources', '/how-it-works', '/contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const baseEntries: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified, changeFrequency: 'weekly', priority: PRIORITY.home },
    ...TOP_LEVEL.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: PRIORITY.topLevel,
    })),
    ...SECONDARY.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: PRIORITY.secondary,
    })),
  ]

  // Project case studies: the story behind each thing Michele built. Routes are
  // listed in src/lib/projects.ts so the index, the links, and this file move
  // together. '/projects' itself is already in SECONDARY above.
  const projectEntries: MetadataRoute.Sitemap = projectRoutes
    .filter((route) => route !== '/projects')
    .map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: PRIORITY.caseStudy,
    }))

  const worksEntries: MetadataRoute.Sitemap = authoredWorks.map((work) => ({
    url: `${siteConfig.url}/works/${work.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: PRIORITY.caseStudy,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = getPublishableSlugs().map((slug) => ({
    url: `${siteConfig.url}/case-studies/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: PRIORITY.caseStudy,
  }))

  // Posts carry their OWN publication date as lastmod rather than "now".
  // Stamping every URL with today's date is the single most common sitemap
  // mistake: it tells a crawler the whole site changed daily, and once that
  // proves false the lastmod signal stops being trusted at all.
  const postEntries: MetadataRoute.Sitemap = await Promise.all(
    getAllPostSlugs().map(async (slug) => {
      const post = await getPostBySlug(slug)
      const date = post?.date ? new Date(post.date) : null
      return {
        url: `${siteConfig.url}/resources/${slug}`,
        lastModified: date && !Number.isNaN(date.getTime()) ? date : lastModified,
        changeFrequency: 'yearly' as const,
        priority: PRIORITY.post,
      }
    }),
  )

  return [
    ...baseEntries,
    ...projectEntries,
    ...worksEntries,
    ...caseStudyEntries,
    ...postEntries,
  ]
}
