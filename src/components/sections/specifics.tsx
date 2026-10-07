import Image from "next/image";
import { ArrowLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { formats, forthcoming, specifics } from "@/content/site";

export function Specifics() {
  return (
    <section id="specifics" aria-labelledby="specifics-title" className="py-20 lg:py-28">
      <div className="container-site">
        <SectionHeader
          id="specifics-title"
          title="Go deeper into your profession."
          intro="Strive Specifics are profession-specific programmes of workshops, webinars, resources and guidance. We are starting with the fields we know from the inside."
        />

        <div className="mt-10 mweb-carousel min-w-0 md:mt-14 md:grid md:grid-cols-3 md:gap-6">
          {specifics.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06} className="mweb-carousel-item-lg flex flex-col h-full md:w-auto md:max-w-none md:shrink">
              <article id={s.id} className="surface group flex flex-1 h-full flex-col p-4 sm:p-5 rounded-[1.5rem]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.125rem] bg-stone">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between pt-5 pb-1">
                  <div>
                    <h3 className="font-serif text-[1.25rem] sm:text-[1.375rem] text-navy leading-snug">{s.title}</h3>
                    <p className="mt-2.5 text-small text-ink/80 leading-relaxed">{s.text}</p>
                    <ul className="mb-7 mt-5 space-y-2.5 text-small text-ink/85">
                      {s.includes.map((item) => (
                        <li key={item} className="flex gap-2.5 items-start">
                          <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-navy/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-4">
                    <a
                      href={s.href}
                      className="inline-flex items-center gap-2 rounded-full bg-navy px-4.5 py-2.5 text-[0.8125rem] font-medium text-paper transition-all hover:bg-navy-deep group-hover:gap-2.5"
                    >
                      <span>{s.cta}</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
          <span className="text-small text-muted shrink-0 mr-1">Coming next</span>
          {forthcoming.map((f) => (
            <span
              key={f}
              className="inline-flex items-center rounded-full bg-card px-4.5 py-2 font-serif text-[0.9375rem] text-navy shrink-0 transition-transform hover:-translate-y-0.5"
            >
              Strive &times; {f}
            </span>
          ))}
        </div>

        <Reveal className="mt-20 rounded-[2rem] bg-stone p-8 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h3 className="font-serif text-[1.875rem] sm:text-[2.125rem] leading-[1.2] text-navy font-normal">
                Four ways to learn, at any stage.
              </h3>
              <p className="prose-serif mt-4 text-[1.0625rem] text-muted leading-relaxed">
                Every Strive Specific combines these formats, so you can learn in the way that suits the question.
              </p>
            </div>

            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-7">
              {formats.map((f) => (
                <div key={f.title}>
                  <h4 className="font-serif text-[1.25rem] text-navy font-normal">
                    {f.title}
                  </h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/75">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
