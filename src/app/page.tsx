import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Founder } from "@/components/sections/founder";
import { Hero } from "@/components/sections/hero/hero";
import { Idea } from "@/components/sections/idea";
import { Journal } from "@/components/sections/journal";
import { Model } from "@/components/sections/model/model";
import { Specifics } from "@/components/sections/specifics/specifics";
import { WorkWith } from "@/components/sections/work-with";

export default function Home() {
  return (
    <>
      <a
        href="#idea"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Idea />
        <Model />
        <Specifics />
        <Journal />
        <Founder />
        <WorkWith />
      </main>
      <Footer />
    </>
  );
}
