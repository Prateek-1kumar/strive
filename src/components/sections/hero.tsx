import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";

const facts = [
  { label: "Built on", text: "Career psychology and research evidence" },
  { label: "Organised by", text: "Five stages of a working life, from 16 to 40+" },
  { label: "Launching with", text: "Psychology and Research, with more professions to follow" },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-14 lg:pt-20">
      <div className="container-site">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">A career platform &middot; Launching with Psychology &amp; Research</p>
          <h1 id="hero-title" className="caps mt-6 text-display">
            Build your future.
          </h1>
          <p className="prose-serif mx-auto mt-6 max-w-xl !text-[1.1875rem] text-muted">
            Strive helps people make better career decisions, build meaningful careers, develop professional
            skills and navigate the transitions in between, at every stage of working life.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
            <ButtonLink href="#model">Explore Strive</ButtonLink>
            <ArrowLink href="#journal" className="text-navy">
              Read the Journal
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 lg:mt-20">
          <figure>
            <ParallaxImage
              src="/images/hero-steps.jpg"
              alt="A woman climbing a wide flight of stone steps"
              sizes="(min-width: 1280px) 1184px, 100vw"
              priority
              className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
            />
            <figcaption className="mt-3 font-serif text-[0.875rem] italic text-muted">
              A career is built one considered step at a time.
            </figcaption>
          </figure>
        </Reveal>

        <dl className="mt-12 grid border-t border-line sm:grid-cols-3">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`py-6 sm:px-6 ${i === 0 ? "sm:pl-0" : "border-t border-line sm:border-l sm:border-t-0"}`}
            >
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-2 font-serif text-[1.0625rem] text-ink">{f.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
