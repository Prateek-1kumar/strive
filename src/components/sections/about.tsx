import { ArrowLink } from "@/components/ui/button";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { founder, links } from "@/content/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 lg:py-28">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-5">
            <h2 id="about-title" className="text-title">
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
            <div className="surface mt-10 flex flex-col gap-4 p-6 rounded-[1.5rem] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-serif text-[1.125rem] text-navy">{founder.name}</p>
                <p className="text-small text-muted">{founder.role}</p>
              </div>
              <ArrowLink href={links.linkedin} className="text-navy">
                Connect on LinkedIn
              </ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="order-1 lg:order-2 lg:col-span-7">
            <ParallaxImage
              src="/photos/about-bookshop.jpg"
              alt="A reader at a desk in a bookshop lined with tall shelves"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[4/3] rounded-[2rem] shadow-[0_30px_60px_-30px_rgb(6_37_74/0.4)]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
