import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { BannerHero } from '@/components/BannerHero'
import { BraveSeriesCovers } from '@/components/BraveSeriesCovers'
import {
  AvailableAt,
  Cover,
  Endorsements,
  Forthcoming,
} from '@/components/AuthorBookParts'
import { WebPageJsonLd } from '@/components/JsonLd'
import {
  AUTHOR_BOOKS,
  AUTHOR_EDITION_LABELS,
  getAuthorBook,
} from '@/lib/author-books'
import { pageMetadata } from '@/lib/schema'

/**
 * A single title from the Author shelf.
 *
 * These pages exist because /author became a grid of tiles on 2026-08-23. The
 * long copy that used to run down that page in two-column blocks lives here
 * now, one title per URL, and the tile is the way in.
 *
 * Every word on this page comes from src/lib/author-books.ts. Nothing is
 * written here, and nothing should be: endorser quotes are verbatim, and the
 * three Brave Series titles are carrying deliberately thin descriptions with a
 * TODO on them rather than copy invented to fill the space.
 *
 * ENDORSEMENTS. A title with no endorsements renders no endorsement section at
 * all. It does not borrow a quote from a sibling title, and it does not print
 * an empty heading. When Michele supplies quotes for the 21-Day Journal or the
 * three Brave Series titles, add them to the record and the section appears.
 */

export function generateStaticParams() {
  return AUTHOR_BOOKS.map((book) => ({ slug: book.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const book = getAuthorBook(slug)
  if (!book) return {}

  return pageMetadata({
    title: book.title,
    description: book.teaser,
    path: `/author/books/${book.slug}`,
    type: 'article',
    image: book.cover,
  })
}

function Panel({
  heading,
  body,
  items,
}: {
  heading: string
  body?: string
  items?: string[]
}) {
  return (
    <div className="mt-8 rounded-3xl bg-[var(--color-band-2)] p-6 ring-1 ring-[var(--color-navy-10)] sm:p-8">
      <h2 className="font-display text-xs font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
        {heading}
      </h2>
      {body ? (
        <p className="mt-4 text-base leading-7 text-neutral-700">{body}</p>
      ) : null}
      {items ? (
        <ul role="list" className="mt-5 space-y-4">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-teal)]"
              />
              <span className="text-base leading-7 text-neutral-800">
                {item}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default async function AuthorBookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = getAuthorBook(slug)
  if (!book) notFound()

  return (
    <>
      <WebPageJsonLd
        path={`/author/books/${book.slug}`}
        name={`${book.title} by Michele Okimura`}
        description={book.teaser}
      />

      <BannerHero eyebrow="Author" title={book.title} subtitle={book.meta} />

      <Container className="py-12 sm:py-16 lg:py-20">
        <FadeIn className="grid grid-cols-1 gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16">
          <div className="mx-auto w-full max-w-[14rem] lg:mx-0 lg:max-w-none">
            <Cover
              src={book.cover}
              alt={book.coverAlt}
              sizes="(max-width: 1024px) 14rem, 18rem"
              priority
            />
          </div>

          <div>
            {book.forthcoming ? (
              <div className="mb-5">
                <Forthcoming label={book.forthcoming} />
              </div>
            ) : null}

            {book.pullQuote ? (
              <p className="font-display mb-6 text-xl leading-8 text-neutral-800 italic sm:text-2xl">
                {book.pullQuote}
              </p>
            ) : null}

            <div className="space-y-5 text-lg leading-8 text-neutral-700">
              {book.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {book.notes?.length ? (
              <div className="mt-5 space-y-3">
                {book.notes.map((note) => (
                  <p
                    key={note}
                    className="text-base leading-7 text-neutral-600 italic"
                  >
                    {note}
                  </p>
                ))}
              </div>
            ) : null}

            {book.panel ? (
              <Panel
                heading={book.panel.heading}
                body={book.panel.body}
                items={book.panel.items}
              />
            ) : null}

            {book.list ? (
              <div className="mt-10">
                <h2 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                  {book.list.label}
                </h2>
                {book.list.note ? (
                  <p className="mt-2 text-sm text-neutral-500 italic">
                    {book.list.note}
                  </p>
                ) : null}
                <ul role="list" className="mt-5 space-y-4">
                  {book.list.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-teal)]"
                      />
                      <span className="text-base leading-7 text-neutral-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* ENDORSEMENTS. Rendered only when real, signed-off quotes exist
                for this title. The 21-Day Journal and the three Brave Series
                titles have none yet, and this space is deliberately left for
                them.
                TODO(endorsements): add to the record in lib/author-books.ts
                when Michele supplies them. Do NOT write endorsement copy. */}
            {book.endorsements?.length ? (
              <Endorsements
                items={book.endorsements}
                label={book.endorsementsLabel}
              />
            ) : null}

            {book.available?.length ? (
              <AvailableAt label={book.availableLabel} links={book.available} />
            ) : null}

            {/* Release updates. There is no launch list yet, so this routes to
                the one contact form the site has. No email address is printed
                anywhere on the site. */}
            {book.releaseUpdates ? (
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="font-display inline-flex items-center gap-1.5 text-base font-semibold text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-2 underline-offset-4 transition hover:text-[var(--color-brand-terracotta-ink)]"
                >
                  Contact Michele for release updates
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <p className="mt-2 text-sm text-neutral-500 italic">
                  Launch email list coming soon.
                </p>
              </div>
            ) : null}

            {/* The twelve volumes: four per title, Faith and Non-Faith
                alternating across each row. All 24 are deliberately not shown,
                by Michele's direction of 2026-08-23. This grid used to sit on
                /author itself; it moved here when that page became a shelf of
                tiles, because twelve covers under a tile row read as a second,
                competing shelf. Source is lib/brave-series-covers, relabelled
                for the Author wording through `editionLabels`. */}
            {book.slug === 'brave-series' ? (
              <div className="mt-14">
                <h2 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                  The twelve volumes
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
                  Four volumes in each title, shown here in a mix of the Faith
                  and Non-Faith versions. Every volume ships in both.
                </p>
                <div className="mt-8">
                  <BraveSeriesCovers editionLabels={AUTHOR_EDITION_LABELS} />
                </div>
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[var(--color-navy-10)] pt-8">
              {book.storyHref ? (
                <Link
                  href={book.storyHref}
                  className="font-display inline-flex items-center gap-1.5 text-base font-semibold text-[var(--color-brand-teal)] underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition hover:decoration-2"
                >
                  Read the story behind it
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              ) : null}
              <Link
                href="/author"
                className="font-display inline-flex items-center gap-1.5 text-base font-semibold text-neutral-700 underline decoration-[var(--color-navy)]/25 decoration-1 underline-offset-4 transition hover:text-neutral-950 hover:decoration-2"
              >
                <span aria-hidden="true">&larr;</span>
                All books and curricula
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
