import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Cover, Forthcoming, SquareButton } from '@/components/AuthorBookParts'
import { AllWorksJsonLd, WebPageJsonLd } from '@/components/JsonLd'
import {
  DREAM_BIG_EDITIONS,
  SHELF,
  getAuthorBook,
  type AuthorBook,
} from '@/lib/author-books'
import { SQUARE_STORE_URL, getSquareLink } from '@/data/square-store-links'
import { pageMetadata } from '@/lib/schema'

/**
 * The Author page. Rebuilt 2026-08-23 on Brett's design walkthrough, on top of
 * the content reorder Michele signed off the same day.
 *
 * WHAT CHANGED, AND WHY IT SHOULD NOT CHANGE BACK.
 *
 * The books are the point of this page. It used to open with a photo-and-quote
 * block about the golden thread, then run each title as a full two-column
 * essay, which put the second book somewhere around the fourth screen. Brett's
 * note was blunt: the golden-thread framing "gets in the way" and pushes the
 * books below the fold. So:
 *
 *  - the golden-thread section is DELETED, not moved,
 *  - the shelf is a grid of tiles that starts immediately under the hero, with
 *    no block in between,
 *  - every title's long copy now lives on its own page under
 *    /author/books/<slug>, and the tile links there.
 *
 * Also deleted, all by direction: the "Stay close to the next release"
 * ContactBlock that used to close the page, and the navy "Every story in one
 * place" card in the projects row. Michele's rule is that dark blue is the
 * footer's colour and nothing else's, and the page is meant to run straight
 * into the footer, which carries its own contact route.
 *
 * ORDER. The running order of the shelf is Michele's and it is locked. It is
 * declared once in src/lib/author-books.ts as SHELF, along with the reasoning.
 * Do not resort it here.
 *
 * HERO. This is the one page on the site that does not use BannerHero, and the
 * one page with a background of its own. The wash is sampled from
 * author-hero.jpg; see .surface-author-wash in tailwind.css for the sampling
 * and the contrast budget. Everything else still uses the navy banner, and
 * that is still the site identity.
 *
 * BANDS. Sections alternate --color-band-1 / band-2 the way the home page
 * does, so each one reads as a finished thought. There is no constraint on
 * which band goes last: SiteFooter paints its own run-in with band-4.
 *
 * 2026-08-25. The closing "Also built by Michele" row is gone. Its two cards,
 * the Kingdom Kids Workshop and ReThink Creativity, are speaking work rather
 * than authored titles. ReThink Creativity now closes /speaker; the Kingdom
 * Kids Workshop was dropped outright as a duplicate of the message page at
 * /speaker/messages/building-a-kingdom-culture. The page now ends on the quote
 * banner.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Author',
  description:
    'Books, journals, and curricula by Michele Okimura. Two published trade books, a 21-day interactive journal, the multi-age Dream Big Journals in Faith and Non-Faith versions, the Raising Kingdom Kids lesson book, the 24-volume Brave Series, and Brave Purpose coming 2027.',
  path: '/author',
  ogDescription: 'Books, journals, and curricula for dreamers of every age.',
})

/** The home page's full-width wrapper. Container caps its children at max-w-2xl
 *  below lg, which turns a three-column grid into three narrow strips on a
 *  tablet. Grids use this; running text uses Container. */
const WIDE = 'mx-auto max-w-7xl gutter-x'

/** Section rhythm, from Brett's note: 60-80px desktop, 40-60px mobile. */
const SECTION = 'py-12 sm:py-16 lg:py-20'

const TILE_SIZES = '(max-width: 640px) 6rem, (max-width: 1024px) 30vw, 24rem'

/* ---------------------------------------------------------------- pieces */

/**
 * THE TILE, matched to Brett's reference: the Living in Duvall listing card at
 * livingin-platform.vercel.app/listings. What is borrowed, element by element:
 *
 *   reference                                 here
 *   ----------------------------------------  --------------------------------
 *   flex h-full flex-row xs:flex-col          same, swapping at sm
 *   overflow-hidden rounded-2xl               same
 *   border + bg-surface + shadow-sm           ring-1 navy/10, cream, shadow-sm
 *   hover:-translate-y-0.5                    same
 *   hover:border-primary hover:shadow-md      hover ring goes teal, shadow-md
 *   image band flush to the card edge         same
 *   group-hover:scale-105 on the image        same
 *   body p-2.5 xs:p-4                         same
 *   serif title, leading-tight, ~18px         font-display at the same size
 *   group-hover:text-primary on the title     title goes teal on hover
 *   muted 14px/20px teaser, line-clamp-2      same colour and size, clamp-5
 *   mt-auto footer row, pt-1.5 xs:pt-4        same
 *
 * Two deliberate departures, both forced by what the card is carrying.
 *
 * The title clamps at TWO lines, not one. Duvall lists business names, which
 * fit on a line; "The Birth of Explicit Movement: Discover Keys to Fulfilling
 * Your Purpose" does not, and a truncated book title is a worse card than a
 * two-line one.
 *
 * The teaser clamps at FIVE lines, not two. Every teaser on this shelf is
 * approved copy lifted whole from the book's own description, and clamping at
 * two would put an ellipsis through the middle of most of them. It was four
 * until 2026-08-24, when three descriptions were replaced and two of the new
 * opening sentences ran past four lines in a 24rem column. Five clears all the
 * current copy while keeping the clamp there as a guard, so a longer teaser
 * added later still cannot blow the card out. Re-measure before lowering it.
 *
 * The reference's second footer element, a coloured "Open" status pill, is NOT
 * borrowed. DESIGN-RULES bans pills outright because they read as clickable, so
 * the footer row carries "Learn more" alone.
 *
 * `w-full` is load-bearing. The <li> is `display:flex` so the tile can stretch
 * to the row height, which makes the tile a flex ITEM: without an explicit
 * width it shrinks to its content, and the Preschool tile (a two-word label
 * under a cover) came out half the width of its neighbours.
 */
const TILE_CLASS =
  'group flex h-full w-full flex-row overflow-hidden rounded-2xl bg-[var(--color-band-3)] shadow-sm ring-1 ring-[var(--color-navy-10)] transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-[var(--color-teal-30)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-teal)] sm:flex-col'

/** Card body. Reference: `flex min-w-0 flex-1 flex-col p-2.5 xs:p-4`. */
const BODY_CLASS = 'flex min-w-0 flex-1 flex-col p-2.5 sm:p-4'

/**
 * The "Learn more" half of the tile footer.
 *
 * The `mt-auto` that used to pin this to the bottom of the body now lives on
 * TILE_FOOTER, which wraps this and the Square button together so the pair
 * lines up across a row of cards whatever the teaser length. Reference
 * spacing: `pt-1.5 xs:pt-4`.
 */
function LearnMore() {
  return (
    <span className="font-display inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-teal)] underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition group-hover:decoration-2">
      Learn more
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    </span>
  )
}

/** Holds "Learn more" and the Square button on one baseline at the card foot. */
const TILE_FOOTER =
  'mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-1.5 sm:pt-4'

/**
 * A title on the shelf: cover, title, forthcoming tag, teaser, and a footer
 * carrying "Learn more" and, where the title is stocked, "Buy on Square".
 *
 * WHY THIS IS A DIV WRAPPING AN OVERLAY LINK RATHER THAN A LINK WRAPPING
 * EVERYTHING. The tile used to be one <Link> around the whole card. The Square
 * button is an <a> of its own, and an anchor nested inside an anchor is invalid
 * HTML: the browser closes the outer one early and the card splits into two
 * link boxes with the teaser stranded between them. So the card is a plain div,
 * and the link to /author/books/<slug> is a transparent sibling stretched over
 * it with `absolute inset-0`. The button then sits above that overlay on `z-10`
 * and takes its own clicks, which is exactly the brief: the tile goes to the
 * book's page, the button goes to Square.
 *
 * The overlay carries the tile's focus ring, drawn INSIDE the border with
 * `-outline-offset-2` because TILE_CLASS is `overflow-hidden` and would
 * otherwise clip a normal outward offset to nothing.
 *
 * `group` stays on the div, so every `group-hover:` in here still fires, and
 * hovering the button lifts the whole card the way hovering the cover does.
 */
function BookTile({
  book,
  headingClass = 'text-lg',
  as: Heading = 'h3',
  showLearnMore = true,
}: {
  book: AuthorBook
  headingClass?: string
  as?: 'h3' | 'h4'
  /** Off inside a curriculum family, which carries one link on its heading. */
  showLearnMore?: boolean
}) {
  const squareHref = getSquareLink(book.slug)
  /* The three Brave Series child tiles carry neither, and an empty footer
     would still spend its `pt-4` on nothing. */
  const hasFooter = showLearnMore || Boolean(squareHref)

  return (
    <div className={`${TILE_CLASS} relative`}>
      <Link
        href={`/author/books/${book.slug}`}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-brand-teal)]"
      >
        {/* The card's visible text is not inside the anchor any more, so the
            link needs a name of its own. */}
        <span className="sr-only">{book.title}</span>
      </Link>
      <Cover src={book.cover} alt={book.coverAlt} sizes={TILE_SIZES} flush />
      <div className={BODY_CLASS}>
        <Heading
          className={`font-display leading-tight font-semibold tracking-tight text-neutral-950 transition-colors group-hover:text-[var(--color-brand-teal)] line-clamp-2 ${headingClass}`}
        >
          {book.title}
        </Heading>
        {/* Under the title, by direction, and flat text rather than a tag. */}
        {book.forthcoming ? (
          <span className="mt-1.5 block">
            <Forthcoming label={book.forthcoming} />
          </span>
        ) : null}
        {/* 14px at every width. This ran at 12px below sm and 14px from sm
            up, so the teaser was smallest on the screen held closest to the
            face. The shelf is one column below sm, so the extra line height
            just makes the card taller; nothing reflows. */}
        <p className="mt-1.5 line-clamp-5 text-sm leading-5 text-neutral-600">
          {book.teaser}
        </p>
        {hasFooter ? (
          <div className={TILE_FOOTER}>
            {showLearnMore ? <LearnMore /> : null}
            {/* No button and no substitute label when there is no listing.
                The brief asked for a "Coming soon" here, and the two titles it
                would land on are the two Brave Purpose editions, which already
                carry "Forthcoming Spring 2027" three lines up in Michele's own
                wording. A generic second label under it says the same thing
                twice, less precisely. The other unlinked titles must not get
                one at all: the Brave Series sells through thebraveseries.com
                and The Birth of Explicit Movement has been out since 2018, so
                "coming soon" on either would be false. See
                src/data/square-store-links.ts. */}
            {squareHref ? (
              <SquareButton
                href={squareHref}
                forTitle={book.title}
                className="relative z-10"
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/**
 * An edition tile: one age bracket of the Dream Big curriculum. Cover and
 * label, and no teaser. These are eight printings of one curriculum rather
 * than eight books, and no approved one-line description exists for a single
 * bracket. See the TODO on DREAM_BIG_EDITIONS before writing one here.
 */
function EditionTile({
  href,
  src,
  alt,
  label,
}: {
  href: string
  src: string
  alt: string
  label: string
}) {
  return (
    <Link href={href} className={TILE_CLASS}>
      <Cover src={src} alt={alt} sizes={TILE_SIZES} flush />
      <div className={BODY_CLASS}>
        <h4 className="font-display line-clamp-2 text-base leading-tight font-semibold tracking-tight text-neutral-950 transition-colors group-hover:text-[var(--color-brand-teal)]">
          {label}
        </h4>
      </div>
    </Link>
  )
}

/**
 * The heading over a family of tiles: a parent work with children under it.
 * Linked, because the parent is a title in its own right with a page of its
 * own. Flat tracked small-caps subtitle, never a pill.
 */
function FamilyHeading({
  title,
  subtitle,
  href,
  squareHref,
  forTitle,
}: {
  title: string
  subtitle?: string
  href: string
  /** Square link for the whole curriculum, when there is one. */
  squareHref?: string | null
  forTitle?: string
}) {
  return (
    <FadeIn>
      {/* Plain text, not a link. The one link for the whole family is the
          "Learn more" directly under it. Michele's note on 2026-08-24 was that
          every tile in a curriculum family pointed at the same overview page,
          so the section repeated one destination six or eight times. Linking
          the heading as well would put two links to the same page one line
          apart, which is the repetition this change exists to remove. */}
      <h3 className="font-display text-2xl leading-tight font-medium tracking-tight text-neutral-950 sm:text-3xl">
        {title}
      </h3>
      {subtitle ? (
        <p className="mt-2 text-sm tracking-wide text-neutral-600 italic">
          {subtitle}
        </p>
      ) : null}
      {/* Deliberately larger than the per-tile link: this one is carrying a
          whole curriculum rather than a single title.

          The Square button sits HERE rather than on the eight edition tiles
          below it. Every bracket of the Dream Big curriculum is one product on
          Square with the age group as a dropdown, so a button per tile would
          be the same URL eight times over. That is the exact repetition
          Michele's 2026-08-24 note asked to remove, and it applies to a buy
          link as much as to a "Learn more". */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          href={href}
          className="font-display -my-2.5 inline-flex items-center gap-2 py-2.5 text-base font-semibold text-[var(--color-brand-teal)] underline decoration-[var(--color-brand-terracotta)] decoration-2 underline-offset-[6px] transition hover:text-[var(--color-brand-terracotta-ink)] sm:text-lg"
        >
          Learn more
          <span aria-hidden="true">&rarr;</span>
        </Link>
        {squareHref ? (
          <SquareButton href={squareHref} forTitle={forTitle ?? title} />
        ) : null}
      </div>
    </FadeIn>
  )
}

/** Sub-block label inside a family: "Journals", "Teacher Guides". */
function GroupTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <FadeIn>
      <h4 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
        {title}
      </h4>
      {subtitle ? (
        <p className="mt-2 text-sm tracking-wide text-neutral-500 italic">
          {subtitle}
        </p>
      ) : null}
    </FadeIn>
  )
}

function TileGrid({
  children,
  columns = 3,
}: {
  children: React.ReactNode
  columns?: 3 | 4
}) {
  return (
    <FadeInStagger faster>
      {/* Reference grid: `grid gap-3 sm:grid-cols-3 sm:gap-5`. One column below
          sm, where the card is horizontal, then three across. The four-column
          variant is for the Dream Big age brackets only, which are a set of
          four and were established as one row by the previous pass. */}
      <ul
        role="list"
        className={`grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5 ${
          columns === 4 ? 'lg:grid-cols-4' : ''
        }`}
      >
        {children}
      </ul>
    </FadeInStagger>
  )
}

/* ------------------------------------------------------------------ page */

export default function AuthorPage() {
  return (
    <>
      <WebPageJsonLd
        path="/author"
        name="Books, journals, and curricula by Michele Okimura"
        description="Every book, journal, and curriculum Michele Okimura has authored, from Dancing with Father to Brave Purpose."
      />
      {/* Book and CreativeWorkSeries nodes for every authored work. They live
          here rather than in the layout: this is the page that is actually
          about the works, and repeating fifteen nodes on every URL is bloat. */}
      <AllWorksJsonLd />

      {/* ------------------------------------------------------------ hero */}
      {/* Left-justified to the wordmark. Container is what the site header
          uses, so the eyebrow, the H1 and the wordmark all sit on one left
          edge at every width. The portrait is small on purpose: it was a
          full-height editorial photo and Brett asked for a portrait treatment
          instead, so the books get the space. */}
      <section className="surface-author-wash">
        <Container className={SECTION}>
          <FadeIn>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,38rem)] lg:items-center lg:gap-12">
              <div className="max-w-2xl">
                <h1>
                  <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
                    Author
                  </span>
                  <span className="sr-only"> - </span>
                  <span className="font-display mt-4 block text-[2rem] leading-[1.1] font-medium tracking-tight text-balance text-neutral-950 sm:mt-5 sm:text-[2.5rem] lg:text-5xl lg:leading-[1.08]">
                    Books, journals, and curricula for every age
                  </span>
                </h1>
                {/* Michele's approved subhead. Keep it verbatim. */}
                <p className="font-display mt-4 max-w-xl text-lg leading-7 font-medium text-neutral-700 sm:text-xl sm:leading-8">
                  Books, journals, and curricula that call out purpose and
                  passion at every age.
                </p>
              </div>

              {/* Her own covers, fanned. Built by scripts/build-books-hero.swift
                  from the same art the tiles below use, so it can be rebuilt
                  whenever a cover changes or the two Brave Purpose editions
                  finally have art. Transparent PNG on purpose: a baked-in
                  background would put a rectangle edge across the wash.

                  This slot used to hold a small portrait of Michele. It moved
                  out on 2026-08-24, when she asked for "a photograph of books"
                  because the page read bland, and it is not a loss: her
                  portrait now closes the page, circle-cropped and much larger,
                  on the quote banner. Two photographs of her on one page was
                  the note I had already flagged. */}
              <div className="relative aspect-[1920/1040] w-full">
                <Image
                  src="/images/author/books-hero.png"
                  alt="A fan of Michele Okimura's books and journals: Dancing with Father, The Birth of Explicit Movement, the Brave Series, the Dream Big Journals, and Raising Kingdom Kids"
                  fill
                  priority
                  sizes="(min-width: 1024px) 38rem, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ----------------------------------------------------------- shelf */}
      {/* ONE continuous list, no divider between Michele's own titles and the
          Releasing Generations curriculum: she asked for one list. There is no
          VISIBLE heading over it either, so the h2 is sr-only and exists to
          keep the outline h1 > h2 > h3. */}
      <section
        aria-labelledby="shelf-heading"
        className={`bg-[var(--color-band-1)] ${SECTION}`}
      >
        <div className={WIDE}>
          <h2 id="shelf-heading" className="sr-only">
            Books and curricula by Michele Okimura
          </h2>

          <div className="space-y-14 sm:space-y-16 lg:space-y-20">
            {SHELF.map((block, blockIndex) => {
              if (block.kind === 'books') {
                return (
                  <TileGrid key={`books-${blockIndex}`}>
                    {block.slugs.map((slug) => {
                      const book = getAuthorBook(slug)
                      if (!book) return null
                      return (
                        <FadeIn as="li" key={slug} scaleIn className="flex">
                          <BookTile book={book} />
                        </FadeIn>
                      )
                    })}
                  </TileGrid>
                )
              }

              const parent = getAuthorBook(block.slug)
              if (!parent) return null

              return (
                <div key={block.slug}>
                  <FamilyHeading
                    title={parent.title}
                    subtitle={block.subtitle}
                    href={`/author/books/${parent.slug}`}
                    squareHref={getSquareLink(parent.slug)}
                    forTitle={parent.title}
                  />

                  {/* Children that are titles in their own right. */}
                  {block.childSlugs ? (
                    <div className="mt-8">
                      <TileGrid>
                        {block.childSlugs.map((slug) => {
                          const child = getAuthorBook(slug)
                          if (!child) return null
                          return (
                            <FadeIn
                              as="li"
                              key={slug}
                              scaleIn
                              className="flex"
                            >
                              <BookTile
                                book={child}
                                as="h4"
                                headingClass="text-base"
                                showLearnMore={false}
                              />
                            </FadeIn>
                          )
                        })}
                      </TileGrid>
                    </div>
                  ) : null}

                  {/* Children that are editions of the parent: one row of four
                      per group, youngest bracket first. */}
                  {block.editions?.map((group) => (
                    <div key={group.title} className="mt-10 sm:mt-12">
                      <GroupTitle
                        title={group.title}
                        subtitle={group.subtitle}
                      />
                      <div className="mt-6">
                        <TileGrid columns={4}>
                          {DREAM_BIG_EDITIONS.map((edition) => (
                            <FadeIn
                              as="li"
                              key={edition.label}
                              scaleIn
                              className="flex"
                            >
                              <EditionTile
                                href={`/author/books/${parent.slug}`}
                                src={edition[group.field]}
                                alt={`${
                                  group.field === 'journal'
                                    ? 'Dream Big Journal'
                                    : 'Dream Big Teacher Guide'
                                }, ${edition.label}`}
                                label={edition.label}
                              />
                            </FadeIn>
                          ))}
                        </TileGrid>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          {/* Closes the shelf with the one route that covers everything.
              Several titles carry no button of their own (the Brave Series
              sells through thebraveseries.com, Brave Purpose is not out), so
              a reader who wants to browse rather than buy one title has
              somewhere to go. A text link, not a button: the buttons above are
              the calls to action and a second filled control down here would
              compete with them. */}
          <FadeIn>
            <p className="mt-14 sm:mt-16">
              <a
                href={SQUARE_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display -my-2.5 inline-flex items-center gap-2 py-2.5 text-base font-semibold text-[var(--color-brand-teal)] underline decoration-[var(--color-brand-terracotta)] decoration-2 underline-offset-[6px] transition hover:text-[var(--color-brand-terracotta-ink)] sm:text-lg"
              >
                Shop all books on Square
                <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------- quote banner */}
      {/* The banner that was on /speaker, and on /coach before that. It
          replaces the photo-and-quote block that used to close this page:
          same job, much stronger, and it carries Michele's purpose line
          rather than a line about dreamers.

          It closes the page as of 2026-08-25, when "Also built by Michele"
          moved to /speaker. That is safe: SiteFooter paints its own run-in
          with band-4, so a page can end on any ground it likes, periwinkle
          included. See the note at the top of SiteFooter.

          Periwinkle is sampled from the sapphire flowers in the dress in this
          very photograph. Numbers and the contrast budget are in the QUOTE
          BANNER block in tailwind.css. Only navy and neutral-600 clear AA on
          this wash. */}
      <section
        aria-label="In Michele's words"
        className="surface-speaker-quote w-full py-14 sm:py-24 lg:py-28"
      >
        <Container>
          <FadeIn>
            <figure className="flex flex-col items-center gap-10 text-center lg:flex-row lg:gap-16 lg:text-left">
              {/* A fixed pixel box rather than a percentage, so the circle
                  stays a circle at every width instead of squashing to an
                  oval in the flex row. */}
              <div className="relative h-[250px] w-[250px] flex-none overflow-hidden rounded-full bg-neutral-100 ring-1 ring-[var(--color-navy-10)] sm:h-[300px] sm:w-[300px] lg:h-[340px] lg:w-[340px]">
                <Image
                  src="/images/michele/coach-hero.jpg"
                  alt="Michele Okimura at home in Honolulu"
                  fill
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 300px, 250px"
                  className="object-cover object-[center_20%]"
                />
              </div>

              <div>
                {/* No quotation marks. At this size a pair of curly quotes
                    just hangs two heavy marks in the corners, and the display
                    setting already reads as a quote. Navy rather than
                    teal-text, which measures 3.96:1 on this wash and fails. */}
                <blockquote className="font-display mx-auto max-w-[22ch] text-[1.5rem] leading-[1.25] font-medium tracking-tight text-balance text-[var(--color-navy)] sm:max-w-[26ch] sm:text-[1.875rem] sm:leading-[1.22] lg:mx-0 lg:max-w-[30ch] lg:text-[2.25rem] lg:leading-[1.2]">
                  My purpose is to help people live in the fullness of who they
                  were created to be with brave purpose.
                </blockquote>
                {/* No dash before the name: no em dash anywhere on this site,
                    so the attribution is the name alone. neutral-600 is the
                    only secondary that clears AA on the periwinkle;
                    coral-text, the usual house eyebrow colour, is 3.93:1. */}
                <figcaption className="font-display mt-6 text-xs font-semibold tracking-[0.18em] text-neutral-600 uppercase sm:mt-8 sm:text-sm">
                  Michele Okimura
                </figcaption>
              </div>
            </figure>
          </FadeIn>
        </Container>
      </section>

      {/* The "Also built by Michele" row that used to close this page is GONE,
          2026-08-25. It carried two cards, the Kingdom Kids Workshop and
          ReThink Creativity, and Michele's read was that both are speaking
          work rather than authored titles: one is parent and ministry-leader
          training she delivers in a room, the other is a conference she leads.
          Neither has a title on the shelf above, so neither belonged on the
          Author page at all.

          They did not both survive the move. ReThink Creativity now closes
          /speaker, along with the "Every story in one place" route into
          /projects that sat under it here. The Kingdom Kids Workshop was
          dropped outright rather than relocated: the material is already on
          /speaker/messages/building-a-kingdom-culture, which is the name
          Michele teaches it under, so a card for it anywhere would be a second
          door onto one thing. /projects/kingdom-kids is untouched and still
          live; only the cards are gone.

          /projects is still in the footer, so this page losing that link is
          not a dead end.

          Do not rebuild this row from the project registry. If a future
          program genuinely is an authored work, it gets a tile on the shelf
          instead. */}
    </>
  )
}
