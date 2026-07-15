import { cn } from '@/lib/cn'

/**
 * Teal highlighter swipe behind nav and CTA text. Literal CSS fill value
 * instead of var() because Safari/iOS won't evaluate var() inside an SVG
 * presentation attribute.
 */
const MARKER_TEAL = '#0097B2'

export function MarkerSwipe({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 z-0 origin-center',
        className,
      )}
    >
      <svg
        aria-hidden="true"
        role="presentation"
        focusable="false"
        viewBox="0 0 100 22"
        preserveAspectRatio="none"
        className="absolute top-1/2 left-1/2 h-[75%] w-[110%]"
        style={{
          transform: 'translate(-50%, -50%) rotate(-1.5deg)',
          overflow: 'visible',
        }}
      >
        <path
          d="M 1,11 L 6,3.5 L 94,3.5 L 99,11 L 94,18.5 L 6,18.5 Z"
          fill={MARKER_TEAL}
          style={{ fill: MARKER_TEAL }}
          opacity="0.9"
        />
      </svg>
    </span>
  )
}
