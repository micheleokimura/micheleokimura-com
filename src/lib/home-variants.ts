// Shared data for the home page (`src/app/page.tsx`).
//
// This file originally backed three design-variant routes (home-v1-narrative,
// home-v2-clarity, home-v3-golden-thread) so Michele could compare directions
// side by side. Golden-thread (v3) was promoted to `/` and then rejected in
// review; the clarity direction (v2) is what `/` renders now.
//
// After Michele's 2026-08-23 rebuild the page uses HERO, DOORS, PULL_QUOTE,
// FRIENDS_SAY_TOP, FRIENDS_SAY_BOTTOM, and FEATURED_WORKS. PROOF_POINTS,
// ENDORSEMENTS, and ENDORSING_ORGS were deleted with the sections they fed;
// see the notes further down. NONPROFIT_ROOM is still unreferenced and is kept
// for the About page work.
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

/**
 * Locked order, set by Michele 2026-08-23: Speaker, Author, Coach, left to
 * right. It is not the old Author-first order and it is not the nav's
 * Coach-first order.
 *
 * The CTAs are FIRST PERSON and verbatim from her review: "Book me to speak",
 * "See my body of work", "See my method". The hooks are deliberately
 * pronoun-free so the whole card sits in her voice rather than switching to
 * "she" halfway down.
 */
export const DOORS: Door[] = [
  {
    key: 'speaker',
    label: 'Speaker',
    outcomeLabel: 'Bring her to your event',
    href: '/speaker',
    hook: 'Keynotes and workshops on dreaming, purpose, healing, creativity, and courage. Delivered in Hawaiʻi, across the mainland, and in the Philippines and Singapore.',
    cta: 'Book me to speak',
  },
  {
    key: 'author',
    label: 'Author',
    outcomeLabel: 'Read her books',
    href: '/author',
    hook: 'Two published trade books, two more releasing in 2027, a teen leadership curriculum in 24 volumes, and journals for every age from preschool to adult.',
    cta: 'See my body of work',
  },
  {
    key: 'coach',
    label: 'Coach',
    outcomeLabel: 'Walk it out with her coaching',
    href: '/coach',
    hook: 'The Brave Purpose Author Method. Twenty-six weeks, one writer, and a finished manuscript that still sounds like you.',
    cta: 'See my method',
  },
]

/**
 * HERO COPY. Every string in here is FINAL and VERBATIM from Michele, signed
 * off 2026-08-23. There are no placeholders left on this page.
 *
 * The Releasing Generations clause in `subhead` went through a stand-in built
 * from the org's published mission while she chose between wordings; the
 * wording below is the one she picked, and it supersedes that. The award
 * sentence is likewise her own, and its recipient question is settled: see the
 * note on `award`.
 *
 * Treat these as copy under sign-off. Restyle them freely, but do not re-cut
 * the words for length, rhythm, or to fit a layout.
 */
export const HERO = {
  h1: 'Hi, I’m Michele Okimura',
  /** Middle dots, not periods. Michele was specific about this. */
  roles: ['Speaker', 'Author', 'Coach'] as const,
  // FINAL, both sentences, verbatim. Michele settled the Releasing Generations
  // clause on 2026-08-23; it is no longer a placeholder. "Mānoa" stays out:
  // the location is Honolulu, Hawaiʻi and nothing narrower.
  subhead:
    'I’m a speaker, author, and writing coach based in Honolulu, Hawaiʻi. I’m also the founder and executive director of Releasing Generations, a Christian nonprofit that helps people of all ages know their identity and step into their God-given purpose.',
  /**
   * THE AWARD WENT TO THE ORGANIZATION, NOT TO MICHELE. Final wording,
   * supplied verbatim by Michele 2026-08-23.
   *
   * The recipient question is now closed. Explicit Movement is a DBA of
   * Releasing Generations, so the two names are one legal entity and naming
   * Releasing Generations is accurate. That also retires the apparent conflict
   * between releasinggenerations.org (which credits Explicit Movement) and
   * author/page.tsx and the Brave Series pages (which credit Releasing
   * Generations): both were right about the same organization.
   *
   * What is still NOT true is that Michele won it personally. "led by Michele
   * Okimura" is the whole of her connection to it and is as far as this goes.
   * Do not compress this into anything that reads as her award.
   *
   * The three parts concatenate into exactly her sentence, split only so the
   * honour itself can carry emphasis. Keep the wording; restyle freely.
   */
  award: {
    lead: 'Releasing Generations, led by Michele Okimura, was awarded the ',
    honor: '2023 Outstanding Advocate for Children and Youth',
    tail: ' (State of Hawaiʻi) for its work with young people of Hawaiʻi and the creation of the Brave Series.',
  },
  cta: 'Get in touch',
} as const

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

/**
 * ENDORSEMENTS and ENDORSING_ORGS lived here and backed the three-quote grid
 * plus the "with endorsements from ..." strip inside the deleted Recognition
 * section. Both are gone with it. Their wording was not lost: every quote they
 * held is carried verbatim in FRIENDS_SAY_TOP / FRIENDS_SAY_BOTTOM below, and
 * the full archive is site/content/speaker/full-endorsements.md. Keeping a
 * second copy here would have given the same quotes two sources of truth.
 *
 * One quote did NOT survive the move and it is worth naming: Glenn T. Stanton's
 * "We serve a BIG God ..." blurb. His other blurb, the one about The Birth of
 * Explicit Movement, is in the top row instead, because that one is tied to a
 * named title and this site attributes book blurbs to the book. If Michele
 * wants the "BIG God" wording back, it is in full-endorsements.md and in this
 * file's git history, and it needs a title attached before it goes up.
 */

/**
 * PROOF_POINTS is gone. It backed the home page's "Recognition" section (the
 * "work has been checked by people who had to be sure" headline plus the 2023,
 * 2026, and "14 works" tiles), and Michele deleted that whole section on
 * 2026-08-23. The facts themselves are not lost: the 2023 award now runs in the
 * hero, the 2026 DOE approval runs on the author page under BRAVE_RECOGNITION,
 * and the works count is on /works. Do not reinstate the section here.
 */

/**
 * The pull quote that replaced the founder blurb below the hero.
 *
 * FINAL. Michele approved this wording outright on 2026-08-23 (it was her
 * option C). It is not a placeholder and it is not awaiting a variant. Treat
 * the two sentences as verbatim: do not re-cut them for length or rhythm.
 *
 * The two sentences render WITHOUT quotation marks. The display size and the
 * centred setting already read as a quote, and adding curly quotes to type this
 * large just puts two heavy marks in the corners. The attribution below is
 * deliberately much smaller so the line itself carries the section.
 */
export const PULL_QUOTE = {
  text: 'You were created with brave purpose. My work is helping you live in the fullness of it.',
  attribution: 'Michele Okimura',
} as const

/**
 * "Things my friends say about me" — the two scrolling rows that replaced the
 * Recognition section.
 *
 * ############ CURRENTLY UNUSED ############
 * The section is NOT on the home page. Michele held it back on 2026-08-23 while
 * she and Brett decide whether the home page should carry testimonials at all,
 * given the same quotes already run on the individual book, coach, and speaker
 * pages. She is leaning toward leaving them off.
 *
 * The arrays stay because they are curated, verbatim, signed-off copy that took
 * real work to assemble and verify, and because reinstating the section is a
 * plausible next step. If the answer comes back "no testimonials on the home
 * page", delete both arrays and the type: every quote in here also exists at
 * its own source (author/page.tsx per-book constants, and
 * site/content/speaker/full-endorsements.md), so nothing is lost by removing
 * this copy, and two copies of a verbatim quote is how one of them drifts.
 * ##########################################
 *
 * HARD RULE, inherited from the top of this file and from
 * site/content/speaker/full-endorsements.md: every quote here is VERBATIM. Do
 * not shorten one to make a card fit, do not fix an endorser's grammar, and do
 * not swap a word because it appears on the banned-vocabulary list in
 * CLAUDE.md. That list governs Michele's voice; these are other people's.
 *
 * Provenance, so nothing here has to be taken on trust:
 *  - the book blurbs come from the per-book endorsement constants in
 *    src/app/author/page.tsx, and `work` names the title each one is about;
 *  - the workshop and speaking quotes come from
 *    site/content/speaker/full-endorsements.md, where Michele signed the
 *    Teramae / Cal Chinen / Deguchi / Furuhashi wording off on 2026-08-21;
 *  - the Pimental card uses the SHORTER SIGNED-OFF TRIM already running on
 *    /speaker, not the full letter. Michele directed that trim. Use this
 *    version, never a fresh cut of the original.
 */
export type Testimonial = {
  quote: string
  name: string
  /** Role and organization, rendered on one line under the name. */
  title: string
  /** The book or curriculum the blurb is about, when it is a book blurb. */
  work?: string
}

/** Top row. Scrolls right to left. */
export const FRIENDS_SAY_TOP: Testimonial[] = [
  {
    quote:
      'Michele is a remarkably gifted woman with an unbounded mother’s heart for the incredibly talented and passionate young people she draws into God’s Kingdom. This small book will bring huge encouragement to you, revealing that God is still intimately active in the world and in the hearts of humble and unlikely heroes like Michele.',
    name: 'Glenn T. Stanton',
    title: 'Director of Global Family Formation Studies, Focus on the Family',
    work: 'The Birth of Explicit Movement',
  },
  {
    quote:
      'Michele Okimura has touched a topic that is discussed very little. She invites the reader to share her tragedy and triumph by capturing that experience in Dancing with Father. This poem can be an instrument to bridge the gap in the healing process for others who have had a difficult journey through their youth.',
    name: 'Gary and Norma Smalley',
    title: 'President and Founder, Smalley Relationship Center',
    work: 'Dancing with Father',
  },
  {
    quote:
      'Michele was able to rekindle and inspire the need and desire to reignite and inspire our Leadership Team that it is never too late to become a ‘dreamer’ and make a positive impact and difference in the world.',
    name: 'Gerald Teramae',
    title: 'Head of School, Island Pacific Academy',
  },
  {
    quote:
      'There is a lack of practical tools that can assist young adults in discovering the direction that God wants their life to take. This book fills that void. Writing with a positive and uplifting tone, Michele provides practical advice on how to connect with one’s life purpose, no matter what adult life stage you are in.',
    name: 'Ted Esler',
    title: 'President and CEO, Missio Nexus',
    work: 'Brave Purpose with God',
  },
  {
    quote:
      'When I read Dancing with the Father my heart was deeply touched. I know this deeply artistic, poetic work will touch many deeply.',
    name: 'Patricia King',
    title: 'President and Founder, Extreme Prophetic Ministries',
    work: 'Dancing with Father',
  },
  {
    quote:
      'She just did a session at Native Camp in Montana and it was excellent, the most impactful session of the whole camp. We had 19 FMI workers there. Every person had an experience of how to prophesy over each other. Simple, practical, and powerful. I saw it all personally. Now many children in our church prophesy and unashamedly pray for healing, all because of Michele.',
    name: 'Pastor Kihāpiʻilani Pimental',
    title: 'Worker Supervisor, Foursquare Missions International',
  },
  {
    quote:
      'When first introduced to the materials, I found them breathtaking and unlike anything I had seen. The Brave Series equips young people with the tools to navigate challenges, make informed decisions, and step confidently into their potential by addressing critical topics like self-worth, healthy relationships, and personal responsibility.',
    name: 'Phyllis Unebasami',
    title: 'Retired Deputy Superintendent, Hawaiʻi Department of Education',
    work: 'The Brave Series',
  },
]

/** Bottom row. Scrolls left to right, against the top row. */
export const FRIENDS_SAY_BOTTOM: Testimonial[] = [
  {
    quote:
      'Just as David wrote his Psalms, so has Michele found a voice for deeper longings of God. This is truly a soul’s cry that rings victorious. I believe Michele has found a voice for so many.',
    name: 'Dr. Wayne Cordeiro',
    title: 'Founding Pastor, New Hope Christian Fellowship, Honolulu',
    work: 'Dancing with Father',
  },
  {
    quote:
      'The Kingdom Kids Workshop has been the single most powerful equipping workshop for the parents and children’s ministry workers in our church. It gave them practical tools, and it imparted a living and powerful love and excitement for God.',
    name: 'Cal Chinen',
    title: 'Senior Pastor, Moanalua Gardens Missionary Church, Honolulu',
  },
  {
    quote:
      'Brave Purpose is not simply a book, it is a sacred invitation. From the first page, you feel gently yet firmly called out of hiding and into the courageous work of becoming who you were always meant to be. This is the kind of book you don’t just read, you experience.',
    name: 'Gerald Teramae',
    title: 'Head of School, Island Pacific Academy',
    work: 'Brave Purpose',
  },
  {
    quote:
      'Our experience with Kingdom Kids was amazing. Michele’s ministry sparked and stirred the faith of our entire church. Her creative, innovative, inspired approach enabled our children and youth to experience biblical truths and the Lord Himself in a very powerful way.',
    name: 'Barry Deguchi',
    title: 'Lead Pastor, Catalyst Christian Community, Long Beach, CA',
  },
  {
    quote:
      'Okimura masterfully connects the prophetic and the artistic with the dusty, everyday path we actually walk. Readers will come away not just encouraged but awakened as travelers ready to follow God’s clues toward the treasure He has prepared.',
    name: 'Ted Vail, D.I.S.',
    title: 'Senior Vice President of Mission, The Foursquare Church',
    work: 'Brave Purpose with God',
  },
  {
    quote:
      'Her creative and visually-exciting presentations have challenged us and our students to directly download from the Father Heart of God. We are now seeing children as young as five praying bold and encouraging words over other children and even their teachers. Our entire campus culture has changed. Our school will never be the same.',
    name: 'Rebecca Furuhashi',
    title: 'Principal, Christian Academy',
  },
  {
    quote:
      'Brave Purpose is a wonderful resource in the midst of all this, helping us reflect on our identity, our potential, and our direction. The intent is for us to find our true purpose and meaning, and to live the unique life we were inherently designed for.',
    name: 'Edwin Keh',
    title: 'CEO, HKRITA; former Senior Vice President and COO, Walmart Global Procurement',
    work: 'Brave Purpose',
  },
]

/**
 * ############ CURRENTLY UNUSED ############
 * Michele deleted the entire "A body of work" section from the home page on
 * 2026-08-23 (the heading, the six-cover grid, and the "See every title" link),
 * on the grounds that /author already carries the books. Nothing renders
 * FEATURED_WORKS today.
 *
 * It is kept rather than deleted because it was cut in a live review and is a
 * plausible thing to want back, and because the href/cover pairs below were
 * checked by hand against the project routes. If it is still unused the next
 * time someone touches this file, delete it: /author builds its shelf from its
 * own constants, so this is not the source of truth for anything.
 * ##########################################
 *
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
