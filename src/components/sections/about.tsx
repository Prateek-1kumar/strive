import { ArrowLink } from "@/components/ui/button";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { founder, links } from "@/content/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 lg:py-28">
      <div className="container-site">
        <div className="grid overflow-hidden bg-stone lg:grid-cols-2">
          <Reveal className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="eyebrow">About Strive</p>
            <h2 id="about-title" className="mt-4 text-title">
              Built from psychology. Designed for careers.
            </h2>
            <p className="prose-serif mt-6">
              Strive was founded by {founder.name}, a psychologist, to bring the discipline&rsquo;s rigour to the
              decisions that shape working lives.
            </p>
            <p className="prose-serif mt-4 text-ink/80">
              The approach is simple: understand the person and the stage they are at, give them evidence rather
              than opinion, and then the practical tools to act on it.
            </p>
            <div className="mt-8 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-serif text-[1.125rem] text-navy">{founder.name}</p>
                <p className="text-small text-muted">{founder.role}</p>
              </div>
              <ArrowLink href={links.linkedin} className="text-navy">
                Connect on LinkedIn
              </ArrowLink>
            </div>
          </Reveal>
          <ParallaxImage
            src="/images/about-library.jpg"
            alt="A reader at a table in a bookshop lined with tall shelves"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] lg:aspect-auto lg:min-h-[32rem]"
            strength={20}
          />
        </div>
      </div>
    </section>
  );
}
