// Section skeleton — alternating navy / off-white / beige. Content filled in section by section.
const sections = [
  { id: "hero", bg: "bg-navy text-offwhite" },
  { id: "positioning", bg: "bg-offwhite" },
  { id: "what-we-do", bg: "bg-beige" },
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
        {sections.map((s) => (
          <section key={s.id} id={s.id} className={`${s.bg} px-6 py-24`}>
            <div className="mx-auto max-w-6xl">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-gold">
                {s.id}
              </p>
            </div>
          </section>
        ))}
      </main>
      <footer className="bg-navy px-6 py-10 text-sm text-offwhite/70">
        <div className="mx-auto max-w-6xl">© Strive</div>
      </footer>
    </>
  );
}
