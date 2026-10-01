import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero/hero";
import { Idea } from "@/components/sections/idea";
import { Model } from "@/components/sections/model/model";
import { Placeholders } from "@/components/sections/placeholders";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Idea />
        <Model />
        <Placeholders />
      </main>
      <Footer />
    </>
  );
}
