import { Chapter } from "@/components/ui/chapter";
import { LineReveal, Reveal } from "@/components/ui/reveal";

const notes = [
  {
    mark: "1",
    text: "Career psychology studies how people choose work, adapt to it, and find meaning in it over a lifetime.",
  },
  {
    mark: "2",
    text: "Strive launches with Psychology & Research and grows one profession at a time.",
  },
];

export function Idea() {
  return (
    <section id="idea" className="relative py-[clamp(6rem,14vw,11rem)]">
      <div className="shell">
        <Chapter numeral="I" label="The Idea" aside="Why Strive exists" />

        <LineReveal
          className="mt-[clamp(3rem,7vw,6rem)] max-w-[17ch] text-[clamp(2.625rem,6.6vw,6.5rem)] leading-[0.95] tracking-[-0.035em] text-ink"
          lines={[
            <>
              Careers aren&rsquo;t <em>one-size-fits-all.</em>
            </>,
            <span key="b" className="mt-[0.12em] block text-ink/50">
              Neither are the decisions that shape them.
            </span>,
          ]}
        />

        <div className="mt-[clamp(4rem,9vw,8rem)] grid gap-12 lg:grid-cols-12 lg:gap-8">
          <aside className="order-2 flex flex-col gap-6 border-t border-ink/15 pt-6 lg:order-1 lg:col-span-3 lg:border-0 lg:pt-1">
            {notes.map((n) => (
              <Reveal key={n.mark} as="p" className="flex gap-3 text-[0.8125rem] leading-relaxed text-ink/60">
                <span className="italic-serif text-[1rem] leading-none text-gold-deep">{n.mark}</span>
                <span>{n.text}</span>
              </Reveal>
            ))}
          </aside>

          <div className="order-1 grid gap-8 lg:order-2 lg:col-span-8 lg:col-start-5 lg:grid-cols-2 lg:gap-12">
            <Reveal>
              <p className="dropcap serif-text text-[1.1875rem] text-charcoal">
                Most career advice is written for no one in particular: a list of options, a personality
                quiz, a well-meaning conversation that ends where it began. Real careers don&rsquo;t work
                like that. They are a series of decisions, made at different ages, with different
                information, under different pressures.<sup className="ml-0.5 text-[0.6em] text-gold-deep">1</sup>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="serif-text text-[1.1875rem] text-charcoal">
                Strive is built around that reality. We bring the rigour of psychology to the moments that
                actually shape a working life&nbsp;&mdash; choosing, building, growing, specialising and
                starting again&nbsp;&mdash; and we stay with people through each of them, profession by
                profession.<sup className="ml-0.5 text-[0.6em] text-gold-deep">2</sup>
              </p>
              <p className="mt-8 border-t border-ink/15 pt-5 text-[0.9375rem] text-ink">
                Not a counselling service. Not a course catalogue.
                <em className="mt-1 block text-[1.375rem]">A career platform.</em>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
