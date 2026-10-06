import Image from "next/image";
import { ArrowLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { articles, departments, links } from "@/content/site";

/** Laid out like a magazine front page: one lead story, two secondary. */
export function Journal() {
  const [lead, ...rest] = articles;
  return (
    <section id="journal" aria-labelledby="journal-title" className="border-t border-line py-20 lg:py-28">
      <div className="container-site">
        <SectionHeader
          id="journal-title"
          eyebrow="The Journal"
          title="Think better about your career."
          intro="Essays on career psychology, decisions, growth and the changing shape of work. Published on Substack."
        />

        <nav aria-label="Journal departments" className="mt-10 border-y border-line py-3">
          <ul className="flex flex-wrap items-center justify-center gap-y-2 text-[0.8125rem] uppercase tracking-[0.08em] text-ink/80">
            {departments.map((d, i) => (
              <li key={d} className="flex items-center font-serif">
                {i > 0 && <span aria-hidden="true" className="mx-4 h-3 w-px bg-line" />}
                <a href={links.substack} className="hover:text-navy">
                  {d}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-7 lg:pr-10">
            <a href={lead.href} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden bg-stone">
                <Image src={lead.image} alt={lead.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              </div>
              <p className="eyebrow mt-6">{lead.department}</p>
              <h3 className="mt-2 text-[1.75rem] leading-[1.2] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                {lead.title}
              </h3>
              <p className="prose-serif mt-3 text-muted">{lead.standfirst}</p>
            </a>
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-5 lg:border-l lg:border-line lg:pl-10">
            {rest.map((a, i) => (
              <Reveal key={a.title} delay={0.05 + i * 0.05}>
                <a href={a.href} className="group block border-b border-line pb-10 last:border-b-0">
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone">
                    <Image src={a.image} alt={a.alt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
                  </div>
                  <p className="eyebrow mt-5">{a.department}</p>
                  <h3 className="mt-2 text-heading group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-small text-muted">{a.standfirst}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <ArrowLink href={links.substack} className="text-navy">
            Read the Journal on Substack
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
