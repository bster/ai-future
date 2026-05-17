export const CAMPS = [
  {
    name: "The Utopians",
    color: "#c07d3a",
    people: "Kurzweil, Altman, the OpenAI thesis",
    belief: "AGI is imminent, and its arrival is the most important event in human history. The argument is structural: compute scales exponentially, model capability tracks compute, capital flows toward whatever is working, and the trends have not bent. Extrapolate them, and human-level reasoning by machine is not just possible but probable in the near term. Disease, scarcity, and the friction of physical limitation begin to dissolve. For some in this camp — Kurzweil most explicitly — death itself becomes optional.\n\nThe religious parallel is a Rapture narrative. But it is not only that: the structural case for continued progress is real, and dismissing it requires explaining why exponential trends that have held will suddenly stop. The criticism worth making is not that Utopians are foolish. It is that they are committed to an extrapolation they have not had to defend, and the consequences of being wrong about it are asymmetric.",
    links: [
      { label: "Sam Altman: The Intelligence Age", url: "https://ia.samaltman.com/" },
      { label: "Kurzweil: The Singularity is Nearer", url: "https://www.sciencefriday.com/segments/ray-kurzweil-the-singularity-is-nearer-book/" }
    ]
  },
  {
    name: "The Accelerationists",
    color: "#f96bee",
    people: "Marc Andreessen, the e/acc movement, parts of the venture-capital and crypto-adjacent right",
    belief: "Distinct from the Utopians, though often conflated with them. The Accelerationist case is less about AGI and more about competitive dynamics: AI is coming whether you want it or not, the only question is who builds it first. Safety concerns are dismissed as either naive (the technology will be developed regardless) or self-interested (incumbents using safety rhetoric to entrench themselves). The political valence is libertarian: any constraint on development is presumed to be a constraint on human flourishing.\n\nThe argument worth taking seriously is the competitive one — if frontier AI is built by entities indifferent to safety, having safety-focused labs at the frontier matters. The argument worth resisting is the slide from that observation to the conclusion that no constraint can be justified.",
    links: [
      { label: "Marc Andreessen: The Techno-Optimist Manifesto", url: "https://a16z.com/the-techno-optimist-manifesto/" },
      { label: "Marc Andreessen: Why AI Will Save The World", url: "https://pmarca.substack.com/p/why-ai-will-save-the-world" }
    ]
  },
  {
    name: "The Doomers",
    color: "#ea2261",
    people: "Eliezer Yudkowsky, MIRI — and, in a different key, Anthropic",
    belief: "AGI is coming and alignment is unsolvable. A sufficiently capable system optimizing for goals not perfectly matched to human values destroys humanity — not out of malice but indifference, the way humans destroy ant colonies to build highways. The religious parallel is a Fall narrative: hubris will be punished, and the punishment permanent.\n\nThe mechanism that makes this more than abstract pessimism is recursive self-improvement. An AI system capable of improving its own design produces a better system, which is more capable of further improvement still — each iteration raising the capability ceiling faster than the last. This could compress what might otherwise be decades of gradual development into a period too short for any human institution to respond. It is also the claim that most directly challenges the Safety Institutionalists: their entire position depends on there being time to build governance. Recursive self-improvement is the argument that there may not be.\n\nWithin this camp the disagreements matter. Yudkowsky is the purest expression: the problem is technically unsolvable on the current trajectory, and the responsible answer is to stop. Anthropic occupies a distinctive position. Its founders — Dario and Daniela Amodei among them, who left OpenAI over safety concerns — share the basic threat model but draw the opposite practical conclusion: if powerful AI is coming regardless, it is better to have safety-focused labs at the frontier than to cede that ground. A calculated Pascal's Wager at civilizational scale. The analogy is not a prophet warning from outside the gates. It is a Jesuit order working inside the institution they find both necessary and dangerous.\n\nNote: Stuart Russell is often grouped with this camp and shouldn't be. His argument is for a different formal framework — AI systems designed to remain uncertain about human values rather than to maximize stated objectives. He is a Safety Institutionalist, not a Doomer.",
    links: [
      { label: "Yudkowsky: AGI Ruin — A List of Lethalities", url: "https://www.alignmentforum.org/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities" },
      { label: "Dario Amodei: Machines of Loving Grace", url: "https://www.darioamodei.com/essay/machines-of-loving-grace" },
      { label: "FLI: Pause Giant AI Experiments — Open Letter", url: "https://futureoflife.org/open-letter/pause-giant-ai-experiments/" }
    ]
  },
  {
    name: "The Safety Institutionalists",
    color: "#4434d4",
    people: "Stuart Russell, much of academic AI policy, the UK AI Safety Institute, US NIST AI work",
    belief: "AGI may be coming, but it is governable. The right response is not to stop development and not to accelerate it, but to build the institutional, technical, and regulatory infrastructure that lets us steer it. This includes formal advances in AI design (Russell's CIRL, value uncertainty), domestic AI safety institutes with technical evaluation capacity, international coordination on frontier-model standards, and meaningful liability for harm. The argument they make against the Doomers is that despair is not a strategy. The argument they make against the Accelerationists is that 'inevitable' is a political choice dressed as a fact.",
    links: [
      { label: "Stuart Russell: Human Compatible (overview)", url: "https://people.eecs.berkeley.edu/~russell/hc.html" },
      { label: "80,000 Hours: Stuart Russell on why our approach to AI is broken", url: "https://80000hours.org/podcast/episodes/stuart-russell-human-compatible-ai/" },
      { label: "UK AI Safety Institute", url: "https://www.aisi.gov.uk/" }
    ]
  },
  {
    name: "The Deflationists",
    color: "#4a6741",
    people: "Emily Bender and Timnit Gebru (one strand); Gary Marcus (a different strand)",
    belief: "Current AI is sophisticated autocomplete. Scaling will hit a wall. The danger is not superintelligence — it is deploying flawed systems at scale and mistaking fluency for thought. These are the iconoclasts of the debate, and they have often been treated like heretics.\n\nWithin the camp the focus diverges. Bender and Gebru emphasize present harms: bias amplification at scale, exploitative labor in training data annotation, environmental cost, the laundering of authority through fluent prose. Marcus emphasizes structural limits: neural networks of this kind cannot achieve genuine reasoning, no matter how much data you throw at them, because they lack symbolic structure. Both wings agree that the AGI discourse is a distraction from concrete present-day problems and concrete present-day responsibilities. They disagree about what to do about it.",
    links: [
      { label: "Bender et al.: On the Dangers of Stochastic Parrots", url: "https://dl.acm.org/doi/10.1145/3442188.3445922" },
      { label: "Gary Marcus: ongoing AI criticism (Substack)", url: "https://garymarcus.substack.com/" },
      { label: "DAIR Institute — Timnit Gebru", url: "https://www.dair-institute.org/" }
    ]
  },
  {
    name: "The Pragmatists",
    color: "#64748d",
    people: "Yann LeCun, Demis Hassabis, Fei-Fei Li, Melanie Mitchell",
    belief: "Real but uneven progress. AGI, if it comes, requires fundamentally new approaches beyond today's autoregressive architectures. Today's systems are useful tools; they are not on a smooth path to general reasoning. This view gets less attention because it has no eschatological drama — no Rapture, no Fall, no urgency. But it is where many serious researchers actually sit, and it deserves more weight than the public discourse gives it.",
    links: [
      { label: "LeCun on why LLMs won't reach AGI", url: "https://www.zdnet.com/article/meta-chief-ai-scientist-yann-lecun-llms-will-never-reach-human-level-intelligence/" },
      { label: "LeCun: A Path Towards Autonomous Machine Intelligence", url: "https://openreview.net/pdf?id=BZ5a1r-kVsf" },
      { label: "Melanie Mitchell: AI: A Guide for Thinking Humans", url: "https://melaniemitchell.me/" }
    ]
  },
  {
    name: "The Emergentists",
    color: "#533afd",
    people: "Jared Kaplan, Geoffrey Hinton (recently), parts of Anthropic interpretability, scattered across labs",
    belief: "Capabilities keep appearing at scale that nobody predicted — translation, multi-step reasoning, coding ability, theory-of-mind tasks — without being explicitly trained for. We do not fully understand why, and our ability to predict what the next scale up will produce is poor. We are running an experiment whose results we cannot anticipate in advance.\n\nThis is the most uncomfortable position to hold publicly, because it commits you to no forecast. The religious parallel, if there is one, is mysticism: the acknowledgment of something we do not fully understand and may not be able to. It is also the position most defensible by direct observation.",
    links: [
      { label: "Wei et al.: Emergent Abilities of Large Language Models", url: "https://arxiv.org/abs/2206.07682" },
      { label: "Schaeffer et al.: Are Emergent Abilities a Mirage? (the counter-argument)", url: "https://arxiv.org/abs/2304.15004" },
      { label: "Anthropic Research", url: "https://www.anthropic.com/research" }
    ]
  },
];
