import Link from "next/link";
import { ShieldCheck, MessageCircle, Mail, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/data/services";
import { KNOWLEDGE_CATEGORIES } from "@/data/knowledge-articles";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white">
                <ShieldCheck className="h-4 w-4" />
              </span>
              {SITE.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-600">
              {SITE.tagline}. Trusted help for RC transfer, hypothecation removal, NOC,
              duplicate RC, DL renewal and more.
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" />{SITE.phone}</p>
              <p className="flex items-center gap-2"><MessageCircle className="h-4 w-4" />WhatsApp +{SITE.whatsapp}</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4" />{SITE.email}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Popular services</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {SERVICES.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-primary">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Knowledge hub</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {KNOWLEDGE_CATEGORIES.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={`/knowledge/${c.slug}`} className="hover:text-primary">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/community" className="hover:text-primary">Community</Link></li>
              <li><Link href="/ai-assistant" className="hover:text-primary">Ask RTO Mitra AI</Link></li>
              <li><Link href="/track" className="hover:text-primary">Track status</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved. RTO Mitra is an independent assistance platform — not a government body.</p>
          <p className="text-slate-400">{SITE.office}</p>
        </div>
      </div>
    </footer>
  );
}
