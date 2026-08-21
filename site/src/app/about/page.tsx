import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { AboutTimeline } from '@/components/AboutTimeline'
import { ContactBlock } from '@/components/ContactBlock'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { awards, credentials } from '@/lib/credentials'
import { OWN_BRANDS } from '@/lib/organizations'

export const metadata: Metadata = {
  title: 'About Michele',
  description:
    "Michele Okimura is an author, speaker, and coach based on O'ahu, Hawai'i. Founder and Executive Director of Releasing Generations. 2023 Outstanding Advocate for Children and Youth of Hawai'i. This is her story, in her own voice, on a photo timeline from 1962 forward.",
  alternates: { canonical: '/about' },
}

// Rebuild 2026-08-21: full photo-timeline treatment. Copy adapted from
// website-dam/06-copywriting/pages/about.md and cross-checked against the
// canonical dossier at projects/michele-okimura-research/michele-personal-context.md.
// Verbatim review by Michele pending. Voice rules honored (no em-dashes, no
// AI-tell vocab, first-person, warm, unhurried).
//
// Reconciliation resolved 2026-08-21: Michele is currently a part-time pastor
// at Lifespring Church in Honolulu (the church she and Rob planted in 1997,
// originally as Hope Chapel LifeSpring). Older "Associate Pastor 1997-2020" /
// "Pastor Emeritus" phrasing was incorrect and has been retired.
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Speaker · Author · Coach"
        title="About Michele."
      >
        <p>
          Aloha. I am an author, speaker, and coach based on O&lsquo;ahu,
          Hawai&lsquo;i. For four decades I have walked with people finding the
          courage, the healing, and the freedom to live into who God made them
          to be.
        </p>
      </PageIntro>

      {/* Opening beat — sets up the whole page in Michele's voice. */}
      <Container className="mt-14 sm:mt-16">
        <FadeIn className="mx-auto max-w-2xl">
          <p className="font-display text-2xl leading-9 text-neutral-800 sm:text-[1.7rem] sm:leading-10">
            I forgot how to dream for a long time. This page is how I found my
            way back, and how I ended up walking with people who are looking
            for theirs.
          </p>
        </FadeIn>
      </Container>

      {/* Photo timeline: six eras, 20 photos, 1962 to 2025. */}
      <Container className="mt-16 sm:mt-24">
        <AboutTimeline />
      </Container>

      {/* Pull quote — Michele's signature line. */}
      <Container className="mt-24 sm:mt-32">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-3xl leading-tight font-medium text-neutral-950 sm:text-4xl">
            &ldquo;Healing is the foundation for hope.&rdquo;
          </blockquote>
        </FadeIn>
      </Container>

      {/* What Michele does now — the four rooms. */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
            The four rooms.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-8 text-neutral-700">
            <p>
              I write. I speak. I run Releasing Generations. And I coach one
              writer at a time through the Brave Purpose Author Method.
            </p>
            <p>
              If you are the reader on the other side of this page, here is
              what to know. I sound like this because I have lived it. I write
              in second person because I am talking to you. I teach frameworks
              because they hold the shape while your voice does the work. I do
              not push. I invite.
            </p>
          </div>
        </FadeIn>
      </Container>

      {/* Three doors: let the visitor self-select. */}
      <Container className="mt-12 sm:mt-16">
        <FadeIn className="mx-auto max-w-5xl">
          <ul
            role="list"
            className="grid grid-cols-1 gap-5 sm:grid-cols-3"
          >
            <li>
              <Link
                href="/works"
                className="block h-full rounded-3xl border border-neutral-200 bg-white p-8 transition hover:border-[var(--color-brand-teal)] hover:shadow-md"
              >
                <p className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
                  Read
                </p>
                <p className="mt-3 font-display text-2xl font-medium tracking-tight text-neutral-950">
                  The books.
                </p>
                <p className="mt-3 text-base text-neutral-600">
                  Start with the writing. Dancing with Father, the Explicit
                  Movement books, the Brave Series, the Dream Big journals.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/coaching"
                className="block h-full rounded-3xl border border-neutral-200 bg-white p-8 transition hover:border-[var(--color-brand-teal)] hover:shadow-md"
              >
                <p className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
                  Work with me
                </p>
                <p className="mt-3 font-display text-2xl font-medium tracking-tight text-neutral-950">
                  The Brave Purpose Author Method.
                </p>
                <p className="mt-3 text-base text-neutral-600">
                  Six months, one writer at a time. Blank page, half-drafted,
                  or almost-finished. I hold the shape while your voice does
                  the work.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block h-full rounded-3xl border border-neutral-200 bg-white p-8 transition hover:border-[var(--color-brand-teal)] hover:shadow-md"
              >
                <p className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
                  Book me
                </p>
                <p className="mt-3 font-display text-2xl font-medium tracking-tight text-neutral-950">
                  Speaking.
                </p>
                <p className="mt-3 text-base text-neutral-600">
                  Churches, conferences, schools, teams. Dreaming, purpose,
                  healing, creativity, and the courage it takes to raise the
                  next generation.
                </p>
              </Link>
            </li>
          </ul>
        </FadeIn>
      </Container>

      {/* The work Michele leads (own brand family). */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
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

      {/* Honors and roles. */}
      <Container className="mt-20 sm:mt-28">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 lg:grid-cols-2">
          <FadeIn>
            <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
              Honors and recognition
            </h2>
            <ul
              role="list"
              className="mt-6 divide-y divide-neutral-200 border-t border-neutral-200"
            >
              {awards.map((award) => (
                <li key={award.title} className="py-5">
                  <p className="font-display text-lg font-semibold tracking-tight text-neutral-950">
                    {award.title}
                    {award.year ? `, ${award.year}` : ''}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">{award.grantor}</p>
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
            <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
              Roles and work
            </h2>
            <ul
              role="list"
              className="mt-6 space-y-3 border-t border-neutral-200 pt-6 text-base text-neutral-700"
            >
              {credentials.map((c) => (
                <li key={c} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="text-[var(--color-brand-teal)]"
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

      <ContactBlock heading="Let&rsquo;s walk together.">
        <p>
          If something on this page felt true, I would love to hear from you.
          Join the waitlist and I will reach out personally.
        </p>
      </ContactBlock>
    </>
  )
}
