import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { JoinWaitListButton } from '@/components/wait-list/JoinWaitListButton'
import { FaqJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import { siteConfig } from '@/lib/site-config'

// Copy of record: site/content/coaching/coaching-page-copy.md. Every program
// fact below traces to the LOCKED decisions in the BPAM briefing dated
// 2026-07-31. Where content/copywriting/brave-purpose-author-method.md
// disagrees (payment plans, a fixed live-session count), the briefing wins and
// the copy-of-record documents the override. No client is named here: the
// in-process case study needs signed consent first.

const PRICE = '$4,997'

export const metadata: Metadata = {
  title: 'Coaching',
  description: `The ${siteConfig.offerName} is a twenty-six week one-to-one engagement that walks a first-time author from wherever they are today to a finished manuscript in their own voice. ${PRICE}.`,
  alternates: { canonical: '/coaching' },
  openGraph: {
    type: 'website',
    title: `The ${siteConfig.offerName} | ${siteConfig.brand}`,
    description:
      'Six months from now, the book is finished. A twenty-six week one-to-one author coaching engagement with Michele Okimura.',
    url: `${siteConfig.url}/coaching`,
  },
}

type Stall = {
  number: string
  title: string
  body: string
}

const STALLS: Stall[] = [
  {
    number: '01',
    title: 'The fear.',
    body:
      'You have carried this book for years and told almost no one. Saying it out loud makes it real, and real means it can fail. So the file stays closed and the years keep going.',
  },
  {
    number: '02',
    title: 'The false start.',
    body:
      'Chapter one, written four times. A folder of beginnings and no middle. Every version was honest work, and none of them had anywhere to go.',
  },
  {
    number: '03',
    title: 'The missing roadmap.',
    body:
      'Nobody hands a first-time author a shape. Without one, every week is a decision about what to write instead of an hour spent writing, and the decision usually wins.',
  },
  {
    number: '04',
    title: 'The borrowed voice.',
    body:
      'A ghostwriter or a chatbot gets you pages fast. Then you read them back and hear a stranger. The book that finally exists is a book you cannot stand behind.',
  },
]

type Act = {
  name: string
  weeks: string
  promise: string
  chapters: string[]
}

const ACTS: Act[] = [
  {
    name: 'Act I. Discover.',
    weeks: 'Chapters 1 through 4',
    promise: 'The reader meets the writer.',
    chapters: ['The Origin', 'The Call', 'The Cost', 'The Company'],
  },
  {
    name: 'Act II. Develop.',
    weeks: 'Chapters 5 through 8',
    promise: 'The reader meets the framework.',
    chapters: ['The Framework', 'The Practice', 'The Proof', 'The Patterns'],
  },
  {
    name: 'Act III. Deliver.',
    weeks: 'Chapters 9 through 12',
    promise: 'The reader is sent.',
    chapters: ['The First Step', 'The Obstacles', 'The Long Haul', 'The Benediction'],
  },
]

type Phase = {
  when: string
  title: string
  body: string
}

const TIMELINE: Phase[] = [
  {
    when: 'Before you sign',
    title: 'The first conversation',
    body:
      'A free call. You tell Michele the book you are carrying. She tells you what she sees in it and what six months of this would ask of you. You both decide from there.',
  },
  {
    when: 'Week 1',
    title: 'Welcome Week',
    body:
      'Tools set up, shared folder open, your voice sources gathered, and Writing Assignment #1 in your hands: Surface Your Book. This is also where you map the twelve chapters and flex the four-per-Act default if your story wants a different balance.',
  },
  {
    when: 'Weeks 2 through 13',
    title: 'Twelve chapters, one a week',
    body:
      'Each week has one chapter and one job. A Talk Story Session where the chapter is needed, a draft that comes back in your voice, your reactions in the margins, and a refining pass. You are always reacting to something on the page.',
  },
  {
    when: 'Week 13',
    title: 'Mid-engagement Checkpoint',
    body:
      'Chapter twelve lands, and a locked sixty-minute call looks at the whole manuscript at once. What the book has become, what it still owes the reader, and what the back half of the engagement is for.',
  },
  {
    when: 'Weeks 14 through 24',
    title: 'Refinement and publishing prep',
    body:
      'Structural work across the whole manuscript, front matter and back matter, three cover concepts, and a written walk through your publishing options including self-publishing through books.by.',
  },
  {
    when: 'Weeks 25 and 26',
    title: 'Polish and close-out',
    body:
      'A whole-manuscript voice pass, final files prepared and handed over, and the publishing-path conversation that sends you into whatever comes next.',
  },
]

type Signature = {
  abbr: string
  title: string
  body: string
}

const SIGNATURES: Signature[] = [
  {
    abbr: 'TST',
    title: 'Talk Story Sessions',
    body:
      'Most writers can tell you the story. Freezing happens at the keyboard. A Talk Story Session is a recorded conversation built on a three-part shape: where your reader stands right now, where this chapter takes them, and the story that carries them across. Michele asks, you talk, and the chapter comes out of your mouth before it ever has to come out of your hands.',
  },
  {
    abbr: 'UAV',
    title: 'Unique Author Voice',
    body:
      'Your spoken sessions, your dictations, and anything you have already published become a corpus of your own language. From it Michele builds your Unique Author Voice: how you actually build a sentence, run an argument, land a turn of phrase, and sound when the subject is hard. Every draft is written against that profile, so the pages read the way you read aloud to a friend.',
  },
]

const DELIVERABLES: string[] = [
  'A finished manuscript in your own voice. Twelve chapters in three Acts, roughly 50,000 to 55,000 words, prepared as a shared doc, a Word file, and a print-ready PDF.',
  'Three AI-generated front cover concepts, delivered as print-ready files with one round of light revisions on each.',
  'Your Unique Author Voice profile, plus the corpus it was built from, organized so it carries into the next book.',
  'The twelve-chapter framework itself, which is yours to reuse for anything you write after this.',
  'A written walk through your publishing options, including self-publishing through books.by, with no promise attached to any of them.',
  'A shared working folder holding every draft, transcript, and assignment from the six months.',
  'The identity of an author. The manuscript goes on a shelf. This is the part that walks into the next room with you.',
]

type Posture = {
  title: string
  body: string
}

const POSTURES: Posture[] = [
  {
    title: 'You are at the blank page.',
    body:
      'The book has lived in your head for years and has never had a folder. You start at Week 1 with everyone else. By the end of the first month, chapter one has an opening scene on the page and a shape underneath it.',
  },
  {
    title: 'You have a partial draft.',
    body:
      'Chapters and scenes and notes across four folders in three stages. Some of it you love and some of it you have no idea what to do with. Week 1 maps what exists against the twelve-chapter framework, and the drafting finishes from there.',
  },
  {
    title: 'You have a finished manuscript.',
    body:
      'The words are down and something is off. Maybe the structure sags, maybe a previous book set a voice you have outgrown. The Method holds your manuscript against a shape that protects what is already good while you tune the rest.',
  },
]

const NOT_FOR: string[] = [
  'You want a developmental editor and nothing else.',
  'You want a ghostwriter to produce the book in someone else’s voice with your name on it.',
  'You want a guaranteed publishing contract or a sales number.',
  'You want a marketing campaign or a launch team.',
  'You are looking for therapy. Michele is a pastor and a coach who holds hard material with care, and she refers out to licensed professionals when the work asks for it.',
]

const INCLUDED: string[] = [
  'The Method running every week of the twenty-six week term.',
  'The free first conversation before you sign anything.',
  'Talk Story Sessions and coaching calls whenever a call is the fastest way to move the book forward.',
  'Written or recorded response on every submission you send.',
  'Developmental and structural editing done against your Unique Author Voice.',
  'The locked sixty-minute Mid-engagement Checkpoint in Week 13.',
  'Three cover concepts and final file preparation.',
]

const EXCLUDED: string[] = [
  'Therapy, clinical counseling, legal advice, or financial advice.',
  'Any promise of publisher acceptance, book sales, or bestseller outcomes.',
  'ISBN purchase or registration, spine art, and full cover assembly.',
  'Marketing campaigns, paid advertising, and launch promotion.',
  'Third-party fees such as a books.by subscription or a publisher’s own fee.',
  'Coaching after Week 26, and any second book.',
]

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'Do I need a draft before I start?',
    answer:
      'No. The Method runs three postures at the same fee: a blank page, a partial draft, or a finished manuscript that needs work. Week 1 is where Michele finds out which one you are in and maps the twelve chapters accordingly.',
  },
  {
    question: 'Do I have to be a Christian to work with Michele?',
    answer:
      'No. The Method holds for any book. Michele writes and coaches credibly for a Christian reader and for a general reader, and she coaches in whichever voice your book is actually written in.',
  },
  {
    question: 'How much time does this take each week?',
    answer:
      'Plan on a weekend block for the week’s writing assignment, plus a Talk Story Session or a coaching call on the weeks a conversation is the fastest way to unblock the chapter. There is no fixed call cadence. Michele calls when calling helps.',
  },
  {
    question: 'Will the book sound like me or like a machine?',
    answer:
      'It sounds like you. Your Unique Author Voice is built from your own spoken and written words, and every draft is written against it. AI is a drafting tool inside the process. The words on the page trace back to language you produced.',
  },
  {
    question: 'What happens if I miss a week?',
    answer:
      'Nothing is lost. Sessions reschedule with reasonable notice, and the twenty-six weeks are an outer wall so the work has room to breathe. Some writers finish before Week 26.',
  },
  {
    question: 'Do you guarantee my book gets published?',
    answer:
      'No, and anyone who does is selling you something else. You finish with a publication-ready manuscript, three cover concepts, and a written walk through your options, including self-publishing through books.by. What you do with it is yours to decide.',
  },
  {
    question: 'Can I pay in installments?',
    answer:
      `The default is ${PRICE} in full at signature. A fifty-fifty split is available on request: half at signature and the balance within forty-eight hours of the Week 13 Mid-engagement Checkpoint. Hawai’i General Excise Tax of 4.5 percent appears as a visible line item on the invoice where it applies.`,
  },
  {
    question: 'What if I start and it turns out to be wrong for me?',
    answer:
      'Ask before Writing Assignment #1 is delivered and you get a full refund minus a $250 administrative fee. Once Writing Assignment #1 is in your hands, the engagement is non-refundable. Michele would rather find that out on the first call, which is part of why the first call is free.',
  },
]

function CheckMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-1.5 h-4 w-4 flex-none fill-[var(--color-cta)]"
    >
      <path d="M7.6 15.2 2.4 10l1.7-1.7 3.5 3.5 8-8L17.3 5.5z" />
    </svg>
  )
}

export default function CoachingPage() {
  return (
    <>
      <ServiceJsonLd />
      <FaqJsonLd faqs={FAQS} />

      <PageIntro
        eyebrow="The Brave Purpose Author Method"
        title="Six months from now, the book is finished."
      >
        <p>
          A twenty-six week one-to-one engagement for the first-time author who
          has carried a book for years. You bring the story. The Method holds the
          shape. You leave with a publication-ready manuscript that sounds like
          you, three cover concepts, and the durable identity of an author.
        </p>
        <p className="mt-6 font-display text-lg font-semibold text-neutral-950">
          {PRICE} for the full engagement. The first conversation is free.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <JoinWaitListButton source="coaching-hero">
            Book the first conversation
          </JoinWaitListButton>
          <Link
            href="#the-method"
            className="text-base font-medium text-neutral-950 underline decoration-dashed decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-[var(--color-cta)]"
          >
            Read the Method in full
          </Link>
        </div>
      </PageIntro>

      <section aria-label="Why first books stall">
        <SectionIntro
          eyebrow="Why first books stall"
          title="Talent is rarely what holds the book."
          className="mt-16 sm:mt-24"
        >
          <p>
            Michele has watched capable people carry a book for a decade without
            writing it. Almost every time, the book is caught in one of these
            four places.
          </p>
        </SectionIntro>

        <Container className="mt-16 sm:mt-20">
          <FadeInStagger faster>
            <ul role="list" className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {STALLS.map((stall) => (
                <FadeIn as="li" key={stall.number}>
                  <Border className="pt-8">
                    <p
                      aria-hidden="true"
                      className="font-display text-3xl font-semibold tracking-tight text-[var(--color-cta)]"
                    >
                      {stall.number}
                    </p>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-neutral-950">
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

      <section aria-label="The Method in brief">
        <Container className="mt-24 sm:mt-32">
          <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-24 md:px-12">
            <div className="mx-auto max-w-3xl">
              <p className="font-display text-sm font-semibold tracking-wider text-white/70 uppercase">
                The Method
              </p>
              <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-balance text-white sm:text-4xl">
                One chapter a week, for twelve weeks, in your own voice.
              </h2>
              <div className="mt-8 space-y-6 text-xl text-neutral-300">
                <p>
                  The Brave Purpose Author Method turns a book into twenty-six
                  weeks of small, ordered work. Twelve chapters across three
                  Acts, one chapter a week, each one drawn out of you in a
                  recorded conversation before you ever face a blank screen.
                </p>
                <p>
                  Michele builds a profile of how you actually speak and write,
                  then every draft is written against it. You spend your weeks
                  reacting to real pages in your own language. The back half of
                  the engagement takes that manuscript to publication-ready and
                  hands you the files.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section aria-label="The twelve-chapter framework" id="the-method" className="scroll-mt-24">
        <SectionIntro
          eyebrow="How it works"
          title="Twelve chapters in three Acts."
          className="mt-24 sm:mt-32"
        >
          <p>
            Four chapters per Act by default, flexed at your Week 1 mapping if
            your story needs a different balance. Around 4,000 to 4,500 words a
            chapter, which lands the finished manuscript between 50,000 and
            55,000 words.
          </p>
        </SectionIntro>

        <Container className="mt-16 sm:mt-20">
          <FadeInStagger faster>
            <ol role="list" className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {ACTS.map((act) => (
                <FadeIn as="li" key={act.name}>
                  <Border className="h-full pt-8">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
                      {act.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium tracking-wider text-neutral-500 uppercase">
                      {act.weeks}
                    </p>
                    <p className="mt-4 text-base leading-7 text-neutral-600 italic">
                      {act.promise}
                    </p>
                    <ul
                      role="list"
                      className="mt-6 space-y-2 text-base text-neutral-700"
                    >
                      {act.chapters.map((chapter) => (
                        <li key={chapter} className="flex gap-x-3">
                          <CheckMark />
                          <span>{chapter}</span>
                        </li>
                      ))}
                    </ul>
                  </Border>
                </FadeIn>
              ))}
            </ol>
          </FadeInStagger>
        </Container>
      </section>

      <section aria-label="The shape of the engagement">
        <SectionIntro
          eyebrow="The twenty-six weeks"
          title="What actually happens, week by week."
          className="mt-24 sm:mt-32"
          smaller
        />

        <Container className="mt-10 sm:mt-12">
          <FadeIn>
            <ol
              role="list"
              className="divide-y divide-neutral-200 border-t border-neutral-200"
            >
              {TIMELINE.map((phase) => (
                <li
                  key={phase.title}
                  className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-[12rem_1fr] sm:gap-10"
                >
                  <p className="font-display text-sm font-semibold tracking-wider text-neutral-950 uppercase">
                    {phase.when}
                  </p>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-neutral-950">
                      {phase.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-600">
                      {phase.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-500 italic">
              The engagement is measured in sessions. Michele calls when a
              call is the fastest way to unblock the chapter in front of you,
              which some weeks is twice and some weeks is never.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section aria-label="What makes the Method different">
        <SectionIntro
          eyebrow="The two pieces that carry your voice"
          title="Your book comes out of your mouth first."
          className="mt-24 sm:mt-32"
        />

        <Container className="mt-16 sm:mt-20">
          <FadeInStagger faster>
            <ul role="list" className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {SIGNATURES.map((item) => (
                <FadeIn as="li" key={item.abbr}>
                  <Border className="h-full pt-8">
                    <p
                      aria-hidden="true"
                      className="font-display text-3xl font-semibold tracking-tight text-[var(--color-cta)]"
                    >
                      {item.abbr}
                    </p>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-neutral-950">
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

      <section aria-label="What you leave with">
        <SectionIntro
          eyebrow="What you leave with"
          title="Seven things at the end of Week 26."
          className="mt-24 sm:mt-32"
        />

        <Container className="mt-12 sm:mt-16">
          <FadeIn>
            <ul
              role="list"
              className="grid max-w-4xl grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2"
            >
              {DELIVERABLES.map((item) => (
                <li key={item} className="flex gap-x-3">
                  <CheckMark />
                  <span className="text-base leading-7 text-neutral-600">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </section>

      <section aria-label="Why Michele">
        <SectionIntro
          eyebrow="Why Michele"
          title="She built this on her own manuscripts first."
          className="mt-24 sm:mt-32"
        />

        <Container className="mt-10 sm:mt-12">
          <FadeIn className="max-w-3xl space-y-6 text-lg leading-8 text-neutral-600">
            <p>
              Michele has walked this road as a published author twice.{' '}
              <em>Dancing with Father</em> in 2011.{' '}
              <em>The Birth of Explicit Movement</em> in 2018. Two more books,{' '}
              <em>Brave Purpose</em> and <em>Brave Purpose with God</em>, release
              in 2027. Across those manuscripts she worked out the Method that
              carried her from a blank page to a finished draft, rebuilt it after
              a publisher closed, and finished again while running a household,
              leading a nonprofit, and speaking around the country. She knows
              what a draft that will not come together feels like. She also knows
              how to finish one.
            </p>
            <p>
              Before any of that she taught in Hawai&rsquo;i public elementary
              schools for fourteen years, and in 1997 she and her husband Rob
              planted the Honolulu church where she still serves as a part-time
              pastor. That is decades of sitting with people through the hardest
              seasons of their lives, which is most of what a first memoir asks
              of a coach. In 2023 the State of Hawai&rsquo;i named her the Outstanding
              Advocate for Children and Youth.
            </p>
            <p>
              Her signature keynote, Finding Your Brave Purpose, is the story of
              founding Releasing Generations: the fears, the false starts, and
              the moment she stopped talking about the calling and started
              walking in it. That talk grew out of{' '}
              <em>The Birth of Explicit Movement</em>. It is a working example of
              what this engagement is for. A book becomes a message, and the
              message goes on carrying long after the manuscript is done.
            </p>
            <p>
              Michele has not built this page on coaching testimonials. Her own
              authored works are the case studies: two trade books, two more in
              production, the Dream Big Journal Curriculum from preschool
              through adult, the Raising Kingdom Kids Lesson Book, and the three
              Brave Series curricula. Every one of them is a finished piece of
              transformational writing that came out of the process she now
              teaches.
            </p>
            <p>
              <Link
                href="/author"
                className="font-semibold text-neutral-950 underline decoration-[var(--color-cta)] underline-offset-4 hover:decoration-2"
              >
                See the full body of work
              </Link>
            </p>
          </FadeIn>
        </Container>
      </section>

      <section aria-labelledby="pricing-heading" id="pricing" className="scroll-mt-24">
        <Container className="mt-24 sm:mt-32">
          <FadeIn>
            <div className="rounded-4xl bg-neutral-50 p-8 ring-1 ring-neutral-900/10 ring-inset sm:p-12">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
                <div>
                  <h2
                    id="pricing-heading"
                    className="font-display text-2xl font-semibold tracking-tight text-neutral-950"
                  >
                    The Brave Purpose Author Method
                  </h2>
                  <p className="mt-6 font-display text-6xl font-medium tracking-tight text-neutral-950">
                    {PRICE}
                  </p>
                  <p className="mt-3 text-base text-neutral-600">
                    The full twenty-six week engagement. One price across all
                    three starting postures.
                  </p>

                  <dl className="mt-8 space-y-6 text-sm">
                    <div>
                      <dt className="font-display font-semibold tracking-wider text-neutral-500 uppercase">
                        Payment
                      </dt>
                      <dd className="mt-2 leading-6 text-neutral-700">
                        Paid in full at signature. A fifty-fifty split is
                        available on request: half at signature, the balance
                        within forty-eight hours of the Week 13 Mid-engagement
                        Checkpoint.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-display font-semibold tracking-wider text-neutral-500 uppercase">
                        Refund
                      </dt>
                      <dd className="mt-2 leading-6 text-neutral-700">
                        Ask before Writing Assignment #1 is delivered and you
                        receive a full refund minus a $250 administrative fee.
                        After Writing Assignment #1 is delivered the engagement
                        is non-refundable.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-display font-semibold tracking-wider text-neutral-500 uppercase">
                        Tax
                      </dt>
                      <dd className="mt-2 leading-6 text-neutral-700">
                        Hawai&rsquo;i General Excise Tax of 4.5 percent appears
                        as a visible line item on the invoice where it applies.
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-10">
                    <JoinWaitListButton source="coaching-pricing">
                      Book the first conversation
                    </JoinWaitListButton>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-12">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-neutral-950">
                      The fee covers
                    </h3>
                    <ul role="list" className="mt-6 space-y-4">
                      {INCLUDED.map((item) => (
                        <li key={item} className="flex gap-x-3">
                          <CheckMark />
                          <span className="text-base leading-7 text-neutral-600">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-neutral-950">
                      The fee leaves out
                    </h3>
                    <ul
                      role="list"
                      className="mt-6 space-y-4 text-base leading-7 text-neutral-500"
                    >
                      {EXCLUDED.map((item) => (
                        <li
                          key={item}
                          className="border-l-2 border-neutral-200 pl-4"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section aria-label="Who this is for">
        <SectionIntro
          eyebrow="Who this is for"
          title="Three ways in. One Method."
          className="mt-24 sm:mt-32"
        >
          <p>
            Every posture runs the same twenty-six weeks at the same fee. Week 1
            is where Michele finds out which one you are standing in.
          </p>
        </SectionIntro>

        <Container className="mt-16 sm:mt-20">
          <FadeInStagger faster>
            <ul role="list" className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {POSTURES.map((posture) => (
                <FadeIn as="li" key={posture.title}>
                  <Border className="h-full pt-8">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
                      {posture.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-neutral-600">
                      {posture.body}
                    </p>
                  </Border>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>

          <FadeIn className="mt-16 max-w-3xl">
            <h3 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
              This is the wrong fit if:
            </h3>
            <ul
              role="list"
              className="mt-6 space-y-4 text-base leading-7 text-neutral-600"
            >
              {NOT_FOR.map((item) => (
                <li key={item} className="border-l-2 border-neutral-200 pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </section>

      <section aria-label="Frequently asked questions">
        <SectionIntro
          eyebrow="Questions"
          title="What writers ask before they sign."
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

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-24 md:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-white sm:text-4xl">
              Tell Michele about the book you are carrying.
            </h2>
            <p className="mt-6 max-w-2xl text-xl text-neutral-300">
              The first conversation is free and runs about forty-five minutes.
              You describe the book. Michele tells you what she sees in it and
              what six months of this would ask of you. You both decide from
              there.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <JoinWaitListButton source="coaching-footer" tone="dark">
                Book the first conversation
              </JoinWaitListButton>
              <Link
                href={`mailto:${siteConfig.email}?subject=Brave%20Purpose%20Author%20Method`}
                className="text-base font-semibold text-white underline decoration-[var(--color-cta)] underline-offset-4 hover:decoration-2"
              >
                {siteConfig.email}
              </Link>
            </div>

            <Border className="mt-16 pt-10" invert>
              <dl className="grid grid-cols-1 gap-x-10 gap-y-8 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-display font-semibold tracking-wider text-white/70 uppercase">
                    Engagement
                  </dt>
                  <dd className="mt-3 text-white">
                    Twenty-six weeks, one to one
                  </dd>
                </div>
                <div>
                  <dt className="font-display font-semibold tracking-wider text-white/70 uppercase">
                    Investment
                  </dt>
                  <dd className="mt-3 text-white">{PRICE}</dd>
                </div>
                <div>
                  <dt className="font-display font-semibold tracking-wider text-white/70 uppercase">
                    Based in
                  </dt>
                  <dd className="mt-3 text-white">
                    {siteConfig.city}, {siteConfig.state}
                  </dd>
                </div>
              </dl>
            </Border>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
