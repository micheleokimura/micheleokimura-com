'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/FadeIn'

export type Piece = {
  src: string
  alt: string
  category: string
}

export type PortfolioCategory = {
  key: string
  title: string
  description: string
  /** Tailwind aspect-ratio class for this category's tiles, e.g. 'aspect-video'. */
  aspectClass: string
  items: Piece[]
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function Lightbox({
  pieces,
  index,
  onClose,
  onNavigate,
}: {
  pieces: Piece[]
  index: number
  onClose: () => void
  onNavigate: (next: number) => void
}) {
  const piece = pieces[index]
  const dialogRef = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (delta: number) => {
      onNavigate((index + delta + pieces.length) % pieces.length)
    },
    [index, pieces.length, onNavigate],
  )

  // Mount-only: lock body scroll, move focus into the dialog, and return focus
  // to the element that opened it (the originating gallery tile) on close.
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      trigger?.focus?.()
    }
  }, [])

  // Keyboard: Escape to close, arrows to navigate, and a focus trap so Tab
  // never leaves the open lightbox.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key === 'ArrowRight') return go(1)
      if (e.key === 'ArrowLeft') return go(-1)
      if (e.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      const els = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (!els.length) return
      const first = els[0]
      const last = els[els.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      } else if (active && !dialog.contains(active)) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={piece.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/90 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <CloseIcon className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          go(-1)
        }}
        aria-label="Previous"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-4"
      >
        <ChevronIcon className="h-7 w-7" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          go(1)
        }}
        aria-label="Next"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rotate-180 rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4"
      >
        <ChevronIcon className="h-7 w-7" />
      </button>

      <motion.figure
        key={piece.src}
        className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex max-h-[78vh] w-full items-center justify-center">
          <Image
            src={piece.src}
            alt={piece.alt}
            width={1600}
            height={1600}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="h-auto max-h-[78vh] w-auto max-w-full rounded-xl object-contain"
          />
        </div>
        <figcaption className="mt-4 flex items-center gap-3 text-sm text-white/80">
          <span className="rounded-full bg-white/10 px-3 py-1 font-medium uppercase tracking-wider text-white">
            {piece.category}
          </span>
          <span>{piece.alt}</span>
          <span className="text-white/40">
            {index + 1} / {pieces.length}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>,
    document.body,
  )
}

function Tile({
  piece,
  aspectClass,
  onOpen,
}: {
  piece: Piece
  aspectClass: string
  onOpen: () => void
}) {
  return (
    <figure className="group flex flex-col">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${piece.alt} full size`}
        className={`relative block w-full overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-900/5 transition duration-300 hover:ring-2 hover:ring-[var(--color-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 ${aspectClass}`}
      >
        <Image
          src={piece.src}
          alt={piece.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-3 transition duration-500 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-neutral-950/0 opacity-0 transition group-hover:bg-neutral-950/10 group-hover:opacity-100"
        >
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-950 shadow-sm">
            View full size
          </span>
        </span>
      </button>
      <figcaption className="mt-2.5 text-xs font-medium uppercase tracking-wider text-neutral-500">
        {piece.category}
      </figcaption>
    </figure>
  )
}

const INITIAL_VISIBLE = 9

function CategorySection({
  category,
  startIndex,
  onOpen,
}: {
  category: PortfolioCategory
  startIndex: number
  onOpen: (globalIndex: number) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = category.items.length > INITIAL_VISIBLE
  const visible = expanded ? category.items : category.items.slice(0, INITIAL_VISIBLE)
  const hiddenCount = category.items.length - INITIAL_VISIBLE

  return (
    <section aria-labelledby={`cat-${category.key}`} className="scroll-mt-24">
      <FadeIn>
        <h2
          id={`cat-${category.key}`}
          className="font-display text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
        >
          {category.title}
        </h2>
        <p className="mt-2 max-w-2xl text-base text-neutral-600">
          {category.description}
        </p>
      </FadeIn>

      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      >
        {visible.map((piece, i) => (
          <FadeIn as="li" key={piece.src} scaleIn>
            <Tile
              piece={piece}
              aspectClass={category.aspectClass}
              onOpen={() => onOpen(startIndex + i)}
            />
          </FadeIn>
        ))}
      </ul>

      {hasMore ? (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="group relative isolate inline-flex items-center gap-1.5 text-base font-medium text-neutral-950"
          >
            <span className="underline decoration-dashed underline-offset-4 decoration-neutral-400 transition-colors group-hover:decoration-[var(--color-cta)]">
              {expanded ? 'Show fewer' : `Show ${hiddenCount} more`}
            </span>
            <span
              aria-hidden="true"
              className={`transition-transform duration-200 ${expanded ? '-rotate-90' : 'rotate-90'}`}
            >
              &rsaquo;
            </span>
          </button>
        </div>
      ) : null}
    </section>
  )
}

export function PortfolioCategories({
  categories,
}: {
  categories: PortfolioCategory[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Flatten in display order so the lightbox can arrow through every piece.
  const allPieces = categories.flatMap((c) => c.items)
  const offsets: number[] = []
  categories.reduce((acc, c) => {
    offsets.push(acc)
    return acc + c.items.length
  }, 0)

  return (
    <>
      <div className="space-y-20 sm:space-y-28">
        {categories.map((category, ci) => (
          <CategorySection
            key={category.key}
            category={category}
            startIndex={offsets[ci]}
            onOpen={setOpenIndex}
          />
        ))}
      </div>

      {mounted && openIndex !== null ? (
        <Lightbox
          pieces={allPieces}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      ) : null}
    </>
  )
}
