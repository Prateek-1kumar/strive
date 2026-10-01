"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
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

const rows: Record<PanelId, { href: string; lead?: string; title: string; text: string }[]> = {
  model: stages.map((s) => ({ href: "#model", lead: s.age, title: s.title, text: s.text })),
  currently: cards.map((c) => ({ href: "#currently", title: c.title, text: c.text })),
};

function Panel({ id, onPick }: { id: PanelId; onPick: () => void }) {
  const items = rows[id];
  return (
    <div className={`grid gap-2 p-3 ${id === "model" ? "grid-cols-5" : "grid-cols-3"}`}>
      {items.map((it) => (
        <a
          key={it.title}
          href={it.href}
          onClick={onPick}
          className="group flex min-h-[120px] flex-col rounded-lg border border-white/[0.07] bg-white/[0.02] p-3.5 transition-colors duration-300 hover:border-gold/40 hover:bg-white/[0.06]"
        >
          {it.lead && <span className="font-serif text-lg leading-none text-gold">{it.lead}</span>}
          <span className={`${it.lead ? "mt-2.5" : ""} font-serif text-base leading-snug text-offwhite`}>{it.title}</span>
          <span className="mt-1.5 text-[11px] leading-snug text-offwhite/50 transition-colors group-hover:text-offwhite/70">
            {it.text}
          </span>
        </a>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState<PanelId | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<PanelId | null>(null);
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

  return (
    <header className="sticky top-0 z-50 bg-navy text-offwhite">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#hero" aria-label="Strive, home">
          <Logo />
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
                  <Panel id={open} onPick={() => setOpen(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#cta"
            className="group flex items-center gap-1.5 bg-gold px-4 py-2 text-[13px] font-medium text-navy transition-colors duration-300 hover:bg-offwhite"
          >
            Work With Strive
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
            className="grid size-9 place-items-center border border-white/15 xl:hidden"
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
            className="overflow-hidden border-t border-white/10 bg-navy xl:hidden"
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
                        {rows[n.panel].map((it) => (
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
