"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/links";
import { links, nav } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Quietly step aside while reading down; return the moment the reader scrolls up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 16);
    setHidden(y > 480 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: reduced ? 0 : 0.6, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          scrolled && !open ? "bg-paper/88 shadow-[0_1px_0_var(--rule)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="shell flex h-[4.25rem] items-center justify-between gap-8">
          <a href="#top" onClick={close} aria-label="Strive — back to the top" className="text-ink">
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-rule text-[0.875rem] text-ink/80 transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <ButtonLink href={links.contact} className="h-10 text-[0.875rem]">
              Work With Strive
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="relative z-10 flex items-center gap-3 py-2 text-[0.875rem] font-medium text-ink lg:hidden"
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-2.5 w-6">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-editorial ${
                  open ? "translate-y-[4.5px] rotate-[32deg]" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-editorial ${
                  open ? "-translate-y-[4.5px] -rotate-[32deg]" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduced ? 0 : 0.7, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-paper pt-[4.25rem] lg:hidden"
          >
            <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-between pb-10 pt-10">
              <ol className="border-t border-ink/15">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: reduced ? 0 : 0.18 + i * 0.05 }}
                    className="border-b border-ink/15"
                  >
                    <a href={item.href} onClick={close} className="flex items-baseline gap-5 py-5 text-ink">
                      <span className="folio tabular w-6 text-ink/45">{String(i + 1).padStart(2, "0")}</span>
                      <span className="serif text-[2.25rem]">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ol>
              <div className="flex flex-col gap-6">
                <p className="serif-text max-w-[22ch] text-[1.25rem] text-ink/70">
                  Your next step starts <em>here.</em>
                </p>
                <ButtonLink href={links.contact} onClick={close} className="self-start">
                  Work With Strive
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
