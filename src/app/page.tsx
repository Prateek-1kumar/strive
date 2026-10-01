import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Currently } from "@/components/sections/currently/currently";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero/hero";
import { Idea } from "@/components/sections/idea";
import { Journal } from "@/components/sections/journal";
import { Model } from "@/components/sections/model/model";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Everything above the Journal sits on its own layer so the pinned Journal is only uncovered at the end */}
        <div className="relative z-10">
          <Hero />
          <Idea />
          <Model />
          <Currently />
        </div>
        <Journal />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
