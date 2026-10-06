"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
import { NorthStar } from "@/components/brand/north-star";
import { layers } from "@/content/site";

/** Mobile and tablet: the same continuum, drawn as one line down the page. */
export function ModelLine() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <ol ref={ref} className="relative mt-14 lg:hidden">
      <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-paper/15" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-gold"
        style={{ scaleY: reduced ? 1 : scrollYProgress }}
      />
      {layers.map((l, i) => (
        <li key={l.slug} className="relative pb-14 pl-12 last:pb-0">
          <span
            aria-hidden="true"
            className={`absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border bg-ink ${
              l.span ? "border-paper/50" : "border-dashed border-gold"
            }`}
          >
            {i === 0 && <NorthStar className="h-3 w-auto text-gold" />}
          </span>
          <p className="folio tabular text-paper/55">
            {String(i + 1).padStart(2, "0")} &middot; {l.verb} &middot;{" "}
            <span className="text-gold">{l.age}</span>
          </p>
          <h3 className="mt-3 text-[2.125rem] text-paper">{l.title}</h3>
          <p className="serif-text mt-3 max-w-[34ch] text-[1.125rem] text-paper/80">{l.text}</p>
          <p className="mt-4 text-[0.875rem] text-paper/55">{l.covers.join(" · ")}</p>
        </li>
      ))}
    </ol>
  );
}
