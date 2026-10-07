"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { links, nav } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      if (currentY <= 40) {
        // Always show near top of page
        setVisible(true);
      } else {
        const delta = currentY - lastY;
        // If scrolled UP by at least 3px in this frame -> reveal immediately
        if (delta < -3) {
          setVisible(true);
        }
        // If scrolled DOWN by at least 8px and past 70px -> hide
        else if (delta > 8 && currentY > 70) {
          setVisible(false);
        }
      }

      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Smoothly handle in-page anchor clicks without requiring global scroll-behavior: smooth
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", handleAnchorClick);
    };
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

  const isVisible = visible || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 will-change-transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "border-b border-line/50 bg-paper/90 backdrop-blur-md shadow-[0_4px_20px_rgb(6_37_74/0.05)]"
            : "border-b border-transparent bg-paper"
        }`}
      >
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <a href="#top" onClick={close} className="wordmark text-[1.125rem] text-navy lg:text-[1.25rem]" aria-label="Strive, home">
          Strive
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
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
          <ButtonLink href={links.contact} className="!h-10 !px-5 !text-[0.875rem]">
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
      {/* Static flow placeholder so page content is never shifted or jumped */}
      <div className="h-16 lg:h-[4.5rem]" aria-hidden="true" />
    </>
  );
}
