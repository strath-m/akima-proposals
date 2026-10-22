import type { ComponentType } from "react";
import type { Proposal } from "@/lib/types";
import { OctPage } from "@/components/oct/OctPage";
import { OctLightPage } from "@/components/oct-light/OctLightPage";
import { NovPage } from "@/components/nov/NovPage";

// Every template a proposal can pick with `template:` in its frontmatter.
// To add one, make a new folder in components/ and add a line here. Never
// change an existing template: live proposals use them (see locked.json).
export const templates: Record<string, ComponentType<{ proposal: Proposal }>> = {
  oct: OctPage,
  light: OctLightPage,
  nov: NovPage,
};
