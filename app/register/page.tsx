"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) throw error;
      setOk(true);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (ok) {
    return (
      <section className="container grid min-h-[80vh] place-items-center py-10">
        <div className="max-w-md rounded-2xl border bg-emerald-50 p-8 text-center text-emerald-800">
          <h1 className="text-xl font-bold">Check your email</h1>
          <p className="mt-2 text-sm">We've sent you a confirmation link to verify your account.</p>
          <Link href="/login" className="mt-4 inline-block text-emerald-900 underline">Go to login</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container grid min-h-[80vh] items-center py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border bg-white p-8 ring-soft">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <h1 className="text-xl font-bold text-slate-900">Create your account</h1>
        </div>
        <p className="mt-1 text-sm text-slate-600">Track cases, save AI chats, and more.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already a member? <Link href="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </section>
  );
}
