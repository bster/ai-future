# Understanding AI — Design System

## Philosophy

Two aesthetics in deliberate tension: **Stripe-style chrome** for navigation and UI controls (tight, declarative, modern), and **publication/editorial typography** for body content (generous, readable, warm). The site is not a dashboard or a marketing page — it is a long-form reading experience that needs to earn extended attention from students who have better things to do.

The chrome signals credibility and organization. The body type signals that what's inside is worth reading carefully.

---

## Colors

All tokens live in `src/design.js` as the `c` export.

```js
primary:     "#533afd"   // indigo — CTAs, links, accent
primaryDeep: "#4434d4"   // pressed/deep state
primaryPress:"#2e2b8c"   // pressed pill background
primaryBg:   "#ebe9fe"   // light indigo tint for callouts, active states
dark:        "#1c1e54"   // deep navy — discussion question blocks
ink:         "#1a1a1f"   // near-black body text (warmer than pure black)
inkSec:      "#2a2a33"   // secondary body text
inkMute:     "#6e6e7a"   // captions, labels, muted UI text
canvas:      "#fbfaf7"   // warm off-white — primary page background
canvasSoft:  "#f3efe8"   // warm soft — callout fills, open accordion backgrounds
hairline:    "#e6e0d4"   // warm hairline borders
ruby:        "#ea2261"   // accent only (gradient mesh, never buttons)
magenta:     "#f96bee"   // accent only
cream:       "#f5e9d4"   // warm cream accent
```

### Usage rules
- `primary` fills pill buttons and colors inline links — one filled CTA per visual band
- `dark` fills the discussion questions block — the only large dark surface
- `primaryBg` fills "Try It With an AI" callouts and active accordion rows
- `canvas` and `canvasSoft` handle all surface hierarchy — no shadows needed between them
- `ruby` and `magenta` appear in the hero gradient mesh only; never as button or link colors

---

## Typography

Two fonts, two roles. Never swap them.

### UI font — Inter

```js
export const font = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";
```

Used for: nav, headings (`h2`, `h3`), pill labels, section badges, accordion titles, button text, captions, labels, the footer. Weight 400–600. Negative letter-spacing on larger sizes.

### Body font — Newsreader

```js
export const serif = "'Newsreader', 'Source Serif Pro', Charter, 'Iowan Old Style', 'Sitka Text', Cambria, Georgia, serif";
```

Used for: all body paragraphs (`s.p`), pull quotes (`s.pq`), list items (`s.li`), video captions, discussion question text, "Try It" prompt text. Weight 400. Imported via Google Fonts in `index.html`.

**The rule**: if a human would read it as prose, it gets Newsreader. If a human would scan it as UI, it gets Inter.

### Type scale

| Token | Font | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|---|
| `s.h2` | Inter | clamp(28px, 5vw, 40px) | 500 | 1.15 | -0.5px | Section title |
| `s.h3` | Inter | 19px | 600 | — | -0.1px | Sub-section heading |
| `s.p` | Newsreader | 19px | 400 | 1.7 | 0 | Body paragraph |
| `s.pq` | Newsreader italic | clamp(21px, 3vw, 26px) | 400 | 1.4 | 0 | Pull quote |
| `s.li` | Newsreader | 18px | 400 | 1.55 | 0 | List item |
| `s.note` | Inter | 13px | 400 | 1.6 | 0 | Source callout |
| `s.ref` | Inter | 13px | 500 | — | 0 | Inline reference link |
| `s.dqItem` | Newsreader | 17px | 400 | 1.55 | 0 | Discussion question text |
| accordion title | Inter | 15px | 500 | — | -0.2px | Accordion header name |
| accordion tagline | Inter | 13px | 400 | — | 0 | Accordion header sub-label |
| pill/badge | Inter | 11px | 500–600 | — | 0.4px | Section badge, eyebrow labels |
| nav items | Inter | 14px | 400–500 | — | — | Nav links |
| footer | Inter | 13px | 400 | — | 0.2px | Footer text |

---

## Layout

### Content container

```js
s.content = { maxWidth: "680px", margin: "0 auto", padding: "clamp(48px,7vw,80px) clamp(22px,5vw,40px) 120px" }
```

All section pages use this container. 680px optimizes line length for the body type size (19px Newsreader at ~65–70 characters per line).

### Page background

```js
s.page = { minHeight: "100vh", background: c.canvas, color: c.inkSec, fontFamily: serif, fontSize: "19px", lineHeight: 1.65 }
```

### Hero (HomePage only)

Radial gradient mesh over `#f5f1e8` — cream, lavender, magenta, indigo, ruby stops. Padding `clamp(72px,11vw,128px)` top/bottom, max-width 720px centered.

### Overview grid (HomePage)

`repeat(auto-fill, minmax(260px, 1fr))` grid with 16px gap. Each part card has a 1px `hairline` border and a white background against the canvas.

---

## Component Patterns

### Section badge

```jsx
<SectionBadge id="sectionId" />
```

Renders an indigo pill ("Part N — Label") + "N of 10" counter. Uses `s.pill` styling: `primaryBg` fill, `primaryDeep` text, `border-radius: 9999px`, `font-size: 11px`, `letter-spacing: 0.4px`, `text-transform: uppercase`.

### Body paragraph

```jsx
<p style={s.p}>...</p>
```

Newsreader, 19px, line-height 1.7, color `inkSec`.

### Pull quote

```jsx
<div style={s.pq}>...</div>
```

Left border `3px solid primary`, padding-left 28px. Newsreader italic, `clamp(21px, 3vw, 26px)`, color `ink`.

### Source callout

```jsx
<div style={s.note}>
  <span style={s.noteLabel}>Go Deeper</span>
  <Ref label="..." url="..." />
</div>
```

Left border `2px solid hairline`. Inter 13px, `inkMute`. Label is Inter 11px, weight 600, uppercase, `ink`.

### Outlined callout box

```jsx
<div style={s.box}>...</div>
```

1px `hairline` border, `border-radius: 4px`, `rgba(255,255,255,0.55)` background. Newsreader 18px.

### Discussion questions block

```jsx
<DQ questions={["...", "..."]} />
```

`dark` (`#1c1e54`) navy background, `border-radius: 6px`. Label is Inter 11px `#b9b9f9`. Questions are Newsreader 17px `#eae8f5`, separated by `rgba(255,255,255,0.07)` hairlines.

### Try It With an AI

```jsx
<TryIt prompts={["...", "..."]} />
```

`primaryBg` fill, `rgba(83,58,253,0.15)` border, `border-radius: 8px`. Label Inter 11px `primaryDeep`. Prompts are Newsreader italic 16px `ink`, in quotation marks.

### Video embed

```jsx
<Video id="youtubeId" caption="..." />
```

16:9 responsive iframe (`padding-bottom: 56.25%`), `border-radius: 8px`. Caption is Newsreader italic 15px `inkMute`.

### Inline reference link

```jsx
<Ref label="Title" url="..." />
```

Inter 13px, weight 500, `primary` color, underline with 3px offset. Opens in new tab. Appends " ↗".

### Bulleted list

```jsx
<ul style={{ listStyle: "none", padding: 0, margin: "16px 0" }}>
  <Li>...</Li>
</ul>
```

`<Li>` renders a `–` dash in `primary` as absolute-positioned left marker. Newsreader 18px, line-height 1.55.

---

## Accordion Pattern

Used in TransformPage (domains + economic sections), BeliefsPage (7 camps), FuturesPage (7 futures).

**Critical rule**: never use `flexWrap` on accordion headers. Name and tagline must stack vertically inside a column container — the dot and `+` stay anchored at the edges regardless of tagline length.

```jsx
// Correct accordion header layout
<button style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%",
                 background: "none", border: "none", padding: "14px 18px", cursor: "pointer",
                 fontFamily: font, textAlign: "left" }}>
  <span style={{ width: "10px", height: "10px", borderRadius: "50%",
                 background: camp.color, flexShrink: 0 }} />
  <div style={{ flex: 1, minWidth: 0 }}>
    <div style={{ fontWeight: 500, fontSize: "15px", color: c.ink, letterSpacing: "-0.2px" }}>
      {title}
    </div>
    <div style={{ fontSize: "13px", color: c.inkMute, marginTop: "2px" }}>
      {tagline}
    </div>
  </div>
  <span style={{ color: c.primary, fontSize: "18px", flexShrink: 0 }}>
    {open ? "−" : "+"}
  </span>
</button>
```

Accordion row: `1px hairline` border, `border-radius: 10px`, `marginBottom: 8px`. Open state: `canvasSoft` background. Closed state: `canvas` background.

Content inside open accordion: Newsreader 15px paragraphs (same `s.p` style, `fontSize: "15px"` override). Padding `0 18px 18px 18px` (or `18px 18px 18px 38px` to indent past dot when no dot is shown).

---

## Navigation

Sticky top nav, `z-index: 100`. `canvas` background, `hairline` bottom border, subtle box-shadow.

- **Logo/title**: Inter 15px, weight 400 (500 when on home). Click navigates to home.
- **Desktop nav groups**: Inter 14px, weight 400 (500 active), `primary` underline `2px` on active group. Dropdowns: `canvas` background, `hairline` border, `border-radius: 8px`, `box-shadow: 0 8px 24px rgba(13,37,61,0.08)`.
- **Mobile**: hamburger `☰` / `✕` button at right. Dropdown covers full viewport width, `max-height: 80vh`, scrollable.
- **"Explore AI" button**: `primary` filled pill, `border-radius: 9999px`, white text. `primaryPress` on active state.
- **Progress bar**: 2px indigo bar below nav, width = `(sectionNum / 10) * 100%`. Only shown on numbered section pages.

---

## Prev/Next Arrows

```jsx
<Arrows current={page} onNav={nav} />
```

Rendered at the bottom of every section page except ExplorePage. Two pill buttons side by side, `gap: 12px`, `flex: 1` each.

- **Previous**: `canvasSoft` background, `hairline` border, `ink` text, left-aligned.
- **Next**: `primary` background, white text, right-aligned.
- Button text truncates with `text-overflow: ellipsis` if label is long.

---

## Spacing conventions

- Section content top padding: `clamp(48px, 7vw, 80px)`
- `h3` margin: `44px 0 14px` (above the sub-section)
- Paragraph `marginBottom`: 20px
- DQ block `marginTop`: 56px
- Arrow block `marginTop`: 64px, `paddingTop`: 32px with `hairline` top border
- Accordion row gap: 8px (TransformPage/BeliefsPage), 10px (FuturesPage)
- Max content width: 680px (section pages), 960px (HomePage overview), 1200px (nav)

---

## Border radius

| Context | Value |
|---|---|
| Pill buttons | 9999px |
| Accordion rows | 10px |
| Overview cards (HomePage) | 8px |
| Callout box (`s.box`) | 4px |
| DQ block | 6px |
| TryIt block | 8px |
| Video embed | 8px |
| Nav dropdown | 8px |

---

## Responsive

- Mobile breakpoint: `< 680px` (via `useIsMobile()` hook in Shared.jsx)
- Nav collapses to hamburger at `< 680px`
- Hero and content padding use `clamp()` throughout — no hard breakpoints needed for type/spacing
- Accordion headers must never wrap (see accordion layout rule above)
- Arrow buttons scale padding down slightly on mobile (`10px 16px` vs `11px 22px`)
