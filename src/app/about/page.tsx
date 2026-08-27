import type { Metadata } from 'next'

import { pageMetadata } from '@/lib/schema'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
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
          purpose a voice." Do not reinstate one without retiring the other. */}
      <PageIntro eyebrow="About" title="About Michele." />

      {/* Michele's positioning tagline, added 2026-08-26 as the page opener.
          It sits under the site banner and above every piece of content,
          because it is the frame the rest of the page hangs off. Two separate
          visual lines with a gap, never run together as a sentence. The pull
          quote further down is teal at a similar size, so this one is navy and
          bold to keep the two from competing. */}
      <Container className="pt-14 pb-16 sm:pt-16 sm:pb-20">
        <FadeIn className="mx-auto max-w-5xl text-center text-[var(--color-navy)]">
          <p className="font-display text-3xl leading-[1.1] font-extrabold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Your story. Your power. Your creative genius.
          </p>
          <p className="font-display mt-4 text-3xl leading-[1.1] font-bold tracking-tight text-balance sm:mt-5 md:text-4xl lg:text-5xl">
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

            <div className="max-w-2xl space-y-6 text-lg leading-8 text-neutral-600">
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
                I am the founder and executive director of Releasing Generations, and I
                write, speak, and teach across Hawai&lsquo;i and beyond. For more than
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
      {/* lg:pb- is the signature's clearance in the side-by-side layout, where
          the photo is the last thing in the container and the spill lands in
          whatever follows. What follows is the teal line, whose py-28 gives
          112px against a 109px spill: true, but 3px is not a margin. The
          extra 2rem is. */}
      <Container className="mt-16 sm:mt-20 lg:pb-8">
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
          {/* The row gap is 9rem, 11rem once the photo grows at sm, and it is
              all clearance for the signature. Stacked, the photo sits
              directly above the eyebrow, and the signature hangs about 109px
              past the bottom of the frame at base and 131px at sm. Every time
              Michele has asked for the signature to be bigger, this number
              and the lg:pb- on the Container have had to move with it, so
              re-measure both rather than assuming they still fit. */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-36 sm:gap-y-44 lg:grid-cols-[minmax(0,42rem)_minmax(0,20rem)] lg:items-center lg:gap-x-12">
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
                  note in tailwind.css for why Yellowtail, and why it is not
                  her own hand: the Internet Archive has never crawled
                  anything of hers but the home page HTML, and her own site
                  archive has no signature asset either. Both searched twice.

                  Live text, not an image, so it stays sharp at any DPR and
                  scales with the photo. The photo is 320px wide at base,
                  384px at sm, and back to 320px at lg, which is why the size
                  steps up and then back down: the ratio to the frame is what
                  is held constant. Every inset below is a percentage for the
                  same reason.

                  Do not compare this font-size to the ones in git history.
                  Meddon sets much larger per px than the faces before it, so
                  62px here draws "Michele" 305px wide, against 236px for the
                  Yellowtail version at 69px. The word is what got bigger.

                  The angle is -25deg, from a sketch Michele sent on
                  2026-08-26. Counter-clockwise, so "Love," sits low on the
                  left and "Michele" climbs to the right.

                  Two things make it run off the print rather than sit inside
                  it. Michele asked for the spill on 2026-08-26 and then asked
                  for MORE of it: "Love," on the photo, "Michele" mostly off.

                  The first is the negative right inset plus the small bottom
                  one. Both are measured, not guessed: bottom 6% puts "Love,"
                  wholly on the print and drops 109px of "Michele" below it,
                  which is most of the word. The clearance for those 109px is
                  the row gap on the grid and the lg:pb- on the Container, and
                  those two numbers only work for THIS size.

                  The second is the padding on "Love,". Both lines are right
                  aligned, and at -25deg the second line falls down and to the
                  LEFT of the first, so flush right would tuck "Michele"
                  inside the corner instead of past it. Insetting "Love," by
                  0.6em pushes the long line out to be the rightmost thing in
                  the block, which is what reaches the corner and escapes.

                  How the ink itself looks is `.sig-crayon` in tailwind.css. */}
              {/* The crayon: warp the outline, punch grit holes through the
                  fill at two frequencies, then press darker wax into patches
                  of what survives. The thresholds and frequencies all have
                  reasons, and they are on `.sig-crayon` in tailwind.css. It
                  sits here rather than in a shared defs file because this
                  signature is the only thing that references it. */}
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
                      scale={4}
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
                      <feFuncA type="linear" slope={24} intercept={-13.92} />
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
                      <feFuncA type="linear" slope={24} intercept={-15.84} />
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
              <span className="sig-crayon pointer-events-none absolute right-[-5%] bottom-[6%] origin-bottom-right rotate-[-25deg] whitespace-nowrap text-right font-signature text-[3.875rem] leading-[0.95] sm:text-[4.65rem] lg:text-[3.875rem]">
                <span className="block pr-[0.6em]">Love,</span>
                <span className="block">Michele</span>
              </span>
            </div>

            <div className="max-w-2xl space-y-4">
              <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                Meet Michele
              </h2>
              {/* Michele's own wording, sent 2026-08-26, replacing the ported
                  WordPress-era copy. One paragraph by direction. */}
              <p className="text-lg leading-8 text-neutral-600">
                Most days, you&rsquo;ll find me with coffee in hand, laughing
                over a story that gets a little more dramatic every time I tell
                it. I care about real connection. When I step on stage or lead a
                Talk Story Session, my goal is always the same: to bring that
                same warmth, real-life energy, and heart to the room, meeting
                people right where they are.
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

      {/* The work Michele leads — her own brand family (own surface, not endorsers) */}
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
                  <p className="mt-1 text-sm text-neutral-600">{award.grantor}</p>
                  {award.recipient && (
                    <p className="mt-1 text-sm text-neutral-500">{award.recipient}</p>
                  )}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn>
            <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
              Roles and work
            </h2>
            <ul role="list" className="mt-6 space-y-3 border-t border-neutral-200 pt-6 text-base text-neutral-700">
              {credentials.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden="true" className="text-[var(--color-brand-terracotta-ink)]">
                    &middot;
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Container>

      <ContactBlock heading="Let&rsquo;s work together.">
        <p>
          Whether it is coaching through the Brave Purpose Author Method or a
          speaking date, join the waitlist and Michele will reach out personally.
        </p>
      </ContactBlock>
    </>
  )
}
