'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

/**
 * AboutPhotoGrid — the locked About hover effect (design brief, 2026-06-17):
 *  1. Photo desaturates on hover/pin (~70% less saturation) so it recedes.
 *  2. A teal-tinted glass overlay (~40%) fades in as the copy canvas.
 *  3. Two-layer copy reveal, staggered: headline ~150ms, paragraph ~250ms.
 *  4. Mobile tap-to-pin: a teal "+" pins the overlay; tapping another switches;
 *     tapping the active one or outside closes. Pinned == the hover state.
 *  5. Brené-Brown-warm copy (drawn from Michele's voice; review pending).
 *
 * Accessibility: prefers-reduced-motion fades only (no slide); the overlay copy
 * is in the photo alt text and in a visually-hidden <details> for screen readers.
 *
 * Copy below is draft-pending-Michele-review. Photos are the current placeholders.
 */
type Panel = { photo: string; alt: string; headline: string; body: string }

const PANELS: Panel[] = [
  {
    photo: '/team/michele-okimura.jpg',
    alt: 'Michele Okimura smiling',
    headline: 'It started with my own healing.',
    body: 'My story began with finding value where I once felt worthless. That healing lit a fire in me, a passion to help others find the same strength inside themselves.',
  },
  {
    photo: '/team/michele-okimura-2.jpg',
    alt: 'Michele Okimura',
    headline: 'Courage is a practice.',
    body: 'Brave purpose is not a feeling you wait for. It is something you practice, one honest step at a time, until the story you were afraid of becomes the one you were made to tell.',
  },
  {
    photo: '/team/michele-okimura-sm.jpg',
    alt: 'Michele Okimura portrait',
    headline: 'Every story can be a launchpad.',
    body: 'I believe every person’s story, even the broken parts, can become a launchpad into a future full of freedom, wonder, and limitless possibility.',
  },
]

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('h-5 w-5 transition-transform duration-300', open && 'rotate-45')}
    >
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function AboutPhotoGrid() {
  const reduce = useReducedMotion()
  const [pinned, setPinned] = useState<number | null>(null)
  const rootRef = useRef<HTMLUListElement>(null)

  // Tap outside any panel closes the pinned overlay (mobile).
  useEffect(() => {
    if (pinned === null) return
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setPinned(null)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [pinned])

  const toggle = useCallback((i: number) => {
    setPinned((cur) => (cur === i ? null : i))
  }, [])

  return (
    <ul
      ref={rootRef}
      role="list"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {PANELS.map((panel, i) => {
        const open = pinned === i
        return (
          <li key={panel.photo} className="group relative overflow-hidden rounded-3xl">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggle(i)
              }}
              aria-expanded={open}
              aria-label={`${panel.headline} ${panel.body}`}
              className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-terracotta)]"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={panel.photo}
                  alt={panel.alt}
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                  className={cn(
                    'object-cover transition-[filter] duration-500 group-hover:saturate-[.3]',
                    open && 'saturate-[.3]',
                  )}
                />

                {/* Teal-tinted glass overlay */}
                <div
                  className={cn(
                    'absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                    open && 'opacity-100',
                  )}
                  style={{ backgroundColor: 'color-mix(in oklab, var(--color-brand-terracotta) 40%, transparent)' }}
                >
                  {/* Layer 1: headline (~150ms) */}
                  <p
                    className={cn(
                      'font-display text-2xl font-semibold tracking-tight text-white',
                      !reduce && 'translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150',
                      reduce && 'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                      open && 'translate-y-0 opacity-100',
                    )}
                  >
                    {panel.headline}
                  </p>
                  {/* Layer 2: paragraph (~250ms) */}
                  <p
                    className={cn(
                      'mt-3 text-[0.95rem] leading-6 text-white/95',
                      !reduce && 'translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[250ms]',
                      reduce && 'opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:delay-150',
                      open && 'translate-y-0 opacity-100',
                    )}
                  >
                    {panel.body}
                  </p>
                </div>

                {/* Teal "+" pin affordance (lower-right) */}
                <span
                  className={cn(
                    'absolute right-4 bottom-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--color-brand-terracotta-ink)] shadow-md ring-1 ring-[var(--color-brand-terracotta)]/30 transition group-hover:opacity-0',
                    open && 'opacity-0',
                  )}
                >
                  <PlusIcon open={open} />
                </span>
              </div>
            </button>

            {/* Screen-reader static copy (always available, no interaction needed) */}
            <details className="sr-only">
              <summary>{panel.headline}</summary>
              {panel.body}
            </details>
          </li>
        )
      })}
    </ul>
  )
}
