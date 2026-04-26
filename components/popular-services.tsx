import Link from "next/link";
import {
  Car,
  FileBadge,
  FileX2,
  MapPinned,
  IdCard,
  Banknote,
  Headset,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  rc: Car,
  dl: IdCard,
  noc: FileBadge,
  address: MapPinned,
  duplicate: FileX2,
  hp: Banknote,
  consult: Headset,
};

export function PopularServices() {
  return (
    <section className="container py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Popular services</h2>
          <p className="mt-2 max-w-xl text-slate-600">
            Fixed fees. Transparent timelines. Done by experts. Pick what you need below.
          </p>
        </div>
        <Link href="/services" className="hidden text-sm font-semibold text-primary hover:underline sm:block">
          View all →
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => {
          const Icon = ICONS[s.category] ?? Car;
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group card-elevated flex flex-col"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <Badge variant="muted">{s.timeline}</Badge>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-primary">
                {s.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{s.blurb}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-slate-500">Starts at</span>
                <span className="text-base font-bold text-slate-900">
                  {formatINR(s.priceFrom)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
