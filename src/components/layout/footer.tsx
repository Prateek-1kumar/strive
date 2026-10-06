import { links, nav } from "@/content/site";

const columns = [
  { title: "Explore", items: nav },
  {
    title: "Connect",
    items: [
      { href: links.contact, label: "Work With Strive" },
      { href: links.substack, label: "Journal on Substack" },
      { href: links.linkedin, label: "LinkedIn" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-paper">
      <div className="container-site py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="wordmark text-[1.25rem]">Strive</p>
            <p className="mt-6 max-w-md font-serif text-[1.0625rem] leading-relaxed text-paper/75">
              A career platform grounded in career psychology. Built for every career, launching with Psychology
              and Research.
            </p>
            <p className="mt-6 text-small text-paper/60">
              The Journal is published on Substack.{" "}
              <a href={links.substack} className="text-link text-paper">
                Subscribe for new essays
              </a>
              .
            </p>
          </div>

          {columns.map((col, i) => (
            <nav key={col.title} aria-label={col.title} className={`lg:col-span-2 ${i === 0 ? "lg:col-start-8" : ""}`}>
              <p className="eyebrow !text-paper/50">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-small text-paper/85 transition-colors hover:text-paper">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/15 pt-6 text-[0.8125rem] text-paper/55 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Strive Careers. All rights reserved.</p>
          <p>Build your future.</p>
        </div>
      </div>
    </footer>
  );
}
