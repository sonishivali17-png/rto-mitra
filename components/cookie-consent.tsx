"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const COOKIE_NAME = "rto-consent";

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.split("=")[1];
}

function setCookie(name: string, value: string, days: number) {
  const exp = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${exp}; path=/; samesite=lax`;
}

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!readCookie(COOKIE_NAME)) {
      const t = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    setCookie(COOKIE_NAME, "1", 365);
    setShow(false);
    window.dispatchEvent(new CustomEvent("rto:consent-accepted"));
    // Note: analytics scripts are not yet loaded at this exact moment, so
    // this event may be dropped — but the next page-view will track normally.
    trackEvent("consent_accepted");
  }
  function decline() {
    setCookie(COOKIE_NAME, "0", 30);
    setShow(false);
  }

  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border bg-white p-4 shadow-2xl ring-1 ring-slate-100 sm:items-center">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Cookie className="h-5 w-5" />
      </span>
      <p className="flex-1 text-sm text-slate-700">
        We use cookies to improve your experience and measure traffic.{" "}
        <a href="/privacy" className="text-primary hover:underline">Learn more</a>.
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={decline}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
