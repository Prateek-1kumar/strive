import { Logo } from "./logo";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#idea", label: "The Idea" },
  { href: "#model", label: "The Strive Model" },
  { href: "#currently", label: "Currently" },
  { href: "#journal", label: "Journal" },
  { href: "#cta", label: "Work With Strive" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-offwhite">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <a href="#hero" aria-label="Strive, back to top">
            <Logo />
          </a>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-offwhite/65">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors duration-300 hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="pb-8 text-xs text-offwhite/40">© {new Date().getFullYear()} Strive. Build your future.</p>
      </div>
    </footer>
  );
}
