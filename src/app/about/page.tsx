import type { Metadata } from 'next'

import Image from 'next/image'

import { pageMetadata } from '@/lib/schema'

import { AboutMosaic } from '@/components/AboutMosaic'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { WebPageJsonLd } from '@/components/JsonLd'
import { PageIntro } from '@/components/PageIntro'
import { awards, credentials } from '@/lib/credentials'

export const metadata: Metadata = pageMetadata({
  title: 'About Michele',
  description:
    'Michele Okimura is an author and speaker in Honolulu, Hawaiʻi, who has spent the last four decades inspiring courage, vulnerability, healing, and creativity.',
  path: '/about',
})

/**
 * /about - a 1-to-1 mirror of Michele's live WordPress About page.
 *
 * Rebuilt 2026-08-25 on Brett's walkthrough. The whole point of this pass is
 * fidelity to the WordPress source, so the rule for anyone editing this file
 * is narrow: DO NOT rewrite, tighten, or "improve" the prose below. Michele,
 * via Brett: "That's the exact copywriting that we want. That's the exact
 * photos that we want."
 *
 * The crawl of https://micheleokimura.com/about/ is checked in at
 * `design-references/wordpress-about-full/` (page HTML, Elementor CSS, and a
 * per-tile manifest). `/about-me/` is a 404; `/about/` is the page.
 *
 * WordPress runs exactly three things, in this order:
 *
 *   1. an eyebrow "About Michele", an H2 "Welcome.", a one-line lead, an
 *      Instagram icon, an H3 "Maybe dreams give purpose a voice.", and eight
 *      body paragraphs
 *   2. an H2 "My Story" over the 24-tile photo mosaic
 *   3. nothing else
 *
 * The ONLY edits to that copy are the two the house rules require:
 *   - em dashes removed (paragraphs 1 and 7)
 *   - "Hawaii" -> "Hawaiʻi" (paragraph 2, twice)
 *
 * Everything else stands as Michele wrote it, INCLUDING wording that
 * contradicts other parts of this repo. Flagged rather than fixed, because
 * these are hers to rule on:
 *   - "chairman of Releasing Generations". CLAUDE.md and the bios say founder
 *     and Executive Director.
 *   - "Michele Okimura Consulting", established 2017. CLAUDE.md says Michele
 *     Okimura LLC.
 *   - "For 15 years, I was an elementary school teacher". credentials.ts says
 *     17 years and CLAUDE.md says roughly fourteen, and the 17 is visible
 *     further down THIS page under "Roles and work".
 *
 * Sections deleted in this pass, per Brett, not to be restored without him:
 *   - "The work Michele leads", the OWN_BRANDS logo grid. Releasing
 *     Generations movement boxes do not belong on Michele's own About page.
 *   - "Let's work together", the closing ContactBlock. The contact CTA lives
 *     in the footer only now, and no email address is displayed anywhere.
 *   - "Meet Michele", whose copy was written for the old build and has no
 *     WordPress source. Its photograph is in git history.
 *
 * The pull line is "Maybe dreams give purpose a voice." This REVERSES the
 * 2026-08-23 call in commit cacdff2, which cut that line in favour of "I
 * believe dreams give purpose a voice." Brett's rule for this pass is that
 * where WordPress has its own opening line, WordPress wins and the other is
 * dropped so the page does not say the same thing twice. Michele should
 * confirm which of the two she wants; only one of them belongs here.
 *
 * "Honors and recognition" and "Roles and work" have NO WordPress equivalent.
 * They are this site's own sections and were kept by name on Brett's list.
 *
 * BANDS. Every section is full-bleed on one of --color-band-1/2/3 and carries
 * its own padding, and neighbours never share a band. Top to bottom:
 * banner (navy) / welcome band-1 / pull line band-3 / story band-2 /
 * mosaic band-1 / honors band-2 / footer run-in band-4 (painted by SiteFooter).
 */
export default function AboutPage() {
  return (
    <>
      {/* /about is the primary page ABOUT Michele, which is what
          Person.mainEntityOfPage in src/lib/schema.ts points at. This WebPage
          node is the other half of that pairing. */}
      <WebPageJsonLd
        path="/about"
        name="About Michele Okimura"
        description="Author and speaker in Honolulu, Hawaiʻi. Founder of Releasing Generations."
      />

      {/* Brett's headline, which is longer than WordPress's "About Michele".
          Left-justified, and BannerHero's Container runs w-full so this shares
          its left edge with the wordmark in the header. No subtitle: the
          WordPress lead line is not a subhead, it opens the Welcome section
          below, and promoting it would reorder her copy. */}
      <PageIntro eyebrow="About" title="About Michele Okimura" />

      {/* WordPress: H2 "Welcome." and the one-line lead. Verbatim.
          The portrait has no WordPress counterpart, since that page carries no
          photograph outside the mosaic. It is an existing approved site asset,
          held to 18rem so it sits beside the copy rather than dominating it. */}
      <section className="bg-[var(--color-band-1)] py-12 sm:py-16 lg:py-20">
        <Container>
          <FadeIn>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,18rem)] lg:items-center lg:gap-16">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
                  Welcome.
                </h2>
                <p className="mt-5 text-lg leading-8 text-neutral-700 sm:text-xl sm:leading-9">
                  I&rsquo;m an author and speaker who has spent the last four
                  decades inspiring courage, vulnerability, healing, and
                  creativity.
                </p>
              </div>

              <div className="relative order-first aspect-[4/5] w-full max-w-[15rem] overflow-hidden rounded-3xl bg-[var(--color-navy-10)] sm:max-w-[17rem] lg:order-last lg:max-w-none">
                <Image
                  src="/images/michele/about-hero.jpg"
                  alt="Michele Okimura in Hawaiʻi"
                  fill
                  priority
                  sizes="(min-width: 1024px) 18rem, 17rem"
                  className="object-cover object-[62%_28%]"
                />
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* WordPress H3, verbatim, in its WordPress position between the lead
          and the body prose. See the note at the top of this file about the
          "I believe" variant this replaces.
          Teal is --color-teal-text, NOT --color-teal: the bright token measures
          2.31:1 on cream and misses even the 3:1 large-text floor, so it cannot
          carry a word at any size. See DESIGN-RULES.md. No quote marks, no
          italics, no background, per direction. */}
      <section className="bg-[var(--color-band-3)] py-16 sm:py-20 lg:py-24">
        <Container>
          <FadeIn>
            <p className="font-display mx-auto max-w-4xl text-center text-[2rem] leading-[1.1] font-medium tracking-tight text-balance text-[var(--color-teal-text)] sm:text-[2.5rem] lg:text-5xl lg:leading-[1.08]">
              Maybe dreams give purpose a voice.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* The eight WordPress body paragraphs, in order, verbatim. Book titles
          keep the italics WordPress sets on them. */}
      <section className="bg-[var(--color-band-2)] py-12 sm:py-16 lg:py-20">
        <Container>
          <FadeIn>
            <div className="max-w-2xl space-y-6 text-lg leading-8 text-neutral-700">
              <p>
                My story has been an adventure in finding purpose, and it began
                with my own healing journey. Transforming feelings of
                worthlessness into a deep sense of value ignited a fire in me, a
                passion to help others discover the same strength within
                themselves.
              </p>
              <p>
                Here&rsquo;s the official part: I&rsquo;m an author, speaker, and
                chairman of Releasing Generations, a non-profit that empowers
                children, youth, and adults through workshops, retreats, and
                creative sessions. I was awarded the &ldquo;Outstanding Advocate
                for the Children and Youth in the State of Hawaiʻi&rdquo; award
                in 2023 by Hawaiʻi&rsquo;s Governor Green and Mayor Blangiardi.
                I&rsquo;ve written multiple books and curricula on creativity,
                inner healing, and the empowerment of future generations.
              </p>
              <p>
                For 15 years, I was an elementary school teacher, and for 23
                years, I served as a pastor alongside my husband, which gave me
                a profound compassion for people from all walks of life.
              </p>
              <p>
                I&rsquo;ve poured my heart into my books to share the keys
                I&rsquo;ve discovered along the way: from my healing journey in{' '}
                <em className="font-semibold">Dancing with Father</em>, to
                pursuing big dreams in{' '}
                <em className="font-semibold">
                  The Birth of Explicit Movement: Discover Keys to Fulfilling
                  Your Purpose,
                </em>{' '}
                <em>a</em>nd empowering the next generation with the{' '}
                <em className="font-semibold">Dream Big Journal</em> and the{' '}
                <em className="font-semibold">Brave Series</em>
                <em> curricula</em>.
              </p>
              <p>
                Everything I do is focused on helping others flourish in life
                and live out loud to their fullest potential.
              </p>
              <p>
                Established in 2017, Michele Okimura Consulting has expanded my
                capacity to live my purpose through the power of writing and by
                equipping others through workshops, conferences, retreats, and
                coaching.
              </p>
              <p>
                <strong className="font-semibold text-neutral-900">
                  My firm belief
                </strong>{' '}
                is that every person&rsquo;s story, even the broken ones, can
                become a launchpad into a future full of freedom, wonder, and
                limitless possibilities.
              </p>
              <p>
                When I&rsquo;m not writing, you&rsquo;ll find me with my two
                amazing &ldquo;twin-like&rdquo; kids, Aaron and Jessica, or
                gardening with my husband, Rob, my best friend and the love of
                my life.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* "My Story": one unbroken square mosaic, all 24 WordPress tiles, every
          caption verbatim, revealed on hover. See AboutMosaic.tsx. */}
      <section className="bg-[var(--color-band-1)] py-12 sm:py-16 lg:py-20">
        <Container>
          <AboutMosaic />
        </Container>
      </section>

      {/* No WordPress equivalent. This site's own sections, kept by name. */}
      <section className="bg-[var(--color-band-2)] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 lg:grid-cols-2">
            <FadeIn>
              <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                Honors and recognition
              </h2>
              <ul
                role="list"
                className="mt-6 divide-y divide-[var(--color-navy)]/10 border-t border-[var(--color-navy)]/10"
              >
                {awards.map((award) => (
                  <li key={award.title} className="py-5">
                    <p className="font-display text-lg font-semibold tracking-tight text-neutral-950">
                      {award.title}
                      {award.year ? `, ${award.year}` : ''}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">
                      {award.grantor}
                    </p>
                    {award.recipient && (
                      <p className="mt-1 text-sm text-neutral-500">
                        {award.recipient}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn>
              <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                Roles and work
              </h2>
              <ul
                role="list"
                className="mt-6 space-y-3 border-t border-[var(--color-navy)]/10 pt-6 text-base text-neutral-700"
              >
                {credentials.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="text-[var(--color-brand-terracotta-ink)]"
                    >
                      &middot;
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  )
}
