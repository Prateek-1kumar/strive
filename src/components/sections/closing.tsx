import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { layers, links } from "@/content/site";

const steps = ["Choose", "Build", "Grow", "Specialise", "Transition"];

export function Closing() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 lg:py-28">
      <Reveal className="container-site text-center">
        <p className="eyebrow">Work With Strive</p>
        <h2 id="contact-title" className="caps mx-auto mt-5 max-w-2xl text-title">
          Your career is still being built.
        </h2>
        <p className="prose-serif mx-auto mt-5 max-w-xl text-muted">
          Wherever you are in your working life, there is a next step. Tell us where you are, and we will point you
          to the workshop, resource or conversation that fits.
        </p>

        <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-y-2 font-serif text-[1.0625rem] text-navy">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center" title={layers[i]?.title}>
              {i > 0 && <span aria-hidden="true" className="mx-4 h-4 w-px bg-navy/30" />}
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
          <ButtonLink href={links.contact}>Connect With Strive</ButtonLink>
          <ArrowLink href={links.offers} className="text-navy">
            Explore current offers
          </ArrowLink>
        </div>
      </Reveal>
    </section>
  );
}
