import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import {
  GOLDEN_THREAD_CULMINATION,
  GOLDEN_THREAD_QUOTE,
  projectStudies,
  type ProjectStudy,
} from '@/lib/projects'
import { siteConfig } from '@/lib/site-config'

// The case-study index. Cards are driven by the registry in src/lib/projects.ts
// so this page, the Author page links, and the sitemap stay in step.
//
// Grouped rather than flat: the curricula and programs are the strongest
// authority stack and lead, with the books following.

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'The story behind each thing Michele Okimura has built: the Brave Series, the Dream Big Journals, the Kingdom Kids Workshop, ReThink Creativity, and her books.',
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    title: `Projects | ${siteConfig.brand}`,
    description: 'The story behind each thing Michele Okimura has built.',
    url: `${siteConfig.url}/projects`,
  },
}

function ProjectCard({ study }: { study: ProjectStudy }) {
  return (
    <FadeIn as="li" scaleIn>
      <Link
        href={study.href}
        className="group flex h-full flex-col rounded-3xl bg-white p-8 ring-1 ring-neutral-900/5 transition hover:shadow-lg hover:ring-neutral-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-teal)]"
      >
        <span className="text-xs font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
          {study.kicker}
        </span>
        <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-neutral-950">
          {study.title}
        </h3>
        <p className="mt-4 flex-1 text-base leading-7 text-neutral-600">
          {study.blurb}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950">
          Read the story
          <span aria-hidden="true">&rarr;</span>
        </span>
      </Link>
    </FadeIn>
  )
}

function Group({
  heading,
  id,
  studies,
  className,
}: {
  heading: string
  id: string
  studies: ProjectStudy[]
  className: string
}) {
  return (
    <section aria-labelledby={id}>
      <Container className={className}>
        <FadeIn>
          <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
            <span id={id}>{heading}</span>
          </h2>
        </FadeIn>
        <FadeInStagger faster className="mt-8">
          <ul
            role="list"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {studies.map((study) => (
              <ProjectCard key={study.slug} study={study} />
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </section>
  )
}

export default function ProjectsPage() {
  const programs = projectStudies.filter(
    (s) => s.group === 'curricula-and-programs',
  )
  const books = projectStudies.filter((s) => s.group === 'books')

  return (
    <>
      <PageIntro eyebrow="Projects" title="Everything she has built, and why.">
        <p>
          Michele&rsquo;s authored works are her case studies. Each curriculum,
          conference, journal series, and book below is a record of taking an
          idea from nothing to something people can hold. These are the stories
          behind them: where each one came from, how it was made, and who it has
          reached.
        </p>
      </PageIntro>

      {/* The golden thread stated once, up front, so the grouped cards below
          read as one body of work rather than a list of unrelated products. */}
      <Container className="mt-4 sm:mt-8">
        <FadeIn>
          <figure className="max-w-3xl rounded-3xl bg-[#0097b2]/[0.06] p-8 ring-1 ring-[#0097b2]/[0.2] sm:p-10">
            <h2 className="font-display text-xs font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
              The golden thread
            </h2>
            <blockquote className="mt-5 font-display text-xl leading-9 text-neutral-800 italic sm:text-2xl sm:leading-10">
              &ldquo;{GOLDEN_THREAD_QUOTE}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm font-medium text-neutral-500 not-italic">
              Michele Okimura
            </figcaption>
            <blockquote className="mt-6 border-t border-[#0097b2]/[0.25] pt-6 text-base leading-7 text-neutral-800 italic">
              &ldquo;{GOLDEN_THREAD_CULMINATION}&rdquo;
            </blockquote>
          </figure>
        </FadeIn>
      </Container>

      <Group
        heading="Curricula and programs"
        id="curricula-and-programs"
        studies={programs}
        className="mt-16 sm:mt-24"
      />

      <Group
        heading="Books"
        id="books"
        studies={books}
        className="mt-20 sm:mt-28"
      />

      <Container className="mt-20 sm:mt-28">
        <FadeIn>
          <p className="max-w-3xl text-base leading-7 text-neutral-600">
            Looking for the schools, churches, and organizations Michele has
            worked with? Those stories live on the{' '}
            <Link
              href="/case-studies"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-teal)] decoration-1 underline-offset-4 transition hover:decoration-2"
            >
              case studies
            </Link>{' '}
            page.
          </p>
        </FadeIn>
      </Container>

      <ContactBlock
        heading="Want something like this built with your people?"
        source="projects-index"
      >
        <p>
          Michele coaches writers through the Brave Purpose Author Method and
          brings these programs to schools, churches, and organizations. Tell
          her what you are hoping to build.
        </p>
      </ContactBlock>
    </>
  )
}
