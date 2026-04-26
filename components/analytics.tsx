"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * Mounts GA4 + Plausible only after user consent. Reads env at build time:
 * - NEXT_PUBLIC_GA_ID            (e.g. G-XXXXXXX)
 * - NEXT_PUBLIC_PLAUSIBLE_DOMAIN (e.g. rtomitra.in)
 *
 * Consent is stored in cookie `rto-consent=1` for 365 days.
 */
export function Analytics() {
  const [consent, setConsent] = useState<boolean | null>(null);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  useEffect(() => {
    const has = document.cookie.includes("rto-consent=1");
    setConsent(has);
    const onAccept = () => setConsent(true);
    window.addEventListener("rto:consent-accepted", onAccept);
    return () => window.removeEventListener("rto:consent-accepted", onAccept);
  }, []);

  if (consent !== true) return null;

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
      {plausibleDomain && (
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={plausibleDomain}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
