"use client";

import type { CSSProperties } from "react";
import type { FlexState } from "../types";

const flexAlign = (value: FlexState["align"]) => value === "start" ? "flex-start" : value === "end" ? "flex-end" : value;
const flexJustify = (value: FlexState["justify"]) => value === "start" ? "flex-start" : value === "end" ? "flex-end" : value;

function box(state: FlexState): CSSProperties {
  return { width: state.width, minHeight: state.height, padding: state.padding, margin: state.margin, borderRadius: state.radius, border: `${state.borderWidth}px solid ${state.border}`, boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`, background: state.background, color: state.foreground, fontFamily: state.fontFamily, transition: state.motion ? "gap 0.2s ease, background 0.2s ease" : "none" };
}

export default function LivePreview({ state }: { state: FlexState }) {
  const Element = state.element === "hr" ? "div" : state.element;
  const role = state.role === "presentation" || state.role === "group" || state.role === "region" ? state.role : undefined;
  const items = Array.from({ length: state.itemCount }, (_, index) => index + 1);
  const style = box(state);
  return <Element id={state.id} role={role} aria-label={state.landmarkLabel || undefined} tabIndex={state.tabIndex} style={style}><div style={{ display: "grid", gap: Math.max(8, state.gap / 2), marginBottom: state.gap }}><h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3><p style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p></div><div style={{ display: "flex", flexDirection: state.direction, flexWrap: state.wrap, justifyContent: flexJustify(state.justify), alignItems: flexAlign(state.align), gap: state.gap }}>{items.map((item) => <div key={item} style={{ minWidth: 82, minHeight: 56, display: "grid", placeItems: "center", flex: state.wrap === "nowrap" ? "0 0 auto" : "1 1 96px", borderRadius: Math.max(10, state.radius / 2), border: `1px solid ${state.border}`, background: "rgba(255,255,255,.08)", color: state.foreground }}>Item {item}</div>)}</div></Element>;
}
