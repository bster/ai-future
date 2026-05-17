// Design tokens — Stripe-inspired chrome, publication-inspired reading.
// Body text uses Newsreader (a serif designed for long-form reading).
// UI chrome — nav, pills, labels, buttons, headings — stays Inter.
export const c = {
  primary:    "#533afd",
  primaryDeep:"#4434d4",
  primaryPress:"#2e2b8c",
  primaryBg:  "#ebe9fe",
  dark:       "#1c1e54",
  ink:        "#1a1a1f",   // warmer near-black for body and headings
  inkSec:     "#2a2a33",   // body text — warmer than the old blue-grey
  inkMute:    "#6e6e7a",   // muted (labels, captions)
  canvas:     "#fbfaf7",   // warm off-white reading background
  canvasSoft: "#f3efe8",   // warm soft for callouts and dropdowns
  hairline:   "#e6e0d4",   // warm hairline
  ruby:       "#ea2261",
  magenta:    "#f96bee",
  cream:      "#f5e9d4",
};

// Inter for UI chrome and headings — tight, declarative, modern.
export const font = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";

// Newsreader for body — generous proportions, beautiful italics, optimized for reading.
export const serif = "'Newsreader', 'Source Serif Pro', Charter, 'Iowan Old Style', 'Sitka Text', Cambria, Georgia, serif";

export const s = {
  page:    { minHeight: "100vh", background: c.canvas, color: c.inkSec, fontFamily: serif, fontSize: "19px", lineHeight: 1.65, fontWeight: 400 },
  content: { maxWidth: "680px", margin: "0 auto", padding: "clamp(48px,7vw,80px) clamp(22px,5vw,40px) 120px" },

  // UI labels (section badges, callout corners)
  pill:    { display: "inline-flex", alignItems: "center", background: c.primaryBg, color: c.primaryDeep, fontFamily: font, fontSize: "11px", fontWeight: 500, letterSpacing: "0.4px", textTransform: "uppercase", padding: "4px 11px", borderRadius: "9999px" },

  // Headings — Inter, declarative
  h2:      { fontFamily: font, fontSize: "clamp(28px,5vw,40px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.5px", color: c.ink, marginBottom: "32px" },
  h3:      { fontFamily: font, fontSize: "19px", fontWeight: 600, letterSpacing: "-0.1px", color: c.ink, margin: "44px 0 14px" },

  // Body paragraph — serif, generous, warm
  p:       { fontFamily: serif, fontSize: "19px", lineHeight: 1.7, fontWeight: 400, color: c.inkSec, marginBottom: "20px", letterSpacing: 0 },

  // Pull quote — larger serif italic, no background card
  pq:      { borderLeft: `3px solid ${c.primary}`, margin: "40px 0", padding: "6px 0 6px 28px", fontFamily: serif, fontSize: "clamp(21px,3vw,26px)", fontStyle: "italic", fontWeight: 400, color: c.ink, lineHeight: 1.4, letterSpacing: 0 },

  // Source notes — quiet sidebar feel rather than UI card
  note:    { borderLeft: `2px solid ${c.hairline}`, padding: "6px 0 6px 18px", margin: "28px 0", fontFamily: font, fontSize: "13px", color: c.inkMute, lineHeight: 1.6, letterSpacing: 0 },
  noteLabel:{ fontWeight: 600, fontSize: "11px", letterSpacing: "0.4px", textTransform: "uppercase", color: c.ink, marginRight: "10px" },

  // Bordered callout for central arguments
  box:     { border: `1px solid ${c.hairline}`, borderRadius: "4px", padding: "24px 28px", margin: "36px 0", position: "relative", fontFamily: serif, fontSize: "18px", fontWeight: 400, lineHeight: 1.6, color: c.ink, background: "rgba(255,255,255,0.55)" },

  // Discussion questions — kept dark for visual rhythm, but serif inside
  dq:      { background: c.dark, color: "#fff", padding: "32px 36px", marginTop: "56px", borderRadius: "6px" },
  dqLabel: { fontFamily: font, fontSize: "11px", letterSpacing: "0.4px", textTransform: "uppercase", color: "#b9b9f9", marginBottom: "20px", fontWeight: 600 },
  dqItem:  { padding: "13px 0", fontFamily: serif, fontSize: "17px", lineHeight: 1.55, color: "#eae8f5" },

  // Inline reference links
  ref:     { color: c.primary, fontFamily: font, fontSize: "13px", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px", letterSpacing: 0 },

  // Bulleted list items
  li:      { padding: "5px 0 5px 22px", position: "relative", marginBottom: "4px", fontFamily: serif, fontSize: "18px", lineHeight: 1.55, color: c.inkSec },

  // Prev/next arrows
  arrows:  { display: "flex", gap: "12px", marginTop: "64px", paddingTop: "32px", borderTop: `1px solid ${c.hairline}` },
};
