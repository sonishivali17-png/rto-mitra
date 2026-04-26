import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * PWA-style web manifest. Icon paths point to Next.js metadata routes
 * (`app/icon.tsx` → /icon, `app/apple-icon.tsx` → /apple-icon) which return
 * dynamically rendered PNGs.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "RTO Mitra",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1d4ed8",
    lang: "en-IN",
    orientation: "portrait",
    categories: ["business", "productivity", "utilities"],
    icons: [
      // Single 192 source (Next OG renders dynamically). Browsers / installers
      // will up-scale where needed.
      { src: "/icon", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
