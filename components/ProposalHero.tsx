import { EyebrowPill } from "./EyebrowPill";

export function ProposalHero({
  client,
  proposalTitle,
}: {
  client: string;
  proposalTitle: string;
}) {
  return (
    <section
      id="top"
      className="pt-40 pb-16 md:pt-56 md:pb-24"
    >
      <div className="flex flex-col gap-8 md:gap-10">
        <EyebrowPill>Proposal · {client}</EyebrowPill>

        <h1 className="text-5xl font-extrabold leading-none tracking-[-0.03em] text-ink md:text-8xl">
          {proposalTitle}
        </h1>
      </div>
    </section>
  );
}
