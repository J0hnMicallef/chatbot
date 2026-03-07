// ─────────────────────────────────────────────────────────────
// src/api/GeminiApiFlash.js
//
// Gemini 2.0 Flash — 100% gratuit, sans CB
//    • 1 500 requêtes / jour
//    • 1 000 000 tokens / minute
//
// ─────────────────────────────────────────────────────────────

const GEMINI_MODEL = "gemini-1.5-flash-latest";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = "Tu es un assistant concis et utile. Réponds en français, de manière courte et précise. Tu t'appelles GeminiBot.";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? "";

function toGeminiMessages(history) {
  return history.map((m) => ({
    role:  m.role === "bot" ? "model" : "user",
    parts: [{ text: m.text }],
  }));
}

export async function sendMessage(history) {
  if (!API_KEY) {
    throw new Error("Clé API manquante. Ajoute VITE_GEMINI_API_KEY dans ton .env.local");
  }

  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: toGeminiMessages(history),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature:     0.7,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Réponse vide de l'API Gemini.");
  return text;
}
