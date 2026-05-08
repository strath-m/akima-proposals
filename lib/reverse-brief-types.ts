import type { Contact } from "./types";

export type ReverseBriefFrontmatter = {
  client: string;
  slug?: string;
  briefTitle: string;
  preparedFor: string;
  preparedBy: string;
  date: string;
  contact?: Contact;
};

export type ReverseBriefSection = {
  key: ReverseBriefSectionKey;
  heading: string;
  body: string;
};

export const REVERSE_BRIEF_SECTION_KEYS = [
  "context",
  "understanding",
  "opportunity",
  "recommended-direction",
  "scope-notes",
  "next-steps",
] as const;

export type ReverseBriefSectionKey =
  (typeof REVERSE_BRIEF_SECTION_KEYS)[number];

export const REVERSE_BRIEF_SECTION_LABELS: Record<
  ReverseBriefSectionKey,
  string
> = {
  context: "Context",
  understanding: "Understanding",
  opportunity: "Opportunity",
  "recommended-direction": "Recommended direction",
  "scope-notes": "Scope notes",
  "next-steps": "Next steps",
};

export type ReverseBrief = {
  slug: string;
  frontmatter: ReverseBriefFrontmatter;
  sections: ReverseBriefSection[];
};
