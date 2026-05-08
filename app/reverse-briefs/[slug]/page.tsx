import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { MetadataRow } from "@/components/MetadataRow";
import { ReverseBriefHero } from "@/components/ReverseBriefHero";
import { Section } from "@/components/Section";
import { StickyNav } from "@/components/StickyNav";
import {
  findReverseBriefSection,
  getReverseBriefBySlug,
  getReverseBriefSlugs,
} from "@/lib/reverse-briefs";

export async function generateStaticParams() {
  return getReverseBriefSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const reverseBrief = getReverseBriefBySlug(slug);
  if (!reverseBrief) return { title: "Akima Studio" };
  const { client } = reverseBrief.frontmatter;
  return {
    title: `${client} — Reverse Brief · Akima Studio`,
    robots: { index: false, follow: false },
  };
}

export default async function ReverseBriefPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reverseBrief = getReverseBriefBySlug(slug);
  if (!reverseBrief) notFound();

  const { frontmatter } = reverseBrief;
  const { client, briefTitle, preparedFor, preparedBy, date } = frontmatter;

  const context = findReverseBriefSection(reverseBrief, "context");
  const understanding = findReverseBriefSection(reverseBrief, "understanding");
  const opportunity = findReverseBriefSection(reverseBrief, "opportunity");
  const recommendedDirection = findReverseBriefSection(
    reverseBrief,
    "recommended-direction"
  );
  const scopeNotes = findReverseBriefSection(reverseBrief, "scope-notes");
  const nextSteps = findReverseBriefSection(reverseBrief, "next-steps");

  const navLinks = [
    context ? { label: "Context", href: "#context" } : null,
    understanding ? { label: "Understanding", href: "#understanding" } : null,
    recommendedDirection
      ? { label: "Direction", href: "#recommended-direction" }
      : null,
    nextSteps ? { label: "Next", href: "#next-steps" } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="theme-white min-h-screen bg-paper text-ink">
      <StickyNav links={navLinks} />

      <main>
        <Container>
          <ReverseBriefHero client={client} briefTitle={briefTitle} />

          <MetadataRow
            preparedFor={preparedFor}
            preparedBy={preparedBy}
            date={date}
          />

          {context ? (
            <Section
              id="context"
              eyebrow="01 — Context"
              heading={context.heading}
              body={context.body}
              divider={false}
            />
          ) : null}

          {understanding ? (
            <Section
              id="understanding"
              eyebrow="02 — Understanding"
              heading={understanding.heading}
              body={understanding.body}
            />
          ) : null}

          {opportunity ? (
            <Section
              id="opportunity"
              eyebrow="03 — Opportunity"
              heading={opportunity.heading}
              body={opportunity.body}
            />
          ) : null}

          {recommendedDirection ? (
            <Section
              id="recommended-direction"
              eyebrow="Brief response"
              heading={recommendedDirection.heading}
              body={recommendedDirection.body}
            />
          ) : null}

          {scopeNotes ? (
            <Section
              id="scope-notes"
              eyebrow="Scope clarity"
              heading={scopeNotes.heading}
              body={scopeNotes.body}
              variant="subdued"
            />
          ) : null}

          {nextSteps ? (
            <Section
              id="next-steps"
              eyebrow="Next"
              heading={nextSteps.heading}
              body={nextSteps.body}
              variant="compact"
            />
          ) : null}

          <Footer />
        </Container>
      </main>
    </div>
  );
}
