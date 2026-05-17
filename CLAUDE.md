# Understanding AI — Project Memory

## What This Is

A single-page educational website for a liberal arts professor and students. The site is a guided journey through what AI is, what it can't do, seven schools of thought about AGI, hard philosophical questions about consciousness and beauty, and sections for educators and students on economic, political, and aesthetic implications.

Live at: https://aiandhumanity.netlify.app/

## Repo Structure

```
understanding-ai/        Vite + React SPA (the entire site)
  src/
    App.jsx              Routing shell only — PAGES map + hash routing
    design.js            Design tokens (c, font, serif) and style object (s)
    data/
      nav.js             NAV_GROUPS, ALL_SECTIONS, SECTION_META, TOTAL
      camps.js           CAMPS — seven schools of thought (Utopians, Accelerationists, Doomers, etc.)
      futures.js         FUTURES — seven AI outcome scenarios
      explore.js         EXPLORE_APPS, CLASSROOM_PROMPTS
    components/
      Shared.jsx         Ref, Video, Li, DQ, TryIt, SectionBadge, ProgressBar, Arrows, useIsMobile
      Nav.jsx            Sticky nav with dropdowns, mobile hamburger, progress bar
    pages/               One file per section — edit content here
      HomePage.jsx       Gradient hero + section overview grid
      WhatPage.jsx       1/10 — What It Actually Is Today
      GoodPage.jsx       2/10 — What It Does Well Today
      BadPage.jsx        3/10 — What It Can't Do
      TransformPage.jsx  4/10 — Where It Can Already Transform Society (accordion, 6 domains + 4 economic sections)
      BeliefsPage.jsx    5/10 — The Believers (7-camp accordion, uses CAMPS data)
      FuturesPage.jsx    6/10 — Seven Futures (accordion, uses FUTURES data)
      MirrorPage.jsx     7/10 — The Mirror Problem
      UnknownPage.jsx    8/10 — The Genuinely Unknown
      LiberalPage.jsx    9/10 — What This Means for a Liberal Arts Education
      StudentsPage.jsx   10/10 — How Students Should Think About All This
      ExplorePage.jsx    After the guide — apps + classroom prompts (tabbed)
netlify.toml             base=understanding-ai, publish=dist
```

## Deployment

- GitHub repo: `bster/ai-future`
- Active PR branch: `claude/ui-fixes` — push here
- Netlify watches `main` — merge feature branch → main to deploy
- Build: `cd understanding-ai && npm run build`

## Routing

Hash-based (`window.location.hash`). No server config needed. URLs: `/#what`, `/#beliefs`, `/#mirror`, etc. Home is `/#` or bare URL. Browser back/forward works via `hashchange` listener in App.jsx.

## Design System

Editorial/publication aesthetic — Stripe chrome for UI, long-form reading typography for body. Full spec in `understanding-ai/DESIGN.md`. Key tokens (all in `src/design.js`):

- Primary: `#533afd` (indigo)
- Dark/navy: `#1c1e54`
- Canvas: `#fbfaf7` (warm off-white)
- Hairline: `#e6e0d4` (warm)
- UI font (`font`): Inter, weight 400, negative letter-spacing
- Body font (`serif`): Newsreader — imported in index.html, used for all body text, pull quotes, list items, captions
- Pill buttons: `border-radius: 9999px`

## Component Patterns

Every content page uses this structure:

```jsx
<SectionBadge id="sectionId" />   // indigo pill + "N of 10"
<h2 style={s.h2}>Title</h2>
<p style={s.p}>...</p>            // Newsreader serif, 19px, 1.7 line-height
<div style={s.note}>...</div>     // source callout — left hairline border, Inter 13px
<div style={s.pq}>...</div>       // pull quote — left indigo border, serif italic
<div style={s.box}>...</div>      // outlined callout box
<Video id="youtubeId" caption="" />
<DQ questions={[...]} />          // dark navy discussion questions block
<TryIt prompts={[...]} />         // light indigo "Try it with an AI" block
```

`<Arrows>` renders prev/next navigation at the bottom of every page except ExplorePage.

### Accordion Pattern (BeliefsPage, FuturesPage, TransformPage)

Accordion headers must use this layout to stay aligned on mobile — do NOT use `flexWrap`:

```jsx
<button style={{ display: "flex", alignItems: "center", gap: "12px" }}>
  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, flexShrink: 0 }} />
  <div style={{ flex: 1, minWidth: 0 }}>
    <div style={{ fontWeight: 500, fontSize: "15px" }}>{title}</div>
    <div style={{ fontSize: "13px", color: c.inkMute, marginTop: "2px" }}>{tagline}</div>
  </div>
  <span style={{ flexShrink: 0 }}>{open ? "−" : "+"}</span>
</button>
```

## Content Philosophy & Writing Style

- **Direct and declarative** — no hedging, no "it's complicated" without following through
- **Preserve the author's prose exactly** — do not paraphrase, soften, or add qualifiers
- Claims are stated flatly: "AI is pattern recognition at massive scale." Not "some argue that AI..."
- The site takes positions and defends them, then invites students to challenge them
- Audience: liberal arts undergraduates and their professors — assume intelligence, not technical background
- The site is skeptical of AI hype but also skeptical of AI dismissal — it holds both at once

## Navigation Structure

```
What AI Is          → What It Is Today / What It Does Well Today / What It Can't Do
Where It Matters    → Transformation & Economic Impact / The Believers
What It Becomes     → Seven Futures
Hard Questions      → The Mirror Problem / The Unknown
For Educators       → Liberal Arts / For Students
[After guide]       → Explore AI (not in numbered sections)
```

## Key Data Files — When to Edit

- **Add/edit a school of thought**: `src/data/camps.js` — each entry has `name`, `color`, `people`, `belief`, `links[]`
- **Add/edit a future scenario**: `src/data/futures.js` — each entry has `name`, `color`, `tagline`, `description`, `humanQuestion`, `optimistQ`, `pessimistQ`, `links[]`
- **Add AI apps or classroom prompts**: `src/data/explore.js`
- **Change nav labels or add sections**: `src/data/nav.js` — update both `NAV_GROUPS` and `SECTION_META`, increment `TOTAL`
- **Change colors or typography**: `src/design.js`

## Discussion Questions & TryIt Prompts

Each page ends with `<DQ>` (discussion questions) followed by `<TryIt>` (LLM prompts for students).

DQ questions include:
- Philosophical/analytical questions for seminar discussion
- Aesthetic judgment questions ("Can an LLM create something beautiful?")
- Questions connecting to lived experience and personal stakes

TryIt prompts are designed to:
- Demonstrate AI capability (synthesis, first-draft generation)
- Simulate personal outcomes (ask student for their context, then model implications)
- Probe AI's limits directly (ask it about consciousness, lived experience, permanent unknowns)

## What's Been Built

- Full 10-section guide with primary source links and YouTube embeds
- Seven schools of thought (accordion): Utopians, Accelerationists, Doomers, Safety Institutionalists, Deflationists, Pragmatists, Emergentists — each with a structural argument worth taking seriously and a structural blind spot worth naming
- Seven futures (accordion): Abundance, Displacement, Concentration, Augmentation, Cognitive Atrophy, Cultural Homogenization, Stagnation — explicitly framed as combinable, not exclusive
- TransformPage: six domain accordions (Medical, Software, Legal/Financial, Education, Energy/Climate, Content) + four economic accordions (Jobs at Risk, Historical Job Creation Question, Restructured Jobs, Jevons Paradox) — includes Dario Amodei video on cost of software going to zero
- LiberalPage: includes "The Argument Against This Argument" section and "What Educators Can Actually Do" with concrete moves
- StudentsPage: includes "The Relationship Question", sharper/dependent behavior analysis, "One Last Frame" closing
- Editorial typography: Newsreader serif for body text, Inter for UI chrome, warm off-white canvas
- Mobile-responsive nav with hamburger menu
- Progress bar (2px indigo) showing position in 10-section journey
- Prev/next arrow navigation between sections
- Copyright footer: © Ben Stern 2026
