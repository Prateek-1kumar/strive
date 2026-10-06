import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Drift } from "@/components/ui/drift";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";

const facts = [
  { value: "Career psychology", text: "The evidence behind every programme" },
  { value: "Five stages", text: "From the first decision at 16 to 40+" },
  { value: "Two fields first", text: "Psychology and Research, more to follow" },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-24 pt-10 lg:pb-32 lg:pt-16">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6 lg:pr-6">
          <p className="eyebrow">A career platform &middot; Launching with Psychology &amp; Research</p>
          <h1 id="hero-title" className="mt-5 text-display">
            Build your future.
          </h1>
          <p className="prose-serif mt-6 max-w-xl !text-[1.1875rem] text-muted">
            Strive helps people make better career decisions, build meaningful careers, develop professional skills
            and navigate the transitions in between, with guidance grounded in career psychology.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="#model">Explore Strive</ButtonLink>
            <ButtonLink href="#journal" variant="secondary">
              Read the Journal
            </ButtonLink>
          </div>

          <dl className="mt-14 grid gap-6 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.value}>
                <dt className="font-serif text-[1.125rem] text-navy">{f.value}</dt>
                <dd className="mt-1 text-[0.875rem] leading-snug text-muted">{f.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="relative lg:col-span-6">
          {/* Warm panel behind the photograph, moving at its own pace */}
          <Drift distance={30} className="absolute -right-6 top-10 hidden h-[85%] w-[70%] rounded-[2rem] bg-beige/60 lg:block" />

          <Reveal delay={0.1} className="relative">
            <ParallaxImage
              src="/photos/hero-reading.jpg"
              alt="A woman reading in a sunlit bookshop café"
              sizes="(min-width: 1024px) 48vw, 100vw"
              priority
              className="aspect-[4/5] rounded-[2rem] shadow-[0_30px_60px_-30px_rgb(6_37_74/0.45)] sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </Reveal>

          <Drift distance={-24} className="absolute -bottom-8 left-4 right-4 sm:left-6 sm:right-auto sm:w-80 lg:-left-10">
            <div className="surface p-5">
              <p className="eyebrow">Now at Strive</p>
              <p className="mt-2 font-serif text-[1.125rem] leading-snug text-navy">
                Strive Specifics for Psychology and Research careers
              </p>
              <ArrowLink href="#specifics" className="mt-3 text-navy">
                See what&rsquo;s included
              </ArrowLink>
            </div>
          </Drift>
        </div>
      </div>
    </section>
  );
}
