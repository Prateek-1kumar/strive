"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { stages } from "@/components/sections/model/stages";
import { cards } from "@/components/sections/currently/cards";

type DropdownId = "model" | "currently";

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownId | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleMouseEnter = (id: DropdownId) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 140);
  };

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-white transition-shadow duration-200"
    >
      <div className="mx-auto flex h-14 w-full max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a href="#hero" onClick={closeAll} className="flex items-center" aria-label="Strive home">
          <Logo dark={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {/* Direct link: The Idea */}
          <a
            href="#idea"
            className="text-[14px] font-medium text-slate-700 transition-colors duration-150 hover:text-navy"
          >
            The Idea
          </a>

          {/* Dropdown: The Strive Model */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("model")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              aria-expanded={activeDropdown === "model"}
              onClick={() => setActiveDropdown(activeDropdown === "model" ? null : "model")}
              className={`flex items-center gap-1 text-[14px] font-medium transition-colors duration-150 outline-none ${
                activeDropdown === "model" ? "text-navy" : "text-slate-700 hover:text-navy"
              }`}
            >
              <span>The Strive Model</span>
              <ChevronDown
                className={`size-4 text-slate-400 transition-transform duration-200 ${
                  activeDropdown === "model" ? "rotate-180 text-navy" : ""
                }`}
              />
            </button>

            {/* Dropdown Popover */}
            <AnimatePresence>
              {activeDropdown === "model" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute left-1/2 top-full z-50 w-[490px] -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/10">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        The Strive Continuum
                      </span>
                      <span className="text-xs text-slate-400">5 Distinct Layers</span>
                    </div>

                    <div className="p-2.5">
                      {stages.map((stage) => (
                        <a
                          key={stage.slug}
                          href="#model"
                          onClick={closeAll}
                          className="group flex items-start gap-3.5 rounded-lg p-2.5 transition-colors hover:bg-slate-50"
                        >
                          <span className="mt-0.5 inline-flex shrink-0 items-center justify-center rounded-md bg-navy/5 px-2 py-0.5 text-xs font-medium text-navy">
                            {stage.age}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-navy">
                                {stage.title}
                              </span>
                              <ArrowRight className="size-3.5 -translate-x-1 text-slate-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-navy group-hover:opacity-100" />
                            </div>
                            <p className="mt-0.5 line-clamp-1 text-xs text-slate-600">
                              {stage.text}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 bg-slate-50/90 px-5 py-3">
                      <a
                        href="#model"
                        onClick={closeAll}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy transition-colors hover:text-gold"
                      >
                        Explore the full model &amp; methodology
                        <ArrowRight className="size-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dropdown: Currently */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("currently")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              aria-expanded={activeDropdown === "currently"}
              onClick={() => setActiveDropdown(activeDropdown === "currently" ? null : "currently")}
              className={`flex items-center gap-1 text-[14px] font-medium transition-colors duration-150 outline-none ${
                activeDropdown === "currently" ? "text-navy" : "text-slate-700 hover:text-navy"
              }`}
            >
              <span>Currently</span>
              <ChevronDown
                className={`size-4 text-slate-400 transition-transform duration-200 ${
                  activeDropdown === "currently" ? "rotate-180 text-navy" : ""
                }`}
              />
            </button>

            {/* Dropdown Popover */}
            <AnimatePresence>
              {activeDropdown === "currently" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/10">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Active Verticals
                      </span>
                      <span className="text-xs text-slate-400">Current Initiatives</span>
                    </div>

                    <div className="p-2.5">
                      {cards.map((card) => (
                        <a
                          key={card.id}
                          href={`#${card.id}`}
                          onClick={closeAll}
                          className="group flex items-start gap-3.5 rounded-lg p-2.5 transition-colors hover:bg-slate-50"
                        >
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-xs font-semibold text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                            {card.id === "psychology" ? "Ψ" : card.id === "research" ? "🔬" : "↗"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-navy">
                                {card.title}
                              </span>
                              <ArrowRight className="size-3.5 -translate-x-1 text-slate-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-navy group-hover:opacity-100" />
                            </div>
                            <p className="mt-0.5 line-clamp-1 text-xs text-slate-600">
                              {card.text}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 bg-slate-50/90 px-5 py-3">
                      <a
                        href="#currently"
                        onClick={closeAll}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy transition-colors hover:text-gold"
                      >
                        Explore all active verticals
                        <ArrowRight className="size-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Direct link: Journal */}
          <a
            href="#journal"
            className="text-[14px] font-medium text-slate-700 transition-colors duration-150 hover:text-navy"
          >
            Journal
          </a>
        </nav>

        {/* Action Button: Alma-inspired CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#cta"
            className="inline-flex items-center justify-center rounded-lg bg-navy px-4 py-2 text-[13px] font-medium text-white shadow-xs transition-colors duration-200 hover:bg-[#0c3159] focus:outline-none focus:ring-2 focus:ring-navy/20"
          >
            Work With Strive
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-lg p-1.5 text-slate-700 hover:bg-slate-100 lg:hidden"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-slate-200 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              <a
                href="#idea"
                onClick={closeAll}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-slate-800 hover:bg-slate-50"
              >
                The Idea
              </a>

              {/* Mobile Accordion: Model */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === "model" ? null : "model")
                  }
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[15px] font-medium text-slate-800 hover:bg-slate-50"
                >
                  <span>The Strive Model</span>
                  <ChevronDown
                    className={`size-4 text-slate-400 transition-transform ${
                      mobileExpanded === "model" ? "rotate-180 text-navy" : ""
                    }`}
                  />
                </button>
                {mobileExpanded === "model" && (
                  <div className="my-1 ml-3 flex flex-col gap-1 border-l-2 border-slate-200 pl-3">
                    {stages.map((stage) => (
                      <a
                        key={stage.slug}
                        href="#model"
                        onClick={closeAll}
                        className="py-1.5 text-sm text-slate-600 hover:text-navy"
                      >
                        <span className="font-medium text-slate-900">{stage.title}</span>
                        <span className="ml-2 text-xs text-slate-400">({stage.age})</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Accordion: Currently */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === "currently" ? null : "currently")
                  }
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[15px] font-medium text-slate-800 hover:bg-slate-50"
                >
                  <span>Currently</span>
                  <ChevronDown
                    className={`size-4 text-slate-400 transition-transform ${
                      mobileExpanded === "currently" ? "rotate-180 text-navy" : ""
                    }`}
                  />
                </button>
                {mobileExpanded === "currently" && (
                  <div className="my-1 ml-3 flex flex-col gap-1 border-l-2 border-slate-200 pl-3">
                    {cards.map((card) => (
                      <a
                        key={card.id}
                        href={`#${card.id}`}
                        onClick={closeAll}
                        className="py-1.5 text-sm text-slate-600 hover:text-navy"
                      >
                        <span className="font-medium text-slate-900">{card.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#journal"
                onClick={closeAll}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-slate-800 hover:bg-slate-50"
              >
                Journal
              </a>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <a
                  href="#cta"
                  onClick={closeAll}
                  className="flex w-full items-center justify-center rounded-lg bg-navy py-3 text-center text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#0c3159]"
                >
                  Work With Strive
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
