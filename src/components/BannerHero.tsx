import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

/**
 * Banner hero for interior pages (Author, Speaker, Coaching).
 *
 * Per the Brett + Michele direction, interior pages get a compact banner
 * instead of a full-height hero: sapphire, 280 to 320px tall, calm, and out of
 * the way so the content underneath starts almost immediately. The home page
 * keeps its full-height hero and does not use this. See DESIGN-RULES.md.
 *
 * Sits BELOW the header rather than under it. The site header is absolutely
 * positioned with near-black text on ivory, and `main` already carries
 * pt-28 / sm:pt-32 to clear it, so the banner begins where that padding ends.
 * That keeps the nav legible without a per-page dark-header variant.
 *
 * Background is a warm glow at the center of the panel easing out to deep
 * sapphire at the edges, matching the dark-with-glow feel of the reference
 * interiors in Michele's palette.
 *
 * The eyebrow is plain tracked small caps. No pill, no badge, no border, no
 * rounded corners, anywhere, ever. Pills read as buttons and people click them.
 *
 * Its color is --color-brand-orange-on-dark rather than the brand orange:
 * #FF4500 on sapphire is 2.08:1 and fails WCAG AA, while the peach reads as
 * the same warm family at 4.60:1. See the palette block in tailwind.css.
 */
export function BannerHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: string
  /** Optional single line under the H1. */
  subtitle?: string
  /** Optional CTA row. Coaching uses it; Author and Speaker do not. */
  children?: React.ReactNode
}) {
  return (
    <section
      data-surface="dark"
      className="relative isolate flex min-h-[280px] w-full items-center overflow-hidden py-12 sm:min-h-[300px] sm:py-14 lg:min-h-[320px]"
      style={{
        backgroundColor: 'var(--color-brand-sapphire-deep)',
        backgroundImage: [
          'radial-gradient(ellipse 75% 130% at 50% 45%, rgba(255, 69, 0, 0.28) 0%, rgba(255, 69, 0, 0.10) 42%, rgba(255, 69, 0, 0) 72%)',
          'radial-gradient(ellipse 110% 150% at 50% 50%, var(--color-brand-sapphire) 0%, var(--color-brand-sapphire-deep) 78%)',
        ].join(', '),
      }}
    >
      <Container>
        <FadeIn>
          <h1>
            <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-orange-on-dark)] uppercase sm:text-sm">
              {eyebrow}
            </span>
            <span className="sr-only"> - </span>
            <span className="font-display mt-4 block max-w-3xl text-[2rem] leading-[1.1] font-medium tracking-tight text-balance text-[var(--color-ivory)] sm:mt-5 sm:text-[2.5rem] lg:text-5xl lg:leading-[1.08]">
              {title}
            </span>
          </h1>

          {subtitle ? (
            <p className="font-display mt-4 max-w-2xl text-lg leading-7 font-medium text-[var(--color-ivory)]/85 sm:text-xl sm:leading-8">
              {subtitle}
            </p>
          ) : null}

          {children ? <div className="mt-6 sm:mt-7">{children}</div> : null}
        </FadeIn>
      </Container>
    </section>
  )
}
