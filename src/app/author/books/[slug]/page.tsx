import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
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

/**
 * A headed block of bold-labelled points. Michele's brochure copy arrives in
 * this shape for both curricula. The colon after each label is drawn here
 * rather than stored in the data, so it can never end up inside the bold run
 * twice or go missing on one item.
 */
function Section({
  heading,
  items,
  outro,
}: {
  heading: string
  items: { label?: string; text: string }[]
  outro?: string
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-xl leading-tight font-semibold tracking-tight text-neutral-950 sm:text-2xl">
        {heading}
      </h2>
      <ul role="list" className="mt-6 space-y-6">
        {items.map((item) => (
          <li key={item.text} className="flex gap-4">
            <span
              aria-hidden="true"
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-teal)]"
            />
            <p className="text-base leading-7 text-neutral-700">
              {item.label ? (
                <strong className="font-semibold text-neutral-950">
                  {item.label}:
                </strong>
              ) : null}{' '}
              {item.text}
            </p>
          </li>
        ))}
      </ul>
      {outro ? (
        <p className="mt-8 text-lg leading-8 text-neutral-700">{outro}</p>
      ) : null}
    </section>
  )
}

/**
 * The prominent purchase call to action. Michele read the old one-line
 * "Buy at thebraveseries.com" as far too small to find, so this is its own
 * centred panel: cream ground, tracked small-caps label, and the domain set at
 * heading scale.
 *
 * Cream rather than a coral tint. DESIGN-RULES bans coral-tinted panels, and
 * the warm accent the brief asks for is exactly what --color-band-3 is for.
 * No pill, no rounded-full, no button chrome: the underline carries the
 * affordance and thickens on hover.
 */
function BuyLink({
  label,
  text,
  href,
}: {
  label: string
  text: string
  href: string
}) {
  return (
    <div className="mt-12 rounded-2xl bg-[var(--color-band-3)] px-6 py-8 text-center ring-1 ring-[var(--color-navy-10)] sm:px-10 sm:py-10">
      <p className="font-display text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
        {label}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-display mt-3 inline-block text-2xl leading-tight font-semibold tracking-tight text-[var(--color-brand-teal)] underline decoration-[var(--color-brand-terracotta)] decoration-2 underline-offset-[6px] transition hover:decoration-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand-teal)] sm:text-3xl lg:text-4xl"
      >
        {text}
      </a>
    </div>
  )
}

/**
 * A YouTube Short. Portrait, so the frame is 9:16 and capped at 360px: a Short
 * in a 16:9 box is a thin strip between two black bars.
 *
 * Embedded, never re-hosted. It is Michele's video on Michele's channel, and
 * downloading it to serve ourselves would breach YouTube's terms.
 *
 * `rel=0` keeps the end screen to her own channel. No autoplay, controls on,
 * and the iframe is lazy so it costs nothing until it scrolls into view.
 */
function ShortEmbed({
  id,
  title,
  label,
}: {
  id: string
  title: string
  label: string
}) {
  return (
    <figure className="mt-10 flex flex-col items-center">
      <figcaption className="font-display mb-4 text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
        {label}
      </figcaption>
      <div className="w-full max-w-[360px]">
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-[var(--color-navy-10)]">
          <iframe
            src={`https://www.youtube.com/embed/${id}?rel=0`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </figure>
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
            {/* A series takes its wordmark; a single title takes its cover.
                The logo is black on transparent, so it needs the light ground
                this section already has. Explicit width and height, from the
                file, so it reserves its own space and cannot shift the page. */}
            {book.logo ? (
              <Image
                src={book.logo.src}
                alt={book.logo.alt}
                width={book.logo.width}
                height={book.logo.height}
                priority
                sizes="(max-width: 1024px) 14rem, 18rem"
                className="h-auto w-full max-w-[15rem] lg:max-w-[18rem]"
              />
            ) : (
              <Cover
                src={book.cover}
                alt={book.coverAlt}
                sizes="(max-width: 1024px) 14rem, 18rem"
                priority
              />
            )}
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

            {/* Near the top by direction, so a visitor meets it before the
                long copy rather than after it. */}
            {book.video ? (
              <ShortEmbed
                id={book.video.id}
                title={book.video.title}
                label={book.video.label}
              />
            ) : null}

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

            {book.sections?.map((section) => (
              <Section
                key={section.heading}
                heading={section.heading}
                items={section.items}
                outro={section.outro}
              />
            ))}

            {book.buy ? (
              <BuyLink
                label={book.buy.label}
                text={book.buy.text}
                href={book.buy.href}
              />
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

            {/* Only when there is no prominent BuyLink above; two purchase
                routes on one page is one too many. */}
            {!book.buy && book.available?.length ? (
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
