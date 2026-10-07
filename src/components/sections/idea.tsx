import { Reveal } from "@/components/ui/reveal";
import { principles } from "@/content/site";

const principleDetails = [
  [
    { label: "FOUNDATION", value: "Career psychology" },
    { label: "EVIDENCE", value: "Research-backed" },
  ],
  [
    { label: "STRUCTURE", value: "Ages 16 through 40+" },
    { label: "FRAMEWORK", value: "5 connected layers" },
  ],
  [
    { label: "APPROACH", value: "Field-by-field" },
    { label: "STARTING WITH", value: "Psychology & Research" },
  ],
];

export function Idea() {
  return (
    <section id="idea" aria-labelledby="idea-title" className="py-20 lg:py-28">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 min-w-0 max-w-full">
          <Reveal className="min-w-0 w-full max-w-full lg:col-span-5">
            <h2 id="idea-title" className="text-title">
              Careers aren&rsquo;t one-size-fits-all. Neither are the decisions that shape them.
            </h2>
          </Reveal>

          <Reveal delay={0.05} className="space-y-5 min-w-0 w-full max-w-full lg:col-span-6 lg:col-start-7">
            <p className="prose-serif">
              Most career advice is written for no one in particular: a list of options, a personality quiz, a
              conversation that ends where it began. Real careers are a series of decisions, made at different
              ages, with different information and under different pressures.
            </p>
            <p className="prose-serif text-ink/80">
              Strive is built around that reality. We bring the evidence of career psychology to the moments that
              shape a working life, from choosing a first direction to deciding what comes next, and organise it by
              stage and by profession so it is useful to the person reading it.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 mweb-carousel min-w-0 md:mt-16 md:grid md:grid-cols-3 md:gap-5">
          {principles.map((p, i) => (
            <li key={p.title} className="mweb-carousel-item flex flex-col md:w-auto md:max-w-none md:shrink">
              <Reveal delay={i * 0.06} className="surface flex flex-1 h-full flex-col justify-between p-7 sm:p-8">
                <div>
                  <h3 className="font-serif text-[1.3125rem] sm:text-[1.4375rem] leading-snug text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink/80">
                    {p.text}
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-2.5">
                  {principleDetails[i].map((d) => (
                    <div key={d.label} className="flex items-center justify-between text-[0.75rem] gap-2">
                      <span className="font-mono text-[0.6875rem] tracking-wider uppercase text-muted">
                        {d.label}
                      </span>
                      <span className="font-medium text-ink/90 text-right">
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
