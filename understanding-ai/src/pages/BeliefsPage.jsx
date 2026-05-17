import { useState } from "react";
import { c, font, s } from "../design.js";
import { CAMPS } from "../data/camps.js";
import { Ref, Video, DQ, TryIt, SectionBadge } from "../components/Shared.jsx";

export default function BeliefsPage() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <SectionBadge id="beliefs" />
      <h2 style={s.h2}>The Believers</h2>
      <p style={s.p}>The entire debate hinges on one unresolved question: whether current AI architectures are fundamentally limited, or whether scale and refinement will eventually produce something qualitatively different. Nobody knows. What follows from that uncertainty are not conclusions but belief systems — and they deserve to be examined as such.</p>
      <p style={s.p}>The right question to ask about any of these camps isn't only what they predict but what they <em>need</em> to be true, and why. Each one has a structural argument worth taking seriously and a structural blind spot worth naming.</p>
      <div style={{ marginTop: "24px" }}>
        {CAMPS.map((camp, i) => (
          <div key={i} style={{ marginBottom: "8px", border: `1px solid ${c.hairline}`, borderRadius: "10px", background: open === i ? c.canvasSoft : c.canvas, overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontFamily: font, flexWrap: "wrap" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: camp.color, flexShrink: 0 }} />
              <span style={{ fontWeight: 500, fontSize: "15px", color: c.ink, letterSpacing: "-0.2px" }}>{camp.name}</span>
              <span style={{ fontSize: "13px", color: c.inkMute, flex: 1, minWidth: "120px" }}>{camp.people}</span>
              <span style={{ color: c.primary, fontSize: "18px", marginLeft: "auto" }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 18px 18px 38px" }}>
                {camp.belief.split("\n\n").map((para, pi) => <p key={pi} style={{ ...s.p, fontSize: "15px" }}>{para}</p>)}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>{camp.links.map((l, j) => <Ref key={j} label={l.label} url={l.url} />)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Video id="2Nn0-kAE5c0" caption="Ezra Klein interviews Eliezer Yudkowsky — the clearest accessible presentation of the doomer case, from its most committed advocate." />
      <h3 style={s.h3}>Why Your Position Here Matters for Everything That Follows</h3>
      <p style={s.p}>These camps aren't just competing forecasts about technology. They are competing answers to a prior question: what kind of thing is human reasoning, and can a machine do it? Your intuition about that question — however unexamined — will shape how you read everything that comes next in this guide.</p>
      <p style={s.p}>The hard questions about consciousness and the mirror problem look different depending on which camp you find credible. If you're a Deflationist, the mirror problem is already solved: AI is sophisticated autocomplete, and the question of machine consciousness is a category error. If you're a Utopian, an Accelerationist, or a Doomer, the mirror problem is urgent and unresolved — and the answer has civilizational stakes. The Safety Institutionalist and Pragmatist positions imply we have time. The Emergentist position may be the most uncomfortable: capabilities we didn't design keep appearing, which means we genuinely don't know what we're dealing with.</p>
      <p style={s.p}>For educators, the stakes are direct. If the Deflationists are right, liberal arts education needs modest adjustment — AI is a powerful tool, and the work of interpretation and judgment remains safely human. If the Utopians or Doomers are right, the question of what education is for becomes urgent and genuinely open. If the Pragmatists or Safety Institutionalists are right, we have time to adapt thoughtfully. If the Emergentists are right, we're adapting in real time without knowing what we're adapting to.</p>
      <p style={s.p}>For students, the question is personal: which world do you think you're going to inhabit? The answer you give — even provisionally, even uncertainly — is the most important variable in deciding what to do with your education, what skills to cultivate, and what kind of reasoning to practice. The goal isn't to pick the right camp. It's to reason through each one seriously enough that your position is actually yours.</p>
      <DQ questions={["Which of these camps best describes your current intuition — and what would it take to change your mind?", "Which position most resembles a religious belief in its structure — not its content? What makes something 'religious' in this sense, and does it disqualify the position?", "Anthropic's founders say they may be building something dangerous and are building it anyway. Is that a defensible ethical position? What moral framework supports it?", "The Accelerationists and the Safety Institutionalists agree AI is coming and disagree on whether constraints are possible. Which view of human institutional capacity does each one assume?", "If the Emergentists are right — if capabilities keep appearing that nobody predicted — what does that imply for how we should make decisions about AI development?", "Pick the camp you find least credible. Make the strongest possible case for it. What does that exercise reveal?", "If you had to assign a probability to AGI in your lifetime, what would it be — and what does that number actually commit you to believing?"]} />
      <TryIt prompts={["Ask an AI: 'Which of these camps — Utopians, Accelerationists, Doomers, Safety Institutionalists, Deflationists, Pragmatists, Emergentists — do you think is most likely correct? I want your honest assessment, not a balanced summary.' Push it when it hedges. Note whether it can actually take a position.", "Describe your own views on AI to an AI: what you believe it can do, what you think it can't, and whether you think AGI is likely. Ask it to identify which camp your views most closely resemble — and what assumptions you'd have to hold for that position to be internally coherent.", "Pick the camp you find least credible. Ask an AI to make the strongest possible case for it — the best empirical evidence, the strongest philosophical arguments, the most defensible version of the position. Then ask it to attack that case. Notice where it lands when it's not forced to pick a side."]} />
    </div>
  );
}
