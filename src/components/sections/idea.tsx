export function Idea() {
  return (
    <section id="idea" className="bg-offwhite py-28 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-5xl text-[clamp(1.875rem,4.5vw,3.9375rem)] leading-[1.06] text-navy">
          Careers aren&rsquo;t{" "}
          <em className="text-[color-mix(in_srgb,var(--color-gold)_72%,var(--color-navy))]">one-size-fits-all.</em>
          <span className="block text-navy/45">Neither are the decisions that shape them.</span>
        </h2>
        <div className="mt-12 grid gap-10 border-t border-gold/60 pt-10 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-lg text-charcoal/85">
              Strive is a career platform built on one belief: the right path looks different for everyone. We combine
              career psychology and research with practical guidance — from your first decision to your next
              transition — so you can choose with clarity and build with intent.
            </p>
            <a
              href="#model"
              className="group relative mt-8 inline-flex items-center gap-2 border-b border-navy/20 pb-1.5 text-sm font-medium text-navy after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100"
            >
              Discover the Strive Model
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
