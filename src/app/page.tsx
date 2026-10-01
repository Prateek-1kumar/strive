// Section skeleton — alternating navy / off-white / beige. Content filled in section by section.
import HeroArt from "./hero-art";

const sections = [
  { id: "model", bg: "bg-beige" },
  { id: "how-it-works", bg: "bg-offwhite" },
  { id: "outcomes", bg: "bg-navy text-offwhite" },
  { id: "gallery", bg: "bg-beige" },
  { id: "cta", bg: "bg-navy text-offwhite" },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-navy text-offwhite">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-sm font-medium">
          <a href="#hero" className="font-serif text-xl">
            <span className="text-gold">★</span> Strive
          </a>
          <a href="#cta" className="bg-gold px-4 py-2 text-navy">
            Get started
          </a>
        </nav>
      </header>
      <main>
        <section id="hero" className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-navy text-offwhite">
          <div className="absolute inset-y-0 right-0 w-full opacity-40 lg:w-[64%] lg:opacity-100 [mask-image:linear-gradient(to_right,transparent,#000_22%)]">
            <HeroArt />
          </div>
          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center px-6 py-20">
            <div className="max-w-xl">
              <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] uppercase tracking-[0.08em]">Strive</h1>
              <p className="mt-5 font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-gold">Build your future.</p>
              <p className="mt-8 max-w-md text-lg text-offwhite/75">
                Career clarity, professional growth and career psychology — designed for every stage of your working life.
              </p>
              <a href="#idea" className="mt-10 inline-block bg-gold px-7 py-3.5 text-sm font-medium text-navy">
                Explore Strive
              </a>
            </div>
            <p className="absolute bottom-10 left-6 flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-offwhite/60">
              <span className="h-px w-8 bg-gold" /> Starting with Psychology &amp; Research
            </p>
          </div>
        </section>
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
                  Strive is a career platform built on one belief: the right path looks different for everyone. We
                  combine career psychology and research with practical guidance — from your first decision to your
                  next transition — so you can choose with clarity and build with intent.
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
        {sections.map((s) => (
          <section key={s.id} id={s.id} className={`${s.bg} px-6 py-24`}>
            <div className="mx-auto h-40 max-w-6xl" />
          </section>
        ))}
      </main>
      <footer className="bg-navy px-6 py-10 text-sm text-offwhite/70">
        <div className="mx-auto max-w-6xl">© Strive</div>
      </footer>
    </>
  );
}
