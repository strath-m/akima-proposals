"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";

type NavLink = { label: string; href: string };

export function StickyNav({
  links,
}: {
  links: NavLink[];
}) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;
      const nearTop = currentScrollY < 24;

      setVisible(nearTop || scrollingUp);
      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-md transition-all duration-200 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-6 md:px-10">
        <a href="#top" aria-label="Top of proposal" className="shrink-0">
          <Wordmark size="sm" />
        </a>

        <nav className="ml-auto hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
