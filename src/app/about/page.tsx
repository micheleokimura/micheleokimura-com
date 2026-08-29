import type { Metadata } from 'next'

import { pageMetadata } from '@/lib/schema'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { BannerHero } from '@/components/BannerHero'
import Image from 'next/image'

import { AboutMosaic } from '@/components/AboutMosaic'
import { ContactBlock } from '@/components/ContactBlock'
import { WebPageJsonLd } from '@/components/JsonLd'
import { awards, credentials } from '@/lib/credentials'
import { OWN_BRANDS } from '@/lib/organizations'
import { GOLDEN_THREAD_QUOTE } from '@/lib/projects'

export const metadata: Metadata = pageMetadata({
  title: 'About Michele',
  description:
    'Michele Okimura is an author, speaker, executive director, and coach based on O\'ahu, Hawai\'i. Founder of Releasing Generations, Explicit Movement, Kingdom Families, and ReThink Creativity. 2023 Outstanding Advocate for Children and Youth of Hawai\'i.',
  path: '/about',
})

// Voice ported from Michele's current micheleokimura.com /about page (warm,
// vulnerable, first person, Brené Brown style); facts confirmed against the
// citation-backed credentials dossier. Em dashes -> commas per house style.
// Verbatim review by Michele pending.
export default function AboutPage() {
  return (
    <>
      {/* /about is the primary page ABOUT Michele, which is what
          Person.mainEntityOfPage in src/lib/schema.ts points at. This WebPage
          node is the other half of that pairing. */}
      <WebPageJsonLd
        path="/about"
        name="About Michele Okimura"
        description="Author, speaker, coach, and Executive Director of Releasing Generations, based on O'ahu, Hawai'i."
      />

      {/* Banner runs with no subtitle. It used to carry "Maybe dreams give
          purpose a voice.", which Michele cut on 2026-08-23 because the pull
          quote further down says the same thing better: "I believe dreams give
          purpose a voice." Do not reinstate one without retiring the other.

          Calls BannerHero directly rather than through the PageIntro alias,
          the same way /speaker does, because it needs a surface other than the
          sitewide default. `slate` is the earthy periwinkle this page
          runs, and the closing panel at the foot of the page runs the SAME
          flat value. Change one and change the other, or the page stops
          framing itself. See the --color-about-slate block in tailwind.css. */}
      <BannerHero eyebrow="About" title="About Michele." surface="slate" />

      {/* Michele's positioning tagline, added 2026-08-26 as the page opener.
          It sits under the site banner and above every piece of content,
          because it is the frame the rest of the page hangs off. Two separate
          visual lines with a gap, never run together as a sentence. The pull
          quote further down is teal at a similar size, so this one is navy and
          bold to keep the two from competing. Line one is the punch and
          runs bigger and extrabold. Line two answers softer at roughly 75
          percent of its size, still bold and still centered. Check the
          ratio against the --text-* values in src/styles/tailwind.css, not
          against stock Tailwind: this theme redefines the whole scale, so
          text-3xl is 1.75rem here and text-5xl is 2.75rem. */}
      <Container className="pt-14 pb-16 sm:pt-16 sm:pb-20">
        <FadeIn className="mx-auto max-w-5xl text-center text-[var(--color-navy)]">
          <p className="font-display text-3xl leading-[1.1] font-extrabold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Your story. Your power. Your creative genius.
          </p>
          <p className="font-display mt-4 text-xl leading-[1.1] font-bold tracking-tight text-balance sm:mt-5 md:text-2xl lg:text-4xl">
            My great adventure is helping you find yours.
          </p>
        </FadeIn>
      </Container>

      <Container>
        <FadeIn>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-start lg:gap-16">
            <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl bg-neutral-100 sm:max-w-sm lg:max-w-none">
              <Image
                src="/images/michele/about-hero.jpg"
                alt="Michele Okimura on the beach in Hawai'i"
                fill
                priority
                sizes="(min-width: 1024px) 20rem, 60vw"
                className="object-cover object-[62%_28%]"
              />
            </div>

            {/* Body prose runs one step above the sitewide 18px here, and only
                here. Michele asked on 2026-08-27 for a readability test scoped
                to /about, because her audience skews older: text-lg -> text-xl,
                20px. leading moves with it, 8 -> 9, so the ratio holds at 1.8
                instead of tightening to 1.6. Do NOT change the scale in
                src/styles/tailwind.css to do this; the whole point is that the
                rest of the site stays at 18px for the comparison. Reverting is
                this one class string and the Meet Michele one below. */}
            <div className="max-w-2xl space-y-6 text-xl leading-9 text-neutral-600">
              <p>
                I&rsquo;m an author, speaker, and coach who has spent the last four
                decades inspiring courage, vulnerability, healing, and purpose.
              </p>
              <p>
                My story has been an adventure in finding purpose, and it began with my
                own healing journey. Transforming feelings of worthlessness into a deep
                sense of value ignited a fire in me, a passion to help others discover
                the same strength within themselves.
              </p>
              <p>
                I am the founder and executive director of{' '}
                <a
                  href="https://releasinggenerations.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition hover:decoration-2"
                >
                  Releasing Generations
                </a>
                , and I write, speak, and teach across Hawai&lsquo;i and beyond. For more than
                twenty years I served as a pastor, and before that I spent seventeen
                years as an elementary school teacher. Across all of it the work is the
                same: helping people find the courage to live out the purpose they were
                made for.
              </p>
              <p>
                Beyond the work, my heart is at home. I&rsquo;ve been happily married to
                Rob for 42 years, and we&rsquo;re grateful to have raised two adult
                children, Aaron and Jessica. Our son-in-law Kevin and our beautiful
                grandbaby, Mia, complete our little world.
              </p>
              <p>
                My firm belief is that every person&rsquo;s story, even the broken ones,
                can become a launchpad into a future full of freedom, wonder, and
                limitless possibilities.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* The golden thread. Michele's own framing of what connects the books,
          the curricula, and the programs. Wording is single-sourced from
          src/lib/projects.ts, which the Author page and every case study also
          quote. Verbatim. */}
      <Container className="mt-16 sm:mt-20">
        <FadeIn>
          <figure className="mx-auto max-w-4xl border-l-2 border-[var(--color-brand-terracotta)] pl-6 sm:pl-8">
            <blockquote className="font-display text-2xl leading-10 text-neutral-900 italic sm:text-3xl sm:leading-tight">
              &ldquo;{GOLDEN_THREAD_QUOTE}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm font-medium text-neutral-500 not-italic">
              Michele Okimura
            </figcaption>
          </figure>
        </FadeIn>
      </Container>

      {/* Meet Michele: a closer, warmer photo before the timeline pulls back
          to tell the whole story chronologically. */}
      {/* lg:pb- is the signature's clearance side by side, where the photo is
          the last thing in the container and the spill lands in whatever
          follows. That is the teal line and its py-28, and for the first time
          the spill is larger than it: 124px against 112px, so without this
          pad the signature would cross into "I believe dreams give purpose a
          voice." The 3rem buys 36px of margin on top of that. */}
      <Container className="mt-16 sm:mt-20 lg:pb-12">
        <FadeIn>
          {/* The narrow 20rem track is on the RIGHT here, because the photo
              carries lg:order-last and so lands in the second column. It used
              to be [minmax(0,20rem)_1fr], which put the photo in the 1fr track
              and rendered it 832px wide at 1440, more than twice the hero
              above it. Michele flagged that on 2026-08-26: "way too big".
              Both portraits are now the same 320x400.

              The first track is 42rem rather than 1fr, and that is the whole
              of the second fix from the same day: "too much gap" between the
              copy and the photo. A 1fr track measured 832px at 1440 while the
              paragraph inside it is capped at max-w-2xl, so 160px of the
              track sat empty to the right of the text and the 4rem gap piled
              on top of it, putting 224px between the last word and the photo.
              Pinning the track to 42rem (max-w-2xl exactly) leaves no slack
              inside it, so the gap utility is now the only thing separating
              them: 48px. The photo no longer reaches the container's right
              edge, which is the price of moving it left. If it is ever put
              back on that edge, put the 1fr back too and widen the paragraph
              instead, because the slack always reappears otherwise. */}
          {/* Two row gaps, because there are two signatures. Below sm the
              signature is the small contained one and hangs 32px past the
              frame, so 4rem is plenty. From sm up it is the big one that
              crosses the corner and hangs 125px, and the photo still sits
              directly above the eyebrow, so that needs 10rem. Re-measure both
              whenever the signature moves. */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-40 sm:gap-y-48 lg:grid-cols-[minmax(0,42rem)_minmax(0,20rem)] lg:items-center lg:gap-x-12">
            {/* Two boxes, because the signature has to escape the one the
                photo is clipped by. This outer box owns the size and is the
                positioning context; the inner one owns the rounded corners
                and the `overflow-hidden` that makes them. The signature is a
                child of the outer box, so it can cross the print edge. Put
                them back together and the tail gets cut off again. */}
            <div className="relative order-first aspect-[4/5] w-full max-w-xs sm:max-w-sm lg:order-last lg:max-w-none">
              <div className="absolute inset-0 overflow-hidden rounded-3xl bg-neutral-100">
                <Image
                  src="/images/michele/about-meet-michele.jpg"
                  alt="Michele Okimura laughing at home"
                  fill
                  sizes="(min-width: 1024px) 20rem, 60vw"
                  className="object-cover"
                />
              </div>
              {/* Her signature, set rather than scanned. See the @font-face
                  note in tailwind.css for why Mrs Saint Delafield and what it
                  beat. She settled on it on 2026-08-26 ("perfect"), so the
                  face is fixed now; tune the numbers around it.

                  Live text, not an image, so it stays sharp at any DPR.

                  THE ROTATION IS NEGATIVE, and it has been both signs, so the
                  reasoning for each is worth keeping.

                  Negative climbs to the right, which is what her original
                  sketch shows and what she confirmed: the signature starts
                  low on the left and sweeps up across the bottom-right
                  corner. Positive descends, which is the only way to get the
                  corner to cut the middle of "Michele" with "Mich" left on
                  the print, and that composition was live for two deploys
                  before she asked for the sketch angle back. The two cannot
                  both be had: with an upward slant, whatever sits at the
                  corner has everything before it hanging below the frame. So
                  the start of "Michele" hangs below the photo by design here,
                  and that is the cost of the sketch.

                  Flipping the sign also removed a responsive problem that had
                  forced two separate compositions. Descending, the tail ran
                  sideways and needed 143px of room the phone did not have.
                  Climbing, the same tail runs mostly DOWNWARD, so it spills
                  into the row gap instead of off the screen, and one set of
                  insets now serves every width. If the sign is ever flipped
                  back, the phone breakpoint has to come back with it.

                  Two levers position this, and they are independent. The
                  right and bottom insets slide the whole block along its own
                  axis and decide where it crosses the corner; the padding on
                  "Love," slides only the first line, and is what keeps it on
                  the print without disturbing that crossing. Tune in that
                  order.

                  The right inset is capped by the narrowest phone rather than
                  by taste, and that is the one place the two breakpoints
                  differ. Michele asked on 2026-08-26 to nudge the whole block
                  up and right so it sits centred on the corner, then for
                  roughly double that, then back down a little with more right
                  again, and again, so that more of "Michele" lands in the
                  white beside the print. Vertical is free and phones take all
                  of it. Horizontal is not: the full move is -34%, which puts
                  the tail 109px past the frame, and a 375px screen has 31px
                  of room beside the photo. Phones are pinned at -8%, which is
                  already their ceiling; everything from sm up, where the
                  photo has room beside it, takes the whole move. Do not unify
                  these without redoing that arithmetic.

                  How the ink looks is `.sig-crayon` in tailwind.css. */}
              {/* The crayon, twice. Same four stages both times: warp the
                  outline, punch grit holes through the fill at two
                  frequencies, press darker wax into what survives. The two
                  differ only in the grit thresholds. "Michele" takes the
                  aggressive one; "Love," is short and sits over the busiest
                  part of the photo, and at those settings it eroded past
                  reading, so it takes -soft. Every number has a reason and
                  they are on `.sig-crayon` in tailwind.css. */}
              <svg
                aria-hidden="true"
                focusable="false"
                className="absolute h-0 w-0"
              >
                <defs>
                  <filter
                    id="crayon-signature"
                    x="-45%"
                    y="-45%"
                    width="190%"
                    height="190%"
                    colorInterpolationFilters="sRGB"
                  >
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.045"
                      numOctaves={4}
                      seed={3}
                      result="warp"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="warp"
                      scale={3}
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="rough"
                    />
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.06"
                      numOctaves={3}
                      seed={17}
                      result="gritCoarse"
                    />
                    <feColorMatrix
                      in="gritCoarse"
                      type="luminanceToAlpha"
                      result="gritCoarseAlpha"
                    />
                    <feComponentTransfer
                      in="gritCoarseAlpha"
                      result="gritCoarseMask"
                    >
                      <feFuncA type="linear" slope={24} intercept={-16.8} />
                    </feComponentTransfer>
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.30"
                      numOctaves={2}
                      seed={41}
                      result="gritFine"
                    />
                    <feColorMatrix
                      in="gritFine"
                      type="luminanceToAlpha"
                      result="gritFineAlpha"
                    />
                    <feComponentTransfer
                      in="gritFineAlpha"
                      result="gritFineMask"
                    >
                      <feFuncA type="linear" slope={24} intercept={-18.72} />
                    </feComponentTransfer>
                    <feComposite
                      in="gritCoarseMask"
                      in2="gritFineMask"
                      operator="over"
                      result="gritMask"
                    />
                    <feComposite
                      in="rough"
                      in2="gritMask"
                      operator="out"
                      result="waxy"
                    />
                    <feFlood floodColor="#8B1E14" result="pressed" />
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.09"
                      numOctaves={3}
                      seed={29}
                      result="patch"
                    />
                    <feColorMatrix
                      in="patch"
                      type="luminanceToAlpha"
                      result="patchAlpha"
                    />
                    <feComponentTransfer in="patchAlpha" result="patchMask">
                      <feFuncA type="linear" slope={1.8} intercept={-0.75} />
                    </feComponentTransfer>
                    <feComposite
                      in="pressed"
                      in2="patchMask"
                      operator="in"
                      result="patches"
                    />
                    <feComposite
                      in="patches"
                      in2="waxy"
                      operator="in"
                      result="pressedOnWax"
                    />
                    <feMerge>
                      <feMergeNode in="waxy" />
                      <feMergeNode in="pressedOnWax" />
                    </feMerge>
                  </filter>
                  <filter
                    id="crayon-signature-soft"
                    x="-45%"
                    y="-45%"
                    width="190%"
                    height="190%"
                    colorInterpolationFilters="sRGB"
                  >
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.045"
                      numOctaves={4}
                      seed={3}
                      result="warp"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="warp"
                      scale={3}
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="rough"
                    />
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.06"
                      numOctaves={3}
                      seed={17}
                      result="gritCoarse"
                    />
                    <feColorMatrix
                      in="gritCoarse"
                      type="luminanceToAlpha"
                      result="gritCoarseAlpha"
                    />
                    <feComponentTransfer
                      in="gritCoarseAlpha"
                      result="gritCoarseMask"
                    >
                      <feFuncA type="linear" slope={24} intercept={-19.2} />
                    </feComponentTransfer>
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.30"
                      numOctaves={2}
                      seed={41}
                      result="gritFine"
                    />
                    <feColorMatrix
                      in="gritFine"
                      type="luminanceToAlpha"
                      result="gritFineAlpha"
                    />
                    <feComponentTransfer
                      in="gritFineAlpha"
                      result="gritFineMask"
                    >
                      <feFuncA type="linear" slope={24} intercept={-21.12} />
                    </feComponentTransfer>
                    <feComposite
                      in="gritCoarseMask"
                      in2="gritFineMask"
                      operator="over"
                      result="gritMask"
                    />
                    <feComposite
                      in="rough"
                      in2="gritMask"
                      operator="out"
                      result="waxy"
                    />
                    <feFlood floodColor="#8B1E14" result="pressed" />
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.09"
                      numOctaves={3}
                      seed={29}
                      result="patch"
                    />
                    <feColorMatrix
                      in="patch"
                      type="luminanceToAlpha"
                      result="patchAlpha"
                    />
                    <feComponentTransfer in="patchAlpha" result="patchMask">
                      <feFuncA type="linear" slope={1.8} intercept={-0.75} />
                    </feComponentTransfer>
                    <feComposite
                      in="pressed"
                      in2="patchMask"
                      operator="in"
                      result="patches"
                    />
                    <feComposite
                      in="patches"
                      in2="waxy"
                      operator="in"
                      result="pressedOnWax"
                    />
                    <feMerge>
                      <feMergeNode in="waxy" />
                      <feMergeNode in="pressedOnWax" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
              <span className="sig-crayon pointer-events-none absolute right-[-8%] bottom-0 origin-bottom-right rotate-[-35deg] sm:right-[-34%] whitespace-nowrap text-right font-signature text-[5.75rem] leading-[0.95] sm:text-[6.9rem] lg:text-[5.75rem]">
                <span className="sig-crayon-soft block pr-[0.6em]">Love,</span>
                <span className="sig-crayon-hard block">Michele</span>
              </span>
            </div>

            <div className="max-w-2xl space-y-4">
              <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                Meet Michele
              </h2>
              {/* Michele's own wording, sent 2026-08-26, replacing the ported
                  WordPress-era copy. One paragraph by direction.

                  "(TSS)" added 2026-08-27 under the sitewide acronym rule: the
                  first body-copy appearance of Talk Story Session on a page is
                  spelled out with the acronym in parentheses, and any later
                  appearance on the SAME page is the bare acronym. This is the
                  only appearance on /about, so it is the spelled-out one. The
                  rule is written out in full at the top of src/app/coach/page.tsx. */}
              {/* Matches the bio block above: text-xl leading-9 for the
                  2026-08-27 readability test. See the note up there. */}
              <p className="text-xl leading-9 text-neutral-600">
                Most days, you&rsquo;ll find me with coffee in hand, laughing
                over a story that gets a little more dramatic every time I tell
                it. I care about real connection. When I step on stage or lead a
                Talk Story Session (TSS), my goal is always the same: to bring
                that same warmth, real-life energy, and heart to the room,
                meeting people right where they are.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* Michele's line, standing on its own between Meet Michele and the
          mosaic. Its py- carries the separation for both, which is why the
          mosaic Container below has no top margin of its own.
          Teal is --color-teal-text, NOT --color-teal: the bright token measures
          2.31:1 on cream and misses even the 3:1 large-text floor, so it cannot
          carry a word at any size. See DESIGN-RULES.md. No quote marks, no
          italics, no background, per direction. */}
      <Container className="py-20 sm:py-28">
        <FadeIn>
          <p className="font-display mx-auto max-w-4xl text-center text-[2rem] leading-[1.1] font-medium tracking-tight text-balance text-[var(--color-teal-text)] sm:text-[2.5rem] lg:text-5xl lg:leading-[1.08]">
            I believe dreams give purpose a voice.
          </p>
        </FadeIn>
      </Container>

      {/* "My Story": one unbroken square mosaic, captions revealed on hover.
          Rebuilt on 2026-08-23 to match Michele's live WordPress About page,
          which she asked for directly. This replaced AboutTimeline, the
          seven-era layout with prose blocks and always-visible caption bands.
          That component and its era prose are in git history if they are ever
          wanted back. See design-references/wordpress-about/. */}
      <Container>
        <AboutMosaic />
      </Container>

      {/* The work Michele leads: her own brand family (own surface, not endorsers) */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
            The work Michele leads
          </h2>
          <ul
            role="list"
            className="mt-8 grid grid-cols-2 items-center gap-6 sm:grid-cols-4"
          >
            {OWN_BRANDS.map((brand) => (
              <li
                key={brand.name}
                className="flex h-24 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-5"
              >
                <span className="relative block h-full w-full">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    sizes="180px"
                    className="object-contain"
                  />
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>

      {/* Honors & recognition + credentials, from the citation-backed dossier */}
      <Container className="mt-20 sm:mt-28">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 lg:grid-cols-2">
          <FadeIn>
            <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
              Honors and recognition
            </h2>
            <ul role="list" className="mt-6 divide-y divide-neutral-200 border-t border-neutral-200">
              {awards.map((award) => (
                <li key={award.title} className="py-5">
                  <p className="font-display text-lg font-semibold tracking-tight text-neutral-950">
                    {award.title}
                    {award.year ? `, ${award.year}` : ''}
                  </p>
                  <p className="mt-1 text-xl leading-9 text-neutral-600">{award.grantor}</p>
                  {award.recipient && (
                    <p className="mt-1 text-xl leading-9 text-neutral-500">{award.recipient}</p>
                  )}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn>
            <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
              Roles and work
            </h2>
            <ul role="list" className="mt-6 space-y-3 border-t border-neutral-200 pt-6 text-xl leading-9 text-neutral-700">
              {credentials.map((c) => (
                <li key={c.label} className="flex gap-3">
                  <span aria-hidden="true" className="text-[var(--color-brand-terracotta-ink)]">
                    &middot;
                  </span>
                  {/* div, not span: a <ul> inside phrasing content is invalid
                      HTML, and only some of these bullets carry a nested list. */}
                  <div>
                    {c.label}
                    {/* Sub-bullets inherit the parent list's text-xl/leading-9,
                        so a nested title reads at the same 20px as the role it
                        sits under. ml-6 is the one indent step; the marker
                        column above is the same width. */}
                    {c.items ? (
                      <ul role="list" className="mt-3 ml-6 space-y-3">
                        {c.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="text-[var(--color-brand-terracotta-ink)]"
                            >
                              &middot;
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Container>

      <ContactBlock heading="Let&rsquo;s work together." surface="slate">
        <p>
          Whether it is coaching through the Brave Purpose Author Method or a
          speaking date, join the waitlist and Michele will reach out personally.
        </p>
      </ContactBlock>
    </>
  )
}
