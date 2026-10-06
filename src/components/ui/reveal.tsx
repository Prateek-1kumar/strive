"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** A soft rise into place, once, as the block enters the reading line. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p";
  /** Play on load rather than on entering view — for the first screen. */
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  const trigger = immediate ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 } };
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      {...trigger}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline whose lines rise out of their own baseline, one after another.
 * Each line is masked so the type appears to be set rather than faded in.
 */
export function LineReveal({
  lines,
  as = "h2",
  className = "",
  delay = 0,
  immediate = false,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  // Observe the unclipped heading itself: the masked lines start outside
  // their own clip box, so observing them directly would never fire.
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = immediate || inView;
  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block"
            initial={reduced ? false : { y: "108%" }}
            animate={show ? { y: "0%" } : undefined}
            transition={{ duration: 1.15, ease, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
