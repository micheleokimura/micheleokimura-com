import Link from 'next/link'
import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <Container className="my-24 sm:my-32 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-wider text-neutral-500">
        404
      </p>
      <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl">
        Page not found.
      </h1>
      <p className="mt-6 text-base text-neutral-600">
        The page you’re looking for isn’t here. Head back home or see the work.
      </p>
      <div className="mt-10 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-[var(--color-cta-hover)]"
        >
          Go home
        </Link>
        <Link
          href="/portfolio"
          className="text-sm font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)]"
        >
          See the work
        </Link>
      </div>
    </Container>
  )
}
