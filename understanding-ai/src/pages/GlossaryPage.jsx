import { useState } from "react";
import { c, font, serif, s } from "../design.js";
import { TERMS } from "../data/glossary.js";

const LETTERS = [...new Set(TERMS.map(t => t.letter))];

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const q = query.toLowerCase();
  const matches = t => !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);

  return (
    <div>
      <div style={{ ...s.pill, marginBottom: "28px" }}>Reference</div>
      <h2 style={s.h2}>Glossary</h2>
      <p style={s.p}>Key terms from the guide, defined plainly. Use this as a reference while reading — or as a starting point for going deeper.</p>

      <input
        placeholder="Filter terms…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: "100%", boxSizing: "border-box", fontFamily: font, fontSize: "15px", color: c.ink, background: c.canvas, border: `1px solid ${c.hairline}`, borderRadius: "8px", padding: "10px 14px", outline: "none", marginBottom: "36px" }}
      />

      {LETTERS.map(letter => {
        const visible = TERMS.filter(t => t.letter === letter && matches(t));
        if (visible.length === 0) return null;
        return (
          <div key={letter}>
            <div style={{ fontFamily: font, fontSize: "13px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: c.inkMute, borderBottom: `1px solid ${c.hairline}`, paddingBottom: "8px", marginTop: "40px", marginBottom: "4px" }}>
              {letter}
            </div>
            {visible.map((t, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${c.hairline}`, padding: "16px 0" }}>
                <div style={{ fontFamily: font, fontWeight: 500, fontSize: "16px", color: c.ink, letterSpacing: "-0.2px", marginBottom: "6px" }}>
                  {t.term}
                </div>
                <div style={{ fontFamily: serif, fontSize: "17px", color: c.inkSec, lineHeight: 1.65 }}>
                  {t.definition}
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {LETTERS.every(letter => TERMS.filter(t => t.letter === letter && matches(t)).length === 0) && (
        <div style={{ fontFamily: serif, fontSize: "17px", color: c.inkMute, paddingTop: "16px" }}>
          No terms match "{query}".
        </div>
      )}
    </div>
  );
}
