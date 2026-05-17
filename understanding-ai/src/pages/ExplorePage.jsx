import { useState } from "react";
import { c, font, s } from "../design.js";
import { EXPLORE_APPS, CLASSROOM_PROMPTS } from "../data/explore.js";

export default function ExplorePage() {
  const [tab, setTab] = useState("apps");
  return (
    <div>
      <div style={{ ...s.pill, marginBottom: "24px" }}>After the Guide</div>
      <h2 style={s.h2}>Try It Yourself</h2>
      <p style={s.p}>The best way to form a view about what AI can and cannot do is to use it seriously. Below are apps worth trying and prompts designed to push past the surface.</p>
      <div style={{ display: "flex", gap: 0, marginBottom: "28px", borderBottom: `1px solid ${c.hairline}` }}>
        {[{ id: "apps", label: "Apps" }, { id: "prompts", label: "Classroom Prompts" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", color: tab === t.id ? c.primary : c.inkMute, border: "none", borderBottom: tab === t.id ? `2px solid ${c.primary}` : "2px solid transparent", padding: "10px 20px", fontFamily: font, fontSize: "14px", fontWeight: tab === t.id ? 500 : 300, cursor: "pointer", marginBottom: "-1px", letterSpacing: "-0.1px" }}>{t.label}</button>
        ))}
      </div>
      {tab === "apps" && EXPLORE_APPS.map((app, i) => (
        <div key={i} style={{ marginBottom: "32px", paddingBottom: "28px", borderBottom: i < EXPLORE_APPS.length - 1 ? `1px solid ${c.hairline}` : "none" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
            <a href={app.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: font, fontWeight: 500, fontSize: "17px", color: c.ink, textDecoration: "none", letterSpacing: "-0.3px" }}>{app.name} ↗</a>
            <span style={{ fontSize: "12px", color: c.inkMute, background: c.canvasSoft, border: `1px solid ${c.hairline}`, padding: "2px 8px", borderRadius: "9999px" }}>{app.type}</span>
          </div>
          <p style={{ ...s.p, fontSize: "14px", marginBottom: "12px" }}><em>{app.best}</em></p>
          {app.prompts.map((p, j) => (
            <div key={j} style={{ background: c.canvasSoft, border: `1px solid ${c.hairline}`, borderRadius: "8px", padding: "11px 14px", marginBottom: "8px", fontSize: "14px", fontStyle: "italic", color: c.inkSec }}>"{p}"</div>
          ))}
        </div>
      ))}
      {tab === "prompts" && (
        <div>
          <p style={{ ...s.p, fontSize: "14px" }}>Use any app above. These prompts test the claims made throughout the guide.</p>
          {CLASSROOM_PROMPTS.map((cat, i) => (
            <div key={i} style={{ marginBottom: "36px" }}>
              <div style={{ fontFamily: font, fontWeight: 500, fontSize: "15px", letterSpacing: "-0.2px", marginBottom: "10px", color: c.ink }}>{cat.category}</div>
              {cat.note && <p style={{ fontSize: "13px", color: c.inkMute, marginBottom: "12px", lineHeight: 1.6, fontStyle: "italic" }}>{cat.note}</p>}
              {cat.prompts.map((p, j) => (
                <div key={j} style={{ background: c.canvasSoft, borderLeft: `3px solid ${c.primary}`, borderRadius: "0 8px 8px 0", padding: "11px 14px", marginBottom: "8px", fontSize: "14px", fontStyle: "italic", color: c.inkSec }}>{p}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
