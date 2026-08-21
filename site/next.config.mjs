/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/works', destination: '/books', permanent: true },
      { source: '/works/brave-series', destination: '/books/brave-together', permanent: true },
      { source: '/works/:slug', destination: '/books/:slug', permanent: true },
      { source: '/coaching', destination: '/brave-purpose-author-method', permanent: true },
      {
        source: '/coaching/the-brave-purpose-author-method',
        destination: '/brave-purpose-author-method',
        permanent: true,
      },
      { source: '/coaching/session-zero', destination: '/contact', permanent: false },
    ]
  },
}

export default nextConfig
