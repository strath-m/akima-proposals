import Image from "next/image";

type Size = "sm" | "lg";

export function Wordmark({ size = "sm" }: { size?: Size }) {
  return (
    <Image
      src="/logo/akima-logo-wordmark-black-trademark.svg"
      alt="Akima"
      width={size === "lg" ? 132 : 84}
      height={size === "lg" ? 21 : 14}
      priority={size === "sm"}
    />
  );
}
