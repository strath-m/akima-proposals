"use client";

import { useState } from "react";

type ProposalAction = "accept" | "request-edits";
type Status = "idle" | "submitting" | "success" | "error";

const actionCopy: Record<
  ProposalAction,
  {
    button: string;
    confirmTitle: string;
    confirmBody: string;
    confirmButton: string;
    success: string;
  }
> = {
  accept: {
    button: "Accept Proposal",
    confirmTitle: "Accept this proposal?",
    confirmBody:
      "This will send Akima a confirmation email that this proposal has been accepted.",
    confirmButton: "Yes, accept proposal",
    success: "Proposal acceptance sent.",
  },
  "request-edits": {
    button: "Request Edits",
    confirmTitle: "Request edits?",
    confirmBody:
      "This will send Akima an email that edits have been requested before moving ahead.",
    confirmButton: "Yes, request edits",
    success: "Edit request sent.",
  },
};

export function ProposalResponseActions({
  slug,
  client,
  proposalTitle,
}: {
  slug: string;
  client: string;
  proposalTitle: string;
}) {
  const [pendingAction, setPendingAction] = useState<ProposalAction | null>(
    null
  );
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const closeModal = () => {
    if (status === "submitting") return;
    setPendingAction(null);
  };

  const submitAction = async () => {
    if (!pendingAction) return;

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/proposal-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: pendingAction, slug }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");
      setMessage(actionCopy[pendingAction].success);
      setPendingAction(null);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "The response could not be sent."
      );
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 border-t border-paper/15 pt-8 sm:flex-row">
        <button
          type="button"
          onClick={() => {
            setPendingAction("accept");
            setStatus("idle");
            setMessage("");
          }}
          className="inline-flex h-[52px] items-center justify-center rounded-pill bg-ember px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-150 hover:bg-paper hover:text-ink"
        >
          Accept Proposal
        </button>
        <button
          type="button"
          onClick={() => {
            setPendingAction("request-edits");
            setStatus("idle");
            setMessage("");
          }}
          className="inline-flex h-[52px] items-center justify-center rounded-pill border border-paper/30 bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.08em] text-paper transition-colors duration-150 hover:border-paper"
        >
          Request Edits
        </button>
      </div>

      {message ? (
        <p
          className={`text-sm leading-6 ${
            status === "error" ? "text-akima-orange-200" : "text-paper/70"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}

      {pendingAction ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 px-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="proposal-response-title"
        >
          <div className="w-full max-w-[440px] rounded-card border border-rule bg-paper p-6 text-ink shadow-2xl md:p-8">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                {client}
              </p>
              <h3
                id="proposal-response-title"
                className="text-2xl font-bold leading-tight tracking-[-0.02em]"
              >
                {actionCopy[pendingAction].confirmTitle}
              </h3>
              <p className="text-sm leading-6 text-text-secondary">
                {actionCopy[pendingAction].confirmBody}
              </p>
              <p className="text-sm font-medium leading-6 text-ink">
                {proposalTitle}
              </p>
            </div>

            {status === "error" && message ? (
              <p className="mt-5 text-sm leading-6 text-akima-orange-700">
                {message}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={submitAction}
                disabled={status === "submitting"}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-pill bg-ink px-5 text-xs font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-ember disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting"
                  ? "Sending..."
                  : actionCopy[pendingAction].confirmButton}
              </button>
              <button
                type="button"
                onClick={closeModal}
                disabled={status === "submitting"}
                className="inline-flex h-11 items-center justify-center rounded-pill border border-rule-strong px-5 text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
