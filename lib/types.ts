export type Contact = {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
};

export type CtaConfig = {
  acceptLabel?: string;
  requestEditsLabel?: string;
  acceptEmailSubject?: string;
  requestEditsEmailSubject?: string;
};

export type CategoryItem =
  | string
  | {
      title: string;
      description?: string;
    };

export type Category = {
  title: string;
  items?: CategoryItem[];
  // Used by the /oct template only: a small icon tile beside the title.
  // One of the names in CATEGORY_ICONS (components/oct/OctProposal.tsx).
  icon?: string;
};

export type Package = {
  id: string;
  name: string;
  eyebrow: string;
  summary: string;
  price: string;
  originalPrice?: string;
  discountLabel?: string;
  priceLabel?: string;
  timeline: string;
  bestFor?: string;
  recommended?: boolean;
  comparisonHighlights?: string[];
  categories?: Category[];
  deliverables?: string[];
  // Used by the /oct template only: a recurring fee on top of `price`, e.g. a
  // monthly partnership. Shown beside the price and as the last payment row.
  ongoing?: { price: string; label?: string; note?: string };
};

export type PaymentStep = {
  label: string;
  note?: string;
  percent: number;
};

export type ProposalFrontmatter = {
  client: string;
  slug?: string;
  proposalTitle: string;
  preparedFor: string;
  preparedBy: string;
  date: string;
  validUntil?: string;
  recommendedOption?: string;
  contact?: Contact;
  cta?: CtaConfig;
  packages: Package[];
  // Serves /[slug] with this template instead of the live one, and makes every
  // /[slug]/... variant a 404 (see next.config.ts). Names are registered in
  // components/templates.ts.
  template?: string;
  // Used by the /oct template only: hero intro line and Overview rows.
  intro?: string;
  problem?: string;
  goal?: string;
  // Used by the /oct template only; defaults to 50% deposit / 50% on delivery.
  paymentSchedule?: PaymentStep[];
  // Used by the /oct template only: "How the project runs" and
  // "How we'll work together". Each section shows only when present.
  plan?: { when: string; title: string; body: string }[];
  commitments?: string[];
  team?: { name: string; role: string; bio?: string }[];
  // Used by the /oct template only; replaces the default "Next steps".
  nextSteps?: { title: string; body: string }[];
  // Used by the /oct template only: a big-type brief that replaces the
  // Overview/Goals section. Headline lines after the first are muted.
  brief?: {
    label?: string;
    headline: string;
    text?: string;
    goalsLabel?: string;
    goals?: { title: string; text: string }[];
  };
  // Used by the /oct template only: a short timeline ("How we get there")
  // shown straight after the brief.
  stages?: { label?: string; items: { when: string; title: string; body: string }[] };
};

export type ProposalSection = {
  key: SectionKey;
  heading: string;
  body: string;
};

export const SECTION_KEYS = [
  "overview",
  "goals",
  "why-this-matters",
  "optional-add-ons",
  "exclusions",
  "payment-and-terms",
  "next-steps",
  "faqs",
  "notes",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

export const SECTION_LABELS: Record<SectionKey, string> = {
  overview: "Overview",
  goals: "Goals",
  "why-this-matters": "Why this matters",
  "optional-add-ons": "Optional add-ons",
  exclusions: "Exclusions",
  "payment-and-terms": "Payment & terms",
  "next-steps": "Next steps",
  faqs: "FAQs",
  notes: "Notes",
};

export type Proposal = {
  slug: string;
  frontmatter: ProposalFrontmatter;
  sections: ProposalSection[];
};
