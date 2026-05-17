import { c, s } from "../design.js";
import { DQ, TryIt, SectionBadge } from "../components/Shared.jsx";

export default function StudentsPage() {
  return (
    <div>
      <SectionBadge id="students" />
      <h2 style={s.h2}>How Students Should Think About All This</h2>
      <p style={s.p}>AI is a capable but unreliable collaborator. Its outputs are useful in the way a smart first draft is useful — as a starting point requiring critical engagement, not acceptance. Fluency is not correctness. The most dangerous output is the one that sounds most authoritative.</p>
      <p style={s.p}>Judgment is now the scarce resource. AI can generate. Only a person can evaluate, argue, and take a position they are willing to defend and to be wrong about. That is what education is for, and it has not been made less necessary.</p>
      <p style={s.p}>There is a version of this technology that makes people sharper and a version that makes them dependent. Which version one gets depends almost entirely on the habits developed now.</p>
      <div style={s.box}>
        <div style={{ position: "absolute", top: "-10px", left: "16px", background: c.canvas, padding: "0 8px", fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: c.inkMute, fontWeight: 400 }}>For Students</div>
        Before you use AI for any task, ask: what am I practicing when I do this myself? What do I lose if I don't?
      </div>
      <p style={s.p}>The question AI cannot answer is theirs to answer. <em>What is this for?</em> And the harder version: <em>if AI becomes everything its most optimistic advocates believe it will, does that vindicate or hollow out the things you care about most?</em></p>
      <h3 style={s.h3}>The Stakes Beyond the Classroom</h3>
      <p style={s.p}>The five futures described in this guide are not abstract. They describe the world students will graduate into — and the political and economic conditions of that world will depend, in part, on choices being made right now by people mostly older than they are. Students have standing in this conversation, and they will have more.</p>
      <p style={s.p}>If AI at its current capability — before any AGI question is settled — displaces large numbers of workers, that is a political event as much as an economic one. Democracies have not handled large, rapid labor transitions well historically. The benefits have concentrated. The disruption has dispersed. The political consequences — polarization, institutional distrust, the rise of movements that offer simple explanations for complex dislocations — are predictable enough that they warrant study, not just reaction.</p>
      <p style={s.p}>If AI's productivity gains concentrate among the people and institutions who control the technology, then the distribution of power in democratic society shifts in ways that existing political structures were not designed to manage. This is not speculation about a distant future. The concentration is already underway. How students understand it — and eventually participate in governing it — matters.</p>
      <div style={s.box}>
        <div style={{ position: "absolute", top: "-10px", left: "16px", background: c.canvas, padding: "0 8px", fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: c.inkMute, fontWeight: 400 }}>For Students</div>
        You will not be exempt from these consequences. You will vote on them, work inside them, and eventually help design the institutions meant to govern them. Clarity now is not optional.
      </div>
      <DQ questions={["What is a task you use AI for regularly? What would happen to your thinking if you stopped?", "What is the difference between using AI to help you think and using it instead of thinking? Can you always tell which you are doing?", "If judgment is now the scarce resource, what are you doing to develop yours?", "Write one sentence about what you think your education is for. Then ask an AI to write the same sentence. Compare them.", "Have you ever been moved by something you later found out was AI-generated? What happened to that experience when you learned the truth — and does it matter?", "Which of the five futures in the previous section do you most hope is true? Which do you most fear? Are those the same scenario?", "If AI-driven economic disruption follows historical patterns — concentrated gains, dispersed harm, political backlash — who is responsible for managing that transition? What does citizenship mean in that context?", "What political and economic structures would have to change for the benefits of AI to be widely shared? Are those changes realistic? What would make them more or less so?"]} />
      <TryIt prompts={["Tell an AI your major, your academic strengths and weaknesses, and what you plan to do with your degree. Ask it: 'Be honest with me about which parts of my education are most at risk from AI, which are most valuable, and what habits I should develop right now to be genuinely hard to replace. Don't be reassuring — be specific.'", "Use AI to sharpen a position, not to replace one. Pick an argument you half-believe. Tell an AI your conclusion and ask it to walk you through the strongest case against it. Then decide whether you still hold the position — and why.", "Ask an AI to simulate two futures for you. Tell it who you are, what you care about, and what you plan to do. Ask: 'Describe two versions of my life at 45 — one where I used AI throughout my career as a genuine cognitive collaborator, one where I treated it as a threat and avoided it wherever possible. Be specific about what each life looks like.'"]} />
    </div>
  );
}
