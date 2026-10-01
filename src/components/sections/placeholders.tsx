// Empty sections still to be designed, one by one. Replace each with its own component.
const sections = [
  { id: "how-it-works", bg: "bg-offwhite" },
  { id: "outcomes", bg: "bg-navy" },
  { id: "gallery", bg: "bg-beige" },
  { id: "cta", bg: "bg-navy" },
];

export function Placeholders() {
  return sections.map((s) => <section key={s.id} id={s.id} className={`${s.bg} h-64`} />);
}
