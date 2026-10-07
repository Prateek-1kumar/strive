import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { layers } from "@/content/site";

/**
 * The five layers as one journey: a single soft line connects every stage
 * (across on desktop, down the side on mobile).
 */
export function Model() {
  return (
    <section id="model" aria-labelledby="model-title" className="bg-navy py-20 text-paper lg:py-28">
      <div className="container-site">
        <SectionHeader
          dark
          id="model-title"
          title="One career. Many stages."
          intro="Five layers form one continuum. Four follow the ages of a working life; the fifth, The Specifics, runs alongside every one of them."
        />

        <div className="relative mt-14 lg:mt-20">
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-gold/70 via-paper/20 to-transparent lg:bottom-auto lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />
          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-5">
            {layers.map((l, i) => (
              <li key={l.slug} className="relative pl-10 lg:pl-0 lg:pt-10">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 h-[15px] w-[15px] rounded-full ring-4 ring-navy ${
                    l.slug === "specifics" ? "border border-gold bg-navy" : "bg-gold"
                  }`}
                />
                <Reveal delay={i * 0.06} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.06]">
                    <ParallaxImage
                      src={l.image}
                      alt={l.alt}
                      sizes="(min-width: 1024px) 18vw, 90vw"
                      strength={18}
                      className="aspect-[4/3] lg:aspect-[4/5]"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-paper/60">
                        {l.number} &middot; {l.age}
                      </p>
                      <h3 className="mt-2 text-[1.25rem] leading-snug !text-paper">{l.title}</h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/75">{l.summary}</p>
                      <ul className="mt-5 space-y-2 text-[0.875rem] text-paper/65">
                        {l.questions.map((q) => (
                          <li key={q} className="flex gap-2.5">
                            <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-gold" />
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
