"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

/**
 * A photograph that drifts a few pixels slower than the page. The image is
 * slightly oversized so the movement never exposes an edge.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  strength = 40,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-stone ${className}`}>
      <motion.div className="absolute -inset-y-16 inset-x-0" style={reduced ? undefined : { y }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </div>
  );
}
