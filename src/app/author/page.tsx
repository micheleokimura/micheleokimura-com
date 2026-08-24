import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Cover, Forthcoming } from '@/components/AuthorBookParts'
import { AllWorksJsonLd, WebPageJsonLd } from '@/components/JsonLd'
import {
  DREAM_BIG_EDITIONS,
  SHELF,
  getAuthorBook,
  type AuthorBook,
} from '@/lib/author-books'
import { projectStudies } from '@/lib/projects'
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
 * does, so each one reads as a finished thought. The LAST section has to be
 * band-1: SiteFooter carries a top margin, and any other band would leave a
 * strip of mismatched colour above the navy footer.
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
const WIDE = 'mx-auto max-w-7xl px-6 lg:px-8'

/** Section rhythm, from Brett's note: 60-80px desktop, 40-60px mobile. */
const SECTION = 'py-12 sm:py-16 lg:py-20'

const TILE_SIZES = '(max-width: 640px) 6rem, (max-width: 1024px) 30vw, 24rem'

/**
 * Programs that have a case study but no title on the shelf. Card copy is read
 * from the project registry so these and the /projects index never drift apart.
 */
const OTHER_PROJECTS = projectStudies.filter((project) =>
  ['kingdom-kids', 'rethink-creativity'].includes(project.slug),
)

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
 *   muted 14px/20px teaser, line-clamp-2      same colour and size, clamp-4
 *   mt-auto footer row, pt-1.5 xs:pt-4        same
 *
 * Two deliberate departures, both forced by what the card is carrying.
 *
 * The title clamps at TWO lines, not one. Duvall lists business names, which
 * fit on a line; "The Birth of Explicit Movement: Discover Keys to Fulfilling
 * Your Purpose" does not, and a truncated book title is a worse card than a
 * two-line one.
 *
 * The teaser clamps at FOUR lines, not two. Every teaser on this shelf is
 * approved copy lifted whole from the book's own description, and clamping at
 * two would put an ellipsis through the middle of six of them. Four clears all
 * the current copy while keeping the clamp there as a guard, so a longer teaser
 * added later still cannot blow the card out.
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
 * The footer row, pinned to the bottom of the body with `mt-auto` so it lines
 * up across a row of cards whatever the teaser length. Reference spacing:
 * `pt-1.5 xs:pt-4`.
 */
function LearnMore() {
  return (
    <span className="font-display mt-auto inline-flex items-center gap-1.5 self-start pt-1.5 text-sm font-semibold text-[var(--color-brand-teal)] underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition group-hover:decoration-2 sm:pt-4">
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

/** A title on the shelf: cover, title, forthcoming tag, teaser, learn more. */
function BookTile({
  book,
  headingClass = 'text-lg',
  as: Heading = 'h3',
}: {
  book: AuthorBook
  headingClass?: string
  as?: 'h3' | 'h4'
}) {
  return (
    <Link href={`/author/books/${book.slug}`} className={TILE_CLASS}>
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
            <Forthcoming />
          </span>
        ) : null}
        <p className="mt-1.5 line-clamp-4 text-xs leading-5 text-neutral-600 sm:text-sm sm:leading-5">
          {book.teaser}
        </p>
        <LearnMore />
      </div>
    </Link>
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
        <LearnMore />
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
}: {
  title: string
  subtitle?: string
  href: string
}) {
  return (
    <FadeIn>
      <h3 className="font-display text-2xl leading-tight font-medium tracking-tight text-neutral-950 sm:text-3xl">
        <Link
          href={href}
          className="underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-[6px] transition hover:decoration-2"
        >
          {title}
        </Link>
      </h3>
      {subtitle ? (
        <p className="mt-2 text-sm tracking-wide text-neutral-600 italic">
          {subtitle}
        </p>
      ) : null}
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
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 lg:gap-16">
              <div className="max-w-2xl">
                <h1>
                  <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
                    Author
                  </span>
                  <span className="sr-only"> - </span>
                  <span className="font-display mt-4 block text-[2rem] leading-[1.1] font-medium tracking-tight text-balance text-neutral-950 sm:mt-5 sm:text-[2.5rem] lg:text-5xl lg:leading-[1.08]">
                    Books, Journals, and Curricula for Dreamers of Every Age
                  </span>
                </h1>
                {/* Michele's approved subhead. Keep it verbatim. */}
                <p className="font-display mt-4 max-w-xl text-lg leading-7 font-medium text-neutral-700 sm:text-xl sm:leading-8">
                  Books, journals, and curricula that call out purpose and
                  passion at every age.
                </p>
              </div>

              <div className="w-40 shrink-0 sm:w-44 lg:w-64">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--color-band-1)] ring-1 ring-[var(--color-navy-10)]">
                  <Image
                    src="/images/michele/author-hero.jpg"
                    alt="Michele Okimura with her coffee mug at home"
                    fill
                    priority
                    sizes="(min-width: 1024px) 16rem, (min-width: 640px) 11rem, 10rem"
                    className="object-cover"
                  />
                </div>
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
        </div>
      </section>

      {/* ------------------------------------------------- other projects */}
      {/* Kingdom Kids and ReThink Creativity are programs rather than titles,
          so they have no tile on the shelf. They belong to the same body of
          work, so they get cards here and a route into the full index.

          The navy "Every story in one place" card that used to close this row
          is gone: Michele's rule is that dark blue belongs to the footer and
          nowhere else. The route into /projects is a plain link now. */}
      <section
        aria-labelledby="other-projects"
        className={`bg-[var(--color-band-2)] ${SECTION}`}
      >
        <div className={WIDE}>
          <FadeIn>
            <h2
              id="other-projects"
              className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase"
            >
              Also built by Michele
            </h2>
          </FadeIn>
          <FadeInStagger faster className="mt-8">
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {OTHER_PROJECTS.map((project) => (
                <FadeIn as="li" key={project.href} scaleIn className="flex">
                  <Link
                    href={project.href}
                    className="group flex h-full w-full flex-col rounded-2xl bg-[var(--color-band-1)] p-6 shadow-sm ring-1 ring-[var(--color-navy-10)] transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-[var(--color-teal-30)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-teal)] lg:p-8"
                  >
                    <span className="font-display text-xs font-semibold tracking-[0.18em] text-[var(--color-brand-terracotta-ink)] uppercase">
                      {project.kicker}
                    </span>
                    <h3 className="font-display mt-3 text-xl font-semibold tracking-tight text-neutral-950">
                      {project.title}
                    </h3>
                    <p className="mt-4 flex-auto text-base leading-7 text-neutral-700">
                      {project.blurb}
                    </p>
                    <span className="font-display mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[var(--color-brand-teal)] underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition group-hover:decoration-2">
                      Read the story
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>

          <FadeIn className="mt-10">
            <Link
              href="/projects"
              className="font-display inline-flex items-center gap-1.5 text-base font-semibold text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-2 underline-offset-4 transition hover:text-[var(--color-brand-terracotta-ink)]"
            >
              Every story in one place
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------- photo and quote */}
      {/* The page ends on Michele's own line, at a readable size next to a
          medium portrait. Band-1, because SiteFooter carries a top margin and
          this is the last section: any other band would show as a strip of
          mismatched colour above the navy footer.

          No CTA block under it. Michele cut "Stay close to the next release"
          and asked for the page to run straight into the footer, which carries
          the contact route. Do not add one back. */}
      <section
        aria-label="In Michele's words"
        className={`bg-[var(--color-band-1)] ${SECTION}`}
      >
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12 lg:gap-16">
              <div className="w-56 shrink-0 sm:w-64 lg:w-[22rem]">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[var(--color-band-3)] ring-1 ring-[var(--color-navy-10)]">
                  <Image
                    src="/images/michele/backup-stone-wall-ocean.jpg"
                    alt="Michele Okimura on the beach at home in Hawaiʻi"
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 16rem, 14rem"
                    className="object-cover"
                  />
                </div>
              </div>

              <figure>
                <blockquote className="font-display text-2xl leading-tight font-medium text-balance text-[var(--color-brand-teal)] sm:text-3xl lg:text-4xl lg:leading-[1.15]">
                  &ldquo;Let&rsquo;s become a community of dreamers where we
                  don&rsquo;t compete but instead celebrate and support one
                  another.&rdquo;
                </blockquote>
                <figcaption className="font-display mt-6 text-sm font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                  Michele Okimura
                </figcaption>
              </figure>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
