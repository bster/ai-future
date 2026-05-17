import { useState } from "react";
import { c, font, s } from "../design.js";
import { Ref, Video, DQ, TryIt, SectionBadge } from "../components/Shared.jsx";

const DOMAINS = [
  {
    title: "Medical and Scientific Research",
    tagline: "Patterns in genomics, drug discovery, and research literature",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "15px" }}>AI's best fit is finding non-obvious patterns in vast bodies of existing data: genomics, drug interactions, imaging, literature reviews spanning thousands of papers no single researcher could read in a lifetime. The key distinction is that AI isn't being asked to assert truth — it surfaces candidates for human validation. That is a much better match for what these systems actually do.</p>
        <p style={{ ...s.p, fontSize: "15px" }}>What would take researchers years of effort, or a fortunate accident of insight, AI can surface systematically. Accelerated drug discovery, earlier disease detection, connections across siloed research bodies — the quality of life implications are real.</p>
        <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="DeepMind AlphaFold: Solving the protein folding problem" url="https://deepmind.google/technologies/alphafold/" />{" · "}<Ref label="Nature: AI in drug discovery" url="https://www.nature.com/articles/s41573-019-0024-5" /></div>
        <Video id="Y48UmC3ODFk" caption="AlphaFold and the End of the Protein Folding Problem — a concrete example of AI doing something that would have taken humans decades." />
      </>
    ),
  },
  {
    title: "Writing Software",
    tagline: "When software costs nothing to produce, everything becomes software",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "15px" }}>Code is the most AI-compatible domain because it is objectively verifiable — it runs, or it doesn't. But the deeper point is what happens when the cost of producing software approaches zero. Dario Amodei has argued that we are headed toward exactly that: software as a nearly free input, the way electricity became a nearly free input to manufacturing.</p>
        <p style={{ ...s.p, fontSize: "15px" }}>If that is right, the consequence isn't fewer software projects — it's that everything becomes a software problem. Every small business, every niche workflow, every individual need that previously didn't justify the cost of building something custom. People who could imagine things but lacked the means to build them now can. The more interesting question isn't which developer jobs disappear. It's what gets built that never would have been attempted, and who decides what's worth building.</p>
        <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="Dario Amodei on the cost of software going to zero" url="https://www.youtube.com/live/K7F6ohcBJus" /></div>
        <Video id="K7F6ohcBJus" caption="Dario Amodei on what happens when the cost of writing software approaches zero — and what that implies for every other domain." />
      </>
    ),
  },
  {
    title: "Legal, Financial, and Administrative Work",
    tagline: "The majority of routine work in the highest-credentialed cognitive roles",
    content: (
      <p style={{ ...s.p, fontSize: "15px" }}>Contract review, due diligence, tax preparation, compliance monitoring, basic financial analysis — these are among the highest-credential, highest-paid cognitive roles in the economy. AI currently handles the majority of the routine work in all of them at a fraction of the cost and time. The work that remains is judgment-dependent: the call that requires a relationship, the interpretation that requires accountability, the argument that requires someone willing to be wrong in front of a client.</p>
    ),
  },
  {
    title: "Education and Knowledge Transfer",
    tagline: "Personalized tutoring previously available only inside well-resourced institutions",
    content: (
      <p style={{ ...s.p, fontSize: "15px" }}>Personalized tutoring at scale, instant explanation of any concept at any level, translation of expertise across languages and contexts. A student in a poorly resourced school can now access explanatory quality previously available only inside well-resourced institutions, on demand, at near-zero cost. This may be the most democratizing near-term impact. It is also the most double-edged: the same tool that accelerates learning can substitute for it. What AI cannot give a student is what the best human teachers do — emotional attunement, real-time reading of confusion, knowledge of who this particular learner is.</p>
    ),
  },
  {
    title: "Energy, Climate, and Compute",
    tagline: "AI is now a meaningful driver of energy demand — and a political-economic actor",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "15px" }}>This one cuts both directions. AI accelerates materials science for batteries, fusion, and grid optimization. It is plausibly the most powerful tool civilization has ever had for modeling climate systems and designing the technologies that would address them.</p>
        <p style={{ ...s.p, fontSize: "15px" }}>At the same time, AI training and inference are now meaningful drivers of global electricity and water demand. Hyperscalers are investing in new fossil-fuel capacity to meet near-term compute needs. Data centers are reshaping local politics in the places they are built. The energy cost of AI is not a side issue — it is part of the geopolitical and environmental story of the technology itself.</p>
      </>
    ),
  },
  {
    title: "Content, Media, and Creative Production",
    tagline: "Volume and speed without the judgment of what's worth making",
    content: (
      <p style={{ ...s.p, fontSize: "15px" }}>First drafts, image generation, music, video, translation, localization — AI handles volume and speed across all of them. The distinction that matters: AI can produce competent output at scale, but it cannot decide what is worth making, for whom, or why. For now, that judgment remains human. Whether it stays that way depends on questions this guide examines in later sections.</p>
    ),
  },
];

const ECONOMIC = [
  {
    title: "The Jobs Already at Risk",
    tagline: "300 million jobs exposed — cognitive, credentialed, white-collar",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "15px" }}>Every previous wave of automation displaced physical labor: the loom replaced the weaver, the tractor replaced the field hand, the assembly line replaced the craftsman. The new jobs that followed were, by and large, cognitive — requiring language, analysis, judgment. Those jobs were considered safe precisely because machines couldn't do them.</p>
        <p style={{ ...s.p, fontSize: "15px" }}>AI breaks that pattern. The jobs most immediately at risk are not physical — they are cognitive, credentialed, and white-collar. Goldman Sachs estimated in 2023 that 300 million jobs globally are exposed to AI automation, with two-thirds of occupations having at least a quarter of their tasks automatable today. McKinsey's research suggests AI could technically automate up to 57% of US work hours. The most exposed roles include paralegal work, financial analysis, customer service, medical transcription, basic journalism, and entry-level software development — jobs that, a decade ago, were considered the safe destination for people displaced by factory automation.</p>
        <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="Goldman Sachs: How AI Will Affect the US Labor Market" url="https://www.goldmansachs.com/insights/articles/how-will-ai-affect-the-us-labor-market" />{" · "}<Ref label="McKinsey: Generative AI and the Future of Work in America" url="https://www.mckinsey.com/mgi/our-research/generative-ai-and-the-future-of-work-in-america" /></div>
        <Video id="t1gLIc9ebiE" caption="MIT economist and Nobel laureate Daron Acemoglu on AI's economic impact. His actual position is more interesting than 'AI is bad': he argues the direction of AI development is steerable and is currently being steered to amplify the wrong things. The question is not whether AI is good or bad in aggregate; it is who shapes what gets built." />
      </>
    ),
  },
  {
    title: "Has Technology Always Created More Jobs Than It Destroyed?",
    tagline: "The historical optimist case — and why it may not apply this time",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "15px" }}>The optimistic counter-argument is that technology has always created more jobs than it destroyed — and historically, that has been true. The Industrial Revolution, electrification, computing: each wave of displacement ultimately produced more employment than it eliminated. But the mechanism is worth examining carefully. The displaced weavers did not become software engineers. Their grandchildren did. The transition took generations, not years — and it was brutal for the people inside it, even when it was net positive in aggregate.</p>
        <p style={{ ...s.p, fontSize: "15px" }}>The second problem is structural. Each prior wave displaced physical labor and created cognitive jobs. AI displaces cognitive labor. The jobs it might create — AI trainers, output evaluators, prompt engineers — exist, but there aren't 300 million of them. If the cognitive labor safety valve no longer functions the way it did, the historical optimism requires a new argument, not just a restatement of the old one.</p>
        <p style={{ ...s.p, fontSize: "15px" }}>A 55-year-old paralegal and a 22-year-old computer science graduate are not equivalently positioned to pivot. That asymmetry is not an argument against technological progress. It is an argument that transition costs are real, unevenly distributed, and not resolved by pointing to long-run aggregate gains.</p>
      </>
    ),
  },
  {
    title: "The Third Option: Restructured Existing Jobs",
    tagline: "Most jobs are not eliminated or created — they are reshaped",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "15px" }}>The displacement-vs-new-jobs debate misses what is most likely to actually happen in the near term: existing jobs get restructured. The lawyer who used to spend 60% of their time on document review now spends it on client strategy. The doctor who used to spend 40% of their time on documentation spends it with patients. The teacher who used to spend their evenings grading uses AI to grade and spends evenings preparing lessons. Same job title, fundamentally different work.</p>
        <p style={{ ...s.p, fontSize: "15px" }}>This is the scenario most consistent with what is already happening, and it is neither doom nor abundance. It is real economic change distributed unevenly. The people who can re-skill into the augmented version of their job stay employed at higher productivity. The people who cannot — usually the most senior or the least technologically adept — are pushed out. The economy as a whole produces more. Whether that gain is shared is a political question, not an economic one.</p>
      </>
    ),
  },
  {
    title: "Jevons Paradox",
    tagline: "When efficiency improves, consumption rises — not falls",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "15px" }}>In the 19th century, the economist William Stanley Jevons observed that as steam engines became more efficient — burning less coal per unit of work — total coal consumption went up, not down. Cheaper coal use per task meant more tasks. Efficiency expanded demand rather than reducing it.</p>
        <p style={{ ...s.p, fontSize: "15px" }}>The same logic may apply to AI. If writing software costs nothing, the result isn't fewer software projects — it's that every domain that previously couldn't justify a custom software solution now gets one. If legal analysis costs a fraction of what it did, the result may not be fewer lawyers but far more legal analysis, performed on matters that previously went unexamined because they weren't worth the cost. The bottleneck shifts from execution to judgment: who decides what gets built, what gets analyzed, what's worth doing.</p>
        <p style={{ ...s.p, fontSize: "15px" }}>This is the optimistic Jevons reading: AI expands the market for human creativity and direction by making execution cheap. The pessimistic reading is that Jevons-style expansion concentrates at the top — among the people whose judgment was already valuable — while the workers who provided the execution disappear. Both readings may be true simultaneously, in different parts of the labor market.</p>
        <p style={{ ...s.p, fontSize: "15px" }}>One caveat: Jevons originally described commodities and resources. Whether it applies to labor markets is an analogy, not a direct economic result. Economists distinguish "induced demand" (Jevons-like expansion) from "substitution effects" (workers simply replaced). For AI, both forces operate at once; which one dominates in any given sector is an empirical question we will only know in retrospect.</p>
        <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="Jevons Paradox (Wikipedia)" url="https://en.wikipedia.org/wiki/Jevons_paradox" /></div>
      </>
    ),
  },
];

function Accordion({ items, openState, setOpenState }) {
  return (
    <div style={{ marginTop: "16px" }}>
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: "8px", border: `1px solid ${c.hairline}`, borderRadius: "10px", background: openState === i ? c.canvasSoft : c.canvas, overflow: "hidden" }}>
          <button onClick={() => setOpenState(openState === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", fontFamily: font }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: "15px", color: c.ink, letterSpacing: "-0.2px" }}>{item.title}</div>
              <div style={{ fontSize: "13px", color: c.inkMute, marginTop: "2px" }}>{item.tagline}</div>
            </div>
            <span style={{ color: c.primary, fontSize: "18px", flexShrink: 0 }}>{openState === i ? "−" : "+"}</span>
          </button>
          {openState === i && (
            <div style={{ padding: "0 18px 18px 18px" }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function TransformPage() {
  const [openDomain, setOpenDomain] = useState(null);
  const [openEcon, setOpenEcon] = useState(null);
  return (
    <div>
      <SectionBadge id="transform" />
      <h2 style={s.h2}>Where It Can Already Transform Society</h2>
      <p style={s.p}>Even at its current level — before any question of AGI — AI is powerful enough to inflect significant change in how humanity addresses its hardest problems. This is not speculation. It is already happening across every domain where the bottleneck was pattern recognition, synthesis, or the production of legible output at scale.</p>

      <h3 style={s.h3}>Where AI Has Leverage Now</h3>
      <Accordion items={DOMAINS} openState={openDomain} setOpenState={setOpenDomain} />

      <h3 style={{ ...s.h3, marginTop: "40px" }}>The Economic Picture</h3>
      <Accordion items={ECONOMIC} openState={openEcon} setOpenState={setOpenEcon} />

      <h3 style={{ ...s.h3, marginTop: "40px" }}>The Question That Determines the Magnitude</h3>
      <p style={s.p}>The transformations above are already underway — and they rest on AI doing what current systems do well: finding patterns, surfacing candidates, automating the legible. The scale of societal change from here depends almost entirely on one unresolved question: can AI equal or surpass human reason?</p>
      <p style={s.p}>If the answer is no — if today's capabilities are near their ceiling — then AI is a powerful tool that augments human work, much as previous technologies have. Significant change, but change within a recognizable world. If the answer is yes — if AI continues advancing at the pace of the last several years and eventually achieves general reasoning — then the nature of the change is categorically different. Not just more efficient humans, but a world in which the comparative advantage of being human is genuinely unclear.</p>
      <div style={s.pq}>The judgment students need to make isn't technical. It's philosophical: is human-level reasoning something a machine can achieve — and if it is, what does that mean for what humans are for?</div>

      <DQ questions={["AI surfaces patterns humans wouldn't find in a lifetime. Does a discovery made by AI carry the same weight as one made by a human researcher? Why or why not?", "Every prior wave of automation displaced physical labor and created cognitive jobs. AI displaces cognitive labor. What kind of jobs does it create — and who gets them?", "Prior technological revolutions created new jobs for the workers they displaced. Is that claim actually true — or did it create new jobs for the next generation? What's the difference, and does it matter?", "Goldman Sachs estimates 300 million jobs are exposed to AI automation. McKinsey says AI could automate 57% of US work hours. What's the difference between 'exposed to' and 'will be replaced by' — and does that distinction hold under sustained AI advancement?", "Jevons Paradox suggests that when something gets cheaper, we consume more of it, not less. If AI makes software essentially free to produce, what happens to the total amount of software in the world — and what does that imply for demand for human judgment?", "Dario Amodei argues the cost of writing software is going to zero. What gets built that couldn't have been built before — and who decides what's worth building?", "The section argues liberal arts skills may be exactly what survives automation — but notes this argument is possibly self-serving. Steelman the skeptical position: what if judgment and communication are also automatable?", "Has any previous technology created a moment where humans genuinely had to ask what they were for? What happened — and what does that suggest about now?"]} />
      <TryIt prompts={["Make it personal. Tell an AI your intended career or field. Ask: 'Give me an honest breakdown of which parts of this job are most exposed to AI automation in the next ten years, and what skills in this field will be hardest to automate. Don't be reassuring — be accurate.'", "Run the two-scenario simulation. Tell an AI what you studied, where you live, and what you plan to do. Ask: 'Walk me through what my career prospects might look like in 2032 under two assumptions: AI capabilities plateau at their current level, and AI continues advancing at the pace of the last five years. Be specific about my field.'", "Ask an AI to describe three things that currently aren't software but would become software if the cost of building it went to zero. Then ask: who benefits from each of those things existing, and who decides whether they should?", "Ask an AI whether Jevons Paradox applies to its own domain: 'If AI makes cognitive work cheaper, does that mean less cognitive work gets done, or more? Walk me through the argument both ways, then tell me which you find more persuasive and why.'", "Ask an AI to compare today's moment to one prior technological disruption — pick one it knows well. Ask it to argue both that the analogy holds and that it doesn't. The limits of the analogy are where the genuinely new territory begins."]} />
    </div>
  );
}
