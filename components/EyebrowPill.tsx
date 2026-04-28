import { ReactNode } from "react";

type Variant = "bone" | "ember" | "emberSoft";

const variants: Record<Variant, string> = {
  bone: "bg-bone-100 text-ink",
  ember: "bg-akima-orange-500 text-white",
  emberSoft: "bg-akima-orange-100 text-akima-orange-700",
};

export function EyebrowPill({
  variant = "bone",
  children,
  className,
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center self-start rounded-pill px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] ${variants[variant]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
