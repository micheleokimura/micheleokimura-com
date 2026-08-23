import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

/**
 * THE banner hero. Every interior page uses this one component: Author, Speak,
 * Coaching, About, Resources, Works, Projects, and every case study. The site
 * identity is the banner itself, so there is deliberately no per-page hero
 * photograph and no per-page background. `PageIntro` is a thin alias over this
 * for the pages that were built against its prop names.
 *
 * Compact by direction: 280 to 320px, calm, out of the way so the content
 * underneath starts almost immediately. The home page keeps its video hero and
 * does not use this. See DESIGN-RULES.md.
 *
 * Sits BELOW the header rather than under it. The site header is absolutely
 * positioned over the cream band at the top of `main`, which already carries
 * pt-28 / sm:pt-32 to clear it, so the banner begins where that padding ends.
 * That keeps the nav legible without a per-page dark-header variant.
 *
 * Background is `.surface-teal-banner`: a warm terracotta glow at the centre
 * over a teal field deepening to --color-brand-teal-deep at the edges. Defined
 * once in tailwind.css so it cannot drift between pages.
 *
 * The eyebrow is plain tracked small caps. No pill, no badge, no border, no
 * rounded corners, anywhere, ever. Pills read as buttons and people click them.
 *
 * Its color is --color-brand-terracotta-on-dark rather than the brand
 * terracotta: #D4735A on teal is 1.67:1 and fails WCAG AA badly, while the
 * pale peach holds 4.62:1 against the lightest point of the gradient. See the
 * palette block in tailwind.css.
 */
export function BannerHero({
  eyebrow,
  title,
  subtitle,
  centered = false,
  children,
}: {
  eyebrow?: string
  title: string
  /** Optional single line under the H1. */
  subtitle?: React.ReactNode
  /** Centers the banner text. Off by default. */
  centered?: boolean
  /** Optional CTA row. Coaching uses it; Author and Speak do not. */
  children?: React.ReactNode
}) {
  return (
    <section
      data-surface="dark"
      className="surface-teal-banner relative isolate flex min-h-[280px] w-full items-center overflow-hidden py-12 sm:min-h-[300px] sm:py-14 lg:min-h-[320px]"
    >
      <Container>
        <FadeIn className={centered ? 'text-center' : undefined}>
          <h1>
            {eyebrow ? (
              <>
                <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-on-dark)] uppercase sm:text-sm">
                  {eyebrow}
                </span>
                <span className="sr-only"> - </span>
              </>
            ) : null}
            <span
              className={`font-display mt-4 block max-w-3xl text-[2rem] leading-[1.1] font-medium tracking-tight text-balance text-[var(--color-cream)] sm:mt-5 sm:text-[2.5rem] lg:text-5xl lg:leading-[1.08] ${
                centered ? 'mx-auto' : ''
              }`}
            >
              {title}
            </span>
          </h1>

          {subtitle ? (
            <div
              className={`font-display mt-4 max-w-2xl text-lg leading-7 font-medium text-[var(--color-cream)]/85 sm:text-xl sm:leading-8 ${
                centered ? 'mx-auto' : ''
              }`}
            >
              {subtitle}
            </div>
          ) : null}

          {children ? <div className="mt-6 sm:mt-7">{children}</div> : null}
        </FadeIn>
      </Container>
    </section>
  )
}
