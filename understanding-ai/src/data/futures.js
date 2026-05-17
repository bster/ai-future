export const FUTURES = [
  {
    name: "Abundance",
    color: "#c07d3a",
    tagline: "AI solves the material problems of civilization",
    description: "Disease, poverty, and the friction of scarcity diminish rapidly. This is the optimistic scenario Dario Amodei sketches in 'Machines of Loving Grace' — a decade of compressed scientific progress, conditions that would have taken centuries arriving in years.",
    humanQuestion: "If suffering was always partly the engine of meaning, what happens when it becomes optional? If struggle was what made achievement real, what is achievement without necessary struggle? The liberal arts tradition has always been partly about learning to live with limitation and loss. Does it have anything to say to people who may not need to?",
    optimistQ: "If this comes true, does it vindicate or hollow out the things you value most?",
    pessimistQ: "If this comes true but meaning collapses anyway, was the problem never scarcity to begin with?",
    links: [{ label: "Amodei: Machines of Loving Grace", url: "https://www.darioamodei.com/essay/machines-of-loving-grace" }]
  },
  {
    name: "Displacement",
    color: "#ea2261",
    tagline: "Jobs disappear faster than meaning can be reconstructed",
    description: "Not necessarily catastrophic in a doomer sense — no extinction event, no dramatic rupture. Just a slow erosion of the structures through which most people found purpose, identity, and social standing. Work has always been more than income. It has been the primary answer most adults give to the question of what they are for.",
    humanQuestion: "What does society look like when work is no longer the organizing principle of adult life? What replaces it — and who decides? This scenario doesn't require superintelligence. It only requires that AI be good enough, fast enough, and cheap enough. We may already be inside it.",
    optimistQ: "If work disappears as the center of human life, what would you want to put in its place — and do you actually believe that would be enough?",
    pessimistQ: "If this comes true, which institutions — universities, governments, religions — are equipped to help people find meaning at scale?",
    links: [{ label: "The Atlantic: What happens when work disappears?", url: "https://www.theatlantic.com/magazine/archive/2015/07/world-without-work/395294/" }]
  },
  {
    name: "Concentration",
    color: "#4434d4",
    tagline: "AI dramatically amplifies whoever controls it",
    description: "Not AGI takeover — just extreme asymmetry. The gap between what a well-resourced actor can do with AI and what everyone else can do grows faster than any regulatory body can respond. The infrastructure itself concentrates: a handful of chip fabricators, a handful of cloud providers, a handful of frontier labs. Intelligence itself becomes a privately controlled resource, and political power follows.",
    humanQuestion: "What are the political implications of a world where the most consequential cognitive tool is owned by a handful of companies or states? This scenario doesn't require anyone to be malicious. It only requires the normal operation of markets and geopolitics.",
    optimistQ: "If AI concentrates power dramatically, what mechanisms — legal, political, social — do you believe could actually constrain it?",
    pessimistQ: "If this comes true, does democracy as we understand it survive? What would replace it?",
    links: [
      { label: "The Economist: The AI power grab", url: "https://www.economist.com/leaders/2023/04/19/the-race-to-dominate-ai" },
      { label: "AI Now Institute: Compute and Power Concentration", url: "https://ainowinstitute.org/publication/policy/compute-and-ai" }
    ]
  },
  {
    name: "Augmentation",
    color: "#4a6741",
    tagline: "AI becomes a genuine cognitive prosthetic",
    description: "Rather than replacing human thought, AI extends it — the way writing extended memory, or mathematics extended reasoning. Humans become something new: not replaced, but expanded. This is the scenario that sounds most benign, which is worth being suspicious of.",
    humanQuestion: "What is it about unaided human cognition that we'd want to preserve, and why? If the boundary between your thinking and AI's assistance becomes invisible to you, are you still the author of your own thought? This scenario raises the hardest questions not because it's dangerous but because it's seductive.",
    optimistQ: "If augmentation comes true, what would be worth protecting from it — and is that protection realistic or just nostalgia?",
    pessimistQ: "If this comes true, what happens to the people who cannot or do not augment? Does a new cognitive inequality emerge?",
    links: [{ label: "Douglas Engelbart: Augmenting Human Intellect (1962)", url: "https://www.dougengelbart.org/content/view/138" }]
  },
  {
    name: "Cognitive Atrophy",
    color: "#ea2261",
    tagline: "Capabilities don't disappear — humans stop practicing them",
    description: "AI doesn't get to AGI. It just gets good enough that doing the difficult thing yourself stops feeling necessary. Writing, sustained reading, mental arithmetic, navigation, memorization, the slow work of forming an argument — all of these become optional. Each one, individually, looks like a reasonable convenience. In aggregate, a generation grows up without the practice of cognitive difficulty, and the capacity to do it atrophies the way physical capacity atrophies in zero gravity.",
    humanQuestion: "What is the difference between a capability you do not use and a capability you do not have? At what point does the distinction stop mattering? This is not speculation about a hypothetical future. It is a description of an experiment that is already running on undergraduates worldwide.",
    optimistQ: "If certain cognitive capacities atrophy because AI does them better, is that a loss or a liberation? What's the test for which?",
    pessimistQ: "If a generation loses the practice of difficult thinking, who is equipped to evaluate AI's output? Who is equipped to disagree with it?",
    links: [{ label: "Nicholas Carr: The Shallows (overview)", url: "https://www.nicholascarr.com/?page_id=16" }]
  },
  {
    name: "Cultural Homogenization",
    color: "#f96bee",
    tagline: "AI flattens the variety of human thought into a single dialect",
    description: "Models are trained predominantly on English-language, Western, internet-era text. As AI mediates more of human writing, education, and discovery, the texture of thought itself converges on what these models can produce well. Other languages thin. Other rhetorical traditions disappear. The strange edges of human expression — the ones that don't fit the training distribution — get edited out, not by censorship but by the gravitational pull of fluency.",
    humanQuestion: "What does it cost to have most human writing pass through the same statistical filter? The internet already homogenized some of this. AI completes the process. What is lost when most of what gets read, taught, and remembered sounds like the same voice?",
    optimistQ: "If global discourse converges, is that a unification worth having — or a loss disguised as a gain?",
    pessimistQ: "If the texture of cultural difference depends on the labor of producing it, and AI removes the labor, what protects the difference?",
    links: []
  },
  {
    name: "Stagnation",
    color: "#64748d",
    tagline: "The current systems are near their ceiling",
    description: "The hype collapses. The money flows elsewhere. We are left with very good autocomplete — genuinely useful, not transformative. There are two ways to read this scenario, and they cut in opposite directions.",
    humanQuestion: "One reading: the institutions that restructured around AI's promise — universities, media companies, knowledge-work industries — have already paid a real cost for that bet. Wasted years, abandoned skills, deferred investments in things that would have mattered. The other reading: stagnation is relief. The hardest existential questions stay answered the way they always were. Human reasoning remains uncontested at the top of the cognitive pyramid. Which reading you find more honest probably says more about you than about the technology.",
    optimistQ: "If stagnation comes true, what does the world look like in twenty years? Is that a world you'd want?",
    pessimistQ: "If this comes true, does it vindicate the critics who said AI was overrated — or does it just mean the revolution is delayed?",
    links: [{ label: "Gary Marcus: The Deep Learning Bubble", url: "https://garymarcus.substack.com/p/the-deeplearning-bubble" }]
  },
];
