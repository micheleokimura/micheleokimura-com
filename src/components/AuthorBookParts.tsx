import Image from 'next/image'

import type { AvailableLink, Endorsement } from '@/lib/author-books'

/**
 * The pieces the Author shelf (/author) and a book detail page
 * (/author/books/<slug>) both render. They lived inline in the Author page
 * until the tile rebuild of 2026-08-23 split that page in two; keeping them
 * here is what stops a cover on the shelf and a cover on the detail page from
 * drifting into two different treatments.
 */

/**
 * Cover tile. Ratios across the supplied art run from 2:3 to about 3:4, so the
 * tile holds a fixed 3:4 box and contains the image inside it. No cropping, no
 * distortion, and a missing cover falls back to a titled placeholder rather
 * than a broken tile.
 */
export function Cover({
  src,
  alt,
  sizes,
  priority,
}: {
  src?: string
  alt: string
  sizes: string
  priority?: boolean
}) {
  if (!src) {
    return (
      <div className="flex aspect-[3/4] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-navy)]/20 bg-[var(--color-band-1)] p-5 text-center">
        <span className="font-display text-base leading-tight font-semibold tracking-tight text-neutral-600">
          {alt}
        </span>
        <span className="mt-3 text-xs tracking-widest text-neutral-500 uppercase">
          Cover coming soon
        </span>
      </div>
    )
  }

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[var(--color-band-1)] ring-1 ring-[var(--color-navy-10)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain"
      />
    </div>
  )
}

/**
 * Flat, tracked small-caps label for a title that has not shipped. Deliberately
 * not a pill: DESIGN-RULES bans badges outright because they read as clickable.
 * On a tile it sits directly under the title, which is where Brett asked for it.
 */
export function Forthcoming() {
  return (
    <span className="font-display block text-[11px] font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase">
      Forthcoming
    </span>
  )
}

/** Verbatim endorser quotes. Never edit one to make it fit. */
export function Endorsements({
  items,
  label = 'What readers say',
}: {
  items: Endorsement[]
  label?: string
}) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
        {label}
      </h2>
      <div className="mt-5 space-y-6">
        {items.map((item, i) => (
          <figure
            key={`${item.source}-${i}`}
            className="border-l-2 border-[var(--color-brand-terracotta)] pl-5"
          >
            <blockquote className="text-base leading-7 text-neutral-700 italic">
              {item.quote}
            </blockquote>
            <figcaption className="mt-2 text-sm font-medium text-neutral-500 not-italic">
              {item.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/**
 * "Available at" row. External storefronts open in a new tab. The
 * micheleokimura.com/store destination is printed as text until the store
 * route ships; swap in a Link then.
 */
export function AvailableAt({
  label = 'Available at',
  links,
}: {
  label?: string
  links: AvailableLink[]
}) {
  return (
    <p className="mt-8 text-sm leading-7 text-neutral-600">
      <span className="font-display font-semibold tracking-widest text-neutral-500 uppercase">
        {label}
      </span>{' '}
      {links.map((link, i) => (
        <span key={link.text}>
          {i > 0 ? <span className="text-neutral-300"> &middot; </span> : null}
          {link.href ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition hover:decoration-2"
            >
              {link.text}
            </a>
          ) : (
            <span className="font-medium text-neutral-950">{link.text}</span>
          )}
        </span>
      ))}
    </p>
  )
}
