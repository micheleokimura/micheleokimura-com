import type { Metadata } from 'next'
import Script from 'next/script'
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

// GA4 measurement ID. Set NEXT_PUBLIC_GA_ID in Vercel env vars once Michele
// provides one. Left unset -> GA snippet is skipped. Vercel Web Analytics is
// separate and loads off /_vercel/insights/script.js below.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

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
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.brand} - speaker, author, and coach`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brand} · Speaker, author, and coach`,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${monaSans.variable} h-full bg-white text-base antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-neutral-950 selection:bg-[var(--color-cta)] selection:text-neutral-950">
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

        {/* Vercel Web Analytics (manual injection). Enable Analytics in the
            Vercel dashboard for this project; the script is served from
            /_vercel/insights/script.js on the same origin, so no third-party
            request and no npm dep. */}
        <Script
          src="/_vercel/insights/script.js"
          strategy="afterInteractive"
          defer
          data-endpoint="/_vercel/insights"
        />

        {/* Google Analytics 4. Skipped unless NEXT_PUBLIC_GA_ID is set in env. */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}
