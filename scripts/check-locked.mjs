// Fails the build if any locked file has changed. Locked files are the
// templates and proposals that are live with clients (Mia Jade's `nov`
// template is the reference). Run `node scripts/check-locked.mjs --update`
// only when Strath has approved a change to a locked file.
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const LOCKED = [
  "components/nov",
  "components/oct",
  "components/oct-light",
  "lib",
  "app/[slug]/page.tsx",
  "app/layout.tsx",
  "styles/globals.css",
  "next.config.ts",
  "scripts/check-locked.mjs",
  "package.json",
  "CLAUDE.md",
  "AGENTS.md",
  "PROPOSALS-GUIDE.md",
];
const LOCKED_PROPOSALS_DIR = "content/proposals";
const LOCK_FILE = "locked.json";

function filesIn(target) {
  if (!fs.existsSync(target)) return [];
  if (fs.statSync(target).isFile()) return [target];
  return fs
    .readdirSync(target)
    .flatMap((name) => filesIn(path.join(target, name)));
}

const hash = (file) =>
  createHash("sha256").update(fs.readFileSync(file)).digest("hex");

if (process.argv.includes("--update")) {
  const files = [
    ...LOCKED.flatMap(filesIn),
    ...filesIn(LOCKED_PROPOSALS_DIR).filter((f) => f.endsWith(".md")),
  ].sort();
  const lock = Object.fromEntries(files.map((f) => [f, hash(f)]));
  fs.writeFileSync(LOCK_FILE, JSON.stringify(lock, null, 2) + "\n");
  console.log(`Locked ${files.length} files.`);
  process.exit(0);
}

const lock = JSON.parse(fs.readFileSync(LOCK_FILE, "utf8"));
const changed = Object.entries(lock)
  .filter(([file, sum]) => !fs.existsSync(file) || hash(file) !== sum)
  .map(([file]) => file);
const added = LOCKED.flatMap(filesIn).filter((f) => !(f in lock));

if (changed.length || added.length) {
  console.error(
    "\nBuild stopped: locked files were changed. These are live client " +
      "templates and proposals. Make a new template or proposal instead " +
      "(see PROPOSALS-GUIDE.md).\n",
  );
  for (const f of changed) console.error(`  changed: ${f}`);
  for (const f of added) console.error(`  added inside a locked folder: ${f}`);
  console.error("");
  process.exit(1);
}
console.log(`Locked files OK (${Object.keys(lock).length}).`);
