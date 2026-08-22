import type { Metadata } from 'next'
import localFont from 'next/font/local'

import '@/styles/tailwind.css'

import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { OrganizationJsonLd, AllBooksJsonLd } from '@/components/JsonLd'
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
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brand} · Speaker, author, and coach`,
    description: siteConfig.description,
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
      <body className="flex min-h-full flex-col font-sans text-[var(--color-cta-ink)] selection:bg-[var(--color-cta)] selection:text-[var(--color-cta-ink)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-neutral-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <OrganizationJsonLd />
        <AllBooksJsonLd />
        <WaitListProvider>
          <SmoothScroll>
            <SiteHeader />
            <main id="main" className="flex-auto pt-28 sm:pt-32">
              {children}
            </main>
            <SiteFooter />
          </SmoothScroll>
        </WaitListProvider>
      </body>
    </html>
  )
}
