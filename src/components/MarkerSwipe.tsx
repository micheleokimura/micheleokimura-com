import { cn } from '@/lib/cn'

/**
 * Coral highlighter swipe behind nav and CTA text. Literal CSS fill value
 * instead of var() because Safari/iOS won't evaluate var() inside an SVG
 * presentation attribute, so this hex has to be kept in step with
 * --color-coral in tailwind.css by hand. It is the ONLY hard-coded brand hex
 * left in the codebase; everything else goes through a token.
 */
const MARKER_CORAL = '#F15C3D'

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
        {/* Opaque on purpose. At 0.9 the background bled through, so the swipe
            landed at #F16A4D on cream but a muddy #DC573E on a navy panel, and
            the coral-ink label fell to 4.10:1 there. Fully opaque means the
            swipe is exactly coral on EVERY background, so the label holds
            4.75:1 wherever the button is used. The marker reads as a marker
            from its angled ends and the -1.5deg tilt, not from translucency. */}
        <path
          d="M 1,11 L 6,3.5 L 94,3.5 L 99,11 L 94,18.5 L 6,18.5 Z"
          fill={MARKER_CORAL}
          style={{ fill: MARKER_CORAL }}
        />
      </svg>
    </span>
  )
}
