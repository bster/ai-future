import { c, s } from "../design.js";
import { Ref, DQ, TryIt, SectionBadge } from "../components/Shared.jsx";

export default function UnknownPage() {
  const items = [
    { title: "Whether there's a ceiling", body: "Is the current architecture fundamentally limited, or is scale sufficient to produce qualitative change? The field has no consensus, and the people most confident in their answer tend to be the ones who've staked their careers on a position." },
    { title: "Emergence", body: "Capabilities keep appearing at scale that nobody predicted — translation, reasoning, coding ability — without being explicitly trained for. We don't fully understand why. That cuts in every direction.", link: { label: "Emergent abilities in LLMs", url: "https://en.wikipedia.org/wiki/Emergent_abilities_of_large_language_models" } },
    { title: "New architectures", body: "Chain-of-thought reasoning, reinforcement learning from feedback, multimodal training — any of these may shift the picture significantly. The field as it exists today is not the field that will exist in five years." },
    { title: "Agency", body: "AI acting in the world rather than generating text is early-stage and genuinely unpredictable. The difference between a tool that generates and a tool that acts is not merely technical." },
    { title: "Societal feedback loops", body: "How does mass AI use change what humans know, practice, and choose to develop? If students stop practicing difficult writing because AI will do it, what happens to the capacity for difficult thinking? We are inside that experiment. Results not yet available." },
  ];
  return (
    <div>
      <SectionBadge id="unknown" />
      <h2 style={s.h2}>The Genuinely Unknown</h2>
      <p style={s.p}>Intellectual honesty means naming what we don't know. Modeling that comfort is itself a pedagogical act.</p>
      {items.map((item, i) => (
        <div key={i} style={{ borderLeft: `3px solid ${c.hairline}`, paddingLeft: "18px", margin: "20px 0" }}>
          <div style={{ fontWeight: 500, marginBottom: "6px", color: c.ink, letterSpacing: "-0.1px" }}>{item.title}</div>
          <p style={{ ...s.p, fontSize: "15px", marginBottom: item.link ? "8px" : 0 }}>{item.body}</p>
          {item.link && <Ref label={item.link.label} url={item.link.url} />}
        </div>
      ))}
      <div style={s.pq}>"I don't know" is not a failure of intellectual ambition. It is the most rigorous possible response to a question that genuinely hasn't been answered.</div>
      <DQ questions={["What is the difference between a question that is unanswered and one that is unanswerable? Give examples from your field.", "The societal feedback loop question suggests AI use may change what we are capable of. What historical precedents exist for a technology changing human cognitive capacity?", "If AI can eventually produce outputs that are indistinguishable from great human art — indistinguishable to critics, to audiences, to time — what is actually lost? Is the loss in the experience, or in the act of making?", "If capabilities emerge in AI that nobody designed or predicted, what does that tell us about our ability to control the technology?", "How should one act under genuine uncertainty about high-stakes outcomes? What does your philosophical tradition say?"]} />
      <TryIt prompts={["Ask an AI: 'What is the most important thing you currently cannot do — and do you think that's a temporary limitation or a permanent one? I want your genuine view, not a hedge.' Push back if it evades.", "Ask an AI to reason from genuine uncertainty: 'You don't know whether you'll be significantly more capable in five years or essentially the same. Given that uncertainty, what should universities do differently right now — specifically, not in general terms?' Evaluate whether it can reason usefully under conditions it can't resolve.", "Tell an AI about a technology that significantly changed how you think — something you use constantly that has altered what you know or how you process things. Ask it to extrapolate: if AI continues advancing for a decade and becomes a constant cognitive companion, what might you lose the capacity to do — and would that be a loss worth grieving?"]} />
    </div>
  );
}
