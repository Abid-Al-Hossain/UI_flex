"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import type { FlexState } from "../types";

type Props = { state: FlexState; update: <K extends keyof FlexState>(key: K, value: FlexState[K]) => void };

export default function SurfaceSection({ state, update }: Props) {
  return <SectionCard title="Surface" subtitle="Surface controls for native layout/page-structure generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No separate native controls are needed for this section in this component.</div></SectionCard>;
}
