import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ReactNode } from "react";
import { SectionReveal } from "./SectionReveal";

type Variant = "default" | "subdued" | "compact";

const proseClass: Record<Variant, string> = {
  default: "prose-editorial",
  subdued: "prose-editorial prose-subdued",
  compact: "prose-editorial prose-compact",
};

export function Section({
  id,
  eyebrow,
  heading,
  body,
  variant = "default",
  divider = true,
  children,
}: {
  id?: string;
  eyebrow?: string;
  heading: string;
  body?: string;
  variant?: Variant;
  divider?: boolean;
  children?: ReactNode;
}) {
  return (
    <SectionReveal>
      <section
        id={id}
        className={`${divider ? "border-t border-rule" : ""} py-20 md:py-28`}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            {eyebrow ? (
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                {eyebrow}
              </div>
            ) : null}
            <h2 className="text-3xl font-bold leading-none tracking-[-0.02em] text-ink md:text-5xl">
              {heading}
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-5">
            {body ? (
              <div className={proseClass[variant]}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
              </div>
            ) : null}
            {children}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
