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
          eyebrow="The Journal"
          title="Think better about your career."
          intro="Essays on career psychology, decisions, growth and the changing shape of work. Published on Substack."
        />

        <ul aria-label="Journal topics" className="mt-10 flex flex-wrap gap-2">
          {departments.map((d) => (
            <li key={d}>
              <a
                href={links.substack}
                className="block rounded-full bg-white px-4 py-2 text-[0.875rem] text-ink/80 shadow-[0_1px_2px_rgb(6_37_74/0.06)] transition-colors hover:text-navy"
              >
                {d}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <a href={lead.href} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-stone">
                <Image
                  src={lead.image}
                  alt={lead.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="eyebrow mt-7">{lead.department}</p>
              <h3 className="mt-3 text-[1.75rem] leading-[1.2] transition-colors group-hover:text-navy-deep">
                {lead.title}
              </h3>
              <p className="prose-serif mt-3 text-muted">{lead.standfirst}</p>
            </a>
          </Reveal>

          <div className="flex flex-col gap-8 lg:col-span-5">
            {rest.map((a, i) => (
              <Reveal key={a.title} delay={0.05 + i * 0.05}>
                <a href={a.href} className="surface group flex flex-col gap-5 p-3 sm:flex-row sm:items-center">
                  <div className="relative aspect-[4/3] shrink-0 overflow-hidden rounded-[0.875rem] bg-stone sm:w-44">
                    <Image
                      src={a.image}
                      alt={a.alt}
                      fill
                      sizes="(min-width: 640px) 176px, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="px-2 pb-3 sm:px-0 sm:pb-0 sm:pr-3">
                    <p className="eyebrow">{a.department}</p>
                    <h3 className="mt-2 text-[1.125rem] leading-snug">{a.title}</h3>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{a.standfirst}</p>
                  </div>
                </a>
              </Reveal>
            ))}
            <ArrowLink href={links.substack} className="text-navy">
              Read the Journal on Substack
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
