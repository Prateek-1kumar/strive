import { Chapter } from "@/components/ui/chapter";
import { Arrow } from "@/components/ui/arrow";
import { TextLink } from "@/components/ui/links";
import { LineReveal, Reveal } from "@/components/ui/reveal";
import { forthcoming, specifics, type Specific } from "@/content/site";
import { CoverArt } from "./cover-art";

const tones: Record<Specific["tone"], string> = {
  navy: "bg-ink text-paper",
  bone: "bg-bone text-ink",
  paper: "bg-paper-deep text-ink",
};

function Cover({ item }: { item: Specific }) {
  const dark = item.tone === "navy";
  return (
    <div
      className={`relative flex aspect-[3/4] flex-col overflow-hidden rounded-[2px] p-[clamp(1.25rem,2vw,1.75rem)] shadow-[0_1px_0_rgba(6,37,74,0.08),0_20px_40px_-28px_rgba(6,37,74,0.45)] transition-[transform,box-shadow] duration-700 ease-editorial group-hover:-translate-y-2 group-hover:shadow-[0_1px_0_rgba(6,37,74,0.08),0_40px_60px_-30px_rgba(6,37,74,0.55)] ${tones[item.tone]}`}
    >
      {/* Spine shadow, as on a bound cover */}
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/12 to-transparent" />

      <div className={`flex items-baseline justify-between ${dark ? "text-paper/65" : "text-ink/60"}`}>
        <span className="folio">Strive Specifics</span>
        <span className="folio tabular">No. {item.number}</span>
      </div>

      <div className={`mx-auto my-auto aspect-square w-[78%] ${dark ? "text-paper" : "text-ink"}`}>
        <CoverArt art={item.art} />
      </div>

      <div>
        <h3 className="text-[clamp(2rem,3.2vw,2.875rem)] leading-[0.95]">{item.title}</h3>
        <p className={`italic-serif mt-2 text-[1.0625rem] ${dark ? "text-bone" : "text-ink/70"}`}>{item.subtitle}</p>
      </div>
    </div>
  );
}

export function Specifics() {
  return (
    <section id="specifics" className="relative py-[clamp(6rem,14vw,11rem)]">
      <div className="shell">
        <Chapter numeral="III" label="Now at Strive" aside="Strive Specifics" />

        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-10 lg:grid-cols-12 lg:items-end">
          <LineReveal
            className="text-[clamp(2.625rem,5.6vw,5.5rem)] leading-[0.95] tracking-[-0.035em] text-ink lg:col-span-7"
            lines={["Go deeper into", <em key="p">your profession.</em>]}
          />
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="serif-text max-w-[36ch] text-[1.1875rem] text-charcoal/85">
              Profession-specific workshops, webinars, resources and guidance. We&rsquo;re starting with the
              fields we know from the inside, and building so that every new one fits.
            </p>
          </Reveal>
        </div>

        <ul className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-x-[clamp(1.25rem,2.5vw,2.5rem)] gap-y-16 md:grid-cols-3">
          {specifics.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.12} className="group flex flex-col">
              <div id={item.id} className="scroll-mt-28">
                <Cover item={item} />
              </div>
              <p className="mt-6 max-w-[36ch] text-[0.9375rem] leading-relaxed text-charcoal/80">{item.text}</p>
              <p className="mt-3 text-[0.8125rem] text-ink/55">{item.topics.join(" · ")}</p>
              <TextLink href={item.href} className="mt-5 self-start text-ink">
                {item.cta}
              </TextLink>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-[clamp(4rem,8vw,7rem)]">
          <div className="flex flex-col gap-4 border-t border-ink/15 pt-5 md:flex-row md:items-baseline md:gap-10">
            <span className="folio shrink-0 text-ink/50">Coming next</span>
            <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
              {forthcoming.map((f) => (
                <li key={f} className="serif text-[clamp(1.5rem,2.4vw,2rem)] text-ink/40">
                  Strive <span className="text-gold-deep">&times;</span> {f}
                </li>
              ))}
              <li className="italic-serif text-[clamp(1.25rem,2vw,1.5rem)] text-ink/40">and more</li>
            </ul>
            <span className="hidden flex-1 md:block" />
            <Arrow className="hidden h-2.5 w-6 text-ink/40 md:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
