import { useState, useRef, useEffect } from "react";
import { c, font } from "../design.js";
import { NAV_GROUPS, SECTION_META, TOTAL } from "../data/nav.js";
import { useIsMobile, ProgressBar } from "./Shared.jsx";

export default function Nav({ page, onNav }) {
  const [open, setOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const ref = useRef(null);
  useEffect(() => {
    function handle(e) { if (ref.current && !ref.current.contains(e.target)) { setOpen(null); setMenuOpen(false); } }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);
  const activeGroup = NAV_GROUPS.findIndex(g => g.sections.some(x => x.id === page));
  const nb = { background: "none", border: "none", fontFamily: font, cursor: "pointer" };
  const meta = SECTION_META[page];
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <nav ref={ref} style={{ background: c.canvas, borderBottom: `1px solid ${c.hairline}`, boxShadow: "0 1px 3px rgba(13,37,61,0.04)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", minHeight: "52px", gap: "4px" }}>
          <button onClick={() => { onNav("home"); setOpen(null); setMenuOpen(false); }} style={{ ...nb, color: c.ink, fontWeight: page === "home" ? 500 : 400, fontSize: "15px", padding: "14px 16px 14px 0", marginRight: "8px", letterSpacing: "-0.3px", flexShrink: 0 }}>
            Understanding AI
          </button>
          {isMobile ? (
            <>
              {meta && <span style={{ fontSize: "13px", color: c.inkMute, flex: 1, textAlign: "right", marginRight: "10px" }}>{meta.num}/{TOTAL}</span>}
              <button onClick={() => setMenuOpen(m => !m)} style={{ ...nb, color: c.inkMute, fontSize: "18px", padding: "8px", marginLeft: meta ? "0" : "auto" }} aria-label="Menu">
                {menuOpen ? "✕" : "☰"}
              </button>
              {menuOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: c.canvas, borderBottom: `1px solid ${c.hairline}`, zIndex: 300, maxHeight: "80vh", overflowY: "auto", boxShadow: "0 8px 24px rgba(13,37,61,0.08)" }}>
                  {NAV_GROUPS.map((g, gi) => (
                    <div key={gi}>
                      <div style={{ padding: "12px 20px 4px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1px", color: c.inkMute, fontWeight: 400 }}>{g.label}</div>
                      {g.sections.map(sec => (
                        <button key={sec.id} onClick={() => { onNav(sec.id); setMenuOpen(false); }} style={{ ...nb, display: "block", width: "100%", textAlign: "left", color: page === sec.id ? c.primary : c.inkSec, fontSize: "15px", padding: "10px 20px 10px 28px", background: page === sec.id ? c.primaryBg : "none", borderLeft: page === sec.id ? `2px solid ${c.primary}` : "2px solid transparent" }}>
                          {sec.label}
                        </button>
                      ))}
                    </div>
                  ))}
                  <div style={{ borderTop: `1px solid ${c.hairline}`, margin: "8px 0" }} />
                  <div style={{ padding: "8px 16px 16px" }}>
                    <button onClick={() => { onNav("explore"); setMenuOpen(false); }} style={{ ...nb, display: "block", width: "100%", textAlign: "center", color: "#fff", background: c.primary, fontSize: "15px", padding: "11px 16px", borderRadius: "9999px" }}>
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
                    <button onClick={() => setOpen(isOpen ? null : gi)} style={{ ...nb, color: isActive ? c.primary : c.inkSec, fontSize: "14px", padding: "14px 10px", borderBottom: isActive ? `2px solid ${c.primary}` : "2px solid transparent", marginBottom: "-1px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "4px", fontWeight: isActive ? 400 : 300 }}>
                      {g.label}<span style={{ fontSize: "9px", opacity: 0.5 }}>{isOpen ? "▲" : "▼"}</span>
                    </button>
                    {isOpen && (
                      <div style={{ position: "absolute", top: "calc(100% + 1px)", left: 0, background: c.canvas, border: `1px solid ${c.hairline}`, borderRadius: "8px", minWidth: "210px", zIndex: 200, boxShadow: "0 8px 24px rgba(13,37,61,0.08)", overflow: "hidden" }}>
                        {g.sections.map(sec => (
                          <button key={sec.id} onClick={() => { onNav(sec.id); setOpen(null); }} style={{ ...nb, display: "block", width: "100%", textAlign: "left", color: page === sec.id ? c.primary : c.ink, fontSize: "14px", padding: "10px 16px", background: page === sec.id ? c.primaryBg : "none", borderLeft: page === sec.id ? `2px solid ${c.primary}` : "2px solid transparent" }}>
                            {sec.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ flex: 1 }} />
              <button onClick={() => { onNav("explore"); setOpen(null); }} style={{ ...nb, background: page === "explore" ? c.primaryPress : c.primary, color: "#fff", fontSize: "14px", padding: "8px 18px", borderRadius: "9999px", fontWeight: 400, flexShrink: 0, letterSpacing: "-0.1px" }}>
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
