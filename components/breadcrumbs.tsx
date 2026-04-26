import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {it.href && !last ? (
                <Link href={it.href} className="hover:text-primary">
                  {it.label}
                </Link>
              ) : (
                <span className={last ? "text-slate-900" : ""}>{it.label}</span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
