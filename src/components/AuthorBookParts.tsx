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
 * Cover art.
 *
 * TWO VARIANTS, and the difference is deliberate.
 *
 * `flush` is the shelf tile: a full-bleed band across the top of the card, no
 * radius and no ring of its own, clipped by the card's own `overflow-hidden`.
 * That is the Living in Duvall listing pattern Brett sent as the reference
 * (livingin-platform.vercel.app/listings), where the photo runs edge to edge
 * into the rounded corners and grows slightly on card hover.
 *
 * The one thing NOT borrowed from the reference is `object-cover`. Duvall
 * lists businesses and crops 4:3 photographs, which is the right call for a
 * photo and the wrong one for a book: cropping a cover cuts the title off it.
 * So the band keeps the reference's 4:3 box and contains the art inside it.
 * Portrait covers end up filling the band's full height, which lands them at
 * almost exactly the reference's image height anyway.
 *
 * The `p-4` inside the band is what makes the hover zoom safe. `object-contain`
 * fits the art to the CONTENT box, so the padding leaves the art 16px of room
 * to grow into; without it, scale-105 would clip the top and bottom of every
 * cover against the band edge.
 *
 * The default variant is the standalone box used on a book's detail page,
 * where the cover is the subject rather than a thumbnail.
 *
 * Ratios across the supplied art run from 2:3 to about 3:4, so nothing is ever
 * cropped or distorted, and a missing cover falls back to a book-shaped
 * placeholder rather than a broken tile.
 */
export function Cover({
  src,
  alt,
  sizes,
  priority,
  flush = false,
}: {
  src?: string
  alt: string
  sizes: string
  priority?: boolean
  /** Full-bleed band for a shelf tile. Off for the standalone detail page. */
  flush?: boolean
}) {
  if (flush) {
    return (
      // Exactly the reference's band: a fixed-width strip that stretches to the
      // card height on a phone, and only from sm does it become the 4:3 band
      // across the top. The aspect ratio must NOT apply in the strip case, or
      // the band collapses to 72px inside a much taller card.
      <div className="relative w-24 shrink-0 self-stretch overflow-hidden bg-[var(--color-band-1)] sm:aspect-[4/3] sm:w-full sm:self-auto">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-contain p-2 transition duration-300 group-hover:scale-105 sm:p-4"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4">
            <div className="flex aspect-[3/4] h-full flex-col items-center justify-center rounded-md border border-dashed border-[var(--color-navy)]/25 p-3 text-center">
              <span className="font-display text-sm leading-tight font-semibold tracking-tight text-neutral-600">
                {alt}
              </span>
              <span className="mt-2 text-[10px] tracking-widest text-neutral-500 uppercase">
                Cover soon
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }

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
