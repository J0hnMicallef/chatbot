// ─────────────────────────────────────────────────────────────
// Groq — 100% gratuit
//   • Modèle : llama-3.3-70b-versatile
//   • ~14 400 requêtes / jour gratuites
// ─────────────────────────────────────────────────────────────

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL   = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = "Tu es un assistant concis et utile. Réponds en français, de manière courte et précise. Tu t'appelles GroqBot.";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY ?? "";

/**
 * Convertit l'historique interne { role: "bot"|"user", text }
 * au format OpenAI { role: "assistant"|"user", content }
 * (Groq utilise le même format qu'OpenAI)
 */
function toGroqMessages(history) {
  return history.map((m) => ({
    role:    m.role === "bot" ? "assistant" : "user",
    content: m.text,
  }));
}

export async function sendMessage(history) {
  if (!API_KEY) {
    throw new Error("Clé API manquante. Ajoute VITE_GROQ_API_KEY dans ton .env.local");
  }

  const response = await fetch(API_URL, {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model:       MODEL,
      max_tokens:  1000,
      temperature: 0.7,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...toGroqMessages(history),
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Réponse vide de l'API Groq.");
  return text;
}