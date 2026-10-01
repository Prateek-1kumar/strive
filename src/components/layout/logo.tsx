// Strive mark (from the brand reference) + serif wordmark, for dark backgrounds.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
        <rect width="40" height="40" rx="11" fill="rgba(255,255,255,.1)" />
        <path d="M11 27.5c0-6 3.4-9.4 8.2-11.2 3-1.1 5.6-2.2 5.6-4.6" fill="none" stroke="#D9B26A" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="26.6" cy="11" r="3" fill="#fff" />
        <circle cx="11" cy="28.6" r="2.1" fill="#D9B26A" opacity=".55" />
      </svg>
      <span className="font-serif text-2xl leading-none">Strive</span>
    </span>
  );
}
