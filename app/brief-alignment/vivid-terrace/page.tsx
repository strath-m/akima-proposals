import type { Metadata } from "next";
import {
  BookOpen,
  Compass,
  GalleryVerticalEnd,
  Link2,
  Palette,
  Route,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { Container } from "@/components/Container";
import { EyebrowPill } from "@/components/EyebrowPill";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { SectionReveal } from "@/components/SectionReveal";
import { StickyNav } from "@/components/StickyNav";

export const metadata: Metadata = {
  title: "Vivid Terrace Website Alignment Summary · Akima Studio",
  robots: { index: false, follow: false },
};

const metadataItems = [
  { label: "Prepared for", value: "Vivid Terrace" },
  { label: "Prepared by", value: "Akima Studio" },
  { label: "Date", value: "08 May 2026" },
  { label: "Stage", value: "Pre-Proposal Alignment" },
];

const principleBlocks = [
  {
    title: "A showroom, not a catalogue",
    content:
      "The site should feel spacious, editorial, and premium. Dense product grids, sale-led UI, and generic Shopify patterns would work against the brand positioning.",
    Icon: GalleryVerticalEnd,
  },
  {
    title: "Product pages need to build confidence",
    content:
      "For high-ticket products, the product page should carry the sales conversation. It should include the right balance of imagery, product detail, material information, brand story, warranty, lead times, delivery expectations, and clear next steps.",
    Icon: ShieldCheck,
  },
  {
    title: "Different products need different buying paths",
    content:
      "Some products can be purchased directly. Larger or more configurable products should move toward quote request or consultation. This needs to feel intentional, not like a limitation.",
    Icon: Route,
  },
  {
    title: "Editorial content should support conversion",
    content:
      "Brand stories, buying guides, project inspiration, and complete-the-space content should not feel like a separate blog bolted onto the site. They should support the customer's research journey and help build trust.",
    Icon: BookOpen,
  },
];

const inspirationBlocks = [
  {
    eyebrow: "Reference 1",
    title: "OFYR",
    link: "https://www.ofyr.com/",
    description:
      "OFYR is a premium outdoor cooking and lifestyle brand built around the idea of bringing people together through fire, food, and shared outdoor moments.",
    images: {
      main: "/brief-alignment/vivid-terrace/inspiration-1-main.png",
      detail1: "/brief-alignment/vivid-terrace/inspiration-1-detail-1.png",
      detail2: "/brief-alignment/vivid-terrace/inspiration-1-detail-2.png",
    },
    likes: [
      "Emotional product storytelling",
      "Sculptural product presentation",
      "Premium lifestyle positioning",
    ],
    takeaways: [
      "Sell the lifestyle, not just the product",
      "Use imagery to create aspiration",
      "Present products as design pieces, not equipment",
    ],
  },
  {
    eyebrow: "Reference 2",
    title: "EXTETA",
    link: "https://www.exteta.it/en",
    description:
      "Exteta is a luxury Italian outdoor furniture company focused on refined outdoor living, craftsmanship, and architectural design.",
    images: {
      main: "/brief-alignment/vivid-terrace/inspiration-2-main.png",
      detail1: "/brief-alignment/vivid-terrace/inspiration-2-detail-1.png",
      detail2: "/brief-alignment/vivid-terrace/inspiration-2-detail-2.png",
    },
    likes: [
      "Editorial luxury presentation",
      "Sophisticated material storytelling",
      "Calm, immersive scrolling experience",
    ],
    takeaways: [
      "Blend architecture + lifestyle seamlessly",
      "Let imagery and whitespace lead",
      "Create a premium digital showroom feel",
    ],
  },
  {
    eyebrow: "Reference 3",
    title: "Polestar",
    link: "https://www.polestar.com/au/polestar-2/",
    description:
      "Polestar is a premium electric performance car brand with a strong Scandinavian design sensibility: minimal, technical, restrained, and performance-led.",
    images: {
      main: "/brief-alignment/vivid-terrace/inspiration-3-main.png",
      detail1: "/brief-alignment/vivid-terrace/inspiration-3-detail-1.png",
      detail2: "/brief-alignment/vivid-terrace/inspiration-3-detail-2.png",
    },
    likes: [
      "Story-led product experience",
      "Lifestyle + detail balance",
      "Editorial, premium feel",
    ],
    takeaways: [
      "Product pages should educate and inspire",
      "Progressive detail builds confidence",
      "Strong visual storytelling justifies premium pricing",
    ],
  },
  {
    eyebrow: "Reference 4",
    title: "Roostr",
    link: "https://www.roostr.co.uk/",
    description:
      "Roostr is a Dutch outdoor kitchen company creating modular, premium outdoor kitchens designed for year-round cooking, entertaining, and relaxed outdoor living.",
    images: {
      main: "/brief-alignment/vivid-terrace/inspiration-4-main.png",
      detail1: "/brief-alignment/vivid-terrace/inspiration-4-detail-1.png",
      detail2: "/brief-alignment/vivid-terrace/inspiration-4-detail-2.png",
    },
    likes: [
      "Modular product storytelling",
      "Clear consultation pathways",
      "Lifestyle-first positioning",
    ],
    takeaways: [
      "Make complex systems feel approachable",
      "Blend inspiration with configuration",
      "Strong showroom-style UX direction",
    ],
  },
];

const helpColumns = [
  {
    title: "Strategy & UX",
    Icon: Compass,
    items: [
      "Clarify the customer journey.",
      "Define site architecture and navigation.",
      "Map direct purchase vs quote/consultation pathways.",
      "Shape the product, brand, and editorial content structure.",
      "Identify key trust and conversion moments.",
    ],
  },
  {
    title: "Visual Design",
    Icon: Palette,
    items: [
      "Establish a premium visual direction.",
      "Design the core Shopify page templates.",
      "Create a flexible design system.",
      "Ensure the site feels elevated, restrained, and commercially clear.",
      "Design for desktop, tablet, and mobile.",
    ],
  },
  {
    title: "Build & Implementation",
    Icon: ShoppingBag,
    items: [
      "Develop the approved experience in Shopify.",
      "Set up core templates, products, collections, forms, and essential apps.",
      "Configure key commerce foundations.",
      "QA the site across devices.",
      "Support launch.",
    ],
  },
];

const nextSteps = [
  {
    title: "Confirm alignment",
    detail: "Ensure strategic direction, goals, and scope are aligned.",
  },
  {
    title: "Clarify launch requirements",
    detail:
      "Finalise product scope, integrations, functionality, and content readiness.",
  },
  {
    title: "Prepare formal proposal",
    detail:
      "Provide recommended approach, timeline, deliverables, and investment.",
  },
  {
    title: "Lock scope and timeline",
    detail: "Approve project scope and establish delivery phases.",
  },
  {
    title: "Begin strategy and design",
    detail:
      "Commence UX strategy, sitemap, wireframes, and visual direction.",
  },
];

export default function BriefAlignmentPage() {
  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Direction", href: "#initial-direction" },
    { label: "Inspiration", href: "#website-inspiration" },
    { label: "Next", href: "#next-steps" },
  ];

  return (
    <div className="brief-alignment-page theme-white min-h-screen bg-paper text-ink">
      <style>{`
        .brief-alignment-page .prose-editorial li {
          font-weight: 600;
        }
      `}</style>
      <StickyNav links={navLinks} />

      <main>
        <Container>
          <Hero />
          <BriefMetadataRow />

          <Section
            id="overview"
            eyebrow="01 — Overview"
            heading="Overview"
            body={`We've reviewed the Vivid Terrace brief and wanted to share a short alignment summary before preparing a formal proposal.

From what we understand, this project is not simply about launching an online store. The opportunity is to create a premium digital showroom for high-value outdoor living products, supporting inspiration, product research, brand storytelling, direct purchase, and quote-led enquiries.

Because the products are considered purchases, the website needs to do more than present a catalogue. It needs to help customers understand the quality, provenance, materials, lead times, service model, and next steps clearly enough to feel confident moving forward.

The experience should feel closer to a high-end architectural showroom or European design publication than a standard Shopify retail site.`}
            divider={false}
          />

          <Section
            id="what-we-understand"
            eyebrow="02 — What we understand"
            heading="What We Understand"
            body={`Vivid Terrace needs a website that feels more like a luxury showroom than a standard e-commerce store.

- Vivid Terrace sells premium outdoor living products imported from European and UK manufacturers.
- The average purchase is high-value and requires a more considered customer journey than standard e-commerce.
- The target customer is affluent, research-led, and likely to compare options carefully before making contact or purchasing.
- The site needs to support both inspiration-led browsing and serious product evaluation.
- Some products should be purchasable directly, while others likely require quote or consultation pathways.
- Product pages need to carry a significant amount of trust-building, education, and detail.
- The brand needs to differentiate from mass-market outdoor retailers and generic outdoor kitchen suppliers.
- The visual direction should feel premium, architectural, restrained, and photography-led.`}
          />

          <Section
            id="opportunity"
            eyebrow="03 — Opportunity"
            heading="The Opportunity"
            body={`The strongest opportunity is to position Vivid Terrace as the premium destination for curated European outdoor living in Australia.

A well-designed site can do more than sell products. It can help customers imagine a better outdoor space, understand why these products are worth the investment, compare options with confidence, and take the next step without needing to be pushed.

For this category, trust and aspiration need to work together. The site should be beautiful enough to create desire, but clear enough to help a serious buyer make a high-value decision.

- Create a premium digital showroom, not a generic catalogue.
- Use brand and product storytelling to justify the price point.
- Make high-ticket product research feel clear and enjoyable.
- Create strong direct-purchase and quote/consultation pathways.
- Build trust through specifications, warranty, lead times, materials, reviews, and local Australian support.
- Support future growth across brands, trade enquiries, editorial content, and product categories.`}
          />

          <Section
            id="initial-direction"
            eyebrow="04 — Initial direction"
            heading="Initial Direction"
          >
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {principleBlocks.map(({ title, content, Icon }) => (
                <div
                  key={title}
                  className="rounded-card border border-rule bg-bone-100 p-5"
                >
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-bone-200 text-ink">
                    <Icon aria-hidden className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-semibold leading-tight text-ink">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {content}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <WebsiteInspiration />
          <HowWeCouldHelp />

          <Section
            id="why-akima-studio"
            eyebrow="07 — Why us?"
            heading="Why Akima Studio"
            body={`We approach projects like this from both a strategic and experiential perspective, balancing premium brand positioning with commercial clarity.

Our focus is not simply designing a visually impressive website, but creating a digital experience that helps customers confidently move from inspiration to enquiry or purchase.

Because Vivid Terrace sits within a high-consideration category, we believe trust, storytelling, usability, and restraint all need to work together cohesively.`}
          />

          <Section
            id="key-decisions"
            eyebrow="08 — Decisions"
            heading="Key Decisions Before Proposal"
            body={`Before preparing a formal proposal, we would want to confirm a few key decisions that will materially affect scope, timeline, and investment.

- How many product categories are required for launch?
- Approximately how many products need to be uploaded or configured?
- Which products are direct purchase vs quote/consultation?
- Is product copy already written, or does it need to be created or refined?
- Are product images and brand assets ready?
- Is wishlist/save-for-later functionality required for launch?
- Is product comparison required for launch?
- Do any products need custom configuration logic?
- How should freight and delivery estimates be handled?
- Is trade functionality required, or simply a trade enquiry pathway?
- Are there existing systems that need to integrate with Shopify?
- Who will manage ongoing product and content updates after launch?`}
          />

          <div className="pt-6 md:pt-8">
            <BriefNextSteps />
          </div>

          <Footer />
        </Container>
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="pt-40 pb-16 md:pt-56 md:pb-24">
      <div className="flex max-w-5xl flex-col gap-8 md:gap-10">
        <EyebrowPill>Website Alignment Summary</EyebrowPill>
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-extrabold leading-none tracking-[-0.03em] text-ink md:text-8xl">
            Vivid Terrace Website Alignment Summary
          </h1>
        </div>
      </div>
    </section>
  );
}

function BriefMetadataRow() {
  return (
    <div className="border-y border-rule py-8 md:py-10">
      <dl className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
        {metadataItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
              {item.label}
            </dt>
            <dd className="text-base font-medium text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function WebsiteInspiration() {
  return (
    <SectionReveal>
      <section
        id="website-inspiration"
        className="border-t border-rule py-16 md:py-24"
      >
        <div className="mb-12 flex max-w-3xl flex-col gap-4">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            05 — References
          </div>
          <h2 className="text-3xl font-bold leading-none tracking-[-0.02em] text-ink md:text-5xl">
            Website Inspiration
          </h2>
          <p className="text-base leading-7 text-text-secondary md:text-lg">
            These references have been selected to help frame the kind of
            digital experience Vivid Terrace could create as a premium outdoor
            living brand.
          </p>
          <p className="text-base leading-7 text-text-secondary md:text-lg">
            The aim is to identify patterns that feel relevant: strong lifestyle
            imagery, considered layouts, clear product storytelling, and a
            customer journey that supports both inspiration and decision-making.
          </p>
        </div>

        <div className="flex flex-col gap-14 md:gap-20">
          {inspirationBlocks.map((inspiration) => (
            <article key={inspiration.title} className="pt-10">
              <div className="mb-7 max-w-2xl">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                  {inspiration.eyebrow}
                </div>
                <h3 className="text-[32px] font-bold leading-tight text-ink">
                  {inspiration.title}
                </h3>
                {inspiration.link ? (
                  <a
                    href={inspiration.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ember underline decoration-ember/35 underline-offset-4 transition-colors hover:text-akima-orange-700 hover:decoration-akima-orange-700"
                  >
                    <Link2 aria-hidden className="h-4 w-4" strokeWidth={1.8} />
                    {inspiration.link.replace(/^https?:\/\//, "")}
                  </a>
                ) : null}
                <p className="mt-3 text-base leading-7 text-text-secondary">
                  {inspiration.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-5">
                <InspirationImage
                  alt={`${inspiration.title} main reference`}
                  className="h-[620px]"
                  label="Large image"
                  src={inspiration.images?.main}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                  <InspirationImage
                    alt={`${inspiration.title} detail reference 1`}
                    className="h-[300px]"
                    label="Detail image"
                    src={inspiration.images?.detail1}
                  />
                  <InspirationImage
                    alt={`${inspiration.title} detail reference 2`}
                    className="h-[300px]"
                    label="Detail image"
                    src={inspiration.images?.detail2}
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
                <TextColumn title="What we like" items={inspiration.likes} />
                <TextColumn
                  title="Key takeaways for Vivid Terrace"
                  items={inspiration.takeaways}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}

function HowWeCouldHelp() {
  return (
    <SectionReveal>
      <section id="how-we-could-help" className="border-t border-rule py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-4 md:max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            06 — Support
          </div>
          <h2 className="text-3xl font-bold leading-none tracking-[-0.02em] text-ink md:text-5xl">
            How We Could Help
          </h2>
          <p className="text-base leading-7 text-text-secondary md:text-lg">
            We would likely support the project across three connected areas:
            strategy and UX, premium visual design, and Shopify development.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {helpColumns.map((column) => (
            <div
              key={column.title}
              className="rounded-card border border-rule bg-bone-100 p-8 shadow-[0_18px_70px_rgba(17,17,17,0.05)] md:p-10"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-bone-200 text-ink">
                <column.Icon aria-hidden className="h-6 w-6" strokeWidth={1.6} />
              </div>
              <h3 className="text-2xl font-bold leading-tight tracking-[-0.02em] text-ink">
                {column.title}
              </h3>
              <ul className="mt-8 flex flex-col gap-4">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-x-3.5 text-base font-medium leading-7 text-ink"
                  >
                    <span
                      aria-hidden
                      className="block h-px w-3 translate-y-[-0.22em] bg-ink"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}

function BriefNextSteps() {
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
              A clean path from alignment to formal proposal, with the key
              decisions visible before scope is locked.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-0">
            {nextSteps.map((step, index) => (
              <li key={step.title} className="relative md:pr-6">
                <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 md:block">
                  <div className="relative flex justify-center md:mb-7 md:block">
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-9 h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-paper/20 md:left-0 md:top-1/2 md:h-px md:w-full md:translate-x-0"
                    />
                    {index === nextSteps.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-9 h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-ink md:left-auto md:right-0 md:top-1/2 md:h-px md:w-full md:translate-x-0"
                      />
                    ) : null}
                    <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-paper/35 bg-ink shadow-[0_0_0_8px_var(--color-ink)]">
                      <span className="h-2.5 w-2.5 rounded-full bg-ember" />
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 md:min-h-[9rem] md:pr-3">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-paper/42">
                      {String(index + 1).padStart(2, "0")}
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
        </div>
      </section>
    </SectionReveal>
  );
}

function InspirationImage({
  alt,
  className,
  label,
  src,
}: {
  alt: string;
  className: string;
  label: string;
  src?: string;
}) {
  return (
    <div
      className={`overflow-hidden border border-bone-200 bg-[#d4d4d8] ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
          {label}
        </div>
      )}
    </div>
  );
}

function TextColumn({
  body,
  title,
  items,
}: {
  body?: string;
  title: string;
  items?: string[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
        {title}
      </h4>
      {items ? (
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item}
              className="grid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-x-3.5 text-base font-medium leading-7 text-ink"
            >
              <span
                aria-hidden
                className="block h-px w-3 translate-y-[-0.22em] bg-ink"
              />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-base leading-7 text-text-secondary">
          {body ?? "Placeholder content to be added."}
        </p>
      )}
    </div>
  );
}
