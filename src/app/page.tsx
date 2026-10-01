import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Currently } from "@/components/sections/currently/currently";
import { Closing } from "@/components/sections/closing";
import { Hero } from "@/components/sections/hero/hero";
import { Idea } from "@/components/sections/idea";
import { Model } from "@/components/sections/model/model";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Idea />
        <Model />
        <Currently />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
