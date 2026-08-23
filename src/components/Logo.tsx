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
        // Sapphire on ivory is one of the few places the full-strength brand
        // color is wanted: it is the wordmark. Everything else on an ivory
        // ground stays near-black. See DESIGN-RULES.md.
        invert ? 'text-white' : 'text-[var(--color-brand-sapphire)]',
        className,
      )}
    >
      Michele Okimura
      <span className="text-[var(--color-brand-orange-ink)]">.</span>
    </span>
  )
}
