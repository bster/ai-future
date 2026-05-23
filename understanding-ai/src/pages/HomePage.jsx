import { c, font, serif, s } from "../design.js";
import { NAV_GROUPS } from "../data/nav.js";

export default function HomePage({ onNav }) {
  let sectionNum = 0;
  return (
    <div style={{ background: c.canvas }}>
      {/* Hero — warm-tinted gradient mesh to match the editorial palette */}
      <div style={{
        background: `
          radial-gradient(ellipse 100% 80% at -5% 55%, rgba(245,233,212,0.95) 0%, transparent 52%),
          radial-gradient(ellipse 75% 65% at 98% 8%,  rgba(195,195,250,0.7) 0%, transparent 48%),
          radial-gradient(ellipse 60% 50% at 68% 98%, rgba(249,107,238,0.18) 0%, transparent 42%),
          radial-gradient(ellipse 50% 45% at 22% 4%,  rgba(83,58,253,0.14)   0%, transparent 44%),
          radial-gradient(ellipse 40% 30% at 88% 52%, rgba(234,34,97,0.08)    0%, transparent 38%),
          #f5f1e8
        `,
        padding: "clamp(72px,11vw,128px) clamp(20px,5vw,60px) clamp(72px,10vw,104px)",
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ ...s.pill, marginBottom: "32px" }}>A Framework for Liberal Arts Educators</div>
          <h1 style={{ fontFamily: font, fontSize: "clamp(36px,6.5vw,58px)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-1.2px", color: c.ink, marginBottom: "24px" }}>
            Understanding AI
          </h1>
          <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(20px,3vw,26px)", color: c.ink, marginBottom: "32px", maxWidth: "560px", lineHeight: 1.35, fontWeight: 400, letterSpacing: 0 }}>
            What it is, what it isn't, and what no one knows.
          </p>
          <p style={{ fontFamily: serif, fontSize: "clamp(17px,2.3vw,19px)", color: c.inkSec, marginBottom: "40px", maxWidth: "540px", lineHeight: 1.6, fontWeight: 400 }}>
            Ten sections covering what AI is, what it cannot do, and what its rise means for work, education, and society. Each section includes primary sources, discussion questions, and prompts to test the arguments directly.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => onNav("what")} style={{ background: c.primary, color: "#fff", border: "none", padding: "13px 28px", borderRadius: "9999px", fontFamily: font, fontSize: "15px", fontWeight: 500, cursor: "pointer", letterSpacing: 0 }}>
              Begin Reading →
            </button>
            <button onClick={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "rgba(255,255,255,0.7)", color: c.ink, border: `1px solid ${c.hairline}`, padding: "13px 28px", borderRadius: "9999px", fontFamily: font, fontSize: "15px", fontWeight: 500, cursor: "pointer", letterSpacing: 0, backdropFilter: "blur(8px)" }}>
              See Overview
            </button>
          </div>
        </div>
      </div>

      {/* Part overview */}
      <div id="overview" style={{ maxWidth: "960px", margin: "0 auto", padding: "clamp(56px,7vw,88px) clamp(22px,5vw,40px) 110px" }}>
        <h2 style={{ fontFamily: font, fontSize: "clamp(22px,3vw,28px)", fontWeight: 500, letterSpacing: "-0.4px", color: c.ink, marginBottom: "10px", border: "none", paddingBottom: 0 }}>What you'll cover</h2>
        <p style={{ fontFamily: serif, color: c.inkMute, fontSize: "17px", marginBottom: "40px", lineHeight: 1.55 }}>
          Ten sections across five parts. Read in order — or jump to any section directly.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {NAV_GROUPS.map((g, gi) => (
            <div key={gi} style={{ border: `1px solid ${c.hairline}`, borderRadius: "8px", padding: "26px 24px", background: "#fff", boxShadow: "0 1px 2px rgba(26,26,31,0.04)" }}>
              <div style={{ fontFamily: font, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4px", color: c.inkMute, fontWeight: 600, marginBottom: "10px" }}>Part {gi + 1}</div>
              <div style={{ fontFamily: font, fontSize: "19px", fontWeight: 500, letterSpacing: "-0.3px", color: c.ink, marginBottom: "18px" }}>{g.label}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {g.sections.map(sec => {
                  sectionNum++;
                  const n = sectionNum;
                  return (
                    <button key={sec.id} onClick={() => onNav(sec.id)} style={{ background: "none", border: "none", textAlign: "left", fontFamily: serif, fontSize: "16px", color: c.primary, cursor: "pointer", padding: "6px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontFamily: font, width: "22px", height: "22px", borderRadius: "9999px", border: `1px solid ${c.hairline}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 600, color: c.inkMute, flexShrink: 0, fontFeatureSettings: '"tnum"' }}>{n}</span>
                      {sec.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{ border: `1px solid ${c.primary}`, borderRadius: "8px", padding: "26px 24px", background: c.primaryBg }}>
            <div style={{ fontFamily: font, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4px", color: c.primaryDeep, fontWeight: 600, marginBottom: "10px" }}>After the guide</div>
            <div style={{ fontFamily: font, fontSize: "19px", fontWeight: 500, letterSpacing: "-0.3px", color: c.dark, marginBottom: "14px" }}>Try It Yourself</div>
            <p style={{ fontFamily: serif, fontSize: "15px", color: c.inkSec, marginBottom: "20px", lineHeight: 1.55 }}>Four AI apps with prompts designed to test the claims made throughout the guide.</p>
            <button onClick={() => onNav("explore")} style={{ background: c.primary, color: "#fff", border: "none", padding: "10px 22px", borderRadius: "9999px", fontFamily: font, fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
              Explore AI →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
