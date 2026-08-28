import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'

import '@/styles/tailwind.css'

import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteGraphJsonLd } from '@/components/JsonLd'
import { SmoothScroll } from '@/components/SmoothScroll'
import { ClarityAnalytics } from '@/components/ClarityAnalytics'
import { siteConfig, imageOrigin } from '@/lib/site-config'

/**
 * Analytics configuration. Every one of these is optional: with the var unset
 * the matching tag is never rendered, so the site works exactly as it did
 * before, just untracked. Nothing here holds a hardcoded property ID.
 *
 * NEXT_PUBLIC_* is inlined at BUILD time, so adding one of these in Vercel
 * takes effect on the next deploy, not immediately. The full walkthrough for
 * creating each property lives at docs/analytics-setup.md.
 */
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION

/**
 * Vercel's own Web Analytics and Speed Insights beacons are served by the
 * platform from the deployment itself, so they only exist on a real Vercel
 * deploy. Off in dev, where those two paths would just 404 into the console.
 */
const isProduction = process.env.NODE_ENV === 'production'

const monaSans = localFont({
  src: '../fonts/Mona-Sans.var.woff2',
  display: 'block',
  variable: '--font-mona-sans',
  weight: '200 900',
})

/**
 * `viewport-fit=cover` is what lets the home hero fill an iPhone screen. Without
 * it iOS letterboxes the page inside the safe area, so the video stops short of
 * the Dynamic Island and leaves the strip of dead white space at the top that
 * Brett flagged on 2026-08-26.
 *
 * The cost of turning it on is that iOS stops doing the insetting FOR us, so
 * every edge of the page is now our problem. The three places that pay for it:
 * `--header-offset` in tailwind.css (top), `.gutter-x` (sides, landscape only),
 * and the footer's bottom bar (the home indicator). Nothing else on the site
 * touches an edge.
 *
 * No `themeColor`. The top of the page is navy on the home hero and band-1 on
 * every other route, so a single tint would be wrong on one of them, and the
 * site has shipped without one until now. If it is ever added, it has to be
 * per-route rather than here.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s · ${siteConfig.brand}`,
    default: `Speaker, Author, and Writing Coach · ${siteConfig.brand}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    title: `Speaker, Author, and Writing Coach · ${siteConfig.brand}`,
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
        url: `${imageOrigin}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.brand}, speaker, author, and writing coach`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Speaker, Author, and Writing Coach · ${siteConfig.brand}`,
    description: siteConfig.description,
    images: [`${imageOrigin}${siteConfig.ogImage}`],
  },
  alternates: {
    canonical: '/',
  },
  /**
   * Google Search Console's meta-tag verification. Next renders this as
   * <meta name="google-site-verification" content="..."> in the head. Left
   * undefined the key is dropped entirely and no tag is emitted, which is what
   * we want until Michele has pulled a token from Search Console.
   *
   * Verification has to stay in place permanently. Google re-checks it, and
   * removing the token later un-verifies the property.
   */
  verification: gscVerification ? { google: gscVerification } : undefined,
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
        <SmoothScroll>
          <SiteHeader />
          {/* The header is absolutely positioned, so this pad is what keeps
              page content out from under it. It tracks the header's height:
              py-3 + a ~42px row lands the bar at roughly 66px, py-4 at 74px.
              Cut from pt-28/sm:pt-32 on 2026-08-23 when the header padding
              came down. Re-measure both together.

              The literal pt-20 / sm:pt-24 moved into --header-offset in
              tailwind.css on 2026-08-26, unchanged apart from the notch inset
              added to it. It is a variable now because the home hero has to
              pull itself back up by exactly this amount to reach the top of
              the screen, and the two numbers cannot be allowed to drift. */}
          <main id="main" className="flex-auto pt-[var(--header-offset)]">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>

        {/* Analytics. All of it mounts last, after the page content, and all
            of it is afterInteractive, so none of it is on the render path. */}

        {isProduction ? (
          <>
            <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
            <Script src="/_vercel/speed-insights/script.js" strategy="afterInteractive" />
          </>
        ) : null}

        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`}
            </Script>
          </>
        ) : null}

        <ClarityAnalytics />
      </body>
    </html>
  )
}
