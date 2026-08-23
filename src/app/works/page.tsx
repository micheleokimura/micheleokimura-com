import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import { siteConfig, authoredWorks, type AuthoredWork } from '@/lib/site-config'
import { pageMetadata } from '@/lib/schema'

export const metadata: Metadata = pageMetadata({
  title: 'Works',
  description:
    'Fifteen authored works spanning trade books, curricula, programs, and a blog. Each one is a case study of the same method Michele now teaches.',
  path: '/works',
  ogDescription:
    'Books, curricula, programs, and a blog by Michele Okimura.',
})

function categoryLabel(cat: AuthoredWork['category']): string {
  switch (cat) {
    case 'trade-book':
      return 'Book'
    case 'curriculum':
      return 'Curriculum'
    case 'blog':
      return 'Blog'
    case 'program':
      return 'Program'
  }
}

function statusBadge(work: AuthoredWork) {
  if (work.status === 'in-production') {
    return (
      <span className="font-display inline-block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase">
        Coming {work.year}
      </span>
    )
  }
  if (work.status === 'active' && work.category === 'blog') {
    return (
      <span className="font-display inline-block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-teal)] uppercase">
        Active
      </span>
    )
  }
  return null
}

const SECTIONS: { label: string; filter: AuthoredWork['category'][] }[] = [
  { label: 'Books', filter: ['trade-book'] },
  { label: 'Curricula', filter: ['curriculum'] },
  { label: 'Programs', filter: ['program'] },
  { label: 'Blog', filter: ['blog'] },
]

export default function WorksPage() {
  return (
    <>
      <PageIntro eyebrow="Authored works" title="Fifteen works. One method.">
        <p>
          Trade books, curricula for every age group, conferences with global
          reach, and an ongoing blog. Each one is a case study of the same
          method Michele now teaches through the Brave Purpose Author Method.
        </p>
      </PageIntro>

      {SECTIONS.map((section) => {
        const works = authoredWorks.filter((w) =>
          section.filter.includes(w.category),
        )
        if (works.length === 0) return null

        return (
          <section key={section.label} aria-label={section.label}>
            <Container className="mt-16 sm:mt-24">
              <FadeIn>
                <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                  {section.label}
                </h2>
              </FadeIn>
              <FadeInStagger faster className="mt-8">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {works.map((work) => (
                    <FadeIn as="li" key={work.slug} scaleIn>
                      <Link
                        href={`/works/${work.slug}`}
                        className="group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-neutral-900/5 transition hover:shadow-lg hover:ring-neutral-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
                      >
                        {work.coverImage ? (
                          <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100">
                            <Image
                              src={work.coverImage}
                              alt={`Cover of ${work.title}`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="mb-4 flex aspect-[3/4] w-full items-center justify-center rounded-xl bg-neutral-50 p-6">
                            <span className="text-center font-display text-lg font-semibold tracking-tight text-neutral-400">
                              {work.title}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                            {categoryLabel(work.category)}
                          </span>
                          {statusBadge(work)}
                        </div>
                        <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-neutral-950">
                          {work.title}
                        </h3>
                        {work.subtitle && (
                          <p className="mt-2 flex-1 text-sm leading-6 text-neutral-600">
                            {work.subtitle}
                          </p>
                        )}
                        {work.year && (
                          <p className="mt-3 text-xs text-neutral-500">
                            {work.publisher
                              ? `${work.publisher}, ${work.year}`
                              : String(work.year)}
                          </p>
                        )}
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950">
                          Read more
                          <span aria-hidden="true">&rarr;</span>
                        </span>
                      </Link>
                    </FadeIn>
                  ))}
                </ul>
              </FadeInStagger>
            </Container>
          </section>
        )
      })}

      <ContactBlock heading="Work with Michele.">
        <p>
          If you carry a book, a calling, or a movement and want to turn it
          into something readers can hold, the Brave Purpose Author Method is
          how Michele walks with you.
        </p>
      </ContactBlock>
    </>
  )
}
