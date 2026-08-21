import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Org logos include trusted local SVG wordmarks under /org-logos.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      // -------------------------------------------------------------
      // WordPress -> Next.js path map (301, permanent).
      // Source paths pulled from website-dam/05-current-site-archive/.
      // -------------------------------------------------------------

      // Old "about" page (WP served with trailing slash).
      { source: "/about/", destination: "/about", permanent: true },

      // Old "books-2" (WP renamed books to books-2 when the original slug
      // was taken by a nav menu). Point at the new /works catalog.
      { source: "/books-2", destination: "/works", permanent: true },
      { source: "/books-2/", destination: "/works", permanent: true },
      { source: "/books", destination: "/works", permanent: true },
      { source: "/books/", destination: "/works", permanent: true },

      // Old contact page trailing slash.
      { source: "/contact/", destination: "/contact", permanent: true },

      // Old blog -> new resources.
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/", destination: "/resources", permanent: true },
      { source: "/blog/:slug*", destination: "/resources/:slug*", permanent: true },

      // Standalone WordPress book campaign pages.
      { source: "/the-great-dance", destination: "/works/dancing-with-father", permanent: true },
      { source: "/the-great-dance/", destination: "/works/dancing-with-father", permanent: true },
      { source: "/the-mantle", destination: "/works/birth-of-explicit-movement", permanent: true },
      { source: "/the-mantle/", destination: "/works/birth-of-explicit-movement", permanent: true },
      { source: "/dreaming-big", destination: "/works/dream-big-journal-curriculum", permanent: true },
      { source: "/dreaming-big/", destination: "/works/dream-big-journal-curriculum", permanent: true },

      // Coaching offer lives at /coaching; keep the old /subscription path alive.
      { source: "/subscription", destination: "/coaching", permanent: true },

      // WordPress admin, feed, and legacy paths -> home / resources.
      { source: "/wp-admin", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/wp-content/:path*", destination: "/", permanent: true },
      { source: "/feed", destination: "/resources", permanent: true },
      { source: "/feed/", destination: "/resources", permanent: true },
      { source: "/comments/feed", destination: "/resources", permanent: true },
      { source: "/comments/feed/", destination: "/resources", permanent: true },
    ];
  },
};

export default nextConfig;
