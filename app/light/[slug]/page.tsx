import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProposalBySlug, getProposalSlugs } from "@/lib/proposals";
import { OctLightPage } from "@/components/oct-light/OctLightPage";

// Light preview of the October template: /light/<slug>.
// In production, proposals locked to a template are only served at /<slug>,
// so they 404 here; locally they render for previewing.

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

export default async function OctLightProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);
  if (!proposal) notFound();
  if (proposal.frontmatter.template && process.env.NODE_ENV === "production") notFound();
  return <OctLightPage proposal={proposal} />;
}
