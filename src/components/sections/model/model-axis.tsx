"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";
import { NorthStar } from "@/components/brand/north-star";
import { agePct, axis, layers } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

// Vertical geometry of the diagram, in px.
const TRACK_Y = 0;
const AXIS_Y = 64;
const LABEL_Y = 176;

const centre = (i: number) => {
  const span = layers[i].span;
  return span ? agePct((span[0] + Math.min(span[1], 46)) / 2) : colX(i);
};
const colX = (i: number) => (i + 0.5) * (100 / layers.length);

/**
 * Desktop: the section pins while the reader scrolls through it, and each
 * stretch of scroll advances the star to the next layer of the model.
 */
export function ModelAxis({ intro }: { intro: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(layers.length - 1, Math.max(0, Math.floor(p * layers.length))));
  });

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / layers.length) * travel, behavior: reduced ? "auto" : "smooth" });
  };

  const layer = layers[active];
  const onTrack = layer.span === null;

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${100 + layers.length * 65}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col pb-[clamp(2rem,5vh,4rem)] pt-[clamp(5.5rem,12vh,8rem)]">
        <div className="shell flex flex-1 flex-col">
          {intro}

          {/* The diagram */}
          <div className="relative mt-auto" style={{ height: LABEL_Y }}>
            <span className="folio absolute -top-7 left-0 text-paper/55">
              The Specifics &mdash; alongside every stage
            </span>
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 border-t border-dashed transition-colors duration-700 ${
                onTrack ? "border-gold" : "border-paper/25"
              }`}
              style={{ top: TRACK_Y }}
            />

            {axis.labels.map((age) => (
              <span
                key={age}
                aria-hidden="true"
                className="folio tabular absolute -translate-x-1/2 text-paper/45"
                style={{ left: `${agePct(age)}%`, top: AXIS_Y - 40 }}
              >
                {age === 40 ? "40+" : age}
              </span>
            ))}
            <span
              aria-hidden="true"
              className="ticks absolute inset-x-0 h-[7px] text-paper/20"
              style={{ top: AXIS_Y - 7, ["--ticks" as string]: axis.to - axis.from }}
            />
            <span aria-hidden="true" className="absolute inset-x-0 h-px bg-paper/25" style={{ top: AXIS_Y }} />

            {layers.map((l, i) =>
              l.span ? (
                <span
                  key={l.slug}
                  aria-hidden="true"
                  className="absolute h-[3px] -translate-y-px transition-opacity duration-700"
                  style={{
                    top: AXIS_Y,
                    left: `${agePct(l.span[0])}%`,
                    width: `${agePct(l.span[1]) - agePct(l.span[0])}%`,
                    opacity: i === active ? 1 : 0.28,
                    background:
                      l.slug === "transition"
                        ? "linear-gradient(to right, var(--color-paper), transparent)"
                        : "var(--color-paper)",
                  }}
                />
              ) : null,
            )}

            {/* Callout leaders from each layer to its place on the axis */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 100 ${LABEL_Y}`}
              preserveAspectRatio="none"
            >
              {layers.map((l, i) => {
                const x = colX(i);
                const d = l.span
                  ? `M ${x} ${LABEL_Y} V ${LABEL_Y - 44} L ${centre(i)} ${AXIS_Y + 8}`
                  : `M ${x} ${LABEL_Y} V ${TRACK_Y + 4}`;
                return (
                  <path
                    key={l.slug}
                    d={d}
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray={l.span ? undefined : "3 4"}
                    className="transition-[stroke] duration-700"
                    stroke={i === active ? "var(--color-gold)" : "color-mix(in srgb, var(--color-paper) 16%, transparent)"}
                    strokeWidth="1"
                  />
                );
              })}
            </svg>

            <motion.span
              aria-hidden="true"
              className="absolute block"
              initial={false}
              animate={{ left: `${centre(active)}%`, top: onTrack ? TRACK_Y : AXIS_Y }}
              transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 18, mass: 0.9 }}
              style={{ x: "-50%", y: "-50%" }}
            >
              <NorthStar className="h-8 w-auto text-gold drop-shadow-[0_0_14px_rgba(201,162,74,0.5)]" />
            </motion.span>
          </div>

          <div className="grid grid-cols-5 border-t border-paper/15" role="tablist" aria-label="The five layers">
            {layers.map((l, i) => (
              <button
                key={l.slug}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="model-detail"
                onClick={() => goTo(i)}
                className={`group pt-4 pr-4 text-left transition-colors duration-500 ${
                  i === active ? "text-paper" : "text-paper/45 hover:text-paper/80"
                }`}
              >
                <span className="folio tabular block">
                  {String(i + 1).padStart(2, "0")} &middot; {l.verb}
                </span>
                <span className="serif mt-2 block text-[1.375rem] leading-tight">{l.title}</span>
              </button>
            ))}
          </div>

          <div id="model-detail" role="tabpanel" aria-live="polite" className="relative mt-[clamp(1.5rem,5vh,3.5rem)] min-h-[9.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={layer.slug}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease }}
                className="grid grid-cols-12 gap-8"
              >
                <p className="italic-serif col-span-4 text-[clamp(3.5rem,9vh,6.5rem)] leading-[0.85] tracking-[-0.03em] text-gold">
                  {layer.age === "Profession-specific" ? "Any age" : layer.age}
                </p>
                <p className="serif-text col-span-4 max-w-[28ch] text-[1.375rem] text-paper/90">{layer.text}</p>
                <div className="col-span-3 col-start-10">
                  <p className="folio text-paper/45">What it covers</p>
                  <ul className="mt-3 text-[0.9375rem] text-paper/85">
                    {layer.covers.map((c) => (
                      <li key={c} className="border-b border-paper/12 py-2">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
