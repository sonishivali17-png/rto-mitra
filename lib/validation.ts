/**
 * Tiny client-side validators used by forms for inline errors.
 * Server still re-validates with zod.
 */

export const PHONE_RE = /^[+\d][\d\s-]{8,14}\d$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(v: string) {
  const t = v.trim();
  if (t.length < 2) return "Please enter your full name.";
  if (t.length > 80) return "Name is too long.";
  return null;
}

export function validatePhone(v: string) {
  const t = v.trim();
  if (!t) return "WhatsApp number is required.";
  if (!PHONE_RE.test(t)) return "Enter a valid phone number with country code.";
  return null;
}

export function validateEmail(v: string, required = false) {
  const t = v.trim();
  if (!t) return required ? "Email is required." : null;
  if (!EMAIL_RE.test(t)) return "Enter a valid email address.";
  return null;
}

export function validateMessage(v: string, min = 2) {
  const t = v.trim();
  if (t.length < min) return "Please add a few more details.";
  return null;
}

/** Returns the first error from a record, or null if all clean. */
export function firstError(errs: Record<string, string | null>) {
  for (const k of Object.keys(errs)) if (errs[k]) return errs[k];
  return null;
}
