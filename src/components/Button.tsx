import Link from 'next/link'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'solid'
type Tone = 'light' | 'dark'

type ButtonProps = {
  variant?: Variant
  /**
   * Background the CTA sits on. Only affects `secondary` / `ghost`, whose label
   * has to flip between navy and cream to stay legible, and the focus-ring
   * offset on the filled variants.
   */
  tone?: Tone
  withArrow?: boolean
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

/**
 * THE ORANGE HIGHLIGHTER IS GONE. Removed 2026-08-24 at Michele's instruction:
 * "no orange highlight-marker aesthetic anywhere."
 *
 * `primary` used to render as text with an opaque coral MarkerSwipe behind it,
 * an angled marker-pen shape borrowed from the nav's active tab. Brett had
 * already had that treatment removed from the nav; this was the last place it
 * survived. `secondary` and `ghost` slid the same shape in on hover, and that
 * is gone too. MarkerSwipe.tsx is deleted with this change, since nothing else
 * referenced it.
 *
 * What replaced it is not a new invention. Every other CTA on this site (the
 * header Contact button, ContactTrigger, the contact popup, the wait-list
 * buttons, /not-found) already renders as a filled coral rounded rectangle, so
 * `primary` now renders as the same thing, one size up. That makes the CTA
 * treatment uniform sitewide instead of the home page having its own.
 *
 * The colour stays coral because coral is the CTA fill in the locked palette
 * and is what the hero's "Get in touch" button already uses. Michele's
 * objection was to the marker SHAPE, not the hue; swapping this one button to
 * navy or teal would leave it the only primary CTA on the site in a different
 * colour. Easy to change if she disagrees: it is the `--color-cta` token below.
 *
 * Contrast: the label is --color-cta-ink #1B2239 on coral #F15C3D, 4.75:1, and
 * 5.92:1 on the lighter hover. Plain navy would be 4.43:1 and miss AA, which is
 * why the ink token exists. Do not swap the label to navy or to cream.
 */

/** The two filled sizes. `primary` is the page-level CTA; `solid` is form-sized. */
const FILL_BASE =
  'inline-flex items-center justify-center gap-1.5 rounded-md bg-[var(--color-cta)] font-semibold text-[var(--color-cta-ink)] shadow-sm transition hover:bg-[var(--color-cta-hover)] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2'

export function Button({
  variant = 'primary',
  tone = 'light',
  withArrow = variant === 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const isFilled = variant === 'primary' || variant === 'solid'
  const isDark = tone === 'dark'

  const merged = isFilled
    ? cn(
        'group',
        FILL_BASE,
        // Page CTA vs form submit. Matches ContactTrigger's sizing so the two
        // read as the same control when they sit on the same page.
        variant === 'primary' ? 'px-6 py-3.5 text-base' : 'px-6 py-3 text-sm',
        isDark
          ? 'focus-visible:ring-offset-neutral-950'
          : 'focus-visible:ring-offset-white',
        className,
      )
    : cn(
        // Text link with a dashed underline that firms up on hover. This is
        // what `secondary` always was minus the marker sliding in behind it.
        'group inline-flex items-center justify-center gap-1.5 text-base font-medium underline decoration-dashed underline-offset-4 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
        isDark
          ? 'text-white decoration-neutral-500 hover:decoration-white focus-visible:outline-white'
          : 'text-neutral-950 decoration-neutral-400 hover:decoration-neutral-950 focus-visible:outline-neutral-950',
        className,
      )

  const content = (
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
