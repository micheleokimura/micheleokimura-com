import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

// Cover-and-details block for the book case studies at /projects/<slug>. Sits
// directly under the hero, before the golden-thread callout.
//
// Companion to the shared pieces in CaseStudyLayout.tsx, kept separate because
// only the book pages need a cover plus a publication record. Books with no
// cover art yet render a titled placeholder; drop the file in
// /public/images/books and pass `cover` when art lands.

const COVER_SIZES = '(max-width: 1024px) 16rem, 20rem'

export function BookFacts({
  title,
  cover,
  badge,
  details,
  children,
}: {
  title: string
  cover?: string
  /** Pill for unreleased titles, e.g. "Coming Spring 2027". */
  badge?: string
  details: readonly { label: string; value: string }[]
  children?: React.ReactNode
}) {
  return (
    <Container className="mt-4 sm:mt-8">
      <FadeIn className="grid grid-cols-1 gap-10 lg:grid-cols-[20rem_1fr] lg:gap-16">
        <div className="mx-auto w-full max-w-[16rem] lg:mx-0 lg:max-w-none">
          {cover ? (
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-900/5">
              <Image
                src={cover}
                alt={`Cover of ${title}`}
                fill
                sizes={COVER_SIZES}
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="flex aspect-[3/4] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center">
              <span className="font-display text-lg leading-tight font-semibold tracking-tight text-neutral-500">
                {title}
              </span>
              <span className="mt-3 text-xs tracking-widest text-neutral-400 uppercase">
                Cover coming soon
              </span>
            </div>
          )}
        </div>

        <div>
          {badge ? (
            <span className="inline-flex items-center rounded-full bg-[var(--color-brand-orange)] px-3 py-1 text-xs font-semibold tracking-widest text-[var(--color-cta-ink)] uppercase">
              {badge}
            </span>
          ) : null}

          <div className={badge ? 'mt-6' : undefined}>
            <h2 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
              Details
            </h2>
            <dl className="mt-4 border-t border-neutral-200">
              {details.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between gap-6 border-b border-neutral-200 py-3"
                >
                  <dt className="text-sm font-medium text-neutral-500">
                    {row.label}
                  </dt>
                  <dd className="text-right text-sm text-neutral-900">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {children ? (
            <div className="mt-6 text-base leading-7 text-neutral-700">
              {children}
            </div>
          ) : null}
        </div>
      </FadeIn>
    </Container>
  )
}
