import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";

// The five layers are a permanent part of the brand architecture — keep this list the single source of truth.
// Photos: drop four files per stage into public/stages/ named `<slug>-1.jpg` … `<slug>-4.jpg`.
const stages = [
  { slug: "decision", age: "16–18", title: "The Decision Layer", text: "Informed career decisions before choosing a direction." },
  { slug: "build", age: "18–25", title: "The Build Layer", text: "Turning direction into education, experience, skills and opportunity." },
  { slug: "skill", age: "25–35", title: "The Skill Layer", text: "Professional skills, visibility and assets to grow." },
  { slug: "specifics", age: "Profession-specific", title: "The Specifics", text: "Deep dives via workshops, webinars, resources and guidance." },
  { slug: "transition", age: "40+", title: "The Transition Layer", text: "Career change, reinvention and what’s next." },
];

const frame = "h-24 w-full rounded-sm object-cover md:h-40 lg:h-56";
const exists = (file: string) => fs.existsSync(path.join(process.cwd(), "public/stages", file));

function Photos({ slug, label }: { slug: string; label: string }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((n) => {
        const file = `${slug}-${n}.jpg`;
        return exists(file) ? (
          <Image key={n} src={`/stages/${file}`} alt={label} width={800} height={600} className={`${frame} grayscale-[.8] shadow-[0_16px_40px_-18px_rgba(6,37,74,.35)]`} />
        ) : (
          // ponytail: placeholder until the photo exists, no fs polling or fallback chain
          <div key={n} className={`${frame} bg-beige/70`} />
        );
      })}
    </div>
  );
}

export function Model() {
  const data = stages.map((s) => ({
    title: s.title,
    content: (
      <div>
        <p className="font-serif text-4xl leading-none text-navy md:text-5xl">{s.age}</p>
        <p className="mb-8 mt-4 max-w-md text-lg text-charcoal/85">{s.text}</p>
        <Photos slug={s.slug} label={s.title} />
      </div>
    ),
  }));

  return (
    <section id="model" className="bg-offwhite pb-16 pt-28 lg:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-5xl text-[clamp(1.875rem,4.5vw,3.9375rem)] leading-[1.06] text-navy">
          Five layers,{" "}
          <em className="text-[color-mix(in_srgb,var(--color-gold)_72%,var(--color-navy))]">one continuum.</em>
        </h2>
        <Timeline data={data} />
      </div>
    </section>
  );
}
