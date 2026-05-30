import { useState, useEffect } from "react";
import { c, s, font } from "./design.js";
import { PAGE_TITLES } from "./data/nav.js";
import Nav from "./components/Nav.jsx";
import { Arrows } from "./components/Shared.jsx";
import HomePage from "./pages/HomePage.jsx";
import WhatPage from "./pages/WhatPage.jsx";
import GoodPage from "./pages/GoodPage.jsx";
import BadPage from "./pages/BadPage.jsx";
import TransformPage from "./pages/TransformPage.jsx";
import BeliefsPage from "./pages/BeliefsPage.jsx";
import FuturesPage from "./pages/FuturesPage.jsx";
import MirrorPage from "./pages/MirrorPage.jsx";
import UnknownPage from "./pages/UnknownPage.jsx";
import LiberalPage from "./pages/LiberalPage.jsx";
import StudentsPage from "./pages/StudentsPage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import GlossaryPage from "./pages/GlossaryPage.jsx";
import TheCommission from "./components/TheCommission.jsx";
import Sparring from "./components/Sparring.jsx";

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
  commission: TheCommission,
};

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
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  textDecoration: "none",
  borderRadius: "4px",
};

export default function App() {
  const [page, setPage] = useState(resolvePage);
  const [pendingChallenge, setPendingChallenge] = useState(null);
  const [selBadge, setSelBadge] = useState(null); // { text, x, y } — viewport coords

  useEffect(() => {
    const onHash = () => {
      const id = resolvePage();
      const raw = window.location.hash.slice(1);
      if (raw && !PAGES[raw]) {
        window.location.hash = "";
      }
      setPage(id);
      setTimeout(() => window.scrollTo({ top: 0 }), 10);
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const title = PAGE_TITLES[page] || PAGE_TITLES.home;
    document.title = page === "home" ? title : `${title} — Understanding AI`;
  }, [page]);

  // Text-selection → "Challenge this" badge
  useEffect(() => {
    const onMouseUp = () => {
      const sel = window.getSelection();
      const text = sel?.toString().trim();
      if (!text || text.length < 30) { setSelBadge(null); return; }
      // Ignore selections inside the Sparring panel itself
      const panel = document.getElementById("sparring-panel");
      if (panel?.contains(sel.anchorNode)) { setSelBadge(null); return; }
      try {
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        setSelBadge({ text, x: rect.left + rect.width / 2, y: rect.bottom + 10 });
      } catch { setSelBadge(null); }
    };
    const onSelChange = () => {
      if (!window.getSelection()?.toString().trim()) setSelBadge(null);
    };
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("selectionchange", onSelChange);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("selectionchange", onSelChange);
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
      {page === "home" || page === "commission" ? (
        <main id="main-content">
          <Page onNav={nav} />
        </main>
      ) : (
        <main id="main-content" style={s.content}>
          <Page onNav={nav} />
          {page !== "explore" && page !== "glossary" && <Arrows current={page} onNav={nav} />}
        </main>
      )}
      <div style={{ background: c.canvasSoft, borderTop: `1px solid ${c.hairline}`, padding: "28px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: c.inkMute, textAlign: "center", letterSpacing: "0.2px" }}>
        © Ben Stern 2026 · Content: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: c.inkMute, textDecoration: "underline" }}>CC BY 4.0</a> · Code: <a href="https://github.com/bster/ai-future/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" style={{ color: c.inkMute, textDecoration: "underline" }}>MIT</a> · <a href="https://github.com/bster/ai-future" target="_blank" rel="noopener noreferrer" style={{ color: c.inkMute, textDecoration: "underline" }}>GitHub</a>
      </div>
      {page !== "commission" && (
        <Sparring
          page={page}
          sectionTitle={PAGE_TITLES[page]}
          pendingChallenge={pendingChallenge}
          onChallengeConsumed={() => setPendingChallenge(null)}
        />
      )}
      {selBadge && page !== "commission" && (
        <button
          onClick={() => {
            setPendingChallenge(selBadge.text);
            setSelBadge(null);
            window.getSelection()?.removeAllRanges();
          }}
          style={{
            position: "fixed",
            top: selBadge.y,
            left: `clamp(80px, ${selBadge.x}px, calc(100vw - 80px))`,
            transform: "translateX(-50%)",
            zIndex: 145,
            background: c.ink, color: "#fff", border: "none",
            borderRadius: "9999px", padding: "7px 15px",
            fontFamily: font, fontSize: "13px", fontWeight: 500,
            cursor: "pointer", whiteSpace: "nowrap",
            boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
            animation: "challengeBadgeIn 0.15s ease both",
          }}
        >
          Challenge this →
        </button>
      )}
      <style>{`@keyframes challengeBadgeIn{from{opacity:0;transform:translateX(-50%) translateY(4px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
    </div>
  );
}
