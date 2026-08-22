import type { MetadataRoute } from 'next'
import { siteConfig, authoredWorks } from '@/lib/site-config'
import { getPublishableSlugs } from '@/lib/case-studies'
import { projectRoutes } from '@/lib/projects'
import { getAllPostSlugs } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const routes = ['/', '/about', '/author', '/works', '/how-it-works', '/coaching', '/speak', '/case-studies', '/resources', '/contact']

  const baseEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : route === '/works' ? 0.9 : 0.7,
  }))

  const worksEntries: MetadataRoute.Sitemap = authoredWorks.map((work) => ({
    url: `${siteConfig.url}/works/${work.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Project case studies: the story behind each thing Michele built. Routes are
  // listed in src/lib/projects.ts so the index, the links, and this file move
  // together.
  const projectEntries: MetadataRoute.Sitemap = projectRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '/projects' ? 0.8 : 0.7,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = getPublishableSlugs().map((slug) => ({
    url: `${siteConfig.url}/case-studies/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const postEntries: MetadataRoute.Sitemap = getAllPostSlugs().map((slug) => ({
    url: `${siteConfig.url}/resources/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    ...baseEntries,
    ...projectEntries,
    ...worksEntries,
    ...caseStudyEntries,
    ...postEntries,
  ]
}
