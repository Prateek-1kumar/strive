import { Chapter } from "@/components/ui/chapter";
import { ModelAxis } from "./model-axis";
import { ModelLine } from "./model-line";

function Intro() {
  return (
    <>
      <Chapter numeral="II" label="The Strive Model" aside="Five layers, one continuum" dark />
      <div className="mt-[clamp(2rem,5vh,4rem)] grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="text-[clamp(2.75rem,min(6.2vw,10vh),6.25rem)] leading-[0.92] tracking-[-0.035em] text-paper lg:col-span-7">
          One career.
          <br />
          <em className="text-bone">Many stages.</em>
        </h2>
        <p className="serif-text max-w-[36ch] text-[1.1875rem] text-paper/75 lg:col-span-4 lg:col-start-9">
          Five layers that meet people where they are and stay for what comes next. Four follow the
          ages of a working life; the fifth runs alongside all of them.
        </p>
      </div>
    </>
  );
}

export function Model() {
  return (
    <section id="model" aria-labelledby="model-title" className="on-dark relative bg-ink text-paper">
      <span id="model-title" className="sr-only">
        The Strive Model
      </span>
      <ModelAxis intro={<Intro />} />
      <div className="shell py-24 lg:hidden">
        <Intro />
        <ModelLine />
      </div>
    </section>
  );
}
