import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Writing and resources from Michele Okimura on identity, courage, healing, and brave purpose.',
  alternates: { canonical: '/resources' },
}

function formatDate(date: string) {
  if (!date) return ''
  const d = new Date(date)
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function ResourcesPage() {
  const posts = await getAllPosts()

  return (
    <>
      <PageIntro eyebrow="Resources" title="Writing and resources.">
        <p>
          Reflections and resources on identity, courage, healing, and brave
          purpose. More is being added as Michele writes.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-24">
        {posts.length === 0 ? (
          <FadeIn className="max-w-2xl text-lg text-neutral-600">
            <p>New writing is on the way. Join the waitlist to hear when it lands.</p>
          </FadeIn>
        ) : (
          <FadeInStagger faster>
            <ul role="list" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <FadeIn as="li" key={post.slug} scaleIn>
                  <Link
                    href={`/resources/${post.slug}`}
                    className="group flex h-full flex-col rounded-3xl bg-white p-8 ring-1 ring-neutral-900/5 transition hover:shadow-lg hover:ring-neutral-900/15"
                  >
                    {post.featured && (
                      <span className="text-xs font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                        Featured
                      </span>
                    )}
                    <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-neutral-950">
                      {post.title}
                    </h2>
                    {post.date && (
                      <p className="mt-1 text-sm text-neutral-500">{formatDate(post.date)}</p>
                    )}
                    <p className="mt-4 flex-1 text-base leading-7 text-neutral-600">
                      {post.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950">
                      Read
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        )}
      </Container>

      <ContactBlock heading="Stay in touch.">
        <p>Join the waitlist and Michele will reach out personally.</p>
      </ContactBlock>
    </>
  )
}
