import { Clock } from "lucide-react";
import Link from "next/link";

export function UrgencyBanner() {
  return (
    <section className="container">
      <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 sm:flex-row sm:p-5">
        <div className="flex items-center gap-3 text-sm">
          <Clock className="h-5 w-5" />
          <p>
            <strong>Today only:</strong> Free document pre-check (worth ₹299) on every new RC Transfer / HP Removal booking.
          </p>
        </div>
        <Link
          href="/services"
          className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
        >
          Claim now →
        </Link>
      </div>
    </section>
  );
}
