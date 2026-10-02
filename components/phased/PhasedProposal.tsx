"use client";

import { ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Contact } from "@/lib/types";
import type { OctBlock, OctPackage } from "@/components/oct/OctProposal";
import { CheckIcon, CopyIcon, CrossIcon, ResponseModal } from "@/components/oct/ResponseModal";

// A phased proposal: the client accepts Phase 1 now and decides on the next
// phase after it's delivered. Reuses the October styles and accept modal.

type LabelNote = { label: string; note?: string };

export type PhasedProposalData = {
  slug: string;
  client: string;
  proposalTitle: string;
  intro?: string;
  preparedFor: string;
  preparedBy: string;
  date: string;
  validUntil?: string;
  problem?: string;
  goal?: string;
  planTotal?: string;
  planTimeline?: string;
  startReason?: string;
  heard?: string[];
  heardBy?: string;
  plan?: { when: string; title: string; body: string }[];
  commitments?: string[];
  team?: { name: string; role: string; bio?: string }[];
  phase: OctPackage;
  nextPhase?: OctPackage & { note?: string };
  addons?: LabelNote[];
  exclusions?: OctBlock;
  terms?: OctBlock;
  nextSteps?: LabelNote[];
  faqs?: { question: string; answer: string }[];
  contact?: Contact;
  acceptLabel: string;
};

function Markdown({ children }: { children: string }) {
  return (
    <div className="oct-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

function Section({
  id,
  title,
  sub,
  children,
}: {
  id?: string;
  title: string;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="oct-section">
      <div className="oct-stack-6">
        <h2 className="oct-h2">{title}</h2>
        {sub ? <p className="oct-sub">{sub}</p> : null}
      </div>
      {children}
    </section>
  );
}

function BulletList({ block, marker }: { block: OctBlock; marker: "dot" | "cross" }) {
  if (!block.items) {
    return <div className="oct-card-pad">{block.markdown ? <Markdown>{block.markdown}</Markdown> : null}</div>;
  }
  return (
    <ul className="oct-list">
      {block.items.map((item) => (
        <li key={item} className="oct-li">
          {marker === "dot" ? <span className="oct-dot" /> : <CrossIcon />}
          {item}
        </li>
      ))}
    </ul>
  );
}

function Avatar({ name }: { name: string }) {
  return /^strath/i.test(name) ? (
    <img src="/oct/strath-avatar.png" alt={name} className="oct-avatar" />
  ) : (
    <span className="oct-avatar" aria-hidden>
      {name.charAt(0)}
    </span>
  );
}

function PhaseSection({ phase, later }: { phase: OctPackage & { note?: string }; later?: boolean }) {
  return (
    <section id={phase.id} className="oct-section oct-section--package">
      <div className="oct-stack-12">
        <div className="oct-pills">
          <span className="oct-pill oct-pill--neutral">{phase.eyebrow}</span>
          {later ? (
            <span className="oct-pill oct-pill--chip">After Phase 1</span>
          ) : (
            <span className="oct-pill oct-pill--success">Start here</span>
          )}
        </div>
        <h2 className="oct-h2-lg">{phase.name}</h2>
        <p className="oct-summary">{phase.summary}</p>
      </div>

      <div className="oct-facts">
        <div className="oct-fact">
          <span className="oct-label">Investment</span>
          <span className="oct-fact-value">{phase.price}</span>
        </div>
        <div className="oct-fact">
          <span className="oct-label">Timeline</span>
          <span className="oct-fact-value">{phase.timeline}</span>
        </div>
        {phase.note ? (
          <div className="oct-fact oct-fact--wide">
            <span className="oct-label">When</span>
            <span className="oct-fact-text">{phase.note}</span>
          </div>
        ) : null}
      </div>

      {phase.categories.length > 0 ? (
        <div className="oct-stack-16">
          <span className="oct-included-title">What&apos;s included</span>
          <div className="oct-grid oct-grid--250">
            {phase.categories.map((cat) => (
              <div key={cat.title} className="oct-card oct-cat">
                <span className="oct-cat-title">{cat.title}</span>
                <ul className="oct-cat-list">
                  {cat.items.map((item, i) => (
                    <li key={i} className="oct-cat-item">
                      <span className="oct-dot" />
                      {typeof item === "string" ? item : item.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function PhasedProposal({ data }: { data: PhasedProposalData }) {
  const { phase, nextPhase, contact } = data;
  const [modal, setModal] = useState<"accept" | "edits" | null>(null);
  const [done, setDone] = useState<"accept" | "edits" | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactName = contact?.name?.split(" ")[0] ?? "Akima";

  const openAccept = () => {
    setModal("accept");
    setDone(accepted ? "accept" : null);
  };
  const openEdits = () => {
    setModal("edits");
    setDone(null);
  };
  const close = () => {
    setModal(null);
    setDone(null);
  };

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  const copyEmail = () => {
    if (!contact?.email) return;
    navigator.clipboard?.writeText(contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  const hasAddons = !!data.addons?.length;

  return (
    <div className="oct">
      <header className="oct-header">
        <div className="oct-frame oct-header-inner">
          <img
            src="/oct/akima-logo-horizontal-white-trademark.svg"
            alt="Akima Studio"
            className="oct-header-logo"
          />
          <div className="oct-header-actions">
            <button type="button" onClick={openEdits} className="oct-btn oct-btn--sm oct-btn--secondary oct-wide-only">
              Request Edits
            </button>
            <button type="button" onClick={openAccept} className="oct-btn oct-btn--sm oct-btn--primary oct-wide-only">
              {data.acceptLabel}
            </button>
          </div>
        </div>
      </header>

      <div className="oct-frame">
        <main>
          <section className="oct-hero">
            <div className="oct-stack-16">
              <div className="oct-pills">
                <span className="oct-pill oct-pill--accent">
                  Proposal
                  <span className="oct-pill-dot" />
                  {data.client}
                </span>
              </div>
              <h1 className="oct-h1">{data.proposalTitle}</h1>
              {data.intro ? <p className="oct-lead">{data.intro}</p> : null}
            </div>

            {/* The whole decision on the first screen: what to start with, what follows. */}
            <div className="ph-start">
              <div className="ph-start-main">
                <div className="oct-pills">
                  <span className="oct-pill oct-pill--success">Start here</span>
                  <span className="oct-label">{phase.eyebrow}</span>
                </div>
                <h2 className="oct-h3 ph-start-name">{phase.name}</h2>
                <div className="ph-start-price">
                  <span className="oct-total-value">{phase.price}</span>
                  <span className="oct-pill oct-pill--chip">{phase.timeline}</span>
                </div>
                {data.startReason ? <p className="ph-start-reason">{data.startReason}</p> : null}
                {!accepted ? (
                  <div className="oct-btn-row">
                    <button type="button" onClick={openAccept} className="oct-btn oct-btn--primary">
                      {data.acceptLabel}
                    </button>
                    <a href={`#${phase.id}`} className="oct-btn oct-btn--secondary">
                      See what&apos;s included
                    </a>
                  </div>
                ) : (
                  <span className="oct-pill oct-pill--success" style={{ alignSelf: "flex-start" }}>
                    <span className="oct-pill-dot oct-pill-dot--lg" />
                    Accepted
                  </span>
                )}
              </div>
              {nextPhase ? (
                <a href={`#${nextPhase.id}`} className="ph-start-next">
                  <span className="oct-label">Then · {nextPhase.eyebrow}</span>
                  <span className="ph-start-next-name">{nextPhase.name}</span>
                  <span className="ph-start-next-meta">
                    {nextPhase.price} · {nextPhase.timeline}
                  </span>
                  <span className="oct-label">Decide after Phase 1 is delivered</span>
                </a>
              ) : null}
              {data.planTotal ? (
                <div className="ph-start-foot">
                  <span>Full plan</span>
                  <span>
                    <strong>{data.planTotal}</strong>
                    {data.planTimeline ? ` · ${data.planTimeline}` : ""}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="oct-meta">
              {[
                ["Prepared for", data.preparedFor],
                ["Prepared by", data.preparedBy],
                ["Date", data.date],
                ["Valid until", data.validUntil],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="oct-meta-item">
                    <span className="oct-label">{label}</span>
                    <span className="oct-meta-value">{value}</span>
                  </div>
                ))}
            </div>
          </section>

          {data.heard?.length || data.problem || data.goal ? (
            <Section id="heard" title="What we heard">
              {data.heard?.length ? (
                <div className="oct-stack-12">
                  <div className="ph-quotes">
                    {data.heard.map((quote) => (
                      <figure key={quote} className="ph-quote">
                        <span className="ph-quote-mark" aria-hidden>
                          “
                        </span>
                        <blockquote>{quote}</blockquote>
                      </figure>
                    ))}
                  </div>
                  {data.heardBy ? <span className="oct-label">— {data.heardBy}</span> : null}
                </div>
              ) : null}
              {data.problem || data.goal ? (
                <div className="oct-card">
                  {data.problem ? (
                    <div className="oct-ov-row">
                      <div>
                        <span className="oct-pill oct-pill--accent">Problem</span>
                      </div>
                      <p className="oct-ov-text" style={{ color: "var(--oct-text-2)" }}>
                        {data.problem}
                      </p>
                    </div>
                  ) : null}
                  {data.goal ? (
                    <div className="oct-ov-row">
                      <div>
                        <span className="oct-pill oct-pill--success">Goal</span>
                      </div>
                      <p className="oct-ov-text">{data.goal}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </Section>
          ) : null}

          {data.plan?.length ? (
            <Section id="plan" title="How the project runs" sub="Clear decision points, so nothing arrives as a surprise.">
              <ol className="ph-plan">
                {data.plan.map((step, i) => (
                  <li key={step.title} className="ph-plan-step">
                    <div className="ph-plan-top">
                      <span className="oct-goal-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="oct-label">{step.when}</span>
                    </div>
                    <span className="ph-plan-title">{step.title}</span>
                    <span className="ph-plan-body">{step.body}</span>
                  </li>
                ))}
              </ol>
            </Section>
          ) : null}

          <PhaseSection phase={phase} />
          {nextPhase ? <PhaseSection phase={nextPhase} later /> : null}

          {data.commitments?.length || data.team?.length ? (
            <Section id="working" title="How we'll work together">
              <div className="oct-grid oct-grid--320">
                {data.commitments?.length ? (
                  <div className="oct-card">
                    <div className="oct-card-head">
                      <span className="oct-card-title">Our commitments</span>
                    </div>
                    <ul className="oct-list">
                      {data.commitments.map((item) => (
                        <li key={item} className="oct-li ph-commit">
                          <CheckIcon size={16} strokeWidth={1.5} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {data.team?.length ? (
                  <div className="oct-card">
                    <div className="oct-card-head">
                      <span className="oct-card-title">Who you&apos;ll work with</span>
                      <span className="oct-card-note">Senior people on every stage, no handoffs to juniors.</span>
                    </div>
                    <div className="ph-team">
                      {data.team.map((person) => (
                        <div key={person.name} className="ph-person">
                          <Avatar name={person.name} />
                          <div className="oct-stack-6" style={{ gap: 2 }}>
                            <span className="ph-person-name">{person.name}</span>
                            <span className="oct-label">{person.role}</span>
                            {person.bio ? <span className="ph-person-bio">{person.bio}</span> : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </Section>
          ) : null}

          {hasAddons || data.exclusions ? (
            <Section id="addons" title={hasAddons && data.exclusions ? "Add-ons & exclusions" : hasAddons ? "Add-ons" : "Exclusions"}>
              <div className="oct-grid oct-grid--320">
                {hasAddons ? (
                  <div className="oct-card">
                    <div className="oct-card-head">
                      <span className="oct-card-title">Optional add-ons</span>
                      <span className="oct-card-note">Available whenever you need them.</span>
                    </div>
                    <div className="oct-rows">
                      {data.addons!.map((addon) => (
                        <div key={addon.label} className="oct-row">
                          <span>{addon.label}</span>
                          {addon.note ? <span className="oct-row-note">{addon.note}</span> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {data.exclusions ? (
                  <div className="oct-card">
                    <div className="oct-card-head">
                      <span className="oct-card-title">Exclusions</span>
                      <span className="oct-card-note">Not included in either phase.</span>
                    </div>
                    <BulletList block={data.exclusions} marker="cross" />
                  </div>
                ) : null}
              </div>
            </Section>
          ) : null}

          <Section id="terms" title="Payment & terms">
            <div className="oct-grid oct-grid--320">
              <div className="oct-card oct-card--column">
                <div className="oct-card-head oct-card-head--row">
                  <span className="oct-card-title">Payment schedule</span>
                  <span className="oct-pill oct-pill--chip">{phase.eyebrow}</span>
                </div>
                <div className="oct-rows">
                  {phase.schedule.map((step) => (
                    <div key={step.label} className="oct-sched-row">
                      <div className="oct-sched-label">
                        <span>{step.label}</span>
                        {step.note ? <span className="oct-label">{step.note}</span> : null}
                      </div>
                      <span>{step.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="oct-total">
                  <span style={{ color: "var(--oct-text-2)" }}>{phase.eyebrow} total</span>
                  <span className="oct-total-value">{phase.price}</span>
                </div>
              </div>
              {data.terms ? (
                <div className="oct-card">
                  <div className="oct-card-head">
                    <span className="oct-card-title">Terms</span>
                  </div>
                  <BulletList block={data.terms} marker="dot" />
                </div>
              ) : null}
            </div>
          </Section>

          {data.faqs ? (
            <Section id="faqs" title="FAQs">
              <div className="oct-card">
                {data.faqs.map((faq) => (
                  <div key={faq.question} className="oct-faq">
                    <span className="oct-faq-q">{faq.question}</span>
                    <Markdown>{faq.answer}</Markdown>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {data.nextSteps?.length ? (
            <Section id="next-steps" title="Next steps">
              <div className="oct-steps">
                {data.nextSteps.map((step, i) => (
                  <div key={step.label} className="oct-step">
                    <div className="oct-step-mark">
                      <span className="oct-step-ring">
                        <span className={`oct-step-dot ${i === 0 ? "oct-step-dot--live" : ""}`} />
                      </span>
                      {i < data.nextSteps!.length - 1 ? <span className="oct-step-line" /> : null}
                    </div>
                    <div className="oct-step-content">
                      <span className="oct-step-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="oct-step-title">{step.label}</span>
                      {step.note ? <span className="oct-step-body">{step.note}</span> : null}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          <section id="accept" className="oct-accept">
            <div className="oct-accept-card">
              <div className="oct-accept-body">
                <div className="oct-accept-copy">
                  {accepted ? (
                    <span className="oct-pill oct-pill--success" style={{ alignSelf: "flex-start" }}>
                      <span className="oct-pill-dot oct-pill-dot--lg" />
                      Accepted
                    </span>
                  ) : null}
                  <h2 className="oct-h2-lg">
                    {accepted ? "Thanks — we’re ready to get started." : `Ready to start ${phase.eyebrow}?`}
                  </h2>
                  <p>
                    {accepted
                      ? `${contactName} will be in touch with the agreement and a kickoff date for the strategy workshop.`
                      : `Accepting books ${phase.eyebrow} only. You decide on ${nextPhase?.eyebrow ?? "anything further"} once it's delivered.`}
                  </p>
                  <div className="oct-pills" style={{ gap: 8 }}>
                    <span className="oct-pill oct-pill--chip oct-pill--lg">{phase.eyebrow}</span>
                    <span className="oct-pill oct-pill--chip oct-pill--lg">{phase.price}</span>
                    <span className="oct-pill oct-pill--chip oct-pill--lg">{phase.timeline}</span>
                  </div>
                </div>
                {!accepted ? (
                  <div className="oct-btn-row">
                    <button type="button" onClick={openEdits} className="oct-btn oct-btn--secondary">
                      Request Edits
                    </button>
                    <button type="button" onClick={openAccept} className="oct-btn oct-btn--primary">
                      {data.acceptLabel}
                    </button>
                  </div>
                ) : null}
              </div>
              {contact?.name ? (
                <div className="oct-accept-foot">
                  <div className="oct-person">
                    <Avatar name={contact.name} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{contact.name}</span>
                      {contact.role ? <span className="oct-label">{contact.role}</span> : null}
                    </div>
                  </div>
                  <div className="oct-contact-pills">
                    {contact.email ? (
                      <span className="oct-contact-pill oct-contact-pill--split">
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        <button
                          type="button"
                          onClick={copyEmail}
                          className="oct-copy"
                          data-copied={copied}
                          title="Copy email"
                          aria-label="Copy email"
                        >
                          {copied ? <CheckIcon size={14} /> : <CopyIcon />}
                        </button>
                      </span>
                    ) : null}
                    {contact.phone ? (
                      <span className="oct-contact-pill">
                        <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </main>
      </div>

      <footer className="oct-footer">
        <div className="oct-frame oct-footer-inner">
          <img
            src="/oct/akima-logo-horizontal-white.svg"
            alt="Akima Studio"
            style={{ height: 12, width: "auto", display: "block", alignSelf: "center" }}
          />
          <span>
            Prepared {data.date}
            {data.validUntil ? ` · Valid until ${data.validUntil}` : ""}
          </span>
        </div>
      </footer>

      {!accepted ? (
        <>
          <div className="oct-bar-spacer" />
          <div className="oct-bar">
            <div className="oct-bar-info">
              <span className="oct-label">
                {phase.eyebrow} · {phase.timeline}
              </span>
              <span className="oct-total-value">{phase.price}</span>
            </div>
            <button type="button" onClick={openAccept} className="oct-btn oct-btn--primary">
              {data.acceptLabel}
            </button>
          </div>
        </>
      ) : null}

      {modal ? (
        <ResponseModal
          mode={modal}
          done={done}
          slug={data.slug}
          selected={phase}
          firstPayment={phase.schedule[0]}
          contactName={contactName}
          multiple={false}
          onClose={close}
          onAccepted={() => {
            setAccepted(true);
            setDone("accept");
          }}
          onEditsSent={() => setDone("edits")}
          onGoToOptions={close}
        />
      ) : null}
    </div>
  );
}
