import { Contact, CtaConfig } from "@/lib/types";
import { buildMailto } from "@/lib/comparison";
import { Button } from "./Button";
import { EyebrowPill } from "./EyebrowPill";
import { SectionReveal } from "./SectionReveal";

const FALLBACK_EMAIL = "hello@akima.studio";

export function CTASection({
  client,
  contact,
  cta,
  recommendedName,
}: {
  client: string;
  contact?: Contact;
  cta?: CtaConfig;
  recommendedName?: string;
}) {
  const email = contact?.email ?? FALLBACK_EMAIL;
  const acceptLabel = cta?.acceptLabel ?? "Accept Proposal";
  const editsLabel = cta?.requestEditsLabel ?? "Request Edits";
  const acceptSubject =
    cta?.acceptEmailSubject ?? `Accept Proposal — ${client}`;
  const editsSubject =
    cta?.requestEditsEmailSubject ?? `Proposal Edits — ${client}`;

  const greeting = contact?.name ? `Hey ${contact.name},` : "Hey,";

  const acceptBody = `${greeting}\n\nHappy to move ahead with this proposal.\n\nPreferred option: ${recommendedName ?? ""}\n\nThanks.`;

  const editsBody = `${greeting}\n\nI had a few questions or requested edits on the proposal.\n\nThanks.`;

  return (
    <SectionReveal>
      <section
        id="accept"
        className="rounded-card bg-ink text-paper px-6 py-16 md:px-16 md:py-24"
      >
        <div className="flex flex-col gap-8 md:max-w-3xl">
          <EyebrowPill variant="ember">Next</EyebrowPill>

          <h2 className="text-4xl font-extrabold leading-none tracking-[-0.02em] text-paper md:text-6xl">
            Ready when you are.
          </h2>

          <p className="text-base leading-7 text-paper/70 md:text-lg">
            Hit accept to lock in your preferred option, or send any edits
            you&rsquo;d like before signing off. Either opens a pre-filled email
            to {contact?.name ?? "us"}.
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <Button
              variant="ember"
              href={buildMailto(email, acceptSubject, acceptBody)}
            >
              {acceptLabel}
            </Button>
            <Button
              variant="ghost"
              href={buildMailto(email, editsSubject, editsBody)}
              className="!text-paper !border-paper/30 hover:!border-paper"
            >
              {editsLabel}
            </Button>
          </div>

          {contact ? (
            <div className="mt-6 flex flex-col gap-1 border-t border-paper/15 pt-6 text-sm text-paper/70">
              {contact.name ? (
                <span className="text-paper">
                  {contact.name}
                  {contact.role ? ` — ${contact.role}` : ""}
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
