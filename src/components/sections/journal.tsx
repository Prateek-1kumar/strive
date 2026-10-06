import { Arrow } from "@/components/ui/arrow";
import { Chapter } from "@/components/ui/chapter";
import { TextLink } from "@/components/ui/links";
import { LineReveal, Reveal } from "@/components/ui/reveal";
import { journal, links } from "@/content/site";

/** The Journal, set as the contents page of a periodical rather than a blog grid. */
export function Journal() {
  return (
    <section id="journal" className="relative bg-paper-deep py-[clamp(6rem,14vw,11rem)]">
      <div className="shell">
        <Chapter numeral="IV" label="The Journal" aside="A publication by Strive" />

        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <LineReveal
                className="text-[clamp(2.625rem,5.2vw,5rem)] leading-[0.95] tracking-[-0.035em] text-ink"
                lines={["Think better", <>about <em>your career.</em></>]}
              />
              <Reveal>
                <p className="serif-text mt-8 max-w-[34ch] text-[1.1875rem] text-charcoal/85">
                  Essays on career psychology, decisions and the working life. Written slowly, for people
                  who would rather understand a choice than be sold one.
                </p>
                <TextLink href={links.substack} external className="mt-8 text-ink">
                  Read on Substack
                </TextLink>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex items-baseline justify-between border-b border-ink pb-3 text-ink">
              <span className="folio">Contents</span>
              <span className="folio text-ink/50">Departments</span>
            </div>
            <ol>
              {journal.map((d, i) => (
                <Reveal as="li" key={d.title} delay={i * 0.05}>
                  <a
                    href={links.substack}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-ink/15 py-6 transition-colors duration-500 hover:border-ink/40 sm:py-7"
                  >
                    <span className="italic-serif tabular text-[1.125rem] text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="transition-transform duration-700 ease-editorial group-hover:translate-x-2">
                      <span className="serif block text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.02] text-ink">
                        {d.title}
                      </span>
                      <span className="mt-2 block text-[0.9375rem] text-charcoal/65">{d.text}</span>
                    </span>
                    <Arrow className="h-2.5 w-6 -translate-x-2 text-ink opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
