import { c, font, s } from "../design.js";
import { NAV_GROUPS } from "../data/nav.js";

export default function HomePage({ onNav }) {
  let sectionNum = 0;
  return (
    <div style={{ background: c.canvas }}>
      {/* Gradient mesh hero */}
      <div style={{
        background: `
          radial-gradient(ellipse 100% 80% at -5% 55%, rgba(245,233,212,0.9) 0%, transparent 52%),
          radial-gradient(ellipse 75% 65% at 98% 8%,  rgba(185,185,249,0.85) 0%, transparent 48%),
          radial-gradient(ellipse 60% 50% at 68% 98%, rgba(249,107,238,0.22) 0%, transparent 42%),
          radial-gradient(ellipse 50% 45% at 22% 4%,  rgba(83,58,253,0.18)   0%, transparent 44%),
          radial-gradient(ellipse 40% 30% at 88% 52%, rgba(234,34,97,0.1)    0%, transparent 38%),
          #eef2ff
        `,
        padding: "clamp(64px,10vw,110px) clamp(20px,5vw,60px) clamp(64px,9vw,90px)",
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ ...s.pill, marginBottom: "24px" }}>A Framework for Liberal Arts Educators</div>
          <h1 style={{ fontFamily: font, fontSize: "clamp(32px,6vw,52px)", fontWeight: 300, lineHeight: 1.06, letterSpacing: "-1.4px", color: c.ink, marginBottom: "20px" }}>
            Understanding AI:<br />
            <span style={{ color: c.primary }}>What It Is, What It Isn't,<br />and What No One Knows</span>
          </h1>
          <p style={{ fontSize: "clamp(16px,2.5vw,18px)", color: c.inkSec, marginBottom: "36px", maxWidth: "520px", lineHeight: 1.6, letterSpacing: "-0.1px" }}>
            A journey through what AI is, what it can't do, and what its rise means for humanity and society. Each section has primary source links and discussion questions.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => onNav("what")} style={{ background: c.primary, color: "#fff", border: "none", padding: "12px 26px", borderRadius: "9999px", fontFamily: font, fontSize: "15px", fontWeight: 400, cursor: "pointer", letterSpacing: "-0.1px" }}>
              Begin Reading →
            </button>
            <button onClick={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "rgba(255,255,255,0.65)", color: c.ink, border: `1px solid ${c.hairline}`, padding: "12px 26px", borderRadius: "9999px", fontFamily: font, fontSize: "15px", fontWeight: 400, cursor: "pointer", letterSpacing: "-0.1px", backdropFilter: "blur(8px)" }}>
              See Overview
            </button>
          </div>
        </div>
      </div>

      {/* Part overview */}
      <div id="overview" style={{ maxWidth: "960px", margin: "0 auto", padding: "clamp(48px,7vw,80px) clamp(20px,5vw,40px) 100px" }}>
        <h2 style={{ fontFamily: font, fontSize: "clamp(18px,3vw,22px)", fontWeight: 300, letterSpacing: "-0.4px", color: c.ink, marginBottom: "8px", border: "none", paddingBottom: 0 }}>What you'll cover</h2>
        <p style={{ color: c.inkMute, fontSize: "15px", marginBottom: "36px", letterSpacing: "-0.1px" }}>
          Ten sections across five parts. Read in order or jump to any section.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {NAV_GROUPS.map((g, gi) => (
            <div key={gi} style={{ border: `1px solid ${c.hairline}`, borderRadius: "12px", padding: "24px", background: c.canvas, boxShadow: "0 1px 3px rgba(13,37,61,0.04)" }}>
              <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1px", color: c.inkMute, fontWeight: 400, marginBottom: "8px" }}>Part {gi + 1}</div>
              <div style={{ fontFamily: font, fontSize: "17px", fontWeight: 300, letterSpacing: "-0.3px", color: c.ink, marginBottom: "16px" }}>{g.label}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {g.sections.map(sec => {
                  sectionNum++;
                  const n = sectionNum;
                  return (
                    <button key={sec.id} onClick={() => onNav(sec.id)} style={{ background: "none", border: "none", textAlign: "left", fontFamily: font, fontSize: "14px", color: c.primary, cursor: "pointer", padding: "5px 0", letterSpacing: "-0.1px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "20px", height: "20px", borderRadius: "9999px", border: `1px solid ${c.hairline}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: c.inkMute, flexShrink: 0, fontFeatureSettings: '"tnum"' }}>{n}</span>
                      {sec.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{ border: `1px solid ${c.primary}`, borderRadius: "12px", padding: "24px", background: c.primaryBg }}>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1px", color: c.primaryDeep, fontWeight: 400, marginBottom: "8px" }}>After the guide</div>
            <div style={{ fontFamily: font, fontSize: "17px", fontWeight: 300, letterSpacing: "-0.3px", color: c.dark, marginBottom: "12px" }}>Try It Yourself</div>
            <p style={{ fontSize: "14px", color: c.inkSec, marginBottom: "18px", lineHeight: 1.55 }}>Four AI apps with prompts designed to test the claims made throughout the guide.</p>
            <button onClick={() => onNav("explore")} style={{ background: c.primary, color: "#fff", border: "none", padding: "9px 20px", borderRadius: "9999px", fontFamily: font, fontSize: "14px", fontWeight: 400, cursor: "pointer", letterSpacing: "-0.1px" }}>
              Explore AI →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
