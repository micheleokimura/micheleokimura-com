import Link from 'next/link'
import { cn } from '@/lib/cn'
import { MarkerSwipe } from '@/components/MarkerSwipe'

type Variant = 'primary' | 'secondary' | 'ghost' | 'solid'
type Tone = 'light' | 'dark'

type ButtonProps = {
  variant?: Variant
  /**
   * Background the CTA sits on. `light` (default) keeps the text navy so it
   * reads on cream. `dark` flips the text to cream so it stays legible on a
   * navy panel. Either way, the moment the coral marker slides in behind the
   * text the label switches to coral-ink, because cream on coral #F15C3D is
   * only 2.81:1. For `solid` it drives the focus-ring offset color.
   */
  tone?: Tone
  withArrow?: boolean
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

/**
 * Two CTA families:
 *
 * - Link/nav CTAs (`primary` / `secondary` / `ghost`) read as marker-swiped
 *   text rather than filled rectangles. `primary` shows the highlighter swipe
 *   behind the whole phrase; `secondary` / `ghost` swap a dashed underline for
 *   the swipe on hover.
 * - `solid` is a conventional rectangular coral button with rounded corners
 *   and a clear button affordance. This is the locked treatment for FORM submit
 *   buttons (footer, contact block, /contact), where the marker-swiped text
 *   read as ambiguous next to an input. The marker swipe stays reserved for
 *   hero/nav/link CTAs.
 *
 * `isolate` keeps the swipe scoped to the button so it sits above the button's
 * own (transparent) background but never escapes behind a dark section.
 */
export function Button({
  variant = 'primary',
  tone = 'light',
  withArrow = variant === 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary'
  const isDark = tone === 'dark'

  // Solid: rectangular coral button carrying coral-ink. No marker, no
  // underline — a plain, obvious "press me" control for forms.
  if (variant === 'solid') {
    const solid = cn(
      'inline-flex items-center justify-center gap-1.5 rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-[var(--color-cta-ink)] shadow-sm transition hover:bg-[var(--color-cta-hover)] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
      isDark ? 'focus-visible:ring-offset-neutral-950' : 'focus-visible:ring-offset-white',
      className,
    )
    const solidContent = (
      <>
        <span>{children}</span>
        {withArrow ? (
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        ) : null}
      </>
    )
    if (typeof props.href === 'undefined') {
      return (
        <button className={solid} {...props}>
          {solidContent}
        </button>
      )
    }
    return (
      <Link className={solid} {...props}>
        {solidContent}
      </Link>
    )
  }

  const merged = cn(
    'group relative isolate inline-flex items-center justify-center gap-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
    // Focus ring tracks the background so it stays visible on dark sections.
    isDark ? 'focus-visible:outline-white' : 'focus-visible:outline-neutral-950',
    // A primary CTA is a solid-coral "label tape" with coral-ink text on every
    // background, so its text color is context-independent (the marker handles
    // the contrast). Secondary/ghost text flips with tone at rest, then drops
    // to coral-ink on hover once the coral marker is behind it.
    isPrimary
      ? 'text-[var(--color-cta-ink)]'
      : cn(
          isDark ? 'text-white' : 'text-neutral-950',
          'group-hover:text-[var(--color-cta-ink)]',
        ),
    isPrimary ? 'text-lg font-semibold sm:text-xl' : 'text-base font-medium',
    className,
  )

  const content = (
    <>
      <MarkerSwipe
        className={cn(
          isPrimary
            ? 'scale-x-100 opacity-100'
            : cn(
                'scale-x-0 opacity-0 transition-[transform,opacity] duration-[280ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100',
                // On cream the hover swipe can stay translucent: the label
                // reads at 6.32:1 through a 70% coral. On a navy panel the
                // same 70% blends DOWN to a dark brick and the label falls to
                // 3.00:1, so the swipe goes fully opaque there instead.
                isDark ? 'group-hover:opacity-100' : 'group-hover:opacity-70',
              ),
        )}
      />
      <span
        className={cn(
          'relative z-10',
          !isPrimary &&
            'underline decoration-dashed underline-offset-4 transition-colors group-hover:decoration-transparent',
          !isPrimary && (isDark ? 'decoration-neutral-500' : 'decoration-neutral-400'),
        )}
      >
        {children}
      </span>
      {withArrow ? (
        <span
          aria-hidden="true"
          className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      ) : null}
    </>
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={merged} {...props}>
        {content}
      </button>
    )
  }

  return (
    <Link className={merged} {...props}>
      {content}
    </Link>
  )
}
