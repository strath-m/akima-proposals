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

function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return getMarkdownFiles(fullPath);
    }

    return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function getSlugForFile(
  filePath: string,
  frontmatter: Partial<ProposalFrontmatter>
) {
  const relativePath = path
    .relative(PROPOSALS_DIR, filePath)
    .split(path.sep)
    .join("/");
  return frontmatter.slug ?? relativePath.replace(/\.md$/, "");
}

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
  return getMarkdownFiles(PROPOSALS_DIR)
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);
      return getSlugForFile(filePath, data as Partial<ProposalFrontmatter>);
    })
    .filter((slug) => !slug.includes("/"));
}

export function getDiscoveryProposalSlugs(): string[] {
  return getMarkdownFiles(PROPOSALS_DIR)
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);
      return getSlugForFile(filePath, data as Partial<ProposalFrontmatter>);
    })
    .filter((slug) => slug.startsWith("discovery/"))
    .map((slug) => slug.replace(/^discovery\//, ""));
}

export function getProposalBySlug(slug: string): Proposal | null {
  const files = getMarkdownFiles(PROPOSALS_DIR);

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as ProposalFrontmatter;
    const fileSlug = getSlugForFile(file, frontmatter);

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
