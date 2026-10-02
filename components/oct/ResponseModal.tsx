"use client";

import { useState } from "react";
import type { OctPackage } from "./OctProposal";

export function CheckIcon({ size, strokeWidth = 1.6 }: { size: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="oct-li-x" aria-hidden>
      <path d="M5 5l6 6M11 5l-6 6" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.5 3.5v-.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

async function sendResponse(body: {
  action: "accept" | "request-edits";
  slug: string;
  selectedOption?: string;
  message?: string;
}) {
  const response = await fetch("/api/proposal-response", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) throw new Error(data.error ?? "The response could not be sent.");
}

export function ResponseModal({
  mode,
  done,
  slug,
  selected,
  firstPayment,
  contactName,
  multiple,
  onClose,
  onAccepted,
  onEditsSent,
  onGoToOptions,
}: {
  mode: "accept" | "edits";
  done: "accept" | "edits" | null;
  slug: string;
  selected: OctPackage | null;
  firstPayment?: OctPackage["schedule"][number];
  contactName: string;
  multiple: boolean;
  onClose: () => void;
  onAccepted: () => void;
  onEditsSent: () => void;
  onGoToOptions: () => void;
}) {
  const [agree, setAgree] = useState(false);
  const [edits, setEdits] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (action: "accept" | "request-edits") => {
    setSending(true);
    setError("");
    try {
      await sendResponse({
        action,
        slug,
        selectedOption: selected?.id,
        message: action === "request-edits" ? edits : undefined,
      });
      if (action === "accept") onAccepted();
      else onEditsSent();
    } catch (e) {
      setError(e instanceof Error ? e.message : "The response could not be sent.");
    } finally {
      setSending(false);
    }
  };

  const canAccept = !!selected && agree && !sending;
  const canSendEdits = edits.trim().length > 0 && !sending;

  let content;
  if (done) {
    content = (
      <div className="oct-done">
        <span className="oct-done-icon">
          <CheckIcon size={20} />
        </span>
        <span className="oct-modal-title">{done === "edits" ? "Request sent" : "Proposal accepted"}</span>
        <span className="oct-done-text">
          {done === "edits"
            ? `${contactName} will review your changes and reply with a revised proposal.`
            : `${selected ? `${selected.eyebrow} · ${selected.name}. ` : ""}${contactName} will be in touch to confirm scope, timeline and a kickoff date.`}
        </span>
        <button type="button" onClick={onClose} className="oct-btn oct-btn--secondary" style={{ marginTop: 8 }}>
          Close
        </button>
      </div>
    );
  } else if (mode === "accept" && !selected) {
    content = (
      <div className="oct-done">
        <span className="oct-modal-title">Select an option first</span>
        <span className="oct-done-text">
          Choose {multiple ? "one of the options" : "an option"} before accepting the proposal.
        </span>
        <button type="button" onClick={onGoToOptions} className="oct-btn oct-btn--primary" style={{ marginTop: 8 }}>
          Compare options
        </button>
      </div>
    );
  } else if (mode === "accept" && selected) {
    content = (
      <>
        <div className="oct-modal-body">
          <div className="oct-stack-6">
            <span className="oct-modal-title">Accept proposal</span>
            <span className="oct-modal-sub">Confirm your selected option to schedule work.</span>
          </div>
          <div className="oct-recap">
            <div className="oct-recap-row">
              <span>Option</span>
              <span>
                {selected.eyebrow.replace(/^Option\s+/i, "")} · {selected.name}
              </span>
            </div>
            <div className="oct-recap-row">
              <span>Timeline</span>
              <span>{selected.timeline}</span>
            </div>
            <div className="oct-recap-row">
              <span>Total</span>
              <span>{selected.price}</span>
            </div>
            {firstPayment ? (
              <div className="oct-recap-row oct-recap-row--due">
                <span>Deposit due ({firstPayment.percent}%)</span>
                <span>{firstPayment.amount}</span>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            role="checkbox"
            aria-checked={agree}
            onClick={() => setAgree(!agree)}
            className="oct-agree"
          >
            <span className="oct-agree-box">
              <CheckIcon size={12} strokeWidth={2} />
            </span>
            I agree to the scope, exclusions, and payment terms in this proposal.
          </button>
          {error ? <p className="oct-error">{error}</p> : null}
        </div>
        <div className="oct-modal-foot">
          <button type="button" onClick={onClose} className="oct-btn oct-btn--secondary">
            Cancel
          </button>
          <button
            type="button"
            disabled={!canAccept}
            onClick={() => submit("accept")}
            className="oct-btn oct-btn--primary"
          >
            {sending ? "Sending…" : "Accept Proposal"}
          </button>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div className="oct-modal-body">
          <div className="oct-stack-6">
            <span className="oct-modal-title">Request edits</span>
            <span className="oct-modal-sub">
              Tell us what you&apos;d like changed and {contactName} will send a revised proposal.
            </span>
          </div>
          <label className="oct-field">
            <span className="oct-modal-sub">Requested changes</span>
            <textarea
              value={edits}
              onChange={(e) => setEdits(e.target.value)}
              rows={5}
              placeholder={`e.g. Can we add one extra variant to ${selected?.eyebrow ?? "Option 01"}?`}
              className="oct-textarea"
            />
          </label>
          {error ? <p className="oct-error">{error}</p> : null}
        </div>
        <div className="oct-modal-foot">
          <button type="button" onClick={onClose} className="oct-btn oct-btn--secondary">
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSendEdits}
            onClick={() => submit("request-edits")}
            className="oct-btn oct-btn--primary"
          >
            {sending ? "Sending…" : "Send request"}
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="oct-backdrop" onClick={onClose}>
      <div className="oct-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
}
