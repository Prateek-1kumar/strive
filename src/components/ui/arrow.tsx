// Hairline arrows drawn for Strive rather than taken from an icon set.
export function Arrow({ className = "", direction = "right" }: { className?: string; direction?: "right" | "up-right" | "down" }) {
  const rotate = direction === "up-right" ? -45 : direction === "down" ? 90 : 0;
  return (
    <svg
      viewBox="0 0 20 10"
      className={className}
      aria-hidden="true"
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
    >
      <path d="M0 5h18.5M14 .8 18.6 5 14 9.2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
