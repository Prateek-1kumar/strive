"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { layers } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;
const INTERVAL = 3600;

/**
 * The hero's one moving part. It cycles through the five moments Strive is
 * built for, with a visible marker so the reader knows it is a sequence.
 */
export function MomentRotator() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const auto = !reduced && !paused;

  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % layers.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [auto, index]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p className="sr-only">
        Strive is for the moment you&rsquo;re {layers.map((l) => l.moment.replace(".", "")).join(", ")}.
      </p>

      <p aria-hidden="true" className="serif-text text-[clamp(1.375rem,2.1vw,1.75rem)] text-ink/55">
        For the moment you&rsquo;re
      </p>
      <div aria-hidden="true" className="relative h-[1.5em] overflow-hidden text-[clamp(1.375rem,2.1vw,1.75rem)]">
        {layers.map((l, i) => {
          const offset = i === index ? "0%" : i < index ? "-100%" : "100%";
          return (
            <motion.p
              key={l.slug}
              initial={false}
              animate={{ y: offset, opacity: i === index ? 1 : 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.85, ease }}
              className="italic-serif absolute inset-x-0 top-0 leading-[1.4] text-ink"
            >
              {l.moment}
            </motion.p>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="folio tabular text-ink/60">
          {String(index + 1).padStart(2, "0")} / {String(layers.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5" role="group" aria-label="Choose a moment">
          {layers.map((l, i) => (
            <button
              key={l.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${l.verb}: ${l.moment}`}
              aria-pressed={i === index}
              className="group relative h-6 w-8"
            >
              <span className="absolute inset-x-0 top-1/2 h-px bg-ink/15 transition-colors group-hover:bg-ink/35" />
              <span
                key={i === index ? `${l.slug}-${index}-${auto}` : l.slug}
                className="absolute left-0 top-1/2 h-px bg-ink"
                style={{
                  width: i < index || (i === index && !auto) ? "100%" : "0%",
                  animation: i === index && auto ? `strive-fill ${INTERVAL}ms linear forwards` : undefined,
                }}
              />
            </button>
          ))}
        </div>
      </div>
      <style>{`@keyframes strive-fill { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}
