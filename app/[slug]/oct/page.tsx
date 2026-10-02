import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProposalBySlug, getProposalSlugs } from "@/lib/proposals";
import { OctPage } from "@/components/oct/OctPage";

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
  return <OctPage proposal={proposal} />;
}
