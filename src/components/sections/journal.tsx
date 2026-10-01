"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Curtain reveal: the panel is pinned to the viewport bottom beneath the previous (z-10) section,
// which scrolls away to uncover it; the content drifts up into place as it does.
export function Journal() {
  const sentinel = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sentinel, offset: ["start end", "start start"] });
  const y = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 1]);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" />
      <section id="journal" className="sticky bottom-0 z-0 flex min-h-svh items-center bg-navy py-28 text-offwhite">
        <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-14 h-px w-full bg-gold/40 lg:mb-20" />
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <h2 className="text-[clamp(1.875rem,4.5vw,3.9375rem)] leading-[1.06] lg:col-span-7">
              Think better about <em className="text-gold">your career.</em>
            </h2>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-lg text-offwhite/75">
                The Strive Journal explores careers, psychology, research, work and the decisions that shape
                professional lives.
              </p>
              <a
                href="#journal"
                className="group mt-8 inline-flex items-center gap-3 bg-gold px-7 py-3.5 text-sm font-medium text-navy transition-colors duration-300 hover:bg-offwhite"
              >
                Read The Journal
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
