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

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {specifics.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06} className="h-full">
              <article id={s.id} className="surface group flex h-full flex-col p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[0.875rem] bg-stone">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                  <h3 className="text-heading">{s.title}</h3>
                  <p className="mt-3 text-small text-muted">{s.text}</p>
                  <ul className="mb-7 mt-5 space-y-2.5 text-small text-ink/85">
                    {s.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ArrowLink href={s.href} className="mt-auto text-navy">
                    {s.cta}
                  </ArrowLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-small text-muted">Coming next</span>
          {forthcoming.map((f) => (
            <span key={f} className="rounded-full bg-stone px-4 py-1.5 font-serif text-[0.9375rem] text-navy">
              Strive &times; {f}
            </span>
          ))}
        </div>

        <Reveal className="mt-20 rounded-[2rem] bg-stone p-8 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <h3 className="text-[1.75rem] leading-tight">Four ways to learn, at any stage.</h3>
              <p className="mt-4 text-small text-muted">
                Every Strive Specific combines these formats, so you can learn in the way that suits the question.
              </p>
            </div>
            <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {formats.map((f, i) => (
                <div key={f.title}>
                  <p className="font-serif text-[0.9375rem] text-gold-text">0{i + 1}</p>
                  <dt className="mt-2 font-serif text-[1.25rem] text-navy">{f.title}</dt>
                  <dd className="mt-2 text-small text-muted">{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
