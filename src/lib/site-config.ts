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

const SITE_URL = 'https://micheleokimura.com'

/**
 * Origin that social card images and schema images are served from.
 *
 * og:image has to be an absolute URL, and the scraper fetches it directly, so
 * it has to name a host that actually holds the file. micheleokimura.com is
 * still the old WordPress site on WP Engine, so anything under it comes back
 * 404 and the card renders blank, which is the exact failure this is meant to
 * fix. VERCEL_URL is the deployment's own hostname and always serves the build
 * the tag was generated in.
 *
 * Only images go through this. Canonicals, og:url and the schema @ids stay on
 * siteConfig.url, because those are identity and have to keep pointing at the
 * real domain. When DNS moves to Vercel, this can collapse back to
 * siteConfig.url.
 */
export const imageOrigin = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : SITE_URL

export const siteConfig = {
  brand: 'Michele Okimura',
  shortBrand: 'Michele Okimura',
  domain: 'micheleokimura.com',
  url: SITE_URL,
  email: 'michele@micheleokimura.com',
  /**
   * Sitewide Open Graph / Twitter card image AND the `image` on Michele's
   * Person schema, so it is the picture an answer engine attaches to her.
   *
   * A purpose-built 1200x630 card, built by scripts/build-og-card.swift from
   * scripts/og-card.html. Edit the HTML and re-run the script to change it.
   *
   * It replaced the 2023 Outstanding Advocate snapshot, which was the wrong
   * picture twice over: it is a square casual photo of Michele AND Rob, and the
   * State of Hawai'i seal on his cap is what iMessage kept pulling out and
   * showing as the preview for links to this site.
   */
  ogImage: '/og-image.jpg',
  /**
   * A clean photograph of Michele, with no card furniture over it. This is what
   * her Person entity points at, because an answer engine drawing a knowledge
   * panel wants her face, and `ogImage` is a composed card with type on it.
   *
   * The 6000x4000 original it was resized from sits next to it as
   * michele-headshot-og-source.jpg, and is also what the OG card is built from.
   */
  headshot: '/images/press-kit/michele-okimura-headshot.jpg',
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
  /**
   * THIS AWARD IS THE ORGANIZATION'S, NOT MICHELE'S. Releasing Generations
   * received it; Explicit Movement, which releasinggenerations.org credits, is
   * a DBA of Releasing Generations rather than a separate body, so both names
   * point at the same legal entity. Michele led the organization that won it
   * and does not claim it personally.
   *
   * `awardRecipient` is here so the fact travels with the fields rather than
   * living in someone's memory. Nothing currently reads these (the home hero
   * uses HERO.award in home-variants.ts, the graph uses schema.ts, and /about
   * uses credentials.ts), but they read like a personal credential, and the
   * next person to wire them into a bio would reintroduce the misattribution.
   * If you use them, name the recipient.
   */
  award: 'Outstanding Advocate for Children and Youth of Hawai\'i (2023)',
  awardRecipient: 'Releasing Generations, led by Michele Okimura',
  awardIssuer: 'State of Hawai\'i, in honor of Children and Youth Day 2023',
  awardConferredBy: 'Governor Josh Green and Mayor Rick Blangiardi',
  awardFor: 'work with the young people of Hawai\'i and the creation of the Brave Series',
  /**
   * A `null` here means "we do not have the handle yet". The footer skips any
   * social whose URL is null rather than guessing one, so an unfilled entry
   * costs a missing icon and never a link to a stranger's account.
   *
   * ############ PLACEHOLDER: substack and youtube ############
   * Michele asked for both icons in the footer on 2026-08-23 and said to use
   * placeholders if the handles were not already in the repo. They are not.
   * Put the real profile URLs in and the icons appear on their own; nothing
   * else needs touching.
   * ###########################################################
   */
  socials: {
    linkedin: 'https://www.linkedin.com/in/michele-okimura-36861951',
    facebook: 'https://www.facebook.com/michele.okimura',
    instagram: 'https://www.instagram.com/michele_okimura/',
    substack: null as string | null,
    youtube: null as string | null,
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
 * Order is Speaker, Author, Coach. The OG card in scripts/og-card.html and the
 * sitewide meta title in layout.tsx follow the same order, so the nav, the
 * social card and the link-preview title all read alike.
 *
 * Everything else lives in the footer. See `footerColumns` below.
 */
export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/speaker', label: 'Speaker' },
  { href: '/author', label: 'Author' },
  { href: '/coach', label: 'Coach' },
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
      { href: '/speaker', label: 'Speaker' },
      { href: '/author', label: 'Author' },
      { href: '/coach', label: 'Coach' },
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
