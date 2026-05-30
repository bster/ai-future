import { c, s } from "../design.js";
import { Ref, Video, Li, DQ, TryIt, SectionBadge, BoxLabel } from "../components/Shared.jsx";

export default function BadPage() {
  return (
    <div>
      <SectionBadge id="bad" />
      <h1 style={s.h2}>What It Can't Do</h1>
      <p style={s.p}>Some limitations are technical — they'll diminish as the systems improve. Others are inherent and permanent: they follow from what it means to be a system that learns from recorded human expression, and no amount of engineering changes that. The distinction matters because most public discussion of AI's limits conflates them.</p>
      <p style={s.p}>The technical limitations — currently real, but shrinking:</p>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "16px" }}>
        <Li>Solving genuinely novel problems where no analogical scaffolding exists in training data</Li>
        <Li>Sustaining a complex argument coherently across very long pieces of writing (improving rapidly with longer context windows)</Li>
        <Li>Producing the excellent rather than the statistically average</Li>
        <Li>Reasoning reliably under tight constraints — math, formal logic, multi-step planning</Li>
      </ul>
      <p style={s.p}>The inherent and permanent ones — they follow from what AI is:</p>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "16px" }}>
        <Li>It produces incorrect facts with full confidence — a consequence of how these systems work, not a bug being fixed</Li>
        <Li>It lacks the metacognitive uncertainty humans have at the edge of their knowledge — it doesn't know what it doesn't know in a way that registers as doubt</Li>
        <Li>It has no test of truth beyond statistical plausibility in its training data</Li>
        <Li>It reflects and amplifies the biases of its training data at scale, regardless of intent</Li>
      </ul>
      <h3 style={s.h3}>The Permanent Limit That Matters Most</h3>
      <p style={s.p}>AI has no lived experience. No embodied knowledge. No genuine relationships. Nothing personal on the line.</p>
      <p style={s.p}>It has never been afraid. Never been hungry, tired, or in love. It has never lost anyone. It does not know what it is to wait for news. It cannot tell you what a thing means because nothing has ever meant anything to it.</p>
      <p style={s.p}>This is not a limitation that scaling solves. It is the difference between something that has read every account of grief ever written and something that has actually grieved. The accounts make the system fluent. They do not make it a participant. When an AI writes movingly about loss, it is recombining the patterns of human writing about loss. The words can move you. No one lived through it.</p>
      <p style={s.p}>This matters because the most important things humans communicate are not information transfers. They are testimonies — claims made by someone who has been somewhere, seen something, and is willing to stake their credibility on saying so. AI cannot give that testimony, because there is no "someone" inside the system who has been anywhere.</p>
      <h3 style={s.h3}>Three Different Limit Claims</h3>
      <p style={s.p}>The rest of this guide keeps three kinds of limit separate. They are easy to collapse into one — and the debate goes wrong when they do.</p>
      <p style={s.p}><strong>Embodiment and testimony.</strong> No lived subject means nothing personal on the line. That limit is about what AI <em>is</em>, not how capable it gets. Unless you reject the argument above, scaling does not fix it.</p>
      <p style={s.p}><strong>Capability ceiling.</strong> Whether today's architectures can eventually match general human reasoning is open. <a href="#beliefs" style={{ color: c.primary, textDecoration: "none" }}>Section 5</a> maps the camps; <a href="#unknown" style={{ color: c.primary, textDecoration: "none" }}>Section 8</a> names what we do not know about scaling and alignment.</p>
      <p style={s.p}><strong>Expressibility.</strong> AI learns from what humans have recorded and formalized. Some of what matters most resists that form — not because we have failed to try, but because precision is the wrong instrument. <a href="#mirror" style={{ color: c.primary, textDecoration: "none" }}>Section 7</a> develops that claim; it does not depend on solving neuroscience first.</p>
      <p style={s.p}>A system could pass every capability test and still fail the testimony test. It could remain bounded by expressibility even if neuroscience someday explains human minds in full. The guide treats all three as live.</p>

      <div style={s.box}>
        <BoxLabel>What Comes Next</BoxLabel>
        <p style={{ ...s.p, marginBottom: "8px" }}><a href="#transform" style={{ color: c.primary, textDecoration: "none" }}><strong>Sections 4–6</strong></a> — where AI already has leverage, who believes what about where it is going, and what each future would cost or preserve.</p>
        <p style={{ ...s.p, marginBottom: "8px" }}><a href="#mirror" style={{ color: c.primary, textDecoration: "none" }}><strong>Sections 7–8</strong></a> — philosophy of mind and technical uncertainty.</p>
        <p style={{ ...s.p, marginBottom: 0 }}><a href="#liberal" style={{ color: c.primary, textDecoration: "none" }}><strong>Sections 9–10</strong></a> — what this means in the classroom and for the world students will enter.</p>
      </div>

      <div style={s.pq}>The most dangerous output is the one that sounds most authoritative — it's the one most likely to be trusted without examination.</div>
      <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="Gary Marcus: Why the AI Bubble May Be Imminent" url="https://garymarcus.substack.com/p/why-the-collapse-of-the-generative" />{" · "}<Ref label="Bender et al.: Stochastic Parrots" url="https://dl.acm.org/doi/10.1145/3442188.3445922" />{" · "}<Ref label="Mitchell: Why AI Is Harder Than We Think" url="https://arxiv.org/abs/2104.12871" />{" · "}<Ref label="Narayanan & Kapoor: AI Snake Oil (Princeton UP)" url="https://press.princeton.edu/books/hardcover/9780691249131/ai-snake-oil" /></div>
      <Video id="WU4oou1GpCk" caption="Emily Bender: On the Dangers of Stochastic Parrots — why fluent language models are not minds, and what is lost when we treat them as if they were." />
      <DQ questions={["AI confidently produces false information. What habits of mind protect a reader from confident falsehoods in general — from any source?", "AI produces 'the statistically average.' Is that also what most human writing does? What's the difference?", "AI doesn't know what it doesn't know. What examples of humans suffering the same problem come to mind? What, if anything, is different?", "The section argues AI produces the statistically average rather than the excellent. Is beauty ever statistical? Or is it precisely what defies the average — the thing that could not have been predicted?", "A student submits a paper that is entirely factually accurate but AI-generated. What, if anything, has been lost?"]} />
      <TryIt prompts={["Pick a topic you know extremely well. Ask an AI about it. Take its response and fact-check three specific claims. Note not just whether they're wrong, but how confidently it stated them. This is what 'confident fluency without knowledge' looks like in practice.", "Tell an AI about a lived experience you had recently — something specific and personal. Then ask: 'What does it feel like from the inside to have an experience like this?' Read its answer. Notice what's missing beyond factual errors.", "Ask an AI to solve a novel problem in your field — something you're confident has no established answer in the literature. Watch what it does when it hits that wall. Does it admit it? Fabricate? Hedge? The answer tells you more than any explanation of AI limitations would."]} />
    </div>
  );
}
