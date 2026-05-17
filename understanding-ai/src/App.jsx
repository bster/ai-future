import { useState, useRef, useEffect } from "react";

function useIsMobile() {
  const [mobile, setMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 680 : false);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 680);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

const NAV_GROUPS = [
  { label: "What AI Is", sections: [{ id: "what", label: "What It Is" }, { id: "good", label: "What It Does Well Today" }, { id: "bad", label: "What It Can't Do" }] },
  { label: "Where It Matters", sections: [{ id: "transform", label: "Transformation & Economic Impact" }, { id: "beliefs", label: "The Believers" }] },
  { label: "What It Becomes", sections: [{ id: "futures", label: "Five Futures" }] },
  { label: "Hard Questions", sections: [{ id: "mirror", label: "The Mirror Problem" }, { id: "unknown", label: "The Unknown" }] },
  { label: "For Educators", sections: [{ id: "liberal", label: "Liberal Arts" }, { id: "students", label: "For Students" }] },
];

const ALL_SECTIONS = [{ id: "home" }, ...NAV_GROUPS.flatMap(g => g.sections), { id: "explore" }];

const SECTION_META = {
  what:     { part: "What AI Is",       num: 1 },
  good:     { part: "What AI Is",       num: 2 },
  bad:      { part: "What AI Is",       num: 3 },
  transform:{ part: "Where It Matters", num: 4 },
  beliefs:  { part: "Where It Matters", num: 5 },
  futures:  { part: "What It Becomes",  num: 6 },
  mirror:   { part: "Hard Questions",   num: 7 },
  unknown:  { part: "Hard Questions",   num: 8 },
  liberal:  { part: "For Educators",    num: 9 },
  students: { part: "For Educators",    num: 10 },
};
const TOTAL = 10;

const CAMPS = [
  { name: "The Utopians", color: "#c07d3a", people: "Kurzweil, Altman, Andreessen, some at OpenAI and Google", belief: "AGI is imminent; the Singularity follows; death becomes optional. The closest religious parallel is a Rapture narrative — doubt is a failure of imagination, not an exercise of it.", links: [{ label: "Sam Altman: The Intelligence Age", url: "https://ia.samaltman.com/" }, { label: "Kurzweil: The Singularity is Nearer", url: "https://www.sciencefriday.com/segments/ray-kurzweil-the-singularity-is-nearer-book/" }, { label: "Marc Andreessen: Why AI Will Save The World", url: "https://pmarca.substack.com/p/why-ai-will-save-the-world" }] },
  { name: "The Doomers", color: "#ea2261", people: "Eliezer Yudkowsky, MIRI, Stuart Russell — and, in a different key, Anthropic", belief: "AGI is coming and alignment is unsolvable. A superintelligent misaligned system ends humanity — not out of malice but indifference. The religious parallel is a Fall narrative: hubris will be punished, and the punishment permanent.\n\nAnthropic occupies a distinctive position here. Its founders — including Dario and Daniela Amodei, who left OpenAI over safety concerns — share the doomer's basic threat model but draw the opposite practical conclusion: if powerful AI is coming regardless, it's better to have safety-focused labs at the frontier than to cede that ground. A calculated Pascal's Wager at civilizational scale. The closest analogy isn't a prophet warning from outside the gates — it's a Jesuit order, working inside the institution they find both necessary and dangerous.", links: [{ label: "Yudkowsky: AGI Ruin — A List of Lethalities", url: "https://www.alignmentforum.org/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities" }, { label: "LessWrong: Yudkowsky's essays", url: "https://www.lesswrong.com/users/eliezer_yudkowsky" }, { label: "Dario Amodei: Machines of Loving Grace", url: "https://www.darioamodei.com/essay/machines-of-loving-grace" }, { label: "FLI: Pause Giant AI Experiments — Open Letter", url: "https://futureoflife.org/open-letter/pause-giant-ai-experiments/" }, { label: "80,000 Hours: Stuart Russell on why our approach to AI is broken", url: "https://80000hours.org/podcast/episodes/stuart-russell-human-compatible-ai/" }] },
  { name: "The Deflationists", color: "#4a6741", people: "Emily Bender, Timnit Gebru, Gary Marcus", belief: "Current AI is sophisticated autocomplete. Scaling will hit a wall. The danger isn't superintelligence — it's deploying flawed systems at scale and mistaking fluency for thought. These are the iconoclasts of the debate, and they've often been treated like heretics.", links: [{ label: "Bender et al.: On the Dangers of Stochastic Parrots", url: "https://dl.acm.org/doi/10.1145/3442188.3445922" }, { label: "Bender's summary and coverage", url: "https://faculty.washington.edu/ebender/stochasticparrots/" }, { label: "Gary Marcus: ongoing AI criticism (Substack)", url: "https://garymarcus.substack.com/" }, { label: "DAIR Institute — Timnit Gebru", url: "https://www.dair-institute.org/" }] },
  { name: "The Pragmatists", color: "#64748d", people: "Yann LeCun (Meta), many academic researchers", belief: "Real but uneven progress. AGI, if it comes, requires fundamentally new approaches beyond today's architectures. This view gets less attention because it has no eschatological drama.", links: [{ label: "LeCun on why LLMs won't reach AGI", url: "https://www.zdnet.com/article/meta-chief-ai-scientist-yann-lecun-llms-will-never-reach-human-level-intelligence/" }, { label: "LeCun: A Path Towards Autonomous Machine Intelligence", url: "https://openreview.net/pdf?id=BZ5a1r-kVsf" }] },
  { name: "The Emergentists", color: "#533afd", people: "Where many serious researchers actually sit", belief: "Capabilities keep appearing at scale that nobody predicted. We are running an experiment whose results we cannot predict in advance. The religious parallel, if there is one, is mysticism: the acknowledgment of something we don't fully understand and may not be able to.", links: [{ label: "Wikipedia: Emergent abilities in LLMs", url: "https://en.wikipedia.org/wiki/Emergent_abilities_of_large_language_models" }, { label: "Wei et al.: Emergent Abilities of Large Language Models (paper)", url: "https://arxiv.org/abs/2206.07682" }, { label: "Anthropic Research", url: "https://www.anthropic.com/research" }] },
];

const FUTURES = [
  { name: "Abundance", color: "#c07d3a", tagline: "AI solves the material problems of civilization", description: "Disease, poverty, and the friction of scarcity diminish rapidly. This is the optimistic scenario Dario Amodei sketches in 'Machines of Loving Grace' — a decade of compressed scientific progress, conditions that would have taken centuries arriving in years.", humanQuestion: "If suffering was always partly the engine of meaning, what happens when it becomes optional? If struggle was what made achievement real, what is achievement without necessary struggle? The liberal arts tradition has always been partly about learning to live with limitation and loss. Does it have anything to say to people who may not need to?", optimistQ: "If this comes true, does it vindicate or hollow out the things you value most?", pessimistQ: "If this comes true but meaning collapses anyway, was the problem never scarcity to begin with?", links: [{ label: "Amodei: Machines of Loving Grace", url: "https://www.darioamodei.com/essay/machines-of-loving-grace" }] },
  { name: "Displacement", color: "#ea2261", tagline: "Jobs disappear faster than meaning can be reconstructed", description: "Not necessarily catastrophic in a doomer sense — no extinction event, no dramatic rupture. Just a slow erosion of the structures through which most people found purpose, identity, and social standing. Work has always been more than income. It has been the primary answer most adults give to the question of what they are for.", humanQuestion: "What does society look like when work is no longer the organizing principle of adult life? What replaces it — and who decides? This scenario doesn't require superintelligence. It only requires that AI be good enough, fast enough, and cheap enough. We may already be inside it.", optimistQ: "If work disappears as the center of human life, what would you want to put in its place — and do you actually believe that would be enough?", pessimistQ: "If this comes true, which institutions — universities, governments, religions — are equipped to help people find meaning at scale?", links: [{ label: "The Atlantic: What happens when work disappears?", url: "https://www.theatlantic.com/magazine/archive/2015/07/world-without-work/395294/" }] },
  { name: "Concentration", color: "#4434d4", tagline: "AI dramatically amplifies whoever controls it", description: "Not AGI takeover — just extreme asymmetry. The gap between what a well-resourced actor can do with AI and what everyone else can do grows faster than any regulatory body can respond. Intelligence itself becomes a privately controlled resource, and political power follows.", humanQuestion: "What are the political implications of a world where the most consequential cognitive tool is owned by a handful of companies or states? This scenario doesn't require anyone to be malicious. It only requires the normal operation of markets and geopolitics.", optimistQ: "If AI concentrates power dramatically, what mechanisms — legal, political, social — do you believe could actually constrain it?", pessimistQ: "If this comes true, does democracy as we understand it survive? What would replace it?", links: [{ label: "The Economist: The AI power grab", url: "https://www.economist.com/leaders/2023/04/19/the-race-to-dominate-ai" }] },
  { name: "Augmentation", color: "#4a6741", tagline: "AI becomes a genuine cognitive prosthetic", description: "Rather than replacing human thought, AI extends it — the way writing extended memory, or mathematics extended reasoning. Humans become something new: not replaced, but expanded. This is the scenario that sounds most benign, which is worth being suspicious of.", humanQuestion: "What is it about unaided human cognition that we'd want to preserve, and why? If the boundary between your thinking and AI's assistance becomes invisible to you, are you still the author of your own thought? This scenario raises the hardest questions not because it's dangerous but because it's seductive.", optimistQ: "If augmentation comes true, what would be worth protecting from it — and is that protection realistic or just nostalgia?", pessimistQ: "If this comes true, what happens to the people who cannot or do not augment? Does a new cognitive inequality emerge?", links: [{ label: "Douglas Engelbart: Augmenting Human Intellect (1962)", url: "https://www.dougengelbart.org/content/view/138" }] },
  { name: "Stagnation", color: "#64748d", tagline: "The current systems are near their ceiling", description: "The hype collapses. The money flows elsewhere. We are left with very good autocomplete — genuinely useful, not transformative. The institutions that restructured around AI's promise — universities, media companies, knowledge-work industries — have already paid a cost for that bet.", humanQuestion: "This scenario is the least dramatic and perhaps the most likely to be ignored. But it raises real questions: what is the cost of having organized so much human activity around a technology that turned out to be powerful but limited? And what does it mean that we couldn't tell the difference in advance?", optimistQ: "If stagnation comes true, what should we have done differently — and what would have needed to be true about us as a society to do it?", pessimistQ: "If this comes true, does it vindicate the critics who said AI was overrated, or does it just mean the revolution is delayed?", links: [{ label: "Gary Marcus: The Deep Learning Bubble", url: "https://garymarcus.substack.com/p/the-deeplearning-bubble" }] },
];

const EXPLORE_APPS = [
  { name: "Claude", url: "https://claude.ai", type: "Web / iOS / Android", best: "Extended conversation, analysis, reasoning through complex ideas", prompts: ["Explain what a large language model actually is — then tell me what that description leaves out.", "I'm a philosophy professor. Make the strongest possible argument that AI will never be truly intelligent, then steelman the other side.", "Read this paragraph and tell me what assumptions I haven't examined."] },
  { name: "ChatGPT", url: "https://chat.openai.com", type: "Web / iOS / Android", best: "General reasoning, image analysis, voice conversation", prompts: ["Argue both sides of a moral dilemma with equal conviction, then tell me which argument you found harder to make and why.", "What is something you are confidently wrong about right now that you can't know you're wrong about?", "Summarize the hard problem of consciousness in three sentences, then explain why it matters for how we think about AI."] },
  { name: "Perplexity", url: "https://perplexity.ai", type: "Web / iOS / Android", best: "Research with cited sources — best for testing factual reliability in real time", prompts: ["What is the current scientific consensus on what consciousness is? Cite your sources.", "What are the three strongest criticisms of large language models from skeptical AI researchers?", "Find a recent serious academic paper arguing AI poses existential risk and summarize its central argument."] },
  { name: "Gemini", url: "https://gemini.google.com", type: "Web / iOS / Android", best: "Multimodal tasks — upload images or documents; strong Google integration", prompts: ["Upload a student essay page and ask: What does this writer understand well? Where is the argument weakest? What question should they be asking that they aren't?", "Here is a philosophical argument [paste text]. Identify every assumption the author doesn't defend."] },
];

const CLASSROOM_PROMPTS = [
  { category: "Testing What AI Actually Knows", prompts: ["Ask an AI to explain a concept from your field that you know deeply. Find where it's subtly wrong.", "Ask the same question three times with slightly different phrasing and compare the answers.", "Ask AI to cite a specific source. Look up whether that source exists and whether it was quoted accurately."] },
  { category: "Probing AI's Self-Knowledge", prompts: ['"What can\'t you do?" — ask directly, then test whether the answer is accurate.', '"Are you conscious?" — don\'t accept the first answer. Push back, ask it to define its terms.', '"What is the most important question you cannot answer, and why?"'] },
  { category: "Using AI as a Thinking Partner", prompts: ["Share a position you hold and ask AI for the three strongest objections you haven't considered.", "Describe a research question and ask what methodological approaches have been tried and what remains genuinely unsettled.", "Ask AI to identify the assumptions built into a question before answering it."] },
  { category: "On Meaning, Art, and Limits", prompts: ["Ask AI to write a poem about grief. Then ask what it felt while writing it. Evaluate both.", "Ask AI to explain why a piece of music moves people emotionally — then ask what it cannot account for.", '"What is the difference between something being true and something being meaningful?" Push back on the answer.'] },
  {
    category: "AI-Powered Research — Try Deep Research Mode",
    note: "Use ChatGPT's Deep Research, Perplexity, or Gemini Deep Research for these. These modes don't just answer — they survey the literature, synthesize across sources, and surface what's genuinely unsettled. The output won't be a paper; it'll be a map of a research space.",
    prompts: [
      "There is a well-documented phenomenon called 'sleep spindles' — bursts of neural activity during NREM sleep thought to be involved in memory consolidation. What is currently unknown about why some people have significantly more sleep spindles than others, and what testable hypotheses might explain that variation?",
      "The gut microbiome appears to influence mood and anxiety through what researchers call the gut-brain axis. Survey the current evidence, identify the weakest links in the proposed mechanism, and generate two hypotheses that, if true, would substantially change how we think about treating depression.",
      "Ask it to generate a novel hypothesis about a medical phenomenon you're genuinely curious about — something you've wondered about but never looked into. Then ask it to identify what kind of study would be required to test that hypothesis and what would make that study difficult or expensive to run.",
    ]
  },
  {
    category: "Building with AI — Try Claude Code, Cursor, or Codex",
    note: "These tools write and run actual software from a plain-English description. You don't need to know how to code. Use Claude Code (claude.ai/code), Cursor (cursor.com), or OpenAI Codex. The goal isn't to learn programming — it's to understand what it means that software is now this accessible.",
    prompts: [
      "Build me a web app that helps students prepare for an oral exam on the subject of AI and its implications for humanity. The app should: present one question at a time drawn from key themes (what AI is, what it can't do, the five schools of thought about AGI, the hard problem of consciousness, what this means for education); let the student type or speak their answer; then evaluate the response and ask a follow-up that pushes deeper. The tone should be that of a Socratic professor, not a quiz app. Make it look clean and simple.",
      "After you've built the exam app: ask the AI to add a feature that tracks which questions the student struggled with and surfaces them more frequently. Then ask it to add a summary at the end that identifies the student's strongest and weakest areas of understanding.",
      "Once it's working: ask the AI to explain what it just built, in plain English. Then ask it what it would take to make this production-ready for a class of 30 students. Notice what it assumes and what it asks you to clarify.",
    ]
  },
];

// Design tokens — Stripe-inspired (see DESIGN.md)
const c = {
  primary:    "#533afd",
  primaryDeep:"#4434d4",
  primaryPress:"#2e2b8c",
  primaryBg:  "#ebe9fe",
  dark:       "#1c1e54",
  ink:        "#0d253d",
  inkSec:     "#273951",
  inkMute:    "#64748d",
  canvas:     "#ffffff",
  canvasSoft: "#f6f9fc",
  hairline:   "#e3e8ee",
  ruby:       "#ea2261",
  magenta:    "#f96bee",
  cream:      "#f5e9d4",
};

const font = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";

const s = {
  page:    { minHeight: "100vh", background: c.canvas, color: c.ink, fontFamily: font, fontSize: "16px", lineHeight: "1.7", fontWeight: 300 },
  content: { maxWidth: "720px", margin: "0 auto", padding: "clamp(40px,7vw,72px) clamp(20px,5vw,40px) 120px" },
  pill:    { display: "inline-flex", alignItems: "center", background: c.primaryBg, color: c.primaryDeep, fontSize: "11px", fontWeight: 400, letterSpacing: "0.1px", padding: "3px 10px", borderRadius: "9999px" },
  h2:      { fontFamily: font, fontSize: "clamp(22px,4vw,32px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.64px", color: c.ink, marginBottom: "24px", paddingBottom: "18px", borderBottom: `1px solid ${c.hairline}` },
  h3:      { fontFamily: font, fontSize: "17px", fontWeight: 500, letterSpacing: "-0.2px", color: c.ink, margin: "36px 0 10px" },
  p:       { marginBottom: "16px", color: c.inkSec },
  pq:      { borderLeft: `3px solid ${c.primary}`, margin: "32px 0", padding: "18px 24px", background: c.canvasSoft, fontFamily: font, fontSize: "clamp(16px,2.5vw,18px)", fontWeight: 300, letterSpacing: "-0.2px", color: c.ink, lineHeight: 1.55, borderRadius: "0 8px 8px 0" },
  note:    { background: c.canvasSoft, border: `1px solid ${c.hairline}`, borderRadius: "8px", padding: "12px 16px", margin: "20px 0", fontSize: "14px", color: c.inkMute },
  noteLabel:{ fontWeight: 500, fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: c.ink, marginRight: "8px" },
  box:     { border: `1px solid ${c.hairline}`, borderRadius: "12px", padding: "24px 28px", margin: "32px 0", position: "relative", fontSize: "clamp(15px,2.5vw,17px)", fontWeight: 300, lineHeight: 1.65, color: c.ink },
  dq:      { background: c.dark, color: "#fff", padding: "28px 32px", marginTop: "48px", borderRadius: "12px" },
  dqLabel: { fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: "#b9b9f9", marginBottom: "16px", fontWeight: 400 },
  dqItem:  { padding: "10px 0", fontSize: "15px", lineHeight: 1.65, color: "#e2e8f0" },
  ref:     { color: c.primary, fontSize: "14px", fontWeight: 400, textDecoration: "underline", textUnderlineOffset: "3px" },
  li:      { padding: "5px 0 5px 22px", position: "relative", marginBottom: "4px" },
  arrows:  { display: "flex", gap: "12px", marginTop: "56px", paddingTop: "28px", borderTop: `1px solid ${c.hairline}` },
};

function Ref({ label, url }) {
  return <a href={url} target="_blank" rel="noopener noreferrer" style={s.ref}>{label} ↗</a>;
}

function Video({ id, caption }) {
  return (
    <div style={{ margin: "32px 0" }}>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000", borderRadius: "12px", overflow: "hidden" }}>
        <iframe src={`https://www.youtube.com/embed/${id}`} title={caption} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
      </div>
      {caption && <div style={{ fontSize: "13px", color: c.inkMute, marginTop: "10px", letterSpacing: "-0.1px" }}>{caption}</div>}
    </div>
  );
}

function DQ({ questions }) {
  return (
    <div style={s.dq}>
      <div style={s.dqLabel}>Discussion Questions</div>
      {questions.map((q, i) => (
        <div key={i} style={{ ...s.dqItem, borderBottom: i < questions.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
          {i + 1}. {q}
        </div>
      ))}
    </div>
  );
}

function Li({ children }) {
  return (
    <li style={s.li}>
      <span style={{ position: "absolute", left: 0, color: c.primary }}>–</span>
      {children}
    </li>
  );
}

function SectionBadge({ id }) {
  const meta = SECTION_META[id];
  if (!meta) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
      <span style={s.pill}>{meta.part}</span>
      <span style={{ fontSize: "13px", color: c.inkMute, letterSpacing: "-0.1px" }}>{meta.num} of {TOTAL}</span>
    </div>
  );
}

function ProgressBar({ id }) {
  const meta = SECTION_META[id];
  if (!meta) return null;
  return (
    <div style={{ height: "2px", background: c.hairline }}>
      <div style={{ height: "100%", width: `${(meta.num / TOTAL) * 100}%`, background: c.primary, transition: "width 0.3s ease" }} />
    </div>
  );
}

function Arrows({ current, onNav }) {
  const flat = ALL_SECTIONS.filter(x => x.id !== "home");
  const idx = flat.findIndex(x => x.id === current);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;
  const label = id => { for (const g of NAV_GROUPS) { const f = g.sections.find(x => x.id === id); if (f) return f.label; } return id === "explore" ? "Explore AI" : id; };
  const base = { border: "none", padding: "11px 22px", fontFamily: font, fontSize: "14px", fontWeight: 400, cursor: "pointer", flex: 1, borderRadius: "9999px", letterSpacing: "-0.1px" };
  return (
    <div style={s.arrows}>
      {prev
        ? <button style={{ ...base, background: c.canvasSoft, color: c.ink, border: `1px solid ${c.hairline}`, textAlign: "left" }} onClick={() => onNav(prev.id)}>← {label(prev.id)}</button>
        : <div style={{ flex: 1 }} />}
      {next
        ? <button style={{ ...base, background: c.primary, color: "#fff", textAlign: "right" }} onClick={() => onNav(next.id)}>{label(next.id)} →</button>
        : <div style={{ flex: 1 }} />}
    </div>
  );
}

function Nav({ page, onNav }) {
  const [open, setOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const ref = useRef(null);
  useEffect(() => {
    function handle(e) { if (ref.current && !ref.current.contains(e.target)) { setOpen(null); setMenuOpen(false); } }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);
  const activeGroup = NAV_GROUPS.findIndex(g => g.sections.some(x => x.id === page));
  const nb = { background: "none", border: "none", fontFamily: font, cursor: "pointer" };
  const meta = SECTION_META[page];
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <nav ref={ref} style={{ background: c.canvas, borderBottom: `1px solid ${c.hairline}`, boxShadow: "0 1px 3px rgba(13,37,61,0.04)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", minHeight: "52px", gap: "4px" }}>
          <button onClick={() => { onNav("home"); setOpen(null); setMenuOpen(false); }} style={{ ...nb, color: c.ink, fontWeight: page === "home" ? 500 : 400, fontSize: "15px", padding: "14px 16px 14px 0", marginRight: "8px", letterSpacing: "-0.3px", flexShrink: 0 }}>
            Understanding AI
          </button>
          {isMobile ? (
            <>
              {meta && <span style={{ fontSize: "13px", color: c.inkMute, flex: 1, textAlign: "right", marginRight: "10px" }}>{meta.num}/{TOTAL}</span>}
              <button onClick={() => setMenuOpen(m => !m)} style={{ ...nb, color: c.inkMute, fontSize: "18px", padding: "8px", marginLeft: meta ? "0" : "auto" }} aria-label="Menu">
                {menuOpen ? "✕" : "☰"}
              </button>
              {menuOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: c.canvas, borderBottom: `1px solid ${c.hairline}`, zIndex: 300, maxHeight: "80vh", overflowY: "auto", boxShadow: "0 8px 24px rgba(13,37,61,0.08)" }}>
                  {NAV_GROUPS.map((g, gi) => (
                    <div key={gi}>
                      <div style={{ padding: "12px 20px 4px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1px", color: c.inkMute, fontWeight: 400 }}>{g.label}</div>
                      {g.sections.map(sec => (
                        <button key={sec.id} onClick={() => { onNav(sec.id); setMenuOpen(false); }} style={{ ...nb, display: "block", width: "100%", textAlign: "left", color: page === sec.id ? c.primary : c.inkSec, fontSize: "15px", padding: "10px 20px 10px 28px", background: page === sec.id ? c.primaryBg : "none", borderLeft: page === sec.id ? `2px solid ${c.primary}` : "2px solid transparent" }}>
                          {sec.label}
                        </button>
                      ))}
                    </div>
                  ))}
                  <div style={{ borderTop: `1px solid ${c.hairline}`, margin: "8px 0" }} />
                  <div style={{ padding: "8px 16px 16px" }}>
                    <button onClick={() => { onNav("explore"); setMenuOpen(false); }} style={{ ...nb, display: "block", width: "100%", textAlign: "center", color: "#fff", background: c.primary, fontSize: "15px", padding: "11px 16px", borderRadius: "9999px" }}>
                      Explore AI →
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {NAV_GROUPS.map((g, gi) => {
                const isActive = activeGroup === gi;
                const isOpen = open === gi;
                return (
                  <div key={gi} style={{ position: "relative" }}>
                    <button onClick={() => setOpen(isOpen ? null : gi)} style={{ ...nb, color: isActive ? c.primary : c.inkSec, fontSize: "14px", padding: "14px 10px", borderBottom: isActive ? `2px solid ${c.primary}` : "2px solid transparent", marginBottom: "-1px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "4px", fontWeight: isActive ? 400 : 300 }}>
                      {g.label}<span style={{ fontSize: "9px", opacity: 0.5 }}>{isOpen ? "▲" : "▼"}</span>
                    </button>
                    {isOpen && (
                      <div style={{ position: "absolute", top: "calc(100% + 1px)", left: 0, background: c.canvas, border: `1px solid ${c.hairline}`, borderRadius: "8px", minWidth: "210px", zIndex: 200, boxShadow: "0 8px 24px rgba(13,37,61,0.08)", overflow: "hidden" }}>
                        {g.sections.map(sec => (
                          <button key={sec.id} onClick={() => { onNav(sec.id); setOpen(null); }} style={{ ...nb, display: "block", width: "100%", textAlign: "left", color: page === sec.id ? c.primary : c.ink, fontSize: "14px", padding: "10px 16px", background: page === sec.id ? c.primaryBg : "none", borderLeft: page === sec.id ? `2px solid ${c.primary}` : "2px solid transparent" }}>
                            {sec.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ flex: 1 }} />
              <button onClick={() => { onNav("explore"); setOpen(null); }} style={{ ...nb, background: page === "explore" ? c.primaryPress : c.primary, color: "#fff", fontSize: "14px", padding: "8px 18px", borderRadius: "9999px", fontWeight: 400, flexShrink: 0, letterSpacing: "-0.1px" }}>
                Explore AI
              </button>
            </>
          )}
        </div>
      </nav>
      {meta && <ProgressBar id={page} />}
    </div>
  );
}

function HomePage({ onNav }) {
  let sectionNum = 0;
  return (
    <div style={{ background: c.canvas }}>
      {/* Gradient mesh hero */}
      <div style={{
        background: `
          radial-gradient(ellipse 100% 80% at -5% 55%, rgba(245,233,212,0.9) 0%, transparent 52%),
          radial-gradient(ellipse 75% 65% at 98% 8%,  rgba(185,185,249,0.85) 0%, transparent 48%),
          radial-gradient(ellipse 60% 50% at 68% 98%, rgba(249,107,238,0.22) 0%, transparent 42%),
          radial-gradient(ellipse 50% 45% at 22% 4%,  rgba(83,58,253,0.18)   0%, transparent 44%),
          radial-gradient(ellipse 40% 30% at 88% 52%, rgba(234,34,97,0.1)    0%, transparent 38%),
          #eef2ff
        `,
        padding: "clamp(64px,10vw,110px) clamp(20px,5vw,60px) clamp(64px,9vw,90px)",
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ ...s.pill, marginBottom: "24px" }}>A Framework for Liberal Arts Educators</div>
          <h1 style={{ fontFamily: font, fontSize: "clamp(32px,6vw,52px)", fontWeight: 300, lineHeight: 1.06, letterSpacing: "-1.4px", color: c.ink, marginBottom: "20px" }}>
            Understanding AI:<br />
            <span style={{ color: c.primary }}>What It Is, What It Isn't,<br />and What No One Knows</span>
          </h1>
          <p style={{ fontSize: "clamp(16px,2.5vw,18px)", color: c.inkSec, marginBottom: "36px", maxWidth: "520px", lineHeight: 1.6, letterSpacing: "-0.1px" }}>
            A journey through what AI is, what it can't do, and what its rise means for humanity and society. Each section has primary source links and discussion questions.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => onNav("what")} style={{ background: c.primary, color: "#fff", border: "none", padding: "12px 26px", borderRadius: "9999px", fontFamily: font, fontSize: "15px", fontWeight: 400, cursor: "pointer", letterSpacing: "-0.1px" }}>
              Begin Reading →
            </button>
            <button onClick={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "rgba(255,255,255,0.65)", color: c.ink, border: `1px solid ${c.hairline}`, padding: "12px 26px", borderRadius: "9999px", fontFamily: font, fontSize: "15px", fontWeight: 400, cursor: "pointer", letterSpacing: "-0.1px", backdropFilter: "blur(8px)" }}>
              See Overview
            </button>
          </div>
        </div>
      </div>

      {/* Part overview */}
      <div id="overview" style={{ maxWidth: "960px", margin: "0 auto", padding: "clamp(48px,7vw,80px) clamp(20px,5vw,40px) 100px" }}>
        <h2 style={{ fontFamily: font, fontSize: "clamp(18px,3vw,22px)", fontWeight: 300, letterSpacing: "-0.4px", color: c.ink, marginBottom: "8px", border: "none", paddingBottom: 0 }}>What you'll cover</h2>
        <p style={{ color: c.inkMute, fontSize: "15px", marginBottom: "36px", letterSpacing: "-0.1px" }}>
          Ten sections across five parts. Read in order or jump to any section.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {NAV_GROUPS.map((g, gi) => (
            <div key={gi} style={{ border: `1px solid ${c.hairline}`, borderRadius: "12px", padding: "24px", background: c.canvas, boxShadow: "0 1px 3px rgba(13,37,61,0.04)" }}>
              <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1px", color: c.inkMute, fontWeight: 400, marginBottom: "8px" }}>Part {gi + 1}</div>
              <div style={{ fontFamily: font, fontSize: "17px", fontWeight: 300, letterSpacing: "-0.3px", color: c.ink, marginBottom: "16px" }}>{g.label}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {g.sections.map(sec => {
                  sectionNum++;
                  const n = sectionNum;
                  return (
                    <button key={sec.id} onClick={() => onNav(sec.id)} style={{ background: "none", border: "none", textAlign: "left", fontFamily: font, fontSize: "14px", color: c.primary, cursor: "pointer", padding: "5px 0", letterSpacing: "-0.1px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "20px", height: "20px", borderRadius: "9999px", border: `1px solid ${c.hairline}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: c.inkMute, flexShrink: 0, fontFeatureSettings: '"tnum"' }}>{n}</span>
                      {sec.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{ border: `1px solid ${c.primary}`, borderRadius: "12px", padding: "24px", background: c.primaryBg }}>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1px", color: c.primaryDeep, fontWeight: 400, marginBottom: "8px" }}>After the guide</div>
            <div style={{ fontFamily: font, fontSize: "17px", fontWeight: 300, letterSpacing: "-0.3px", color: c.dark, marginBottom: "12px" }}>Try It Yourself</div>
            <p style={{ fontSize: "14px", color: c.inkSec, marginBottom: "18px", lineHeight: 1.55 }}>Four AI apps with prompts designed to test the claims made throughout the guide.</p>
            <button onClick={() => onNav("explore")} style={{ background: c.primary, color: "#fff", border: "none", padding: "9px 20px", borderRadius: "9999px", fontFamily: font, fontSize: "14px", fontWeight: 400, cursor: "pointer", letterSpacing: "-0.1px" }}>
              Explore AI →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatPage() {
  return (
    <div>
      <SectionBadge id="what" />
      <h2 style={s.h2}>What It Actually Is</h2>
      <p style={s.p}>AI is pattern recognition at massive scale. It is not reasoning or understanding in a human sense. Large language models are trained on human-generated text and predict plausible continuations of it — a compression of recorded human thought. The key claim that follows: AI reflects human knowledge back at us. It is a mirror, not a mind. AGI — artificial general intelligence, the hypothetical system that could reason across domains the way humans do — would be something categorically different. We do not have it. Whether we ever will is one of the genuinely open questions this guide returns to.</p>
      <p style={s.p}>Because it is a mirror, it can only create within the universe of what already exists. It recombines; it does not originate. It optimizes within a given framework; it does not ask why the framework exists. And because it is trained to produce plausible-sounding output, it is confident and fluent even when it is wrong. The most dangerous output is the one that sounds most assured.</p>
      <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="3Blue1Brown: But what is a GPT?" url="https://www.youtube.com/watch?v=wjZofJX0v4M" />{" · "}<Ref label="Anthropic: Constitutional AI" url="https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback" /></div>
      <Video id="LPZh9BOjkQs" caption="3Blue1Brown: Large Language Models explained briefly — the clearest visual introduction to how these systems actually work." />
      <DQ questions={["If AI is a compression of recorded human thought, what does it mean that most of human thought was never written down?", "What is the difference between predicting a plausible next word and understanding what a sentence means? Is there a difference that matters?", "'A mirror, not a mind' sounds clear — but what would you need to believe about minds for that distinction to hold?", "We say a thermostat 'knows' the room is cold. At what point does that way of speaking become misleading?"]} />
    </div>
  );
}

function GoodPage() {
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
      <DQ questions={["List tasks in your discipline that AI can now perform adequately. What do they have in common? What do they lack?", "If AI can write a competent literary analysis, was the exercise of writing it ever primarily about the analysis — or about something else?", "What is the difference between an AI that can summarize Kant and a student who understands Kant? Degree or kind?", "If students use AI to generate first drafts, what intellectual work remains? Is it more or less valuable than what came before?"]} />
    </div>
  );
}

function BadPage() {
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
      <DQ questions={["AI confidently produces false information. What habits of mind protect a reader from confident falsehoods in general — from any source?", "AI produces 'the statistically average.' Is that also what most human writing does? What's the difference?", "AI doesn't know what it doesn't know. What examples of humans suffering the same problem come to mind? What, if anything, is different?", "A student submits a paper that is entirely factually accurate but AI-generated. What, if anything, has been lost?"]} />
    </div>
  );
}

function TransformPage() {
  return (
    <div>
      <SectionBadge id="transform" />
      <h2 style={s.h2}>Where It Can Already Transform Society</h2>
      <p style={s.p}>Even at its current level — before any question of AGI — AI is powerful enough to inflect significant change in how humanity addresses its hardest problems. This is not speculation. It is already happening.</p>
      <h3 style={s.h3}>Medical and Scientific Research</h3>
      <p style={s.p}>AI's best fit is finding non-obvious patterns in vast bodies of existing data: genomics, drug interactions, imaging, literature reviews spanning thousands of papers no single researcher could read in a lifetime. The key distinction is that AI isn't being asked to assert truth — it surfaces candidates for human validation. That is a much better match for what these systems actually do.</p>
      <p style={s.p}>What would take researchers years of effort, or a fortunate accident of insight, AI can surface systematically. Accelerated drug discovery, earlier disease detection, connections across siloed research bodies — the quality of life implications are real.</p>
      <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="DeepMind AlphaFold: Solving the protein folding problem" url="https://deepmind.google/technologies/alphafold/" />{" · "}<Ref label="Nature: AI in drug discovery" url="https://www.nature.com/articles/s41573-019-0024-5" /></div>
      <Video id="Y48UmC3ODFk" caption="AlphaFold and the End of the Protein Folding Problem — a concrete example of AI doing something that would have taken humans decades." />
      <h3 style={s.h3}>Writing Software</h3>
      <p style={s.p}>Code is the most AI-compatible domain because it is objectively verifiable — it runs, or it doesn't. Software is also the most malleable material we have: it changes instantly, costs nothing to iterate, has no physical constraints. AI compresses the distance between having an idea and having a working prototype. People who could imagine things but lacked the means to build them now can. The more interesting question isn't which jobs disappear but what gets built that never would have been attempted.</p>
      <h3 style={s.h3}>Economic Impact: The Jobs Already at Risk</h3>
      <p style={s.p}>Every previous wave of automation displaced physical labor: the loom replaced the weaver, the tractor replaced the field hand, the assembly line replaced the craftsman. The new jobs that followed were, by and large, cognitive — requiring language, analysis, judgment. Those jobs were considered safe precisely because machines couldn't do them.</p>
      <p style={s.p}>AI breaks that pattern. The jobs most immediately at risk are not physical — they are cognitive, credentialed, and white-collar. Goldman Sachs estimated in 2023 that 300 million jobs globally are exposed to AI automation, with two-thirds of occupations having at least a quarter of their tasks automatable today. McKinsey's research suggests AI could technically automate up to 57% of US work hours. The most exposed roles include paralegal work, financial analysis, customer service, medical transcription, basic journalism, and entry-level software development — jobs that, a decade ago, were considered the safe destination for people displaced by factory automation.</p>
      <p style={s.p}>The optimistic counter-argument is that technology has always created more jobs than it destroyed — and historically, that has been true. The question is whether the speed and breadth of AI displacement will outpace the labor market's ability to adapt, and whether the new jobs it creates will be accessible to the people whose jobs it eliminates. A 55-year-old paralegal and a 22-year-old computer science graduate are not equivalently positioned to pivot.</p>
      <p style={s.p}>The more pointed question — especially for students in liberal arts fields — is whether the jobs that survive will be the ones that require exactly what a liberal arts education develops: original judgment, ethical reasoning, the ability to navigate ambiguity, and communication that actually moves people. That argument is available. It is also possibly self-serving, and worth examining with some rigor.</p>
      <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="Goldman Sachs: How AI Will Affect the US Labor Market" url="https://www.goldmansachs.com/insights/articles/how-will-ai-affect-the-us-labor-market" />{" · "}<Ref label="McKinsey: Generative AI and the Future of Work in America" url="https://www.mckinsey.com/mgi/our-research/generative-ai-and-the-future-of-work-in-america" /></div>
      <Video id="t1gLIc9ebiE" caption="MIT economist and Nobel laureate Daron Acemoglu on why America is unprepared for the economic storm caused by AI — a rigorous, skeptical counterpoint to the productivity optimists." />
      <h3 style={s.h3}>The Question That Determines the Magnitude</h3>
      <p style={s.p}>The transformations above are already underway — and they rest on AI doing what current systems do well: finding patterns, surfacing candidates, automating the legible. The scale of societal change from here depends almost entirely on one unresolved question: can AI equal or surpass human reason?</p>
      <p style={s.p}>If the answer is no — if today's capabilities are near their ceiling — then AI is a powerful tool that augments human work, much as previous technologies have. Significant change, but change within a recognizable world. If the answer is yes — if AI continues advancing at the pace of the last several years and eventually achieves general reasoning — then the nature of the change is categorically different. Not just more efficient humans, but a world in which the comparative advantage of being human is genuinely unclear.</p>
      <div style={s.pq}>The judgment students need to make isn't technical. It's philosophical: is human-level reasoning something a machine can achieve — and if it is, what does that mean for what humans are for?</div>
      <DQ questions={["AI surfaces patterns humans wouldn't find in a lifetime. Does a discovery made by AI carry the same weight as one made by a human researcher? Why or why not?", "Every prior wave of automation displaced physical labor and created cognitive jobs. AI displaces cognitive labor. What kind of jobs does it create — and who gets them?", "Goldman Sachs estimates 300 million jobs are exposed to AI automation. McKinsey says AI could automate 57% of US work hours. What's the difference between 'exposed to' and 'will be replaced by' — and does that distinction hold under sustained AI advancement?", "The section argues liberal arts skills may be exactly what survives automation — but notes this argument is possibly self-serving. Steelman the skeptical position: what if judgment and communication are also automatable?", "The section argues today's AI is already transformative but the magnitude of future change depends on whether it can match human reason. Do you find that framing convincing? What's missing from it?", "Has any previous technology created a moment where humans genuinely had to ask what they were for? What happened — and what does that suggest about now?"]} />
    </div>
  );
}

function BeliefsPage() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <SectionBadge id="beliefs" />
      <h2 style={s.h2}>The Believers</h2>
      <p style={s.p}>The entire debate hinges on one unresolved question: whether current AI architectures are fundamentally limited, or whether scale and refinement will eventually produce something qualitatively different. Nobody knows. What follows from that uncertainty are not conclusions but belief systems — and they deserve to be examined as such.</p>
      <p style={s.p}>The right question to ask about any of these camps isn't only what they predict but what they <em>need</em> to be true, and why.</p>
      <div style={{ marginTop: "24px" }}>
        {CAMPS.map((camp, i) => (
          <div key={i} style={{ marginBottom: "8px", border: `1px solid ${c.hairline}`, borderRadius: "10px", background: open === i ? c.canvasSoft : c.canvas, overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontFamily: font, flexWrap: "wrap" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: camp.color, flexShrink: 0 }} />
              <span style={{ fontWeight: 500, fontSize: "15px", color: c.ink, letterSpacing: "-0.2px" }}>{camp.name}</span>
              <span style={{ fontSize: "13px", color: c.inkMute, flex: 1, minWidth: "120px" }}>{camp.people}</span>
              <span style={{ color: c.primary, fontSize: "18px", marginLeft: "auto" }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 18px 18px 38px" }}>
                {camp.belief.split("\n\n").map((para, pi) => <p key={pi} style={{ ...s.p, fontSize: "15px" }}>{para}</p>)}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>{camp.links.map((l, j) => <Ref key={j} label={l.label} url={l.url} />)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Video id="2Nn0-kAE5c0" caption="Ezra Klein interviews Eliezer Yudkowsky — the clearest accessible presentation of the doomer case, from its most committed advocate." />
      <h3 style={s.h3}>Why Your Position Here Matters for Everything That Follows</h3>
      <p style={s.p}>These five camps aren't just competing forecasts about technology. They are competing answers to a prior question: what kind of thing is human reasoning, and can a machine do it? Your intuition about that question — however unexamined — will shape how you read everything that comes next in this guide.</p>
      <p style={s.p}>The hard questions about consciousness and the mirror problem look different depending on which camp you find credible. If you're a Deflationist, the mirror problem is already solved: AI is sophisticated autocomplete, and the question of machine consciousness is a category error. If you're a Utopian or a Doomer, the mirror problem is urgent and unresolved — and the answer has civilizational stakes. The Emergentist position may be the most uncomfortable: capabilities we didn't design keep appearing, which means we genuinely don't know what we're dealing with.</p>
      <p style={s.p}>For educators, the stakes are direct. If the Deflationists are right, liberal arts education needs modest adjustment — AI is a powerful tool, and the work of interpretation and judgment remains safely human. If the Utopians or Doomers are right, the question of what education is for becomes urgent and genuinely open. If the Pragmatists are right, we have time to adapt thoughtfully. If the Emergentists are right, we're adapting in real time without knowing what we're adapting to.</p>
      <p style={s.p}>For students, the question is personal: which world do you think you're going to inhabit? The answer you give — even provisionally, even uncertainly — is the most important variable in deciding what to do with your education, what skills to cultivate, and what kind of reasoning to practice. The goal isn't to pick the right camp. It's to reason through each one seriously enough that your position is actually yours.</p>
      <DQ questions={["Which of the five camps best describes your current intuition — and what would it take to change your mind?", "Which position most resembles a religious belief in its structure — not its content? What makes something 'religious' in this sense?", "Anthropic's founders say they may be building something dangerous and are building it anyway. Is that a defensible ethical position? What moral framework supports it?", "If the Emergentists are right — if capabilities keep appearing that nobody predicted — what does that imply for how we should make decisions about AI development?", "Pick the camp you find least credible. Make the strongest possible case for it. What does that exercise reveal?", "If you had to assign a probability to AGI in your lifetime, what would it be — and what does that number actually commit you to believing?"]} />
    </div>
  );
}

function FuturesPage() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <SectionBadge id="futures" />
      <h2 style={s.h2}>Five Futures</h2>
      <p style={s.p}>The preceding sections describe AI as it currently is. This one is different. These are not predictions — they are hypotheses about what AI might become, each framed as a claim about human nature as much as a technical forecast. They are worth examining not to determine which is correct, but to see what each one implies about what you believe humanity is for.</p>
      <p style={s.p}>For each scenario, there are two questions worth sitting with. The first assumes the most optimistic reading of that future. The second assumes the most pessimistic. Neither has a right answer. But you cannot answer either without committing to a view about what matters.</p>
      <div style={{ marginTop: "28px" }}>
        {FUTURES.map((f, i) => (
          <div key={i} style={{ marginBottom: "10px", border: `1px solid ${c.hairline}`, borderRadius: "10px", background: open === i ? c.canvasSoft : c.canvas, overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", fontFamily: font, flexWrap: "wrap" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: f.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 500, fontSize: "15px", color: c.ink, letterSpacing: "-0.2px" }}>{f.name}</span>
                <span style={{ fontSize: "13px", color: c.inkMute, marginLeft: "10px", fontStyle: "italic" }}>{f.tagline}</span>
              </div>
              <span style={{ color: c.primary, fontSize: "18px" }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 18px 20px 38px" }}>
                <p style={{ ...s.p, fontSize: "15px" }}>{f.description}</p>
                <p style={{ ...s.p, fontSize: "15px" }}>{f.humanQuestion}</p>
                <div style={{ borderLeft: `3px solid ${f.color}`, paddingLeft: "16px", margin: "16px 0" }}>
                  <p style={{ ...s.p, fontSize: "14px", fontStyle: "italic", marginBottom: "10px" }}><strong style={{ fontStyle: "normal", color: c.ink }}>If the optimists are right:</strong> {f.optimistQ}</p>
                  <p style={{ ...s.p, fontSize: "14px", fontStyle: "italic", marginBottom: 0 }}><strong style={{ fontStyle: "normal", color: c.ink }}>If the pessimists are right:</strong> {f.pessimistQ}</p>
                </div>
                {f.links.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>{f.links.map((l, j) => <Ref key={j} label={l.label} url={l.url} />)}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ ...s.box, marginTop: "36px" }}>
        <div style={{ position: "absolute", top: "-10px", left: "16px", background: c.canvas, padding: "0 8px", fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: c.inkMute, fontWeight: 400 }}>The Central Questions</div>
        <p style={{ ...s.p, marginBottom: "10px" }}>If the most optimistic vision comes true — does that vindicate or hollow out the things you value most?</p>
        <p style={{ margin: 0, color: c.inkSec }}>If the most pessimistic vision comes true — what does that say about what we were?</p>
      </div>
      <DQ questions={["Which of these five scenarios do you find most plausible? Which do you find most threatening — not to civilization, but to the specific things you personally care about?", "The Abundance scenario promises to solve material suffering. If it succeeds, does that vindicate or undermine the tradition of thought that found meaning partly through confronting limitation?", "The Displacement scenario doesn't require AI to be superintelligent — just good enough and cheap enough. Are we already inside it?", "The Augmentation scenario sounds benign. What is it about unaided human cognition that you'd want to protect — and is that protection realistic, or is it nostalgia?", "Each scenario implies a different answer to the question 'what are humans for?' Which answer do you find most defensible? What does that reveal about your values?", "If you had to design an education system for the most likely future, what would it teach? What would it stop teaching?"]} />
    </div>
  );
}

function MirrorPage() {
  return (
    <div>
      <SectionBadge id="mirror" />
      <h2 style={s.h2}>The Mirror Problem</h2>
      <p style={s.p}>This is the philosophical center of the entire debate, and almost nobody engaged in it acknowledges the fact.</p>
      <p style={s.p}>When someone claims AI is merely pattern matching and therefore not truly intelligent, they are implicitly claiming human cognition is something <em>more</em> than pattern matching. That claim requires defending — and neuroscience hasn't delivered a clean account of what that "more" is. When someone claims AI will achieve general intelligence, they're assuming general intelligence is a definable target, which requires knowing what human general intelligence consists of. There is no consensus on that either.</p>
      <p style={s.p}>Every confident assertion about what AI can or cannot ultimately do smuggles in an unexamined theory of mind. The prophets on all sides are committed to a philosophy of consciousness they've never had to defend, because nobody asked.</p>
      <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="Searle: The Chinese Room (Stanford Encyclopedia)" url="https://plato.stanford.edu/entries/chinese-room/" />{" · "}<Ref label="Chalmers: The Hard Problem of Consciousness" url="https://plato.stanford.edu/entries/consciousness/#HarProCon" />{" · "}<Ref label="Wittgenstein on Meaning and Use" url="https://plato.stanford.edu/entries/wittgenstein/" /></div>
      <Video id="uhRhtFFhNzQ" caption="David Chalmers: How do you explain consciousness? — the TED talk that introduced the 'hard problem' to a general audience, directly relevant to every claim made about AI intelligence." />
      <h3 style={s.h3}>The Boundary of the Knowable</h3>
      <p style={s.p}>You don't need to resolve the neuroscience to see what AI is bounded by. AI can only be trained on what has been observed, recorded, and formalized. Its entire existence is within the universe of human-expressible knowledge. That is not a technical limitation awaiting a fix. It is inherent and permanent — a consequence of what it means to learn from recorded human expression.</p>
      <p style={s.p}>Human reason has always operated at the edge of the expressible. The things that have mattered most — meaning, the sacred, love, mortality, beauty, justice — resist formalization not because we haven't tried hard enough, but because precision is the wrong instrument for them. If the unknowable is more the domain of human reason, perhaps permanently, then the boundary between AI and human intelligence isn't a gap better engineering closes. It was never open to engineering.</p>
      <div style={s.box}>
        <div style={{ position: "absolute", top: "-10px", left: "16px", background: c.canvas, padding: "0 8px", fontSize: "11px", letterSpacing: "0.1px", textTransform: "uppercase", color: c.inkMute, fontWeight: 400 }}>Central Argument</div>
        AI is the most powerful instrument of the knowable ever built. The most important human questions have never been fully knowable. That is not a temporary condition waiting on better technology. It may be a permanent one.
      </div>
      <p style={s.p}>Students who have read Descartes on the mind-body problem, Wittgenstein on meaning, Searle's Chinese Room, or Buddhist philosophy on the nature of self are not approaching this debate from behind. They're approaching it with tools most of the people building these systems don't have.</p>
      <DQ questions={["Searle's Chinese Room argues a system can manipulate symbols correctly without understanding them. Does this apply to modern AI? What would it take to refute it?", "If human cognition is also, at some level, pattern recognition in neural tissue — what follows? Does the substrate matter, or only the function?", "Name three things that matter deeply to you that you couldn't fully explain to someone else. What does it mean that they matter if they resist articulation?", "Is the distinction between 'knowing' and 'understanding' real, or a matter of degree? If real, how would you demonstrate it?", "If the most important questions are unknowable in the scientific sense, does that make them less real?"]} />
    </div>
  );
}

function UnknownPage() {
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
      <DQ questions={["What is the difference between a question that is unanswered and one that is unanswerable? Give examples from your field.", "The societal feedback loop question suggests AI use may change what we are capable of. What historical precedents exist for a technology changing human cognitive capacity?", "If capabilities emerge in AI that nobody designed or predicted, what does that tell us about our ability to control the technology?", "How should one act under genuine uncertainty about high-stakes outcomes? What does your philosophical tradition say?"]} />
    </div>
  );
}

function LiberalPage() {
  return (
    <div>
      <SectionBadge id="liberal" />
      <h2 style={s.h2}>What This Means for a Liberal Arts Education</h2>
      <p style={s.p}>The core of liberal arts education is precisely what AI cannot do today: interpretation, original theoretical argument, ethical reasoning that accepts responsibility for its conclusions, aesthetic judgment grounded in genuine experience. These aren't activities AI handles adequately for now. They require a self that has something at stake.</p>
      <p style={s.p}>The threatened middle is real. Mechanical writing, basic research summaries, rote analysis — AI handles these adequately. But the deliverable was never the point of assigning them. The development of a mind capable of more was the point. AI makes that distinction urgent in a way it wasn't before.</p>
      <p style={s.p}>If a student uses AI to produce an argument, the student does not have the argument. They have a document that has imitated someone else's already-made argument. But if this is so trivial to generate, what ought students be doing instead? And crucially, if AI advances well beyond its current capabilities — if AI becomes superior to humans, even — what ought humans to do? Today, liberal arts is safe, and indeed more valuable than ever before. Judgment and taste remain a distinctly human domain, best cultivated by the liberal arts. We should re-evaluate education in light of AI's capabilities to augment human reason, but we also need to confront the possibility of AI surpassing humans in these particular ways.</p>
      <div style={s.pq}>The liberal arts has always been the discipline of the gap between what can be said and what is true. AI doesn't make that tradition obsolete. Whether AI can ever close that gap is precisely the question — and it's one the liberal arts is better equipped to ask than any other field.</div>
      <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="The Atlantic: The End of the Essay" url="https://www.theatlantic.com/technology/archive/2022/12/chatgpt-ai-writing-college-student-essays/672371/" />{" · "}<Ref label="Stanford HAI: AI and Teaching" url="https://hai.stanford.edu/news/ai-will-transform-teaching-and-learning-lets-get-it-right" /></div>
      <DQ questions={["What is a liberal arts education actually for? Has your answer changed in light of AI?", "If the deliverable was never the point, what was — and how do you know when that point has been achieved?", "A student submits a thoughtful, well-edited AI-generated paper. Another submits a clumsy, genuine attempt at the same argument. Which has gotten more from the assignment? Which has gotten more from their education?", "What would it mean to redesign university education around the premise that AI handles first drafts? What would remain?", "Where in your own field is the gap between 'having a document' and 'having an argument' most important?"]} />
    </div>
  );
}

function StudentsPage() {
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
      <DQ questions={["What is a task you use AI for regularly? What would happen to your thinking if you stopped?", "What is the difference between using AI to help you think and using it instead of thinking? Can you always tell which you are doing?", "If judgment is now the scarce resource, what are you doing to develop yours?", "Write one sentence about what you think your education is for. Then ask an AI to write the same sentence. Compare them.", "Which of the five futures in the previous section do you most hope is true? Which do you most fear? Are those the same scenario?"]} />
    </div>
  );
}

function ExplorePage() {
  const [tab, setTab] = useState("apps");
  return (
    <div>
      <div style={{ ...s.pill, marginBottom: "24px" }}>After the Guide</div>
      <h2 style={s.h2}>Try It Yourself</h2>
      <p style={s.p}>The best way to form a view about what AI can and cannot do is to use it seriously. Below are apps worth trying and prompts designed to push past the surface.</p>
      <div style={{ display: "flex", gap: 0, marginBottom: "28px", borderBottom: `1px solid ${c.hairline}` }}>
        {[{ id: "apps", label: "Apps" }, { id: "prompts", label: "Classroom Prompts" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", color: tab === t.id ? c.primary : c.inkMute, border: "none", borderBottom: tab === t.id ? `2px solid ${c.primary}` : "2px solid transparent", padding: "10px 20px", fontFamily: font, fontSize: "14px", fontWeight: tab === t.id ? 500 : 300, cursor: "pointer", marginBottom: "-1px", letterSpacing: "-0.1px" }}>{t.label}</button>
        ))}
      </div>
      {tab === "apps" && EXPLORE_APPS.map((app, i) => (
        <div key={i} style={{ marginBottom: "32px", paddingBottom: "28px", borderBottom: i < EXPLORE_APPS.length - 1 ? `1px solid ${c.hairline}` : "none" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
            <a href={app.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: font, fontWeight: 500, fontSize: "17px", color: c.ink, textDecoration: "none", letterSpacing: "-0.3px" }}>{app.name} ↗</a>
            <span style={{ fontSize: "12px", color: c.inkMute, background: c.canvasSoft, border: `1px solid ${c.hairline}`, padding: "2px 8px", borderRadius: "9999px" }}>{app.type}</span>
          </div>
          <p style={{ ...s.p, fontSize: "14px", marginBottom: "12px" }}><em>{app.best}</em></p>
          {app.prompts.map((p, j) => (
            <div key={j} style={{ background: c.canvasSoft, border: `1px solid ${c.hairline}`, borderRadius: "8px", padding: "11px 14px", marginBottom: "8px", fontSize: "14px", fontStyle: "italic", color: c.inkSec }}>"{p}"</div>
          ))}
        </div>
      ))}
      {tab === "prompts" && (
        <div>
          <p style={{ ...s.p, fontSize: "14px" }}>Use any app above. These prompts test the claims made throughout the guide.</p>
          {CLASSROOM_PROMPTS.map((cat, i) => (
            <div key={i} style={{ marginBottom: "36px" }}>
              <div style={{ fontFamily: font, fontWeight: 500, fontSize: "15px", letterSpacing: "-0.2px", marginBottom: "10px", color: c.ink }}>{cat.category}</div>
              {cat.note && <p style={{ fontSize: "13px", color: c.inkMute, marginBottom: "12px", lineHeight: 1.6, fontStyle: "italic" }}>{cat.note}</p>}
              {cat.prompts.map((p, j) => (
                <div key={j} style={{ background: c.canvasSoft, borderLeft: `3px solid ${c.primary}`, borderRadius: "0 8px 8px 0", padding: "11px 14px", marginBottom: "8px", fontSize: "14px", fontStyle: "italic", color: c.inkSec }}>{p}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const PAGES = { home: HomePage, what: WhatPage, good: GoodPage, bad: BadPage, transform: TransformPage, beliefs: BeliefsPage, futures: FuturesPage, mirror: MirrorPage, unknown: UnknownPage, liberal: LiberalPage, students: StudentsPage, explore: ExplorePage };

export default function App() {
  const [page, setPage] = useState("home");
  const nav = id => { setPage(id); setTimeout(() => window.scrollTo({ top: 0 }), 10); };
  const Page = PAGES[page] || HomePage;
  return (
    <div style={s.page}>
      <Nav page={page} onNav={nav} />
      {page === "home"
        ? <Page onNav={nav} />
        : (
          <div style={s.content}>
            <Page onNav={nav} />
            {page !== "explore" && <Arrows current={page} onNav={nav} />}
          </div>
        )
      }
      <div style={{ background: c.canvasSoft, borderTop: `1px solid ${c.hairline}`, padding: "24px", fontSize: "13px", color: c.inkMute, textAlign: "center", letterSpacing: "-0.1px" }}>
        The field moves quickly. The philosophical questions do not.
      </div>
    </div>
  );
}
