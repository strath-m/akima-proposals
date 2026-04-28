import type { Metadata } from "next";
import localFont from "next/font/local";
import { AgentationProvider } from "@/components/AgentationProvider";
import "../styles/globals.css";

const fontSans = localFont({
  src: "../public/fonts/UncutSans-Variable.woff2",
  weight: "300 900",
  style: "normal",
  display: "swap",
  variable: "--font-uncut-sans",
});

export const metadata: Metadata = {
  title: "Akima Studio",
  description: "Unforgettable digital experiences & brands.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body>
        {children}
        <AgentationProvider />
      </body>
    </html>
  );
}
