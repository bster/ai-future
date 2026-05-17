import { useState, useEffect } from "react";
import { c, font, s } from "../design.js";
import { SECTION_META, TOTAL, NAV_GROUPS, ALL_SECTIONS } from "../data/nav.js";

export function useIsMobile() {
  const [mobile, setMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 680 : false);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 680);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

export function Ref({ label, url }) {
  return <a href={url} target="_blank" rel="noopener noreferrer" style={s.ref}>{label} ↗</a>;
}

export function Video({ id, caption }) {
  return (
    <div style={{ margin: "32px 0" }}>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000", borderRadius: "12px", overflow: "hidden" }}>
        <iframe src={`https://www.youtube.com/embed/${id}`} title={caption} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
      </div>
      {caption && <div style={{ fontSize: "13px", color: c.inkMute, marginTop: "10px", letterSpacing: "-0.1px" }}>{caption}</div>}
    </div>
  );
}

export function Li({ children }) {
  return (
    <li style={s.li}>
      <span style={{ position: "absolute", left: 0, color: c.primary }}>–</span>
      {children}
    </li>
  );
}

export function DQ({ questions }) {
  return (
    <div style={s.dq}>
      <div style={s.dqLabel}>Discussion Questions</div>
      {questions.map((q, i) => (
        <div key={i} style={{ ...s.dqItem, borderBottom: i < questions.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
          {i + 1}. {q}
        </div>
      ))}
    </div>
  );
}

export function TryIt({ prompts }) {
  return (
    <div style={{ marginTop: "20px", padding: "20px 20px 16px", background: c.primaryBg, borderRadius: "12px", border: `1px solid rgba(83,58,253,0.15)` }}>
      <div style={{ fontSize: "11px", letterSpacing: "0.08px", textTransform: "uppercase", color: c.primary, fontWeight: 500, marginBottom: "14px" }}>Try it with an AI</div>
      {prompts.map((p, i) => (
        <div key={i} style={{ marginBottom: i < prompts.length - 1 ? "12px" : 0, paddingBottom: i < prompts.length - 1 ? "12px" : 0, borderBottom: i < prompts.length - 1 ? `1px solid rgba(83,58,253,0.12)` : "none" }}>
          <p style={{ fontFamily: font, fontSize: "14px", fontStyle: "italic", color: c.inkSec, margin: 0, lineHeight: 1.65, letterSpacing: "-0.1px" }}>"{p}"</p>
        </div>
      ))}
    </div>
  );
}

export function SectionBadge({ id }) {
  const meta = SECTION_META[id];
  if (!meta) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
      <span style={s.pill}>{meta.part}</span>
      <span style={{ fontSize: "13px", color: c.inkMute, letterSpacing: "-0.1px" }}>{meta.num} of {TOTAL}</span>
    </div>
  );
}

export function ProgressBar({ id }) {
  const meta = SECTION_META[id];
  if (!meta) return null;
  return (
    <div style={{ height: "2px", background: c.hairline }}>
      <div style={{ height: "100%", width: `${(meta.num / TOTAL) * 100}%`, background: c.primary, transition: "width 0.3s ease" }} />
    </div>
  );
}

export function Arrows({ current, onNav }) {
  const flat = ALL_SECTIONS.filter(x => x.id !== "home");
  const idx = flat.findIndex(x => x.id === current);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;
  const label = id => { for (const g of NAV_GROUPS) { const f = g.sections.find(x => x.id === id); if (f) return f.label; } return id === "explore" ? "Explore AI" : id; };
  const base = { border: "none", padding: "11px 22px", fontFamily: font, fontSize: "14px", fontWeight: 400, cursor: "pointer", flex: 1, borderRadius: "9999px", letterSpacing: "-0.1px" };
  return (
    <div style={s.arrows}>
      {prev
        ? <button style={{ ...base, background: c.canvasSoft, color: c.ink, border: `1px solid ${c.hairline}`, textAlign: "left" }} onClick={() => onNav(prev.id)}>← {label(prev.id)}</button>
        : <div style={{ flex: 1 }} />}
      {next
        ? <button style={{ ...base, background: c.primary, color: "#fff", textAlign: "right" }} onClick={() => onNav(next.id)}>{label(next.id)} →</button>
        : <div style={{ flex: 1 }} />}
    </div>
  );
}
