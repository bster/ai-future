import { useState, useEffect, lazy, Suspense } from "react";
import { c, s } from "./design.js";
import { PAGE_TITLES } from "./data/nav.js";
import Nav from "./components/Nav.jsx";
import { Arrows } from "./components/Shared.jsx";
import HomePage from "./pages/HomePage.jsx";

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
      <Suspense fallback={<div style={{ ...s.content, color: c.inkMute, fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>Loading…</div>}>
        {page === "home" ? (
          <main id="main-content">
            <Page onNav={nav} />
          </main>
        ) : (
          <main id="main-content" style={s.content}>
            <Page onNav={nav} />
            {page !== "explore" && page !== "glossary" && <Arrows current={page} onNav={nav} />}
          </main>
        )}
      </Suspense>
      <div style={{ background: c.canvasSoft, borderTop: `1px solid ${c.hairline}`, padding: "28px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: c.inkMute, textAlign: "center", letterSpacing: "0.2px" }}>
        © Ben Stern 2026
      </div>
    </div>
  );
}
