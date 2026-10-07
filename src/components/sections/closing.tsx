import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { links } from "@/content/site";

const steps = ["Choose", "Build", "Grow", "Specialise", "Transition"];

export function Closing() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-20 lg:pb-28">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2rem] text-paper">
          <ParallaxImage
            src="/photos/specific-research.jpg"
            alt=""
            sizes="100vw"
            strength={60}
            className="!absolute inset-0 !bg-navy"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/85 to-navy/95" />

          <Reveal className="relative mx-auto max-w-2xl px-6 py-20 text-center sm:py-24 lg:py-28">
            <p className="eyebrow !text-gold">Work With Strive</p>
            <h2 id="contact-title" className="mt-5 text-title !text-paper">
              Your career is still being built.
            </h2>
            <p className="prose-serif mx-auto mt-5 max-w-xl !text-paper/80">
              Wherever you are in your working life, there is a next step. Tell us where you are, and we will point
              you to the workshop, resource or conversation that fits.
            </p>

            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {steps.map((s) => (
                <li key={s} className="rounded-full bg-white/10 px-4 py-1.5 text-[0.875rem] text-paper/90 backdrop-blur-sm">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
              <ButtonLink href={links.contact} variant="inverse">
                Connect With Strive
              </ButtonLink>
              <ArrowLink href={links.offers} className="text-paper">
                Explore current offers
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
