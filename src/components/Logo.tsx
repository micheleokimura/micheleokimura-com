import { cn } from '@/lib/cn'

/**
 * Michele Okimura wordmark. Rendered as type (no logo file yet): the name in the
 * display face with a teal accent dot. White on dark surfaces when `invert`.
 * TODO: swap for a real logo/mark if Michele provides one.
 */
export function Logo({
  className,
  invert = false,
}: {
  className?: string
  invert?: boolean
}) {
  return (
    <span
      className={cn(
        'font-display text-xl font-semibold tracking-tight whitespace-nowrap',
        invert ? 'text-white' : 'text-neutral-950',
        className,
      )}
    >
      Michele Okimura
      <span className="text-[var(--color-brand-teal)]">.</span>
    </span>
  )
}
