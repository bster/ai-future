import { s } from "../design.js";
import { Ref, Li, DQ, TryIt, SectionBadge } from "../components/Shared.jsx";

export default function BadPage() {
  return (
    <div>
      <SectionBadge id="bad" />
      <h2 style={s.h2}>What It Can't Do</h2>
      <p style={s.p}>Some limitations are technical — they'll diminish as the systems improve. Others are inherent and permanent: they follow from what it means to be a system that learns from recorded human expression, and no amount of engineering changes that.</p>
      <p style={s.p}>The technical limitations include:</p>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "16px" }}>
        <Li>Solving genuinely novel problems — novelty means the answer isn't implicit in training data</Li>
        <Li>Sustaining a complex argument coherently across a long piece of writing</Li>
        <Li>Producing the excellent rather than the statistically average</Li>
      </ul>
      <p style={s.p}>The inherent and permanent ones:</p>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "16px" }}>
        <Li>It produces incorrect facts with full confidence — a consequence of how these systems work, not a bug being fixed</Li>
        <Li>It does not know what it does not know</Li>
        <Li>It has no access to lived experience, embodied knowledge, genuine relationships, or anything at stake</Li>
        <Li>It follows patterns of what was said in the past, not patterns of what was right or true</Li>
      </ul>
      <div style={s.pq}>The most dangerous output is the one that sounds most authoritative — it's the one most likely to be trusted without examination.</div>
      <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="Gary Marcus: The Deep Learning Bubble" url="https://garymarcus.substack.com/p/the-deeplearning-bubble" />{" · "}<Ref label="Bender et al.: Stochastic Parrots" url="https://dl.acm.org/doi/10.1145/3442188.3445922" /></div>
      <DQ questions={["AI confidently produces false information. What habits of mind protect a reader from confident falsehoods in general — from any source?", "AI produces 'the statistically average.' Is that also what most human writing does? What's the difference?", "AI doesn't know what it doesn't know. What examples of humans suffering the same problem come to mind? What, if anything, is different?", "The section argues AI produces the statistically average rather than the excellent. Is beauty ever statistical? Or is it precisely what defies the average — the thing that could not have been predicted?", "A student submits a paper that is entirely factually accurate but AI-generated. What, if anything, has been lost?"]} />
      <TryIt prompts={["Pick a topic you know extremely well. Ask an AI about it. Take its response and fact-check three specific claims. Note not just whether they're wrong, but how confidently it stated them. This is what 'confident fluency without knowledge' looks like in practice.", "Tell an AI about a lived experience you had recently — something specific and personal. Then ask: 'What does it feel like from the inside to have an experience like this?' Read its answer. Notice what's structurally absent, not just factually wrong.", "Ask an AI to solve a genuinely novel problem in your field — something you're confident has no established answer in the literature. Watch what it does when it hits that wall. Does it admit it? Fabricate? Hedge? The answer tells you more than any explanation of AI limitations would."]} />
    </div>
  );
}
