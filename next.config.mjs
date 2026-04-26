/** @type {import('next').NextConfig} */

// CSP — strict-but-practical for our actual deps:
// Razorpay checkout, Google fonts, Plausible, GA4, Supabase, Anthropic.
// `unsafe-inline` is unfortunately needed for Razorpay's checkout iframe and
// Next.js inlined chunk runtime; revisit with nonces when you self-host fonts.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://www.googletagmanager.com https://plausible.io",
  "connect-src 'self' https://api.razorpay.com https://lumberjack.razorpay.com https://*.supabase.co https://api.anthropic.com https://www.google-analytics.com https://plausible.io",
  "frame-src 'self' https://api.razorpay.com https://www.google.com https://maps.google.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: { optimizePackageImports: ["lucide-react"] },

  async headers() {
    const security = [
      { key: "Content-Security-Policy", value: csp },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(self \"https://checkout.razorpay.com\")" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
    ];
    return [
      // Static assets — long cache
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/(favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|icon|apple-icon)",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
      },
      // Don't cache or index private pages
      {
        source: "/(dashboard|admin|pay|api)/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      // Site-wide
      { source: "/(.*)", headers: security },
    ];
  },
};

export default nextConfig;
