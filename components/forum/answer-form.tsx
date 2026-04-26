"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AnswerForm({ questionId }: { questionId: string }) {
  const [body, setBody] = useState("");
  const [posted, setPosted] = useState(false);

  if (posted) {
    return (
      <div className="rounded-2xl border bg-emerald-50 p-4 text-sm text-emerald-800">
        Thanks! Your answer is posted (demo). Wire up Supabase to persist.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!body.trim()) return;
        // TODO: POST to /api/forum/answers
        setPosted(true);
      }}
      className="space-y-3 rounded-2xl border bg-white p-5 ring-soft"
    >
      <h3 className="font-semibold text-slate-900">Your answer</h3>
      <Textarea
        rows={5}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={`Reply to question ${questionId}…`}
      />
      <div className="flex justify-end">
        <Button type="submit">Post answer</Button>
      </div>
    </form>
  );
}
