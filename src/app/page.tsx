import type { Metadata } from 'next'

import { pageMetadata } from '@/lib/schema'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { ContactTrigger } from '@/components/ContactTrigger'
import { LogoMarquee } from '@/components/LogoMarquee'
import {
  DOORS,
  FEATURED_WORKS,
  FRIENDS_SAY_BOTTOM,
  FRIENDS_SAY_TOP,
  HERO,
  PULL_QUOTE,
  type Testimonial,
} from '@/lib/home-variants'

/**
 * Home page. Rebuilt 2026-08-23 against Michele's walkthrough of the live site.
 *
 * She reads this page in FIRST PERSON now. The H1 is "Hi, I'm Michele Okimura",
 * the three cards say "Book me to speak" / "See my body of work" / "See my
 * method", and the old third-person hero line ("She helps people find the shape
 * of the work they were made to do...") is deleted at her instruction. Do not
 * reintroduce third-person copy on this page.
 *
 * SECTION BANDS. Michele's structural note was that "the sections all blend
 * into one continuous scroll and it's hard to tell where one thought ends and
 * the next begins." Every section below is therefore full-bleed and sits on one
 * of --color-band-1/2/3, alternating the whole way down, and each carries its
 * own vertical padding instead of the old margin stack. Never put two
 * same-band sections next to each other; the seam is the entire point.
 *
 * Sections deleted in this pass, all at Michele's instruction, none to be
 * restored without her:
 *  - "Recognition" ("the work has been checked by people who had to be sure",
 *    plus the 2023 / 2026 / 14-works tiles),
 *  - the founder-and-executive-director blurb under the hero, replaced by the
 *    pull quote,
 *  - "Ready when you are", the ContactBlock that used to close the page. The
 *    page now runs straight from the Method into the footer.
 *
 * The featured-work row is a plain responsive grid rather than a rotating
 * carousel. Michele's authored works ARE her case studies, so hiding two
 * thirds of them behind a carousel arrow would bury the authority stack this
 * page exists to show.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Coach, author, and speaker',
  description:
    'Michele Okimura is an author, speaker, and coach in Mānoa, Honolulu, Hawaiʻi. Two published trade books, two more in 2027, keynotes and workshops, and the Brave Purpose Author Method.',
  path: '/',
  ogDescription:
    'Author, speaker, and coach in Honolulu. Founder and Executive Director of Releasing Generations.',
})

/**
 * The doors section escapes Container's inner max-w-2xl cap on purpose.
 * Container narrows its contents to 42rem below `lg`, which would leave three
 * columns about 210px wide at a tablet width. Using the full max-w-7xl gutter
 * instead gives roughly 226px columns at 768px, which the cards can carry.
 */
const WIDE = 'mx-auto max-w-7xl px-6 lg:px-8'

/** One card in the two scrolling testimonial rows. */
function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    // The horizontal space between cards is `mx`, NOT a `gap` on the track.
    // The marquee keyframes wrap by translating exactly -50% of the track, and
    // a flex `gap` puts a gap BETWEEN the two copies as well as inside them, so
    // -50% would land half a gap short of the second copy and the loop would
    // visibly hitch once per cycle. Margins are part of each item's own width,
    // so the two halves stay exactly equal. LogoMarquee does the same thing
    // with px-6 for the same reason.
    <figure className="mx-2.5 flex w-80 shrink-0 flex-col rounded-2xl bg-[var(--color-band-3)] p-6 ring-1 ring-[var(--color-navy-10)] sm:w-96 sm:p-7">
      <blockquote className="flex-auto text-[0.9375rem] leading-7 text-neutral-800">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 border-t border-[var(--color-navy-10)] pt-4 text-sm">
        <span className="block font-semibold text-neutral-900">{item.name}</span>
        <span className="mt-0.5 block leading-5 text-neutral-600">
          {item.title}
        </span>
        {item.work ? (
          <span className="font-display mt-1.5 block text-xs font-semibold tracking-wider text-[var(--color-brand-terracotta-ink)] uppercase">
            On {item.work}
          </span>
        ) : null}
      </figcaption>
    </figure>
  )
}

/**
 * One scrolling row. `.marquee-track` and its keyframes come from
 * tailwind.css; the array is rendered twice inside the track because the
 * keyframes translate by exactly -50% for a seamless wrap.
 *
 * `duration` is Michele's spec: roughly 40-60s per full loop, slow enough to
 * read a card as it goes by. The two rows run at slightly different speeds and
 * in opposite directions so they never lock into step and read as one block.
 */
function TestimonialRow({
  items,
  direction,
  duration,
}: {
  items: Testimonial[]
  direction: 'ltr' | 'rtl'
  duration: string
}) {
  const doubled = [...items, ...items]

  return (
    <div className="marquee-band overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        className={`marquee-track items-stretch ${
          direction === 'ltr' ? 'marquee-ltr' : 'marquee-rtl'
        }`}
        style={{ animationDuration: duration }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={`${item.name}-${item.work ?? ''}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      {/* TRUE 16:9, from sm up. The source file is 1920x1080, but the section
          used to be a fixed 360-440px band, which cropped it to roughly 3.3:1
          and cut the audience out of frame. `aspect-[16/9]` lets the whole
          frame through, which is what Michele asked for and what keeps her AND
          the room visible.

          Below sm the ratio is dropped for a min-height instead: 16:9 on a
          375px phone is 211px tall, which cannot hold the H1, the subhead, the
          award line and a button. There the video is ambient background behind
          stacked copy.

          The 900px cap only engages above a ~1600px viewport, where honest
          16:9 would be 900px+ of hero and push everything else off the screen.
          It is the one place this deliberately stops being 16:9.

          OVERLAY, halved on Michele's note that it was too heavy. It used to be
          a flat navy/75 rising to navy/90. It is now a 35% wash over the WHOLE
          frame (her 30-40% target) plus a scrim that only covers the bottom of
          the frame, where the copy sits. The top of the picture is therefore
          nearly clear and the copy still has a dark ground under it.

          That split is also what keeps the text legal. Over the worst case the
          video can produce (a blown-out white frame) the wash and the scrim
          compound to ~80% navy behind the subhead and ~96% behind nothing that
          matters less, so the cream H1 holds 6.5:1 and the subhead better than
          that. Re-measure at the scrim's WEAKEST point, not at the bottom
          edge, if you retune either number. */}
      <section
        aria-label="Michele Okimura"
        className="relative isolate min-h-[32rem] w-full overflow-hidden bg-[var(--color-navy)] sm:min-h-0 sm:aspect-[16/9] sm:max-h-[900px]"
      >
        <video
          src="/videos/michele-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/team/michele-hero-canva.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--color-navy)]/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[var(--color-navy)]/95 via-[var(--color-navy)]/70 to-transparent"
        />

        <Container className="absolute inset-x-0 bottom-0 pb-9 sm:pb-10 lg:pb-14">
          <FadeIn className="max-w-2xl">
            <h1 className="font-display text-[2rem] leading-[1.05] font-medium tracking-tight text-balance text-[var(--color-cream)] sm:text-[2.5rem] lg:text-6xl">
              {HERO.h1}
            </h1>

            {/* Middle dots, not periods. Michele was specific. */}
            <p className="font-display mt-3 text-sm font-semibold tracking-[0.16em] text-[var(--color-teal-on-dark)] uppercase sm:mt-4 sm:text-base lg:text-lg">
              {HERO.roles.join(' · ')}
            </p>

            <p className="mt-4 max-w-xl text-[0.9375rem] leading-7 text-[var(--color-cream)]/90 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              {HERO.subhead}
            </p>

            {/* Award. A line with a hairline rule, NOT a pill: Michele banned
                pill-shaped badges sitewide in this same review. */}
            <p className="mt-4 flex items-start gap-3 text-xs leading-5 text-[var(--color-cream)]/80 sm:mt-5 sm:text-[0.8125rem]">
              <span
                aria-hidden="true"
                className="mt-2 h-px w-6 shrink-0 bg-[var(--color-teal-on-dark)] sm:w-8"
              />
              <span>
                <span className="font-semibold text-[var(--color-teal-on-dark)]">
                  {HERO.award}
                </span>
                <span className="text-[var(--color-cream)]/70">
                  {' · '}
                  {HERO.awardIssuer}
                </span>
              </span>
            </p>

            <div className="mt-6 sm:mt-7">
              <ContactTrigger className="px-5 py-3 text-sm sm:px-6 sm:py-3.5 sm:text-base">
                {HERO.cta}
              </ContactTrigger>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* band 3 */}
      <LogoMarquee />

      {/* ------------------------------------------------------ three doors */}
      {/* Speaker, Author, Coach, left to right. Order is locked in DOORS. */}
      <section
        aria-labelledby="three-ways-heading"
        className="bg-[var(--color-band-1)] py-16 sm:py-20 lg:py-24"
      >
        <div className={WIDE}>
          <h2 id="three-ways-heading" className="sr-only">
            Three ways to work with Michele
          </h2>
          <FadeInStagger faster>
            <ul
              role="list"
              className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:gap-8"
            >
              {DOORS.map((door) => (
                <FadeIn as="li" key={door.key} className="flex">
                  <Link
                    href={door.href}
                    aria-label={`${door.label}: ${door.cta}`}
                    className="group flex w-full flex-col rounded-3xl bg-[var(--color-band-3)] p-6 ring-1 ring-[var(--color-navy-10)] transition duration-300 hover:shadow-xl hover:shadow-[var(--color-teal-20)] hover:ring-[var(--color-teal-30)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-teal)] lg:p-8"
                  >
                    <h3 className="font-display text-xs font-semibold tracking-[0.18em] text-[var(--color-brand-terracotta-ink)] uppercase">
                      {door.label}
                    </h3>
                    <div className="mt-3 flex flex-auto flex-col lg:mt-4">
                      <p className="flex-auto text-sm leading-6 text-neutral-700 lg:text-base lg:leading-7">
                        {door.hook}
                      </p>
                      <span className="font-display mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[var(--color-brand-teal)] underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition group-hover:decoration-2 lg:mt-6">
                        {door.cta}
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        >
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        </div>
      </section>

      {/* ------------------------------------------------------- pull quote */}
      {/* This is the slot the founder / executive-director blurb used to hold.
          Display type, centred, generous padding, teal from the book palette.
          The teal here is --color-brand-teal (#0F766E), not the bright brand
          teal: #00B09F is 2.31:1 on this ground and fails even the large-text
          floor, so it can never spell a word. See tailwind.css. */}
      <section
        aria-label="In Michele's words"
        className="bg-[var(--color-band-2)] py-20 sm:py-24 lg:py-32"
      >
        <Container>
          <FadeIn>
            <figure className="mx-auto max-w-4xl text-center">
              <blockquote className="font-display text-3xl leading-[1.15] font-medium tracking-tight text-balance text-[var(--color-brand-teal)] sm:text-4xl lg:text-5xl">
                &ldquo;{PULL_QUOTE.text}&rdquo;
              </blockquote>
              <figcaption className="font-display mt-8 text-sm font-semibold tracking-[0.18em] text-neutral-600 uppercase sm:mt-10">
                <span aria-hidden="true">&mdash; </span>
                {PULL_QUOTE.attribution}
              </figcaption>
            </figure>
          </FadeIn>
        </Container>
      </section>

      {/* --------------------------------------- things my friends say */}
      {/* Replaced the Recognition section. Two rows running against each other,
          slowly, so the page has motion without a carousel to click. Hovering
          anywhere in a row pauses it (.marquee-band:hover in tailwind.css), and
          prefers-reduced-motion stops both outright. */}
      <section
        aria-labelledby="friends-say-heading"
        className="overflow-hidden bg-[var(--color-band-1)] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <FadeIn>
            <h2
              id="friends-say-heading"
              className="font-display text-center text-3xl font-medium tracking-tight text-balance text-[var(--color-brand-teal)] sm:text-4xl"
            >
              Things my friends say about me.
            </h2>
          </FadeIn>
        </Container>

        <FadeIn className="mt-12 flex flex-col gap-5 sm:mt-14">
          <TestimonialRow
            items={FRIENDS_SAY_TOP}
            direction="rtl"
            duration="55s"
          />
          <TestimonialRow
            items={FRIENDS_SAY_BOTTOM}
            direction="ltr"
            duration="62s"
          />
        </FadeIn>
      </section>

      {/* ---------------------------------------------------- featured work */}
      <section
        aria-labelledby="books-heading"
        className="bg-[var(--color-band-2)] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <FadeIn className="max-w-3xl">
            <h2
              id="books-heading"
              className="font-display text-3xl font-medium tracking-tight text-balance text-[var(--color-brand-teal)] sm:text-4xl lg:text-5xl"
            >
              Check out some of my books.
            </h2>
          </FadeIn>

          <FadeInStagger faster className="mt-10 sm:mt-12">
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 xl:grid-cols-6 xl:gap-x-6"
            >
              {FEATURED_WORKS.map((work) => (
                <FadeIn as="li" key={work.href}>
                  <Link href={work.href} className="group block">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[var(--color-band-1)] ring-1 ring-[var(--color-navy-10)] transition duration-300 group-hover:ring-[var(--color-teal-30)]">
                      {work.cover ? (
                        <Image
                          src={work.cover}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 45vw"
                          className="object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-[var(--color-band-3)] p-4 text-center">
                          <span className="font-display text-base font-medium text-balance text-[var(--color-brand-teal)] italic">
                            {work.title}
                          </span>
                          <span className="font-display mt-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                            Cover to come
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="font-display mt-3 text-xs font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                      {work.kicker}
                    </p>
                    <h3 className="font-display mt-1 text-sm font-semibold tracking-tight text-balance text-neutral-900">
                      {work.title}
                    </h3>
                  </Link>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>

          {/* Centred, per Michele. It used to sit alone in the bottom-left
              corner, which read as an orphan under a six-up grid. */}
          <FadeIn className="mt-12 flex justify-center">
            <Button href="/author" variant="secondary">
              See every title
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* ------------------------------------------------ the Method */}
      {/* Two bands, not one. Michele's note was that consecutive ideas ran
          together into one scroll, so the pitch and the three starting
          postures sit on different grounds with their own padding. Each band is
          sized to land inside a laptop screen on its own. */}
      <section
        aria-labelledby="method-heading"
        className="bg-[var(--color-band-3)] py-20 sm:py-24 lg:py-28"
      >
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
              The Brave Purpose Author Method
            </span>
            <h2
              id="method-heading"
              className="font-display mt-6 text-3xl font-medium tracking-tight text-balance text-[var(--color-brand-teal)] sm:text-4xl lg:text-5xl"
            >
              A book in you. A method that gets it on the page.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-700 sm:text-xl">
              Twenty-six weeks, one writer, one method. What comes out the other
              side is a publication-ready book that still sounds like you.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Deliberately band-1, the same ground `html` carries. This is the last
          section on the page, and the footer sits below it with a top margin
          of its own. Any other band here would leave that margin showing as a
          strip of mismatched colour just above the navy footer, which reads as
          a bug rather than as breathing room. If you reorder these sections,
          whatever ends up last has to be band-1 for the same reason. */}
      <section
        aria-label="Where writers start"
        className="bg-[var(--color-band-1)] py-16 sm:py-20 lg:py-24"
      >
        <div className={WIDE}>
          <FadeIn>
            <h3 className="font-display text-center text-xl font-medium tracking-tight text-balance text-neutral-900 sm:text-2xl">
              The starting posture does not matter.
            </h3>
          </FadeIn>

          <FadeInStagger faster className="mt-10 sm:mt-12">
            <ul
              role="list"
              className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:gap-8"
            >
              {[
                'A blank page.',
                'Half a draft in three folders.',
                'A finished manuscript that will not sit still.',
              ].map((posture) => (
                <FadeIn as="li" key={posture} className="flex">
                  <p className="font-display flex w-full items-center justify-center rounded-2xl bg-[var(--color-band-3)] p-8 text-center text-lg leading-7 font-medium text-balance text-neutral-800 ring-1 ring-[var(--color-navy-10)]">
                    {posture}
                  </p>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>

          <FadeIn className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:mt-14">
            <Button href="/coach">Work with Michele</Button>
            <Button href="/how-it-works" variant="secondary">
              See how it works
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* No closing CTA block. Michele cut "Ready when you are" entirely and
          asked to run straight from the Method into the footer. The footer
          carries the contact routes. */}
    </>
  )
}
