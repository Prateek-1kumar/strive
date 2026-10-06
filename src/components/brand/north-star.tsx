// The Strive mark: a four-point north star, drawn from the brand logo.
// Taller than it is wide, so it reads as a direction rather than a sparkle.
export function NorthStar({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 32"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d="M12 0C12.75 9.6 14.6 14.7 24 16 14.6 17.3 12.75 22.4 12 32 11.25 22.4 9.4 17.3 0 16 9.4 14.7 11.25 9.6 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
