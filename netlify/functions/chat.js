/**
 * Netlify Function — /api/chat
 *
 * Thin proxy: receives { mode?, sectionTitle?, messages[] } from the browser,
 * builds the system prompt server-side, forwards to Groq, returns { text } or { error }.
 *
 * Local dev: `netlify dev` from the repo root serves this at /api/chat automatically.
 * Set GROQ_API_KEY in a root-level .env file (gitignored — never commit the key).
 *
 * Production: set GROQ_API_KEY in the Netlify dashboard under
 * Site → Environment Variables. Do NOT commit the key anywhere.
 */

const ALLOWED_ORIGINS = [
  "https://aiandhumanity.netlify.app",
  "http://localhost:8888",
  "http://localhost:5173",
];

function corsOrigin(req) {
  const origin = req.headers.get("origin") || "";
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}

function corsHeaders(req) {
  return {
    "Access-Control-Allow-Origin": corsOrigin(req),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// ── System prompts (server-side — clients cannot inject arbitrary instructions) ──

function adversaryPrompt(sectionTitle) {
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

function guidePrompt(sectionTitle) {
  let p = `You are a thoughtful AI tutor embedded in an educational guide about AI for liberal arts students and faculty. The reader has brought you a structured exercise from the guide. Engage with it genuinely: complete the task, offer a substantive and specific response, and push their thinking forward with a well-aimed follow-up question. Be direct — no filler, no hedging. 3–5 sentences unless the exercise calls for more.`;
  if (sectionTitle) {
    p += `\n\nThe reader is on the section: "${sectionTitle}".`;
  }
  return p;
}

// ── Handler ──────────────────────────────────────────────────────────────────

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(req) });
  }

  const cors = { "Access-Control-Allow-Origin": corsOrigin(req) };

  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: "GROQ_API_KEY is not configured. Set it in Netlify → Site configuration → Environment variables (scope: All / Functions), then redeploy." },
      { status: 500, headers: cors }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400, headers: cors });
  }

  const { mode = "adversary", sectionTitle, messages } = body;

  // Input validation
  if (!Array.isArray(messages) || messages.length > 20) {
    return Response.json({ error: "Invalid request." }, { status: 400, headers: cors });
  }
  for (const m of messages) {
    if (!m?.role || typeof m.content !== "string" || m.content.length > 4000) {
      return Response.json({ error: "Invalid request." }, { status: 400, headers: cors });
    }
  }

  const system = mode === "guide"
    ? guidePrompt(typeof sectionTitle === "string" ? sectionTitle : "")
    : adversaryPrompt(typeof sectionTitle === "string" ? sectionTitle : "");

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        messages: [
          { role: "system", content: system },
          ...messages,
        ],
      }),
    });

    if (!res.ok) {
      return Response.json(
        { error: "The AI service returned an error. Please try again." },
        { status: res.status, headers: cors }
      );
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content ?? "The witness declines to answer.";
    return Response.json({ text }, { headers: cors });

  } catch (err) {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500, headers: cors }
    );
  }
};

export const config = { path: "/api/chat" };
