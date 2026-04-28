# Akima Proposals

A premium one-page proposal renderer for Akima Studio.

Markdown in → beautiful client-facing proposal page out.

## How it works

Every proposal lives as a single markdown file in `content/proposals/`. The slug in frontmatter (or the filename) becomes the URL path. Push to main, Vercel deploys, send the client the link.

```
content/proposals/a-trip-to-transformation.md  →  proposals.akima.studio/a-trip-to-transformation
content/proposals/acme-corp.md                  →  proposals.akima.studio/acme-corp
```

## Adding a new proposal

1. Duplicate `content/proposals/a-trip-to-transformation.md` and rename it (the new filename becomes the URL slug if you don't override it).
2. Edit the frontmatter and body to match the new client.
3. `git add`, commit, push. Vercel rebuilds and the new URL is live.

## Markdown schema

Frontmatter is YAML. Body is plain markdown. Each `# Heading` in the body maps to a known section slot — unknown headings are silently dropped.

**Required frontmatter:**
- `client`, `proposalTitle`, `preparedFor`, `preparedBy`, `date`
- `packages` (array of options — see example file for shape)

**Optional frontmatter:**
- `slug` (defaults to filename)
- `validUntil`, `recommendedOption` (must match a `package.id`)
- `contact` (name, role, email, phone — used in CTA + mailto)
- `cta` (overrides default labels and email subjects)
- Per-package: `comparisonHighlights` (array — overrides auto-extraction)

**Recognised body sections** (each renders only if present):
`# Overview` · `# Goals` · `# Why this matters` · `# Optional add-ons` · `# Exclusions` · `# Payment & terms` · `# Next steps` · `# FAQs` · `# Notes`

Section heading match is case-insensitive and tolerates `&` / spacing variations.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000/a-trip-to-transformation
npm run build        # static export, all proposals pre-rendered
```

The root URL `/` redirects to `https://akima.studio`. Unknown slugs return a quiet 404.

## Brand assets

The build runs without these — but the proposal looks meaningfully more on-brand once they're in place.

### Uncut Sans font

1. Drop these files into `public/fonts/`:
   - `UncutSans-Regular.woff2` (400)
   - `UncutSans-Medium.woff2` (500)
   - `UncutSans-Bold.woff2` (700)
   - `UncutSans-Black.woff2` (800 or 900 — display weight)
2. Open `app/layout.tsx`. Comment out the `Inter` import block. Uncomment the `localFont` block beneath it.
3. Restart the dev server.

If your file naming differs, just adjust the paths in the `localFont` config.

### AKIMA wordmark SVG

1. Drop `logo.svg` into `public/`.
2. Open `components/Wordmark.tsx`. Follow the comment at the top to swap the styled-text fallback for `<Image src="/logo.svg" ... />`.

## SEO / privacy

Proposal pages are private — `<meta name="robots" content="noindex,nofollow">` is set on every page, and `public/robots.txt` disallows all crawlers. The privacy model is URL secrecy (don't share the slug publicly).

## Tech

Next.js 15 · TypeScript · Tailwind CSS v4 · gray-matter · react-markdown · Framer Motion (subtle reveals only).

No DB, no auth, no CMS, no admin panel, no analytics, no PDF export. Intentionally lean.

## Deploy

Push to a Vercel-connected repo. Point the `proposals.akima.studio` subdomain at the project. Done.
