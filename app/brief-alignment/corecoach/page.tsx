import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EyebrowPill } from "@/components/EyebrowPill";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { SectionReveal } from "@/components/SectionReveal";
import { StickyNav } from "@/components/StickyNav";

export const metadata: Metadata = {
  title: "CoreCoach Product Redesign · Akima Studio",
  robots: { index: false, follow: false },
};

const metadataItems = [
  { label: "Prepared for", value: "CoreCoach" },
  { label: "Prepared by", value: "Akima Studio" },
  { label: "Date", value: "20 May 2026" },
  { label: "Stage", value: "Pre-Proposal Alignment" },
];

const priorities = [
  "Make it easier for coaches to understand what they can do inside CoreCoach.",
  "Reduce friction across key workflows.",
  "Improve feature discoverability and product clarity.",
  "Elevate the visual quality of the app so it feels more premium and modern.",
  "Create a consistent design system that can scale across mobile and web.",
  "Give the development team clearer design patterns to build from.",
];

const opportunityPoints = [
  "Improve the first impression of the product.",
  "Make important features easier to find and use.",
  "Reduce cognitive load for coaches managing multiple clients.",
  "Create a more consistent experience across mobile and web.",
  "Improve confidence and trust in the platform.",
  "Give the product team and dev team a scalable foundation for future features.",
];

const phases = [
  {
    id: "phase-0",
    label: "Phase 0",
    title: "Discovery & Scope Definition",
    summary:
      "A focused first step to review the current CoreCoach product, understand the key workflows, and define the right scope before committing to the full redesign.",
    categories: [
      {
        title: "Discovery",
        items: [
          "Product walkthrough and stakeholder alignment session.",
          "Review of the current mobile app, web app, and existing design files.",
          "High-level review of key coach and client user journeys.",
          "Initial screen and flow inventory.",
        ],
      },
      {
        title: "Planning",
        items: [
          "Identification of major scope considerations and product complexity.",
          "Recommended project structure, timeline, and design roadmap.",
          "Indicative pricing range and formal proposal for the broader redesign.",
        ],
      },
    ],
    timeline: "Approximately 1 week",
    investment: "$1,800",
    note:
      "If CoreCoach proceeds into a larger redesign engagement, this fee will be credited toward the project fee.",
  },
  {
    id: "phase-1",
    label: "Phase 1",
    title: "UX Audit & Product Design Strategy",
    summary:
      "A deep review of the current CoreCoach experience across key coach and client journeys, navigation, information architecture, and core workflows.",
    categories: [
      {
        title: "Research & Audit",
        items: [
          "Business requirements and stakeholder workshop.",
          "End-to-end UX audit of coach and client flows.",
          "User data and feedback analysis.",
          "User journey mapping.",
          "Review of current product structure and information architecture.",
        ],
      },
      {
        title: "Strategy",
        items: [
          "Review of navigation, feature discoverability, and key workflows.",
          "Identification of major friction points and improvement opportunities.",
          "Review of UI, design system and components.",
          "Prioritised redesign roadmap.",
          "Recommended scope for design system and product redesign.",
          "UX audit document presented with key findings and recommendations.",
        ],
      },
    ],
    timeline: "2-3 weeks",
    investment: "AUD$9,000",
    note: "Kick-off available from 24 June 2026 onwards.",
  },
  {
    id: "phase-2",
    label: "Phase 2",
    title: "Design System Foundation",
    summary:
      "A reusable design foundation for CoreCoach across mobile and web, giving the product a consistent, polished, and scalable interface.",
    categories: [
      {
        title: "Visual System",
        items: [
          "Visual language direction.",
          "Colour palette covering primary, secondary, semantic, and neutral states.",
          "Typography scale across mobile and web.",
          "Iconography style and library.",
          "Spacing and grid system.",
        ],
      },
      {
        title: "Component System",
        items: [
          "Component library covering buttons, inputs, cards, modals, navigation, tables, badges, and related UI.",
          "Motion and animation principles, if applicable.",
          "Dark and light mode guidelines, if applicable.",
          "Full Figma design system prepared for product redesign and developer handoff.",
        ],
      },
    ],
    timeline: "2-3 weeks",
    investment: "AUD$8,000-$14,000",
  },
  {
    id: "phase-3",
    label: "Phase 3",
    title: "CoreCoach Product Redesign",
    summary:
      "The CoreCoach experience is redesigned across the agreed product areas, applying the strategy and design system into high-fidelity product screens.",
    categories: [
      {
        title: "Product Design",
        items: [
          "High-fidelity redesign of agreed mobile and web product screens.",
          "Full coach and client journeys based on confirmed scope.",
          "UX improvements across priority workflows.",
          "Clickable prototypes for key flows.",
        ],
      },
      {
        title: "Handoff",
        items: [
          "Developer-ready Figma files and handoff document.",
          "Handover walkthrough video and calls.",
        ],
      },
    ],
    timeline: "4-14+ weeks depending on confirmed scope",
    investment: "See options below",
    options: [
      {
        title: "Focused Product Redesign",
        price: "$20,000–$35,000 AUD",
        description:
          "Best suited to improving a smaller set of priority screens and workflows, such as onboarding, coach dashboard, client management, program creation, nutrition, or selected client-facing flows. This is a focused redesign, not a full product overhaul.",
      },
      {
        title: "Full Product Redesign",
        price: "$50,000–$90,000+ AUD",
        description:
          "A full redesign of the CoreCoach product experience across mobile, web, coach-facing flows, and client-facing flows. This would include wider screen coverage, key states, prototypes, developer-ready Figma files, and handoff documentation.",
      },
    ],
    note:
      "Final pricing would be confirmed after the initial scoping phase, once screen volume, workflow complexity, and product priorities are clear.",
  },
];

const discoveryReasons = [
  "Confirm the true size of the product.",
  "Identify the highest-priority workflows.",
  "Understand screen volume and complexity.",
  "Clarify what should be redesigned first.",
  "Reduce scope and timeline risk.",
  "Create a stronger foundation for the full redesign.",
  "Give CoreCoach a clearer investment range before committing to the larger engagement.",
];

const assumptions = [
  "CoreCoach will provide access to the current mobile and web app.",
  "CoreCoach will provide existing Figma/design files where available.",
  "CoreCoach will provide relevant analytics, user feedback, or known product issues where available.",
  "One primary decision-maker will be nominated for design feedback and approvals.",
  "Feedback will be consolidated before being sent to Akima Studio.",
  "Timelines depend on access, stakeholder availability, and feedback speed.",
  "Final pricing for later phases will depend on confirmed screen count, workflow complexity, and documentation requirements.",
];

const outOfScope = [
  "Logo redesign.",
  "Full brand identity redesign.",
  "Marketing website or landing pages.",
  "Copywriting beyond light UX copy refinement.",
  "Development.",
  "Backend or product functionality changes.",
  "QA/testing of implemented designs.",
  "App store assets.",
  "Formal user research recruitment.",
  "Ongoing product management.",
  "Unlimited revision rounds.",
  "Dark mode, unless confirmed in scope.",
  "Complex motion or animation prototypes, unless confirmed in scope.",
];

const nextSteps = [
  {
    title: "Confirm Phase 0",
    detail: "Approve the Discovery & Scope Definition phase.",
  },
  {
    title: "Provide access",
    detail: "Share the current app, web platform, and any existing design files.",
  },
  {
    title: "Run walkthrough",
    detail: "Walk us through the key coach and client workflows.",
  },
  {
    title: "Complete scope review",
    detail:
      "Review priority areas, workflow complexity, and key design considerations.",
  },
  {
    title: "Map next phase",
    detail:
      "Confirm the recommended redesign scope, timeline, and investment.",
  },
];

function formatInvestment(investment: string) {
  return investment.replace(/^AUD\s*/i, "");
}

export default function CoreCoachBriefAlignmentPage() {
  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Approach", href: "#recommended-approach" },
    { label: "Scope", href: "#scope-clarity" },
    { label: "Next", href: "#next-steps" },
  ];

  return (
    <div className="corecoach-brief-alignment-page theme-white min-h-screen bg-paper text-ink">
      <style>{`
        .corecoach-brief-alignment-page .prose-editorial li {
          font-weight: 600;
        }
      `}</style>
      <StickyNav links={navLinks} />

      <main>
        <Container>
          <Hero />
          <BriefMetadataRow />

          <Section
            id="overview"
            eyebrow="01 — Overview"
            heading="Overview"
            body={`CoreCoach is looking to improve the usability, clarity, and visual quality of its coaching platform across mobile and web.

Based on the initial brief, this is not a simple UI refresh. The project spans multiple product surfaces, user types, and workflows, including coach-facing and client-facing experiences, as well as the creation of a scalable design system.

Because of that, we would recommend approaching the project in phases rather than quoting the full redesign immediately. This allows us to properly understand the current product, confirm screen volume and workflow complexity, and define the right scope before moving into the larger redesign.

The recommended next step is a short product discovery and scope definition phase.`}
            divider={false}
          />

          <Section
            id="what-we-understand"
            eyebrow="02 — What we understand"
            heading="What We Understand"
            body={`CoreCoach is a fitness coaching platform used by online personal trainers to manage programming, nutrition, client progress, and business operations.

From the brief, the key priorities appear to be:`}
          >
            <BalancedList items={priorities} />
            <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-text-secondary">
              The goal is to make CoreCoach feel clearer, faster, more
              polished, and more valuable to both coaches and their clients.
            </p>
          </Section>

          <Section
            id="opportunity"
            eyebrow="03 — Opportunity"
            heading="The Opportunity"
            body={`The opportunity is to turn CoreCoach into a more intuitive and premium product experience that better reflects the quality of the coaches using it.

A strong redesign would help:`}
          >
            <BalancedList items={opportunityPoints} />
            <p className="mt-7 max-w-2xl text-base font-normal leading-7 text-ink">
              Before moving into the full redesign, the key priority is to
              clarify which flows matter most, how many screens are involved,
              what design patterns already exist, and where the highest-impact
              UX improvements can be made.
            </p>
          </Section>

          <RecommendedApproach />

          <Section
            id="why-discovery"
            eyebrow="05 — Recommendation"
            heading="Why Start With Discovery"
            body={`Because the project spans mobile, web, coach and client experiences, and a design system, we would not recommend quoting the full redesign as a fixed fee before reviewing the product properly.

Starting with a short discovery phase helps:`}
          >
            <BalancedList items={discoveryReasons} />
            <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-text-secondary">
              This makes the full project more predictable, better structured,
              and easier for both teams to manage.
            </p>
          </Section>

          <ScopeClarity />

          <Section
            id="why-akima-studio"
            eyebrow="07 — Why us?"
            heading="Why Akima Studio"
            body={`Akima Studio is a senior-led design studio built by designers who have spent years working across product, UX, brand, and digital experience inside larger agency and startup environments. We bring that level of craft and strategic thinking without the bloat, handover gaps, or generic process that often comes with bigger agencies.

For CoreCoach, that means the work would not be treated as a surface-level UI refresh. We would approach it as a product experience problem: how to make the platform clearer, faster, more premium, and easier to scale. Our strength is combining strong UX thinking with elevated visual design, so the end result feels considered, commercially useful, and genuinely better to use.`}
          />

          <div className="pt-6 md:pt-8">
            <BriefNextSteps />
          </div>

          <Footer />
        </Container>
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="pt-40 pb-16 md:pt-56 md:pb-24">
      <div className="flex max-w-5xl flex-col gap-8 md:gap-10">
        <EyebrowPill>Recommended Project Approach</EyebrowPill>
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-extrabold leading-none tracking-[-0.03em] text-ink md:text-8xl">
            CoreCoach Product Redesign
          </h1>
          <p className="max-w-3xl text-lg font-medium leading-8 text-text-secondary md:text-xl md:leading-9">
            A phased approach to creating a clearer, faster, more premium
            product experience across mobile, web, coach, and client journeys
            for the CoreCoach app.
          </p>
        </div>
      </div>
    </section>
  );
}

function BriefMetadataRow() {
  return (
    <div className="border-y border-rule py-8 md:py-10">
      <dl className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
        {metadataItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
              {item.label}
            </dt>
            <dd className="text-base font-medium text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function RecommendedApproach() {
  return (
    <SectionReveal>
      <section
        id="recommended-approach"
        className="border-t border-rule py-16 md:py-24"
      >
        <div className="mb-12 flex max-w-4xl flex-col gap-4">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            04 — Approach
          </div>
          <h2 className="text-3xl font-bold leading-none tracking-[-0.02em] text-ink md:text-6xl">
            Recommended Approach
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {phases.map((phase) => (
            <PhaseDetail key={phase.id} phase={phase} />
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}

function PhaseDetail({ phase }: { phase: (typeof phases)[number] }) {
  const includedItems = phase.categories.flatMap((category) => category.items);

  return (
    <SectionReveal>
      <section
        id={phase.id}
        className="relative overflow-hidden rounded-card border border-rule bg-bone-100"
      >
        <div className="px-6 py-12 md:px-12 md:py-16">
          <div className="flex flex-col gap-5 md:max-w-3xl">
            <EyebrowPill>{phase.label}</EyebrowPill>

            <h3 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-ink md:text-5xl">
              {phase.title}
            </h3>

            <p className="text-base leading-7 text-text-secondary md:text-lg">
              {phase.summary}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-y-6 border-y border-rule py-8 md:grid-cols-2 md:gap-x-10 md:py-10">
            <PhaseMetaCell
              label="Investment (AUD)"
              value={formatInvestment(phase.investment)}
              emphasis
            />
            <PhaseMetaCell label="Timeline" value={phase.timeline} />
          </div>

          <div className="mt-12 border-b border-rule pb-12">
            <h4 className="text-xl font-bold leading-tight text-ink">
              Includes
            </h4>
            <ul className="mt-7 columns-1 gap-x-10 md:columns-2">
              {includedItems.map((item) => (
                <li
                  key={item}
                  className="mb-3 grid break-inside-avoid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-x-3.5 text-base leading-7 text-ink"
                >
                  <span
                    aria-hidden
                    className="block h-px w-3 translate-y-[-0.22em] bg-ink"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {"options" in phase && phase.options ? (
            <div className="border-b border-rule py-10 md:py-12">
              <div className="flex flex-col gap-8">
                {phase.options.map((option) => (
                  <div key={option.title} className="flex flex-col gap-3">
                    <h4 className="text-xl font-bold leading-tight text-ink">
                      {option.title}
                    </h4>
                    <p className="text-base font-medium leading-6 text-ink">
                      {option.price}
                    </p>
                    <p className="max-w-5xl text-base leading-7 text-text-secondary">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {phase.note ? (
            <p className="mt-8 text-sm font-medium leading-6 text-text-secondary">
              {phase.note}
            </p>
          ) : null}
        </div>
      </section>
    </SectionReveal>
  );
}

function ScopeClarity() {
  return (
    <SectionReveal>
      <section id="scope-clarity" className="border-t border-rule py-16 md:py-24">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              06 — Scope
            </div>
            <h2 className="text-3xl font-bold leading-none tracking-[-0.02em] text-ink md:text-5xl">
              Scope Clarity
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:-mt-24 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7 md:col-start-5">
            <ScopeTextBlock
              title="Key Assumptions"
              intro="The above approach assumes:"
              items={assumptions}
            />
            <div className="my-12 border-t border-rule" />
            <ScopeTextBlock
              title="Out of Scope Unless Separately Agreed"
              items={outOfScope}
            />
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}

function BriefNextSteps() {
  return (
    <SectionReveal>
      <section
        id="next-steps"
        className="relative overflow-hidden rounded-card bg-ink px-6 py-14 text-paper md:px-12 md:py-16 lg:px-16"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,var(--color-paper)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-paper)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_at_30%_28%,black_0%,rgba(0,0,0,0.45)_38%,transparent_78%)]"
        />
        <div
          aria-hidden
          className="absolute right-0 top-0 h-40 w-40 bg-ember/20 blur-3xl"
        />

        <div className="relative flex flex-col gap-12">
          <div className="flex max-w-3xl flex-col gap-5">
            <EyebrowPill
              variant="ember"
              className="!bg-akima-orange-950 !text-akima-orange-500"
            >
              Next
            </EyebrowPill>
            <h2 className="text-4xl font-extrabold leading-none tracking-[-0.02em] text-paper md:text-6xl">
              Next Steps
            </h2>
            <p className="max-w-2xl text-base leading-7 text-paper/68 md:text-lg">
              A clear, low-risk path to define the larger project before
              committing to the full product redesign.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-0">
            {nextSteps.map((step, index) => (
              <li key={step.title} className="relative md:pr-6">
                <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 md:block">
                  <div className="relative flex justify-center md:mb-7 md:block">
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-9 h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-paper/20 md:left-0 md:top-1/2 md:h-px md:w-full md:translate-x-0"
                    />
                    {index === nextSteps.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-9 h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-ink md:left-auto md:right-0 md:top-1/2 md:h-px md:w-full md:translate-x-0"
                      />
                    ) : null}
                    <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-paper/35 bg-ink shadow-[0_0_0_8px_var(--color-ink)]">
                      <span className="h-2.5 w-2.5 rounded-full bg-ember" />
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 md:min-h-[10.5rem] md:pr-3">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-paper/42">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold leading-tight tracking-[-0.01em] text-paper">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-6 text-paper/58">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SectionReveal>
  );
}

function BalancedList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex max-w-2xl flex-col gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-x-3.5 text-base font-semibold leading-7 text-ink"
        >
          <span
            aria-hidden
            className="block h-px w-3 translate-y-[-0.22em] bg-ink"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function PhaseMetaCell({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
        {label}
      </span>
      <span
        className={
          emphasis
            ? "text-[28px] font-bold leading-none tracking-[-0.02em] text-ink"
            : "text-base font-medium leading-6 text-ink"
        }
      >
        {value}
      </span>
    </div>
  );
}

function ScopeTextBlock({
  title,
  intro,
  items,
}: {
  title: string;
  intro?: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-ink md:text-4xl">
        {title}
      </h3>
      {intro ? (
        <p className="mt-7 text-base leading-7 text-ink md:text-lg">
          {intro}
        </p>
      ) : null}
      <ul className="mt-7 flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-x-3.5 text-base font-semibold leading-7 text-ink"
          >
            <span
              aria-hidden
              className="block h-px w-3 translate-y-[-0.22em] bg-ink"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
