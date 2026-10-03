interface LogoProps {
  className?: string;
  dark?: boolean;
}

// Clean typographic Strive wordmark
export function Logo({ dark = false, className = "" }: LogoProps) {
  return (
    <span
      className={`font-serif text-[1.4rem] font-medium tracking-tight leading-none transition-colors duration-200 ${
        dark ? "text-navy" : "text-offwhite"
      } ${className}`}
    >
      Strive
    </span>
  );
}
