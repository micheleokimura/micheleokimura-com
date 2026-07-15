'use client'

import Image from 'next/image'
import { cn } from '@/lib/cn'

const BG_TILES: string[] = [
  '/mosaic/kingdom-kids.webp',
  '/mosaic/hero-1.webp',
  '/mosaic/birth-of-explicit-movement.webp',
  '/mosaic/canva-1.jpg',
  '/mosaic/dancing-with-father.webp',
  '/mosaic/michele-okimura.jpg',
  '/mosaic/dream-big-journals.webp',
  '/mosaic/hero-2.webp',
  '/mosaic/rethink-creativity-256.png',
  '/mosaic/michele-okimura-2.jpg',
  '/mosaic/explicit-movement-256.png',
  '/mosaic/canva-2.jpg',
  '/mosaic/brave-series.png',
  '/mosaic/kingdom-kids.webp',
  '/mosaic/michele-hero-canva.jpg',
  '/mosaic/release-and-generations-256.png',
  '/mosaic/birth-of-explicit-movement.webp',
  '/mosaic/hero-1.webp',
  '/mosaic/dancing-with-father.webp',
  '/mosaic/michele-okimura-sm.jpg',
  '/mosaic/dream-big-journals.webp',
  '/mosaic/canva-1.jpg',
  '/mosaic/rethink-creativity-256.png',
  '/mosaic/hero-2.webp',
  '/mosaic/kingdom-kids.webp',
  '/mosaic/explicit-movement-256.png',
  '/mosaic/michele-okimura.jpg',
  '/mosaic/brave-series.png',
  '/mosaic/birth-of-explicit-movement.webp',
  '/mosaic/canva-2.jpg',
  '/mosaic/dancing-with-father.webp',
  '/mosaic/michele-hero-canva.jpg',
  '/mosaic/dream-big-journals.webp',
  '/mosaic/hero-1.webp',
  '/mosaic/release-and-generations-256.png',
  '/mosaic/michele-okimura-2.jpg',
  '/mosaic/kingdom-kids.webp',
  '/mosaic/canva-1.jpg',
  '/mosaic/birth-of-explicit-movement.webp',
  '/mosaic/hero-2.webp',
  '/mosaic/dancing-with-father.webp',
  '/mosaic/rethink-creativity-256.png',
  '/mosaic/michele-okimura-sm.jpg',
  '/mosaic/dream-big-journals.webp',
  '/mosaic/explicit-movement-256.png',
  '/mosaic/brave-series.png',
  '/mosaic/canva-2.jpg',
  '/mosaic/kingdom-kids.webp',
  '/mosaic/michele-hero-canva.jpg',
  '/mosaic/hero-1.webp',
]

function hoverIntensity(col: number): { saturation: number; brightness: number } {
  if (col <= 3) return { saturation: 0.35, brightness: 0.95 }
  if (col <= 5) return { saturation: 0.55, brightness: 1.0 }
  if (col <= 7) return { saturation: 0.75, brightness: 1.05 }
  return { saturation: 1.0, brightness: 1.1 }
}

export function HeroMosaicBackground() {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="grid h-full w-full auto-rows-fr grid-cols-6 gap-1.5 sm:grid-cols-8 lg:grid-cols-10">
        {BG_TILES.map((src, i) => {
          const col = i % 10
          const inTextColumns = col <= 3
          const { saturation, brightness } = hoverIntensity(col)
          return (
            <div
              key={`${src}-${i}`}
              data-col={col}
              tabIndex={-1}
              className={cn(
                'relative overflow-hidden rounded-sm',
                inTextColumns
                  ? 'pointer-events-none'
                  : 'group pointer-events-auto cursor-pointer transition duration-[480ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
              )}
              style={
                inTextColumns
                  ? undefined
                  : ({
                      '--hover-saturation': saturation,
                      '--hover-brightness': brightness,
                    } as React.CSSProperties)
              }
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 10vw, (min-width: 640px) 12vw, 16vw"
                className="mosaic-tile-img object-cover"
                priority={i < 10}
              />
            </div>
          )
        })}
      </div>

      {/* Mobile: heavy white wash so text stays readable over the full-width mosaic.
         Desktop: left-to-right fade reveals tiles on the right half. */}
      <div
        className="pointer-events-none absolute inset-0 sm:hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.95) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden sm:block"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 35%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        }}
      />
    </div>
  )
}
