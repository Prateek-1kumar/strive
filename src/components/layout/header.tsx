"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { links, nav } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 border-b bg-paper transition-colors duration-300 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <a href="#top" onClick={close} className="wordmark text-[1.125rem] text-navy lg:text-[1.25rem]" aria-label="Strive, home">
          Strive
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center">
            {nav.map((item, i) => (
              <li key={item.href} className="flex items-center">
                {i > 0 && <span aria-hidden="true" className="mx-4 h-3.5 w-px bg-line" />}
                <a
                  href={item.href}
                  className="text-[0.875rem] tracking-[0.01em] text-ink/80 transition-colors hover:text-navy"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href={links.contact} className="!h-10 !px-4 !text-[0.875rem]">
            Work With Strive
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex h-10 items-center gap-3 text-[0.875rem] text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
            <span className={`h-px bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper lg:hidden">
          <nav aria-label="Mobile" className="container-site py-6">
            <ul className="border-t border-line">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <a href={item.href} onClick={close} className="block py-4 font-serif text-[1.25rem] text-navy">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ButtonLink href={links.contact} onClick={close} className="mt-8 w-full">
              Work With Strive
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
