import { Reveal } from "@/components/ui/reveal";
import { principles } from "@/content/site";

export function Idea() {
  return (
    <section id="idea" aria-labelledby="idea-title" className="py-20 lg:py-28">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <h2 id="idea-title" className="text-title">
              Careers aren&rsquo;t one-size-fits-all. Neither are the decisions that shape them.
            </h2>
          </Reveal>

          <Reveal delay={0.05} className="space-y-5 lg:col-span-6 lg:col-start-7">
            <p className="prose-serif">
              Most career advice is written for no one in particular: a list of options, a personality quiz, a
              conversation that ends where it began. Real careers are a series of decisions, made at different
              ages, with different information and under different pressures.
            </p>
            <p className="prose-serif text-ink/80">
              Strive is built around that reality. We bring the evidence of career psychology to the moments that
              shape a working life, from choosing a first direction to deciding what comes next, and organise it by
              stage and by profession so it is useful to the person reading it.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.06} className="surface h-full p-8">
                <p className="font-serif text-[0.9375rem] text-gold-text">0{i + 1}</p>
                <h3 className="mt-4 text-heading">{p.title}</h3>
                <p className="mt-3 text-small text-muted">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
