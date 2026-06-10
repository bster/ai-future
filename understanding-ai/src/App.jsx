import { useState, useEffect, lazy, Suspense, Component } from "react";
import { c, s, font } from "./design.js";
import { PAGE_TITLES } from "./data/nav.js";
import Nav from "./components/Nav.jsx";
import { Arrows } from "./components/Shared.jsx";
import Sparring from "./components/Sparring.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const WhatPage = lazy(() => import("./pages/WhatPage.jsx"));
const GoodPage = lazy(() => import("./pages/GoodPage.jsx"));
const BadPage = lazy(() => import("./pages/BadPage.jsx"));
const TransformPage = lazy(() => import("./pages/TransformPage.jsx"));
const BeliefsPage = lazy(() => import("./pages/BeliefsPage.jsx"));
const FuturesPage = lazy(() => import("./pages/FuturesPage.jsx"));
const MirrorPage = lazy(() => import("./pages/MirrorPage.jsx"));
const UnknownPage = lazy(() => import("./pages/UnknownPage.jsx"));
const LiberalPage = lazy(() => import("./pages/LiberalPage.jsx"));
const StudentsPage = lazy(() => import("./pages/StudentsPage.jsx"));
const ExplorePage = lazy(() => import("./pages/ExplorePage.jsx"));
const GlossaryPage = lazy(() => import("./pages/GlossaryPage.jsx"));

const PAGES = {
  home: HomePage,
  what: WhatPage,
  good: GoodPage,
  bad: BadPage,
  transform: TransformPage,
  beliefs: BeliefsPage,
  futures: FuturesPage,
  mirror: MirrorPage,
  unknown: UnknownPage,
  liberal: LiberalPage,
  students: StudentsPage,
  explore: ExplorePage,
  glossary: GlossaryPage,
};

// Catches render errors from lazy-loaded chunks — most commonly a stale tab
// requesting old chunk hashes after a redeploy — instead of white-screening.
class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", fontFamily: font, color: c.ink, padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: "17px" }}>Something went wrong loading this section.</div>
          <a href={window.location.href} onClick={() => window.location.reload()} style={{ color: c.primary, fontSize: "15px" }}>Reload the page</a>
        </div>
      );
    }
    return this.props.children;
  }
}

function resolvePage() {
  const id = window.location.hash.slice(1) || "home";
  return PAGES[id] ? id : "home";
}

const skipLink = {
  position: "absolute",
  left: "-9999px",
  top: "auto",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  zIndex: 200,
  padding: "12px 20px",
  background: c.primary,
  color: "#fff",
  fontFamily: font,
  fontSize: "14px",
  textDecoration: "none",
  borderRadius: "4px",
};

export default function App() {
  const [page, setPage] = useState(resolvePage);
  const [selText, setSelText] = useState(null);

  useEffect(() => {
    const onHash = () => {
      const id = resolvePage();
      const raw = window.location.hash.slice(1);
      if (raw && !PAGES[raw]) {
        window.location.hash = "";
      }
      setPage(id);
      // Scroll after the new page has rendered and painted
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: 0 })));
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const title = PAGE_TITLES[page] || PAGE_TITLES.home;
    document.title = page === "home" ? title : `${title} — Understanding AI`;
  }, [page]);

  // Text-selection → updates Sparring pill label.
  // touchend covers iOS (mouseup doesn't fire for text selection on iOS Safari).
  // The delayed clear prevents a race where iOS clears the selection before
  // the button's click/touchend handler has a chance to read it.
  useEffect(() => {
    let clearTimer = null;
    const onUp = () => {
      const sel = window.getSelection();
      const text = sel?.toString().trim();
      if (!text || text.length < 30) return;
      const panel = document.getElementById("sparring-panel");
      if (panel?.contains(sel.anchorNode)) return;
      clearTimeout(clearTimer);
      setSelText(text);
    };
    const onSelChange = () => {
      if (window.getSelection()?.toString().trim()) return;
      clearTimeout(clearTimer);
      clearTimer = setTimeout(() => setSelText(null), 400);
    };
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
    document.addEventListener("selectionchange", onSelChange);
    return () => {
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchend", onUp);
      document.removeEventListener("selectionchange", onSelChange);
      clearTimeout(clearTimer);
    };
  }, []);

  const nav = id => { window.location.hash = id === "home" ? "" : id; };
  const Page = PAGES[page] || HomePage;

  return (
    <div style={s.page}>
      <a
        href="#main-content"
        style={skipLink}
        onFocus={e => { e.target.style.left = "16px"; e.target.style.top = "16px"; e.target.style.width = "auto"; e.target.style.height = "auto"; }}
        onBlur={e => { e.target.style.left = "-9999px"; e.target.style.top = "auto"; e.target.style.width = "1px"; e.target.style.height = "1px"; }}
      >
        Skip to content
      </a>
      <Nav page={page} onNav={nav} />
      <ErrorBoundary>
        <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
          {page === "home" ? (
            <main id="main-content">
              <Page onNav={nav} />
            </main>
          ) : (
            <main id="main-content" style={s.content}>
              <Page onNav={nav} />
              {page !== "glossary" && <Arrows current={page} onNav={nav} />}
            </main>
          )}
        </Suspense>
      </ErrorBoundary>
      <div style={{ background: c.canvasSoft, borderTop: `1px solid ${c.hairline}`, padding: "28px", fontFamily: font, fontSize: "13px", color: c.inkMute, textAlign: "center", letterSpacing: "0.2px" }}>
        © Ben Stern 2026 · Content: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: c.inkMute, textDecoration: "underline" }}>CC BY 4.0</a> · Code: <a href="https://github.com/bster/ai-future/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" style={{ color: c.inkMute, textDecoration: "underline" }}>MIT</a> · <a href="https://github.com/bster/ai-future" target="_blank" rel="noopener noreferrer" style={{ color: c.inkMute, textDecoration: "underline" }}>GitHub</a>
      </div>
      <Sparring
        page={page}
        sectionTitle={PAGE_TITLES[page]}
        selectedText={selText}
        onClearSelection={() => setSelText(null)}
      />
    </div>
  );
}
