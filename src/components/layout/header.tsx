export function Header() {
  return (
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
  );
}
