"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Eases in an entire editorial section as it scrolls into the viewport.
 * Uses Apple-style cubic-bezier ease-out with soft upward lift and subtle scale expansion.
 */
export function SectionEase({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.15, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.6, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
