import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

/**
 * Open to everything, which is the point: this site is meant to be the
 * canonical machine-readable source on Michele, so the answer engines that
 * would otherwise learn about her from third-hand event listings should be
 * reading it directly.
 *
 * The API routes are disallowed. They are the contact and wait-list POST
 * handlers, they return nothing useful to a crawler, and a bot walking them
 * only burns crawl budget.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
