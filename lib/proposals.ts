import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  Proposal,
  ProposalFrontmatter,
  ProposalSection,
  SECTION_KEYS,
  SectionKey,
} from "./types";

const PROPOSALS_DIR = path.join(process.cwd(), "content", "proposals");

function slugify(input: string): SectionKey | null {
  const normalised = input
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return (SECTION_KEYS as readonly string[]).includes(normalised)
    ? (normalised as SectionKey)
    : null;
}

function splitBodyIntoSections(body: string): ProposalSection[] {
  const lines = body.split("\n");
  const sections: ProposalSection[] = [];

  let currentHeading: string | null = null;
  let currentKey: SectionKey | null = null;
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

export function getProposalSlugs(): string[] {
  if (!fs.existsSync(PROPOSALS_DIR)) return [];
  return fs
    .readdirSync(PROPOSALS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(PROPOSALS_DIR, f), "utf8");
      const { data } = matter(raw);
      const fm = data as Partial<ProposalFrontmatter>;
      return fm.slug ?? f.replace(/\.md$/, "");
    });
}

export function getProposalBySlug(slug: string): Proposal | null {
  if (!fs.existsSync(PROPOSALS_DIR)) return null;
  const files = fs.readdirSync(PROPOSALS_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(PROPOSALS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as ProposalFrontmatter;
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

export function findSection(
  proposal: Proposal,
  key: SectionKey
): ProposalSection | undefined {
  return proposal.sections.find((s) => s.key === key);
}
