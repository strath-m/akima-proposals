import { Package } from "@/lib/types";
import { getComparisonHighlights } from "@/lib/comparison";
import { EyebrowPill } from "./EyebrowPill";
import { SectionReveal } from "./SectionReveal";

function formatPrice(price: string) {
  return price.replace(/^AUD\s+/i, "");
}

export function PackageComparison({ packages }: { packages: Package[] }) {
  return (
    <SectionReveal>
      <section id="compare" className="py-20 md:py-28">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:max-w-2xl">
          <EyebrowPill>Compare</EyebrowPill>
          <h2 className="text-3xl font-bold leading-none tracking-[-0.02em] text-ink md:text-5xl">
            At a glance
          </h2>
          <p className="text-base leading-7 text-text-secondary">
            Each option reflects a different level of depth. We can also stage
            this in phases over time if needed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 md:items-stretch">
          {packages.map((pkg) => (
            <ComparisonCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}

function ComparisonCard({ pkg }: { pkg: Package }) {
  const recommended = !!pkg.recommended;
  const highlights = getComparisonHighlights(pkg);

  return (
    <a
      href={`#${pkg.id}`}
      className={`group relative flex flex-col rounded-card overflow-hidden transition-colors duration-200 ${
        recommended
          ? "bg-bone-50 border border-rule md:-translate-y-2 md:shadow-[0_1px_0_var(--color-rule-soft)]"
          : "bg-bone-100 border border-rule-soft hover:border-rule"
      }`}
    >
      <div className="flex flex-1 flex-col gap-6 p-7 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <EyebrowPill>{pkg.eyebrow}</EyebrowPill>
          {recommended ? (
            <EyebrowPill variant="emberSoft">Recommended</EyebrowPill>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold leading-tight tracking-[-0.01em] text-ink">
            {pkg.name}
          </h3>
          <p className="text-sm leading-6 text-text-secondary">
            {pkg.bestFor}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            Investment (AUD)
          </span>
          <span className="text-2xl font-bold tracking-[-0.02em] text-ink">
            {formatPrice(pkg.price)}
          </span>
          <span className="text-xs uppercase tracking-[0.1em] text-text-muted">
            {pkg.timeline}
          </span>
        </div>

        <ul className="flex flex-col gap-2.5 border-t border-rule pt-5">
          {highlights.map((item, idx) => (
            <li
              key={idx}
              className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-x-3.5 text-sm leading-6 text-ink"
            >
              <span
                aria-hidden
                className="block h-px w-3 translate-y-[-0.22em] bg-ink"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ember underline-offset-4 group-hover:underline">
            View details →
          </span>
        </div>
      </div>
    </a>
  );
}
