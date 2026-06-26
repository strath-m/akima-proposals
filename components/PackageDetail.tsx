import { CategoryItem, Package } from "@/lib/types";
import { EyebrowPill } from "./EyebrowPill";
import { SectionReveal } from "./SectionReveal";

function formatPrice(price: string) {
  return price.replace(/^(AUD|USD)\s+/i, "");
}

function getPriceLabel(pkg: Package) {
  if (pkg.priceLabel) return pkg.priceLabel;
  if (/^USD\s+/i.test(pkg.price)) return "Investment (USD)";
  return "Investment (AUD)";
}

export function PackageDetail({
  pkg,
  showRecommended = true,
}: {
  pkg: Package;
  showRecommended?: boolean;
}) {
  const recommended = showRecommended && !!pkg.recommended;
  const categories = (pkg.categories ?? []).filter(
    (category) => (category.items ?? []).length > 0
  );
  const priceGridClass = pkg.bestFor
    ? "md:grid-cols-3"
    : "md:grid-cols-2";

  return (
    <SectionReveal>
      <section
        id={pkg.id}
        className="relative overflow-hidden rounded-card border border-rule bg-bone-100"
      >
        <div className="px-6 py-12 md:px-12 md:py-16">
          {/* Header: eyebrow, name, summary */}
          <div className="flex flex-col gap-5 md:max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <EyebrowPill>{pkg.eyebrow}</EyebrowPill>
              {recommended ? (
                <EyebrowPill variant="emeraldSoft">Recommended</EyebrowPill>
              ) : null}
            </div>

            <h3 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-ink md:text-5xl">
              {pkg.name}
            </h3>

            <p className="text-base leading-7 text-text-secondary md:text-lg">
              {pkg.summary}
            </p>
          </div>

          {/* Price block */}
          <div
            className={`mt-10 grid grid-cols-1 gap-y-6 border-y border-rule py-8 ${priceGridClass} md:gap-x-10 md:py-10`}
          >
            <PriceCell label={getPriceLabel(pkg)} value={formatPrice(pkg.price)} emphasis />
            <PriceCell label="Timeline" value={pkg.timeline} />
            {pkg.bestFor ? (
              <PriceCell label="Best for" value={pkg.bestFor} />
            ) : null}
          </div>

          {categories.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
              {categories.map((category) => (
                <div key={category.title} className="flex flex-col gap-5">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-bone-600">
                    {category.title}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {(category.items ?? []).map((item, idx) => (
                      <CategoryListItem key={idx} item={item} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}

          {pkg.deliverables && pkg.deliverables.length > 0 ? (
            <div className="mt-12 border-t border-rule pt-10">
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-bone-600">
                Deliverables
              </h4>
              <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
                {pkg.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-x-3.5 text-base leading-7 text-ink"
                  >
                    <span
                      aria-hidden
                      className="block h-px w-3 translate-y-[-0.22em] bg-ink"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </SectionReveal>
  );
}

function CategoryListItem({ item }: { item: CategoryItem }) {
  if (typeof item === "string") {
    return (
      <li className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-x-3.5 text-base leading-7 text-ink">
        <span
          aria-hidden
          className="block h-px w-3 translate-y-[-0.22em] bg-ink"
        />
        {item}
      </li>
    );
  }

  return (
    <li className="grid grid-cols-[1rem_minmax(0,1fr)] gap-x-3.5 text-base leading-7 text-ink">
      <span aria-hidden className="mt-[0.85em] block h-px w-3 bg-ink" />
      <span className="flex flex-col gap-1">
        <span className="font-semibold leading-6 text-ink">{item.title}</span>
        {item.description ? (
          <span className="text-[0.95rem] leading-6 text-text-secondary">
            {item.description}
          </span>
        ) : null}
      </span>
    </li>
  );
}

function PriceCell({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
        {label}
      </span>
      <span
        className={
          emphasis
            ? "text-3xl font-bold leading-none tracking-[-0.02em] text-ink md:text-4xl"
            : "text-base font-medium leading-6 text-ink"
        }
      >
        {value}
      </span>
    </div>
  );
}
