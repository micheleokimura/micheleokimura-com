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
 * BANNER. The ground is `.surface-speaker-plum` on --color-speaker-plum
 * #624973, and it took three moves in one day, 2026-08-29, to get there.
 *
 * It started as `.surface-violet-banner` on --color-speaker-deep #241B4F,
 * sampled from the stage photograph directly below it. Michele's read: that
 * field was a very dark, almost-black purple, it felt heavy, and it looked
 * like a different colour from the keynote cards rather than the same page.
 * So the banner took the CARDS' own colour and texture, #3B2C74 with the
 * hairline stripes, and the "Book Michele" CTA at the foot took it too.
 *
 * Then it was warmed to #4C3A6E, because the three role heroes are meant to
 * read as siblings out of one brand and they did not: /author anchors the set
 * on marigold, so a blue-indigo here and a blue-teal on /coach made the warm
 * page look like the odd one instead of the parent. Hue 252 -> 261 at lower
 * saturation, value held.
 *
 * The third move is this one, and it finishes the second in the direction the
 * second was already going. #4C3A6E is warmer than what it replaced and still
 * reads as dusk rather than as anything earthy; Michele's brief was an aged
 * velvet book cover. So: hue 261 -> 275 and saturation 0.47 -> 0.37, which
 * puts a red undertone in the purple and takes enough saturation out that it
 * reads as dyed cloth rather than as a screen colour. Hue 275 rather than the
 * 269 first proposed, because at 269 the field still reads faintly lilac
 * beside the terracotta button sitting on it, and past about 285 it goes rosy
 * and starts reading pink.
 *
 * THE DIAGONAL STRIPES CAME OFF in the same move. What reads as a texture on
 * a card reads as a hatch pattern across a band 1440px wide, and Michele
 * asked for a clean field. There is no texture layer on this surface now and
 * nothing should add one. See the token block in tailwind.css before moving
 * the hue.
 *
 * THREE bands carry it, so the page runs one colour top to bottom: this
 * banner, the "community of dreamers" quote band in the middle, and the CTA
 * at the foot. The keynote cards keep #3B2C74, cold and darker, which Michele
 * signed off on as a step down from the band rather than a match to it.
 * /author's marigold, /coach's teal and About's sage do not move.
 *
 * The banner also opts out of `text-wrap: balance`. Michele read the headline
 * as centred; it measured flush with the wordmark at every width, and what
 * actually read as centred was balance evening the two lines out and removing
 * the ragged right edge. See the note on `balanceTitle` in BannerHero.
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
 * QUOTE BANNER. Moved here from /coach on 2026-08-24, which dropped it in the
 * same pass. It sits between the keynote grid and the stages list: a breath
 * between the two densest blocks on the page, and "here is why I speak on
 * these" landing right after what she speaks on.
 *
 * It was periwinkle, sampled from the sapphire flowers in a dress, until
 * 2026-08-29. It is the page's plum now, flat, with cream copy on it, so the
 * middle of the page belongs to the same colour as the two ends. /author
 * still carries the periwinkle version; see the note at the band itself.
 *
 * CLOSING CTA. The dark navy "Book Michele" panel is gone, along with the
 * michele@micheleokimura.com link inside it. Michele: no dark blue text boxes
 * anywhere except the footer, and no email address on any client-facing page.
 * It is a plain band with one Contact button on the sitewide popup. Do not
 * put an address back on this page.
 *
 * Since 2026-08-29 that band runs `.surface-speaker-plum`, the same ground as
 * the banner at the top. This does not reopen the rule above: what Michele
 * ruled out was a dark BLUE box, and this is the page's own purple. It is
 * still a plain band, still one button, still no panel and no address. It is
 * also still Speaker's alone: /about closes on the shared ContactBlock and
 * does not share a token with this, so recolouring here cannot reach it.
 *
 * WORKSHOPS. There is no workshops row on this page any more. It landed here
 * on 2026-08-25 carrying one card, ReThink Creativity, after coming off the
 * bottom of /author, and it left again the same day: Michele's read is that
 * the conference belongs under the keynote it grows out of, so the card now
 * closes /speaker/messages/activating-your-creativity and points at
 * /speaker/creativity/rethink-creativity-conference. See the comment at the
 * foot of the markup before rebuilding a row here.
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
 * Michele on the beach in the black dress, beside the tree. Shown
 * circle-cropped in the quote banner.
 *
 * Swapped in 2026-08-24. The floral-dress photograph that was here (and the
 * "my purpose is to help people live in the fullness" line that went with it)
 * moved to /author. This is the same file /about uses for its own hero, which
 * is deliberate reuse, not a stray reference.
 *
 * It is a PORTRAIT source, 800x1200, where the last one was landscape, so the
 * circle needs a focal point: at 25% the face sits high in the crop instead of
 * the frame filling up with sand.
 */
const MICHELE_PORTRAIT = '/images/michele/about-hero.jpg'

/**
 * Grids escape Container's inner max-w-2xl cap on purpose. Container narrows
 * its contents to 42rem below `lg`, which would leave the message tiles as
 * narrow strips on a tablet. Same constant, same reason, as the home page.
 */
const WIDE = 'mx-auto max-w-7xl gutter-x'

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

/**
 * The mosaic. Four page identity colours rotated through the seven cards in
 * document order, so the grid reads as all four of Michele's hats at once.
 * The rotation is checked against BOTH grids, three columns from lg up and
 * two columns at sm, and no two touching cards share a colour in either. If a
 * message is ever added, removed, or reordered, re-walk both grids rather
 * than trusting the rotation to stay clean on its own.
 */
const ACCENT_CLASS: Record<MessageAccent, string> = {
  plum: 'msg-plum',
  marigold: 'msg-marigold',
  bluegreen: 'msg-bluegreen',
  periwinkle: 'msg-periwinkle',
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
        surface="plum"
        balanceTitle={false}
      />

      {/* ------------------------------------------------ lead + hero photo */}
      {/* THE VIOLET WASH IS GONE FROM THIS BAND, 2026-08-29.

          It was `.surface-violet-wash`, a gradient from --color-speaker-wash
          #EFEBF7 easing down to the site ground: a pale lavender sampled from
          the stage photograph so the picture sat in colour that came out of
          it. That reasoning held while the ground was cream. It stopped
          holding the moment the site flattened to the single white #FCFAF6:
          against a near-white ground the lavender no longer reads as a tint
          of the photo, it reads as a different, cooler page, and Michele
          called it a clash on 2026-08-29.

          What replaces it is Option A, a neutral rhythm. Sections alternate
          #FCFAF6 (--color-band-1) and #F1EEE7 (--color-panel, the card ground
          piloted on /coach), so separation comes from lightness rather than
          from hue and nothing on the page has to agree with the banner. The
          full sequence is documented at the press kit band below, which is
          the one section the alternation deliberately skips.

          `.surface-violet-wash` and --color-speaker-wash both STAY DEFINED:
          /speaker/messages/[slug] still uses the class for message pages that
          carry no hero of their own, and that page was out of scope here.
          Retiring the token means changing that page too. */}
      <section className={`bg-[var(--color-band-1)] ${BAND}`}>
        <Container>
          <FadeIn>
            {/* DOM order is paragraph then photo, and there is no `order`
                utility on either. That is the fix: a phone reads the copy
                first, and at lg the two-column track puts the photo on the
                right without reordering anything. */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(0,28rem)] lg:gap-16">
              {/* First sentence is Michele's approved rewrite, 2026-08-24,
                  verbatim: conferences and workshops lead now, and the second
                  list keeps its comma before "and to" so the two groups read
                  as separate. The sentence that follows is unchanged. */}
              <p className="max-w-3xl text-xl leading-9 text-neutral-600">
                Michele Okimura speaks at conferences, workshops, churches, and
                schools, and to small groups, leadership teams, and community
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
      {/* Beat 2 of the alternation: panel. The seven keynote cards are dark
          saturated gradients (.msg-plum, .msg-marigold, .msg-bluegreen and
          .msg-periwinkle, the lightest top stop among them #337681),
          so dropping the ground four points of lightness costs them nothing. */}
      <section
        aria-label="Messages Michele speaks on"
        className={`bg-[var(--color-panel)] ${BAND}`}
      >
        <SectionIntro
          eyebrow="Topics"
          title="Messages Michele is passionate about."
        >
          {/* THIRD PERSON, per Michele, 2026-08-27. This block ran in first
              person from 2026-08-24 until then. The sitewide rule she settled
              on: copy that describes a SERVICE the reader will experience
              speaks about Michele in the third person, and first person is
              kept for the personal-narrative pages, /about and the home page.
              This is a service catalogue, so it is "Michele", not "I".
              `text-pretty` plus the bound "or need" keeps the last word off a
              line of its own, which she flagged. */}
          <p className="text-pretty">
            As a public speaker, Michele can also tailor a talk to your
            group&rsquo;s specific theme or&nbsp;need.
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
                      } group flex h-full flex-col items-center gap-5 rounded-3xl px-7 py-10 text-center text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--color-navy-20)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] sm:px-8 sm:py-12`}
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
                      {/* Typography stepped up 2026-08-24 on Michele's note
                          that the cards read too small for an older reader.
                          Title 24px on a phone, 30px from sm up, was 20px
                          throughout. Line height is set explicitly at 1.18 so
                          the ratio survives the size change rather than
                          drifting with Tailwind's per-step defaults. */}
                      <h3 className="font-display text-2xl leading-[1.18] font-semibold tracking-tight text-balance sm:text-[1.875rem]">
                        {message.cardTitle ?? message.title}
                        {message.subtitle && (
                          <span className="mt-2 block text-base leading-[1.4] font-normal tracking-normal text-white/85 sm:text-lg">
                            {message.subtitle}
                          </span>
                        )}
                      </h3>

                      {/* 16px on a phone, 18px from sm up, was 14px. Line
                          height 1.5, which is the comfortable end of the
                          1.4 to 1.5 band. */}
                      <p className="text-base leading-[1.5] text-white sm:text-lg">
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
                        <span className="font-display inline-flex items-center gap-1.5 rounded-md bg-white/15 px-6 py-2.5 text-[0.9375rem] font-semibold tracking-[0.12em] uppercase ring-1 ring-inset ring-white/30 transition duration-300 group-hover:bg-white/25">
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

      {/* --------------------------------------------------- quote banner */}
      {/* Moved here from /coach on 2026-08-24, which dropped it in the same
          pass. Placed between the keynote grid and the stages list on purpose:
          it is a breath between the two densest blocks on the page, seven
          saturated cards above and a twelve-row list below, and it lands
          "here is why I speak on these" right after the reader has taken in
          what she speaks on. The run that closes the page stays intact that
          way too, stages into press kit into the ask, which is the order an
          event organiser reads in.

          THE PERIWINKLE IS GONE, 2026-08-29. This band was #D5DAF5, a pale
          lavender sampled from the sapphire flowers in a dress that is no
          longer even in the photograph, carrying navy copy. It is the page's
          own plum now, the same flat field the banner and the closing CTA
          run, which is what makes /speaker read as one colour from top to
          bottom instead of purple at both ends with a cool pastel stranded in
          the middle.

          The inks turned over with it and they had to: navy measures 1.90:1
          on the plum and neutral-600 measures 1.01:1, so both would have
          disappeared. Cream carries the quote and cream at 85 percent carries
          the name, which is the same pairing the two purple bands use.

          `.surface-speaker-quote`, the periwinkle, STAYS DEFINED and now has
          no callers at all: /author's closing quote band went to that page's
          marigold earlier the same day. It is left standing rather than
          deleted here, because a /speaker recolour is not the pass that
          should retire a class /coach and /author also once used. See the
          note on it in tailwind.css. */}
      <section
        aria-label="In Michele's words"
        className={`surface-speaker-plum-quote ${BAND}`}
      >
        <Container>
          <FadeIn>
            <figure className="flex flex-col items-center gap-10 text-center lg:flex-row lg:gap-16 lg:text-left">
              {/* A fixed pixel box rather than a percentage, so the circle
                  stays a circle at every width instead of squashing to an
                  oval in the flex row.

                  The hairline went from --color-navy-10 to white/15 with the
                  recolour. A 10 percent navy ring is a DARKENING, which is
                  what a circle needs on a pale periwinkle and the wrong way
                  round on a dark plum: it drew a faint dark halo where the
                  photograph is the brighter thing. */}
              <div className="relative h-[250px] w-[250px] flex-none overflow-hidden rounded-full bg-neutral-100 ring-1 ring-white/15 sm:h-[300px] sm:w-[300px] lg:h-[340px] lg:w-[340px]">
                <Image
                  src={MICHELE_PORTRAIT}
                  alt="Michele Okimura on a beach in Hawaiʻi, leaning against a palm trunk with the ocean behind her"
                  fill
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 300px, 250px"
                  className="object-cover object-[center_25%]"
                />
              </div>

              <div>
                {/* No quotation marks. At this size a pair of curly quotes
                    just hangs two heavy marks in the corners, and the display
                    setting already reads as a quote. Cream on the plum at
                    6.56:1, which is the banner headline's own pairing; it was
                    navy on the periwinkle, and navy measures 1.90:1 here. */}
                <blockquote className="font-display mx-auto max-w-[22ch] text-[1.5rem] leading-[1.25] font-medium tracking-tight text-balance text-[var(--color-cream)] sm:max-w-[26ch] sm:text-[1.875rem] sm:leading-[1.22] lg:mx-0 lg:max-w-[30ch] lg:text-[2.25rem] lg:leading-[1.2]">
                  Let&rsquo;s become a community of dreamers where we
                  don&rsquo;t compete, but instead celebrate and support one
                  another.
                </blockquote>
                {/* No dash before the name: the house rule for this page is no
                    em dash anywhere, so the attribution is the name alone.
                    Cream at 85 percent, the same value the two purple bands
                    give their secondary copy, at 5.28:1. It was neutral-600,
                    which was the only secondary that cleared AA on the
                    periwinkle and measures 1.01:1 on the plum. */}
                <figcaption className="font-display mt-6 text-xs font-semibold tracking-[0.18em] text-[var(--color-cream)]/85 uppercase sm:mt-8 sm:text-sm">
                  Michele Okimura
                </figcaption>
              </div>
            </figure>
          </FadeIn>
        </Container>
      </section>

      {/* ----------------------------------------------------- past events */}
      {/* Panel, and it is panel BECAUSE the press kit below it has to be
          white. See the note on that band. The plum quote banner sits between
          this and the messages grid, so two panels never touch. */}
      <section
        aria-label="Where Michele has spoken"
        className={`bg-[var(--color-panel)] ${BAND}`}
      >
        {/* Was "Recent stages.", which Michele found context-free. The eyebrow
            came down from "Where I have spoken" to a single word so it does
            not simply restate the heading underneath it. */}
        <SectionIntro
          eyebrow="Stages"
          title="Where Michele has spoken."
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
                  <span className="font-display text-xl leading-9 font-semibold text-neutral-950">
                    {item.event}
                  </span>
                  <span className="shrink-0 text-xl leading-9 text-neutral-500 sm:text-right">
                    {item.where}
                    {item.format && (
                      <span className="mt-1 block text-sm tracking-wider text-neutral-500 uppercase">
                        {item.format}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-neutral-500 italic">
              Michele has also spoken at churches across Hawaiʻi, the mainland
              U.S., Canada, Japan, the Philippines, and Singapore in her decades
              of ministry.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* -------------------------------------------------------- press kit */}
      {/* THE ONE BAND THE ALTERNATION SKIPS, and the constraint that sets
          every other ground on the page.

          The whole of this section is a single --color-panel card lifting off
          its ground. Panel is #F1EEE7 and the ground would be #F1EEE7 too if
          the alternation ran straight through, which is 1:1: the card would
          stop existing and only its navy-10 hairline would be left. So this
          band is pinned WHITE, and the two bands touching it are pinned panel
          to keep an edge on both sides.

          Reading down the page, the neutral grounds now go:

            lead + photo   #FCFAF6   band-1
            messages       #F1EEE7   panel
            quote banner   the page's plum, .surface-speaker-plum-quote
            stages         #F1EEE7   panel
            press kit      #FCFAF6   band-1   <- pinned, this note
            book me        the page's plum, .surface-speaker-plum

          No two neighbouring grounds are equal. If you ever put a panel card
          in another band here, re-derive the sequence from that band out
          rather than nudging one section and hoping.

          The closing band went from panel to the page's purple on 2026-08-29,
          which only helps this note: the edge under the white press kit is
          7.41:1 now instead of 1.11:1. The pin stays anyway. If the plum ever
          comes off that band it lands back on panel, and this band has to be
          white again for the card inside it to exist. */}
      <section
        aria-labelledby="press-kit-heading"
        className={`bg-[var(--color-band-1)] ${BAND}`}
      >
        <Container>
          <FadeIn>
            <div className="rounded-3xl bg-[var(--color-panel)] p-8 ring-1 ring-inset ring-[var(--color-navy-10)] sm:p-10">
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
                    <span className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
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
          top of this file before adding a container or an address here.

          THE PAGE'S PURPLE, 2026-08-29. This was --color-panel #F1EEE7, picked
          so the page closed on a definite edge under the white press kit band
          instead of running white into the footer. It still does that, harder:
          `.surface-speaker-plum` is the same ground the banner at the top of
          the page carries, so /speaker now opens and closes on one colour, and
          the quote band in the middle of the page carries it too. That was
          Michele's ask, and it is what makes the page read as a single purple
          identity rather than three unrelated violets.

          The edge under the press kit is unaffected: the white band above
          measures 7.41:1 against this, where it was 1.11:1 against panel. It
          was 9.42:1 on the previous, cooler #4C3A6E and 11.20:1 on the
          #3B2C74 before that; each warming step lifts the field's luminance,
          and 7.41 is still an unmistakable edge.

          `data-surface="dark"` is what BannerHero puts on its own section. It
          switches the sitewide focus ring to the light variant in tailwind.css,
          so keyboard focus stays visible on a dark ground. */}
      <section data-surface="dark" className={`surface-speaker-plum ${BAND}`}>
        <Container>
          <FadeIn>
            <div className="max-w-2xl">
              {/* Cream, matching the banner's own headline, rather than white:
                  the two bands are the same ground and should carry the same
                  ink. 6.56:1 on the flat field, 5.90:1 on the lightest pixel
                  of the gradient. */}
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-cream)] sm:text-3xl">
                Book Michele.
              </h2>
              {/* Cream at 85 percent, which is the banner's subtitle value.
                  5.28:1 flat, 4.78:1 on the lightest pixel of the gradient.
                  Was neutral-600, which measures 1.01:1 on the plum, and the
                  heading was neutral-950. Both would have been invisible. */}
              <p className="mt-4 text-xl leading-9 text-[var(--color-cream)]/85">
                Ready to bring Michele to your church, school, conference, or
                team? Tell her about your event and she will reach out
                personally.
              </p>
              <div className="mt-8">
                {/* The button keeps the warm terracotta --color-cta, and it
                    gains a hairline.

                    THE RING IS AN ACCESSIBILITY FIX, not decoration. WCAG
                    1.4.11 wants 3:1 between a control and the colour beside
                    it, and terracotta #C84C33 against this plum is 1.67:1.
                    It clears the bar everywhere else on the site, 3.17:1 on
                    the navy grounds and 3.99:1 on panel, which is why no
                    other CTA carries a ring. White at 60 percent over this
                    field measures 3.95:1 against it, and 3.68:1 at the
                    lightest pixel of the gradient, so the ring is what
                    delimits the control here. The warm recolour made the
                    ring MORE load-bearing, not less: terracotta against the
                    field went 2.52 -> 2.12 -> 1.67 across the two warming
                    steps, because each one moves the purple toward the
                    button's own hue. The label is untouched at 4.63:1
                    white on terracotta. Drop the ring only if this band ever
                    goes back to a light ground.

                    tone="dark" is what moves the FOCUS ring to white; the
                    offset it ships with is the teal panels' colour, so the
                    last class re-points it at this band. twMerge keeps both
                    rings because the static one and the focus-visible one are
                    different keys, and it is the later class that wins on the
                    offset. */}
                <ContactTrigger
                  interest="speaking"
                  tone="dark"
                  className="ring-2 ring-white/60 focus-visible:ring-offset-[var(--color-speaker-plum)]"
                >
                  Contact
                </ContactTrigger>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* THE WORKSHOPS ROW THAT CLOSED THIS PAGE IS GONE, 2026-08-25.

          It arrived here that morning off the bottom of /author carrying one
          card, ReThink Creativity, and left the same day at Michele's
          direction. The conference is the thing "Activating Your Creativity"
          grows into, so the card belongs at the foot of that keynote rather
          than at the foot of the whole speaking section: it now closes
          /speaker/messages/activating-your-creativity, retitled "Unleashing
          Your Creative Identity: The Rethink Creativity Conference", with the
          blurb dropped and the link pointing at the new detail page at
          /speaker/creativity/rethink-creativity-conference. It is rendered
          from the `relatedProgram` field on the message in
          src/lib/speaker-messages.ts.

          The "Every story in one place" link into /projects went with it, the
          same way it did when this row left /author. /projects is in the site
          footer, so nothing here is a dead end.

          /projects/rethink-creativity is UNTOUCHED and still live, still in
          the /projects index and the sitemap. Do not rebuild a card for it on
          this page: the keynote page is the one door onto the conference now.
      */}
    </>
  )
}
