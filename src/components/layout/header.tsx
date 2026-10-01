"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cards } from "@/components/sections/currently/cards";
import { stages } from "@/components/sections/model/stages";
import { Logo } from "./logo";

type PanelId = "model" | "currently";
type NavItem = { label: string; href: string; panel?: PanelId };

const nav: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "The Idea", href: "#idea" },
  { label: "The Strive Model", href: "#model", panel: "model" },
  { label: "Currently", href: "#currently", panel: "currently" },
  { label: "Journal", href: "#journal" },
];

const NOTCH = "#0c3159"; // lighter navy hanging from the top strip
const closedH = 52;

const mobileRows: Record<PanelId, { href: string; lead?: string; title: string }[]> = {
  model: stages.map((s) => ({ href: "#model", lead: s.age, title: s.title })),
  currently: cards.map((c) => ({ href: "#currently", title: c.title })),
};

// The five layers as one connected line; the left side previews whichever layer is hovered.
function ModelPanel({ onPick }: { onPick: () => void }) {
  const [active, setActive] = useState(0);
  const cur = stages[active];
  return (
    <div className="grid grid-cols-[220px_1fr] gap-8 p-6">
      <div key={cur.slug} className="animate-[fade_.25s_ease-out]">
        <p className="font-serif text-4xl leading-none text-gold">{cur.age}</p>
        <p className="mt-4 font-serif text-lg leading-snug text-offwhite">{cur.title}</p>
        <p className="mt-2 text-xs leading-relaxed text-offwhite/55">{cur.text}</p>
      </div>
      <ol className="relative">
        <span aria-hidden="true" className="absolute bottom-4 left-[5px] top-4 w-px bg-white/10" />
        {stages.map((s, i) => (
          <li key={s.slug}>
            <a
              href="#model"
              onClick={onPick}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative flex items-center gap-4 rounded-md py-2.5 pl-7 pr-3 transition-colors duration-300 hover:bg-white/[0.05]"
            >
              <span
                className={`absolute left-0 size-[11px] rounded-full border border-gold/70 transition-colors duration-300 ${i === active ? "bg-gold" : "bg-[#0c3159]"}`}
              />
              <span className="w-28 shrink-0 font-serif text-sm text-gold/90">{s.age}</span>
              <span className="text-sm text-offwhite/85 transition-colors group-hover:text-offwhite">{s.title}</span>
              <ArrowRight className="ml-auto size-3.5 -translate-x-1 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CurrentlyPanel({ onPick }: { onPick: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {cards.map((c) => (
        <a
          key={c.id}
          href="#currently"
          onClick={onPick}
          className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-white/[0.06]"
        >
          <div className={`relative h-24 overflow-hidden bg-white/5`}>
            <Image
              src={`/cards/${c.id}.jpg`}
              alt=""
              fill
              sizes="220px"
              className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-3.5">
            <span className="font-serif text-base leading-snug text-offwhite">{c.title}</span>
            <span className="mt-1.5 text-[11px] leading-relaxed text-offwhite/55 transition-colors group-hover:text-offwhite/75">{c.text}</span>
            <span className="mt-3 flex items-center gap-1 text-[11px] font-medium text-gold">
              {c.cta}
              <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState<PanelId | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<PanelId | null>(null);
  const [onLight, setOnLight] = useState(false);
  const notch = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const away = (e: MouseEvent) => notch.current && !notch.current.contains(e.target as Node) && setOpen(null);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(null), setMobile(false));
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  // Logo has no backdrop, so flip its colours by sampling the background behind it.
  useEffect(() => {
    const sample = () => {
      const el = document.elementsFromPoint(Math.max(24, (window.innerWidth - 1152) / 2 + 80), 32).find((e) => !e.closest("header"));
      for (let n: Element | null = el ?? null; n; n = n.parentElement) {
        const m = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
        if (m && (m.length < 4 || +m[3] > 0.5)) {
          setOnLight((+m[0] * 299 + +m[1] * 587 + +m[2] * 114) / 1000 > 150);
          return;
        }
      }
    };
    sample();
    window.addEventListener("scroll", sample, { passive: true });
    window.addEventListener("resize", sample);
    return () => {
      window.removeEventListener("scroll", sample);
      window.removeEventListener("resize", sample);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 -mb-16 text-offwhite">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#hero" aria-label="Strive, home" >
          <Logo dark={onLight} />
        </a>

        {/* desktop notch */}
        <div
          ref={notch}
          className="absolute left-1/2 top-0 hidden w-[680px] -translate-x-1/2 xl:block"
          style={{ filter: "drop-shadow(0 14px 22px rgba(0,0,0,.28))" }}
        >
          {[
            { side: "-left-[18px]", d: "M20 20 L20 0 L0 0 C11.046 0 20 11.046 20 20Z" },
            { side: "-right-[18px]", d: "M0 0 L20 0 C8.954 0 0 8.954 0 20Z" },
          ].map((c) => (
            <svg key={c.side} viewBox="0 0 20 20" className={`pointer-events-none absolute top-0 h-5 w-5 ${c.side}`} aria-hidden="true">
              <path d={c.d} fill={NOTCH} />
            </svg>
          ))}
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : closedH }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden rounded-b-2xl"
            style={{ backgroundColor: NOTCH }}
          >
            <nav className="flex h-[52px] items-center justify-center gap-1 text-[13px] font-medium text-offwhite/70" aria-label="Primary">
              {nav.map((n) =>
                n.panel ? (
                  <button
                    key={n.label}
                    type="button"
                    aria-expanded={open === n.panel}
                    onClick={() => setOpen(open === n.panel ? null : n.panel!)}
                    className={`flex items-center gap-1 rounded-md px-3 py-1.5 outline-none transition-colors hover:text-offwhite focus-visible:text-offwhite ${open === n.panel ? "bg-white/10 text-offwhite" : ""}`}
                  >
                    {n.label}
                    <ChevronDown className={`size-3.5 opacity-70 transition-transform duration-300 ${open === n.panel ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <a key={n.label} href={n.href} onClick={() => setOpen(null)} className="rounded-md px-3 py-1.5 transition-colors hover:text-offwhite">
                    {n.label}
                  </a>
                ),
              )}
            </nav>
            <AnimatePresence mode="wait" initial={false}>
              {open && (
                <motion.div
                  key={open}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="border-t border-white/[0.08]"
                >
                  {open === "model" ? <ModelPanel onPick={() => setOpen(null)} /> : <CurrentlyPanel onPick={() => setOpen(null)} />}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#cta"
            className="group flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-[13px] font-medium text-navy transition-colors duration-300 hover:bg-offwhite"
          >
            Work With Strive
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
            className="grid size-9 place-items-center border border-white/15 bg-navy xl:hidden"
          >
            {mobile ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-navy xl:hidden"
          >
            <div className="mx-auto grid max-w-6xl gap-1 px-6 py-4">
              {nav.map((n) =>
                n.panel ? (
                  <div key={n.label}>
                    <button
                      type="button"
                      onClick={() => setMobilePanel(mobilePanel === n.panel ? null : n.panel!)}
                      className="flex w-full items-center justify-between px-1 py-2.5 text-left text-offwhite/80"
                    >
                      {n.label}
                      <ChevronDown className={`size-4 transition-transform ${mobilePanel === n.panel ? "rotate-180" : ""}`} />
                    </button>
                    {mobilePanel === n.panel && (
                      <div className="mb-2 grid gap-1 border-l border-white/10 pl-4">
                        {mobileRows[n.panel].map((it) => (
                          <a key={it.title} href={it.href} onClick={() => setMobile(false)} className="py-1.5 text-sm text-offwhite/60">
                            {it.lead ? `${it.lead} · ` : ""}
                            {it.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a key={n.label} href={n.href} onClick={() => setMobile(false)} className="px-1 py-2.5 text-offwhite/80">
                    {n.label}
                  </a>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
