import { s } from "../design.js";
import { Ref, Li, DQ, TryIt, SectionBadge } from "../components/Shared.jsx";

export default function GoodPage() {
  return (
    <div>
      <SectionBadge id="good" />
      <h2 style={s.h2}>What It Does Well Today</h2>
      <p style={s.p}>The capabilities are real. AI is good at:</p>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "16px" }}>
        <Li>Synthesis and summarization across large bodies of text</Li>
        <Li>First drafts — serviceable starting points across many forms</Li>
        <Li>Moving between registers, languages, and formats</Li>
        <Li>Generating options without fatigue or judgment</Li>
        <Li>Explaining established knowledge in stable, well-documented domains</Li>
      </ul>
      <p style={s.p}>What these capabilities share is that they handle the mechanical and the repetitive — exactly what every prior technology has also absorbed. The optimistic reading is straightforward: the same way the printing press, the calculator, and the internet freed humans from certain kinds of drudgery, AI can free up time and attention for deeper reasoning, for the work that is distinctly human. It creates space, not displacement.</p>
      <p style={s.p}>The important asterisk is whether today's capabilities are the ceiling or a waypoint. If AI has largely plateaued, the optimistic reading holds comfortably. If it continues advancing at the pace of the last several years, the nature of what gets displaced changes substantially — and the question of what remains distinctly human becomes harder to answer.</p>
      <div style={s.note}><span style={s.noteLabel}>Note</span>The work AI does well tends to be the work assigned precisely because it was legible, gradable, and repeatable. Its adequacy there does not diminish work that was never reducible to those qualities.</div>
      <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="Stanford AI Index Report" url="https://aiindex.stanford.edu/report/" />{" · "}<Ref label="MIT Technology Review: State of AI" url="https://www.technologyreview.com/2024/01/08/1086146/whats-next-for-ai-in-2024/" /></div>
      <DQ questions={["List tasks in your discipline that AI can now perform adequately. What do they have in common? What do they lack?", "If AI can write a competent literary analysis, was the exercise of writing it ever primarily about the analysis — or about something else?", "What is the difference between an AI that can summarize Kant and a student who understands Kant? Degree or kind?", "If students use AI to generate first drafts, what intellectual work remains? Is it more or less valuable than what came before?", "AI produces competent work across many forms. Is competence ever beautiful — and if so, what does that tell you about what beauty actually is?", "If an AI-generated poem moves you, does it matter that nothing was at stake for its author? What theory of art does your answer commit you to?"]} />
      <TryIt prompts={["Test its synthesis capability on something real. Give an AI five dense paragraphs from different sources in your field — readings you actually have. Ask it to synthesize the core argument and identify where the sources agree and disagree. Then evaluate the result against your own reading.", "Tell an AI your major and the kind of work your field typically assigns. Ask: 'Show me a task in my discipline where AI demonstrably outperforms a typical undergraduate today. Then do it — and tell me honestly what's missing from the result.' Evaluate what it produces.", "Give an AI a first draft of something you're actually working on. Ask it to improve it. Rate the result honestly: what did it get right? What is absent that only you could supply? That gap is the answer to the question this section is asking."]} />
    </div>
  );
}
