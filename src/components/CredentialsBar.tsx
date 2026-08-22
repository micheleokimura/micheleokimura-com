import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { featuredAward } from '@/lib/credentials'

/**
 * CredentialsBar — a slim "recognized by" strip under the hero. Seeded with the
 * Hawaii Governor's award; expands as the public-credentials dossier lands.
 */
export function CredentialsBar() {
  const award = featuredAward
  if (!award) return null

  return (
    <Container className="pb-8 sm:pb-10">
      <FadeIn>
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50/70 px-6 py-5 text-center sm:flex-row sm:justify-center sm:gap-5 sm:text-left">
          <span className="font-display text-xs font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase">
            Recognized by the State of Hawaii
          </span>
          <span className="hidden h-5 w-px bg-neutral-300 sm:block" aria-hidden="true" />
          <p className="text-sm text-neutral-700">
            <span className="font-semibold text-neutral-950">
              {award.title}
              {award.year ? ` (${award.year})` : ''}
            </span>
            {award.href && (
              <>
                {' '}
                <Link
                  href={award.href}
                  className="font-semibold text-neutral-950 underline decoration-[var(--color-cta)] underline-offset-4 hover:decoration-2"
                >
                  Read the story
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </>
            )}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
