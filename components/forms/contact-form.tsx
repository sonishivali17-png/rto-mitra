"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { validateName, validatePhone, validateEmail, validateMessage } from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";

type Errs = Record<"name" | "phone" | "email" | "message", string | null>;

export function ContactForm() {
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);
  const [errs, setErrs] = useState<Errs>({ name: null, phone: null, email: null, message: null });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if ((fd.get("company_url") as string)?.length) return;

    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const next: Errs = {
      name: validateName(data.name ?? ""),
      phone: validatePhone(data.phone ?? ""),
      email: validateEmail(data.email ?? "", false),
      message: validateMessage(data.message ?? "", 2),
    };
    setErrs(next);
    if (Object.values(next).some(Boolean)) return;

    setState("submitting");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? "Failed");
      }
      setState("ok");
      trackEvent("contact_submit");
      form.reset();
    } catch (err) {
      setState("err");
      setError((err as Error).message);
    }
  }

  if (state === "ok") {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border bg-emerald-50 p-6 text-emerald-800 animate-fade-in-up">
        <div className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="h-5 w-5" /> Message sent
        </div>
        <p className="mt-1 text-sm">We'll get back to you within a few hours on WhatsApp or email.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4 rounded-2xl border bg-white p-6 ring-soft"
      aria-label="Contact RTO Mitra"
    >
      <div aria-hidden="true" className="sr-only">
        <label>
          Company URL <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">Your name</Label>
          <Input
            id="contact-name"
            name="name"
            required
            minLength={2}
            autoComplete="name"
            aria-invalid={!!errs.name}
            aria-describedby={errs.name ? "contact-name-err" : undefined}
          />
          {errs.name && <p id="contact-name-err" className="text-xs text-red-600">{errs.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-phone">WhatsApp number</Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 9XXXXXXXXX"
            aria-invalid={!!errs.phone}
            aria-describedby={errs.phone ? "contact-phone-err" : undefined}
          />
          {errs.phone && <p id="contact-phone-err" className="text-xs text-red-600">{errs.phone}</p>}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contact-email">Email (optional)</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={!!errs.email}
          aria-describedby={errs.email ? "contact-email-err" : undefined}
        />
        {errs.email && <p id="contact-email-err" className="text-xs text-red-600">{errs.email}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contact-message">How can we help?</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="Briefly describe your case…"
          aria-invalid={!!errs.message}
          aria-describedby={errs.message ? "contact-message-err" : undefined}
        />
        {errs.message && <p id="contact-message-err" className="text-xs text-red-600">{errs.message}</p>}
      </div>

      {state === "err" && (
        <p role="alert" className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" /> {error ?? "Something went wrong."}
        </p>
      )}
      <Button type="submit" disabled={state === "submitting"} className="w-full sm:w-auto">
        {state === "submitting" ? "Sending…" : "Send message"}
      </Button>
      <p className="text-xs text-slate-500">By submitting, you agree to be contacted by RTO Mitra on WhatsApp or phone.</p>
    </form>
  );
}
