import Image from "next/image";
import { ArrowLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { articles, departments, links } from "@/content/site";

export function Journal() {
  const [lead, ...rest] = articles;
  return (
    <section id="journal" aria-labelledby="journal-title" className="bg-stone/60 py-20 lg:py-28 overflow-hidden w-full max-w-full">
      <div className="container-site">
        <SectionHeader
          id="journal-title"
          title="Think better about your career."
          intro="Essays on career psychology, decisions, growth and the changing shape of work. Published on Substack."
        />

        <ul aria-label="Journal topics" className="mt-8 flex flex-wrap items-center gap-2.5 sm:mt-10 sm:gap-3">
          {departments.map((d) => (
            <li key={d} className="shrink-0">
              <a
                href={links.substack}
                className="inline-flex items-center rounded-full bg-card px-4.5 py-2 text-[0.875rem] font-medium text-ink/80 transition-all hover:bg-navy hover:text-paper"
              >
                {d}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14 min-w-0 max-w-full">
          <Reveal className="min-w-0 w-full max-w-full lg:col-span-6">
            <a href={lead.href} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-stone">
                <Image
                  src={lead.image}
                  alt={lead.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="eyebrow mt-6">{lead.department}</p>
              <h3 className="mt-3 text-[1.75rem] leading-[1.2] transition-colors group-hover:text-navy-deep">
                {lead.title}
              </h3>
              <p className="prose-serif mt-3 text-muted">{lead.standfirst}</p>
            </a>
          </Reveal>

          <div className="flex flex-col justify-between gap-6 min-w-0 w-full max-w-full lg:col-span-6">
            <div className="mweb-carousel min-w-0 md:flex md:flex-col md:gap-6 md:overflow-visible md:m-0 md:p-0">
              {rest.map((a, i) => (
                <Reveal key={a.title} delay={0.05 + i * 0.05} className="mweb-carousel-item flex flex-col md:w-auto md:max-w-none md:shrink">
                  <a
                    href={a.href}
                    className="surface group flex flex-1 h-full flex-col gap-4 p-5 rounded-[1.5rem] transition-all duration-300 hover:-translate-y-0.5 md:h-auto md:flex-row md:items-center md:gap-6 md:p-6"
                  >
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-stone md:w-40">
                      <Image
                        src={a.image}
                        alt={a.alt}
                        fill
                        sizes="(min-width: 640px) 160px, 100vw"
                        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="eyebrow">{a.department}</p>
                      <h3 className="mt-2 font-serif text-[1.1875rem] leading-snug transition-colors group-hover:text-navy">
                        {a.title}
                      </h3>
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-muted line-clamp-2 md:line-clamp-3">
                        {a.standfirst}
                      </p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
            <div className="pt-2">
              <ArrowLink href={links.substack} className="text-navy">
                Read the Journal on Substack
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
