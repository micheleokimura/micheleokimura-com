import type { Metadata } from 'next'

import { pageMetadata } from '@/lib/schema'
import Link from 'next/link'
import { BookOpen, MessageCircle, Mic } from 'lucide-react'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { ContactTrigger } from '@/components/ContactTrigger'
import { LogoMarquee } from '@/components/LogoMarquee'
import {
  DOORS,
  FRIENDS_SAY_BOTTOM,
  FRIENDS_SAY_TOP,
  HERO,
  PULL_QUOTE,
  type Door,
  type Testimonial,
} from '@/lib/home-variants'
import { siteConfig } from '@/lib/site-config'

/**
 * Home page. Rebuilt 2026-08-23 against Michele's walkthrough of the live site.
 *
 * She reads this page in FIRST PERSON now. The H1 is "Hi, I'm Michele Okimura",
 * the three cards say "Book me to speak" / "See my body of work" / "See my
 * method", and the old third-person hero line ("She helps people find the shape
 * of the work they were made to do...") is deleted at her instruction. Do not
 * reintroduce third-person copy on this page.
 *
 * SECTION BANDS. Michele, on the page running as one flat colour: "I'm just
 * staring into a void and I don't know when a thought's completed and it's
 * ready. I'm ready to move on somewhere else." Every section below is
 * full-bleed, sits on one of --color-band-1/2/3, and carries its own vertical
 * padding instead of the old margin stack.
 *
 * The order down the page, which is a rhythm rather than a strict A/B:
 *
 *   hero          navy video
 *   marquee       band-2   (set on the section in LogoMarquee.tsx)
 *   three doors   band-1
 *   pull quote    band-3   deepest, most padding, the pause
 *   the Method    band-2
 *   postures      band-1
 *   footer run-in band-4   (painted by SiteFooter, not by this file)
 *
 * Two rules hold it together. Neighbours never share a band, because a repeated
 * ground is exactly the seam that goes missing. And a CARD never takes a band:
 * tiles use --color-cream, which is warm and lifts off any of these neutrals,
 * whereas a band on a band would be a 5-point difference nobody can see.
 *
 * "Friends say" sits on band-1 between the quote (band-3) and the Method
 * (band-2). Both neighbours differ from it, so the rhythm is unchanged.
 *
 * THE THREE ROLE CARDS ARE THE EXCEPTION to "a card never takes a band". They
 * are not neutral tiles at all now: each one is a coloured gradient using the
 * shared .msg-card system (see tailwind.css), so they sit ON band-1 as
 * saturated objects rather than as a five-point shade difference. The rule
 * still holds for every other card on the page.
 *
 * Padding is py-20/24/28 (80/96/112px) as standard, and more on the quote. The
 * shade change only registers if there is enough quiet either side of it.
 *
 * Sections deleted in this pass, all at Michele's instruction, none to be
 * restored without her:
 *  - "Recognition" ("the work has been checked by people who had to be sure",
 *    plus the 2023 / 2026 / 14-works tiles),
 *  - the founder-and-executive-director blurb under the hero, replaced by the
 *    pull quote,
 *  - "Ready when you are", the ContactBlock that used to close the page. The
 *    page now runs straight from the Method into the footer,
 *  - "A body of work" in full: the heading, the six-cover grid, and the "See
 *    every title" link. /author carries the books, and the Author card in the
 *    three doors is now the only route to them from here.
 *
 * "Things my friends say about me" is LIVE, with Michele's curated list of
 * fifteen quotes signed off 2026-08-24. It was parked twice on the way here;
 * the list itself is now settled, so treat the arrays in home-variants.ts as
 * approved copy rather than a working set.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Speaker, Author, and Writing Coach',
    description:
      'Michele Okimura is a speaker, author, and coach in Honolulu, Hawaiʻi. Two published trade books, two more in 2027, keynotes and workshops, and the Brave Purpose Author Method.',
    path: '/',
    ogDescription:
      'Speaker, author, and coach in Honolulu. Founder and Executive Director of Releasing Generations.',
  }),
  /**
   * The root layout's `%s · Michele Okimura` template only reaches child
   * segments, and app/page.tsx IS the root segment, so the home page is the one
   * route whose <title> never picks the brand up. pageMetadata already puts the
   * full string in og:title; this puts it in the tab and the search result too.
   */
  title: { absolute: `Speaker, Author, and Writing Coach · ${siteConfig.brand}` },
}

/**
 * The doors section escapes Container's inner max-w-2xl cap on purpose.
 * Container narrows its contents to 42rem below `lg`, which would leave three
 * columns about 210px wide at a tablet width. Using the full max-w-7xl gutter
 * instead gives roughly 226px columns at 768px, which the cards can carry.
 */
const WIDE = 'mx-auto max-w-7xl gutter-x'

/**
 * Role-card icons. Names verified against the installed lucide-react, which is
 * strict about them: that package exports `House` rather than `Home` and has no
 * `Waves`, so /speaker had to reach for `AudioWaveform`. `Mic`, `BookOpen` and
 * `MessageCircle` all exist. Typed off one of the icons rather than lucide's
 * own `LucideIcon`, which the package declares but does not export.
 */
const DOOR_ICONS: Record<Door['icon'], typeof Mic> = {
  mic: Mic,
  book: BookOpen,
  message: MessageCircle,
}

/**
 * One card in the two scrolling endorsement rows.
 *
 * BODY TYPE IS 17px, up from the 15px this ran at before it was parked.
 * Michele's note: older readers matter. The card widened with it so the measure
 * stays readable rather than the copy just reflowing into a taller column.
 *
 * The horizontal space between cards is `mx` on the card, NOT `gap` on the
 * track. The marquee keyframes wrap by translating exactly -50% of the track,
 * and a flex `gap` adds a gap BETWEEN the two copies as well as inside them, so
 * -50% lands half a gap short and the loop hitches once per cycle. LogoMarquee
 * uses px-6 on its tiles for the same reason.
 */
function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="mx-3 flex w-[21rem] shrink-0 flex-col rounded-2xl bg-[var(--color-cream)] p-7 ring-1 ring-[var(--color-navy-10)] sm:w-[27rem] sm:p-8">
      <blockquote className="flex-auto text-[1.0625rem] leading-7 text-neutral-800">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-[var(--color-navy-10)] pt-5 text-[0.9375rem]">
        <span className="block font-semibold text-neutral-900">{item.name}</span>
        {item.title ? (
          <span className="mt-0.5 block leading-5 text-neutral-600">
            {item.title}
          </span>
        ) : null}
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
 * One scrolling row. `.marquee-track` and its keyframes come from tailwind.css;
 * the array is rendered twice inside the track because the keyframes translate
 * by exactly -50% for a seamless wrap.
 *
 * `duration` is Michele's spec on restore: 80 to 100s per full loop, up from
 * the 55/62s this ran at before. The two rows run at slightly different speeds
 * and in opposite directions so they never lock into step and read as one
 * block. Hovering anywhere in a row pauses it, and prefers-reduced-motion stops
 * both outright.
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
      {/* FULL VIEWPORT AT EVERY BREAKPOINT. Brett, 2026-08-26, after reviewing
          the mobile treatment on desktop: "the hero treatment we defined for
          mobile now applies to EVERY breakpoint." So the 16:9 band is gone, the
          white header above it is gone, and this is one video filling the glass
          from phone to ultrawide.

          What it replaced, so nobody restores it by accident: `min-h-[32rem]`
          below sm and `sm:aspect-[16/9] sm:max-h-[calc(100svh-4.75rem)]` above
          it, with the copy in a bottom-anchored scrim. That design existed to
          show the whole 16:9 frame including the audience. Full-bleed cannot do
          that at any aspect ratio other than 16:9, and that is the trade Brett
          made knowingly. See the crop note on the video below.

          HOW THE FULL VIEWPORT IS ACHIEVED, across three files:
            1. layout.tsx ships viewport-fit=cover, so iOS stops letterboxing
               the page into the safe area and the video reaches the glass.
            2. SiteHeader goes transparent on this route at every width.
            3. The negative margin below cancels `main`'s header pad exactly,
               reading the same --header-offset that `main` pads with, so the
               section starts at y=0 and the two can never drift apart.

          `min-h-[100svh]`, not `100dvh` and not `100vh`. svh is the viewport
          with browser chrome SHOWN, which is the state the page loads in, so
          the hero fills the screen exactly at first paint. dvh is correct at
          every scroll position and wrong in a more annoying way: it re-lays-out
          the hero while you scroll, which at this size reads as the whole page
          jumping. 100vh is the largest of the three and would push the CTA
          under the URL bar on load. `min-h` rather than `h`, so the copy can
          grow the section at a large accessibility text size instead of
          overflowing it.

          VERTICAL PLACEMENT IS CENTRING, NOT A FIXED 30%. Brett asked for the
          block to start around 30% down with the CTA ending around 70%, so it
          reads balanced rather than floaty. A literal `top: 30%` hits that on
          one screen size and misses everywhere else, because the block's height
          is set by how many lines the copy wraps to. Centring inside the space
          left between the header pad and the bottom inset hits the brief across
          the range instead, and it can never push the CTA off the bottom:

            393x852 phone     block 32.2% to 73.4%
             834x1194 iPad    block 34.6% to 69.4%
            1440x900 desktop  block 29.5% to 75.9%
            1512x860 laptop   block 28.5% to 77.1%

          THE PADDING IS SYMMETRIC, and that is the whole reason the tops land
          near 30 rather than near 25. pt is the header's own height, so the
          copy can never slide under the wordmark or the nav. pb was 2.25rem
          plus the bottom inset, which is all the home indicator needs, and the
          asymmetry quietly biased the centre 30px DOWN on a desktop: measured
          before this, the block ran 32.8% to 79.2% at 1440x900. Matching pb to
          pt costs nothing and buys back that bias. The smallest --header-offset
          is 5rem, comfortably past the 34px indicator, so the clearance the old
          value existed for is still there.

          The bottoms still run past 70, to between 69 and 77. That is the copy,
          not the layout: at 1440 the block is 418px against the 360px that a
          literal 30-to-70 allows, and the only ways to close it are a smaller
          hero type scale or less copy. Both are Michele's call, not a QA fix,
          so the block is centred and honest rather than squeezed. */}
      <section
        aria-label="Michele Okimura"
        className="relative isolate mt-[calc(var(--header-offset)*-1)] flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[var(--color-navy)] pt-[var(--header-offset)] pb-[var(--header-offset)]"
      >
        {/* DO NOT restyle this element without reading the whole comment. The
            file itself is owned by a separate task and must not be touched
            from here.

            object-cover + object-center is the whole crop policy. Cover is what
            lets one 16:9 clip fill a portrait phone and an ultrawide monitor
            from the same source; center is what keeps Michele, who stands
            upper-middle in every stage beat, inside the visible window at both
            extremes. On a 393x852 phone that window is roughly the middle 26%
            of the frame's width; on a 2560x1440 monitor it is the full width
            and the middle 90% of its height.

            If Michele ever needs nudging once the re-edited clip lands, the
            control is `object-position` and the direction is counter-intuitive:
            a value BELOW 50% (say `object-[40%_center]`) shows more of the
            frame's LEFT side and moves her toward the right of the screen,
            which is the direction that suits this layout, since the copy owns
            the left. Above 50% moves her left, into the text. */}
        <video
          src="/videos/michele-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/team/michele-hero-canva.jpg"
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden="true"
        />

        {/* Layer 1 of 3: a flat wash over the WHOLE frame, and every contrast
            figure in this file is measured with it already applied. It went
            from 25% to 28% when the copy moved off the bottom of the frame:
            the old design could lean on a heavy bottom scrim because nothing
            sat above it, and this one has words across the middle of the
            picture instead.

            The clip is dark to begin with. Measured over 65 frames, mean
            relative luminance behind the copy is 0.089, and this wash is doing
            almost nothing for most of the loop. What it exists for is the two
            audience cutaways that run to 0.95, which are what every floor in
            this file is set against. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--color-navy)]/28"
        />

        {/* Layer 2, PORTRAIT ONLY. Below sm the copy runs the full width of the
            screen, so a left-weighted scrim would do nothing for it and this
            one runs top to bottom instead.

            The ramp is shaped around what sits where. It stays out of the way
            through the top fifth, which is the header's own scrim's territory,
            reaches 0.42 by 28% where the H1 starts, and is at full strength by
            40% where the body copy begins. That split is deliberate and it is
            the same one the old bottom scrim used: an H1 is large text and owes
            3:1, so it can sit on a lighter ground than the subhead, which owes
            4.5:1. Composited over the wash above, worst frame in the clip:

              H1 top line, 29% down     effective 0.604   (floor 0.54)
              subhead, 40% down         effective 0.798   (floor 0.62)
              award and CTA, 55%+       effective 0.85+ */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(31,39,68,0)_0%,rgba(31,39,68,0.12)_18%,rgba(31,39,68,0.42)_28%,rgba(31,39,68,0.72)_40%,rgba(31,39,68,0.80)_70%,rgba(31,39,68,0.82)_100%)] sm:hidden"
        />

        {/* Layer 2, LANDSCAPE. From sm up the copy is a column down the left,
            so the scrim is too: heavy on the left, gone by 85% across, which
            leaves the right side of the frame clean for Michele. This is the
            half of the design that makes the rule-of-thirds composition Brett
            asked for actually legible rather than merely arranged.

            The fade point is measured against the copy column, not chosen. That
            column is capped at min(34rem, 46vw), so its right edge lands at
            about 46% across on a 1440 screen and 50% on a 1024 one, and the
            stops are set against the wider of the two. Composited over the wash, worst
            frame in the clip:

              left edge of the copy     effective 0.798
              30% across                effective 0.775
              50% across, column end    effective 0.685   (floor 0.62)
              62% across, no text       effective 0.545
              85% across                the wash alone, 0.28

            If the copy column is ever widened, move the 0.52 stop with it or
            the last line of every paragraph loses its ground. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(31,39,68,0.72)_0%,rgba(31,39,68,0.68)_38%,rgba(31,39,68,0.52)_54%,rgba(31,39,68,0.18)_72%,rgba(31,39,68,0)_85%)] sm:block"
        />

        {/* `relative` is load-bearing, not decoration. Everything above is
            absolutely positioned, and a static element paints UNDER a
            positioned sibling however late it appears in the DOM, so without
            this the copy renders behind the scrims.

            Same `mx-auto max-w-7xl gutter-x` the header row uses, so the H1 and
            the wordmark share one left edge at every width. Not <Container>:
            its inner max-w-2xl cap would set this column's width below lg
            instead of the cap below. */}
        <div className="relative mx-auto w-full max-w-7xl gutter-x">
          {/* THE LEFT THIRD, expressed as a cap rather than a fraction.
              `min(34rem, 46vw)` is two limits at once: 46vw keeps the column to
              roughly the left third of a wide screen, so the composition Brett
              asked for holds from a laptop to an ultrawide, and 34rem stops the
              measure running past a readable line length on the very widest
              ones. Below sm there is no cap at all, because a third of a 393px
              phone is not a column, it is a gutter.

                 768px tablet   353px, 46%
                1024px          471px, 46%
                1184px and up   544px, capped by the 34rem
                1440px desktop  544px, 38%
                1920px          544px, 28%

              46 rather than 42, and the number came from a measurement rather
              than taste. At 42vw a 1024x768 iPad in landscape gave the column
              430px while the type was already at its `lg` sizes, so a 56px H1
              wrapped to three lines and the block ran to 85% of the screen.
              46vw only does anything below 1184px, where the 34rem cap has not
              engaged yet, so every desktop width is untouched by this. */}
          <FadeIn className="sm:max-w-[min(34rem,46vw)]">
            <h1 className="font-display text-[2rem] leading-[1.05] font-medium tracking-tight text-balance text-[var(--color-cream)] sm:text-[2.5rem] lg:text-6xl">
              {HERO.h1}
            </h1>

            {/* Middle dots, not periods. Michele was specific.

                CREAM, not the pale teal --color-teal-on-dark that every other
                eyebrow on a dark surface uses. That token is specified against
                FLAT navy, where it holds 7.71:1. Over video it does not: at the
                overlay this hero runs, the measurement put it at 4.26:1 with
                ~100 failing pixels in the bright audience frames, and the only
                ways to rescue it were to darken the hero further or to brighten
                the ink. Cream is the brighter ink and lands at 5.04:1. If the
                teal eyebrow is wanted back here, the video has to get darker. */}
            <p className="font-display mt-3 text-sm font-semibold tracking-[0.16em] text-[var(--color-cream)] uppercase sm:mt-4 sm:text-base lg:text-lg">
              {HERO.roles.join(' · ')}
            </p>

            {/* Solid cream, not cream/90. The 10% transparency blended the
                glyphs toward the video behind them and cost about half a point
                of contrast: 4.05:1 measured, which fails AA, against 5.16:1
                solid. Do not reintroduce an opacity here. */}
            <p className="mt-4 text-[0.9375rem] leading-7 text-[var(--color-cream)] sm:mt-5 sm:text-base sm:leading-7 lg:text-xl lg:leading-9">
              {HERO.subhead}
            </p>

            {/* Award. A line with a hairline rule, NOT a pill: Michele banned
                pill-shaped badges sitewide in this same review.

                THE ORGANIZATION IS THE SUBJECT OF THE SENTENCE, AND THAT IS THE
                WHOLE POINT OF THIS BLOCK. The award went to Releasing
                Generations (Explicit Movement is its DBA), not to Michele. An
                earlier version led with the honour, which sitting under her name
                in her own hero read as a personal award.

                So: do not rewrite this to start with Michele, and do not trim it
                down to just the honour to save a line. If it is ever too long
                for the layout, take it out of the hero altogether rather than
                shortening it back into a personal claim. See HERO.award.

                14px at every width. It used to be `text-xs` below sm and 13px
                above, which rendered this credit SMALLER on the phone than on
                the desktop it was designed for; the flat 13px that replaced
                that went up one step of the scale to `text-sm` for reading
                size. Stay a clear step under the subhead above: this line is
                a credit, not a second subhead. */}
            <p className="mt-4 flex items-start gap-3 text-sm leading-6 text-[var(--color-cream)]/75 sm:mt-5">
              <span
                aria-hidden="true"
                className="mt-2 h-px w-6 shrink-0 bg-[var(--color-teal-on-dark)] sm:w-8"
              />
              <span>
                {HERO.award.lead}
                <span className="font-semibold text-[var(--color-cream)]">
                  {HERO.award.honor}
                </span>
                {HERO.award.tail}
              </span>
            </p>

            <div className="mt-6 sm:mt-7">
              <ContactTrigger className="px-5 py-3 text-sm sm:px-6 sm:py-3.5 sm:text-base">
                {HERO.cta}
              </ContactTrigger>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* band 3 */}
      <LogoMarquee />

      {/* ------------------------------------------------------ three doors */}
      {/* Speaker, Author, Coach, left to right. Order is locked in DOORS. */}
      <section
        aria-labelledby="three-ways-heading"
        className="bg-[var(--color-band-1)] py-20 sm:py-24 lg:py-28"
      >
        <div className={WIDE}>
          <h2 id="three-ways-heading" className="sr-only">
            Three ways to work with Michele
          </h2>
          {/* TWO COLUMNS AT md, THREE ONLY AT lg, and the breakpoint is
              measured. Three columns from md gave each card 200px of inside
              width, and the CTA labels need 209px ("Book me to speak") and
              238px ("See my body of work"), so two of the three wrapped their
              button onto a second line and the Author card's copy ran to eight
              lines. Two-up at md gives 302px inside and everything fits.

              Three cards over two columns leaves the last one alone on its own
              row, so it spans both and is held to one column's width. Centred
              reads as deliberate; flush left reads as a missing tile. Same
              treatment /speaker gives its orphan. */}
          <FadeInStagger faster>
            <ul
              role="list"
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {DOORS.map((door, i) => {
                const Icon = DOOR_ICONS[door.icon]
                const isOrphan = i === DOORS.length - 1 && DOORS.length % 2 === 1
                return (
                  <FadeIn
                    as="li"
                    key={door.key}
                    className={
                      isOrphan
                        ? 'flex md:col-span-2 md:mx-auto md:w-[calc(50%-0.625rem)] lg:col-span-1 lg:mx-0 lg:w-auto'
                        : 'flex'
                    }
                  >
                    {/* The whole card is the link, so the target is the card
                        rather than a two-word phrase at the bottom of it. The
                        CTA below is therefore decorative: it lives inside this
                        anchor and is never a second one. */}
                    <Link
                      href={door.href}
                      aria-label={`${door.label}: ${door.cta}`}
                      className={`msg-card msg-${door.accent} msg-tex-${door.texture} group flex w-full flex-col items-center gap-4 rounded-3xl px-6 py-9 text-center text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--color-navy-20)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] sm:px-7 sm:py-10`}
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-inset ring-white/25 transition duration-300 group-hover:bg-white/25"
                      >
                        <Icon className="h-7 w-7" strokeWidth={1.5} />
                      </span>

                      <h3 className="font-display text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">
                        {door.label}
                      </h3>

                      {door.headline ? (
                        <p className="font-display text-lg leading-7 font-semibold tracking-tight text-balance text-white">
                          {door.headline}
                        </p>
                      ) : null}

                      {door.body ? (
                        <p
                          className={
                            door.headline
                              ? 'text-sm leading-6 text-white/85'
                              : 'font-display text-base leading-7 font-medium text-balance text-white'
                          }
                        >
                          {door.body}
                        </p>
                      ) : null}

                      {/* Pushed to the bottom so every card's control sits on
                          the same baseline whatever the copy length, and on the
                          darkest part of the gradient. `rounded-md`, never a
                          pill: the sitewide no-pills rule wins over the
                          reference design. The icon circle above is allowed to
                          be round because it holds an icon, not a label. */}
                      <span className="mt-auto pt-3">
                        {/* px-4 rather than the /speaker chip's px-5. The
                            longest label here, "See my body of work", is 176px
                            of glyphs plus the arrow, and at lg the card has
                            248px inside; px-5 leaves 10px of slack and px-4
                            leaves 18px, which is the difference between fitting
                            and fitting reliably across font loading. */}
                        <span className="font-display inline-flex items-center gap-1.5 rounded-md bg-white/15 px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase ring-1 ring-inset ring-white/30 transition duration-300 group-hover:bg-white/25">
                          {door.cta}
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          >
                            &rarr;
                          </span>
                        </span>
                      </span>
                    </Link>
                  </FadeIn>
                )
              })}
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
      {/* Band-3, the deepest of the content grounds, and the most padding on
          the page. This is the one place the scroll is meant to slow down. */}
      <section
        aria-label="In Michele's words"
        className="bg-[var(--color-band-3)] py-24 sm:py-28 lg:py-36"
      >
        <Container>
          <FadeIn>
            {/* max-w-5xl, not 4xl, and the number is measured. Michele asked
                for one sentence per visual line. At the lg display size the
                longer sentence renders 978px wide unwrapped; max-w-4xl is
                896px, so it wrapped and the quote came out as three ragged
                lines instead of two. 5xl is 1024px, which clears it with room,
                and Container allows 1216px at lg so nothing overflows. */}
            <figure className="mx-auto max-w-5xl text-center">
              {/* No quotation marks. At this size a pair of curly quotes just
                  hangs two heavy marks in the corners; the display setting
                  already reads as a quote. Michele asked for it this way.

                  One sentence per line, as separate blocks rather than a <br>.
                  A <br> would force a break even where the line then wraps
                  anyway on a narrow screen, giving three ragged lines; a block
                  per sentence breaks between them and lets each wrap on its own
                  terms. text-balance then evens out whichever one does wrap. */}
              {/* The sm step (text-4xl, 32px) is deliberately absent. Between
                  640px and lg, Container caps its own contents at max-w-2xl
                  (672px), and the longer sentence needs 711px at 32px, so that
                  step was the one width where it wrapped no matter what this
                  figure's max-w said. At 28px it needs 622px and fits. The type
                  therefore holds 28px until lg and then goes to 44px, which
                  keeps one sentence per line at every width. */}
              <blockquote className="font-display text-[1.75rem] leading-[1.15] font-medium tracking-tight text-balance text-[var(--color-brand-teal)] lg:text-5xl">
                {PULL_QUOTE.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </blockquote>
              <figcaption className="font-display mt-8 text-xs font-semibold tracking-[0.18em] text-neutral-600 uppercase sm:mt-10 sm:text-sm">
                <span aria-hidden="true">&mdash; </span>
                {PULL_QUOTE.attribution}
              </figcaption>
            </figure>
          </FadeIn>
        </Container>
      </section>

      {/* --------------------------------------- things my friends say */}
      {/* Restored 2026-08-24 after Michele reversed the decision to leave
          testimonials off the home page. Back on band-1, between the quote on
          band-3 and the Method on band-2, which is exactly where it sat before.
          Slower and larger than the parked version; see the row and the card. */}
      <section
        aria-labelledby="friends-say-heading"
        className="overflow-hidden bg-[var(--color-band-1)] py-20 sm:py-24 lg:py-28"
      >
        <Container>
          <FadeIn>
            <h2
              id="friends-say-heading"
              className="font-display text-center text-3xl font-medium tracking-tight text-balance text-[var(--color-brand-teal)] sm:text-4xl"
            >
              What leaders and friends are saying
            </h2>
          </FadeIn>
        </Container>

        <FadeIn className="mt-12 flex flex-col gap-6 sm:mt-14">
          <TestimonialRow items={FRIENDS_SAY_TOP} direction="rtl" duration="88s" />
          <TestimonialRow
            items={FRIENDS_SAY_BOTTOM}
            direction="ltr"
            duration="96s"
          />
        </FadeIn>
      </section>

      {/* The "A body of work" section stood here and is gone entirely, at
          Michele's instruction on 2026-08-23: the heading, the six-cover grid,
          and the "See every title" link. Her reasoning was that /author already
          carries the books, so the home page does not need a shelf of its own.
          The first pass only cut the "fourteen works, eight case studies"
          framing from the heading; this cut is the whole block. The Author
          card in the three doors above is now the only route to the books from
          this page, and that is deliberate. */}

      {/* ------------------------------------------------ the Method */}
      {/* Two bands, not one. Michele's note was that consecutive ideas ran
          together into one scroll, so the pitch and the three starting
          postures sit on different grounds with their own padding. Each band is
          sized to land inside a laptop screen on its own. */}
      <section
        aria-labelledby="method-heading"
        className="bg-[var(--color-band-2)] py-20 sm:py-24 lg:py-28"
      >
        <Container>
          {/* max-w-4xl, not 3xl. "A method that gets it on the page." measures
              about 780px at the lg heading size and 3xl is 768px, so the second
              sentence would have wrapped and undone the split. The body copy
              under it keeps its own narrower measure. */}
          <FadeIn className="mx-auto max-w-4xl text-center">
            <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
              The Brave Purpose Author Method
            </span>
            {/* One sentence per line, as blocks rather than a <br>, the same
                way the pull quote does it. The break is now structural, so the
                heading cannot wrap mid-sentence the way Michele objected to.

                The `text-balance` CLASS is gone but balancing is not: there is
                a global `h1,h2,h3,h4 { text-wrap: balance }` in tailwind.css
                that still inherits into these spans. That is harmless and
                wanted here, because it only does anything if one sentence is
                itself too long for the measure, in which case evening out its
                two lines is the right behaviour. */}
            <h2
              id="method-heading"
              className="font-display mt-6 text-3xl font-medium tracking-tight text-[var(--color-brand-teal)] sm:text-4xl lg:text-5xl"
            >
              <span className="block">A book in you.</span>
              <span className="block">A method that gets it on the page.</span>
            </h2>
            {/* Held at max-w-3xl so widening the wrapper for the heading does
                not stretch the body copy's measure with it. */}
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-neutral-700 sm:text-xl">
              Twenty-six weeks, one writer, one method. What comes out the other
              side is a publication-ready book that still sounds like you.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* The last section on the page. It no longer has to be band-1: the
          footer used to sit below an UNPAINTED margin, so any band here left a
          strip of page ground above the navy. SiteFooter now paints its own
          run-in with band-4, so this is free to take whatever the rhythm wants
          and the descent into the footer is 1 -> 4 -> navy. */}
      <section
        aria-label="Where writers start"
        className="bg-[var(--color-band-1)] py-20 sm:py-24 lg:py-28"
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
                  <p className="font-display flex w-full items-center justify-center rounded-2xl bg-[var(--color-cream)] p-8 text-center text-lg leading-7 font-medium text-balance text-neutral-800 ring-1 ring-[var(--color-navy-10)]">
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
