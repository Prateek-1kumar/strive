import type { ReactNode } from "react";
import { Arrow } from "./arrow";

type Tone = "ink" | "paper";

/**
 * The single primary action. A squared plate whose label rolls up on hover,
 * revealing the same words underneath — movement without changing the message.
 */
export function ButtonLink({
  href,
  children,
  tone = "ink",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
  onClick?: () => void;
}) {
  const palette =
    tone === "ink"
      ? "bg-ink text-paper hover:bg-ink-deep"
      : "bg-paper text-ink hover:bg-white";

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex h-12 shrink-0 items-center whitespace-nowrap gap-5 rounded-[2px] pl-6 pr-5 text-[0.9375rem] font-medium transition-colors duration-500 ease-editorial ${palette} ${className}`}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-editorial group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-editorial group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span className="relative flex h-full items-center border-l border-current/20 pl-4">
        <Arrow className="h-2.5 w-5 transition-transform duration-500 ease-editorial group-hover:translate-x-1" />
      </span>
    </a>
  );
}

/** Quiet secondary action: words, a hairline, an arrow. */
export function TextLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const isExternal = external && href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-baseline gap-3 text-[0.9375rem] font-medium ${className}`}
    >
      <span className="link-rule">{children}</span>
      <Arrow
        direction={external ? "up-right" : "right"}
        className="h-2 w-4 shrink-0 translate-y-[-0.1em] transition-transform duration-500 ease-editorial group-hover:translate-x-1"
      />
    </a>
  );
}
