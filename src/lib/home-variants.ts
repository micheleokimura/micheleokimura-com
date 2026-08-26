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
  /**
   * `headline` + `body` are a STRUCTURAL SPLIT of `hook`, not new copy.
   * Concatenating them with a single space reproduces `hook` exactly, and the
   * split is always at a sentence boundary. The card renders the two at
   * different sizes; `hook` is kept as the single source of truth so nobody has
   * to reconcile three strings.
   *
   * Author has no `headline` because its hook is one long sentence with no
   * boundary to split on. Splitting it would have meant turning a comma into a
   * full stop, which is an edit to Michele's copy, so the whole hook renders as
   * body on that card instead. If she supplies three short card headlines, add
   * them here and give Author one too.
   */
  hook: string
  headline?: string
  body?: string
  cta: string
  /** Card ground. Maps to the .msg-* classes in tailwind.css. */
  accent: 'violet' | 'coral' | 'teal'
  /** Hairline pattern. Neighbours must differ so the grid reads varied. */
  texture: 'lines' | 'rings' | 'grid' | 'dots'
  icon: 'mic' | 'book' | 'message'
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
    headline:
      'Keynotes and workshops on dreaming, purpose, healing, creativity, and courage.',
    body: 'Delivered in Hawaiʻi, across the mainland, and in the Philippines and Singapore.',
    cta: 'Book me to speak',
    // Violet is the Speaker page's own colour, sampled from the stage
    // photograph on that page, and it is also the purple in the hero video
    // directly above this grid. The card therefore ties to both.
    accent: 'violet',
    texture: 'lines',
    icon: 'mic',
  },
  {
    key: 'author',
    label: 'Author',
    outcomeLabel: 'Read her books',
    href: '/author',
    hook: 'Two published trade books, two more releasing in 2027, a teen leadership curriculum in 24 volumes, and journals for every age from preschool to adult.',
    // No headline: one sentence, no boundary to split on. See the Door type.
    body: 'Two published trade books, two more releasing in 2027, a teen leadership curriculum in 24 volumes, and journals for every age from preschool to adult.',
    cta: 'See my body of work',
    accent: 'coral',
    texture: 'rings',
    icon: 'book',
  },
  {
    key: 'coach',
    label: 'Coach',
    outcomeLabel: 'Walk it out with her coaching',
    href: '/coach',
    hook: 'The Brave Purpose Author Method. Twenty-six weeks, one writer, and a finished manuscript that still sounds like you.',
    headline: 'The Brave Purpose Author Method.',
    body: 'Twenty-six weeks, one writer, and a finished manuscript that still sounds like you.',
    cta: 'See my method',
    accent: 'teal',
    texture: 'grid',
    icon: 'message',
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
  // FINAL, both sentences, verbatim, 2026-08-24. Michele leads with the idea
  // rather than the credential now.
  //
  // RELEASING GENERATIONS IS DELIBERATELY ABSENT HERE. An earlier subhead ran
  // "I'm also the founder and executive director of Releasing Generations, a
  // Christian nonprofit that helps people of all ages know their identity and
  // step into their God-given purpose", and that clause was cut on purpose, not
  // lost in an edit. The nonprofit is named in the award line directly below
  // and again on the About page, so the hero does not need to carry it a third
  // time. Do not restore it here.
  //
  // "Mānoa" also stays out: the location is Honolulu, Hawaiʻi and nothing
  // narrower.
  subhead:
    'Every person’s story matters and is the launchpad for their brave purpose. I’m a speaker, author, and writing coach based in Honolulu, Hawaiʻi.',
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
   * What is still NOT true is that Michele won it personally. "under Michele's
   * leadership" is the whole of her connection to it and is as far as this
   * goes. Do not compress this into anything that reads as her award.
   *
   * Final wording, verbatim, 2026-08-24. It replaces a longer sentence that
   * ended "...for its work with young people of Hawaiʻi and the creation of the
   * Brave Series"; that detail now lives only on the pages about the work.
   *
   * The three parts concatenate into exactly her sentence, split only so the
   * honour itself can carry emphasis. Keep the wording; restyle freely.
   */
  award: {
    lead: 'Releasing Generations, under Michele’s leadership, won the ',
    honor: '2023 Outstanding Advocate for the Children and Youth of Hawaiʻi',
    tail: ' state award.',
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
 *
 * `lines` is an ARRAY because Michele wants one sentence per visual line rather
 * than a single flowing paragraph. Keeping them as separate strings means the
 * break is structural instead of a <br> the copy has to carry, so each sentence
 * can still wrap on its own on a narrow screen without the break being lost.
 * Do not rejoin these into one string.
 */
export const PULL_QUOTE = {
  lines: [
    'You were created with brave purpose.',
    'My work is helping you live in the fullness of it.',
  ] as const,
  attribution: 'Michele Okimura',
} as const

/**
 * "Things my friends say about me" — the two scrolling rows that replaced the
 * Recognition section.
 *
 * LIVE, AND THE LIST IS SIGNED OFF. Michele curated it on 2026-08-24: fifteen
 * quotes, eight in the top row and seven in the bottom. What she changed in
 * that pass, so nobody undoes it thinking it was a mistake:
 *
 *  - Patricia King's Dancing with Father blurb was DROPPED.
 *  - Kihāpiʻilani Pimental's Native Camp quote was REPLACED with his blurb for
 *    The Birth of Explicit Movement. The old wording still runs on /speaker,
 *    where it is the right quote for that context; the two are not in conflict.
 *  - An unnamed workshop attendee and Dr. Marion Ingegneri were ADDED.
 *
 * The eight/seven split is not arbitrary: Gerald Teramae appears twice in this
 * set, once for a leadership session and once for Brave Purpose, and the two
 * are kept in DIFFERENT rows so his name never scrolls past twice together.
 * Keep that property if you rebalance the rows.
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
  /**
   * Role and organization, rendered on one line under the name. OPTIONAL,
   * because one endorsement is an unnamed workshop attendee whose whole
   * attribution is "Workshop attendee". Do not invent a title to fill the gap;
   * the card renders the line only when there is one.
   */
  title?: string
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
    /**
     * REPLACES the Native Camp quote this slot used to hold ("She just did a
     * session at Native Camp in Montana..."). Michele swapped it on 2026-08-24
     * for this one, which is about the book rather than a session, so the card
     * now carries a `work`. The old wording is not retired from the repo: it is
     * still the version running on /speaker under topic 7, where it is the
     * right quote for that context. Do not reconcile the two.
     */
    quote:
      'Get ready to be inspired! He is the God of the Old Testament, and yet he is active now and speaks to his servants. Michele is one of those servant saints. It is unmistakable. What you hold before you is a roadmap of her journey of an intimate relationship with the Father. Explicit Movement is a book for all ages, but especially for the next generation.',
    name: 'Pastor Kihāpiʻilani Pimental',
    title: 'Worker Supervisor, Foursquare Missions International',
    work: 'The Birth of Explicit Movement',
  },
  {
    /**
     * Unattributed by design. The whole attribution is "Workshop attendee", so
     * this entry has no `title`; the card omits that line rather than showing
     * an empty one. Do not invent an affiliation for this person.
     *
     * EM DASHES REPLACED WITH COMMAS. Michele's source text used them and the
     * site rule in CLAUDE.md bans them outright, so they came out. No words
     * were changed, added, or removed. This is the only quote in the curated
     * set that needed it; every other one was already clean.
     */
    quote:
      'For me, I have never experienced a conference that was presented the way Michele did it. I have learned so much, fire was placed on my heart and spirit! She presented each lesson in a tangible way, it made me excited to implement it in my own home and in our Sunday School classes! Awesome! Awesome! Awesome!',
    name: 'Workshop attendee',
  },
  {
    quote:
      'Brave Purpose with God is more than an inspiring book. It is a summons to adventure. I believe this message releases a new generation of explorers ready to step into the destiny God has prepared for them.',
    name: 'Dr. Marion Ingegneri',
    title:
      'President, Ministry Leader Network; Global Director, Day of Prayer for the Peace of Jerusalem',
    work: 'Brave Purpose with God',
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
    /**
     * DELIBERATE EDIT TO AN ENDORSER'S WORDS, authorized by Michele
     * 2026-08-24, and the ONLY one in this file.
     *
     * Ted Vail's original opens "Okimura masterfully connects...", using her
     * surname alone the way a book review would. Out of the context of a review
     * and set as a standalone card, that reads as though it is about someone
     * else, so "Michele " is prepended to make it "Michele Okimura
     * masterfully...". One word added, nothing removed, nothing reworded.
     *
     * This is an exception to the hard rule above, not a loosening of it. Every
     * other quote in this file is untouched, and the next one needs Michele's
     * explicit say-so too. The original wording is in
     * src/app/author/page.tsx under BRAVE_PURPOSE_FAITH_ENDORSEMENTS.
     */
    quote:
      'Michele Okimura masterfully connects the prophetic and the artistic with the dusty, everyday path we actually walk. Readers will come away not just encouraged but awakened as travelers ready to follow God’s clues toward the treasure He has prepared.',
    name: 'Ted Vail, D.I.S.',
    title: 'Senior Vice President of Mission, The Foursquare Church',
    work: 'Brave Purpose with God',
  },
  {
    quote:
      'Her creative and visually-exciting presentations have challenged us and our students to directly download from the Father Heart of God. We are now seeing children as young as five praying bold and encouraging words over other children and even their teachers. Our entire campus culture has changed. Our school will never be the same.',
    name: 'Rebecca Furuhashi',
    title: 'Former Principal, Christian Academy',
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
