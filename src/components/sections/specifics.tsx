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
          eyebrow="Now at Strive"
          title="Go deeper into your profession."
          intro="Strive Specifics are profession-specific programmes of workshops, webinars, resources and guidance. We are starting with the fields we know from the inside."
        />

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {specifics.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06} className="h-full">
              <article id={s.id} className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow mt-6">Strive Specifics</p>
                <h3 className="mt-2 text-heading">{s.title}</h3>
                <p className="mt-3 text-small text-muted">{s.text}</p>
                <ul className="mb-0 mt-5 border-t border-line text-small text-ink/85">
                  {s.includes.map((item) => (
                    <li key={item} className="border-b border-line py-2.5">
                      {item}
                    </li>
                  ))}
                </ul>
                <ArrowLink href={s.href} className="mt-auto pt-6 text-navy">
                  {s.cta}
                </ArrowLink>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-14 border-t border-line pt-6 font-serif text-[1.0625rem] text-muted">
          <span className="eyebrow mr-3">Coming next</span>
          {forthcoming.map((f) => `Strive × ${f}`).join("  ·  ")}, built on the same five-layer model.
        </p>

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow">How Strive works</p>
            <h3 className="mt-4 text-[1.625rem] leading-tight">Four ways to learn, at any stage.</h3>
          </div>
          <dl className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {formats.map((f) => (
              <div key={f.title} className="border-t border-navy/40 pt-4">
                <dt className="font-serif text-[1.125rem] text-navy">{f.title}</dt>
                <dd className="mt-2 text-small text-muted">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
