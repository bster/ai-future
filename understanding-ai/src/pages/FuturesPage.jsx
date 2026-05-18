import { useState } from "react";
import { c, s } from "../design.js";
import { FUTURES } from "../data/futures.js";
import { Ref, DQ, TryIt, SectionBadge, Accordion } from "../components/Shared.jsx";

export default function FuturesPage() {
  const [open, setOpen] = useState(null);
  const items = FUTURES.map(f => ({
    key: f.name,
    color: f.color,
    title: f.name,
    subtitle: f.tagline,
    subtitleItalic: true,
    content: (
      <>
        <p style={{ ...s.p, fontSize: "15px" }}>{f.description}</p>
        <p style={{ ...s.p, fontSize: "15px" }}>{f.humanQuestion}</p>
        <div style={{ borderLeft: `3px solid ${f.color}`, paddingLeft: "16px", margin: "16px 0" }}>
          <p style={{ ...s.p, fontSize: "14px", fontStyle: "italic", marginBottom: "10px" }}><strong style={{ fontStyle: "normal", color: c.ink }}>If the optimists are right:</strong> {f.optimistQ}</p>
          <p style={{ ...s.p, fontSize: "14px", fontStyle: "italic", marginBottom: 0 }}><strong style={{ fontStyle: "normal", color: c.ink }}>If the pessimists are right:</strong> {f.pessimistQ}</p>
        </div>
        {f.links.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
            {f.links.map((l, j) => <Ref key={j} label={l.label} url={l.url} />)}
          </div>
        )}
      </>
    ),
  }));

  return (
    <div>
      <SectionBadge id="futures" />
      <h1 style={s.h2}>Seven Futures</h1>
      <p style={s.p}>The preceding sections describe AI as it currently is. This one is different. These are not predictions — they are hypotheses about what AI might become, each framed as a claim about human nature as much as a technical forecast. Walk through them not to pick a winner, but to see what each one implies about what it means to be human.</p>
      <p style={s.p}>Section 7 (The Mirror Problem) takes up the formal argument about minds and machines. Here the question is values first: what would each future cost or preserve for the things you care about?</p>
      <p style={s.p}>They are presented as distinct for clarity. The actual future is almost certainly a mix — Concentration during a Displacement, partial Augmentation inside Stagnation, Cultural Homogenization regardless of which technical scenario wins. Work through each one's logic and notice which combinations frighten you most, not to pick a single winner.</p>
      <p style={s.p}>For each scenario, there are two questions to hold in mind. The first assumes the most optimistic reading of that future. The second assumes the most pessimistic. Neither has one correct answer. But you cannot answer either without committing to a view about what matters.</p>
      <div style={{ marginTop: "28px" }}>
        <Accordion idPrefix="futures" items={items} openIndex={open} setOpenIndex={setOpen} panelPaddingLeft={38} />
      </div>
      <div style={{ ...s.box, marginTop: "36px" }}>
        <div style={{ position: "absolute", top: "-10px", left: "16px", background: c.canvas, padding: "0 8px", fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: c.inkMute, fontWeight: 400 }}>The Central Questions</div>
        <p style={{ ...s.p, marginBottom: "10px" }}>If the most optimistic vision comes true — does that vindicate or hollow out the things you value most?</p>
        <p style={{ margin: 0, color: c.inkSec }}>If the most pessimistic vision comes true — what does that say about what we were?</p>
      </div>
      <DQ questions={["Which of these scenarios do you find most plausible? Which do you find most threatening — not to civilization, but to the specific things you personally care about?", "Which two scenarios, if they happened simultaneously, would be the most dangerous combination? Which combination is most likely?", "The Abundance scenario promises to solve material suffering. If it succeeds, does that vindicate or undermine the tradition of thought that found meaning partly through confronting limitation?", "The Displacement scenario doesn't require AI to be superintelligent — just good enough and cheap enough. Are we already inside it?", "The Cognitive Atrophy scenario doesn't require AGI either. It only requires that AI be convenient. What capacities of yours are already atrophying, and would you call that a loss?", "The Augmentation scenario sounds benign. What is it about unaided human cognition that you'd want to protect — and is that protection realistic, or is it nostalgia?", "In an Augmentation future where AI-assisted work becomes the norm, who still has standing to say whether the result is good — and on what grounds?", "Each scenario implies a different answer to the question 'what does it mean to be human?' Which answer do you find most defensible? What does that reveal about your values?", "If you had to design an education system for the most likely future, what would it teach? What would it stop teaching?"]} />
      <TryIt prompts={["Run the personal simulation. Tell an AI your name, where you're from, what you study, what you care most about, and what you plan to do. Ask it to simulate what your life might look like in 2040 under each of these futures — Abundance, Displacement, Concentration, Augmentation, Cognitive Atrophy, Cultural Homogenization, Stagnation. Ask for specificity, not generality.", "Ask an AI: 'Which of these futures do you think is most likely — and which would you prefer? I want two separate answers.' See whether it treats prediction and preference as different things.", "Ask an AI to construct a single scenario that combines two of these futures — say, Concentration plus Cognitive Atrophy, or Augmentation plus Cultural Homogenization. Ask what life inside that combination would actually look like for someone like you.", "Ask an AI to argue that the future you most hope for is actually the one most threatening to the specific things you care about. See if it can construct that argument convincingly. If it can, take that seriously."]} />
    </div>
  );
}
