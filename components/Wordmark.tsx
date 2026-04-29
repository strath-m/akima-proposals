import Image from "next/image";

type Size = "sm" | "lg";

export function Wordmark({ size = "sm" }: { size?: Size }) {
  return (
    <Image
      src="/logo/akima-logo-horizontal-black-trademark.svg"
      alt="Akima"
      width={size === "lg" ? 220 : 165}
      height={size === "lg" ? 16 : 12}
      priority={size === "sm"}
    />
  );
}
