import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProposalBySlug,
  getProposalSlugs,
  findSection,
} from "@/lib/proposals";
import { Container } from "@/components/Container";
import { StickyNav } from "@/components/StickyNav";
import { ProposalHero } from "@/components/ProposalHero";
import { MetadataRow } from "@/components/MetadataRow";
import { Section } from "@/components/Section";
import { PackageDetail } from "@/components/PackageDetail";
import { PackageComparison } from "@/components/PackageComparison";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

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
  const { client } = proposal.frontmatter;
  return {
    title: `${client} — Classic Proposal · Akima Studio`,
    robots: { index: false, follow: false },
  };
}

export default async function ClassicProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);
  if (!proposal) notFound();

  const { frontmatter, sections: _sections } = proposal;
  const {
    client,
    proposalTitle,
    preparedFor,
    preparedBy,
    date,
    validUntil,
    recommendedOption,
    contact,
    cta,
  } = frontmatter;
  const packages = Array.isArray(frontmatter.packages)
    ? frontmatter.packages
    : [];
  const hasMultiplePackages = packages.length > 1;

  const overview = findSection(proposal, "overview");
  const goals = findSection(proposal, "goals");
  const addons = findSection(proposal, "optional-add-ons");
  const exclusions = findSection(proposal, "exclusions");
  const terms = findSection(proposal, "payment-and-terms");
  const next = findSection(proposal, "next-steps");
  const faqs = findSection(proposal, "faqs");
  const notes = findSection(proposal, "notes");

  const recommendedPkg = packages.find((p) => p.id === recommendedOption);

  const navLinks = [
    overview ? { label: "Overview", href: "#overview" } : null,
    { label: "Options", href: `#${packages[0]?.id ?? "options"}` },
    hasMultiplePackages ? { label: "Compare", href: "#compare" } : null,
    terms ? { label: "Terms", href: "#payment-and-terms" } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
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

          {/* Detailed package sections */}
          <div
            id="options"
            className="flex flex-col gap-6 border-t border-rule py-20 md:py-28"
          >
            <div className="mb-2 flex flex-col gap-4 md:max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                Scope &amp; deliverables
              </div>
              <h2 className="text-3xl font-bold leading-none tracking-[-0.02em] text-ink md:text-5xl">
                {hasMultiplePackages ? "Package options" : "Proposed scope"}
              </h2>
            </div>
            {packages.map((pkg) => (
              <PackageDetail
                key={pkg.id}
                pkg={pkg}
                showRecommended={hasMultiplePackages}
              />
            ))}
          </div>

          {hasMultiplePackages ? (
            <PackageComparison packages={packages} />
          ) : null}

          {addons ? (
            <Section
              id="optional-add-ons"
              eyebrow="Add-ons"
              heading={addons.heading}
              body={addons.body}
              variant="compact"
            />
          ) : null}

          {exclusions ? (
            <Section
              id="exclusions"
              eyebrow="Scope clarity"
              heading={exclusions.heading}
              body={exclusions.body}
              variant="subdued"
            />
          ) : null}

          {terms ? (
            <Section
              id="payment-and-terms"
              eyebrow="Terms"
              heading={terms.heading}
              body={terms.body}
              variant="compact"
            />
          ) : null}

          {next ? (
            <Section
              id="next-steps"
              eyebrow="Next"
              heading={next.heading}
              body={next.body}
            />
          ) : null}

          {faqs ? (
            <Section
              id="faqs"
              eyebrow="FAQs"
              heading={faqs.heading}
              body={faqs.body}
            />
          ) : null}

          {notes ? (
            <Section
              id="notes"
              eyebrow="Notes"
              heading={notes.heading}
              body={notes.body}
              variant="subdued"
            />
          ) : null}

          <div className="pt-8 md:pt-12">
            <CTASection
              client={client}
              contact={contact}
              cta={cta}
              recommendedName={recommendedPkg?.name}
            />
          </div>

          <Footer />
        </Container>
      </main>
    </>
  );
}
