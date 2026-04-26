import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StickyButtons } from "@/components/sticky-buttons";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SkipLink } from "@/components/skip-link";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";

// Defer non-essential UI: cookie banner, analytics scripts, social-proof toaster.
const CookieConsent = dynamic(() => import("@/components/cookie-consent").then((m) => m.CookieConsent));
const Analytics = dynamic(() => import("@/components/analytics").then((m) => m.Analytics));
const SocialProofToaster = dynamic(() => import("@/components/social-proof-toaster").then((m) => m.SocialProofToaster));

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const baseMeta: Metadata = buildMetadata({
  title: "RTO Mitra — India's Smart Vehicle Help Platform",
  description:
    "All RTO help in one place — guides, AI assistance, community and end-to-end paid help for RC transfer, hypothecation removal, duplicate RC, NOC, address change, DL renewal and more.",
  path: "/",
});

const verification: Record<string, string | string[]> = {};
if (process.env.NEXT_PUBLIC_GSC_VERIFICATION) verification.google = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
if (process.env.NEXT_PUBLIC_BING_VERIFICATION) verification.other = ["msvalidate.01=" + process.env.NEXT_PUBLIC_BING_VERIFICATION];

export const metadata: Metadata = {
  ...baseMeta,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/apple-icon", sizes: "180x180" }],
    shortcut: [{ url: "/icon" }],
  },
  ...(Object.keys(verification).length ? { verification } : {}),
};

export const viewport: Viewport = {
  themeColor: "#1d4ed8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${display.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://checkout.razorpay.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Bing site verification (Next's `verification.other` works for Google's tag, but Bing requires this exact format) */}
        {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
        )}
      </head>
      <body className="min-h-screen bg-background font-sans pb-16 md:pb-0">
        <SkipLink />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <StickyButtons />
        <MobileBottomNav />
        <SocialProofToaster />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
