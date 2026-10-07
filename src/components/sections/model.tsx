"use client";

import { CalendlyCarousel, type CarouselItem } from "@/components/ui/connected-carousel";
import { SectionHeader } from "@/components/ui/section-header";
import { layers } from "@/content/site";

const modelCarouselItems: CarouselItem[] = layers.map((l) => ({
  id: l.slug,
  stat: `${l.number} · ${l.title}`,
  quote: l.summary,
  author: l.slug === "specifics" ? "Profession-Specific · Any stage" : l.age,
  role: l.questions.slice(0, 2).join("   •   "),
  defaultImage: l.image,
  selectedImage: l.image,
  alt: l.alt,
}));

export function Model() {
  return (
    <section id="model" aria-labelledby="model-title" className="bg-navy py-20 text-paper lg:py-28 overflow-hidden">
      <div className="container-site">
        <SectionHeader
          dark
          id="model-title"
          title="One career. Many stages."
          intro="Five layers form one connected journey. Four follow the ages of a working life; the fifth, The Specifics, runs alongside every one of them."
        />

        {/* Visual continuum roadmap */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[0.8125rem] tracking-wide text-paper/70">
          <span className="rounded-full bg-white/10 px-3 py-1 font-medium text-paper">01 Decision (16–18)</span>
          <span className="text-gold/80" aria-hidden="true">→</span>
          <span className="rounded-full bg-white/10 px-3 py-1 font-medium text-paper">02 Build (18–25)</span>
          <span className="text-gold/80" aria-hidden="true">→</span>
          <span className="rounded-full bg-white/10 px-3 py-1 font-medium text-paper">03 Skill (25–35)</span>
          <span className="text-gold/80" aria-hidden="true">→</span>
          <span className="rounded-full bg-white/10 px-3 py-1 font-medium text-paper">04 Specifics</span>
          <span className="text-gold/80" aria-hidden="true">→</span>
          <span className="rounded-full bg-white/10 px-3 py-1 font-medium text-paper">05 Transition (40+)</span>
        </div>

        {/* Connected 3D Carousel */}
        <div className="mt-10 sm:mt-12">
          <CalendlyCarousel
            items={modelCarouselItems}
            autoPlayInterval={6000}
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
}
