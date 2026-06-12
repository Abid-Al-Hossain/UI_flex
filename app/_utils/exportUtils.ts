import type { FlexState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: FlexState, fileName = "flex") : ExportPayload {
  return { fileName: `${fileName || "flex"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: FlexState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
const flexAlign = (value) => value === "start" ? "flex-start" : value === "end" ? "flex-end" : value;
const flexJustify = (value) => value === "start" ? "flex-start" : value === "end" ? "flex-end" : value;

export default function FlexComponent() {
  const Element = state.element === "hr" ? "div" : state.element;
  const role = ["presentation", "group", "region"].includes(state.role) ? state.role : undefined;
  const items = Array.from({ length: state.itemCount }, (_, index) => index + 1);
  const style = {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    margin: state.margin,
    borderRadius: state.radius,
    border: state.borderWidth + "px solid " + state.border,
    boxShadow: "0 " + Math.round(state.shadow / 3) + "px " + state.shadow + "px rgba(0,0,0,.28)",
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    transition: state.motion ? "gap 0.2s ease, background 0.2s ease" : "none"
  };

  return (
    <Element id={state.id} role={role} aria-label={state.landmarkLabel || undefined} tabIndex={state.tabIndex} style={style}>
      <div style={{ display: "grid", gap: Math.max(8, state.gap / 2), marginBottom: state.gap }}>
        <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </div>
      <div style={{ display: "flex", flexDirection: state.direction, flexWrap: state.wrap, justifyContent: flexJustify(state.justify), alignItems: flexAlign(state.align), gap: state.gap }}>
        {items.map((item) => (
          <div key={item} style={{ minWidth: 82, minHeight: 56, display: "grid", placeItems: "center", flex: state.wrap === "nowrap" ? "0 0 auto" : "1 1 96px", borderRadius: Math.max(10, state.radius / 2), border: "1px solid " + state.border, background: "rgba(255,255,255,.08)", color: state.foreground }}>
            Item {item}
          </div>
        ))}
      </div>
    </Element>
  );
}
`;
}
