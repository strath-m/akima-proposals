import { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "ink" | "ember" | "ghost";
type Size = "default" | "sm";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold uppercase tracking-[0.08em] transition-colors duration-150 whitespace-nowrap";

const sizes: Record<Size, string> = {
  default: "h-[52px] px-7 text-sm",
  sm: "h-10 px-5 text-xs",
};

const variants: Record<Variant, string> = {
  ink: "bg-ink text-paper hover:bg-ember",
  ember: "bg-ember text-white hover:bg-ink",
  ghost: "bg-transparent text-ink border border-rule-strong hover:border-ink",
};

export function Button({
  variant = "ink",
  size = "default",
  className,
  children,
  ...rest
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className ?? ""}`;
  return (
    <a className={cls} {...rest}>
      {children}
    </a>
  );
}
