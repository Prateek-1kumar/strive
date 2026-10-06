import { NorthStar } from "./north-star";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <NorthStar className="h-[1.05em] w-auto text-gold" />
      <span
        className="font-serif text-[1.5rem] leading-none tracking-[-0.02em]"
        style={{ fontVariationSettings: '"opsz" 72, "SOFT" 30', fontWeight: 420 }}
      >
        Strive
      </span>
    </span>
  );
}
