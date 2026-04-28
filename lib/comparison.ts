import { Package } from "./types";

const MAX_HIGHLIGHTS = 5;

export function getComparisonHighlights(pkg: Package): string[] {
  if (pkg.comparisonHighlights && pkg.comparisonHighlights.length > 0) {
    return pkg.comparisonHighlights.slice(0, MAX_HIGHLIGHTS);
  }

  const highlights: string[] = [];
  for (const category of pkg.categories) {
    if (category.items.length > 0) {
      highlights.push(category.items[0]);
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
