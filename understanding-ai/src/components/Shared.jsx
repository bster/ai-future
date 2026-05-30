import { useState, useEffect, useCallback, useRef } from "react";
import { c, font, serif, s } from "../design.js";
import { SECTION_META, TOTAL, ALL_SECTIONS, sectionLabel } from "../data/nav.js";

let mobileViewport = typeof window !== "undefined" ? window.innerWidth < 1024 : false;
const mobileListeners = new Set();

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    const next = window.innerWidth < 1024;
    if (next !== mobileViewport) {
      mobileViewport = next;
      mobileListeners.forEach(fn => fn(next));
    }
  });
}

export function useIsMobile() {
  const [mobile, setMobile] = useState(mobileViewport);
  useEffect(() => {
    mobileListeners.add(setMobile);
    return () => mobileListeners.delete(setMobile);
  }, []);
  return mobile;
}

export function Ref({ label, url }) {
  return <a href={url} target="_blank" rel="noopener noreferrer" style={s.ref}>{label} ↗</a>;
}

export function Video({ id, caption }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ margin: "36px 0" }}>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#1a1a1f", borderRadius: "8px", overflow: "hidden" }}>
        {loaded ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title={caption || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            aria-label={caption ? `Play video: ${caption}` : "Play video"}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
              cursor: "pointer",
              background: `center/cover no-repeat url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.75)",
              color: "#fff",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "4px",
            }} aria-hidden="true">▶</span>
          </button>
        )}
      </div>
      {caption && <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: "15px", color: c.inkMute, marginTop: "12px", lineHeight: 1.5 }}>{caption}</div>}
    </div>
  );
}

export function Li({ children }) {
  return (
    <li style={s.li}>
      <span style={{ position: "absolute", left: 0, color: c.primary }}>–</span>
      {children}
    </li>
  );
}

function copyPrompt(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  return Promise.resolve();
}

const tryItBtn = {
  display: "inline-block",
  fontFamily: font,
  fontSize: "12px",
  fontStyle: "normal",
  color: c.primaryDeep,
  background: "rgba(255,255,255,0.75)",
  border: `1px solid rgba(83,58,253,0.22)`,
  padding: "4px 11px",
  borderRadius: "9999px",
  textDecoration: "none",
  cursor: "pointer",
};

export function TryIt({ prompts }) {
  const [copied, setCopied] = useState(null);
  const onCopy = useCallback((p, i) => {
    copyPrompt(p).then(() => {
      setCopied(i);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);

  return (
    <div style={{ marginTop: "24px", padding: "24px 26px 20px", background: c.primaryBg, borderRadius: "8px", border: `1px solid rgba(83,58,253,0.15)` }}>
      <div style={{ fontFamily: font, fontSize: "11px", letterSpacing: "0.4px", textTransform: "uppercase", color: c.primaryDeep, fontWeight: 600, marginBottom: "16px" }}>Try It With an AI</div>
      {prompts.map((p, i) => (
        <div key={i} style={{ marginBottom: i < prompts.length - 1 ? "14px" : 0, paddingBottom: i < prompts.length - 1 ? "14px" : 0, borderBottom: i < prompts.length - 1 ? `1px solid rgba(83,58,253,0.14)` : "none" }}>
          <p style={{ fontFamily: serif, fontSize: "16px", fontStyle: "italic", color: c.ink, margin: "0 0 10px", lineHeight: 1.6 }}>"{p}"</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <button type="button" onClick={() => onCopy(p, i)} style={{ ...tryItBtn, border: `1px solid rgba(83,58,253,0.22)` }}>
              {copied === i ? "Copied" : "Copy prompt"}
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("sparring:open", { detail: { prompt: p, mode: "guide" } }))}
              style={{ ...tryItBtn, background: c.primary, color: "#fff", border: "none" }}
            >Ask here →</button>
            <a href={`https://chatgpt.com/?q=${encodeURIComponent(p)}`} target="_blank" rel="noopener noreferrer" style={tryItBtn}>ChatGPT →</a>
            <a href={`https://claude.ai/new`} target="_blank" rel="noopener noreferrer" style={tryItBtn} title="Paste the copied prompt in Claude">Claude →</a>
            <a href={`https://gemini.google.com/app`} target="_blank" rel="noopener noreferrer" style={tryItBtn} title="Paste the copied prompt in Gemini">Gemini →</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DQ({ questions }) {
  return (
    <div style={s.dq}>
      <div style={s.dqLabel}>Discussion Questions</div>
      {questions.map((q, i) => (
        <div key={i} style={{ ...s.dqItem, borderBottom: i < questions.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
          {i + 1}. {q}
        </div>
      ))}
    </div>
  );
}

export function SectionBadge({ id }) {
  const meta = SECTION_META[id];
  if (!meta) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
      <span style={s.pill}>{meta.part}</span>
      <span style={{ fontFamily: font, fontSize: "12px", color: c.inkMute, letterSpacing: "0.3px", textTransform: "uppercase" }}>{meta.num} of {TOTAL}</span>
    </div>
  );
}

export function ProgressBar({ id }) {
  const meta = SECTION_META[id];
  if (!meta) return null;
  return (
    <div style={{ height: "2px", background: c.hairline }}>
      <div style={{ height: "100%", width: `${(meta.num / TOTAL) * 100}%`, background: c.primary, transition: "width 0.3s ease" }} />
    </div>
  );
}

export function Accordion({ items, openIndex, setOpenIndex, idPrefix = "acc", panelPaddingLeft }) {
  const padLeft = panelPaddingLeft ?? 18;
  const itemRefs = useRef([]);
  const handleOpen = (i, isOpen) => {
    setOpenIndex(isOpen ? null : i);
    if (!isOpen) {
      setTimeout(() => {
        itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };
  return (
    <div style={{ marginTop: items[0]?.marginTop ?? "16px" }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const btnId = `${idPrefix}-btn-${i}`;
        const panelId = `${idPrefix}-panel-${i}`;
        return (
          <div key={item.key ?? i} ref={el => { itemRefs.current[i] = el; }} style={{ scrollMarginTop: "60px", marginBottom: "8px", border: `1px solid ${c.hairline}`, borderRadius: "10px", background: isOpen ? c.canvasSoft : c.canvas, overflow: "hidden" }}>
            <button
              type="button"
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => handleOpen(i, isOpen)}
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", fontFamily: font }}
            >
              {item.color && (
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color, flexShrink: 0 }} aria-hidden="true" />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: "15px", color: c.ink, letterSpacing: "-0.2px" }}>{item.title}</div>
                {item.subtitle && (
                  <div style={{ fontSize: "13px", color: c.inkMute, marginTop: "2px", fontStyle: item.subtitleItalic ? "italic" : "normal" }}>{item.subtitle}</div>
                )}
              </div>
              <span style={{ color: c.primary, fontSize: "18px", flexShrink: 0 }} aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div id={panelId} role="region" aria-labelledby={btnId} style={{ padding: `0 18px 18px ${padLeft}px` }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Arrows({ current, onNav }) {
  const flat = ALL_SECTIONS.filter(x => x.id !== "home");
  const idx = flat.findIndex(x => x.id === current);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;
  const isMobile = useIsMobile();
  const base = { border: "none", padding: isMobile ? "10px 16px" : "11px 22px", fontFamily: font, fontSize: isMobile ? "13px" : "14px", fontWeight: 400, cursor: "pointer", flex: 1, minWidth: 0, borderRadius: "9999px", letterSpacing: "-0.1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
  return (
    <div style={s.arrows}>
      {prev
        ? <button type="button" style={{ ...base, background: c.canvasSoft, color: c.ink, border: `1px solid ${c.hairline}`, textAlign: "left" }} onClick={() => onNav(prev.id)}>← {sectionLabel(prev.id)}</button>
        : <div style={{ flex: 1 }} />}
      {next
        ? <button type="button" style={{ ...base, background: c.primary, color: "#fff", textAlign: "right" }} onClick={() => onNav(next.id)}>{sectionLabel(next.id)} →</button>
        : <div style={{ flex: 1 }} />}
    </div>
  );
}
