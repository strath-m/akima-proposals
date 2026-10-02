"use client";

import { ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CategoryItem, Contact } from "@/lib/types";
import { CheckIcon, CopyIcon, CrossIcon, ResponseModal } from "./ResponseModal";

/** A Markdown section, either as list items (the design's look) or raw Markdown. */
export type OctBlock = { items?: string[]; markdown?: string };

export type OctPackage = {
  id: string;
  eyebrow: string;
  name: string;
  summary: string;
  price: string;
  originalPrice?: string;
  discountLabel?: string;
  timeline: string;
  bestFor?: string;
  recommended: boolean;
  highlights: string[];
  categories: { title: string; items: CategoryItem[] }[];
  schedule: { label: string; note?: string; percent: number; amount: string }[];
};

export type OctProposalData = {
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
  overview?: string;
  goals?: OctBlock;
  plan?: { when: string; title: string; body: string }[];
  commitments?: string[];
  team?: { name: string; role: string; bio?: string }[];
  packages: OctPackage[];
  defaultSelected: string | null;
  addons?: { label: string; note?: string }[];
  addonsMarkdown?: string;
  exclusions?: OctBlock;
  terms?: OctBlock;
  faqs?: { question: string; answer: string }[];
  notes?: string;
  contact?: Contact;
};

const SINGLE_FIRST_STEP = ["Accept the proposal", "Lock in the scope and investment above."];

const STEPS = [
  ["Select an option", "Choose the package that best matches the ambition and timing."],
  ["Confirm scope and timeline", "Align on inclusions, milestones, and delivery rhythm."],
  ["Lock in kickoff", "Schedule the first working session and project start date."],
  ["Sign agreement", "Finalise terms so the work can be booked in."],
  ["Begin discovery", "Move into direction, strategy, and experience mapping."],
];

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
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="oct-section">
      <h2 className="oct-h2">{title}</h2>
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

// Matched on first name; anyone else gets an initial.
const PHOTOS: [RegExp, string][] = [
  [/^strath/i, "/oct/strath-avatar.png"],
  [/^jake/i, "/oct/jake-avatar.webp"],
];

function Avatar({ name }: { name: string }) {
  const photo = PHOTOS.find(([pattern]) => pattern.test(name))?.[1];
  return photo ? (
    <img src={photo} alt={name} className="oct-avatar" />
  ) : (
    <span className="oct-avatar" aria-hidden>
      {name.charAt(0)}
    </span>
  );
}

function SelectButton({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`oct-btn ${selected ? "oct-btn--selected" : "oct-btn--secondary"}`}
    >
      {selected ? (
        <>
          <CheckIcon size={16} />
          Selected
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function OctProposal({ data }: { data: OctProposalData }) {
  const { packages, contact } = data;
  const multiple = packages.length > 1;
  const [selectedId, setSelectedId] = useState(data.defaultSelected);
  const [modal, setModal] = useState<"accept" | "edits" | null>(null);
  const [done, setDone] = useState<"accept" | "edits" | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);

  const selected = packages.find((p) => p.id === selectedId) ?? null;
  const contactName = contact?.name?.split(" ")[0] ?? "Akima";

  const toggle = (id: string) =>
    setSelectedId((current) => (current === id ? null : id));
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

  const goToOptions = () => {
    close();
    setTimeout(() => document.getElementById("options")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const hasOverview = data.problem || data.goal || data.overview;
  const hasAddons = data.addons || data.addonsMarkdown;
  const firstPayment = selected?.schedule[0];
  const steps = multiple ? STEPS : [SINGLE_FIRST_STEP, ...STEPS.slice(1)];

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
              Accept Proposal
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

          {/* Overview and Goals share one section, side by side on wide screens. */}
          {hasOverview || data.goals ? (
            <section id="overview" className="oct-section">
              <div className="oct-brief">
                {hasOverview ? (
                  <div className="oct-brief-col">
                    <h2 className="oct-h2">Overview</h2>
                    {data.problem || data.goal ? (
                      <>
                        {data.problem ? (
                          <div className="oct-brief-item">
                            <span className="oct-pill oct-pill--accent">Problem</span>
                            <p className="oct-brief-text oct-brief-text--muted">{data.problem}</p>
                          </div>
                        ) : null}
                        {data.goal ? (
                          <div className="oct-brief-item">
                            <span className="oct-pill oct-pill--success">Solution</span>
                            <p className="oct-brief-text">{data.goal}</p>
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <Markdown>{data.overview ?? ""}</Markdown>
                    )}
                  </div>
                ) : null}
                {data.goals ? (
                  <div id="goals" className="oct-brief-col">
                    <h2 className="oct-h2">Goals</h2>
                    {data.goals.items ? (
                      <ol className="oct-brief-goals">
                        {data.goals.items.map((goal, i) => (
                          <li key={goal} className="oct-brief-goal">
                            <span className="oct-goal-num">{String(i + 1).padStart(2, "0")}</span>
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <Markdown>{data.goals.markdown ?? ""}</Markdown>
                    )}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {packages.map((p) => (
            <section key={p.id} id={p.id} className="oct-section oct-section--package">
              <div className="oct-stack-12">
                <div className="oct-pills">
                  <span className="oct-pill oct-pill--neutral">{p.eyebrow}</span>
                  {multiple && p.recommended ? (
                    <span className="oct-pill oct-pill--success">Recommended</span>
                  ) : null}
                </div>
                <h2 className="oct-h2-lg">{p.name}</h2>
                <p className="oct-summary">{p.summary}</p>
              </div>

              <div className="oct-facts">
                <div className="oct-fact">
                  <span className="oct-label">Investment</span>
                  <span className="oct-fact-value">
                    {p.originalPrice ? <span className="oct-strike">{p.originalPrice}</span> : null}
                    {p.price}
                  </span>
                  {p.discountLabel ? (
                    <span className="oct-pill oct-pill--success" style={{ alignSelf: "flex-start" }}>
                      {p.discountLabel}
                    </span>
                  ) : null}
                </div>
                <div className="oct-fact">
                  <span className="oct-label">Timeline</span>
                  <span className="oct-fact-value">{p.timeline}</span>
                </div>
                {p.bestFor ? (
                  <div className="oct-fact oct-fact--wide">
                    <span className="oct-label">Best for</span>
                    <span className="oct-fact-text">{p.bestFor}</span>
                  </div>
                ) : null}
              </div>

              {p.categories.length > 0 ? (
                <div className="oct-stack-16">
                  <span className="oct-included-title">What&apos;s included</span>
                  <div className="oct-grid oct-grid--250">
                    {p.categories.map((cat) => (
                      <div key={cat.title} className="oct-card oct-cat">
                        <span className="oct-cat-title">{cat.title}</span>
                        <ul className="oct-cat-list">
                          {cat.items.map((item, i) => (
                            <li key={i} className="oct-cat-item">
                              <span className="oct-dot" />
                              {typeof item === "string" ? (
                                item
                              ) : (
                                <span>
                                  {item.title}
                                  {item.description ? (
                                    <span className="oct-cat-desc">{item.description}</span>
                                  ) : null}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {multiple ? (
                <div className="oct-btn-row">
                  <SelectButton
                    selected={p.id === selectedId}
                    label={`Select ${p.eyebrow}`}
                    onClick={() => toggle(p.id)}
                  />
                </div>
              ) : null}
            </section>
          ))}

          {multiple ? (
            <section id="options" className="oct-section">
              <div className="oct-stack-6">
                <h2 className="oct-h2">Compare options</h2>
                <p className="oct-sub">Select an option to see its payment schedule.</p>
              </div>
              <div className="oct-grid oct-grid--260">
                {packages.map((p) => (
                  <div
                    key={p.id}
                    className="oct-cmp"
                    data-selected={p.id === selectedId}
                    onClick={() => toggle(p.id)}
                  >
                    <div className="oct-cmp-top">
                      <span className="oct-pill oct-pill--neutral">{p.eyebrow}</span>
                      {p.recommended ? (
                        <span className="oct-pill oct-pill--success">Recommended</span>
                      ) : null}
                    </div>
                    <div className="oct-stack-6" style={{ gap: 8 }}>
                      <h3 className="oct-h3">{p.name}</h3>
                      <p className="oct-cmp-sum">{p.summary}</p>
                    </div>
                    <div className="oct-cmp-price-row">
                      <span className="oct-cmp-price">{p.price}</span>
                      <span className="oct-pill oct-pill--chip">{p.timeline}</span>
                    </div>
                    <div className="oct-rule" />
                    <ul className="oct-check-list">
                      {p.highlights.map((h) => (
                        <li key={h} className="oct-check">
                          <CheckIcon size={16} strokeWidth={1.5} />
                          {h}
                        </li>
                      ))}
                    </ul>
                    {p.bestFor ? (
                      <div className="oct-bestfor">
                        <span className="oct-label">Best for</span>
                        <span className="oct-bestfor-text">{p.bestFor}</span>
                      </div>
                    ) : null}
                    <SelectButton selected={p.id === selectedId} label="Select option" />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {data.plan?.length ? (
            <section id="plan" className="oct-section">
              <div className="oct-stack-6">
                <h2 className="oct-h2">How the project runs</h2>
                <p className="oct-sub">Clear decision points, so nothing arrives as a surprise.</p>
              </div>
              <ol className="oct-plan">
                {data.plan.map((step, i) => (
                  <li key={step.title} className="oct-plan-step">
                    <div className="oct-plan-top">
                      <span className="oct-goal-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="oct-label">{step.when}</span>
                    </div>
                    <span className="oct-plan-title">{step.title}</span>
                    <span className="oct-plan-body">{step.body}</span>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

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
                        <li key={item} className="oct-li oct-commit">
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
                      <span className="oct-card-note">Senior people on every stage.</span>
                    </div>
                    <div className="oct-team">
                      {data.team.map((person) => (
                        <div key={person.name} className="oct-team-person">
                          <Avatar name={person.name} />
                          <div className="oct-stack-6" style={{ gap: 2 }}>
                            <span className="oct-team-name">{person.name}</span>
                            <span className="oct-label">{person.role}</span>
                            {person.bio ? <span className="oct-team-bio">{person.bio}</span> : null}
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
            <Section
              id="addons"
              title={hasAddons && data.exclusions ? "Add-ons & exclusions" : hasAddons ? "Add-ons" : "Exclusions"}
            >
              <div className="oct-grid oct-grid--320">
                {hasAddons ? (
                  <div className="oct-card">
                    <div className="oct-card-head">
                      <span className="oct-card-title">Optional add-ons</span>
                      <span className="oct-card-note">
                        {multiple ? "Available alongside any option." : "Available whenever you need them."}
                      </span>
                    </div>
                    {data.addons ? (
                      <div className="oct-rows">
                        {data.addons.map((addon) => (
                          <div key={addon.label} className="oct-row">
                            <span>{addon.label}</span>
                            {addon.note ? <span className="oct-row-note">{addon.note}</span> : null}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="oct-card-pad">
                        <Markdown>{data.addonsMarkdown ?? ""}</Markdown>
                      </div>
                    )}
                  </div>
                ) : null}
                {data.exclusions ? (
                  <div className="oct-card">
                    <div className="oct-card-head">
                      <span className="oct-card-title">Exclusions</span>
                      <span className="oct-card-note">
                        {multiple ? "Not included in any option." : "Not included in this scope."}
                      </span>
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
                  <span className="oct-pill oct-pill--chip">{selected?.eyebrow ?? "No option selected"}</span>
                </div>
                <div className="oct-rows">
                  {(selected?.schedule ?? packages[0]?.schedule ?? []).map((step) => (
                    <div key={step.label} className="oct-sched-row">
                      <div className="oct-sched-label">
                        <span>{step.label}</span>
                        {step.note ? <span className="oct-label">{step.note}</span> : null}
                      </div>
                      <span>{selected ? step.amount : "—"}</span>
                    </div>
                  ))}
                </div>
                <div className="oct-total">
                  <span style={{ color: "var(--oct-text-2)" }}>Total</span>
                  <span className="oct-total-value">{selected?.price ?? "—"}</span>
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

          {data.notes ? (
            <Section id="notes" title="Notes">
              <div className="oct-card oct-card-pad">
                <Markdown>{data.notes}</Markdown>
              </div>
            </Section>
          ) : null}

          <Section id="next-steps" title="Next steps">
            <div className="oct-steps">
              {steps.map(([title, body], i) => (
                <div key={title} className="oct-step">
                  <div className="oct-step-mark">
                    <span className="oct-step-ring">
                      <span className={`oct-step-dot ${i === 0 ? "oct-step-dot--live" : ""}`} />
                    </span>
                    {i < steps.length - 1 ? <span className="oct-step-line" /> : null}
                  </div>
                  <div className="oct-step-content">
                    <span className="oct-step-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="oct-step-title">{title}</span>
                    <span className="oct-step-body">{body}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

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
                    {accepted ? "Thanks — we’re ready to get started." : "Ready to get started?"}
                  </h2>
                  <p>
                    {accepted
                      ? `${contactName} will be in touch to confirm scope and timeline, lock in a kickoff date, and send the agreement.`
                      : multiple
                        ? "Accept the proposal with your selected option, or request edits and we’ll send a revised version."
                        : "Accept the proposal, or request edits and we’ll send a revised version."}
                  </p>
                  <div className="oct-pills" style={{ gap: 8 }}>
                    <span className="oct-pill oct-pill--chip oct-pill--lg">
                      {selected?.eyebrow ?? "No option selected"}
                    </span>
                    <span className="oct-pill oct-pill--chip oct-pill--lg">{selected?.price ?? "—"}</span>
                    <span className="oct-pill oct-pill--chip oct-pill--lg">{selected?.timeline ?? "—"}</span>
                  </div>
                </div>
                {!accepted ? (
                  <div className="oct-btn-row">
                    <button type="button" onClick={openEdits} className="oct-btn oct-btn--secondary">
                      Request Edits
                    </button>
                    <button type="button" onClick={openAccept} className="oct-btn oct-btn--primary">
                      Accept Proposal
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
                {selected ? `${selected.eyebrow} · ${selected.timeline}` : "No option selected"}
              </span>
              <span className="oct-total-value">{selected?.price ?? "—"}</span>
            </div>
            <button type="button" onClick={openAccept} className="oct-btn oct-btn--primary">
              Accept Proposal
            </button>
          </div>
        </>
      ) : null}

      {modal ? (
        <ResponseModal
          mode={modal}
          done={done}
          slug={data.slug}
          selected={selected}
          firstPayment={firstPayment}
          contactName={contactName}
          multiple={multiple}
          onClose={close}
          onAccepted={() => {
            setAccepted(true);
            setDone("accept");
          }}
          onEditsSent={() => setDone("edits")}
          onGoToOptions={goToOptions}
        />
      ) : null}
    </div>
  );
}
