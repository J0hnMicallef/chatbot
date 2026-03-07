// ─────────────────────────────────────────────────────────────
// src/api/claudeApi.js
// Toute la communication avec l'API Claude Haiku est ici.
// Si demain tu changes de modèle ou d'endpoint, tu ne touches
// qu'à ce seul fichier.
// ─────────────────────────────────────────────────────────────

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL   = "claude-haiku-4-5-20251001";

const SYSTEM_PROMPT = `Tu es un assistant concis et utile.
Réponds en français, de manière courte et précise.
Tu t'appelles HaikuBot.`;

/**
 * Convertit l'historique interne { role: "bot"|"user", text }
 * au format attendu par l'API Anthropic { role: "assistant"|"user", content }.
 */
function toApiMessages(history) {
  return history.map((m) => ({
    role: m.role === "bot" ? "assistant" : "user",
    content: m.text,
  }));
}

/**
 * Envoie un message à Claude Haiku et retourne la réponse texte.
 * @param {Array}  history  - Historique complet de la conversation
 * @returns {Promise<string>}
 */
export async function sendMessage(history) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: toApiMessages(history),
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text;
  if (!text) throw new Error("Réponse vide de l'API.");
  return text;
}
