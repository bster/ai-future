import { useState } from "react";
import { c, font, s } from "../design.js";
import { FUTURES } from "../data/futures.js";
import { Ref, DQ, TryIt, SectionBadge } from "../components/Shared.jsx";

export default function FuturesPage() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <SectionBadge id="futures" />
      <h2 style={s.h2}>Five Futures</h2>
      <p style={s.p}>The preceding sections describe AI as it currently is. This one is different. These are not predictions — they are hypotheses about what AI might become, each framed as a claim about human nature as much as a technical forecast. They are worth examining not to determine which is correct, but to see what each one implies about what you believe humanity is for.</p>
      <p style={s.p}>For each scenario, there are two questions worth sitting with. The first assumes the most optimistic reading of that future. The second assumes the most pessimistic. Neither has a right answer. But you cannot answer either without committing to a view about what matters.</p>
      <div style={{ marginTop: "28px" }}>
        {FUTURES.map((f, i) => (
          <div key={i} style={{ marginBottom: "10px", border: `1px solid ${c.hairline}`, borderRadius: "10px", background: open === i ? c.canvasSoft : c.canvas, overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", fontFamily: font, flexWrap: "wrap" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: f.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 500, fontSize: "15px", color: c.ink, letterSpacing: "-0.2px" }}>{f.name}</span>
                <span style={{ fontSize: "13px", color: c.inkMute, marginLeft: "10px", fontStyle: "italic" }}>{f.tagline}</span>
              </div>
              <span style={{ color: c.primary, fontSize: "18px" }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 18px 20px 38px" }}>
                <p style={{ ...s.p, fontSize: "15px" }}>{f.description}</p>
                <p style={{ ...s.p, fontSize: "15px" }}>{f.humanQuestion}</p>
                <div style={{ borderLeft: `3px solid ${f.color}`, paddingLeft: "16px", margin: "16px 0" }}>
                  <p style={{ ...s.p, fontSize: "14px", fontStyle: "italic", marginBottom: "10px" }}><strong style={{ fontStyle: "normal", color: c.ink }}>If the optimists are right:</strong> {f.optimistQ}</p>
                  <p style={{ ...s.p, fontSize: "14px", fontStyle: "italic", marginBottom: 0 }}><strong style={{ fontStyle: "normal", color: c.ink }}>If the pessimists are right:</strong> {f.pessimistQ}</p>
                </div>
                {f.links.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>{f.links.map((l, j) => <Ref key={j} label={l.label} url={l.url} />)}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ ...s.box, marginTop: "36px" }}>
        <div style={{ position: "absolute", top: "-10px", left: "16px", background: c.canvas, padding: "0 8px", fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: c.inkMute, fontWeight: 400 }}>The Central Questions</div>
        <p style={{ ...s.p, marginBottom: "10px" }}>If the most optimistic vision comes true — does that vindicate or hollow out the things you value most?</p>
        <p style={{ margin: 0, color: c.inkSec }}>If the most pessimistic vision comes true — what does that say about what we were?</p>
      </div>
      <DQ questions={["Which of these five scenarios do you find most plausible? Which do you find most threatening — not to civilization, but to the specific things you personally care about?", "The Abundance scenario promises to solve material suffering. If it succeeds, does that vindicate or undermine the tradition of thought that found meaning partly through confronting limitation?", "The Displacement scenario doesn't require AI to be superintelligent — just good enough and cheap enough. Are we already inside it?", "The Augmentation scenario sounds benign. What is it about unaided human cognition that you'd want to protect — and is that protection realistic, or is it nostalgia?", "In an Augmentation future where AI-assisted creativity becomes the norm, does the resulting work become more beautiful, less beautiful, or does the question no longer make sense?", "Each scenario implies a different answer to the question 'what are humans for?' Which answer do you find most defensible? What does that reveal about your values?", "If you had to design an education system for the most likely future, what would it teach? What would it stop teaching?"]} />
      <TryIt prompts={["Run the personal simulation. Tell an AI your name, where you're from, what you study, what you care most about, and what you plan to do. Ask it to simulate what your life might look like in 2040 under each of the five futures — Abundance, Displacement, Concentration, Augmentation, Stagnation. Ask for specificity, not generality.", "Ask an AI: 'Which of the five futures do you think is most likely — and which would you prefer? I want two separate answers.' Notice whether it can distinguish between prediction and preference, and what that distinction reveals.", "Ask an AI to argue that the future you most hope for is actually the one most threatening to the specific things you care about. See if it can construct that argument convincingly. If it can, sit with that."]} />
    </div>
  );
}
