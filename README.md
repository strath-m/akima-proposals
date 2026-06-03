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
2. Edit the YAML frontmatter and body markdown to match the new client.
3. `git add`, commit, push. Vercel rebuilds and the new URL is live.

## Markdown schema

Each proposal file has two parts:

1. YAML frontmatter between `---` delimiters.
2. Body markdown after the closing `---`.

The file must start on line 1 with `---`. Do not add a blank line before it.
The top block is YAML, not normal Markdown. YAML indentation matters.

Correct:

```yaml
---
client: Example Client
slug: example-client
proposalTitle: Website Strategy Sprint
preparedFor: Example Client
preparedBy: Akima Studio
date: 12 May 2026
validUntil: 12 June 2026
recommendedOption: option-2
contact:
  name: Strath
  role: Co-founder, Akima Studio
  email: strath@akima.studio
  phone: 0432 279 718
cta:
  acceptLabel: Accept Proposal
  requestEditsLabel: Request Edits
packages:
  - id: option-1
    name: Foundation Website Refresh
    eyebrow: Option 01
    summary: A focused refresh of the core website experience.
    price: AUD $7,500
    timeline: ~2-3 weeks
    bestFor: Improving the existing website quickly.
    recommended: false
    comparisonHighlights:
      - Homepage structure refinement
      - Core visual polish
      - Mobile-first design improvements
      - Clearer CTA hierarchy
      - Implementation-ready handover
    categories:
      - title: Strategy
        items:
          - Review of the current website structure and user journey
          - CTA hierarchy and conversion pathway recommendations
      - title: Delivery
        items:
          - Dev-ready Figma file
          - Basic handover call
---
```

Wrong:

```yaml

---
contact:
name: Strath
email: [strath@akima.studio](mailto:strath@akima.studio)
packages:
* id: option-1
  comparisonHighlights:
  * Homepage structure refinement
    categories:
```

Common mistakes that break rendering:

- A blank line before the opening `---`.
- Missing the opening `---`.
- Using Markdown bullets (`*`) in frontmatter. Use YAML hyphens (`-`) instead.
- Not indenting nested fields under `contact`, `cta`, `packages`, `comparisonHighlights`, `categories`, or `items`.
- Putting Markdown links in frontmatter. Use plain values like `email: strath@akima.studio`.
- Nesting `categories` under the last `comparisonHighlights` item. `categories` must be a sibling of `comparisonHighlights`.

**Required frontmatter:**
- `client`, `proposalTitle`, `preparedFor`, `preparedBy`, `date`
- `packages` (array of options; 1, 2, or 3 packages are supported)

**Optional frontmatter:**
- `slug` (defaults to filename)
- `validUntil`, `recommendedOption` (must match a `package.id`)
- `contact` (name, role, email, phone — used in CTA + mailto)
- `cta` (overrides default labels and email subjects)
- Per-package: `comparisonHighlights` (array — overrides auto-extraction)

If a proposal has only one package, the renderer treats it as the proposed scope and does not show a `Recommended` pill, even if that package has `recommended: true`.

**Body sections rendered by the main proposal route** (each renders only if present):
`# Overview` · `# Goals` · `# Optional add-ons` · `# Exclusions` · `# Payment & terms` · `# FAQs` · `# Notes`

The parser also recognises `# Why this matters` and `# Next steps`, but the current main white proposal route does not render those sections.

Section heading match is case-insensitive and tolerates `&` / spacing variations.

## ChatGPT prompt guardrail

When asking ChatGPT to create a proposal file, include this instruction:

```text
Create one markdown proposal file for the Akima proposal renderer.

The top metadata block must be valid YAML frontmatter. The file must start on line 1 with `---` and end the frontmatter with another `---`.

Before the closing `---`, do not use Markdown syntax. Use YAML only.

Rules:
- Use two-space indentation for nested fields.
- Use `-` for YAML array items, never `*`.
- Use plain email strings, not Markdown links.
- Keep `categories` as a sibling of `comparisonHighlights`.
- Match the structure of `content/proposals/the-investor-accelerator-proposal.md`.
- Output only the final `.md` file content. Do not wrap it in a code fence.
```

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
