import type { NextConfig } from "next";

// Baseline security headers for every response (pages + API). The CSP itself is set per request in proxy.ts.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]
    : []),
];

const DOCS_CSP = [
  "default-src 'none'",
  "style-src 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data:",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  // Lets test builds use their own folder (NEXT_DIST_DIR=.next-test) so they never clash with `next dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Static docs pages (public/*.html): no scripts at all, only their own inline styles and Google Fonts.
      ...["/tech-doc", "/design-doc", "/tech-doc.html", "/design-doc.html"].map((source) => ({
        source,
        headers: [
          { key: "Content-Security-Policy", value: DOCS_CSP },
          // Shared by link only: keep them out of search results.
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      })),
    ];
  },
  async rewrites() {
    return [
      { source: "/tech-doc", destination: "/tech-doc.html" },
      { source: "/design-doc", destination: "/design-doc.html" },
    ];
  },
};

export default nextConfig;
