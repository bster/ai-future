import { s } from "../design.js";
import { Ref, Video, GoDeeper } from "../components/Shared.jsx";

export const DOMAINS = [
  {
    color: "#2d6a9f",
    title: "Medical and Scientific Research",
    tagline: "Patterns in genomics, drug discovery, and research literature",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "16px" }}>AI's best fit is finding non-obvious patterns in vast bodies of existing data: genomics, drug interactions, imaging, literature reviews spanning thousands of papers no single researcher could read in a lifetime. It surfaces candidates for human validation — a much better match for what these systems actually do than asserting truth on their own.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>Accelerated drug discovery, earlier disease detection, connections across siloed research bodies — the quality-of-life implications are real.</p>
        <GoDeeper refs={[
          { label: "DeepMind AlphaFold: Solving the protein folding problem", url: "https://deepmind.google/technologies/alphafold/" },
          { label: "Nature: AI in drug discovery", url: "https://www.nature.com/articles/s41573-019-0024-5" },
        ]} />
        <Video id="Y48UmC3ODFk" caption="AlphaFold and the End of the Protein Folding Problem — a concrete example of AI doing something that would have taken humans decades." />
      </>
    ),
  },
  {
    color: "#533afd",
    title: "Writing Software",
    tagline: "When software costs nothing to produce, everything becomes software",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "16px" }}>Code is the most AI-compatible domain because it is objectively verifiable — it runs, or it doesn't. Dario Amodei has argued that the cost of producing software is headed toward zero: software as a nearly free input, the way electricity became a nearly free input to manufacturing.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>If that is right, the consequence isn't fewer software projects — it's that everything becomes a software problem. The more interesting question isn't which developer jobs disappear. It's what gets built that never would have been attempted, and who decides what's worth building.</p>
        <GoDeeper refs={[
          { label: "Dario Amodei on the cost of software going to zero", url: "https://www.youtube.com/live/K7F6ohcBJus" },
        ]} />
        <Video id="K7F6ohcBJus" caption="Dario Amodei on what happens when the cost of writing software approaches zero — and what that implies for every other domain." />
      </>
    ),
  },
  {
    color: "#6b4c9a",
    title: "Legal, Financial, and Administrative Work",
    tagline: "The majority of routine work in the highest-credentialed cognitive roles",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "16px" }}>Contract review, due diligence, tax preparation, compliance monitoring, basic financial analysis — AI currently handles the majority of the routine work in all of them at a fraction of the cost and time. What remains is judgment-dependent: the call that requires a relationship, accountability, or someone willing to be wrong in front of a client.</p>
        <GoDeeper refs={[
          { label: "Goldman Sachs: AI and the labor market", url: "https://www.goldmansachs.com/insights/articles/how-will-ai-affect-the-us-labor-market" },
        ]} />
      </>
    ),
  },
  {
    color: "#1a7a6d",
    title: "Education, Media, and Knowledge",
    tagline: "Tutoring, explanation, and creative volume at scale",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "16px" }}>Personalized tutoring, instant explanation at any level, translation across languages, first drafts in text and image, localization — all of it legible output at scale. A student in a poorly resourced school can access explanatory quality previously available only inside well-resourced institutions. That may be the widest reach of AI in education near term. It also carries the most risk: the same tool that accelerates learning can substitute for it.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>Across education and media, the same fork appears: AI can produce competent volume quickly. It cannot decide what is worth teaching, making, or remembering — for whom, or why.</p>
        <GoDeeper refs={[
          { label: "Stanford HAI: AI and Teaching", url: "https://hai.stanford.edu/news/ai-will-transform-teaching-and-learning-lets-get-it-right" },
          { label: "The Atlantic: The End of the Essay", url: "https://www.theatlantic.com/technology/archive/2022/12/chatgpt-ai-writing-college-student-essays/672371/" },
        ]} />
      </>
    ),
  },
  {
    color: "#c24c1a",
    title: "Information, Influence, and Elections",
    tagline: "Synthetic media, automated persuasion, and the speed-scale asymmetry",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "16px" }}>AI-generated text, audio, and video now cost almost nothing to produce and are increasingly indistinguishable from real content. A politician's voice can be cloned in minutes. A convincing synthetic video of a public figure requires no professional crew, no budget, and no film school — only a diffusion model and a few seconds of source material. At scale, this creates a speed-scale asymmetry: fabrication is fast and cheap; verification is slow and expensive. Fact-checkers are outnumbered by orders of magnitude.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>The electoral implications have moved from hypothetical to documented. AI-generated robocalls mimicking a candidate's voice were used in US primary elections in 2024. Astroturfing — coordinated networks of fake accounts pushing a narrative — can now be automated rather than staffed. The scale of inauthentic coordinated influence that previously required a nation-state intelligence operation can be reproduced by a small group with API access and a few hundred dollars.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>The deeper problem is not that specific fakes are hard to detect; it is what researchers call the liar's dividend: once audiences accept that convincing fakes are possible, real content becomes deniable. A politician caught on tape says it's AI-generated. Verification difficulty asymmetrically benefits those who are willing to lie. The question is not only whether AI can produce misinformation — it can — but whether the epistemic infrastructure of democratic deliberation can adapt faster than the tools that undermine it.</p>
        <GoDeeper refs={[
          { label: "Nina Jankowicz: How to Lose the Information War", url: "https://www.bloomsbury.com/us/how-to-lose-the-information-war-9781788317214/" },
          { label: "Chesney & Citron: Deep Fakes and the Infocalypse (2019)", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3213954" },
          { label: "Stanford Internet Observatory: AI and elections", url: "https://cyber.fsi.stanford.edu/io" },
        ]} />
      </>
    ),
  },
];

export const ECONOMIC = [
  {
    color: "#ea2261",
    title: "The Jobs Already at Risk",
    tagline: "300 million jobs exposed — cognitive, credentialed, white-collar",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "16px" }}>Every previous wave of automation displaced physical labor: the loom replaced the weaver, the tractor replaced the field hand. The new jobs that followed were, by and large, cognitive — requiring language, analysis, judgment. Those jobs were considered safe precisely because machines couldn't do them.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>AI breaks that pattern. The jobs most immediately at risk are cognitive, credentialed, and white-collar. Goldman Sachs estimated in 2023 that 300 million jobs globally are exposed to AI automation, with two-thirds of occupations having at least a quarter of their tasks automatable — a figure that subsequent research has not revised downward. By 2026, whether those displaced workers are being re-employed at comparable wages or simply exiting the workforce remains an open empirical question. McKinsey's research suggests AI could technically automate up to 57% of US work hours. The most exposed roles include paralegal work, financial analysis, customer service, medical transcription, basic journalism, and entry-level software development.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>The optimistic counter-argument is that technology has always created more jobs than it destroyed — and historically, that has been true. But the displaced weavers did not become software engineers. Their grandchildren did. The transition took generations, not years — brutal for the people inside it, even when society came out ahead on balance.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>Each prior wave displaced physical labor and created cognitive jobs. AI displaces cognitive labor. The jobs it might create — AI trainers, output evaluators, prompt engineers — exist, but there aren't 300 million of them. If that escape hatch no longer works the way it did, the historical optimism needs a new argument, not just a restatement of the old one. A 55-year-old paralegal and a 22-year-old computer science graduate are not equivalently positioned to pivot.</p>
        <GoDeeper refs={[
          { label: "Goldman Sachs: How AI Will Affect the US Labor Market", url: "https://www.goldmansachs.com/insights/articles/how-will-ai-affect-the-us-labor-market" },
          { label: "McKinsey: Generative AI and the Future of Work in America", url: "https://www.mckinsey.com/mgi/our-research/generative-ai-and-the-future-of-work-in-america" },
          { label: "Brynjolfsson, Chandar & Chen: Canaries in the Coal Mine? (Stanford, 2025)", url: "https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/" },
          { label: "Anthropic Economic Index", url: "https://www.anthropic.com/economic-index" },
          { label: "Acemoglu: The Simple Macroeconomics of AI (NBER, 2024)", url: "https://www.nber.org/papers/w32487" },
          { label: "Kate Crawford: Atlas of AI (Yale UP, 2021)", url: "https://katecrawford.net/atlas" },
        ]} />
        <Video id="t1gLIc9ebiE" caption="MIT economist and Nobel laureate Daron Acemoglu on AI's economic impact. His actual position is more interesting than 'AI is bad': he argues the direction of AI development is steerable and is currently being steered to amplify the wrong things. The question is not whether AI is good or bad overall; it is who shapes what gets built." />
      </>
    ),
  },
  {
    color: "#4a6741",
    title: "The Third Option: Restructured Existing Jobs",
    tagline: "Most jobs are not eliminated or created — they are reshaped",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "16px" }}>The displacement-vs-new-jobs debate misses what is most likely to actually happen in the near term: existing jobs get restructured. The lawyer who used to spend 60% of their time on document review now spends it on client strategy. The doctor who used to spend 40% of their time on documentation spends it with patients. The teacher who used to spend their evenings grading uses AI to grade and spends evenings preparing lessons. Same job title, fundamentally different work.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>This is the scenario most consistent with what is already happening, and it is neither doom nor abundance. It is real economic change distributed unevenly. The people who can re-skill into the augmented version of their job stay employed at higher productivity. The people who cannot — usually the most senior or the least technologically adept — are pushed out. The economy as a whole produces more. Whether that gain is shared is a political question, not an economic one.</p>
      </>
    ),
  },
  {
    color: "#c07d3a",
    title: "Jevons Paradox",
    tagline: "When efficiency improves, consumption rises — not falls",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "16px" }}>In the 19th century, the economist William Stanley Jevons observed that as steam engines became more efficient — burning less coal per unit of work — total coal consumption went up, not down. Cheaper coal use per task meant more tasks. Efficiency expanded demand rather than reducing it.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>The same logic may apply to AI. If writing software costs nothing, the result isn't fewer software projects — it's that every domain that previously couldn't justify a custom software solution now gets one. If legal analysis costs a fraction of what it did, the result may not be fewer lawyers but far more legal analysis, performed on matters that previously went unexamined because they weren't worth the cost. The bottleneck shifts from execution to judgment: who decides what gets built, what gets analyzed, what's worth doing.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>This is the optimistic Jevons reading: AI expands the market for human creativity and direction by making execution cheap. The pessimistic reading is that Jevons-style expansion concentrates at the top — among the people whose judgment was already valuable — while the workers who provided the execution disappear. Both readings may be true simultaneously, in different parts of the labor market.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>One caveat: Jevons originally described commodities and resources. Whether it applies to labor markets is an analogy, not a direct economic result. Economists distinguish "induced demand" (Jevons-like expansion) from "substitution effects" (workers simply replaced). For AI, both forces operate at once; which one dominates in any given sector is an empirical question we will only know in retrospect.</p>
        <GoDeeper refs={[
          { label: "Jevons Paradox (Wikipedia)", url: "https://en.wikipedia.org/wiki/Jevons_paradox" },
        ]} />
      </>
    ),
  },
  {
    color: "#3a6b8a",
    title: "Who Owns the Training Data?",
    tagline: "The unlicensed foundation of a trillion-dollar industry",
    content: (
      <>
        <p style={{ ...s.p, fontSize: "16px" }}>Every large language model was trained on text, images, code, and other content created by human beings — most of it scraped from the internet without permission, compensation, or attribution. The New York Times, individual artists, and class-action plaintiffs representing millions of creative workers have filed lawsuits against AI labs arguing that training on copyrighted material without a license is infringement. AI labs argue that training is transformative use and covered under fair use doctrine. Courts have not yet settled the question; the cases are ongoing as of 2026.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>The practical stakes are significant. If training on copyrighted data requires licensing, the cost and complexity of building frontier models rises substantially — potentially concentrating AI development further among parties large enough to negotiate licenses at scale. If it doesn't, the economic value extracted from human creative output accrues to model builders with no mechanism of return to creators. "Opt-out" systems, where they exist, are largely cosmetic: the model has already been trained on the data. Opting out means being excluded from the next round.</p>
        <p style={{ ...s.p, fontSize: "16px" }}>Beneath the legal question is a structural one: AI represents a transfer of value from labor that created the training data to capital that trained on it. Some researchers have started calling it the data commons problem. The creative internet — written, drawn, and coded by people who expected at minimum attribution — may be degraded by the incentives AI creates. If generating AI output is cheaper than creating original work, and if AI output floods the platforms where creators were previously compensated or discovered, the feedback loop erodes the very data quality that future models depend on.</p>
        <GoDeeper refs={[
          { label: "NYT v. OpenAI: The complaint (December 2023)", url: "https://nytco-assets.nytimes.com/2023/12/NYT_Complaint_Dec2023.pdf" },
          { label: "Lemley & Casey: Fair Learning", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3887208" },
          { label: "Doctorow: The Data Trap", url: "https://pluralistic.net/2023/12/08/hack-the-planet/#drm-and-training-data" },
        ]} />
      </>
    ),
  },
];
