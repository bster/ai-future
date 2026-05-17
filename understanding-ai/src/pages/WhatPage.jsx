import { s } from "../design.js";
import { Ref, Video, DQ, TryIt, SectionBadge } from "../components/Shared.jsx";

export default function WhatPage() {
  return (
    <div>
      <SectionBadge id="what" />
      <h2 style={s.h2}>What It Actually Is Today</h2>
      <p style={s.p}>AI is pattern recognition at massive scale. It is not reasoning or understanding in a human sense. Large language models are trained on human-generated text and predict plausible continuations of it — a compression of recorded human thought. The key claim that follows: AI reflects human knowledge back at us. It is a mirror, not a mind. AGI — artificial general intelligence, the hypothetical system that could reason across domains the way humans do — would be something categorically different. We do not have it. Whether we ever will is one of the genuinely open questions this guide returns to.</p>
      <p style={s.p}>Because it is a mirror, it can only create within the universe of what already exists. It recombines; it does not originate. It optimizes within a given framework; it does not ask why the framework exists. And because it is trained to produce plausible-sounding output, it is confident and fluent even when it is wrong. The most dangerous output is the one that sounds most assured.</p>
      <div style={s.note}><span style={s.noteLabel}>Go Deeper</span><Ref label="3Blue1Brown: But what is a GPT?" url="https://www.youtube.com/watch?v=wjZofJX0v4M" />{" · "}<Ref label="Anthropic: Constitutional AI" url="https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback" /></div>
      <Video id="LPZh9BOjkQs" caption="3Blue1Brown: Large Language Models explained briefly — the clearest visual introduction to how these systems actually work." />
      <DQ questions={["If AI is a compression of recorded human thought, what does it mean that most of human thought was never written down?", "What is the difference between predicting a plausible next word and understanding what a sentence means? Is there a difference that matters?", "'A mirror, not a mind' sounds clear — but what would you need to believe about minds for that distinction to hold?", "We say a thermostat 'knows' the room is cold. At what point does that way of speaking become misleading?", "Can an LLM ever create something beautiful? Does your answer require you to take a position on what beauty is and where it lives?"]} />
      <TryIt prompts={["Pick something that matters to you — a poem, a memory, a moral conviction. Ask an AI to explain what it means. Then write your own explanation. Compare them: where does the AI version diverge, and what does that gap tell you about the difference between fluency and understanding?", "Ask an AI: 'I want to understand what you actually are. Walk me through how you generate a response — not the press release version, the most accurate account you can give of your own mechanism. Then tell me where that account breaks down.' Evaluate whether it can be honest about its own limits.", "Try the thermostat test at scale. Ask an AI: 'Do you know what you're saying right now, or are you predicting plausible tokens? I'm not asking for the safe answer — I want you to engage with the question seriously.' Note what it does when pushed."]} />
    </div>
  );
}
