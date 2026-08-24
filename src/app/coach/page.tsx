import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { BannerHero } from '@/components/BannerHero'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { SectionIntro } from '@/components/SectionIntro'
import { ContactTrigger } from '@/components/ContactTrigger'
import { FaqJsonLd, ServiceJsonLd, WebPageJsonLd } from '@/components/JsonLd'
import { siteConfig } from '@/lib/site-config'

/*
 * COACH PAGE  (/coach)
 *
 * Rebuilt from the Brett + Michele voice-memo review. This page is a WAITLIST
 * LANDING PAGE, not a sales funnel: the reader decides in under sixty seconds
 * whether to join. Deliberately absent, and please keep them absent unless
 * Michele says otherwise:
 *   - all pricing, payment plans, refund terms, tax lines (she handles money 1:1)
 *   - the 12-chapter / 3-act framework and the 26-week week-by-week roadmap
 *   - the "wrong fit if" list, the free first conversation, the Week 13
 *     checkpoint, and second-book coaching
 * The one CTA everywhere is "Join the waitlist".
 *
 * COLOR: every color on this page comes from the five --color-coach-* tokens
 * defined in src/styles/tailwind.css (search "COACHING PAGE PALETTE HOOK").
 * Michele is pulling hex codes off her own photos. When that palette lands,
 * edit those five values and this page recolors. Nothing here hardcodes a hex.
 *
 * PHOTOS: hero portrait is Michele's own headshot, added 2026-08-23.
 */

/** Hero portrait: Michele at home with her coffee mug. */
const HERO_PHOTO = '/images/michele/coach-hero.jpg'
/** "Why Michele" photo: her on the mic at the Releasing Generations 10th. */
const MICHELE_PHOTO = '/images/about-timeline/about-2023-rg-10th-anniversary-20.jpg'
import { pageMetadata } from '@/lib/schema'

export const metadata: Metadata = pageMetadata({
  title: 'Coach',
  description:
    'Michele Okimura turns your conversations into a manuscript. Write your book in six months through the Brave Purpose Author Method. Join the waitlist.',
  path: '/coach',
  ogDescription:
    'You speak your book into existence. Michele Okimura turns your conversations into a manuscript in your own voice.',
})

type Pillar = { abbr: string; title: string; body: string }

const PILLARS: Pillar[] = [
  {
    abbr: 'TST',
    title: 'Talk Story Sessions',
    body:
      'We sit down and you tell me about your book the way you would tell a friend over coffee. I ask questions, you talk, and I record the whole conversation. Claude takes what you said and shapes it into manuscript pages in your own words, ready for you to read and react to. That is the magic of it. You speak, and the pages show up.',
  },
  {
    abbr: 'UAV',
    title: 'Unique Author Voice',
    body:
      'Before we draft a single chapter I build your Unique Author Voice: a deep 46-dimension read of how you use grammar, logic, rhetoric, and more, rooted in the classical Trivium. Every page we write gets measured against that profile. Your book sounds like you on your best day.',
  },
]

type Stall = { number: string; title: string; body: string }

const STALLS: Stall[] = [
  {
    number: '01',
    title: 'The missing road map.',
    body:
      'Most first-time authors have no clear path from the idea in their head to a finished manuscript. Every week turns into a decision about what to write, and the decision usually wins. I bring the road map, so your time goes into the writing.',
  },
  {
    number: '02',
    title: 'The borrowed voice.',
    body:
      'Most first-time authors write the way the books on their shelf sound. Your own voice is already there and it is the best thing you have. I help you find it and write the whole book out of it.',
  },
]

const DELIVERABLES: string[] = [
  'A finished manuscript in your own voice',
  'Your Unique Author Voice Profile, the deep 46-dimension analysis',
  'A written walkthrough of your publishing options',
]

type Cover = { src: string; alt: string; label: string }

/** The range is the proof: memoir, nonfiction, curriculum, journals. */
const COVERS: Cover[] = [
  {
    src: '/images/books/dancing-with-father.webp',
    alt: 'Dancing with Father by Michele Okimura',
    label: 'Memoir, 2011',
  },
  {
    src: '/images/books/birth-of-explicit-movement.webp',
    alt: 'The Birth of Explicit Movement by Michele Okimura',
    label: 'Nonfiction, 2018',
  },
  {
    src: '/images/books/explicit-movement-21-day-journal-cover.jpg',
    alt: 'Explicit Movement 21-Day Interactive Journal',
    label: 'Interactive journal',
  },
  {
    src: '/images/brave-series/brave-and-beautiful-vol1-classic-clean.jpg',
    alt: 'Brave and Beautiful, volume one, from the Brave Series',
    label: 'Curriculum, 6 volumes',
  },
  {
    src: '/images/brave-series/brave-and-bold-vol1-faith-clean.jpg',
    alt: 'Brave and Bold, volume one, from the Brave Series',
    label: 'Curriculum, 6 volumes',
  },
  {
    src: '/images/books/dream-big-journals.webp',
    alt: 'The Dream Big Journal Curriculum',
    label: 'Journals, 10 volumes',
  },
]

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'What kind of books do you work on?',
    answer:
      'Fiction, memoir, nonfiction, poetry, and books that turn out to be a little of each. I have written across that whole range myself, so the method shapes itself around the book you are actually writing.',
  },
  {
    question: 'Do I need to have written anything yet?',
    answer:
      'No. Plenty of writers start with nothing on the page. If you can talk about your book, you can start. That is the whole point of a Talk Story Session.',
  },
  {
    question: 'What happens if I miss a week?',
    answer:
      'Life happens, and I plan for it. We reschedule and pick up right where we left off. Nothing is lost.',
  },
  {
    question: 'How much time will this take each week?',
    answer:
      'A conversation with me, plus a block of your own time to read the pages that come back and tell me what is right and what is off. Some weeks are heavier than others.',
  },
]

function CheckMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-1.5 h-4 w-4 flex-none fill-[var(--color-coach-accent)]"
    >
      <path d="M7.6 15.2 2.4 10l1.7-1.7 3.5 3.5 8-8L17.3 5.5z" />
    </svg>
  )
}

export default function CoachingPage() {
  return (
    <>
      <WebPageJsonLd
        path="/coach"
        name="Author coaching with Michele Okimura"
        description="The Brave Purpose Author Method: a 26-week engagement that turns your conversations into a manuscript in your own voice."
      />
      <ServiceJsonLd />
      <FaqJsonLd faqs={FAQS} />

      {/* ---------------- 1. BANNER HERO ---------------- */}
      <BannerHero
        eyebrow={siteConfig.offerName}
        title="Write your book in six months."
        subtitle="Let’s talk. Then we’ll turn your conversations into a manuscript."
      >
        <ContactTrigger interest="coaching" tone="dark">
          Join the waitlist
        </ContactTrigger>
      </BannerHero>

      {/* The opening paragraphs and portrait that used to sit inside the tall
          hero. They read as the lead now, on cream, straight under the band. */}
      <Container className="mt-12 sm:mt-16">
        <FadeIn>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-16">
            <div>
              <div className="max-w-xl space-y-4 text-lg leading-8 text-neutral-600">
                <p>
                  You speak. I listen. Together with Claude, we turn what you
                  say into pages you can hold.
                </p>
                <p>
                  Fiction, memoir, nonfiction, poetry: the method meets you
                  where your book lives.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="#learn-more"
                  className="text-base font-medium text-neutral-950 underline decoration-dashed decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-[var(--color-coach-accent)]"
                >
                  Learn more
                </Link>
              </div>
            </div>

            <div className="order-first lg:order-last">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl bg-neutral-100 lg:aspect-[4/5]">
                <Image
                  src={HERO_PHOTO}
                  alt="Michele Okimura holding a coffee mug at home in Honolulu"
                  fill
                  priority
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="object-cover object-[center_20%]"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* ---------------- 2. TALK STORY + UNIQUE AUTHOR VOICE ---------------- */}
      <section aria-label="How the method works" id="learn-more" className="scroll-mt-24">
        <SectionIntro
          eyebrow="The heart of it"
          title="You speak your book into existence."
          className="mt-20 sm:mt-28"
        >
          <p>
            Two things carry the whole method. One gets the book out of you.
            The other makes sure it still sounds like you when it lands on the
            page.
          </p>
        </SectionIntro>

        <Container className="mt-14 sm:mt-16">
          <FadeInStagger faster>
            <ul role="list" className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {PILLARS.map((item) => (
                <FadeIn as="li" key={item.abbr}>
                  <Border className="h-full pt-8">
                    <p
                      aria-hidden="true"
                      className="font-display text-3xl font-semibold tracking-tight text-[var(--color-coach-accent-text)]"
                    >
                      {item.abbr}
                    </p>
                    <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-neutral-600">
                      {item.body}
                    </p>
                  </Border>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
      </section>

      {/* ---------------- 3. WHY FIRST BOOKS STALL ---------------- */}
      <section aria-label="Why first books stall">
        <SectionIntro
          eyebrow="Why first books stall"
          title="Two things stop most first books."
          className="mt-24 sm:mt-32"
        />

        <Container className="mt-14 sm:mt-16">
          <FadeInStagger faster>
            <ul role="list" className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {STALLS.map((stall) => (
                <FadeIn as="li" key={stall.number}>
                  <Border className="h-full pt-8">
                    <p
                      aria-hidden="true"
                      className="font-display text-3xl font-semibold tracking-tight text-[var(--color-coach-accent-text)]"
                    >
                      {stall.number}
                    </p>
                    <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
                      {stall.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-neutral-600">
                      {stall.body}
                    </p>
                  </Border>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
      </section>

      {/* ---------------- 4. IN SIX MONTHS, YOU GET ---------------- */}
      <section aria-labelledby="six-months-heading">
        <Container className="mt-24 sm:mt-32">
          <FadeIn>
            <div className="rounded-4xl bg-[var(--color-coach-surface-soft)] p-8 ring-1 ring-neutral-900/10 ring-inset sm:p-12">
              <h2
                id="six-months-heading"
                className="font-display text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
              >
                In six months, you get:
              </h2>
              <ul
                role="list"
                className="mt-8 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-3"
              >
                {DELIVERABLES.map((item) => (
                  <li key={item} className="flex gap-x-3">
                    <CheckMark />
                    <span className="text-lg leading-7 text-neutral-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ---------------- 5. WHY MICHELE ---------------- */}
      <section aria-label="Why Michele">
        <SectionIntro
          eyebrow="Why Michele"
          title="I have written across the whole range."
          className="mt-24 sm:mt-32"
        />

        <Container className="mt-10 sm:mt-12">
          <FadeIn>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16">
              <div className="space-y-6 text-lg leading-8 text-neutral-600">
                <p>
                  A memoir. A nonfiction book about starting a movement. Two
                  more books coming in 2027. Six volumes of teen curriculum, ten
                  Dream Big Journals, and a 21-day interactive journal. Poetry,
                  story, teaching, workbooks. I have sat in all of it.
                </p>
                <p>
                  That range is the reason I can sit with your book whatever
                  kind of book it turns out to be. I know what a draft that will
                  not come together feels like, and I know how to finish one.
                  The method is simply how I work, and I do it
                  beside you.
                </p>
                <p>
                  <Link
                    href="/author"
                    className="font-semibold text-neutral-950 underline decoration-[var(--color-coach-accent)] underline-offset-4 hover:decoration-2"
                  >
                    See the full body of work
                  </Link>
                </p>
              </div>

              <div>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-neutral-100">
                  <Image
                    src={MICHELE_PHOTO}
                    alt="Michele Okimura speaking at the Releasing Generations tenth anniversary"
                    fill
                    sizes="(min-width: 1024px) 22rem, 100vw"
                    className="object-cover object-[center_65%]"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeInStagger faster className="mt-14 sm:mt-16">
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
            >
              {COVERS.map((cover) => (
                <FadeIn as="li" key={cover.src} scaleIn>
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      sizes="(min-width: 1024px) 10rem, (min-width: 640px) 20vw, 40vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                  <p className="mt-3 text-center text-xs tracking-wider text-neutral-500 uppercase">
                    {cover.label}
                  </p>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
      </section>

      {/* ---------------- 6. WHO IS THIS FOR ---------------- */}
      <section aria-label="Who is this for">
        <SectionIntro
          title="Who is this for"
          className="mt-24 sm:mt-32"
        >
          <p>
            This is for you if there is a book in you and you want it written
            this year. You might be starting from a blank page, a folder of
            half-drafts, or a manuscript that is finished and still not right.
            Any of those is a good place to begin. All I ask is that you are
            ready to talk about your book out loud.
          </p>
        </SectionIntro>
      </section>

      {/* ---------------- 7. FAQ ---------------- */}
      <section aria-label="Frequently asked questions">
        <SectionIntro
          eyebrow="Questions"
          title="What writers ask me first."
          className="mt-24 sm:mt-32"
        />

        <Container className="mt-12 sm:mt-16">
          <FadeIn>
            <dl className="max-w-3xl divide-y divide-neutral-200 border-t border-neutral-200">
              {FAQS.map((faq) => (
                <div key={faq.question} className="py-8">
                  <dt className="font-display text-lg font-semibold text-neutral-950">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-neutral-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </Container>
      </section>

      {/* ---------------- 8. CLOSING CTA ---------------- */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn data-surface="dark" className="-mx-6 rounded-4xl bg-[var(--color-coach-surface-dark)] px-6 py-20 sm:mx-0 sm:py-24 md:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-white sm:text-4xl">
              I would love to hear about your book.
            </h2>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-white/80">
              Writing is the thing I love most, and I love it best when someone
              finally gets their story out of their head and onto pages other
              people can read. If that is what you want this year, get on the
              list and I will reach out personally.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ContactTrigger interest="coaching" tone="dark">
                Join the waitlist
              </ContactTrigger>
              <Link
                href={`mailto:${siteConfig.email}?subject=Brave%20Purpose%20Author%20Method`}
                className="text-base font-semibold text-white underline decoration-[var(--color-coach-accent)] underline-offset-4 hover:decoration-2"
              >
                {siteConfig.email}
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* ---------------- 9. NOT JUST BOOKS ---------------- */}
      {/* The soft-panel pattern from section 4, reused so this reads as a warm
          aside rather than a second offer. interest="other" (not "coaching")
          so these land separately from the book wait-list. */}
      <section aria-labelledby="not-just-books-heading">
        <Container className="mt-16 sm:mt-20">
          <FadeIn>
            <div className="rounded-4xl bg-[var(--color-coach-surface-soft)] p-8 ring-1 ring-neutral-900/10 ring-inset sm:p-12">
              <h2
                id="not-just-books-heading"
                className="font-display text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
              >
                Not just books.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
                Most of my coaching is with authors, but not all of it. One
                pastor asked me to coach him on hearing God&rsquo;s voice, and
                that&rsquo;s become part of what I do. If you&rsquo;re working
                on something that isn&rsquo;t a book, whether a season of life,
                a calling, or a spiritual practice, reach out. If it&rsquo;s a
                fit, we&rsquo;ll talk.
              </p>
              <div className="mt-8">
                <ContactTrigger interest="other">Get in touch</ContactTrigger>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
