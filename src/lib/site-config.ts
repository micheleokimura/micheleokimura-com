export type AuthoredWork = {
  slug: string
  title: string
  subtitle?: string
  category: 'trade-book' | 'curriculum' | 'blog' | 'program'
  status: 'published' | 'in-production' | 'active'
  year?: number | string
  publisher?: string
  isbn?: string
  format?: string
  coAuthors?: readonly string[]
  inLanguage?: string
  purchaseUrl?: string
  illustrator?: string
  coverImage?: string
}

export const siteConfig = {
  brand: 'Michele Okimura',
  shortBrand: 'Michele Okimura',
  domain: 'micheleokimura.com',
  url: 'https://micheleokimura.com',
  email: 'michele@micheleokimura.com',
  /**
   * Sitewide Open Graph / Twitter card image AND the `image` on Michele's
   * Person schema, so it is the picture an answer engine attaches to her.
   *
   * TODO: this is the warmest photo currently in the repo (the 2023 Outstanding
   * Advocate award). It is NOT a purpose-built card. Two things should replace
   * it when they exist: a proper 1200x630 OG card, and a real press headshot at
   * /images/press-kit/headshot-michele-okimura-hero.jpg. Drop either in and
   * change this one line; every page and every schema block follows.
   */
  ogImage: '/images/about-timeline/about-2023-hawaii-outstanding-advocate-19.jpg',
  city: 'Honolulu',
  state: 'HI',
  designer: 'Michele Okimura',
  offerName: 'Brave Purpose Author Method',
  positioning: 'Brave Purpose',
  description:
    'Michele Okimura is a speaker, author, and coach based on O\'ahu, Hawai\'i. She is the founder and Executive Director of Releasing Generations, founder of Explicit Movement, Kingdom Families, and ReThink Creativity, and author of fourteen published and forthcoming works spanning trade books, curricula, and programs.',
  nonprofit: 'Releasing Generations',
  nonprofitUrl: 'https://releasinggenerations.org',
  church: 'Hope Chapel Lifespring',
  churchUrl: 'https://lifespringhawaii.org',
  movements: [
    'Explicit Movement',
    'Kingdom Families',
    'ReThink Creativity',
    'The Brave Series',
  ] as const,
  award: 'Outstanding Advocate for Children and Youth of Hawai\'i (2023)',
  awardIssuer: 'Governor Josh Green and Mayor Rick Blangiardi',
  socials: {
    linkedin: 'https://www.linkedin.com/in/michele-okimura-36861951',
    facebook: 'https://www.facebook.com/michele.okimura',
    instagram: 'https://www.instagram.com/michele_okimura/',
  },
  wikidataId: null as string | null,
  podcast: {
    name: 'In a Moment',
    url: 'https://inamoment.transistor.fm/',
    rss: 'https://feeds.transistor.fm/in-a-moment',
    spotify: 'https://open.spotify.com/show/70c8Y9T7bOtKsP98C3B97c',
    apple: 'https://podcasts.apple.com/podcast/in-a-moment/id1877822739',
    coHost: 'Brett K. Moore',
    publisher: 'PodcastNetwork.org',
    inLanguage: 'en',
    description:
      'Honest conversations about faith, marriage, and the moments that change everything. Co-hosted by Michele Okimura and Brett K. Moore.',
  },
  waitlistUrl: '/contact',
  ctaLabel: 'Join the waitlist',
  waitlistMailto:
    'mailto:michele@micheleokimura.com?subject=Joining%20the%20Brave%20Purpose%20waitlist',
} as const

export const authoredWorks: AuthoredWork[] = [
  {
    slug: 'dancing-with-father',
    title: 'Dancing with Father',
    category: 'trade-book',
    status: 'published',
    year: 2011,
    publisher: 'Xulon Press',
    isbn: '978-1613792711',
    format: 'Paperback and audiobook',
    illustrator: 'Danielle Iranon',
    subtitle: 'An illustrated poetic book of healing for women.',
    inLanguage: 'en',
    purchaseUrl: 'https://www.amazon.com/Dancing-Father-Michele-Okimura/dp/1613792719',
    coverImage: '/images/books/dancing-with-father.webp',
  },
  {
    slug: 'birth-of-explicit-movement',
    title: 'The Birth of Explicit Movement',
    subtitle: 'Discover Keys to Fulfilling Your Purpose',
    category: 'trade-book',
    status: 'published',
    year: 2018,
    publisher: 'Explicit Movement / Releasing Generations',
    format: 'Paperback and e-book',
    inLanguage: 'en',
    coverImage: '/images/books/birth-of-explicit-movement.webp',
  },
  {
    slug: 'explicit-movement-21-day-journal',
    title: 'Explicit Movement 21-Day Interactive Journal',
    category: 'trade-book',
    status: 'published',
    year: 2018,
    format: 'Print and e-book',
    inLanguage: 'en',
  },
  {
    slug: 'brave-purpose',
    title: 'Brave Purpose',
    subtitle: 'A story-driven book on healing, purpose, and the courage to dream.',
    category: 'trade-book',
    status: 'in-production',
    year: 2027,
    publisher: 'Dream Big Publish / Ohana Style Publishing',
    format: 'Trade paperback, e-book, audiobook (planned)',
    inLanguage: 'en',
  },
  {
    slug: 'brave-purpose-with-god',
    title: 'Brave Purpose with God',
    subtitle: 'The faith companion for Christian readers walking the healing-to-purpose road.',
    category: 'trade-book',
    status: 'in-production',
    year: 2027,
    publisher: 'Dream Big Publish / Ohana Style Publishing',
    format: 'Trade paperback, e-book, audiobook (planned)',
    inLanguage: 'en',
  },
  {
    slug: 'dream-big-journal-curriculum',
    title: 'Dream Big Journal Curriculum',
    subtitle: 'Activity-based curriculum used in schools, churches, and families for discovery of purpose across all life stages.',
    category: 'curriculum',
    status: 'published',
    year: '2023-2025',
    format: 'Journal + teacher guide (preschool, younger elementary, older elementary, youth, adult)',
    coverImage: '/images/books/dream-big-journals.webp',
  },
  {
    slug: 'raising-kingdom-kids',
    title: 'Raising Kingdom Kids Lesson Book',
    subtitle: 'Companion to the Kingdom Families and Kingdom Kids workshop for parents and children\'s church leaders.',
    category: 'curriculum',
    status: 'published',
    format: 'Lesson book, 100+ lessons',
    coverImage: '/images/books/kingdom-kids.webp',
  },
  {
    slug: 'brave-and-beautiful',
    title: 'Brave & Beautiful',
    subtitle: 'Leadership curriculum for teen girls focused on identity, worth, and protection from exploitation.',
    category: 'curriculum',
    status: 'published',
    year: 2022,
    publisher: 'Releasing Generations / The Brave Series',
    format: 'Teen leadership curriculum for girls',
  },
  {
    slug: 'brave-and-bold',
    title: 'Brave & Bold',
    subtitle: 'Leadership curriculum for teen boys focused on courage, healthy masculinity, and purpose.',
    category: 'curriculum',
    status: 'published',
    publisher: 'Releasing Generations / The Brave Series',
    format: 'Teen leadership curriculum for boys',
  },
  {
    slug: 'brave-together',
    title: 'Brave Together',
    subtitle: 'Coed teen leadership curriculum focused on shared identity and mission.',
    category: 'curriculum',
    status: 'published',
    publisher: 'Releasing Generations / The Brave Series',
    format: 'Coed curriculum, 80+ lessons with slide decks',
  },
  {
    slug: 'wisdom-flows',
    title: 'Wisdom Flows',
    subtitle: 'Short essays on healing, purpose, creativity, and the quiet moments that change everything.',
    category: 'blog',
    status: 'active',
    year: '2025-present',
    format: 'Blog at micheleokimura.com',
  },
  {
    slug: 'explicit-movement',
    title: 'Explicit Movement',
    subtitle: 'Faith-based resources and conferences equipping parents, pastors, and youth leaders. 2023 Outstanding Advocate for Children and Youth of Hawai\'i.',
    category: 'program',
    status: 'active',
  },
  {
    slug: 'kingdom-families',
    title: 'Kingdom Families',
    subtitle: 'Strengthening families, equipping parents, and raising up the next generation.',
    category: 'program',
    status: 'active',
  },
  {
    slug: 'rethink-creativity',
    title: 'ReThink Creativity',
    subtitle: 'Awakening creativity in everyday people. Online Creativity Conferences with global reach in 2020 and 2021.',
    category: 'program',
    status: 'active',
  },
]

/**
 * Header nav, locked order. FIVE links, plus the Contact button the header
 * renders itself (a popup trigger, not a route).
 *
 * The cap matters. The old eight-item nav could not fit beside the wordmark
 * and the CTA until 1024px, so every laptop half-screen visitor saw a bare
 * hamburger and reported "there are no menu items". Five labels fit from
 * 768px only because the nav runs at 13px with px-2 between 768 and 1024; see
 * the width budget in DESIGN-RULES.md. Do not add a sixth, and do not
 * lengthen a label, without re-measuring.
 *
 * Label and route now match on every item: /coach and /speaker replaced the old
 * /coaching and /speak routes on 2026-08-23, with permanent redirects from both
 * old paths in next.config.ts.
 *
 * Order is Coach, Author, Speaker: the coaching offer is the commercial ask, so
 * it leads.
 *
 * Everything else lives in the footer. See `footerColumns` below.
 */
export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/coach', label: 'Coach' },
  { href: '/author', label: 'Author' },
  { href: '/speaker', label: 'Speaker' },
  { href: '/about', label: 'About' },
] as const

/**
 * Footer navigation. This is where everything cut from the header went, so
 * nothing became unreachable.
 *
 * Two destinations are not what their labels suggest, and both are deliberate:
 * the blog has no /blog route (src/lib/blog.ts renders it at /resources), and
 * there is no press-kit page, only a press-kit section on the speaker page.
 */
export const footerColumns = [
  {
    heading: 'Explore',
    links: [
      { href: '/', label: 'Home' },
      { href: '/coach', label: 'Coach' },
      { href: '/author', label: 'Author' },
      { href: '/speaker', label: 'Speaker' },
      { href: '/about', label: 'About' },
      { href: '/how-it-works', label: 'How it works' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { href: '/projects', label: 'Projects' },
      { href: '/case-studies', label: 'Case studies' },
      { href: '/works', label: 'Authored works' },
      { href: '/resources', label: 'Blog and resources' },
      { href: '/contact', label: 'Contact' },
    ],
  },
] as const
