import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
import { Closing } from "@/components/sections/closing";
import { Hero } from "@/components/sections/hero";
import { Idea } from "@/components/sections/idea";
import { Journal } from "@/components/sections/journal";
import { Model } from "@/components/sections/model";
import { Specifics } from "@/components/sections/specifics";

export default function Home() {
  return (
    <>
      <a
        href="#idea"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
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
        <About />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
