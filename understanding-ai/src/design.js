// Design tokens — Stripe-inspired (see DESIGN.md)
export const c = {
  primary:    "#533afd",
  primaryDeep:"#4434d4",
  primaryPress:"#2e2b8c",
  primaryBg:  "#ebe9fe",
  dark:       "#1c1e54",
  ink:        "#0d253d",
  inkSec:     "#273951",
  inkMute:    "#64748d",
  canvas:     "#ffffff",
  canvasSoft: "#f6f9fc",
  hairline:   "#e3e8ee",
  ruby:       "#ea2261",
  magenta:    "#f96bee",
  cream:      "#f5e9d4",
};

export const font = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";

export const s = {
  page:    { minHeight: "100vh", background: c.canvas, color: c.ink, fontFamily: font, fontSize: "16px", lineHeight: "1.7", fontWeight: 300 },
  content: { maxWidth: "720px", margin: "0 auto", padding: "clamp(40px,7vw,72px) clamp(20px,5vw,40px) 120px" },
  pill:    { display: "inline-flex", alignItems: "center", background: c.primaryBg, color: c.primaryDeep, fontSize: "11px", fontWeight: 400, letterSpacing: "0.1px", padding: "3px 10px", borderRadius: "9999px" },
  h2:      { fontFamily: font, fontSize: "clamp(22px,4vw,32px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.64px", color: c.ink, marginBottom: "24px", paddingBottom: "18px", borderBottom: `1px solid ${c.hairline}` },
  h3:      { fontFamily: font, fontSize: "17px", fontWeight: 500, letterSpacing: "-0.2px", color: c.ink, margin: "36px 0 10px" },
  p:       { marginBottom: "16px", color: c.inkSec },
  pq:      { borderLeft: `3px solid ${c.primary}`, margin: "32px 0", padding: "18px 24px", background: c.canvasSoft, fontFamily: font, fontSize: "clamp(16px,2.5vw,18px)", fontWeight: 300, letterSpacing: "-0.2px", color: c.ink, lineHeight: 1.55, borderRadius: "0 8px 8px 0" },
  note:    { background: c.canvasSoft, border: `1px solid ${c.hairline}`, borderRadius: "8px", padding: "12px 16px", margin: "20px 0", fontSize: "14px", color: c.inkMute },
  noteLabel:{ fontWeight: 500, fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: c.ink, marginRight: "8px" },
  box:     { border: `1px solid ${c.hairline}`, borderRadius: "12px", padding: "24px 28px", margin: "32px 0", position: "relative", fontSize: "clamp(15px,2.5vw,17px)", fontWeight: 300, lineHeight: 1.65, color: c.ink },
  dq:      { background: c.dark, color: "#fff", padding: "28px 32px", marginTop: "48px", borderRadius: "12px" },
  dqLabel: { fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: "#b9b9f9", marginBottom: "16px", fontWeight: 400 },
  dqItem:  { padding: "10px 0", fontSize: "15px", lineHeight: 1.65, color: "#e2e8f0" },
  ref:     { color: c.primary, fontSize: "14px", fontWeight: 400, textDecoration: "underline", textUnderlineOffset: "3px" },
  li:      { padding: "5px 0 5px 22px", position: "relative", marginBottom: "4px" },
  arrows:  { display: "flex", gap: "12px", marginTop: "56px", paddingTop: "28px", borderTop: `1px solid ${c.hairline}` },
};
