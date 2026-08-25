import type { Metadata } from 'next'
import localFont from 'next/font/local'

import '@/styles/tailwind.css'

import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteGraphJsonLd } from '@/components/JsonLd'
import { SmoothScroll } from '@/components/SmoothScroll'
import { WaitListProvider } from '@/components/wait-list/WaitListProvider'
import { siteConfig } from '@/lib/site-config'

const monaSans = localFont({
  src: '../fonts/Mona-Sans.var.woff2',
  display: 'block',
  variable: '--font-mona-sans',
  weight: '200 900',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s · ${siteConfig.brand}`,
    default: `${siteConfig.brand} · Speaker, author, and coach`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    title: `${siteConfig.brand} · Speaker, author, and coach`,
    description: siteConfig.description,
    siteName: siteConfig.brand,
    locale: 'en_US',
    url: siteConfig.url,
    /**
     * The sitewide fallback card. Every route that builds its metadata through
     * pageMetadata() sets its own copy of this, so what inherits from here is
     * the home page plus anything that ever forgets to. Without it a scraper
     * picks its own image off the page, which is how a State of Hawai'i seal
     * ended up as the preview in iMessage.
     */
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.brand}, speaker, author, and writing coach`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brand} · Speaker, author, and coach`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${monaSans.variable} h-full bg-white text-base antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-[var(--color-ink)] selection:bg-[var(--color-cta)] selection:text-[var(--color-cta-ink)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-neutral-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <SiteGraphJsonLd />
        <WaitListProvider>
          <SmoothScroll>
            <SiteHeader />
            {/* The header is absolutely positioned, so this pad is what keeps
                page content out from under it. It tracks the header's height:
                py-3 + a ~42px row lands the bar at roughly 66px, py-4 at 74px.
                Cut from pt-28/sm:pt-32 on 2026-08-23 when the header padding
                came down. Re-measure both together. */}
            <main id="main" className="flex-auto pt-20 sm:pt-24">
              {children}
            </main>
            <SiteFooter />
          </SmoothScroll>
        </WaitListProvider>
      </body>
    </html>
  )
}
