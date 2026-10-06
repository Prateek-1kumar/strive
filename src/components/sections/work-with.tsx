"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { NorthStar } from "@/components/brand/north-star";
import { Chapter } from "@/components/ui/chapter";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { LineReveal } from "@/components/ui/reveal";
import { layers, links } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The close. Instead of a cold "Get started", the page asks a question —
 * where are you right now? — and answers it before asking for anything.
 */
export function WorkWith() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [choice, setChoice] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const starY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [-25, 0]);

  const picked = choice === null ? null : layers[choice];

  return (
    <section
      ref={ref}
      id="work-with-strive"
      className="on-dark relative overflow-hidden bg-ink py-[clamp(6rem,14vw,11rem)] text-paper"
    >
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: starY, rotate: starRotate }}
        className="pointer-events-none absolute -right-[8vw] top-[8%] text-paper/[0.035]"
      >
        <NorthStar className="h-[min(90vw,62rem)] w-auto" />
      </motion.div>

      <div className="shell relative">
        <Chapter numeral="VI" label="Work With Strive" aside="Your next step starts here" dark />

        <LineReveal
          className="mt-[clamp(3rem,7vw,6rem)] text-[clamp(3rem,8.4vw,8.75rem)] leading-[0.9] tracking-[-0.04em]"
          lines={["Your career is", <em key="b" className="text-bone">still being built.</em>]}
        />

        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-12 lg:grid-cols-12 lg:gap-8">
          <fieldset className="lg:col-span-7">
            <legend className="serif-text text-[1.375rem] text-paper/80">Where are you right now?</legend>
            <div className="mt-6 flex flex-wrap gap-2" role="radiogroup" aria-label="Where are you right now?">
              {layers.map((l, i) => {
                const on = choice === i;
                return (
                  <button
                    key={l.slug}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setChoice(on ? null : i)}
                    className={`relative h-12 rounded-[2px] border px-5 text-[0.9375rem] transition-colors duration-500 ease-editorial ${
                      on
                        ? "border-gold bg-gold text-ink"
                        : "border-paper/20 text-paper/85 hover:border-paper/60 hover:text-paper"
                    }`}
                  >
                    {l.verb}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 min-h-[4.5rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={picked?.slug ?? "none"}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease }}
                  className="max-w-[46ch] text-[1rem] leading-relaxed text-paper/65"
                >
                  {picked ? (
                    <>
                      <span className="text-paper">{picked.title}</span>
                      <span className="text-gold"> &middot; {picked.age}.</span> {picked.text}
                    </>
                  ) : (
                    "Pick the one that sounds most like now. We’ll start there, and stay for what comes next."
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          </fieldset>

          <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:items-start lg:pt-14">
            <ButtonLink href={links.contact} tone="paper">
              {picked ? `Connect about ${picked.verb.toLowerCase()}` : "Connect With Strive"}
            </ButtonLink>
            <TextLink href="#specifics" className="text-paper/85">
              Explore current offers
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
