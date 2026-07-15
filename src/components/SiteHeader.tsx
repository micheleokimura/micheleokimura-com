'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { MarkerSwipe } from '@/components/MarkerSwipe'
import { JoinWaitListButton } from '@/components/wait-list/JoinWaitListButton'
import { navItems, siteConfig } from '@/lib/site-config'

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="absolute top-0 right-0 left-0 z-40 pt-6 sm:pt-10">
      <Container>
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${siteConfig.brand} home`}
            className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
          >
            <Logo />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-2"
          >
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group relative isolate inline-flex items-center px-4 py-2 text-sm font-medium transition',
                    active
                      ? 'text-neutral-950'
                      : 'text-neutral-700 hover:text-neutral-950',
                  )}
                  aria-current={active ? 'page' : undefined}
                  // Drop focus after a MOUSE click so the keyboard focus ring
                  // never lingers as a box around the active item once the page
                  // navigates. e.detail is 0 for keyboard (Enter) activation, so
                  // keyboard users keep their focus-visible ring for a11y.
                  onClick={(e) => {
                    if (e.detail !== 0) e.currentTarget.blur()
                  }}
                >
                  <MarkerSwipe
                    className={cn(
                      active
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 transition-[transform,opacity] duration-[280ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100 group-hover:opacity-70',
                    )}
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <JoinWaitListButton
              source="header"
              withArrow={false}
              className="hidden sm:inline-flex"
            />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav-panel"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="lg:hidden -m-2.5 rounded-md p-2.5 text-neutral-950 transition hover:bg-neutral-950/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
            >
              {open ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </Container>

      <div
        id="mobile-nav-panel"
        hidden={!open}
        className="lg:hidden mt-6 border-t border-neutral-200 bg-white"
      >
        <Container className="py-6">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group relative isolate inline-flex items-center px-4 py-3 text-base font-medium transition',
                      active
                        ? 'text-neutral-950'
                        : 'text-neutral-700 hover:text-neutral-950',
                    )}
                    aria-current={active ? 'page' : undefined}
                    onClick={(e) => {
                      if (e.detail !== 0) e.currentTarget.blur()
                    }}
                  >
                    <MarkerSwipe
                      className={cn(
                        active
                          ? 'opacity-100'
                          : 'opacity-0 transition-opacity duration-200 group-hover:opacity-60',
                      )}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </li>
              )
            })}
            <li className="mt-3">
              <JoinWaitListButton
                source="header"
                withArrow={false}
                className="w-full"
              />
            </li>
          </ul>
        </Container>
      </div>
    </header>
  )
}
