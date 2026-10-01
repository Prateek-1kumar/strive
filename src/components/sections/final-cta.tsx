export function FinalCta() {
  return (
    <section id="cta" className="relative z-10 overflow-hidden bg-beige py-32 text-center lg:py-48">
      <div className="relative mx-auto max-w-4xl px-6">
        <h2 className="text-[clamp(2.25rem,6vw,5.25rem)] leading-[1.04] text-navy">Your career is still being built.</h2>
        <p className="mt-6 font-serif text-[clamp(1.25rem,2vw,1.625rem)] italic text-navy/60">
          Start where you are. Build from there.
        </p>
        <a
          href="#cta"
          className="group mt-12 inline-flex items-center gap-3 bg-gold px-8 py-4 text-sm font-medium text-navy transition-colors duration-300 hover:bg-navy hover:text-offwhite"
        >
          Work With Strive
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
