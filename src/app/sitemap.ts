import type { MetadataRoute } from 'next'
import { siteConfig, authoredWorks } from '@/lib/site-config'
import { getPublishableSlugs } from '@/lib/case-studies'
import { getAllPostSlugs } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const routes = ['/', '/about', '/works', '/how-it-works', '/coaching', '/speak', '/case-studies', '/resources', '/contact']

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

  return [...baseEntries, ...worksEntries, ...caseStudyEntries, ...postEntries]
}
