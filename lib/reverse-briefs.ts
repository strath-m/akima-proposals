import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  REVERSE_BRIEF_SECTION_KEYS,
  ReverseBrief,
  ReverseBriefFrontmatter,
  ReverseBriefSection,
  ReverseBriefSectionKey,
} from "./reverse-brief-types";

const REVERSE_BRIEFS_DIR = path.join(
  process.cwd(),
  "content",
  "reverse-briefs"
);

function slugify(input: string): ReverseBriefSectionKey | null {
  const normalised = input
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return (REVERSE_BRIEF_SECTION_KEYS as readonly string[]).includes(normalised)
    ? (normalised as ReverseBriefSectionKey)
    : null;
}

function splitBodyIntoSections(body: string): ReverseBriefSection[] {
  const lines = body.split("\n");
  const sections: ReverseBriefSection[] = [];

  let currentHeading: string | null = null;
  let currentKey: ReverseBriefSectionKey | null = null;
  let currentBody: string[] = [];

  const flush = () => {
    if (currentHeading && currentKey) {
      sections.push({
        key: currentKey,
        heading: currentHeading,
        body: currentBody.join("\n").trim(),
      });
    }
  };

  for (const line of lines) {
    const h1Match = line.match(/^#\s+(.+?)\s*$/);
    if (h1Match) {
      flush();
      currentHeading = h1Match[1].trim();
      currentKey = slugify(currentHeading);
      currentBody = [];
    } else if (currentHeading) {
      currentBody.push(line);
    }
  }
  flush();

  return sections.filter((s) => s.body.length > 0);
}

export function getReverseBriefSlugs(): string[] {
  if (!fs.existsSync(REVERSE_BRIEFS_DIR)) return [];
  return fs
    .readdirSync(REVERSE_BRIEFS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(REVERSE_BRIEFS_DIR, f), "utf8");
      const { data } = matter(raw);
      const fm = data as Partial<ReverseBriefFrontmatter>;
      return fm.slug ?? f.replace(/\.md$/, "");
    });
}

export function getReverseBriefBySlug(slug: string): ReverseBrief | null {
  if (!fs.existsSync(REVERSE_BRIEFS_DIR)) return null;
  const files = fs
    .readdirSync(REVERSE_BRIEFS_DIR)
    .filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(REVERSE_BRIEFS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as ReverseBriefFrontmatter;
    const fileSlug = frontmatter.slug ?? file.replace(/\.md$/, "");

    if (fileSlug === slug) {
      return {
        slug: fileSlug,
        frontmatter,
        sections: splitBodyIntoSections(content),
      };
    }
  }

  return null;
}

export function findReverseBriefSection(
  reverseBrief: ReverseBrief,
  key: ReverseBriefSectionKey
): ReverseBriefSection | undefined {
  return reverseBrief.sections.find((s) => s.key === key);
}
