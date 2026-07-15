import { cn } from '@/lib/cn'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { HeroMosaicBackground } from '@/components/HeroMosaic'

const HERO_TEXT_SHADOW = '[text-shadow:0_0_6px_rgba(255,255,255,0.8)]'

export function PageIntro({
  eyebrow,
  title,
  children,
  centered = false,
}: {
  eyebrow?: string
  title: string
  children?: React.ReactNode
  centered?: boolean
}) {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="hidden md:block">
        <HeroMosaicBackground />
      </div>

      <Container
        className={cn(
          'pointer-events-none mt-8 pb-12 sm:mt-12 sm:pb-20 lg:mt-16 lg:pb-28',
          centered && 'text-center',
        )}
      >
        <FadeIn className="relative z-10">
          <h1>
            {eyebrow && (
              <>
                <span
                  className={cn(
                    'block font-display text-base font-semibold tracking-wider uppercase text-neutral-950',
                    HERO_TEXT_SHADOW,
                  )}
                >
                  {eyebrow}
                </span>
                <span className="sr-only"> - </span>
              </>
            )}
            <span
              className={cn(
                'mt-6 block max-w-5xl font-display text-[2.75rem] leading-[1.05] font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl lg:text-[4rem] lg:leading-[1.1]',
                HERO_TEXT_SHADOW,
                centered && 'mx-auto',
              )}
            >
              {title}
            </span>
          </h1>
          {children && (
            <div
              className={cn(
                'pointer-events-auto mt-6 max-w-3xl text-xl text-neutral-600',
                HERO_TEXT_SHADOW,
                centered && 'mx-auto',
              )}
            >
              {children}
            </div>
          )}
        </FadeIn>
      </Container>
    </div>
  )
}
