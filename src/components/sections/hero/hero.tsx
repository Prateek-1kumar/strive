import Image from "next/image";
import { MainCTA } from "@/components/ui/main-cta";

export function Hero() {
  return (
    <section id="hero" className="bg-white px-3 sm:px-5 md:px-6 lg:px-7 pb-3 sm:pb-4 md:pb-5 pt-1 sm:pt-2">
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="relative h-[calc(100svh-4.75rem)] min-h-[560px] w-full overflow-hidden rounded-[28px] sm:rounded-[36px] md:rounded-[44px] shadow-xs flex items-center justify-center">
          {/* Contemplative Study in Sunlight background image */}
          <Image
            src="/hero-bg.png"
            alt="Contemplative study in sunlight"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center select-none"
          />

          {/* Gentle cinematic darkening to ensure crisp white text legibility */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/25" />

          {/* Centered, clean & effortless white typography */}
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white flex flex-col items-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.12] tracking-tight text-white drop-shadow-xs">
              Build your future with Strive.
            </h1>

            <p className="mt-4 md:mt-5 max-w-xl text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-normal">
              Career clarity, professional growth and career psychology — designed for every stage of your working life.
            </p>

            <div className="mt-8 flex h-[54px] w-full items-center justify-center">
              <MainCTA buttonText="Explore Strive" href="#idea" variant="white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
