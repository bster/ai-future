/**
 * Netlify Function — /api/chat
 *
 * Thin proxy: receives { system?, messages[] } from the browser,
 * forwards to Groq, returns { text } (or { error }).
 *
 * Local dev: `netlify dev` from the repo root serves this at /api/chat
 * automatically. Set GROQ_API_KEY in a root-level .env file.
 *
 * Production: set GROQ_API_KEY in the Netlify dashboard under
 * Site → Environment Variables. Do NOT commit the key anywhere.
 */

export default async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const { system, messages } = await req.json();

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
          ...(system ? [{ role: "system", content: system }] : []),
          ...messages,
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content ?? "The witness declines to answer.";
    return Response.json({ text }, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};

export const config = { path: "/api/chat" };
