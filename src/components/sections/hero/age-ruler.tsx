"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { NorthStar } from "@/components/brand/north-star";
import { agePct as pct, axis, layers } from "@/content/site";

/**
 * A measuring rule of a working life, from sixteen onwards. As the reader
 * scrolls into the page the star moves forward along it — reading on,
 * literally, is moving on.
 */
export function AgeRuler() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, [0, 900], [pct(16.6), pct(30)], { clamp: true });
  const smooth = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.6 });
  const left = useTransform(reduced ? raw : smooth, (v) => `${v}%`);
  const banded = layers.filter((l) => l.span);

  return (
    <figure aria-label="The Strive layers, set along the ages of a working life" className="relative text-ink">
      {/* Layer verbs, staggered so the short early stages never collide. */}
      <div className="relative hidden h-10 md:block" aria-hidden="true">
        {banded.map((l, i) => {
          const [a] = l.span!;
          return (
            <span
              key={l.slug}
              className={`folio absolute flex items-center gap-2 text-ink/60 ${i % 2 ? "top-5" : "top-0"}`}
              style={{ left: `${pct(a)}%` }}
            >
              <span className="h-3 w-px bg-ink/30" />
              {l.verb}
            </span>
          );
        })}
      </div>

      <div className="relative h-10">
        {/* Bands */}
        {banded.map((l, i) => {
          const [a, b] = l.span!;
          return (
            <span
              key={l.slug}
              aria-hidden="true"
              className="absolute bottom-[11px] h-[3px]"
              style={{
                left: `${pct(a)}%`,
                width: `${pct(b) - pct(a)}%`,
                background:
                  l.slug === "transition"
                    ? "linear-gradient(to right, var(--color-ink), transparent)"
                    : `color-mix(in srgb, var(--color-ink) ${100 - i * 18}%, transparent)`,
              }}
            />
          );
        })}

        {/* Baseline and ticks */}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-[11px] h-px bg-ink/25" />
        <span
          aria-hidden="true"
          className="ticks absolute inset-x-0 bottom-[4px] h-[7px] text-ink/25"
          style={{ ["--ticks" as string]: axis.to - axis.from }}
        />

        {/* The star */}
        <motion.span
          aria-hidden="true"
          style={{ left }}
          className="absolute bottom-[-1px] block -translate-x-1/2"
        >
          <NorthStar className="h-6 w-auto text-gold drop-shadow-[0_0_10px_rgba(201,162,74,0.35)]" />
        </motion.span>
      </div>

      <figcaption className="relative h-6">
        {axis.labels.map((age) => (
          <span
            key={age}
            className={`folio tabular absolute -translate-x-1/2 text-ink/55 ${age === 18 || age === 35 ? "hidden md:inline" : ""}`}
            style={{ left: `${pct(age)}%` }}
          >
            {age === 40 ? "40+" : age}
          </span>
        ))}
        <span className="folio absolute right-0 hidden text-ink/40 sm:inline">and beyond</span>
      </figcaption>
    </figure>
  );
}
