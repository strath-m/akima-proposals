import type { Proposal } from "@/lib/types";
import { OctPage } from "@/components/oct/OctPage";
import "@/components/oct-light/light.css";

// The November template: the light October theme with no header buttons, a
// "See pricing" link in the hero, FAQ accordions and no mobile sticky bar.
// Served at /<slug> by `template: nov`.
export function NovPage({ proposal }: { proposal: Proposal }) {
  return (
    <div className="oct-light">
      <OctPage proposal={proposal} variant="nov" />
    </div>
  );
}
