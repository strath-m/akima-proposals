import { Wordmark } from "./Wordmark";

export function Footer({ year = new Date().getFullYear() }: { year?: number }) {
  return (
    <footer className="border-t border-rule mt-20 py-12 md:py-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <Wordmark size="sm" />
          <p className="text-sm text-text-muted">
            Crafting unforgettable digital experiences that feel as good as they
            perform.
          </p>
        </div>

        <div className="flex flex-col gap-1 text-sm text-text-muted md:items-end">
          <a
            href="mailto:hello@akima.studio"
            className="text-ink hover:text-ember transition-colors"
          >
            hello@akima.studio
          </a>
          <span>© {year} Akima Studio</span>
        </div>
      </div>
    </footer>
  );
}
