import { useState, useEffect } from "react";
import { c, s } from "./design.js";
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
};

export default function App() {
  const [page, setPage] = useState(() => window.location.hash.slice(1) || "home");
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.slice(1) || "home";
      setPage(PAGES[id] ? id : "home");
      setTimeout(() => window.scrollTo({ top: 0 }), 10);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const nav = id => { window.location.hash = id === "home" ? "" : id; };
  const Page = PAGES[page] || HomePage;
  return (
    <div style={s.page}>
      <Nav page={page} onNav={nav} />
      {page === "home"
        ? <Page onNav={nav} />
        : (
          <div style={s.content}>
            <Page onNav={nav} />
            {page !== "explore" && <Arrows current={page} onNav={nav} />}
          </div>
        )
      }
      <div style={{ background: c.canvasSoft, borderTop: `1px solid ${c.hairline}`, padding: "28px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: c.inkMute, textAlign: "center", letterSpacing: "0.2px" }}>
        © Ben Stern 2026
      </div>
    </div>
  );
}
