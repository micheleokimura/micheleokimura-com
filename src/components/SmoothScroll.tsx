'use client'

import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'framer-motion'

// Global inertial smooth scroll (Lenis). Wraps the whole app in the root
// layout so every page gets the same momentum-eased scroll feel. `root` makes
// Lenis drive the document scroller (html/body) so native CSS `position:
// sticky` keeps working for the hero parallax reveal.
//
// Touch devices: Lenis leaves touch scrolling native by default (syncTouch is
// off), so mobile keeps its normal, non-laggy feel. We also bypass Lenis
// entirely when the user prefers reduced motion.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      options={{
        // lerp ~0.09 reads as smooth-with-momentum without feeling laggy.
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  )
}
