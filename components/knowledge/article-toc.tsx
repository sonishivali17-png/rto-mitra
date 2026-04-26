"use client";

import { useEffect, useState } from "react";

export function ArticleToc({ markdown }: { markdown: string }) {
  const [items, setItems] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    const lines = markdown.split(/\n/);
    const toc = lines
      .filter((l) => /^##?\s/.test(l))
      .map((l) => {
        const level = l.startsWith("## ") ? 2 : 3;
        const text = l.replace(/^#{2,3}\s/, "").trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        return { id, text, level };
      });
    setItems(toc);
  }, [markdown]);

  if (!items.length) return null;
  return (
    <nav aria-label="Table of contents" className="rounded-2xl border bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.id} className={it.level === 3 ? "pl-4" : ""}>
            <a href={`#${it.id}`} className="text-slate-700 hover:text-primary">
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
