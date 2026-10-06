import Image from "next/image";
import { NorthStar } from "@/components/brand/north-star";
import { Chapter } from "@/components/ui/chapter";
import { TextLink } from "@/components/ui/links";
import { LineReveal, Reveal } from "@/components/ui/reveal";
import { founder, links } from "@/content/site";

/**
 * Until the portrait shoot happens, the plate is a frontispiece: honest,
 * typographic, and the same proportions the photograph will fill.
 */
function Plate() {
  if (founder.portrait) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-ink">
        <Image
          src={founder.portrait}
          alt={`${founder.name}, ${founder.role}`}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover grayscale"
        />
      </div>
    );
  }
  return (
    <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[2px] bg-ink p-[clamp(1.25rem,2.5vw,2rem)] text-paper">
      <div className="absolute inset-[clamp(0.75rem,1.5vw,1.25rem)] border border-paper/15" aria-hidden="true" />
      <div className="relative flex justify-between text-paper/55">
        <span className="folio">Strive</span>
        <span className="folio">The Founder</span>
      </div>
      <div className="relative text-center">
        <NorthStar className="mx-auto h-14 w-auto text-gold" />
        <p className="italic-serif mt-8 text-[clamp(4.5rem,9vw,8rem)] leading-[0.8] tracking-[-0.04em] text-bone">
          I.K.
        </p>
      </div>
      <div className="relative text-center">
        <p className="serif text-[1.375rem]">{founder.name}</p>
        <p className="folio mt-2 text-paper/55">{founder.role}</p>
      </div>
    </div>
  );
}

export function Founder() {
  return (
    <section id="about" className="relative py-[clamp(6rem,14vw,11rem)]">
      <div className="shell">
        <Chapter numeral="V" label="About" aside="The founder" />

        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <Plate />
          </Reveal>

          <div className="flex flex-col lg:col-span-6 lg:col-start-7">
            <LineReveal
              className="text-[clamp(2.625rem,5.2vw,5rem)] leading-[0.95] tracking-[-0.035em] text-ink"
              lines={["Built from psychology.", <em key="d">Designed for careers.</em>]}
            />
            <Reveal className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-10">
              <p className="serif-text text-[1.1875rem] text-charcoal">
                Strive was founded by {founder.name}, a psychologist, to bring the discipline&rsquo;s rigour
                to the decisions that shape working lives.
              </p>
              <p className="serif-text text-[1.1875rem] text-charcoal/80">
                It is built from the evidence up: first understanding, then guidance, then the practical
                tools to act on it, at whichever stage a career happens to be.
              </p>
            </Reveal>
            <Reveal className="mt-auto pt-14">
              <div className="flex flex-col gap-6 border-t border-ink/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="italic-serif text-[2rem] leading-none text-ink">{founder.name}</p>
                  <p className="folio mt-3 text-ink/55">{founder.role}</p>
                </div>
                <TextLink href={links.linkedin} external className="text-ink">
                  Connect on LinkedIn
                </TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
