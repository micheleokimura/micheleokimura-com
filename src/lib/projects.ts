// Project case studies: the narrative pages at /projects/<slug>.
//
// These are distinct from /case-studies/<slug>, which tells the story of an
// ORGANIZATION Michele worked with (Hawai‘i Baptist Academy, the DOE counselor
// PLC, ASU). A project case study tells the story of a THING SHE BUILT: a
// curriculum, a conference, a journal series, a book.
//
// They are also the long-form home for the works listed at /works/<slug>, whose
// detail pages carry only registry metadata. Where a work has a project case
// study, /works/<slug> links here rather than repeating the story.

/**
 * Michele's own words for the conviction that runs under every project. Single
 * sourced here so the Author page, the About page, and every case study quote
 * it identically. Verbatim. Do not edit the wording.
 */
export const GOLDEN_THREAD_QUOTE =
  'There is a golden thread of bringing restoration, healing, and encouragement to the heart. If you don’t believe that you are valuable, you will not believe that the dreams in your heart are valuable. I make a case for knowing your value, and throughout pretty much everything that I do, there is that golden thread of bringing restoration, healing, and encouragement to people’s hearts.'

/**
 * Michele's completion of the thought: the thread does not only run through the
 * work, it arrives somewhere. Verbatim. Do not edit the wording.
 */
export const GOLDEN_THREAD_CULMINATION =
  'The golden thread is like the spine. It runs through everything I do and teach and coach and speak on. And it culminates in embracing your brave purpose. And living it out.'

/**
 * One-line version used as the Author page hero subtitle. Keeps the "runs
 * through ... culminates in embracing your brave purpose and living it out"
 * structure, which is the point of the sentence.
 */
export const GOLDEN_THREAD_LINE =
  'A golden thread of restoration, healing, and encouragement runs through every book, journal, and program below. It culminates in one thing: embracing your brave purpose and living it out.'

export type ProjectStudy = {
  slug: string
  href: string
  title: string
  /** Small uppercase label on the card and the page hero. */
  kicker: string
  /** Card copy on the /projects index. */
  blurb: string
  /** Grouping for the index page. */
  group: 'curricula-and-programs' | 'books'
}

/**
 * The index registry.
 *
 * All nine entries now have full narrative pages under /projects. The /works
 * detail pages for the same titles carry registry metadata only and link here
 * for the story. Keeping the href in data means the index, the Author page
 * links, and the sitemap all move together.
 */
export const projectStudies: ProjectStudy[] = [
  {
    slug: 'brave-series',
    href: '/projects/brave-series',
    title: 'The Brave Series',
    kicker: 'Curriculum · 24 volumes',
    blurb:
      'A vision in the shower became a 24-volume youth curriculum on identity, worth, and protection from exploitation. Approved by the Hawaiʻi State Department of Education in 2026.',
    group: 'curricula-and-programs',
  },
  {
    slug: 'dream-big-journals',
    href: '/projects/dream-big-journals',
    title: 'The Dream Big Journals',
    kicker: 'Curriculum · Ages 4 to adult',
    blurb:
      'Four age editions in faith and non-faith versions, each with a companion teacher guide, built to teach every reader that their vision matters.',
    group: 'curricula-and-programs',
  },
  {
    slug: 'kingdom-kids',
    href: '/projects/kingdom-kids',
    title: 'The Kingdom Kids Workshop',
    kicker: 'Workshop · Since 2008',
    blurb:
      'Ten years of testing what children can actually carry, distilled into the workshop that changed how churches see the youngest people in the room.',
    group: 'curricula-and-programs',
  },
  {
    slug: 'raising-kingdom-kids',
    href: '/projects/raising-kingdom-kids',
    title: 'Raising Kingdom Kids',
    kicker: 'Curriculum · 100+ lessons',
    blurb:
      'Over 100 proven lessons from ten years of firsthand children’s and youth ministry, on identity, hearing God’s voice, leadership, voice, and healing.',
    group: 'curricula-and-programs',
  },
  {
    slug: 'rethink-creativity',
    href: '/projects/rethink-creativity',
    title: 'ReThink Creativity',
    kicker: 'Conference · 2010 to present',
    blurb:
      'Four conferences taking apart the lie that some people are not creative, with speakers from HGTV, Hollywood, surgery, fashion, and government.',
    group: 'curricula-and-programs',
  },
  {
    slug: 'dancing-with-father',
    href: '/projects/dancing-with-father',
    title: 'Dancing with Father',
    kicker: 'Book · 2011',
    blurb:
      'An illustrated poetic book of healing for women, written out of Michele’s own difficult journey through youth.',
    group: 'books',
  },
  {
    slug: 'birth-of-explicit-movement',
    href: '/projects/birth-of-explicit-movement',
    title: 'The Birth of Explicit Movement',
    kicker: 'Book · 2018',
    blurb:
      'Michele’s founding story, written as testimony and reflection guide, with chapter exercises that turn the account into a reader’s own next step.',
    group: 'books',
  },
  {
    slug: 'brave-purpose-with-god',
    href: '/projects/brave-purpose-with-god',
    title: 'Brave Purpose with God',
    kicker: 'Book · Coming 2027',
    blurb:
      'The faith edition of the 15-step Brave Purpose Framework, in three movements: Uncover, Recover, Ignite.',
    group: 'books',
  },
  {
    slug: 'brave-purpose',
    href: '/projects/brave-purpose',
    title: 'Brave Purpose',
    kicker: 'Book · Coming 2027',
    blurb:
      'The same framework voiced without the faith framing, for anyone ready to step into the life they were designed for.',
    group: 'books',
  },
]

/** Routes that render under /projects, for the sitemap. */
export const projectRoutes = [
  '/projects',
  '/projects/brave-series',
  '/projects/brave-series/brave-and-beautiful',
  '/projects/brave-series/brave-and-bold',
  '/projects/brave-series/brave-together',
  '/projects/dream-big-journals',
  '/projects/kingdom-kids',
  '/projects/raising-kingdom-kids',
  '/projects/rethink-creativity',
  '/projects/dancing-with-father',
  '/projects/birth-of-explicit-movement',
  '/projects/brave-purpose',
  '/projects/brave-purpose-with-god',
] as const

/** Maps an authoredWorks slug to its project case study, when one exists. */
export const worksSlugToProject: Record<string, string> = {
  'raising-kingdom-kids': '/projects/raising-kingdom-kids',
  'rethink-creativity': '/projects/rethink-creativity',
  'dream-big-journal-curriculum': '/projects/dream-big-journals',
  'brave-and-beautiful': '/projects/brave-series/brave-and-beautiful',
  'brave-and-bold': '/projects/brave-series/brave-and-bold',
  'brave-together': '/projects/brave-series/brave-together',
  'dancing-with-father': '/projects/dancing-with-father',
  'birth-of-explicit-movement': '/projects/birth-of-explicit-movement',
  'brave-purpose': '/projects/brave-purpose',
  'brave-purpose-with-god': '/projects/brave-purpose-with-god',
}
