"use client";

import { useEffect, useRef } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Server-rendered pages can't fire client-side events directly. Drop this
 * tiny client component into a server page to log a single pageview-style
 * event when the route mounts. StrictMode-safe (fires once even in dev).
 */
export function TrackPageView({
  event,
  props,
}: {
  event: AnalyticsEvent;
  props?: Record<string, string | number | boolean | undefined>;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackEvent(event, props);
  }, [event, props]);
  return null;
}
