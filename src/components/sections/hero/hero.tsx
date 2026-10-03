import HeroArt from "./hero-art";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[calc(100svh-3.5rem)] overflow-hidden bg-navy text-offwhite">
      <div className="absolute inset-y-0 right-0 w-full opacity-40 lg:w-[64%] lg:opacity-100 [mask-image:linear-gradient(to_right,transparent,#000_22%)]">
        <HeroArt />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-6xl flex-col justify-center px-6 py-14 lg:py-16">
        <div className="max-w-xl">
          <h1 className="text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[1.05] text-gold">Build your future with Strive.</h1>
          <p className="mt-8 max-w-md text-lg text-offwhite/75">
            Career clarity, professional growth and career psychology — designed for every stage of your working life.
          </p>
          <a href="#idea" className="mt-10 inline-block rounded-sm bg-gold px-7 py-3.5 text-sm font-medium text-navy">
            Explore Strive
          </a>
        </div>
      </div>
    </section>
  );
}
