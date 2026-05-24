# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.1.0] — 2026-05-24

### Added

**Curriculum content**
- Ten-section liberal arts guide to AI, structured as a guided journey from foundations through hard philosophical questions to practical implications for students and educators
- *What AI Is* (sections 1–3): What It Actually Is Today, What It Does Well Today, What It Can't Do — covering transformer architecture, emergent behavior, hallucination, and the limits of pattern recognition
- *Where It Matters* (sections 4–5): Transformation & Economic Impact with domain-level accordions (Medical Diagnosis, Software Development, Legal/Financial, Education, Energy/Climate, Content Production) and economic analysis sections (Jevons Paradox, the historical job-creation question, restructured vs. displaced work); seven schools of thought on AGI as an accordion — Utopians, Accelerationists, Doomers, Safety Institutionalists, Deflationists, Pragmatists, and Emergentists, each with a structural argument and a structural blind spot
- *What It Becomes* (section 6): Seven Futures accordion — Abundance, Displacement, Concentration, Augmentation, Cognitive Atrophy, Cultural Homogenization, Stagnation — explicitly framed as combinable, not mutually exclusive, each with primary sources and discussion questions
- *Hard Questions* (sections 7–8): The Mirror Problem (consciousness, the hard problem, Turing's imitation game, Searle's Chinese Room, phenomenal experience) and The Genuinely Unknown (what we cannot know about AI's trajectory)
- *For Educators* (sections 9–10): What This Means for a Liberal Arts Education (including "The Argument Against This Argument" and concrete moves for educators) and How Students Should Think About All This (including the dependency/sharpening spectrum and "The Relationship Question")

**Standalone sections**
- Glossary — 33 AI terms from AGI to Zero-shot learning, A–Z, filterable by keyword in real time, outside the numbered guide
- Explore AI — curated AI apps and classroom prompts, tabbed layout, outside the numbered guide

**Site infrastructure**
- Vite + React SPA with hash-based routing (no server config required)
- Sticky nav with section group dropdowns, mobile hamburger menu, and 2px progress bar showing position in the 10-section journey
- Prev/next arrow navigation between sections
- `<TryIt>` blocks — copy-to-clipboard prompts with direct links to ChatGPT, Claude, and Gemini
- `<DQ>` discussion question blocks for seminar use
- `<Video>` lazy-loading YouTube embed with click-to-play thumbnail
- Editorial typography: Newsreader serif for body text, Inter for UI chrome, warm off-white canvas

**Deployment and open source**
- Netlify deploy configuration (`netlify.toml`) — one-click fork-and-deploy
- Dual license: MIT for code (components, build tooling), CC BY 4.0 for content (text, arguments, framing)
- `LICENSE`, `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`
- `CODEOWNERS` — all PRs route to `@bster` for review
- GitHub issue templates for broken links, factual corrections, and new primary source suggestions
- GitHub Actions-compatible structure; Netlify watches `main` branch
- Open Graph and Twitter Card meta tags for social sharing
- Favicon and Apple touch icon
- GitHub repository link in nav (desktop icon + mobile hamburger)
