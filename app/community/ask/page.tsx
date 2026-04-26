"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { FORUM_CATEGORIES } from "@/data/forum-seed";

export default function AskPage() {
  const [posted, setPosted] = useState(false);

  if (posted) {
    return (
      <section className="container py-16">
        <div className="mx-auto max-w-xl rounded-2xl border bg-emerald-50 p-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Question submitted</h1>
          <p className="mt-2 text-slate-700">Our team will review and post it on the community within a few hours.</p>
          <Link href="/community" className="mt-4 inline-block text-primary hover:underline">
            ← Back to community
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Community", href: "/community" },
          { label: "Ask" },
        ]} />
        <h1 className="mt-8 text-3xl font-bold text-slate-900">Ask the community</h1>
        <p className="mt-2 max-w-xl text-slate-600">
          Be specific. Mention your state, RTO, vehicle type and what you've already tried.
        </p>
      </section>
      <section className="container max-w-2xl pb-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: POST to /api/forum/questions (Supabase)
            setPosted(true);
          }}
          className="mt-6 space-y-4 rounded-2xl border bg-white p-6 ring-soft"
        >
          <div className="space-y-1.5">
            <Label htmlFor="title">Question title</Label>
            <Input id="title" name="title" required maxLength={140} placeholder="e.g., HP removal stuck for 30 days at GJ-1" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Select id="category" name="category" required defaultValue="">
              <option value="" disabled>Pick a category</option>
              {FORUM_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="body">Describe your situation</Label>
            <Textarea id="body" name="body" required rows={6} placeholder="Be specific — RTO, dates, what's stuck, what you've tried…" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" name="tags" placeholder="rc-transfer, ahmedabad, gj-1" />
          </div>
          <Button type="submit" className="w-full">Post question</Button>
          <p className="text-xs text-slate-500">All questions are moderated for safety and accuracy.</p>
        </form>
      </section>
    </>
  );
}
