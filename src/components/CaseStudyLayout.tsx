import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactBlock } from '@/components/ContactBlock'
import { GOLDEN_THREAD_CULMINATION, GOLDEN_THREAD_QUOTE } from '@/lib/projects'

// Shared furniture for the project case studies at /projects/<slug>. Every page
// in that tree is assembled from these pieces so the pages read as one set: the
// same hero, the same golden-thread callout, the same quote and endorsement
// treatments. Book case studies should use these too rather than re-styling.
//
// The teal literal (#ff4500) mirrors --color-brand-orange. An opacity modifier on
// a var() color is not reliable across Tailwind versions, so tinted surfaces use
// the literal while solid fills use the token.

/* ----------------------------------------------------------------- shell */

export function CaseStudyLayout({
  eyebrow,
  title,
  lede,
  children,
  contactHeading = 'Bring this to your people.',
  contactBody,
  contactSource,
}: {
  eyebrow: string
  title: string
  lede: React.ReactNode
  children: React.ReactNode
  contactHeading?: string
  contactBody?: React.ReactNode
  contactSource?: string
}) {
  return (
    <>
      <PageIntro eyebrow={eyebrow} title={title}>
        {lede}
      </PageIntro>

      {children}

      <BravePurposeClose />

      <Container className="mt-16 sm:mt-20">
        <FadeIn>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-display text-base font-semibold text-neutral-950 transition hover:text-[var(--color-brand-orange-ink)]"
          >
            <span aria-hidden="true">&larr;</span>
            All projects
          </Link>
        </FadeIn>
      </Container>

      <ContactBlock heading={contactHeading} source={contactSource}>
        {contactBody ?? (
          <p>
            Tell Michele about your school, church, or organization and what you
            are hoping to build. She will reach out personally.
          </p>
        )}
      </ContactBlock>
    </>
  )
}

/* --------------------------------------------------- brave purpose close */

/**
 * The closing frame every case study ends on. The golden thread does not only
 * run through the work, it arrives somewhere, and the destination is the same
 * on every page: the reader embracing and living out their brave purpose.
 *
 * Rendered by CaseStudyLayout, so each case study gets it without opting in.
 * Kept deliberately light. It sits between a tinted callout and the dark
 * ContactBlock, and three heavy panels in a row would read as a wall.
 */
function BravePurposeClose() {
  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn>
        <div className="mx-auto max-w-3xl border-t border-neutral-200 pt-12 text-center">
          <h2 className="font-display text-xs font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase">
            Where the thread leads
          </h2>
          <figure className="mt-6">
            <blockquote className="font-display text-2xl leading-tight font-medium text-balance text-neutral-950 italic sm:text-3xl sm:leading-tight">
              &ldquo;{GOLDEN_THREAD_CULMINATION}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm font-medium text-neutral-500 not-italic">
              Michele Okimura
            </figcaption>
          </figure>
          <p className="mt-8 text-base leading-7 text-neutral-600">
            If you are ready to walk this out yourself, Michele coaches authors
            through the{' '}
            <Link
              href="/coaching"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-orange)] decoration-2 underline-offset-4 transition hover:text-[var(--color-brand-orange-ink)]"
            >
              Brave Purpose Author Method
            </Link>
            .
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}

/* --------------------------------------------------------------- sections */

/** Section wrapper with the small uppercase teal heading used across the site. */
export function CaseStudySection({
  heading,
  id,
  children,
  className = 'mt-20 sm:mt-28',
}: {
  heading?: string
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section aria-labelledby={id}>
      <Container className={className}>
        {heading ? (
          <FadeIn>
            <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase">
              <span id={id}>{heading}</span>
            </h2>
          </FadeIn>
        ) : null}
        {children}
      </Container>
    </section>
  )
}

/** Body copy at a comfortable reading measure. */
export function Prose({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <FadeIn
      className={`mt-8 max-w-3xl space-y-5 text-lg leading-8 text-neutral-700 ${className}`}
    >
      {children}
    </FadeIn>
  )
}

/** Attribution line for a first-person passage. */
export function VoiceNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-3xl text-sm tracking-wide text-neutral-500 italic">
      {children}
    </p>
  )
}

/* ------------------------------------------------------------ golden thread */

/**
 * The site-wide golden-thread callout. `children` is the one project-specific
 * sentence that says how the thread shows up in this particular piece of work.
 */
export function GoldenThread({ children }: { children: React.ReactNode }) {
  return (
    <Container className="mt-20 sm:mt-28">
      <FadeIn>
        <div className="rounded-3xl bg-[var(--color-sapphire-05)] p-8 ring-1 ring-[var(--color-sapphire-20)] sm:p-10">
          <h2 className="font-display text-xs font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase">
            The golden thread
          </h2>
          <figure className="mt-5">
            <blockquote className="max-w-3xl font-display text-xl leading-9 text-neutral-800 italic sm:text-2xl sm:leading-10">
              &ldquo;{GOLDEN_THREAD_QUOTE}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm font-medium text-neutral-500 not-italic">
              Michele Okimura
            </figcaption>
          </figure>
          <p className="mt-6 max-w-3xl border-t border-[#ff4500]/[0.25] pt-6 text-base leading-7 text-neutral-800">
            {children}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}

/* ------------------------------------------------------------------ quotes */

/**
 * Full-bleed display quote. `attribution` renders as its own line so the quote
 * never needs a dash to introduce the speaker.
 */
export function PullQuote({
  children,
  attribution,
  className = 'mt-20 sm:mt-28',
}: {
  children: React.ReactNode
  attribution?: string
  className?: string
}) {
  return (
    <Container className={className}>
      <FadeIn>
        <figure className="mx-auto max-w-4xl text-center">
          <blockquote className="font-display text-3xl leading-tight font-medium text-balance text-neutral-950 italic sm:text-4xl sm:leading-tight">
            &ldquo;{children}&rdquo;
          </blockquote>
          {attribution ? (
            <figcaption className="mt-6 text-sm font-semibold tracking-widest text-neutral-500 uppercase not-italic">
              {attribution}
            </figcaption>
          ) : null}
        </figure>
      </FadeIn>
    </Container>
  )
}

/** Short quote set inline in a column, marked with the teal rule. */
export type Endorsement = { quote: string; source: string }

export function Endorsements({
  items,
  label = 'What people say',
}: {
  items: Endorsement[]
  label?: string
}) {
  return (
    <FadeIn className="mt-12 max-w-3xl">
      <h3 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
        {label}
      </h3>
      <div className="mt-6 space-y-8">
        {items.map((item, i) => (
          <figure
            key={`${item.source}-${i}`}
            className="border-l-2 border-[var(--color-brand-orange)] pl-5"
          >
            <blockquote className="text-base leading-7 text-neutral-700 italic">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-sm font-medium text-neutral-500 not-italic">
              {item.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </FadeIn>
  )
}

/* ------------------------------------------------------------------ blocks */

/** Tinted list used for awards, approvals, and adoptions. */
export function Recognition({
  items,
  label = 'Recognition',
}: {
  items: readonly string[]
  label?: string
}) {
  return (
    <FadeIn className="mt-10 max-w-3xl">
      <div className="rounded-3xl bg-[var(--color-sapphire-05)] p-6 ring-1 ring-[var(--color-sapphire-20)] sm:p-8">
        <h3 className="font-display text-xs font-semibold tracking-widest text-[var(--color-brand-orange-ink)] uppercase">
          {label}
        </h3>
        <ul role="list" className="mt-5 space-y-4">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-sapphire)]"
              />
              <span className="text-base leading-7 text-neutral-800">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  )
}

/** Neutral bulleted list on a plain rule, for reach and adoption detail. */
export function FactList({
  items,
  label,
}: {
  items: readonly string[]
  label: string
}) {
  return (
    <FadeIn className="mt-10 max-w-3xl">
      <h3 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
        {label}
      </h3>
      <ul
        role="list"
        className="mt-5 space-y-4 border-t border-neutral-200 pt-5"
      >
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-sapphire)]"
            />
            <span className="text-base leading-7 text-neutral-700">{item}</span>
          </li>
        ))}
      </ul>
    </FadeIn>
  )
}

/** Structure summary: a small grid of figure-and-label pairs. */
export function StatGrid({
  items,
}: {
  items: readonly { value: string; label: string }[]
}) {
  return (
    <FadeInStagger faster className="mt-10">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((item) => (
          <FadeIn as="li" key={item.label} scaleIn>
            <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6">
              <p className="font-display text-3xl font-medium tracking-tight text-neutral-950">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {item.label}
              </p>
            </div>
          </FadeIn>
        ))}
      </ul>
    </FadeInStagger>
  )
}

/** External storefront row. */
export function BuyLinks({
  label = 'Where to get it',
  links,
}: {
  label?: string
  links: readonly { text: string; href?: string }[]
}) {
  return (
    <FadeIn className="mt-10 max-w-3xl">
      <p className="text-sm leading-7 text-neutral-600">
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
                className="font-medium text-neutral-950 underline decoration-[var(--color-brand-orange)] decoration-1 underline-offset-4 transition hover:decoration-2"
              >
                {link.text}
              </a>
            ) : (
              <span className="font-medium text-neutral-950">{link.text}</span>
            )}
          </span>
        ))}
      </p>
    </FadeIn>
  )
}

/* ------------------------------------------------------------------ covers */

/**
 * Cover tile holding a fixed 3:4 box with the art contained inside it. Ratios
 * across the supplied product shots vary, so nothing is cropped.
 */
export function CoverTile({
  src,
  alt,
  caption,
  sizes = '(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15rem',
}: {
  src: string
  alt: string
  caption?: string
  sizes?: string
}) {
  return (
    <figure>
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-900/5">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm leading-6 text-neutral-600">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export function CoverGrid({
  items,
  label,
}: {
  items: readonly { src: string; alt: string; caption?: string }[]
  label?: string
}) {
  return (
    <div className="mt-12">
      {label ? (
        <FadeIn>
          <h3 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
            {label}
          </h3>
        </FadeIn>
      ) : null}
      <FadeInStagger faster className="mt-6">
        <ul
          role="list"
          className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
        >
          {items.map((item) => (
            <FadeIn as="li" key={item.src} scaleIn>
              <CoverTile src={item.src} alt={item.alt} caption={item.caption} />
            </FadeIn>
          ))}
        </ul>
      </FadeInStagger>
    </div>
  )
}

/** Cross-links between the Brave Series hub and its three title pages. */
export function SiblingLinks({
  label,
  items,
}: {
  label: string
  items: readonly { href: string; title: string; audience: string }[]
}) {
  return (
    <FadeIn className="mt-12">
      <h3 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
        {label}
      </h3>
      <ul role="list" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition hover:shadow-lg hover:ring-1 hover:ring-neutral-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-orange)]"
            >
              <p className="font-display text-lg font-semibold tracking-tight text-neutral-950">
                {item.title}
              </p>
              <p className="mt-1 flex-1 text-sm text-neutral-600">
                {item.audience}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950">
                Read the story
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </FadeIn>
  )
}
