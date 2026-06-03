import { Package } from "./types";

const MAX_HIGHLIGHTS = 5;

export function getComparisonHighlights(pkg: Package): string[] {
  const comparisonHighlights = pkg.comparisonHighlights ?? [];
  if (comparisonHighlights.length > 0) {
    return comparisonHighlights.slice(0, MAX_HIGHLIGHTS);
  }

  const highlights: string[] = [];
  for (const category of pkg.categories ?? []) {
    const items = category.items ?? [];
    if (items.length > 0) {
      highlights.push(items[0]);
    }
    if (highlights.length >= MAX_HIGHLIGHTS) break;
  }

  return highlights;
}

export function buildMailto(
  email: string,
  subject: string,
  body: string
): string {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${email}?${params.toString().replace(/\+/g, "%20")}`;
}
