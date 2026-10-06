import { NorthStar } from "@/components/brand/north-star";
import { links, nav } from "@/content/site";

const columns = [
  { title: "Strive", items: nav },
  {
    title: "Elsewhere",
    items: [
      { href: links.substack, label: "Substack" },
      { href: links.linkedin, label: "LinkedIn" },
      { href: links.contact, label: "Work With Strive" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink-deep text-paper">
      <div className="shell pt-20">
        <div className="grid gap-12 border-b border-paper/12 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="serif-text max-w-[28ch] text-[1.375rem] text-paper/85">
              A career platform for every career, launching with <em>Psychology &amp; Research.</em>
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="md:col-span-3 md:first-of-type:col-start-7">
              <p className="folio text-paper/45">{col.title}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="link-rule text-[0.9375rem] text-paper/80 hover:text-paper">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 py-6 text-[0.8125rem] text-paper/45 md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} Strive Careers. Build your future.</p>
          <p>Set in Fraunces &amp; Schibsted Grotesk.</p>
        </div>
      </div>

      {/* The wordmark, set large and cropped by the page edge like a masthead. */}
      <div aria-hidden="true" className="relative -mb-[0.24em] select-none px-[var(--gutter)] text-center">
        <span className="serif inline-flex items-start gap-[0.04em] text-[clamp(7rem,30vw,30rem)] leading-[0.8] tracking-[-0.05em] text-paper/[0.07]">
          Strive
          <NorthStar className="mt-[0.1em] h-[0.32em] w-auto text-gold/40" />
        </span>
      </div>
    </footer>
  );
}
