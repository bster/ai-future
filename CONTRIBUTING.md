# Contributing

## Fork First

The most valuable contribution to this project is **forking it, teaching with it, and sharing what you learned**. If you fork this for your course, open a [Discussion](https://github.com/bster/ai-future/discussions/categories/forks-and-adaptations) and tell us about it. What worked? What did your students push back on? What did you add or remove? That feedback shapes the canonical version more than any PR.

CC BY 4.0 gives you wide latitude: adapt the text, change the framing, add sections, translate it, use it in courses or workshops. Attribution required, everything else negotiable.

---

## What We Accept as PRs

A deliberately narrow set of improvements that benefit everyone's fork:

**Broken links**  
If a link is dead or has moved, open an [issue](https://github.com/bster/ai-future/issues/new/choose) with the broken URL and a working replacement. Or submit a PR directly — these are always welcome.

**New primary sources**  
A well-chosen academic or journalistic source for an existing section, camp, or future. Open an issue first with the source and your case for adding it (what does it add that isn't there?). If it fits, we'll ask for a PR. Criteria: primary sources preferred over summaries; stable URLs; directly relevant rather than tangentially interesting.

**Factual corrections**  
Something stated as fact that is demonstrably wrong — a statistic, a date, an attribution. Cite the correction. Note: the guide takes editorial positions deliberately; disagreement with a position is a Discussion, not a correction.

**Typos and copy errors**  
Clear errors in the existing text. PRs welcome directly.

---

## What Belongs in Discussions, Not PRs

- Arguments about how a section is framed or what it leaves out
- Suggestions for new futures or camps
- Questions about the philosophy of mind sections
- Classroom reports: "my students responded to X this way"
- Disagreements with the editorial positions the guide takes
- Requests for new sections

The guide takes positions deliberately. If you disagree, that's a Discussion thread — or a fork. Both are good outcomes.

[Go to Discussions →](https://github.com/bster/ai-future/discussions)

---

## Development Setup

```bash
cd understanding-ai
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
```

The site is a Vite + React SPA with hash-based routing. No backend, no API keys, no environment variables required.

## Content Style

If a PR touches text, match the existing voice: direct, declarative, no hedging. Claims are stated flatly. The guide is skeptical of AI hype and skeptical of AI dismissal simultaneously — it holds both. See the writing style section in [CLAUDE.md](CLAUDE.md) for the full guide.

---

## License

By submitting a PR, you agree that your contributions are licensed under the same terms as the rest of the project: MIT for code, CC BY 4.0 for content.
