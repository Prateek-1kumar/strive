"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export interface TimelineEntry {
  title: string;
  content: ReactNode;
}

// Scroll-linked timeline (Aceternity-style): sticky title beside a dot, rail fills as you scroll.
export function Timeline({ data }: { data: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 10%", "end 50%"] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative pb-20">
        {data.map((item) => (
          <div key={item.title} className="flex justify-start pt-10 md:gap-10 md:pt-40">
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-offwhite">
                <div className="h-4 w-4 rounded-full border border-gold bg-beige" />
              </div>
              <h3 className="hidden text-xl leading-tight text-navy md:block md:pl-20 md:text-4xl lg:text-5xl">
                {item.title}
              </h3>
            </div>
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-3xl text-navy md:hidden">{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          className="absolute inset-y-0 left-8 w-[2px] overflow-hidden bg-linear-to-b from-transparent from-[0%] via-navy/15 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-linear-to-t from-gold from-[0%] via-gold/70 via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
