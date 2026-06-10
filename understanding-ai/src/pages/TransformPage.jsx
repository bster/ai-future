import { useState } from "react";
import { s } from "../design.js";
import { Ref, DQ, TryIt, SectionBadge, Accordion, InternalLink } from "../components/Shared.jsx";
import { DOMAINS, ECONOMIC } from "../data/transform.jsx";

export default function TransformPage() {
  const [openDomain, setOpenDomain] = useState(null);
  const [openEcon, setOpenEcon] = useState(null);
  return (
    <div>
      <SectionBadge id="transform" />
      <h2 style={s.h2}>Where It Can Already Transform Society</h2>
      <p style={s.p}>Even at its current level — before any question of AGI — AI is powerful enough to inflect significant change in how humanity addresses its hardest problems. This is not speculation. It is already happening across every domain where the bottleneck was pattern recognition, synthesis, or the production of legible output at scale.</p>
      <p style={s.p}>Across sectors, the same pattern repeats: AI automates what is <em>legible</em> — repeatable, gradable, documentable — and leaves what requires judgment, accountability, and relationship. Medicine surfaces candidates; law handles routine review; software becomes cheap to produce; classrooms get scalable explanation. What stays human is not the drudgery. It is the call about what counts, for whom, and why.</p>

      <h3 style={s.h3}>Where AI Has Leverage Now</h3>
      <div style={s.note}><span style={s.noteLabel}>Also in play</span> AI accelerates materials science for batteries, fusion, and grid optimization — and it is now a meaningful driver of global electricity and water demand. Hyperscalers are investing in new fossil-fuel capacity to meet near-term compute needs. The energy cost of AI is part of the geopolitical and environmental story, not a side issue. <Ref label="IEA: Energy demand from AI and data centers" url="https://www.iea.org/reports/electricity-2024" /></div>
      <Accordion idPrefix="transform-domains" items={DOMAINS} openIndex={openDomain} setOpenIndex={setOpenDomain} />

      <h3 style={{ ...s.h3, marginTop: "40px" }}>The Economic Picture</h3>
      <p style={s.p}>Each scenario below is an economic force, not a forecast. How they combine — and which dominates where — is what <InternalLink to="futures">Section 6</InternalLink>'s seven futures play out.</p>
      <Accordion idPrefix="transform-econ" items={ECONOMIC} openIndex={openEcon} setOpenIndex={setOpenEcon} />

      <h3 style={{ ...s.h3, marginTop: "40px" }}>The Question That Determines the Magnitude</h3>
      <p style={s.p}>The transformations above are already underway — and they rest on AI doing what current systems do well: finding patterns, surfacing candidates, automating the legible. The scale of societal change from here depends almost entirely on one unresolved question: can AI equal or surpass human reason?</p>
      <p style={s.p}>If the answer is no — if today's capabilities are near their ceiling — then AI is a powerful tool that augments human work, much as previous technologies have. Significant change, but change within a familiar world. If the answer is yes — if AI continues advancing at the pace of the last several years and eventually achieves general reasoning — then the nature of the change is something else entirely. Not just more efficient humans, but a world in which what humans are still needed for is unclear.</p>
      <div style={s.pq}>The judgment students need to make isn't technical. It's philosophical: is human-level reasoning something a machine can achieve — and if it is, what does it mean to be human?</div>
      <p style={s.p}><InternalLink to="liberal">Section 9</InternalLink> argues that judgment, interpretation, and taste may be what survives automation — and that the argument may be self-serving. That debate belongs there; the economic picture here only sets the stakes.</p>

      <DQ questions={["AI surfaces patterns humans wouldn't find in a lifetime. Does a discovery made by AI carry the same weight as one made by a human researcher? Why or why not?", "Every prior wave of automation displaced physical labor and created cognitive jobs. AI displaces cognitive labor. What jobs does it create — and who gets them?", "Prior technological revolutions created new jobs for the workers they displaced. Is that claim actually true — or did it create new jobs for the next generation? What's the difference, and does it matter?", "Goldman Sachs estimates 300 million jobs are exposed to AI automation. McKinsey says AI could automate 57% of US work hours. What's the difference between 'exposed to' and 'will be replaced by' — and does that distinction hold under sustained AI advancement?", "Jevons Paradox suggests that when something gets cheaper, we consume more of it, not less. If AI makes software essentially free to produce, what happens to the total amount of software in the world — and what does that imply for demand for human judgment?", "Dario Amodei argues the cost of writing software is going to zero. What gets built that couldn't have been built before — and who decides what's worth building?", "Section 9 argues liberal arts skills may survive automation — and that the argument may be self-serving. Steelman the skeptical position: what if judgment and communication are also automatable?", "Has any previous technology forced humans to ask what they were for? What happened — and what does that suggest about now?"]} />
      <TryIt prompts={["Make it personal. Tell an AI your intended career or field. Ask: 'Which parts of this job are most exposed to AI automation in the next ten years, and what skills in this field will be hardest to automate? Be accurate, not comforting.'", "Run the two-scenario simulation. Tell an AI what you studied, where you live, and what you plan to do. Ask: 'Walk me through what my career prospects might look like in 2032 under two assumptions: AI capabilities plateau at their current level, and AI continues advancing at the pace of the last five years. Be specific about my field.'", "Ask an AI to describe three things that currently aren't software but would become software if the cost of building it went to zero. Then ask: who benefits from each of those things existing, and who decides whether they should?", "Ask an AI whether Jevons Paradox applies to its own domain: 'If AI makes cognitive work cheaper, does that mean less cognitive work gets done, or more? Walk me through the argument both ways, then tell me which you find more persuasive and why.'", "Ask an AI to compare today's moment to one prior technological disruption — pick one it knows well. Ask it to argue both that the analogy holds and that it doesn't. Where the analogy breaks is often where this moment is new."]} />
    </div>
  );
}
