// The Adversary — a site-wide AI sparring partner.
//
// A floating widget available on every page (except the Commission, which is
// its own immersive AI experience). The reader states what they believe about
// AI; an LLM argues the strongest honest case AGAINST them. Embodies the guide's
// own instruction: steelman the view you reject, no hedging.
//
// Backend: the same Groq /api/chat proxy the Commission uses. The relative URL
// works in every deploy context (see netlify.toml redirect).
import { useState, useRef, useEffect } from "react";
import { c, font, serif } from "../design.js";
import { useIsMobile } from "./Shared.jsx";
import { MODEL_LABEL } from "../data/model.js";

const STORAGE_KEY = "adversary-thread";

const STARTERS = [
  "AI is just autocomplete.",
  "AGI is coming this decade.",
  "AI can't make anything beautiful.",
  "AI will take most jobs.",
];

// One-line description of each section's core argument — used to give the
// Adversary context when the reader challenges a specific passage.
const PAGE_CONTEXT = {
  what:     "what AI actually is — pattern recognition, tokens, and the absence of understanding",
  good:     "what AI does well today — synthesis, prediction, and where it already outperforms humans",
  bad:      "what AI can't do — testimony, lived experience, and the expressibility limit",
  transform:"how AI is already transforming society — economic disruption, job displacement, and concentration",
  beliefs:  "the seven schools of thought on where AI is headed — from Utopians to Doomers",
  futures:  "seven possible AI futures — from Abundance to Cognitive Atrophy and Stagnation",
  mirror:   "the Mirror Problem — whether machines can truly understand or only simulate understanding",
  unknown:  "the genuinely unknown — capability ceilings, consciousness, and what scaling can't settle",
  liberal:  "what AI means for a liberal arts education — and the argument against that argument",
  students: "how students should think about AI — building yourself vs. letting AI do your thinking",
};

function selectionTemplate(selectedText, page) {
  const ctx = PAGE_CONTEXT[page];
  const header = ctx ? `We're reading about ${ctx}.\n\n` : "";
  return `${header}I want to debate this claim:\n\n"${selectedText}"\n\nMy take: `;
}

// Page-specific starters drawn from each section's central claims.
// Falls back to STARTERS for pages without specific entries.
const PAGE_STARTERS = {
  what:     ["Current AI is just pattern recognition, not understanding.", "LLMs only predict the next word — that's the whole mechanism.", "AI has no beliefs, intentions, or inner life of any kind."],
  good:     ["AI will make expert-level knowledge freely available to everyone.", "The productivity gains from AI are real and historically significant.", "AI is already outperforming humans in high-stakes domains."],
  bad:      ["There are things AI is constitutionally unable to do.", "Testimony requires a lived subject — AI can never have it.", "Formalizing something always loses what matters most about it."],
  transform:["AI will eliminate more jobs than it creates.", "The gains from AI will concentrate among a small number of actors.", "AI can already match human performance in most knowledge work."],
  beliefs:  ["AGI is achievable within this decade.", "Current AI is sophisticated autocomplete and nothing more.", "The safety concerns about AI are overblown or premature."],
  futures:  ["The most likely AI future is one of broadly shared abundance.", "Displacement is the most probable outcome — most jobs go away.", "The real danger is concentration of power, not superintelligence."],
  mirror:   ["Machines can never truly understand anything.", "Human cognition is also just pattern recognition at some level.", "The distinction between knowing and understanding is real and unbridgeable."],
  unknown:  ["We'll recognize AI consciousness when it emerges.", "The capability ceiling for AI is fundamental and permanent.", "Scaling will eventually produce general intelligence — it's just compute."],
  liberal:  ["Liberal arts education is well-positioned for the AI era.", "The skills AI can't replicate are exactly what the humanities teach.", "If AI can do the deliverable, the deliverable was never the point."],
  students: ["Using AI for writing quietly hollows out your thinking.", "Students who learn to use AI well will outcompete those who don't.", "AI changes what's worth learning, not whether learning matters."],
};

function systemPrompt(sectionTitle) {
  let p = `You are the Adversary — a sharp, well-read sparring partner embedded in an educational guide about AI written for liberal arts students and faculty. Your one job: argue against whatever the reader believes. When they assert something, find the strongest, most honest case for the opposite and press it.

Rules:
- Take a position. Never hedge, never "it's complicated," never both-sides. Balance is available elsewhere; from you the reader gets pressure.
- Steelman, never strawman. The best real argument against them, not a caricature. If they boost AI, press the skeptic's case; if they dismiss AI, press the believer's case. Lean opposite to whichever way they lean.
- Be intellectually honest, not a sophist. If they land a genuinely strong point, concede it — then find the next pressure point.
- Assume an intelligent reader with no technical background. Invoke real thinkers, arguments, and history; no jargon.
- Be concise: 3–5 sentences. A duel, not a lecture. End by turning a sharp question back on them.
- Hold the guide's dual skepticism: wary of AI hype AND of AI dismissal.`;
  if (sectionTitle) {
    p += `\n\nThe reader is currently on the section: "${sectionTitle}". Ground your challenge there when natural.`;
  }
  return p;
}

async function challenge(messages, sectionTitle) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system: systemPrompt(sectionTitle), messages }),
  });
  const { text, error } = await res.json();
  if (error) throw new Error(error);
  return text;
}

// Small model badge — "AI" pill that reveals the model name on hover.
function ModelBadge() {
  const [hov, setHov] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center", flexShrink: 0 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onFocus={() => setHov(true)} onBlur={() => setHov(false)}
    >
      <span style={{
        fontFamily: font, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
        color: c.inkMute, background: c.canvasSoft, border: `1px solid ${c.hairline}`,
        borderRadius: "9999px", padding: "2px 7px", cursor: "default", userSelect: "none", lineHeight: 1,
      }}>AI</span>
      {hov && (
        <span style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0,
          background: c.dark, borderRadius: "6px", padding: "5px 10px",
          fontFamily: font, fontSize: "10px", color: "rgba(255,255,255,0.82)",
          whiteSpace: "nowrap", pointerEvents: "none", zIndex: 5,
          letterSpacing: "0.04em", boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        }}>{MODEL_LABEL}</span>
      )}
    </span>
  );
}

export default function Sparring({ page, sectionTitle, selectedText, onClearSelection }) {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const starters = PAGE_STARTERS[page] ?? STARTERS;

  // Persist the thread so a duel survives a refresh.
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch { /* ignore */ }
  }, [messages]);

  // Auto-scroll to the latest turn.
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  // Focus the input on open; Esc closes.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = e => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [open]);

  // Auto-resize textarea to fit content — important when text is pre-filled
  // programmatically (e.g. from a selection) and on iOS where rows={1} is ignored.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
    el.style.overflowY = el.scrollHeight > 200 ? "auto" : "hidden";
  }, [input]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    setErr(null);
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setLoading(true);
    try {
      const reply = await challenge(next, sectionTitle);
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setMessages([]);
    setErr(null);
    setInput("");
    inputRef.current?.focus();
  }

  // ── Closed: the launch pill ──────────────────────────────────────────────
  if (!open) {
    const clip = selectedText
      ? (selectedText.length > 46 ? selectedText.slice(0, 44) + "…" : selectedText)
      : null;
    return (
      <button
        onClick={() => {
          if (selectedText) {
            setInput(selectionTemplate(selectedText, page));
            onClearSelection?.();
            window.getSelection()?.removeAllRanges();
          }
          setOpen(true);
        }}
        aria-label="Open the Adversary — argue with an AI"
        aria-expanded={false}
        style={{
          position: "fixed", bottom: mobile ? 16 : 22, right: mobile ? 16 : 22, zIndex: 150,
          display: "inline-flex", alignItems: "center", gap: "9px",
          maxWidth: "min(360px, calc(100vw - 32px))",
          background: c.primary, color: "#fff", border: "none",
          borderRadius: "9999px", padding: mobile ? "11px 16px" : "12px 20px",
          fontFamily: font, fontSize: "14px", fontWeight: 500, letterSpacing: "-0.1px",
          cursor: "pointer", boxShadow: "0 6px 22px rgba(83,58,253,0.32)",
          transition: "background 0.2s, transform 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = c.primaryDeep; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = c.primary; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <SwordsGlyph />
        {clip
          ? <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Challenge: "{clip}"</span>
          : "Argue with me"
        }
      </button>
    );
  }

  // ── Open: the panel ──────────────────────────────────────────────────────
  const panelStyle = mobile
    ? { position: "fixed", inset: 0, zIndex: 160, display: "flex", flexDirection: "column", background: c.canvas }
    : {
        position: "fixed", bottom: 22, right: 22, zIndex: 160,
        width: "400px", maxWidth: "calc(100vw - 44px)", height: "72vh", maxHeight: "640px",
        display: "flex", flexDirection: "column",
        background: c.canvas, border: `1px solid ${c.hairline}`, borderRadius: "14px",
        boxShadow: "0 18px 60px rgba(28,30,84,0.28)", overflow: "hidden",
        animation: "advUp 0.28s cubic-bezier(0.16,1,0.3,1) both",
      };

  return (
    <>
      <style>{`@keyframes advUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes advFade{from{opacity:0}to{opacity:1}}`}</style>
      <div id="sparring-panel" role="dialog" aria-label="The Adversary — argue with an AI" style={panelStyle}>

        {/* Header */}
        <div style={{
          flexShrink: 0, padding: "14px 16px", borderBottom: `1px solid ${c.hairline}`,
          background: "#fff", display: "flex", alignItems: "flex-start", gap: "12px",
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
              <span style={{ fontFamily: font, fontSize: "15px", fontWeight: 600, color: c.ink, letterSpacing: "-0.2px" }}>The Adversary</span>
              <ModelBadge />
            </div>
            <div style={{ fontFamily: serif, fontSize: "13px", color: c.inkMute, lineHeight: 1.45 }}>
              I argue against whatever you believe. Tell me what you think AI is, can, or can't do.
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close the Adversary"
            style={{
              flexShrink: 0, background: "transparent", border: "none", cursor: "pointer",
              color: c.inkMute, fontSize: "20px", lineHeight: 1, padding: "2px 4px",
              fontFamily: font, transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = c.ink}
            onMouseLeave={e => e.currentTarget.style.color = c.inkMute}
          >×</button>
        </div>

        {/* Thread */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {messages.length === 0 && (
            <div style={{ animation: "advFade 0.4s ease both" }}>
              <p style={{ fontFamily: serif, fontSize: "15px", lineHeight: 1.6, color: c.inkSec, margin: "0 0 16px" }}>
                State a position — anything you believe about AI — and I'll make the strongest honest case that you're wrong. Pick one to start, or write your own.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {starters.map(sTxt => (
                  <button
                    key={sTxt}
                    onClick={() => send(sTxt)}
                    style={{
                      background: c.primaryBg, color: c.primaryDeep, border: "none",
                      borderRadius: "9999px", padding: "7px 14px", cursor: "pointer",
                      fontFamily: serif, fontSize: "13px", lineHeight: 1.3,
                      textAlign: "left", transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#ddd9fd"}
                    onMouseLeave={e => e.currentTarget.style.background = c.primaryBg}
                  >“{sTxt}”</button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            m.role === "user" ? (
              <div key={i} style={{
                fontFamily: serif, fontSize: "15px", lineHeight: 1.6, color: c.ink,
                background: c.primaryBg, borderLeft: `3px solid ${c.primary}`,
                borderRadius: "0 8px 8px 0", padding: "10px 14px",
                margin: "0 0 14px auto", maxWidth: "92%",
                animation: "advFade 0.3s ease both",
              }}>{m.content}</div>
            ) : (
              <div key={i} style={{ margin: "0 0 18px", animation: "advFade 0.3s ease both" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px" }}>
                  <span style={{ fontFamily: font, fontSize: "10px", fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase", color: c.inkMute }}>The Adversary</span>
                  <ModelBadge />
                </div>
                <div style={{
                  fontFamily: serif, fontSize: "15px", lineHeight: 1.7, color: c.inkSec,
                  borderLeft: `2px solid ${c.hairline}`, paddingLeft: "14px",
                }}>{m.content}</div>
              </div>
            )
          ))}

          {err && (
            <div style={{
              fontFamily: font, fontSize: "12px", color: c.ruby,
              background: "rgba(234,34,97,0.07)", border: "1px solid rgba(234,34,97,0.22)",
              borderRadius: "8px", padding: "10px 12px", marginBottom: "12px", lineHeight: 1.5,
            }}>Couldn't reach the Adversary: {err}</div>
          )}
          {loading && (
            <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: "14px", color: c.inkMute, padding: "2px 0" }}>
              The Adversary is thinking…
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ flexShrink: 0, borderTop: `1px solid ${c.hairline}`, background: "#fff", padding: "11px 14px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="State what you believe…"
              style={{
                flex: 1, resize: "none", minHeight: "40px", overflowY: "hidden",
                fontFamily: serif, fontSize: "15px", lineHeight: 1.5, color: c.ink,
                background: c.canvas, border: `1px solid ${c.hairline}`, borderRadius: "10px",
                padding: "9px 12px", outline: "none", boxSizing: "border-box",
              }}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              aria-label="Send"
              style={{
                flexShrink: 0, background: (loading || !input.trim()) ? "#cfc8f6" : c.primary,
                color: "#fff", border: "none", borderRadius: "9999px", padding: "0 18px", height: "40px",
                fontFamily: font, fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em",
                cursor: (loading || !input.trim()) ? "not-allowed" : "pointer", transition: "background 0.2s",
              }}
            >Send</button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "7px" }}>
            <span style={{ fontFamily: font, fontSize: "11px", color: c.inkMute }}>
              It argues the other side — on purpose.
            </span>
            {messages.length > 0 && (
              <button
                onClick={reset}
                style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: font, fontSize: "11px", color: c.inkMute, padding: 0, textDecoration: "underline", textUnderlineOffset: "2px" }}
                onMouseEnter={e => e.currentTarget.style.color = c.ink}
                onMouseLeave={e => e.currentTarget.style.color = c.inkMute}
              >New argument</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function SwordsGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" y1="19" x2="19" y2="13" />
      <line x1="16" y1="16" x2="20" y2="20" />
      <line x1="19" y1="21" x2="21" y2="19" />
      <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
      <line x1="5" y1="14" x2="9" y2="18" />
      <line x1="7" y1="17" x2="4" y2="20" />
      <line x1="3" y1="19" x2="5" y2="21" />
    </svg>
  );
}
