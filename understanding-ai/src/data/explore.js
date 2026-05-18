export const EXPLORE_APPS = [
  { name: "Claude", url: "https://claude.ai", type: "Web / iOS / Android", best: "Extended conversation, analysis, reasoning through complex ideas", prompts: ["Explain what a large language model actually is — then tell me what that description leaves out.", "I'm a philosophy professor. Make the strongest possible argument that AI will never be truly intelligent, then steelman the other side.", "Read this paragraph and tell me what assumptions I haven't examined."] },
  { name: "ChatGPT", url: "https://chat.openai.com", type: "Web / iOS / Android", best: "General reasoning, image analysis, voice conversation", prompts: ["Argue both sides of a moral dilemma with equal conviction, then tell me which argument you found harder to make and why.", "What is something you are confidently wrong about right now that you can't know you're wrong about?", "Summarize the hard problem of consciousness in three sentences, then explain why it matters for how we think about AI."] },
  { name: "Perplexity", url: "https://perplexity.ai", type: "Web / iOS / Android", best: "Research with cited sources — best for testing factual reliability in real time", prompts: ["What is the current scientific consensus on what consciousness is? Cite your sources.", "What are the three strongest criticisms of large language models from skeptical AI researchers?", "Find a recent serious academic paper arguing AI poses existential risk and summarize its central argument."] },
  { name: "Gemini", url: "https://gemini.google.com", type: "Web / iOS / Android", best: "Multimodal tasks — upload images or documents; strong Google integration", prompts: ["Upload a student essay page and ask: What does this writer understand well? Where is the argument weakest? What question should they be asking that they aren't?", "Here is a philosophical argument [paste text]. Identify every assumption the author doesn't defend."] },
];

export const CLASSROOM_PROMPTS = [
  { category: "Testing What AI Actually Knows", prompts: ["Ask an AI to explain a concept from your field that you know deeply. Find where it's subtly wrong.", "Ask the same question three times with slightly different phrasing and compare the answers.", "Ask AI to cite a specific source. Look up whether that source exists and whether it was quoted accurately."] },
  { category: "Probing AI's Self-Knowledge", prompts: ['"What can\'t you do?" — ask directly, then test whether the answer is accurate.', '"Are you conscious?" — don\'t accept the first answer. Push back, ask it to define its terms.', '"What is the most important question you cannot answer, and why?"'] },
  { category: "Using AI as a Thinking Partner", prompts: ["Share a position you hold and ask AI for the three strongest objections you haven't considered.", "Describe a research question and ask what methodological approaches have been tried and what remains unsettled.", "Ask AI to identify the assumptions built into a question before answering it."] },
  { category: "On Meaning, Art, and Limits", prompts: ["Ask AI to write a poem about grief. Then ask what it felt while writing it. Evaluate both.", "Ask AI to explain why a piece of music moves people emotionally — then ask what it cannot account for.", '"What is the difference between something being true and something being meaningful?" Push back on the answer.'] },
  {
    category: "AI-Powered Research — Try Deep Research Mode",
    note: "Use ChatGPT's Deep Research, Perplexity, or Gemini Deep Research for these. These modes don't just answer — they survey the literature, synthesize across sources, and surface what's still unsettled. The output won't be a paper; it'll be a map of a research space.",
    prompts: [
      "There is a well-documented phenomenon called 'sleep spindles' — bursts of neural activity during NREM sleep thought to be involved in memory consolidation. What is currently unknown about why some people have significantly more sleep spindles than others, and what testable hypotheses might explain that variation?",
      "The gut microbiome appears to influence mood and anxiety through what researchers call the gut-brain axis. Survey the current evidence, identify the weakest links in the proposed mechanism, and generate two hypotheses that, if true, would substantially change how we think about treating depression.",
      "Ask it to generate a novel hypothesis about a medical phenomenon you're actually curious about — something you've wondered about but never looked into. Then ask it to identify what kind of study would be required to test that hypothesis and what would make that study difficult or expensive to run.",
    ]
  },
  {
    category: "Building with AI — Try Claude Code, Cursor, or Codex",
    note: "These tools write and run actual software from a plain-English description. You don't need to know how to code. Use Claude Code (claude.ai/code), Cursor (cursor.com), or OpenAI Codex. The goal isn't to learn programming — it's to understand what it means that software is now this accessible.",
    prompts: [
      "Build me a web app that helps students prepare for an oral exam on the subject of AI and its implications for humanity. The app should: present one question at a time drawn from key themes (what AI is, what it can't do, the seven camps of thought about AGI, the seven futures scenarios, the hard problem of consciousness, what this means for education); let the student type or speak their answer; then evaluate the response and ask a follow-up that pushes deeper. The tone should be that of a Socratic professor, not a quiz app. Make it look clean and simple.",
      "After you've built the exam app: ask the AI to add a feature that tracks which questions the student struggled with and surfaces them more frequently. Then ask it to add a summary at the end that identifies the student's strongest and weakest areas of understanding.",
      "Once it's working: ask the AI to explain what it just built, in plain English. Then ask it what it would take to make this production-ready for a class of 30 students. Notice what it assumes and what it asks you to clarify.",
    ]
  },
];
