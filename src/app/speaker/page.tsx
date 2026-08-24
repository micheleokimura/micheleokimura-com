import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import {
  AudioWaveform,
  Compass,
  Heart,
  House,
  Palette,
  Sparkles,
  Sunrise,
} from 'lucide-react'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { BannerHero } from '@/components/BannerHero'
import { SectionIntro } from '@/components/SectionIntro'
import { ContactTrigger } from '@/components/ContactTrigger'
import { WebPageJsonLd } from '@/components/JsonLd'
import { pageMetadata } from '@/lib/schema'
import {
  SPEAKER_MESSAGES,
  type MessageAccent,
  type MessageIcon,
  type MessageTexture,
} from '@/lib/speaker-messages'

/**
 * Speaker page. Rebuilt 2026-08-23 against Michele and Brett's walkthrough.
 *
 * What changed in that pass, and why, so none of it gets quietly undone:
 *
 * BANNER. The ground is violet now, not the sitewide navy-and-teal. It is
 * sampled from the stage photograph directly below it (see PHOTO-DERIVED
 * SECTION WASHES in tailwind.css, which carries the sampled numbers and the
 * measured contrast). This is the first application of a new sitewide
 * convention: a section that carries a hero photograph takes its ground FROM
 * that photograph. The banner also opts out of `text-wrap: balance`. Michele
 * read the headline as centred; it measured flush with the wordmark at every
 * width, and what actually read as centred was balance evening the two lines
 * out and removing the ragged right edge. See the note on `balanceTitle` in
 * BannerHero.
 *
 * LEAD. The paragraph comes before the photograph on narrow viewports. It
 * used to be `order-first lg:order-last` on the picture, so a phone got the
 * photo first and most readers never reached the copy.
 *
 * MESSAGES. What was a seven-deep vertical stack of full descriptions and
 * endorsements is a 3-up grid of cards. Each card is an icon, a title, a
 * teaser, and a link to /speaker/messages/<slug>, which is where the full
 * description and that message's endorsements now live. Michele: shorter,
 * easier to scan. The Gerald Teramae endorsement moved to the Dreaming Big
 * With God page, and the "also available in a non-faith framing" line moved
 * to the pages of the two messages it applies to.
 *
 * THE CARDS ARE THE PAGE'S COLOUR, which is the point of them. Brett, on the
 * site reading flat: "it lacks colour and vibrancy." Each card takes a
 * different Michele hue and a different hairline texture, following the
 * "Most-Used Services" grid on livingin-platform.vercel.app. The colour, the
 * texture and the icon are fields on the message in
 * src/lib/speaker-messages.ts; the surfaces and every measured contrast
 * figure are in the SPEAKER MESSAGE CARDS block in tailwind.css. Read that
 * block before changing a colour: the gradient runs light at the top and dark
 * at the bottom for a contrast reason, not a stylistic one.
 *
 * SECTION BANDS. Every section is full-bleed and sits on its own ground, same
 * convention the home page established. Neighbours never share a band.
 *
 * CLOSING CTA. The dark navy "Book Michele" panel is gone, along with the
 * michele@micheleokimura.com link inside it. Michele: no dark blue text boxes
 * anywhere except the footer, and no email address on any client-facing page.
 * It is a plain band with one Contact button on the sitewide popup. Do not
 * put an address back on this page.
 *
 * Copy of record: site/content/speaker/speaker-page-copy.md, locked with
 * Michele 2026-08-22. The messages themselves live in
 * src/lib/speaker-messages.ts and are shared with the message pages.
 */

export const metadata: Metadata = pageMetadata({
  title: 'Speaker',
  description:
    'Michele Okimura speaks at churches, conferences, and schools, and to small groups, leadership teams, and community organizations, on brave purpose, dreaming big, creativity, identity, and healing.',
  path: '/speaker',
  ogDescription:
    'Some messages do more than inspire. They give people permission to be brave.',
})

/**
 * Hero photo: Michele mid-message on stage, Day 2 pt 2 at 34:45, her own
 * pick. The violet in this frame is where the banner and the wash under it
 * get their colour, so swapping this photo means re-sampling those tokens.
 */
const HERO_PHOTO = '/images/michele/speaker-hero-day2.jpg'

/**
 * Grids escape Container's inner max-w-2xl cap on purpose. Container narrows
 * its contents to 42rem below `lg`, which would leave the message tiles as
 * narrow strips on a tablet. Same constant, same reason, as the home page.
 */
const WIDE = 'mx-auto max-w-7xl px-6 lg:px-8'

/**
 * Standard band padding: 56px on a phone, 96px on a desktop. Michele asked
 * for 60 to 80 on desktop and 40 to 60 on mobile; the sm and lg steps match
 * the home page's rhythm so the two pages scroll at the same pace.
 */
const BAND = 'w-full py-14 sm:py-24 lg:py-28'

/**
 * Seven messages into a three-column grid leaves one on its own in the last
 * row. Centring it reads as deliberate; flush left reads as a missing tile.
 * If Michele ever settles on six, this evaluates false and does nothing.
 */
const ORPHAN_IN_LAST_ROW = SPEAKER_MESSAGES.length % 3 === 1

/**
 * Message name to lucide component. Every name here is verified against the
 * installed lucide-react: it exports `House` (`Home` is only an alias) and it
 * has no `Waves`, so the voice card uses `AudioWaveform`.
 *
 * These are abstract rather than literal on purpose. The icon is a way to tell
 * one card from another at a glance, not an illustration of the talk.
 */
// Typed off one of the icons rather than off lucide's own `LucideIcon`.
// lucide-react 1.24 declares that type but does not export it, so importing
// it fails the build; `typeof Compass` is the same shape and always correct.
const ICONS: Record<MessageIcon, typeof Compass> = {
  compass: Compass,
  sparkles: Sparkles,
  palette: Palette,
  house: House,
  heart: Heart,
  sunrise: Sunrise,
  waveform: AudioWaveform,
}

const ACCENT_CLASS: Record<MessageAccent, string> = {
  teal: 'msg-teal',
  coral: 'msg-coral',
  gold: 'msg-gold',
  navy: 'msg-navy',
  violet: 'msg-violet',
}

const TEXTURE_CLASS: Record<MessageTexture, string> = {
  lines: 'msg-tex-lines',
  rings: 'msg-tex-rings',
  grid: 'msg-tex-grid',
  dots: 'msg-tex-dots',
}

type Engagement = {
  event: string
  where: string
  /** Format note, e.g. a workshop rather than a keynote. */
  format?: string
}

const ENGAGEMENTS: Engagement[] = [
  { event: 'Arise Native American Leaders Camp', where: 'Montana, August 2026' },
  // "Hawaii Baptist Academy" is the school's own spelling of its own name and
  // keeps its straight i. Every place name below takes the ʻokina.
  { event: 'Hawaii Baptist Academy', where: 'Hawaiʻi, January 2026' },
  { event: 'Women of Influence National Conference', where: 'Florida, September 2025' },
  {
    event: 'National Conference on School Leadership (NASSP)',
    where: 'Washington, July 2025',
    format: 'Workshop',
  },
  { event: 'Hawaiʻi State Dream Expo', where: 'Hawaiʻi, May 2025' },
  {
    event: 'Missionary Church Denomination, Hawaiʻi Regional Conference',
    where: 'March 2025',
  },
  { event: 'Hanalani Schools', where: 'Hawaiʻi, January 2025' },
  { event: 'Kamehameha Schools', where: 'Hawaiʻi, January 2025' },
  {
    event: 'Catholic Schools Educators Annual Conference',
    where: 'Hawaiʻi, February 2024',
    format: 'Keynote and workshop',
  },
  {
    event: 'Foursquare Denomination, Hawaiʻi District Leader’s Conference',
    where: 'October 2023',
  },
  { event: 'Missio Nexus Mission Leaders Conference', where: 'Florida, September 2023' },
  { event: 'Transform Our World Global Conference', where: 'October 2022' },
]

export default function SpeakerPage() {
  return (
    <>
      <WebPageJsonLd
        path="/speaker"
        name="Michele Okimura, speaker"
        description="Keynotes and workshops on brave purpose, dreaming big, creativity, identity, and healing, for churches, conferences, and schools."
      />

      <BannerHero
        eyebrow="Speaking"
        title="Some messages do more than inspire."
        subtitle="They give people permission to be brave."
        surface="violet"
        balanceTitle={false}
      />

      {/* ------------------------------------------------ lead + hero photo */}
      {/* The band that carries the photograph, so it takes the photograph's
          colour: a wash of its violet at the top easing back to the site
          ground before the next section. */}
      <section className={`surface-violet-wash ${BAND}`}>
        <Container>
          <FadeIn>
            {/* DOM order is paragraph then photo, and there is no `order`
                utility on either. That is the fix: a phone reads the copy
                first, and at lg the two-column track puts the photo on the
                right without reordering anything. */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(0,28rem)] lg:gap-16">
              <p className="max-w-3xl text-xl leading-9 text-neutral-600">
                Michele Okimura speaks at churches, conferences, and schools,
                and to small groups, leadership teams, and community
                organizations. Whether you are gathering a crowd or an intimate
                team, she brings messages that build brave purpose in homes,
                workplaces, ministries, and teams, and help people find the
                courage to dream big and make a difference.
              </p>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-neutral-100">
                <Image
                  src={HERO_PHOTO}
                  alt="Michele Okimura speaking on stage"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* -------------------------------------------------------- messages */}
      <section
        aria-label="Messages Michele speaks on"
        className={`bg-[var(--color-band-2)] ${BAND}`}
      >
        <SectionIntro eyebrow="Topics" title="Messages I’m passionate about.">
          {/* First person, per Michele. This used to open "As a pastor,
              teacher, and public speaker, she can also tailor...".
              `text-pretty` plus the bound "or need" keeps the last word off a
              line of its own, which she flagged. */}
          <p className="text-pretty">
            As a public speaker, I can also tailor a talk to your group&rsquo;s
            specific theme or&nbsp;need.
          </p>
        </SectionIntro>

        <div className={`${WIDE} mt-12 sm:mt-16`}>
          <FadeInStagger faster>
            <ul
              role="list"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
            >
              {SPEAKER_MESSAGES.map((message, index) => {
                const isOrphan =
                  ORPHAN_IN_LAST_ROW && index === SPEAKER_MESSAGES.length - 1
                const Icon = ICONS[message.icon]

                return (
                  <FadeIn
                    as="li"
                    key={message.slug}
                    className={isOrphan ? 'lg:col-start-2' : undefined}
                  >
                    {/* The whole card is the link, so the target is the card
                        and not a two-word phrase at the bottom of it. The
                        "Learn more" control below is decorative for that
                        reason: it is inside the anchor, never a second one. */}
                    <Link
                      href={`/speaker/messages/${message.slug}`}
                      className={`msg-card ${ACCENT_CLASS[message.accent]} ${
                        TEXTURE_CLASS[message.texture]
                      } group flex h-full flex-col items-center gap-4 rounded-3xl px-6 py-9 text-center text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--color-navy-20)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] sm:px-7 sm:py-10`}
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-inset ring-white/25 transition duration-300 group-hover:bg-white/25"
                      >
                        <Icon className="h-7 w-7" strokeWidth={1.5} />
                      </span>

                      {/* The secondary line lives INSIDE the h3 rather than
                          beside it, the same way the banner keeps its eyebrow
                          inside the h1: it is part of the message's name, so
                          it belongs to the heading. Smaller, regular weight
                          and 85% white, which is the card's own supporting
                          type. Measured at 6.11:1 on the worst accent and
                          10.30:1 on this card's violet. */}
                      <h3 className="font-display text-xl font-semibold tracking-tight text-balance">
                        {message.cardTitle ?? message.title}
                        {message.subtitle && (
                          <span className="mt-1.5 block text-sm font-normal tracking-normal text-white/85">
                            {message.subtitle}
                          </span>
                        )}
                      </h3>

                      <p className="text-sm leading-6 text-white">
                        {message.teaser}
                      </p>

                      {/* Pushed to the bottom so every card's control sits on
                          the same baseline whatever the teaser's length, and
                          on the darkest part of the gradient.

                          `rounded-md`, NOT the reference's pill. Michele held
                          the sitewide no-pills rule over the reference on
                          2026-08-24: it is a permanent rule and it wins. md is
                          also the radius every other button on the site uses,
                          so this control now matches the header CTA and
                          ContactTrigger rather than being its own shape. The
                          circle above it stays round, which the rule allows
                          for an icon holder. Do not put the pill back. */}
                      <span className="mt-auto pt-3">
                        <span className="font-display inline-flex items-center gap-1.5 rounded-md bg-white/15 px-5 py-2 text-xs font-semibold tracking-[0.14em] uppercase ring-1 ring-inset ring-white/30 transition duration-300 group-hover:bg-white/25">
                          Learn more
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          >
                            &rarr;
                          </span>
                        </span>
                      </span>
                    </Link>
                  </FadeIn>
                )
              })}
            </ul>
          </FadeInStagger>
        </div>
      </section>

      {/* ----------------------------------------------------- past events */}
      <section
        aria-label="Where Michele has spoken"
        className={`bg-[var(--color-band-3)] ${BAND}`}
      >
        {/* Was "Recent stages.", which Michele found context-free. The eyebrow
            came down from "Where I have spoken" to a single word so it does
            not simply restate the heading underneath it. */}
        <SectionIntro
          eyebrow="Stages"
          title="Here are some past events I’ve spoken at."
          smaller
        />

        <Container className="mt-10 sm:mt-12">
          <FadeIn>
            <ul
              role="list"
              className="divide-y divide-neutral-200 border-t border-neutral-200"
            >
              {ENGAGEMENTS.map((item) => (
                <li
                  key={`${item.event}-${item.where}`}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <span className="font-display text-base font-semibold text-neutral-950">
                    {item.event}
                  </span>
                  <span className="shrink-0 text-sm text-neutral-500 sm:text-right">
                    {item.where}
                    {item.format && (
                      <span className="mt-1 block text-xs tracking-wider text-neutral-400 uppercase">
                        {item.format}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-500 italic">
              Michele has also spoken at churches across Hawaiʻi, the mainland
              U.S., Canada, Japan, the Philippines, and Singapore in her decades
              of ministry.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* -------------------------------------------------------- press kit */}
      <section
        aria-labelledby="press-kit-heading"
        className={`bg-[var(--color-band-1)] ${BAND}`}
      >
        <Container>
          <FadeIn>
            <div className="rounded-3xl bg-[var(--color-cream)] p-8 ring-1 ring-inset ring-[var(--color-navy-10)] sm:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <h2
                    id="press-kit-heading"
                    className="font-display text-2xl font-semibold tracking-tight text-neutral-950"
                  >
                    Press kit
                  </h2>
                  <p className="mt-4 text-base leading-7 text-neutral-600">
                    For event organizers and media: download Michele&rsquo;s
                    press kit for bio in three lengths, high-resolution
                    headshots, full topic descriptions, past speaking
                    engagements, full endorsements, and booking details.
                  </p>
                </div>

                {/* The PDF is still being assembled. Rendered as a disabled
                    panel rather than a link so the page never points at a 404. */}
                <div className="shrink-0">
                  <div
                    aria-disabled="true"
                    className="inline-flex flex-col items-start gap-1 rounded-md border border-dashed border-neutral-300 bg-[var(--color-band-1)] px-6 py-3"
                  >
                    <span className="text-sm font-semibold text-neutral-500">
                      Download the Press Kit (PDF)
                    </span>
                    <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* -------------------------------------------------------- book me */}
      {/* Plain band, no panel, one button. See the CLOSING CTA note at the
          top of this file before adding a container or an address here. */}
      <section className={`bg-[var(--color-band-2)] ${BAND}`}>
        <Container>
          <FadeIn>
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                Book Michele.
              </h2>
              <p className="mt-4 text-lg leading-8 text-neutral-600">
                Ready to bring Michele to your church, school, conference, or
                team? Tell her about your event and she will reach out
                personally.
              </p>
              <div className="mt-8">
                <ContactTrigger interest="speaking">Contact</ContactTrigger>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
