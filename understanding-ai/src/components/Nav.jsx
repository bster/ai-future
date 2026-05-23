import { useState, useRef, useEffect } from "react";
import { c, font } from "../design.js";
import { NAV_GROUPS, SECTION_META, TOTAL } from "../data/nav.js";
import { useIsMobile, ProgressBar } from "./Shared.jsx";

const GITHUB_URL = "https://github.com/bster/ai-future";

function GitHubIcon() {
  return (
    <svg height="17" width="17" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ display: "block" }}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function Nav({ page, onNav }) {
  const [open, setOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(null);
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setOpen(null);
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const activeGroup = NAV_GROUPS.findIndex(g => g.sections.some(x => x.id === page));
  const nb = { background: "none", border: "none", fontFamily: font, cursor: "pointer" };
  const meta = SECTION_META[page];

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <nav ref={ref} aria-label="Main" style={{ background: c.canvas, borderBottom: `1px solid ${c.hairline}`, boxShadow: "0 1px 3px rgba(13,37,61,0.04)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", minHeight: "52px", gap: "4px" }}>
          <button type="button" onClick={() => { onNav("home"); setOpen(null); setMenuOpen(false); }} style={{ ...nb, color: c.ink, fontWeight: page === "home" ? 500 : 400, fontSize: "15px", padding: "14px 16px 14px 0", marginRight: "8px", letterSpacing: "-0.3px", flexShrink: 0 }}>
            Understanding AI
          </button>
          {isMobile ? (
            <>
              {meta && <span style={{ fontSize: "13px", color: c.inkMute, flex: 1, textAlign: "right", marginRight: "10px" }}>{meta.num}/{TOTAL}</span>}
              <button
                type="button"
                onClick={() => setMenuOpen(m => !m)}
                aria-label="Menu"
                aria-expanded={menuOpen}
                style={{ ...nb, color: c.inkMute, fontSize: "18px", padding: "8px", marginLeft: meta ? "0" : "auto" }}
              >
                {menuOpen ? "✕" : "☰"}
              </button>
              {menuOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: c.canvas, borderBottom: `1px solid ${c.hairline}`, zIndex: 300, maxHeight: "80vh", overflowY: "auto", boxShadow: "0 8px 24px rgba(13,37,61,0.08)" }}>
                  {NAV_GROUPS.map((g, gi) => (
                    <div key={gi}>
                      <div style={{ padding: "12px 20px 4px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1px", color: c.inkMute, fontWeight: 400 }}>{g.label}</div>
                      {g.sections.map(sec => (
                        <button type="button" key={sec.id} onClick={() => { onNav(sec.id); setMenuOpen(false); }} style={{ ...nb, display: "block", width: "100%", textAlign: "left", color: page === sec.id ? c.primary : c.inkSec, fontSize: "15px", padding: "10px 20px 10px 28px", background: page === sec.id ? c.primaryBg : "none", borderLeft: page === sec.id ? `2px solid ${c.primary}` : "2px solid transparent" }}>
                          {sec.label}
                        </button>
                      ))}
                    </div>
                  ))}
                  <div style={{ borderTop: `1px solid ${c.hairline}`, margin: "8px 0" }} />
                  <div style={{ padding: "8px 16px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: c.inkSec, fontSize: "15px", textDecoration: "none", padding: "11px 16px", borderRadius: "9999px", border: `1px solid ${c.hairline}` }}>
                      <GitHubIcon />
                      Fork or contribute
                    </a>
                    <button type="button" onClick={() => { onNav("explore"); setMenuOpen(false); }} style={{ ...nb, display: "block", width: "100%", textAlign: "center", color: "#fff", background: c.primary, fontSize: "15px", padding: "11px 16px", borderRadius: "9999px" }}>
                      Explore AI →
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {NAV_GROUPS.map((g, gi) => {
                const isActive = activeGroup === gi;
                const isOpen = open === gi;
                return (
                  <div key={gi} style={{ position: "relative" }}>
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : gi)}
                      style={{ ...nb, color: isActive ? c.primary : c.inkSec, fontSize: "14px", padding: "14px 10px", borderBottom: isActive ? `2px solid ${c.primary}` : "2px solid transparent", marginBottom: "-1px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "4px", fontWeight: isActive ? 500 : 400 }}
                    >
                      {g.label}<span style={{ fontSize: "9px", opacity: 0.5 }} aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
                    </button>
                    {isOpen && (
                      <div role="menu" style={{ position: "absolute", top: "calc(100% + 1px)", left: 0, background: c.canvas, border: `1px solid ${c.hairline}`, borderRadius: "8px", minWidth: "210px", zIndex: 200, boxShadow: "0 8px 24px rgba(13,37,61,0.08)", overflow: "hidden" }}>
                        {g.sections.map(sec => (
                          <button type="button" role="menuitem" key={sec.id} onClick={() => { onNav(sec.id); setOpen(null); }} style={{ ...nb, display: "block", width: "100%", textAlign: "left", color: page === sec.id ? c.primary : c.ink, fontSize: "14px", padding: "10px 16px", background: page === sec.id ? c.primaryBg : "none", borderLeft: page === sec.id ? `2px solid ${c.primary}` : "2px solid transparent" }}>
                            {sec.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ flex: 1 }} />
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" title="Fork or contribute on GitHub" aria-label="GitHub repository" style={{ display: "flex", alignItems: "center", color: c.inkSec, textDecoration: "none", padding: "8px 10px", flexShrink: 0 }}>
                <GitHubIcon />
              </a>
              <button type="button" onClick={() => { onNav("explore"); setOpen(null); }} style={{ ...nb, background: page === "explore" ? c.primaryPress : c.primary, color: "#fff", fontSize: "14px", padding: "8px 18px", borderRadius: "9999px", fontWeight: 400, flexShrink: 0, letterSpacing: "-0.1px" }}>
                Explore AI
              </button>
            </>
          )}
        </div>
      </nav>
      {meta && <ProgressBar id={page} />}
    </div>
  );
}
