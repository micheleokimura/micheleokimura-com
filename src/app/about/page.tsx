import type { Metadata } from 'next'

import { pageMetadata } from '@/lib/schema'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import Image from 'next/image'

import { AboutTimeline } from '@/components/AboutTimeline'
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

      {/* Eyebrow is a label, not a sentence. "Maybe dreams give purpose a
          voice." moved to the subtitle, and the author/speaker/coach line that
          used to be the subtitle now opens the body copy below, where it has
          room to breathe. No words were cut. */}
      <PageIntro eyebrow="About" title="About Michele.">
        <p>Maybe dreams give purpose a voice.</p>
      </PageIntro>

      <Container className="mt-14 sm:mt-16">
        <FadeIn className="max-w-2xl space-y-6 text-lg leading-8 text-neutral-600">
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
            My firm belief is that every person&rsquo;s story, even the broken ones,
            can become a launchpad into a future full of freedom, wonder, and
            limitless possibilities.
          </p>
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

      {/* Photo timeline: six eras, 20 photos, 1962 to 2025. Captions sit in an
          always-visible band on each photo, so they read the same on a phone as
          they do on a desktop. */}
      <Container className="mt-16 sm:mt-24">
        <AboutTimeline />
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
