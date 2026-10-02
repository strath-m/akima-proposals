import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { NextConfig } from "next";

// Proposals with a `template` in their frontmatter are served only at /<slug>.
// Every /<slug>/... variant (other templates, backups) is rewritten to a page
// that doesn't exist, so it 404s.
function lockedSlugs(): string[] {
  const dir = path.join(process.cwd(), "content", "proposals");
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      file,
      data: matter(fs.readFileSync(path.join(dir, file), "utf8")).data,
    }))
    .filter(({ data }) => data.template)
    .map(({ file, data }) => data.slug ?? file.replace(/\.md$/, ""));
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async rewrites() {
    return {
      beforeFiles: lockedSlugs().map((slug) => ({
        source: `/${slug}/:path+`,
        destination: "/_locked-proposal",
      })),
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
