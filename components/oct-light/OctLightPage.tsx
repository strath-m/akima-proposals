import type { Proposal } from "@/lib/types";
import { OctPage } from "@/components/oct/OctPage";
import "./light.css";

// The October template, unchanged, with the light theme applied.
export function OctLightPage({ proposal }: { proposal: Proposal }) {
  return (
    <div className="oct-light">
      <OctPage proposal={proposal} />
    </div>
  );
}
