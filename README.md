# AI & Humanity: A Liberal Arts Curriculum

A ten-section guide to what AI is, what it can and can't do, how it may transform society, and what it means for human thought, work, and culture.

Built for liberal arts educators and their students. Live at **[aiandhumanity.netlify.app](https://aiandhumanity.netlify.app)**.

---

## What This Is

This is a curriculum, not a textbook — it takes positions and invites students to challenge them. Ten sections cover:

- **What AI actually is** today, and what it does and doesn't do well
- **Seven schools of thought** on where it's heading (from Utopians to Deflationists)
- **Seven possible futures** (Abundance, Displacement, Concentration, and four others)
- **Philosophy of mind** — the hard problems AI forces us to confront
- **Economic and political stakes** — who gains, who loses, who governs
- **What this means** for liberal arts education and for students specifically

Each section ends with discussion questions for seminar use and prompts for using AI itself to probe the material.

---

## Fork First

The goal of open sourcing this is not to maintain one canonical curriculum but to offer a **starting point that educators can fork, adapt, and teach in their own voice**. Different institutions, different student bodies, different emphases — take what works, change what doesn't, and share what you learn.

If you fork this for your course, open a [Discussion](https://github.com/bster/ai-future/discussions) and tell us about it. What worked? What did your students push back on? What did you add?

---

## Running Locally

```bash
git clone https://github.com/bster/ai-future.git
cd ai-future/understanding-ai
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Production build:**
```bash
npm run build        # outputs to understanding-ai/dist/
```

**Deploy:** The site is a static bundle — drop `dist/` anywhere that serves HTML. The included `netlify.toml` configures a one-click Netlify deploy from your own fork.

---

## Project Structure

```
understanding-ai/        Vite + React SPA
  src/
    App.jsx              Routing shell — PAGES map + hash-based routing
    design.js            Design tokens and style objects
    data/
      nav.js             Navigation groups and section metadata
      camps.js           Seven schools of thought (Utopians, Doomers, etc.)
      futures.js         Seven AI outcome scenarios
      explore.js         AI apps and classroom prompts
    components/
      Shared.jsx         Ref, Video, DQ, TryIt, SectionBadge, Arrows, etc.
      Nav.jsx            Sticky nav, mobile hamburger, progress bar
    pages/               One file per section — content lives here
netlify.toml             Static deploy configuration
```

Routing is hash-based — no server config needed. URLs: `/#what`, `/#beliefs`, `/#futures`, etc.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Short version:

- **Broken links, new primary sources, factual corrections** → open an issue or PR
- **Framing debates, classroom reports, fork announcements** → [Discussions](https://github.com/bster/ai-future/discussions)
- **Rewrites and restructuring** → fork it

---

## License

Code (components, build tooling): [MIT](LICENSE)  
Content (text, arguments, framing): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — Ben Stern
