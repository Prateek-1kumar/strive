import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse";

const styles: Record<Variant, string> = {
  primary: "bg-navy text-paper shadow-[0_8px_20px_-10px_rgb(6_37_74/0.6)] hover:bg-navy-deep",
  secondary: "bg-white text-navy shadow-[0_1px_2px_rgb(6_37_74/0.08)] hover:bg-stone",
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
      className={`inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full px-6 text-[0.9375rem] font-medium transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/** Text link with a trailing arrow that moves a few pixels on hover. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-1.5 text-small font-medium ${className}`}>
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        &rarr;
      </span>
    </a>
  );
}
