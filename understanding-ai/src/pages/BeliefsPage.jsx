import { useState } from "react";
import { c, s } from "../design.js";
import { CAMPS } from "../data/camps.js";
import { Ref, Video, DQ, TryIt, SectionBadge, Accordion } from "../components/Shared.jsx";

export default function BeliefsPage() {
  const [open, setOpen] = useState(null);
  const items = CAMPS.map(camp => ({
    key: camp.name,
    color: camp.color,
    title: camp.name,
    subtitle: camp.people,
    content: (
      <>
        {camp.belief.split("\n\n").map((para, pi) => <p key={pi} style={{ ...s.p, fontSize: "15px" }}>{para}</p>)}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>{camp.links.map((l, j) => <Ref key={j} label={l.label} url={l.url} />)}</div>
      </>
    ),
  }));

  return (
    <div>
      <SectionBadge id="beliefs" />
      <h1 style={s.h2}>The Believers</h1>
      <p style={s.p}>The entire debate hinges on one unresolved question: whether current AI architectures are fundamentally limited, or whether scale and refinement will eventually produce something qualitatively different. Nobody knows. What follows from that uncertainty are not conclusions but belief systems — and they deserve to be examined as such.</p>
      <p style={s.p}>The right question to ask about any of these camps isn't only what they predict but what they <em>need</em> to be true, and why. Each one has a case worth taking seriously and a blind spot worth flagging.</p>
      <p style={s.p}>The philosophical unpacking of "can machines think?" belongs in <a href="#mirror" style={{ color: c.primary, textDecoration: "none" }}>Section 7</a>. Here the question is which forecast you find credible — and what that choice commits you to.</p>
      <Accordion idPrefix="beliefs" items={items} openIndex={open} setOpenIndex={setOpen} panelPaddingLeft={38} />
      <Video id="2Nn0-kAE5c0" caption="Ezra Klein interviews Eliezer Yudkowsky — the clearest accessible presentation of the doomer case, from its most committed advocate." />
      <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="Amodei: Machines of Loving Grace" url="https://www.darioamodei.com/essay/machines-of-loving-grace" />{" · "}<Ref label="Altman: The Intelligence Age" url="https://ia.samaltman.com/" />{" · "}<Ref label="LeCun: A Path Towards Autonomous Machine Intelligence" url="https://openreview.net/pdf?id=BZ5a1r-kVsf" />{" · "}<Ref label="Bostrom: Superintelligence (Oxford UP, 2014)" url="https://www.amazon.com/Superintelligence-Dangers-Strategies-Nick-Bostrom/dp/0198739834" />{" · "}<Ref label="Geoffrey Hinton on AI risk (interview, 2023)" url="https://www.youtube.com/watch?v=NnA2OoH_NFY" /></div>
      <h3 style={s.h3}>Why Your Position Here Matters for Everything That Follows</h3>
      <p style={s.p}>These camps aren't just competing forecasts about technology. They are competing answers to a prior question: what kind of thing is human reasoning, and can a machine do it? Your intuition about that question — however unexamined — will shape how you read everything that comes next in this guide.</p>
      <p style={s.p}>The hard questions about consciousness and the mirror problem look different depending on which camp you find credible. If you're a Deflationist, the mirror problem is already solved: AI is sophisticated autocomplete, and the question of machine consciousness is the wrong question. If you're a Utopian, an Accelerationist, or a Doomer, the mirror problem is urgent and unresolved — and the answer could reshape civilization. The Safety Institutionalist and Pragmatist positions imply we have time. The Emergentist position may be the most uncomfortable: capabilities we didn't design keep appearing, which means we don't know what we're dealing with.</p>
      <p style={s.p}>For educators, the stakes are direct. If the Deflationists are right, liberal arts education needs modest adjustment — AI is a powerful tool, and the work of interpretation and judgment remains safely human. If the Utopians or Doomers are right, the question of what education is for becomes urgent and still open. If the Pragmatists or Safety Institutionalists are right, we have time to adjust course. If the Emergentists are right, we're adapting in real time without knowing what we're adapting to.</p>
      <p style={s.p}>For students, the question is personal: which world do you think you're going to inhabit? The answer you give — even provisionally, even uncertainly — is the most important variable in deciding what to do with your education, what skills to cultivate, and what kind of reasoning to practice. The goal isn't to pick the right camp. It's to reason through each one seriously enough that your position is actually yours.</p>
      <div style={s.note}><span style={s.noteLabel}>Try It →</span>The theory of AI implicit in your camp becomes explicit when you try to apply it. <a href="#commission" style={{ color: c.primary, textDecoration: "none" }}>The AI Ethics Sim</a> is a simulation of a government ethics commission where you decide who is responsible when AI causes harm. The rulings you make reveal which of these camps your instincts actually reflect.</div>
      <DQ questions={["Which of these camps best describes your current intuition — and what would it take to change your mind?", "Which position most resembles a religious belief in its structure — not its content? What makes something 'religious' in this sense, and does it disqualify the position?", "Anthropic's founders say they may be building something dangerous and are building it anyway. Is that a defensible ethical position? What moral framework supports it?", "The Accelerationists and the Safety Institutionalists agree AI is coming and disagree on whether constraints are possible. Which view of human institutional capacity does each one assume?", "If the Emergentists are right — if capabilities keep appearing that nobody predicted — what does that imply for how we should make decisions about AI development?", "Pick the camp you find least credible. Make the strongest possible case for it. What did you learn from doing that?", "If you had to assign a probability to AGI in your lifetime, what would it be — and what does that number actually commit you to believing?"]} />
      <TryIt prompts={["Ask an AI: 'Which of these camps — Utopians, Accelerationists, Doomers, Safety Institutionalists, Deflationists, Pragmatists, Emergentists — do you think is most likely correct? I want your best guess, not a balanced summary.' If it hedges, ask it to commit. Note whether it can actually take a position.", "Describe your own views on AI to an AI: what you believe it can do, what you think it can't, and whether you think AGI is likely. Ask it to identify which camp your views most closely resemble — and what assumptions you'd have to hold for that position to be internally coherent.", "Pick the camp you find least credible. Ask an AI to make the strongest possible case for it — the best empirical evidence, the strongest philosophical arguments, the most defensible version of the position. Then ask it to attack that case. Notice where it lands when it's not forced to pick a side."]} />
    </div>
  );
}
