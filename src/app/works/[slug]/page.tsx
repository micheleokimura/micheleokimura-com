import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import { WorkJsonLd } from '@/components/JsonLd'
import { pageMetadata } from '@/lib/schema'
import { authoredWorks, type AuthoredWork } from '@/lib/site-config'
import { worksSlugToProject } from '@/lib/projects'

export function generateStaticParams() {
  return authoredWorks.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const work = authoredWorks.find((w) => w.slug === slug)
  if (!work) return {}
  return pageMetadata({
    title: work.title,
    description: work.subtitle ?? `${work.title} by Michele Okimura.`,
    path: `/works/${work.slug}`,
    type: 'article',
    image: work.coverImage,
  })
}

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

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-neutral-200 py-3">
      <dt className="text-sm font-medium text-neutral-500">{label}</dt>
      <dd className="text-sm text-neutral-900">{value}</dd>
    </div>
  )
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const work = authoredWorks.find((w) => w.slug === slug)
  if (!work) notFound()

  const projectHref = worksSlugToProject[work.slug]

  return (
    <>
      <WorkJsonLd work={work} />

      <PageIntro
        eyebrow={categoryLabel(work.category)}
        title={`${work.title}.`}
      >
        {work.subtitle && <p>{work.subtitle}</p>}
      </PageIntro>

      <Container className="mt-14 sm:mt-20">
        <FadeIn>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              {work.coverImage && (
                <div className="relative mb-8 aspect-[3/4] max-w-xs overflow-hidden rounded-2xl bg-neutral-100">
                  <Image
                    src={work.coverImage}
                    alt={`Cover of ${work.title}`}
                    fill
                    sizes="320px"
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="prose-blog max-w-2xl space-y-5 text-base leading-7 text-neutral-700">
                {work.status === 'in-production' && (
                  <p className="rounded-xl border-l-2 border-[var(--color-brand-terracotta)] bg-[var(--color-teal-05)] px-5 py-4 text-neutral-800">
                    This title is currently in production and is scheduled for
                    release in {work.year}.
                  </p>
                )}

                {/* TODO Michele content: full case-study prose will replace
                    this summary when it lands from the content repo. Where a
                    project case study already exists, the link below carries
                    the reader to it rather than repeating the story here. */}
                <p>
                  <em>{work.title}</em> is{' '}
                  {work.subtitle
                    ? work.subtitle.charAt(0).toLowerCase() +
                      work.subtitle.slice(1)
                    : `a work by Michele Okimura.`}
                </p>

                {projectHref && (
                  <p>
                    <Link
                      href={projectHref}
                      className="inline-flex items-center gap-2 font-semibold text-[var(--color-brand-terracotta-ink)] underline underline-offset-4 hover:decoration-2"
                    >
                      Read the story behind this work
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </p>
                )}

                {work.purchaseUrl && (
                  <p>
                    <a
                      href={work.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-semibold text-[var(--color-brand-terracotta-ink)] underline underline-offset-4 hover:decoration-2"
                    >
                      Get this book
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </p>
                )}
              </div>
            </div>

            <aside>
              <dl className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h3 className="mb-4 font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                  Details
                </h3>
                <MetadataRow label="Category" value={categoryLabel(work.category)} />
                {work.year && (
                  <MetadataRow label="Year" value={String(work.year)} />
                )}
                {work.publisher && (
                  <MetadataRow label="Publisher" value={work.publisher} />
                )}
                {work.format && (
                  <MetadataRow label="Format" value={work.format} />
                )}
                {work.isbn && (
                  <MetadataRow label="ISBN" value={work.isbn} />
                )}
                {work.illustrator && (
                  <MetadataRow label="Illustrator" value={work.illustrator} />
                )}
                <MetadataRow
                  label="Status"
                  value={
                    work.status === 'published'
                      ? 'Published'
                      : work.status === 'in-production'
                        ? 'In production'
                        : 'Active'
                  }
                />
              </dl>
            </aside>
          </div>
        </FadeIn>
      </Container>

      <ContactBlock heading="Work with Michele.">
        <p>
          The same method Michele used to write this work is now available
          through the Brave Purpose Author Method coaching engagement.
        </p>
      </ContactBlock>
    </>
  )
}
