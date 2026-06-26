import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  findSection,
  getDiscoveryProposalSlugs,
  getProposalBySlug,
} from "@/lib/proposals";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { MetadataRow } from "@/components/MetadataRow";
import {
  NextStepsTimeline,
  parseNextStepsMarkdown,
} from "@/components/NextStepsTimeline";
import { PackageDetail } from "@/components/PackageDetail";
import { ProposalHero } from "@/components/ProposalHero";
import { Section } from "@/components/Section";
import { StickyNav } from "@/components/StickyNav";

function getDiscoveryProposal(slug: string) {
  return getProposalBySlug(`discovery/${slug}`);
}

export async function generateStaticParams() {
  return getDiscoveryProposalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getDiscoveryProposal(slug);
  if (!proposal) return { title: "Akima Studio" };
  const { client } = proposal.frontmatter;
  return {
    title: `${client} — Discovery Proposal · Akima Studio`,
    robots: { index: false, follow: false },
  };
}

export default async function DiscoveryProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = getDiscoveryProposal(slug);
  if (!proposal) notFound();

  const fullSlug = `discovery/${slug}`;
  const { frontmatter } = proposal;
  const {
    client,
    proposalTitle,
    preparedFor,
    preparedBy,
    date,
    validUntil,
    contact,
  } = frontmatter;
  const packages = Array.isArray(frontmatter.packages)
    ? frontmatter.packages
    : [];

  const overview = findSection(proposal, "overview");
  const goals = findSection(proposal, "goals");
  const terms = findSection(proposal, "payment-and-terms");
  const next = findSection(proposal, "next-steps");
  const parsedNext = next ? parseNextStepsMarkdown(next.body) : null;

  const navLinks = [
    overview ? { label: "Overview", href: "#overview" } : null,
    { label: "Scope", href: `#${packages[0]?.id ?? "options"}` },
    terms ? { label: "Terms", href: "#payment-and-terms" } : null,
    next ? { label: "Next", href: "#next-steps" } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="theme-white min-h-screen bg-paper text-ink">
      <StickyNav links={navLinks} />

      <main>
        <Container>
          <ProposalHero client={client} proposalTitle={proposalTitle} />

          <MetadataRow
            preparedFor={preparedFor}
            preparedBy={preparedBy}
            date={date}
            validUntil={validUntil}
          />

          {overview ? (
            <Section
              id="overview"
              eyebrow="01 — Overview"
              heading={overview.heading}
              body={overview.body}
              divider={false}
            />
          ) : null}

          {goals ? (
            <Section
              id="goals"
              eyebrow="02 — Goals"
              heading={goals.heading}
              body={goals.body}
            />
          ) : null}

          <div
            id="options"
            className="flex flex-col gap-6 border-t border-rule py-16 md:py-24"
          >
            <div className="mb-2 flex flex-col gap-4 md:max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                Scope &amp; deliverables
              </div>
              <h2 className="text-3xl font-bold leading-none tracking-[-0.02em] text-ink md:text-5xl">
                Proposed scope
              </h2>
            </div>
            {packages.map((pkg) => (
              <PackageDetail key={pkg.id} pkg={pkg} showRecommended={false} />
            ))}
          </div>

          {terms ? (
            <Section
              id="payment-and-terms"
              eyebrow="Terms"
              heading={terms.heading}
              body={terms.body}
              variant="compact"
            />
          ) : null}

          <div className="pt-6 md:pt-8">
            <NextStepsTimeline
              slug={fullSlug}
              client={client}
              proposalTitle={proposalTitle}
              contact={contact}
              heading={next?.heading}
              steps={parsedNext?.steps}
              trailingBody={parsedNext?.trailingBody}
            />
          </div>

          <Footer />
        </Container>
      </main>
    </div>
  );
}
