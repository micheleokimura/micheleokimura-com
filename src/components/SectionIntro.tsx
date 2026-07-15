import { cn } from '@/lib/cn'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

type Props = {
  title: string
  eyebrow?: string
  children?: React.ReactNode
  smaller?: boolean
  invert?: boolean
  className?: string
  /** Optional visual rendered to the right of the copy at lg+, stacked below on
   *  mobile. When present the section becomes a two-column layout. */
  aside?: React.ReactNode
}

export function SectionIntro({
  title,
  eyebrow,
  children,
  smaller = false,
  invert = false,
  className,
  aside,
}: Props) {
  const copy = (
    <FadeIn className="max-w-2xl">
      <h2>
        {eyebrow && (
          <>
            <span
              className={cn(
                'mb-6 block font-display text-sm font-semibold tracking-wider uppercase',
                invert ? 'text-white/80' : 'text-neutral-500',
              )}
            >
              {eyebrow}
            </span>
            <span className="sr-only"> - </span>
          </>
        )}
        <span
          className={cn(
            'block font-display tracking-tight text-balance',
            smaller
              ? 'text-2xl font-semibold'
              : 'text-3xl font-medium sm:text-4xl lg:text-5xl',
            invert ? 'text-white' : 'text-neutral-950',
          )}
        >
          {title}
        </span>
      </h2>
      {children && (
        <div
          className={cn(
            'mt-6 text-xl',
            invert ? 'text-neutral-300' : 'text-neutral-600',
          )}
        >
          {children}
        </div>
      )}
    </FadeIn>
  )

  return (
    <Container className={className}>
      {aside ? (
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {copy}
          <div className="w-full lg:justify-self-end">{aside}</div>
        </div>
      ) : (
        copy
      )}
    </Container>
  )
}
