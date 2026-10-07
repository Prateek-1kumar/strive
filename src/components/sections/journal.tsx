import Image from "next/image";
import { ArrowLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { articles, departments, links } from "@/content/site";

export function Journal() {
  const [lead, ...rest] = articles;
  return (
    <section id="journal" aria-labelledby="journal-title" className="bg-stone/60 py-20 lg:py-28">
      <div className="container-site">
        <SectionHeader
          id="journal-title"
          title="Think better about your career."
          intro="Essays on career psychology, decisions, growth and the changing shape of work. Published on Substack."
        />

        <ul aria-label="Journal topics" className="mt-8 mweb-pills sm:mt-10 sm:flex-wrap">
          {departments.map((d) => (
            <li key={d} className="mweb-pill-item">
              <a
                href={links.substack}
                className="block rounded-full bg-card px-4 py-2 text-[0.875rem] text-ink/80 transition-colors hover:bg-stone hover:text-navy"
              >
                {d}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <Reveal className="lg:col-span-6">
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

          <div className="flex flex-col justify-between gap-6 lg:col-span-6">
            <div className="mweb-carousel sm:flex sm:flex-col sm:gap-6 sm:overflow-visible sm:m-0 sm:p-0">
              {rest.map((a, i) => (
                <Reveal key={a.title} delay={0.05 + i * 0.05} className="mweb-carousel-item sm:w-auto sm:max-w-none sm:shrink">
                  <a
                    href={a.href}
                    className="surface group flex h-full flex-col gap-4 p-5 rounded-[1.5rem] transition-all duration-300 hover:-translate-y-0.5 sm:h-auto sm:flex-row sm:items-center sm:gap-6 sm:p-6"
                  >
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-stone sm:w-36 md:w-40">
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
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-muted line-clamp-2 sm:line-clamp-3">
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
