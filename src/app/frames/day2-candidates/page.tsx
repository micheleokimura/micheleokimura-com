import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Day 2 pt 2 frame candidates',
  description: 'Internal review page. Eight candidate stills pulled from Day 2 pt 2.',
  robots: { index: false, follow: false },
}

type Frame = {
  time: string
  file: string
  description: string
}

const stageFrames: Frame[] = [
  {
    time: '0:00:12',
    file: 'frame-0-00-12.png',
    description: 'Standing, mic up, engaged',
  },
  {
    time: '0:00:20',
    file: 'frame-0-00-20.png',
    description: 'Standing, open hand gesture',
  },
  {
    time: '0:00:08',
    file: 'frame-0-00-08.png',
    description: 'At podium, mic raised',
  },
  {
    time: '0:00:45',
    file: 'frame-0-00-45.png',
    description: 'At podium, warm smile (currently the top pick for hero)',
  },
  {
    time: '0:00:50',
    file: 'frame-0-00-50.png',
    description: 'At podium, dynamic gesture',
  },
  {
    time: '0:34:30',
    file: 'frame-0-34-30.png',
    description: 'Podium, later segment, teaching gesture',
  },
]

const interviewFrames: Frame[] = [
  {
    time: '0:12:10',
    file: 'frame-0-12-10.png',
    description: 'Michele speaking, hand open mid-gesture',
  },
  {
    time: '0:12:20',
    file: 'frame-0-12-20.png',
    description: 'Similar gesture, slightly different expression',
  },
]

function FrameCard({ frame }: { frame: Frame }) {
  return (
    <figure className="mt-12 first:mt-0">
      <Image
        src={`/design-references/day2-candidates/${frame.file}`}
        alt={`${frame.time} - ${frame.description}`}
        width={1280}
        height={720}
        sizes="(min-width: 800px) 760px, 100vw"
        className="w-full rounded-lg bg-neutral-100 ring-1 ring-inset ring-neutral-900/10"
      />
      <figcaption className="mt-4">
        <span className="font-mono text-sm tabular-nums text-neutral-950">
          {frame.time}
        </span>
        <span className="ml-3 text-base text-neutral-600">
          {frame.description}
        </span>
      </figcaption>
    </figure>
  )
}

export default function Day2CandidatesPage() {
  return (
    <div className="mx-auto max-w-[800px] px-6 py-16 sm:py-24">
      <header>
        <p className="font-mono text-sm uppercase tracking-wider text-neutral-500">
          Internal review
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-neutral-950">
          Day 2 pt 2: frame candidates
        </h1>
        <p className="mt-6 text-base leading-7 text-neutral-600">
          Eight stills pulled from Day 2 pt 2. Scroll, compare, and pick the ones
          worth keeping. Nothing here is wired into the Speaker page yet.
        </p>
      </header>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
          Stage shots
        </h2>
        <p className="mt-3 text-base leading-7 text-neutral-600">
          Podium and standing, from the earlier extraction.
        </p>
        <div className="mt-10">
          {stageFrames.map((frame) => (
            <FrameCard key={frame.file} frame={frame} />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
          Interview shots
        </h2>
        <div className="mt-6 rounded-lg border-l-4 border-neutral-300 bg-neutral-50 px-5 py-4">
          <p className="text-base leading-7 text-neutral-700">
            Heads up: these last two are seated interview footage with a
            bookshelf backdrop, from the 12-minute window Michele asked about.
            They read as a different visual register from the stage shots above,
            so they probably work as a pair or as a section of their own rather
            than mixed in with the podium frames.
          </p>
        </div>
        <div className="mt-10">
          {interviewFrames.map((frame) => (
            <FrameCard key={frame.file} frame={frame} />
          ))}
        </div>
      </section>
    </div>
  )
}
