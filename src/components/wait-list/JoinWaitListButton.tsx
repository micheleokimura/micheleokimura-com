'use client'

import { cn } from '@/lib/cn'
import { useWaitList } from '@/components/wait-list/WaitListProvider'

type Variant = 'primary' | 'secondary' | 'ghost'
type Tone = 'light' | 'dark'

type Props = {
  /** Tags which CTA the lead came from, e.g. "header", "case-study:slug". */
  source: string
  variant?: Variant
  /** Surface the button sits on; only drives the focus-ring offset color. */
  tone?: Tone
  withArrow?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * The single wait-list call to action across the site: a conventional yellow
 * rectangular rounded button (not the marker swipe). Clicking it opens the
 * shared modal via context, passing `source` so the signup is attributed to
 * this exact placement. The marker swipe stays reserved for hero text links and
 * the active nav state.
 */
export function JoinWaitListButton({
  source,
  variant = 'primary',
  tone = 'light',
  withArrow = true,
  className,
  children = 'Join the wait list',
}: Props) {
  const { openWaitListModal } = useWaitList()

  const base =
    'group inline-flex items-center justify-center gap-1.5 rounded-md px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2'

  const variants: Record<Variant, string> = {
    primary:
      'bg-[var(--color-cta)] text-neutral-950 shadow-sm hover:bg-[var(--color-cta-hover)]',
    secondary:
      'bg-transparent text-neutral-950 ring-1 ring-inset ring-neutral-300 hover:ring-neutral-950',
    ghost: 'bg-transparent text-neutral-950 hover:bg-neutral-950/[0.06]',
  }

  return (
    <button
      type="button"
      onClick={() => openWaitListModal(source)}
      className={cn(
        base,
        variants[variant],
        tone === 'dark'
          ? 'focus-visible:ring-offset-neutral-950'
          : 'focus-visible:ring-offset-white',
        className,
      )}
    >
      <span>{children}</span>
      {withArrow ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      ) : null}
    </button>
  )
}
