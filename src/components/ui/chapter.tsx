/**
 * Chapter folio that opens every section — a roman numeral, a title and a
 * hairline that runs to the margin, the way a well-set book opens a part.
 */
export function Chapter({
  numeral,
  label,
  aside,
  dark = false,
}: {
  numeral: string;
  label: string;
  aside?: string;
  dark?: boolean;
}) {
  return (
    <div className={`flex items-baseline gap-4 ${dark ? "text-paper/70" : "text-ink/70"}`}>
      <span className={`italic-serif text-[1.25rem] leading-none ${dark ? "text-gold" : "text-ink"}`}>
        {numeral}.
      </span>
      <span className="folio">{label}</span>
      <span aria-hidden="true" className={`h-px flex-1 translate-y-[-0.3em] ${dark ? "bg-paper/15" : "bg-ink/15"}`} />
      {aside && <span className="folio hidden sm:inline">{aside}</span>}
    </div>
  );
}
