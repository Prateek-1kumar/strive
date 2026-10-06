import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse";

const styles: Record<Variant, string> = {
  primary: "bg-navy text-paper hover:bg-navy-deep",
  secondary: "border border-navy/25 text-navy hover:border-navy hover:bg-navy/[0.03]",
  inverse: "bg-paper text-navy hover:bg-white",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex h-11 items-center justify-center whitespace-nowrap rounded-[3px] px-5 text-[0.9375rem] font-medium transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/** Text link with a trailing arrow that moves a few pixels on hover. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-1.5 text-small font-medium ${className}`}>
      <span className="text-link">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
        &rarr;
      </span>
    </a>
  );
}
