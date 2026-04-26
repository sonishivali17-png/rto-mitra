"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string | React.ReactNode };

export function Accordion({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border bg-white">
      {items.map((it, i) => (
        <AccordionItem key={i} item={it} />
      ))}
    </div>
  );
}

function AccordionItem({ item }: { item: Item }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="px-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-slate-900"
        aria-expanded={open}
      >
        <span>{item.q}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-slate-500 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="pb-5 text-sm leading-relaxed text-slate-700 animate-fade-in">
          {item.a}
        </div>
      )}
    </div>
  );
}
