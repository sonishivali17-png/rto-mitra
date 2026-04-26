/**
 * Tiny analytics helper. Fires GA4 + Plausible events from anywhere on the
 * client. Safe no-ops if libs aren't loaded (e.g. user declined consent).
 */
export type AnalyticsEvent =
  | "lead_submit"
  | "contact_submit"
  | "ai_message_sent"
  | "whatsapp_click"
  | "service_view"
  | "article_view"
  | "knowledge_search"
  | "ai_assistant_view"
  | "razorpay_open"
  | "payment_success"
  | "payment_failed"
  | "consent_accepted";

export function trackEvent(name: AnalyticsEvent, props?: Record<string, string | number | boolean | undefined>) {
  if (typeof window === "undefined") return;

  try {
    // GA4
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", name, props ?? {});
    }
  } catch { /* ignore */ }

  try {
    // Plausible
    const plausible = (window as any).plausible;
    if (typeof plausible === "function") {
      plausible(name, { props });
    }
  } catch { /* ignore */ }
}
