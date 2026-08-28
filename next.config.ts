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
      // Keep old Journal links alive after the rename to Resources.
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/:slug*", destination: "/resources/:slug*", permanent: true },
      // Route rename 2026-08-23: /coaching -> /coach and /speak -> /speaker, so
      // every nav label now matches its path. Both old routes 301 to the new
      // ones, with a :path* pair in case either ever grows children.
      { source: "/coaching", destination: "/coach", permanent: true },
      { source: "/coaching/:path*", destination: "/coach/:path*", permanent: true },
      { source: "/speak", destination: "/speaker", permanent: true },
      { source: "/speak/:path*", destination: "/speaker/:path*", permanent: true },
      // Older aliases. These point at the FINAL destination, not at /speak or
      // /coaching, so no visitor and no crawler ever takes two hops: a redirect
      // chain leaks link equity and Google gives up after five.
      { source: "/portfolio", destination: "/speaker", permanent: true },
      { source: "/speaking", destination: "/speaker", permanent: true },
      { source: "/subscription", destination: "/coach", permanent: true },
      // The standalone Brave & Bold conference case study was folded into the
      // Leeward Community Church story on 2026-08-28. Keep the old URL alive.
      {
        source: "/case-studies/brave-bold-conference-nov-2025",
        destination: "/case-studies/leeward-community-church",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
