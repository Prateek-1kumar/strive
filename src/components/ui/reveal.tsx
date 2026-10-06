"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** A gentle fade-up, once, as content enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.25, 0.6, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
