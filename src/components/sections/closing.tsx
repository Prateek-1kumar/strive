"use client";
import { MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Journal + final CTA in one panel. Gentle fade-up on entering view, plus a barely-there scroll drift for finish.
const ease = [0.22, 1, 0.36, 1] as const;

export function Closing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const topY = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const panelY = useTransform(scrollYProgress, [0, 1], [24, -10]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} className="flex flex-col overflow-hidden bg-navy pt-24 text-offwhite lg:pt-28">
        <motion.div style={{ y: topY }} className="mx-auto w-full max-w-6xl px-6 pb-12 lg:pb-16">
          <motion.div
            id="journal"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
            className="grid gap-6 lg:grid-cols-12 lg:items-end"
          >
            <h2 className="text-[clamp(1.625rem,3.2vw,2.75rem)] leading-[1.1] lg:col-span-6">
              Think better about <em className="text-gold">your career.</em>
            </h2>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-offwhite/70">
                The Strive Journal explores careers, psychology, research, work and the decisions that shape
                professional lives.
              </p>
              <a
                href="#journal"
                className="group relative mt-5 inline-flex items-center gap-2 border-b border-offwhite/25 pb-1.5 text-sm font-medium after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100"
              >
                Read The Journal
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: panelY }} className="w-full lg:ml-auto lg:w-[68%]">
          <motion.div
            id="cta"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
            className="bg-beige px-6 py-12 text-navy lg:py-14 lg:pl-16 lg:pr-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
          >
            <h2 className="max-w-xl text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.05]">Your career is still being built.</h2>
            <p className="mt-4 font-serif text-[clamp(1.0625rem,1.6vw,1.375rem)] italic text-navy/60">
              Start where you are. Build from there.
            </p>
            <a
              href="#cta"
              className="group mt-8 inline-flex items-center gap-3 bg-gold px-7 py-3.5 text-sm font-medium text-navy transition-colors duration-300 hover:bg-navy hover:text-offwhite"
            >
              Work With Strive
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
