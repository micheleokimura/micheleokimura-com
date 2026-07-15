import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export type Step = {
  number: string
  title: string
  body: string
}

export function StepList({ steps }: { steps: Step[] }) {
  return (
    <div className="mt-24 sm:mt-32 lg:mt-40 -mx-6 bg-neutral-950 py-24 sm:py-32 sm:mx-0 sm:rounded-4xl">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
            From inquiry to a finished file, start to finish.
          </h2>
          <p className="mt-4 text-lg italic text-neutral-300">
            Simple and efficient.
          </p>
          <p className="mt-6 text-base text-neutral-300">
            You send me what you need. I design it. You review. I revise and send you the completed files.
          </p>
        </FadeIn>

        <FadeInStagger faster>
          <ol role="list" className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <FadeIn as="li" key={step.number}>
                <div>
                  <p className="font-display text-5xl font-semibold tracking-tight text-[var(--color-cta)]">
                    {step.number}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-neutral-300">
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </ol>
        </FadeInStagger>
      </Container>
    </div>
  )
}
