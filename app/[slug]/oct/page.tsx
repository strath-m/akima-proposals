import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  findSection,
  getProposalBySlug,
  getProposalSlugs,
} from "@/lib/proposals";
import type { Package, PaymentStep } from "@/lib/types";
import {
  OctProposal,
  type OctBlock,
  type OctPackage,
} from "@/components/oct/OctProposal";
import "@/components/oct/oct.css";

const DEFAULT_SCHEDULE: PaymentStep[] = [
  { label: "50% deposit", note: "To schedule work", percent: 50 },
  { label: "50% on delivery", note: "On launch-ready handover", percent: 50 },
];

const LIST_ITEM = /^([-*]|\d+\.)\s+/;

// Returns list items when the section is a plain list, otherwise raw Markdown.
function toBlock(body?: string): OctBlock | undefined {
  if (!body?.trim()) return undefined;
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines.every((l) => LIST_ITEM.test(l))
    ? { items: lines.map((l) => l.replace(LIST_ITEM, "")) }
    : { markdown: body };
}

// A single figure like "AUD $10,500" can be split; ranges can't.
function scheduleFor(pkg: Package, steps: PaymentStep[]) {
  const numbers = pkg.price.match(/\d[\d,]*(\.\d+)?/g);
  const total = numbers?.length === 1 ? Number(numbers[0].replace(/,/g, "")) : null;
  const currency = pkg.price.match(/^(AUD|USD)/i)?.[1].toUpperCase() ?? "AUD";
  return steps.map((step) => ({
    ...step,
    amount:
      total === null
        ? `${step.percent}% of total`
        : `${currency} $${Math.round((total * step.percent) / 100).toLocaleString("en-AU")}`,
  }));
}

function toPackage(pkg: Package, steps: PaymentStep[]): OctPackage {
  const categories = (pkg.categories ?? [])
    .filter((c) => (c.items ?? []).length > 0)
    .map((c) => ({ title: c.title, items: c.items ?? [] }));
  if (pkg.deliverables?.length) {
    categories.push({ title: "Deliverables", items: pkg.deliverables });
  }
  const highlights =
    pkg.comparisonHighlights ??
    categories
      .flatMap((c) => c.items)
      .map((item) => (typeof item === "string" ? item : item.title))
      .slice(0, 5);

  return {
    id: pkg.id,
    eyebrow: pkg.eyebrow,
    name: pkg.name,
    summary: pkg.summary,
    price: pkg.price,
    originalPrice: pkg.originalPrice,
    discountLabel: pkg.discountLabel,
    timeline: pkg.timeline,
    bestFor: pkg.bestFor,
    recommended: !!pkg.recommended,
    highlights,
    categories,
    schedule: scheduleFor(pkg, steps),
  };
}

export async function generateStaticParams() {
  return getProposalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);
  if (!proposal) return { title: "Akima Studio" };
  return {
    title: `${proposal.frontmatter.client} — Proposal · Akima Studio`,
    robots: { index: false, follow: false },
  };
}

export default async function OctProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);
  if (!proposal) notFound();

  const fm = proposal.frontmatter;
  const steps = fm.paymentSchedule ?? DEFAULT_SCHEDULE;
  const packages = (Array.isArray(fm.packages) ? fm.packages : []).map((pkg) =>
    toPackage(pkg, steps)
  );
  const defaultSelected =
    fm.recommendedOption ??
    packages.find((p) => p.recommended)?.id ??
    (packages.length === 1 ? packages[0].id : null);

  const addons = toBlock(findSection(proposal, "optional-add-ons")?.body);
  const faqBody = findSection(proposal, "faqs")?.body;
  const faqs = faqBody
    ?.split(/^##\s+/m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [question, ...answer] = chunk.split("\n");
      return { question: question.trim(), answer: answer.join("\n").trim() };
    });

  return (
    <OctProposal
      data={{
        slug,
        client: fm.client,
        proposalTitle: fm.proposalTitle,
        intro: fm.intro,
        preparedFor: fm.preparedFor,
        preparedBy: fm.preparedBy,
        date: fm.date,
        validUntil: fm.validUntil,
        problem: fm.problem,
        goal: fm.goal,
        overview: findSection(proposal, "overview")?.body,
        goals: toBlock(findSection(proposal, "goals")?.body),
        plan: fm.plan,
        commitments: fm.commitments,
        team: fm.team,
        packages,
        defaultSelected,
        // "Label: note" list items become a row with a right-aligned note.
        addons: addons?.items?.map((item) => {
          const [label, ...note] = item.split(": ");
          return { label, note: note.join(": ") || undefined };
        }),
        addonsMarkdown: addons?.markdown,
        exclusions: toBlock(findSection(proposal, "exclusions")?.body),
        terms: toBlock(findSection(proposal, "payment-and-terms")?.body),
        faqs: faqs?.length ? faqs : undefined,
        notes: findSection(proposal, "notes")?.body,
        contact: fm.contact,
      }}
    />
  );
}
