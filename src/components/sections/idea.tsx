import { MainCTA } from "@/components/ui/main-cta";

export function Idea() {
  return (
    <section
      id="idea"
      className="bg-[#FAF8F5] border-y border-navy/10 min-h-[50vh] py-8 sm:py-10 lg:py-12 flex items-center text-navy"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Headline with subtle kicker */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-navy/40 mb-3">
              [ 01 / The Idea ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.15rem] font-normal leading-[1.12] tracking-tight text-navy">
              Careers aren&rsquo;t{" "}
              <em className="font-serif italic font-normal text-navy">
                one-size-fits-all.
              </em>
              <span className="block mt-1.5 sm:mt-2 text-navy/40 font-normal">
                Neither are the decisions that shape them.
              </span>
            </h2>
          </div>

          {/* Right Column: Paragraph + CTA */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center">
            <p className="text-base sm:text-lg leading-[1.7] text-charcoal/80 font-normal">
              Strive is a career platform built on one belief: the right path looks different for everyone. 
              We combine career psychology and research with practical guidance — from your first decision to 
              your next transition — so you can choose with clarity and build with intent.
            </p>

            <div className="mt-6 sm:mt-8 flex items-center">
              <MainCTA
                buttonText="Discover the Strive Model"
                href="#model"
                variant="dark"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



