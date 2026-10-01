import Image from "next/image";
import { cards } from "./cards";

export function Currently() {
  return (
    <section id="currently" className="bg-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-navy">Currently at Strive</h2>
          <a
            href="#psychology"
            className="group relative inline-flex items-center gap-2 border-b border-navy/20 pb-1.5 text-sm font-medium text-navy after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100"
          >
            Explore Psychology &amp; Research
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <article key={c.id} id={c.id} className="group flex flex-col border border-navy/10 bg-white">
              <div className={`relative aspect-[16/10] overflow-hidden bg-beige/40`}>
                <Image
                  src={`/cards/${c.id}.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-white px-2.5 py-1.5 text-sm tabular-nums text-navy">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-3xl leading-tight text-navy">{c.title}</h3>
                <p className="mt-2 text-charcoal/75">{c.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <li key={t} className="bg-offwhite px-2.5 py-1 text-sm text-charcoal/80">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-5 text-sm text-charcoal/65">{c.tagline}</p>
                <a
                  href={`#${c.id}`}
                  className="relative mt-3 flex items-center justify-between overflow-hidden bg-offwhite px-4 py-3 text-navy transition-colors duration-500 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-navy before:transition-transform before:duration-500 before:ease-out group-hover:text-offwhite group-hover:before:scale-x-100"
                >
                  <span className="relative">{c.cta}</span>
                  <span className="relative transition-transform duration-500 ease-out group-hover:-rotate-45">&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
