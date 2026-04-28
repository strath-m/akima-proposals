import { NextResponse } from "next/server";
import { getProposalBySlug } from "@/lib/proposals";

type ProposalAction = "accept" | "request-edits";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Akima Proposals <onboarding@resend.dev>";
const DEFAULT_TO = "strath@akima.studio";

function isProposalAction(action: unknown): action is ProposalAction {
  return action === "accept" || action === "request-edits";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmail({
  action,
  client,
  proposalTitle,
  preparedFor,
  recommendedName,
}: {
  action: ProposalAction;
  client: string;
  proposalTitle: string;
  preparedFor: string;
  recommendedName?: string;
}) {
  const accepted = action === "accept";
  const actionLabel = accepted ? "accepted" : "requested edits on";
  const subject = accepted
    ? `Accepted: ${proposalTitle} - ${client}`
    : `Edits requested: ${proposalTitle} - ${client}`;

  const rows = [
    ["Action", accepted ? "Accepted proposal" : "Requested edits"],
    ["Client", client],
    ["Prepared for", preparedFor],
    ["Proposal", proposalTitle],
    ["Recommended option", recommendedName ?? "Not specified"],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;color:#6b645d;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(
            label
          )}</td>
          <td style="padding:10px 0;color:#111111;font-size:15px;font-weight:600;text-align:right;">${escapeHtml(
            value
          )}</td>
        </tr>`
    )
    .join("");

  return {
    subject,
    text: `${preparedFor} has ${actionLabel} ${proposalTitle} for ${client}.\n\n${rows
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n")}`,
    html: `
      <div style="background:#f4f0ea;padding:32px;font-family:Arial,sans-serif;color:#111111;">
        <div style="max-width:560px;margin:0 auto;background:#faf8f5;border:1px solid #ddd8d0;border-radius:12px;padding:32px;">
          <p style="margin:0 0 14px;color:#d63f1f;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">Akima proposal response</p>
          <h1 style="margin:0 0 18px;font-size:28px;line-height:1.05;">${escapeHtml(
            preparedFor
          )} has ${escapeHtml(actionLabel)} this proposal.</h1>
          <table style="width:100%;border-collapse:collapse;border-top:1px solid #ddd8d0;margin-top:24px;">
            ${htmlRows}
          </table>
        </div>
      </div>`,
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email sending is not configured yet." },
      { status: 503 }
    );
  }

  const body = (await request.json()) as { action?: unknown; slug?: unknown };
  const action = body.action;
  const slug = typeof body.slug === "string" ? body.slug : "";

  if (!isProposalAction(action) || !slug) {
    return NextResponse.json(
      { error: "Invalid proposal response." },
      { status: 400 }
    );
  }

  const proposal = getProposalBySlug(slug);
  if (!proposal) {
    return NextResponse.json({ error: "Proposal not found." }, { status: 404 });
  }

  const {
    client,
    proposalTitle,
    preparedFor,
    recommendedOption,
    packages,
  } = proposal.frontmatter;
  const recommendedName = packages.find((pkg) => pkg.id === recommendedOption)
    ?.name;
  const email = buildEmail({
    action,
    client,
    proposalTitle,
    preparedFor,
    recommendedName,
  });

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.PROPOSAL_EMAIL_FROM ?? DEFAULT_FROM,
      to: process.env.PROPOSAL_EMAIL_TO ?? DEFAULT_TO,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "The email could not be sent." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
