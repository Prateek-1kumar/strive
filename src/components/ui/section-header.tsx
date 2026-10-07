import type { ReactNode } from "react";

/** Eyebrow, heading and an optional introduction, laid out on the grid. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6">
        {eyebrow && <p className={`eyebrow ${dark ? "!text-gold" : ""}`}>{eyebrow}</p>}
        <h2 id={id} className={`${eyebrow ? "mt-4" : ""} text-title ${dark ? "!text-paper" : ""}`}>
          {title}
        </h2>
      </div>
      {intro && (
        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className={`font-serif text-lede ${dark ? "text-paper/75" : "text-muted"}`}>{intro}</p>
        </div>
      )}
    </div>
  );
}
