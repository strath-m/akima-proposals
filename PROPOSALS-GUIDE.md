# Proposals: guide for Jake

How to make a custom proposal, with a custom layout if you want one, and put it live at `proposals.akima.studio/<slug>`. You work through Claude Code (or Codex): describe what you want and it builds it. The repo's `CLAUDE.md` gives it the rules below, so it already knows them.

## The one rule

**Never change what's already there. Always make something new.**

- **Mia Jade is the reference.** `content/proposals/mia-jade-studio.md` uses the `nov` template. Neither ever changes.
- **New layout:** copy an existing template into a new one, then change the copy.
- **New proposal:** make a new file.
- You can have as many templates as you like.

This is enforced, not just a guideline. `locked.json` fingerprints every live template, every existing proposal and the shared code. If any of them changes, the build stops with "Build stopped: locked files were changed", and Vercel keeps the current site live. A mistake can't reach a client page.

## How it goes live

- Pushing to `main` on GitHub deploys to the live site in about a minute. There's no staging step, so check it locally first.
- **The repo is public.** Anyone can read the files, prices included. The URLs are unlisted, not secret. No contracts, logins or internal notes about clients in any file.

## One-time setup

```bash
git clone https://github.com/strath-m/akima-proposals.git
cd akima-proposals
npm install
```

You need Node 20+ and write access to the repo (you already have it).

## Making a proposal

1. **Pull first:** `git pull`.
2. **Open Claude Code in the repo** and give it the client notes plus what you want. For example:
   - "New proposal for Acme, slug `acme`, using the `nov` template. Here are the notes: …"
   - "New proposal for Acme with a new template called `acme`. Start from `nov`, but put the pricing first and add a case-study section."
3. **Preview it:** run `npm run dev` and open `http://localhost:3000/<slug>`. Check desktop and a phone-width window, and keep asking Claude for changes until it's right.
4. **Check it builds:** `npm run build`. If it says locked files changed, something existing was edited. Ask Claude to undo that and copy it into the new template instead.
5. **Push only your own files:**
   ```bash
   git add components/<new-template> components/templates.ts content/proposals/<slug>.md
   git commit -m "Add <client> proposal"
   git push
   ```
   Never use `git add .`.
6. Wait a minute, open `https://proposals.akima.studio/<slug>`, then send the link.

## How templates work

- `components/templates.ts` lists every template by name. A proposal picks one with `template: <name>` at the top of its file.
- A new template is a new folder in `components/` plus one line in `templates.ts`. Content can go in the proposal file or straight into the template's components, whichever is faster.
- Once a proposal has been sent to a client, treat its template as finished. For the next client, copy it to a new name.
- Need an npm package, or a change to anything locked? That needs Strath's sign-off, because the lock covers `package.json` and the shared code.

## If something goes wrong

- **The build failed and the live site didn't update.** Vercel shows the error and the site stays as it was. Fix it locally, then push again.
- **Something wrong went live.** Run `git revert HEAD` then `git push`. That undoes your last commit and redeploys.
