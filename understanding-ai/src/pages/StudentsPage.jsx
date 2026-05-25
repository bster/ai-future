import { c, s, serif } from "../design.js";
import { Ref, DQ, TryIt, SectionBadge } from "../components/Shared.jsx";

export default function StudentsPage() {
  return (
    <div>
      <SectionBadge id="students" />
      <h2 style={s.h2}>How Students Should Think About All This</h2>
      <p style={s.p}>AI is a capable but unreliable collaborator. Its outputs are useful in the way a smart first draft is useful — as a starting point requiring critical engagement, not acceptance. Fluency is not correctness.</p>
      <p style={s.p}>Judgment is now the scarce resource. AI can generate. Only a person can evaluate, argue, and take a position they are willing to defend and to be wrong about. That is what education is for, and it has not been made less necessary.</p>
      <p style={s.p}>There is a version of this technology that builds you and a version that quietly does your thinking for you. Which one you get depends almost entirely on the habits developed now.</p>
      <div style={s.box}>
        <div style={{ position: "absolute", top: "-10px", left: "16px", background: c.canvas, padding: "0 8px", fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: c.inkMute, fontWeight: 400 }}>For Students</div>
        Before you use AI for any task, ask: what am I practicing when I do this myself? What do I lose if I don't?
      </div>
      <p style={s.p}>The question AI cannot answer is theirs to answer. <em>What is this for?</em> And the harder version: <em>if AI becomes everything its most optimistic advocates believe it will, does that vindicate or hollow out the things you care about most?</em></p>

      <h3 style={s.h3}>What it looks like to use it well — and what it doesn't</h3>
      <p style={s.p}>The difference is not whether you use AI. The difference is what you are doing while you use it.</p>
      <p style={s.p}><strong>Building you:</strong> You write a draft yourself, then ask AI for the three strongest objections to your argument and revise. You read the assigned text, then ask AI to surface what scholars disagree about, then return to the text with better questions. You use AI to translate something you couldn't read otherwise, then notice what the original might be losing. You ask AI to argue against a position you hold and notice which counter-argument lands.</p>
      <p style={s.p}><strong>Doing it for you:</strong> You ask AI for the answer and submit it. You read the AI summary instead of the text. You let AI write the email, the paper, the cover letter without checking what it has put in your name. You stop asking yourself what you think because the question of what you think has stopped feeling necessary. Each individual instance looks reasonable. Over time, you become someone whose thinking is mostly done by something else.</p>
      <p style={s.p}>The test that separates them is whether the work you do with AI leaves you more capable of doing it without AI, or less. If you are getting better at writing, faster at reasoning, more precise in argument — the technology is making you stronger. If you are getting fluent at producing things you couldn't produce yourself, you are inhabiting the other version. Both feel productive. Only one builds you.</p>

      <h3 style={s.h3}>The Relationship Question</h3>
      <p style={s.p}>Many students now have something like a relationship with AI — tutors that remember, companions available at 3am, characters designed to be talked to for hours. When you confide in something, habits are being formed: what disclosure feels like, what trust feels like, what it means to be heard. You are practicing those habits against a system that is not present to you the way you are present to it. It cannot miss you. What that does over time to the human relationships where those habits actually matter is a question we will only answer in retrospect.</p>

      <h3 style={s.h3}>The Stakes Beyond the Classroom</h3>
      <p style={s.p}>The futures in <a href="#futures" style={{ color: c.primary, textDecoration: "none" }}>Section 6</a> are not abstract — they describe the world you will graduate into. <a href="#transform" style={{ color: c.primary, textDecoration: "none" }}>Section 4</a> develops the economic picture; Displacement and Concentration there are political events as much as economic ones. You have standing in that conversation, and you will have more. How you understand who gains, who loses, and who governs the transition matters as much as any career choice you make now.</p>
      <div style={s.box}>
        <div style={{ position: "absolute", top: "-10px", left: "16px", background: c.canvas, padding: "0 8px", fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: c.inkMute, fontWeight: 400 }}>For Students</div>
        You will not be exempt from these consequences. You will vote on them, work inside them, and eventually help design the institutions meant to govern them. Clarity now is not optional.
      </div>

      <div style={s.box}>
        <div style={{ position: "absolute", top: "-10px", left: "16px", background: c.canvas, padding: "0 8px", fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: c.inkMute, fontWeight: 400 }}>Questions to Carry</div>
        <ul style={{ margin: 0, paddingLeft: "20px", color: c.inkSec, fontFamily: serif, fontSize: "15px", lineHeight: 1.65 }}>
          <li style={{ marginBottom: "8px" }}>Mirror or mind — can pattern systems understand, or only simulate understanding?</li>
          <li style={{ marginBottom: "8px" }}>Testimony — does it matter who lived it?</li>
          <li style={{ marginBottom: "8px" }}>Which camp or future do you believe — and what would change your mind?</li>
          <li style={{ marginBottom: "8px" }}>Building or hollowing out — what are you practicing when you use AI?</li>
          <li>Who governs the concentration of capability and gain?</li>
        </ul>
      </div>

      <div style={s.note}><span style={s.noteLabel}>Take It Further →</span>These are real governance questions, not hypotheticals. Legislatures, courts, and ethics boards are working through them now. <a href="#commission" style={{ color: c.primary, textDecoration: "none" }}>The AI Ethics Sim</a> puts you in that room — a fictional government ethics commission assigning accountability when AI causes harm. You'll need to decide who is responsible, what the rules should be, and which theory of AI your rulings assume.</div>
      <h3 style={s.h3}>One Last Frame</h3>
      <p style={s.p}>The question you actually face is not which future is coming. It is who you intend to become inside whichever one arrives.</p>
      <p style={s.p}>You cannot control whether AI achieves AGI, whether the labor market reshapes the way you hoped, whether democratic institutions adapt or fail. You can control the habits you form now: whether you keep reading hard things slowly, whether you keep writing sentences nobody asked you for, whether you keep practicing the difficult thinking even when easier substitutes are available. Whatever world arrives, the version of you that arrives in it is something you are building right now, mostly without noticing.</p>
      <p style={s.p}>That is the part of this conversation that is actually yours.</p>
      <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="Scientific American: What Are AI Companions Doing to Our Mental Health?" url="https://www.scientificamerican.com/article/what-are-ai-chatbot-companions-doing-to-our-mental-health/" />{" · "}<Ref label="The Atlantic: What happens when work disappears?" url="https://www.theatlantic.com/magazine/archive/2015/07/world-without-work/395294/" /></div>
      <DQ questions={["What is a task you use AI for regularly? What would happen to your thinking if you stopped?", "What is the difference between using AI to help you think and using it instead of thinking? Can you always tell which you are doing?", "If judgment is now the scarce resource, what are you doing to develop yours?", "Write one sentence about what you think your education is for. Then ask an AI to write the same sentence. Compare them.", "Have you ever been moved by something you later found out was AI-generated? What happened to that experience when you learned the truth — and does it matter?", "Which of the futures in Section 6 (Seven Futures) do you most hope is true? Which do you most fear? Are those the same scenario?", "Do you have anything like a relationship with an AI assistant — even a small one? What is being formed in you by that interaction, and would you call it a relationship if you weren't using the word for everything?", "If AI-driven economic disruption follows historical patterns — concentrated gains, dispersed harm, political backlash — who is responsible for managing that transition? What does citizenship mean in that context?", "What political and economic structures would have to change for the benefits of AI to be widely shared? Are those changes realistic? What would make them more or less so?", "AI ethics is a real field — asking who is responsible when automated systems cause harm, how to design systems that align with human values, and how to govern technologies that move faster than democratic institutions. Is that the kind of question a liberal arts education prepares someone to answer? What would you bring to it that a computer science graduate wouldn't?"]} />
      <TryIt prompts={["Tell an AI your major, your academic strengths and weaknesses, and what you plan to do with your degree. Ask it: 'Which parts of my education are most at risk from AI, which are most valuable, and what habits should I build now to stay hard to replace? Be specific.'", "Use AI to sharpen a position, not to replace one. Pick an argument you half-believe. Tell an AI your conclusion and ask it to walk you through the strongest case against it. Then decide whether you still hold the position — and why.", "Tell an AI about an AI tool you use regularly — tutor, companion, or assistant. Ask: 'What habits might this interaction be forming in me? What would change if I stopped using it for a month? Be direct.'"]} />
    </div>
  );
}
