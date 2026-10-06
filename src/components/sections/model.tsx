import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { layers } from "@/content/site";

/**
 * The five layers as one connected timeline: a single rule runs across the
 * top on desktop (down the left on mobile) and each layer hangs from it.
 */
export function Model() {
  return (
    <section id="model" aria-labelledby="model-title" className="bg-stone py-20 lg:py-28">
      <div className="container-site">
        <SectionHeader
          id="model-title"
          eyebrow="The Strive Model"
          title="One career. Many stages."
          intro="Five layers form one continuum. Four follow the ages of a working life; the fifth, The Specifics, runs alongside every one of them."
        />

        <ol className="relative mt-14 grid lg:mt-16 lg:grid-cols-5 lg:gap-x-10 lg:border-t lg:border-navy/40">
          {/* Mobile: one continuous line down the left */}
          <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-navy/30 lg:hidden" />

          {layers.map((l, i) => (
            <li
              key={l.slug}
              className="relative pb-12 pl-9 lg:pb-0 lg:pl-0 lg:pt-8"
            >
              {i > 0 && (
                <span aria-hidden="true" className="absolute -left-5 bottom-0 top-0 hidden w-px bg-line lg:block" />
              )}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-navy lg:-top-[6px] ${
                  l.slug === "specifics" ? "bg-stone" : "bg-navy"
                }`}
              />
              <Reveal delay={i * 0.05}>
                <p className="eyebrow">
                  {l.number} &middot; {l.age}
                </p>
                <h3 className="mt-3 text-heading">{l.title}</h3>
                <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-paper lg:aspect-[4/5]">
                  <Image src={l.image} alt={l.alt} fill sizes="(min-width: 1024px) 18vw, 90vw" className="object-cover" />
                </div>
                <p className="mt-5 text-small text-ink/85">{l.summary}</p>
                <p className="eyebrow mt-6">Typical questions</p>
                <ul className="mt-2 text-small text-muted">
                  {l.questions.map((q) => (
                    <li key={q} className="border-b border-line py-2 last:border-b-0">
                      {q}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
