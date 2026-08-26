import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { BannerHero } from '@/components/BannerHero'
import { BraveSeriesCovers } from '@/components/BraveSeriesCovers'
import { CoverGrid } from '@/components/CaseStudyLayout'
import {
  AvailableAt,
  Cover,
  Endorsements,
  Forthcoming,
  SquareButton,
} from '@/components/AuthorBookParts'
import { WebPageJsonLd } from '@/components/JsonLd'
import {
  AUTHOR_BOOKS,
  AUTHOR_EDITION_LABELS,
  DREAM_BIG_EDITIONS,
  getAuthorBook,
} from '@/lib/author-books'
import { BRAVE_SERIES_STORE_URL, getSquareLink } from '@/data/square-store-links'
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
 * The video embed.
 *
 * LANDSCAPE, not portrait, and that is deliberate even though the clip is a
 * YouTube Short. It shipped as a 9:16 portrait frame first and Michele read it
 * as odd and unbalanced next to the book cover. The reference she pointed at is
 * the Explicit Movement Testimonies block on releasinggenerations.org, whose
 * embed measures 831 x 468 at a 1440 viewport: a plain 16:9 box, no label over
 * it, left-aligned to the section's own text column rather than centred on the
 * page. 52rem is 832px, which is that width to the pixel.
 *
 * YouTube pillarboxes the vertical clip inside the landscape frame. That is
 * expected and it is what the reference does too.
 *
 * No visible label. RG carries none, Michele preferred it that way, and a
 * YouTube thumbnail with a play button over it does not need to be captioned
 * "video". The iframe keeps its `title` so screen readers still get one.
 *
 * Embedded, never re-hosted: it is Michele's video on a channel that allows
 * embedding, and downloading it to serve ourselves would breach YouTube's
 * terms. `rel=0` keeps the end screen off other people's channels. No autoplay,
 * controls on, and the iframe is lazy so it costs nothing until it scrolls in.
 */
function VideoEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="mx-auto mt-10 w-full max-w-[52rem]">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-[var(--color-navy-10)]">
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

  /**
   * The storefront for the button that sits under the cover or wordmark at the
   * top of the page.
   *
   * The Brave Series curriculum is the one title that is not read out of
   * `squareLinks` here. Its entry there is null, because the series sells
   * through thebraveseries.com rather than either Square store, so this page
   * used to open with a wordmark and no way to buy: the only purchase route was
   * the BuyLink panel most of a screen further down. Michele's direction on
   * 2026-08-26 was to put the button directly under the logo at the top, and
   * that this is where people buy the series.
   *
   * The three child titles are deliberately not included. They sell through the
   * same storefront, and Michele's call the same day was that the series page
   * is the one that carries the button.
   */
  const topPurchaseHref =
    slug === 'brave-series' ? BRAVE_SERIES_STORE_URL : getSquareLink(slug)

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

            {/* The buy CTA, directly under the cover and above the fold.

                It is up here rather than beside the BuyLink panel further down
                because those are two different destinations doing two
                different jobs: BuyLink is the branded storefront a title was
                already sold through, this is the shop Michele sells it from
                herself. No title carries both today (see the Brave Series note
                in src/data/square-store-links.ts), so the two never stack.

                Nothing renders in place of the button when there is no
                listing. The brief asked for a "Coming soon" stand-in, but the
                titles that would land on are the two Brave Purpose editions,
                which already print "Forthcoming Spring 2027" at the head of
                the column beside this one.

                The Brave Series is the exception described on
                `topPurchaseHref` above: it renders here, under the wordmark.
                Its BuyLink panel further down names the same storefront and
                was left in place, because Michele asked for that panel herself
                when the one-line version read as too small to find. If she
                wants a single purchase route on this page, the panel is the
                half to drop, not this button. */}
            {topPurchaseHref ? (
              <div className="mt-6">
                <SquareButton
                  href={topPurchaseHref}
                  forTitle={book.title}
                  size="page"
                  label={slug === 'brave-series' ? 'Purchase' : undefined}
                  className="w-full"
                />
              </div>
            ) : null}
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

            {/* Directly under the last paragraph of the description and above
                everything else in this column, which is where Michele put it:
                below the body copy, above the endorsements. */}
            {book.video ? (
              <VideoEmbed id={book.video.id} title={book.video.title} />
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
            {/* The eight Dream Big covers: four journals, then the four
                companion teacher guides, youngest bracket first. Michele asked
                on 2026-08-25 for the same eight she sees in the Dream Big
                section of /author to appear on the curriculum's own page, which
                until now showed a single cover in the column beside this one.
                Same source array the shelf reads (DREAM_BIG_EDITIONS), and the
                same CoverGrid the /projects/dream-big-journals page uses, so
                the three places cannot drift apart when a cover is reshot. */}
            {book.slug === 'dream-big-journal-curriculum' ? (
              <div className="mt-14">
                <h2 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                  Every edition
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
                  Four age brackets, each with a companion teacher guide. Every
                  one ships in a faith and a non-faith version.
                </p>
                <CoverGrid
                  label="The four journal editions"
                  items={DREAM_BIG_EDITIONS.map((edition) => ({
                    src: edition.journal,
                    alt: `Dream Big Journal, ${edition.label}`,
                    caption: edition.label,
                  }))}
                />
                <CoverGrid
                  label="Companion teacher guides"
                  items={DREAM_BIG_EDITIONS.map((edition) => ({
                    src: edition.guide,
                    alt: `Dream Big Teacher Guide, ${edition.label}`,
                    caption: edition.label,
                  }))}
                />
              </div>
            ) : null}

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
                  className="font-display -my-2.5 inline-flex items-center gap-1.5 py-2.5 text-base font-semibold text-[var(--color-brand-teal)] underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition hover:decoration-2"
                >
                  Read the story behind it
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              ) : null}
              <Link
                href="/author"
                className="font-display -my-2.5 inline-flex items-center gap-1.5 py-2.5 text-base font-semibold text-neutral-700 underline decoration-[var(--color-navy)]/25 decoration-1 underline-offset-4 transition hover:text-neutral-950 hover:decoration-2"
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
