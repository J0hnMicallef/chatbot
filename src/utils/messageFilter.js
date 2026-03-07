// ─────────────────────────────────────────────────────────────
// Filtre de messages avec :
//  - insensibilité à la casse
//  - normalisation des accents (héck → heck)
//  - détection floue : 1 caractère de différence toléré
//    (levenshtein distance <= 1)
//  - découpage mot par mot du message
// ─────────────────────────────────────────────────────────────

import BLOCKED_WORDS from "../config/blockedWords.js";

export const MAX_LENGTH          = 500;
export const MAX_MSGS_PER_SESSION = 50;

// ── Normalise : minuscules + supprime les accents ─────────────
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")                    // décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "")     // supprime les diacritiques
    .replace(/[^a-z0-9\s]/g, " ");       // remplace ponctuation par espace
}

// ── Distance de Levenshtein ───────────────────────────────────
// Retourne le nombre minimal d'opérations (insertion, suppression,
// substitution) pour passer de a à b.
function levenshtein(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 99; // optimisation rapide

  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

// ── Vérifie si un mot ressemble à un mot interdit ─────────────
// On autorise au maximum 1 caractère de différence,
// mais seulement si le mot fait au moins 5 lettres
// (évite les faux positifs sur les mots courts).
function isFuzzyBlocked(word, blockedWord) {
  const minLen = Math.min(word.length, blockedWord.length);
  const maxDist = minLen >= 6 ? 1 : 0; // distance 1 seulement pour mots longs
  return levenshtein(word, blockedWord) <= maxDist;
}

// ── Filtre principal ──────────────────────────────────────────
export function filterMessage(text) {
  // 1. Longueur maximale
  if (text.length > MAX_LENGTH) {
    return `Message trop long (maximum ${MAX_LENGTH} caractères).`;
  }

  const normalizedText  = normalize(text);
  const normalizedWords = normalizedText.split(/\s+/).filter(Boolean);

  // 2. Vérification mot par mot
  for (const blocked of BLOCKED_WORDS) {
    const normalizedBlocked = normalize(blocked);
    const blockedParts      = normalizedBlocked.split(/\s+/); // ex: "mot de passe" → 3 mots

    if (blockedParts.length === 1) {
      // Mot simple → comparaison mot à mot avec tolérance floue
      for (const word of normalizedWords) {
        if (isFuzzyBlocked(word, normalizedBlocked)) {
          return `Ce message contient un mot non autorisé.`;
        }
      }
    } else {
      // Expression multi-mots → vérification dans le texte normalisé
      if (normalizedText.includes(normalizedBlocked)) {
        return `Ce message contient une expression non autorisée.`;
      }
    }
  }

  return null; // null = message autorisé
}
