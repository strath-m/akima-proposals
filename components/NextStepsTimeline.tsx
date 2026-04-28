import { Contact } from "@/lib/types";
import { EyebrowPill } from "./EyebrowPill";
import { ProposalResponseActions } from "./ProposalResponseActions";
import { SectionReveal } from "./SectionReveal";

const steps = [
  {
    label: "01",
    title: "Select an option",
    detail: "Choose the package that best matches the ambition and timing.",
  },
  {
    label: "02",
    title: "Confirm scope and timeline",
    detail: "Align on inclusions, milestones, and delivery rhythm.",
  },
  {
    label: "03",
    title: "Lock in kickoff",
    detail: "Schedule the first working session and project start date.",
  },
  {
    label: "04",
    title: "Sign agreement",
    detail: "Finalise terms so the work can be booked in.",
  },
  {
    label: "05",
    title: "Begin discovery",
    detail: "Move into direction, strategy, and experience mapping.",
  },
];

export function NextStepsTimeline({
  slug,
  client,
  proposalTitle,
  contact,
}: {
  slug: string;
  client: string;
  proposalTitle: string;
  contact?: Contact;
}) {
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
              A clean path from preferred option to kickoff, with the decision
              points visible before we move into production.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-0">
            {steps.map((step, index) => (
              <li key={step.label} className="relative md:pr-6">
                <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 md:block">
                  <div className="relative flex justify-center md:mb-7 md:block">
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-9 h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-paper/20 md:left-0 md:top-1/2 md:h-px md:w-full md:translate-x-0"
                    />
                    {index === steps.length - 1 ? (
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
                      {step.label}
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

          <ProposalResponseActions
            slug={slug}
            client={client}
            proposalTitle={proposalTitle}
          />

          {contact ? (
            <div className="flex w-full flex-col gap-1 border-t border-paper/15 pt-6 text-sm leading-6 text-paper/70">
              {contact.name ? (
                <span className="text-paper">
                  {contact.name}
                  {contact.role ? `, ${contact.role}` : ""}
                </span>
              ) : null}
              {contact.email ? <span>{contact.email}</span> : null}
              {contact.phone ? <span>{contact.phone}</span> : null}
            </div>
          ) : null}
        </div>
      </section>
    </SectionReveal>
  );
}
