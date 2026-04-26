"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Car,
  IdCard,
  FileBadge,
  MapPinned,
  FileX2,
  Banknote,
  Headset,
  Sparkles,
  Users,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/data/services";
import { KNOWLEDGE_CATEGORIES } from "@/data/knowledge-articles";
import { cn, whatsappLink } from "@/lib/utils";

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  rc: Car,
  dl: IdCard,
  noc: FileBadge,
  address: MapPinned,
  duplicate: FileX2,
  hp: Banknote,
  consult: Headset,
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleEnter(menu: string) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  }
  function handleLeave() {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-slate-200/70 bg-white/85 shadow-[0_1px_0_0_rgba(15,23,42,0.04)] backdrop-blur"
          : "border-b border-transparent bg-white/0 backdrop-blur-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary-700 to-primary-500 text-white">
            <ShieldCheck className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
          </span>
          <span>{SITE.name}<span className="ml-1 hidden text-xs font-medium text-slate-500 sm:inline">.in</span></span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={handleLeave}>
          <MenuTrigger
            label="Services"
            icon={<Car className="h-4 w-4" />}
            active={openMenu === "services"}
            onEnter={() => handleEnter("services")}
          />
          <MenuTrigger
            label="Knowledge"
            icon={<BookOpen className="h-4 w-4" />}
            active={openMenu === "knowledge"}
            onEnter={() => handleEnter("knowledge")}
          />
          <Link
            href="/community"
            onMouseEnter={() => handleEnter(null as any)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Users className="mr-1 inline h-4 w-4" /> Community
          </Link>
          <Link
            href="/ai-assistant"
            onMouseEnter={() => handleEnter(null as any)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Sparkles className="mr-1 inline h-4 w-4 text-primary-600" /> Ask AI
          </Link>
          <Link
            href="/track"
            onMouseEnter={() => handleEnter(null as any)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Track status
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <Link href="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
          <Link href="/services">
            <Button size="sm" className="relative overflow-hidden">
              <span className="relative z-10">Get started</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full" />
            </Button>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-slate-700 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Megamenu panels */}
      <div className="relative hidden lg:block" onMouseEnter={() => closeTimer.current && window.clearTimeout(closeTimer.current)} onMouseLeave={handleLeave}>
        {openMenu === "services" && <ServicesMegamenu />}
        {openMenu === "knowledge" && <KnowledgeMegamenu />}
      </div>

      {/* Mobile sheet */}
      <div className={cn("lg:hidden", open ? "block" : "hidden")}>
        <div className="container space-y-1 border-t border-slate-200 py-3">
          <MobileGroup label="Services">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                {s.shortTitle}<span className="text-xs text-slate-400">{s.timeline}</span>
              </Link>
            ))}
          </MobileGroup>
          <MobileGroup label="Knowledge">
            {KNOWLEDGE_CATEGORIES.slice(0, 8).map((c) => (
              <Link key={c.slug} href={`/knowledge/${c.slug}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">{c.label}</Link>
            ))}
          </MobileGroup>
          <Link href="/community" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100">Community</Link>
          <Link href="/ai-assistant" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100">Ask AI</Link>
          <Link href="/track" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100">Track status</Link>
          <div className="flex gap-2 pt-2">
            <Link href="/login" className="flex-1"><Button variant="outline" className="w-full">Log in</Button></Link>
            <Link href="/services" className="flex-1"><Button className="w-full">Get started</Button></Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuTrigger({
  label,
  icon,
  active,
  onEnter,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onEnter: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition",
        active ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      {icon} {label}
      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", active && "rotate-180")} />
    </button>
  );
}

function ServicesMegamenu() {
  return (
    <div className="absolute left-0 right-0 top-0 mx-auto max-w-5xl px-4">
      <div className="animate-fade-in-up overflow-hidden rounded-2xl border bg-white p-6 ring-soft">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = SERVICE_ICONS[s.category] ?? Car;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-slate-50"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-primary">{s.shortTitle}</p>
                  <p className="line-clamp-1 text-xs text-slate-500">{s.blurb}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3 text-sm">
          <span className="text-slate-600">Need a custom case? Get a free WhatsApp quote.</span>
          <Link href="/services" className="font-semibold text-primary hover:underline">See all services →</Link>
        </div>
      </div>
    </div>
  );
}

function KnowledgeMegamenu() {
  return (
    <div className="absolute left-0 right-0 top-0 mx-auto max-w-5xl px-4">
      <div className="animate-fade-in-up overflow-hidden rounded-2xl border bg-white p-6 ring-soft">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {KNOWLEDGE_CATEGORIES.slice(0, 12).map((c) => (
            <Link
              key={c.slug}
              href={`/knowledge/${c.slug}`}
              className="rounded-xl p-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-primary"
            >
              {c.label}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3 text-sm">
          <span className="text-slate-600">Read 100+ guides on RC, DL, NOC, FASTag, challan, tax & more.</span>
          <Link href="/knowledge" className="font-semibold text-primary hover:underline">All guides →</Link>
        </div>
      </div>
    </div>
  );
}

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [o, setO] = useState(false);
  return (
    <div className="rounded-lg">
      <button
        onClick={() => setO((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
      >
        {label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", o && "rotate-180")} />
      </button>
      {o && <div className="mt-1 space-y-0.5">{children}</div>}
    </div>
  );
}
