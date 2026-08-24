import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Day 2 pt 2 frame candidates',
  description: 'Internal review page. Stage stills pulled from Day 2 pt 2.',
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
    description: 'At podium, warm smile (current top pick)',
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

const newStageFrames: Frame[] = [
  {
    time: '0:34:15',
    file: 'frame-0-34-15.png',
    description: 'Podium, open palm, mid-sentence',
  },
  {
    time: '0:34:25',
    file: 'frame-0-34-25.png',
    description: 'Podium, hand raised high',
  },
  {
    time: '0:34:35',
    file: 'frame-0-34-35.png',
    description: 'Podium, finger raised, making a point',
  },
  {
    time: '0:34:45',
    file: 'frame-0-34-45.png',
    description: 'Podium, centered and settled, easy smile',
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
          Day 2 pt 2: stage frame candidates
        </h1>
        <p className="mt-6 text-base leading-7 text-neutral-600">
          Ten stills of Michele speaking on stage at the Day 2 conference.
          Scroll, compare, and pick the ones worth keeping. Nothing here is
          wired into the Speaker page yet.
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
          More from the 34-minute segment
        </h2>
        <div className="mt-6 rounded-lg border-l-4 border-neutral-300 bg-neutral-50 px-5 py-4">
          <p className="text-base leading-7 text-neutral-700">
            Four extra frames from the same podium segment as 0:34:30. That
            segment runs from about 0:34:15 to 0:35:00, and it is the last stage
            footage in the file: everything after 0:35:05 is the Explicit
            Movement title card and then the Zoom webinar, all the way to the
            end at 2:32:34. So these ten are the complete set of pure-stage
            candidates this recording has.
          </p>
        </div>
        <div className="mt-10">
          {newStageFrames.map((frame) => (
            <FrameCard key={frame.file} frame={frame} />
          ))}
        </div>
      </section>
    </div>
  )
}
