import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import { JoinWaitListButton } from '@/components/wait-list/JoinWaitListButton'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Brave Purpose',
  description:
    'Brave Purpose and Brave Purpose with God. Two books. One healing journey. Coming 2027 from Michele Okimura.',
  alternates: { canonical: '/brave-purpose' },
  openGraph: {
    type: 'website',
    title: `Brave Purpose | ${siteConfig.brand}`,
    description:
      'Two books, one healing journey. The story-driven guide to finding your purpose through your hardest seasons.',
    url: `${siteConfig.url}/brave-purpose`,
  },
}

const BOOK_DETAILS = [
  {
    title: 'Brave Purpose',
    subtitle: 'The secular edition.',
    description:
      'A story-driven book on healing, identity, and the courage to dream. Written for every reader who has walked through fire and suspects there is gold on the other side. No theological framework required. Just honesty, lived experience, and the practical path from brokenness to purpose.',
    audience: 'For every reader.',
    format: 'Trade paperback, e-book, audiobook (planned)',
    wordCount: '~55,000 words',
    structure: '15 chapters in three parts: Discovering the Dreamer Within, From Dreamer to Builder, Living Your Dream.',
  },
  {
    title: 'Brave Purpose with God',
    subtitle: 'The faith companion.',
    description:
      'The same healing journey with the Holy Spirit, Jesus, and Scripture woven throughout. For Christian readers who want to walk the road from trauma to purpose with their faith as the foundation. Same structure, same honesty, with the spiritual dimension fully present.',
    audience: 'For Christian readers.',
    format: 'Trade paperback, e-book, audiobook (planned)',
    wordCount: '~55,000 words',
    structure: 'Parallel to the secular edition, with Scripture, prayer, and Spirit-led reflection integrated throughout.',
  },
]

const FAQ = [
  {
    q: 'When does Brave Purpose release?',
    a: 'The target is 2027. Both editions will release together. Join the list below and you will hear the date before anyone else.',
  },
  {
    q: 'Are the two books different stories?',
    a: 'Same story, same structure, same honesty. Brave Purpose with God adds Scripture, prayer, and a Spirit-led framework. You can read one or both.',
  },
  {
    q: 'Who is Brave Purpose for?',
    a: 'Anyone who has been through something hard and suspects there is a purpose waiting on the other side. If you have ever felt worthless, stuck, or invisible, this book meets you there.',
  },
  {
    q: 'Can I pre-order?',
    a: 'Not yet. Join the list below and you will get first access when pre-orders open.',
  },
  {
    q: 'Will there be a workbook or course?',
    a: 'Companion workbooks for both editions are in development. More details will come as the books get closer to release.',
  },
]

export default function BravePurposePage() {
  return (
    <>
      <PageIntro
        eyebrow="Coming 2027"
        title="Brave Purpose."
      >
        <p>
          Two books. One healing journey. The story of turning your hardest
          seasons into the purpose you were always carrying.
        </p>
      </PageIntro>

      {/* Series overview */}
      <Container className="mt-16 sm:mt-24">
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <p className="text-xl leading-8 text-neutral-600">
              For four decades, I have watched people walk through fire and come
              out carrying something they did not have before. A clarity. A
              calling. A purpose forged in the hardest season of their life.
            </p>
            <p className="mt-6 text-xl leading-8 text-neutral-600">
              Brave Purpose is the book I have been living my way toward. It is
              the story of how healing becomes identity, identity becomes
              courage, and courage becomes the dream you were always meant to
              carry into the world.
            </p>
            <p className="mt-6 text-xl leading-8 text-neutral-600">
              Two editions, one journey. <strong>Brave Purpose</strong> is
              written for every reader. <strong>Brave Purpose with God</strong>{' '}
              walks the same road with Scripture and the Holy Spirit as your
              companions. Read one or both.
            </p>
          </div>
        </FadeIn>
      </Container>

      {/* Two-book series cards */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn>
          <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
            The series
          </h2>
        </FadeIn>
        <FadeInStagger faster className="mt-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {BOOK_DETAILS.map((book) => (
              <FadeIn key={book.title} scaleIn>
                <div className="flex h-full flex-col rounded-3xl bg-white p-8 ring-1 ring-neutral-900/5 transition hover:shadow-lg hover:ring-neutral-900/15">
                  {/* TODO Michele upload: cover art placeholder */}
                  <div className="mb-6 flex aspect-[3/4] max-h-[320px] w-full max-w-[240px] items-center justify-center rounded-xl bg-neutral-50 p-6">
                    <span className="text-center font-display text-lg font-semibold tracking-tight text-neutral-400">
                      {book.title}
                    </span>
                  </div>

                  <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 self-start">
                    Coming 2027
                  </span>

                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-neutral-950">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--color-brand-teal)]">
                    {book.subtitle}
                  </p>
                  <p className="mt-4 flex-1 text-base leading-7 text-neutral-600">
                    {book.description}
                  </p>

                  <dl className="mt-6 space-y-2 border-t border-neutral-200 pt-6 text-sm">
                    <div className="flex justify-between">
                      <dt className="font-medium text-neutral-500">Audience</dt>
                      <dd className="text-neutral-900">{book.audience}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-neutral-500">Format</dt>
                      <dd className="text-neutral-900">{book.format}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-neutral-500">Length</dt>
                      <dd className="text-neutral-900">{book.wordCount}</dd>
                    </div>
                  </dl>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeInStagger>
      </Container>

      {/* CTA: Get first look */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn>
          <div className="rounded-3xl bg-neutral-950 px-8 py-16 sm:px-12 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl text-balance">
                Get the first look when Brave Purpose drops.
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-300">
                Join the list and you will be the first to know the release
                date, get early chapter previews, and hear behind-the-scenes
                stories from the writing process.
              </p>
              <div className="mt-10">
                <JoinWaitListButton
                  source="brave-purpose-cta"
                  tone="dark"
                >
                  Get first look
                </JoinWaitListButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* Why these books */}
      <section aria-label="Why Brave Purpose">
        <Container className="mt-20 sm:mt-28">
          <FadeIn>
            <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
              Why these books
            </h2>
          </FadeIn>
          <FadeIn className="mt-8 max-w-3xl">
            <div className="space-y-6 text-lg leading-8 text-neutral-600">
              <p>
                My own story began with a healing journey. Growing up with an
                abusive father. Walking through seasons where I felt invisible,
                worthless, stuck. And then the slow, honest work of turning those
                feelings into a deep sense of value, purpose, and calling.
              </p>
              <p>
                That is the work I have done with hundreds of people over four
                decades, in schools, churches, conferences, and one-on-one
                coaching. Brave Purpose puts that work into a book for the first
                time.
              </p>
              <p>
                Every curriculum I have written, every conference I have led,
                every student whose life changed in a workshop, is a case study
                for this method. Fifteen authored works. One thread running
                through all of them: the fire is real, and so is the gold.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* The authority stack */}
      <section aria-label="Michele's authored works">
        <Container className="mt-20 sm:mt-28">
          <FadeIn>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
                  Fifteen works and counting
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-neutral-600">
                  Brave Purpose is the capstone of a body of work spanning trade
                  books, curricula, conferences, and programs. Each one is proof
                  that the method works.
                </p>
              </div>
              <Button href="/works" variant="ghost" className="hidden sm:inline-flex shrink-0">
                See all works
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* FAQ */}
      <section aria-label="Frequently asked questions">
        <Container className="mt-20 sm:mt-28">
          <FadeIn>
            <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
              Questions
            </h2>
          </FadeIn>
          <FadeInStagger faster className="mt-8">
            <dl className="mx-auto max-w-3xl divide-y divide-neutral-200">
              {FAQ.map((item) => (
                <FadeIn as="div" key={item.q} className="py-6">
                  <dt className="font-display text-lg font-semibold tracking-tight text-neutral-950">
                    {item.q}
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-neutral-600">
                    {item.a}
                  </dd>
                </FadeIn>
              ))}
            </dl>
          </FadeInStagger>
        </Container>
      </section>

      <ContactBlock heading="Join the Brave Purpose list." source="brave-purpose-bottom">
        <p>
          Be the first to know the release date. Get early chapters and
          behind-the-scenes updates from the writing process.
        </p>
      </ContactBlock>
    </>
  )
}
