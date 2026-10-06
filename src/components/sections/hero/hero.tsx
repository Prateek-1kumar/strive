import { ButtonLink } from "@/components/ui/links";
import { LineReveal, Reveal } from "@/components/ui/reveal";
import { AgeRuler } from "./age-ruler";
import { MomentRotator } from "./moment-rotator";

const proof = [
  { label: "Built on", value: "Career psychology" },
  { label: "Designed for", value: "Every stage, from 16 to 40+" },
  { label: "Launching with", value: "Psychology & Research" },
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col pt-[4.25rem]">
      <div className="shell flex flex-1 flex-col">
        <Reveal immediate className="mt-6 flex items-center justify-between gap-6 border-b border-ink/15 pb-3 text-ink/60 sm:mt-8">
          <span className="folio hidden sm:inline">A career platform</span>
          <span className="folio hidden md:inline">One career &middot; Many stages</span>
          <span className="folio">First edition: Psychology &amp; Research</span>
        </Reveal>

        <LineReveal
          as="h1"
          immediate
          delay={0.15}
          className="mt-[clamp(2rem,5.5vh,4.5rem)] text-[clamp(4.25rem,min(13.2vw,16.5vh),13rem)] leading-[0.86] tracking-[-0.045em] text-ink"
          lines={[
            "Build your",
            <span key="f" className="block pl-[0.06em] md:pl-[1.9em]">
              <em className="tracking-[-0.03em]">future.</em>
            </span>,
          ]}
        />

        <div className="mt-[clamp(2rem,5vh,4rem)] grid gap-12 pb-4 lg:grid-cols-12 lg:gap-8">
          <Reveal immediate delay={0.45} className="lg:col-span-5">
            <MomentRotator />
          </Reveal>

          <Reveal immediate delay={0.55} className="lg:col-span-6 lg:col-start-7">
            <p className="serif-text max-w-[40ch] text-[clamp(1.25rem,1.6vw,1.375rem)] text-ink">
              Strive helps people make better career decisions, build meaningful work and move through
              the transitions in between&nbsp;&mdash; grounded in the evidence of career psychology.
            </p>
            <div className="mt-8 flex flex-col gap-9 sm:flex-row sm:items-start sm:gap-12 lg:flex-col lg:gap-8 xl:flex-row xl:gap-12">
              <ButtonLink href="#model" className="self-start">
                Explore Strive
              </ButtonLink>
              <dl className="flex flex-col text-[0.875rem]">
                {proof.map((p, i) => (
                  <div
                    key={p.label}
                    className={`flex gap-4 py-1.5 ${i ? "border-t border-ink/12" : ""} sm:min-w-[17rem]`}
                  >
                    <dt className="w-[6.5rem] shrink-0 text-ink/50">{p.label}</dt>
                    <dd className="text-ink">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal immediate delay={0.7} className="mt-auto pb-6">
          <AgeRuler />
        </Reveal>
      </div>
    </section>
  );
}
