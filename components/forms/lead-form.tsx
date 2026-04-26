"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { STATES } from "@/lib/constants";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { validateName, validatePhone, validateEmail, validateMessage } from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";

type Errs = Record<"name" | "phone" | "email" | "message", string | null>;

const EMPTY_ERRS: Errs = { name: null, phone: null, email: null, message: null };

export function LeadForm({
  serviceSlug,
  serviceTitle,
}: {
  serviceSlug: string;
  serviceTitle: string;
}) {
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "err">("idle");
  const [errs, setErrs] = useState<Errs>(EMPTY_ERRS);
  const [serverErr, setServerErr] = useState<string | null>(null);

  function validateField(name: keyof Errs, value: string) {
    let msg: string | null = null;
    if (name === "name") msg = validateName(value);
    if (name === "phone") msg = validatePhone(value);
    if (name === "email") msg = validateEmail(value, false);
    if (name === "message") msg = validateMessage(value, 0);
    setErrs((e) => ({ ...e, [name]: msg }));
    return msg;
  }

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
      message: null,
    };
    setErrs(next);
    if (Object.values(next).some(Boolean)) return;

    setState("submitting");
    setServerErr(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, serviceSlug }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? "Could not submit");
      }
      setState("ok");
      trackEvent("lead_submit", { service: serviceSlug, city: data.city });
      form.reset();
    } catch (err) {
      setState("err");
      setServerErr((err as Error).message);
    }
  }

  if (state === "ok") {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border bg-emerald-50 p-6 text-emerald-800 animate-fade-in-up">
        <div className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="h-5 w-5" /> Got it!
        </div>
        <p className="mt-1 text-sm">Our team will WhatsApp you in a few minutes with a quote and the next steps.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4 rounded-2xl border bg-white p-6 ring-soft"
      aria-label={`Get a free quote for ${serviceTitle}`}
    >
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">Get a free quote</h3>
        <p className="text-sm text-slate-600">
          For: <span className="font-medium text-slate-800">{serviceTitle}</span>
        </p>
      </div>

      {/* Honeypot — visually hidden but available to bots */}
      <div aria-hidden="true" className="sr-only">
        <label>
          Company URL
          <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="lead-name">Name</Label>
          <Input
            id="lead-name"
            name="name"
            required
            minLength={2}
            autoComplete="name"
            aria-invalid={!!errs.name}
            aria-describedby={errs.name ? "lead-name-err" : undefined}
            onBlur={(e) => validateField("name", e.target.value)}
          />
          {errs.name && <p id="lead-name-err" className="text-xs text-red-600">{errs.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-phone">WhatsApp number</Label>
          <Input
            id="lead-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 9XXXXXXXXX"
            aria-invalid={!!errs.phone}
            aria-describedby={errs.phone ? "lead-phone-err" : undefined}
            onBlur={(e) => validateField("phone", e.target.value)}
          />
          {errs.phone && <p id="lead-phone-err" className="text-xs text-red-600">{errs.phone}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="lead-city">City</Label>
          <Input
            id="lead-city"
            name="city"
            placeholder="Ahmedabad"
            autoComplete="address-level2"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-state">State</Label>
          <Select id="lead-state" name="state" defaultValue="Gujarat" autoComplete="address-level1">
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lead-message">Tell us briefly about your case</Label>
        <Textarea id="lead-message" name="message" rows={3} />
      </div>

      <Button type="submit" disabled={state === "submitting"} className="w-full">
        {state === "submitting" ? "Sending…" : "Get a quote"}
      </Button>

      {state === "err" && (
        <p role="alert" className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {serverErr ?? "Something went wrong. Please WhatsApp us instead."}
        </p>
      )}
      <p className="text-xs text-slate-500">
        By submitting, you agree to be contacted by RTO Mitra on WhatsApp or phone.
      </p>
    </form>
  );
}
