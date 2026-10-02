import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  findSection,
  getProposalBySlug,
  getProposalSlugs,
} from "@/lib/proposals";
import type { Package, PaymentStep, ProposalFrontmatter } from "@/lib/types";
import type { OctBlock, OctPackage } from "@/components/oct/OctProposal";
import { PhasedProposal } from "@/components/phased/PhasedProposal";
import "@/components/oct/oct.css";
import "@/components/phased/phased.css";

// Frontmatter fields only this template reads. Everything else is shared.
type PhasedFrontmatter = ProposalFrontmatter & {
  planTotal?: string;
  planTimeline?: string;
  startReason?: string;
  heard?: string[];
  heardBy?: string;
  plan?: { when: string; title: string; body: string }[];
  commitments?: string[];
  team?: { name: string; role: string; bio?: string }[];
  nextPhase?: Package & { note?: string };
};

const DEFAULT_SCHEDULE: PaymentStep[] = [
  { label: "50% to start", note: "To book the work in", percent: 50 },
  { label: "50% on delivery", note: "On final handover", percent: 50 },
];

const LIST_ITEM = /^([-*]|\d+\.)\s+/;

function toBlock(body?: string): OctBlock | undefined {
  if (!body?.trim()) return undefined;
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines.every((l) => LIST_ITEM.test(l))
    ? { items: lines.map((l) => l.replace(LIST_ITEM, "")) }
    : { markdown: body };
}

// "Label: note" list items become a label with a note.
function splitLabel(item: string) {
  const [label, ...rest] = item.split(": ");
  return { label, note: rest.join(": ") || undefined };
}

function toPackage(pkg: Package, steps: PaymentStep[]): OctPackage {
  const numbers = pkg.price.match(/\d[\d,]*(\.\d+)?/g);
  const total = numbers?.length === 1 ? Number(numbers[0].replace(/,/g, "")) : null;
  const currency = pkg.price.match(/^(AUD|USD)/i)?.[1].toUpperCase() ?? "AUD";
  const categories = (pkg.categories ?? [])
    .filter((c) => (c.items ?? []).length > 0)
    .map((c) => ({ title: c.title, items: c.items ?? [] }));

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
    highlights: [],
    categories,
    schedule: steps.map((step) => ({
      ...step,
      amount:
        total === null
          ? `${step.percent}% of total`
          : `${currency} $${Math.round((total * step.percent) / 100).toLocaleString("en-AU")}`,
    })),
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

export default async function PhasedProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);
  if (!proposal) notFound();

  const fm = proposal.frontmatter as PhasedFrontmatter;
  const steps = fm.paymentSchedule ?? DEFAULT_SCHEDULE;
  const first = Array.isArray(fm.packages) ? fm.packages[0] : undefined;
  if (!first) notFound();

  const addons = toBlock(findSection(proposal, "optional-add-ons")?.body);
  const nextSteps = toBlock(findSection(proposal, "next-steps")?.body);
  const faqs = findSection(proposal, "faqs")
    ?.body.split(/^##\s+/m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [question, ...answer] = chunk.split("\n");
      return { question: question.trim(), answer: answer.join("\n").trim() };
    });

  return (
    <PhasedProposal
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
        planTotal: fm.planTotal,
        planTimeline: fm.planTimeline,
        startReason: fm.startReason,
        heard: fm.heard,
        heardBy: fm.heardBy,
        plan: fm.plan,
        commitments: fm.commitments,
        team: fm.team,
        phase: toPackage(first, steps),
        nextPhase: fm.nextPhase
          ? { ...toPackage(fm.nextPhase, steps), note: fm.nextPhase.note }
          : undefined,
        addons: addons?.items?.map(splitLabel),
        exclusions: toBlock(findSection(proposal, "exclusions")?.body),
        terms: toBlock(findSection(proposal, "payment-and-terms")?.body),
        nextSteps: nextSteps?.items?.map(splitLabel),
        faqs: faqs?.length ? faqs : undefined,
        contact: fm.contact,
        acceptLabel: fm.cta?.acceptLabel ?? "Accept Proposal",
      }}
    />
  );
}
