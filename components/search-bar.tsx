"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar({ placeholder = "Search RC transfer, NOC, DL renewal…" }: { placeholder?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    router.push(`/knowledge?q=${encodeURIComponent(term)}`);
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full items-center gap-2 rounded-2xl border bg-white p-2 shadow-sm ring-1 ring-slate-100"
    >
      <div className="flex flex-1 items-center gap-2 px-2">
        <Search className="h-5 w-5 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
      <Button type="submit" size="sm">Search</Button>
    </form>
  );
}
