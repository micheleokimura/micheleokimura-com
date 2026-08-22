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
      // The speaking page moved from the /portfolio stub to /speak. Case-study
      // markdown also links to /speaking, so both aliases land on the real page.
      { source: "/portfolio", destination: "/speak", permanent: true },
      { source: "/speaking", destination: "/speak", permanent: true },
      // The coaching offer lives at /coaching; keep the old /subscription path alive.
      { source: "/subscription", destination: "/coaching", permanent: true },
    ];
  },
};

export default nextConfig;
