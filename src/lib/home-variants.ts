// Shared data for the three home page design variants at /home-v1-narrative,
// /home-v2-clarity, and /home-v3-golden-thread.
//
// These routes exist so Michele can compare three directions side by side
// before one is promoted to `/`. Keeping the proof data here means all three
// variants quote the same endorsements and the same award wording, so the
// comparison is about LAYOUT and EMPHASIS rather than about copy drift.
//
// HARD RULE: endorser wording is verbatim. Do not edit a quote to make it fit.
// Trim only by dropping whole sentences, and only where an existing signed-off
// trim already exists (see site/content/speaker/full-endorsements.md).

/** The three doors into Michele's work. Routes are the real ones on this site. */
export type Door = {
  key: 'author' | 'speaker' | 'coach'
  /** Offering-first label, used by the clarity variant. */
  label: string
  /** Outcome-first label, used by the golden-thread variant. */
  outcomeLabel: string
  href: string
  hook: string
  cta: string
}

export const DOORS: Door[] = [
  {
    key: 'author',
    label: 'Author',
    outcomeLabel: 'Read her books',
    href: '/author',
    hook: 'Two published trade books, two more releasing in 2027, a teen leadership curriculum in 24 volumes, and journals for every age from preschool to adult.',
    cta: 'See the body of work',
  },
  {
    key: 'speaker',
    label: 'Speaker',
    outcomeLabel: 'Bring her to your event',
    href: '/speak',
    hook: 'Keynotes and workshops on dreaming, purpose, healing, creativity, and courage. Delivered in Hawaiʻi, across the mainland, and in the Philippines and Singapore.',
    cta: 'Book Michele to speak',
  },
  {
    key: 'coach',
    label: 'Coach',
    outcomeLabel: 'Walk it out with her coaching',
    href: '/coaching',
    hook: 'The Brave Purpose Author Method. Twenty-six weeks, one writer, and a finished manuscript that still sounds like you.',
    cta: 'See the Method',
  },
]

/**
 * The fourth hat. CLAUDE.md treats Michele as a four-role figure (author,
 * speaker, EXECUTIVE DIRECTOR, coach) and says not to flatten her to any one
 * role. The three DOORS above are the commercial paths into her own work, so
 * Releasing Generations is carried separately: it is a nonprofit umbrella
 * rather than an offering, and it links off-site.
 */
export const NONPROFIT_ROOM = {
  label: 'Executive Director',
  org: 'Releasing Generations',
  href: 'https://releasinggenerations.org',
  hook: 'The Christian nonprofit Michele founded and runs. Explicit Movement, Kingdom Families, ReThink Creativity, and the Brave Series curriculum all live here.',
  cta: 'Visit Releasing Generations',
} as const

/** Verbatim endorsements. Attribution renders on its own line, never after a dash. */
export type Endorsement = {
  quote: string
  name: string
  title: string
  org: string
}

export const ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      'We serve a BIG God, the Lord of every square inch of creation, who has very big and very personal dreams for us as His beloved children. I don’t know of anyone who lives more fully and boldly as a beautiful daughter of the King than Michele Okimura. She shares her profound and practical wisdom in this exciting new book.',
    name: 'Glenn T. Stanton',
    title: 'Director of Global Family Formation Studies',
    org: 'Focus on the Family',
  },
  {
    quote:
      'Michele was able to rekindle and inspire the need and desire to reignite and inspire our Leadership Team that it is never too late to become a ‘dreamer’ and make a positive impact and difference in the world.',
    name: 'Gerald Teramae',
    title: 'Head of School',
    org: 'Island Pacific Academy',
  },
  {
    quote:
      'The Kingdom Kids Workshop has been the single most powerful equipping workshop for the parents and children’s ministry workers in our church. It gave them practical tools, and it imparted a living and powerful love and excitement for God.',
    name: 'Cal Chinen',
    title: 'Senior Pastor',
    org: 'Moanalua Gardens Missionary Church, Honolulu',
  },
]

/** Organizations named in the endorsement strip under the pull quotes. */
export const ENDORSING_ORGS = [
  'Focus on the Family',
  'Missio Nexus',
  'Foursquare Missions International',
  'Island Pacific Academy',
] as const

/** Short factual proof points. No pricing, per the credentials rule. */
export type ProofPoint = { label: string; body: string }

export const PROOF_POINTS: ProofPoint[] = [
  {
    label: '2023',
    body: 'Michele and the Explicit Movement team named Outstanding Advocate for Children and Youth of Hawaiʻi, presented by Governor Josh Green and Mayor Rick Blangiardi.',
  },
  {
    label: '2026',
    body: 'Brave Together, the non-faith edition of the Brave Series, vetted and approved by the Hawaiʻi State Department of Education for secondary public schools.',
  },
  {
    label: '14 works',
    body: 'Trade books, curricula, journals, and programs authored or shepherded into the world, the earliest of them first taught in 2008.',
  },
]

/**
 * Cover art for the featured-work rows. Aspect ratios vary a lot across these
 * files (0.65 portrait through 1.33 landscape), so every consumer renders them
 * with `object-contain` inside a fixed-ratio card rather than cropping.
 */
export type FeaturedWork = {
  title: string
  kicker: string
  href: string
  /**
   * Omitted for the forthcoming 2027 books, which have no cover art yet.
   * Consumers render a typographic panel in that case rather than borrowing
   * another title's artwork, which would misattribute the image.
   */
  cover?: string
}

export const FEATURED_WORKS: FeaturedWork[] = [
  {
    title: 'Dancing with Father',
    kicker: 'Book · 2011',
    href: '/projects/dancing-with-father',
    cover: '/images/books/dancing-with-father.webp',
  },
  {
    title: 'The Birth of Explicit Movement',
    kicker: 'Book · 2018',
    href: '/projects/birth-of-explicit-movement',
    cover: '/images/books/birth-of-explicit-movement.webp',
  },
  {
    title: 'Brave & Beautiful',
    kicker: 'Brave Series · 4 volumes',
    href: '/projects/brave-series/brave-and-beautiful',
    cover: '/images/brave-series/brave-and-beautiful-4-volume-set-classic-hardcopy.jpeg',
  },
  {
    title: 'The Dream Big Journals',
    kicker: 'Curriculum · Ages 4 to adult',
    href: '/projects/dream-big-journals',
    // Secular edition cover, matching the neutral title. The faith edition is
    // a separate cover file and would misname the work shown here.
    cover: '/images/journals/dream-big-journal-youth-and-adults.jpg',
  },
  {
    // The artwork is the Raising Kingdom Kids lesson book, so the card is
    // titled for the book and points at the book's registry page. The workshop
    // itself has no cover art.
    title: 'Raising Kingdom Kids',
    kicker: 'Lesson book · 100+ lessons',
    href: '/works/raising-kingdom-kids',
    cover: '/images/books/kingdom-kids.webp',
  },
  {
    title: 'Brave Purpose',
    kicker: 'Book · Coming 2027',
    href: '/projects/brave-purpose',
  },
]
