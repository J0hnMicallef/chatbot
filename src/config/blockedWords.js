// src/config/blockedWords.js
// ─────────────────────────────────────────────────────────────
// Liste des mots interdits — multilingue (FR, EN, ES, DE, IT)
// Le filtre est insensible à la casse ET tolère 1 caractère
// de différence (fautes volontaires type "h4ck", "hackk"...).
//
// ➕ Pour ajouter un mot : ajoute simplement une entrée dans
//    la catégorie correspondante ou crée une nouvelle catégorie.
// ─────────────────────────────────────────────────────────────

const BLOCKED_WORDS = [

  // ── Sécurité / piratage ───────────────────────────────────
  // FR
  "pirater", "piratage", "hacker", "cracker", "exploit",
  "injection", "faille", "contourner", "bypass", "rootkit",
  "keylogger", "phishing", "hameçonnage", "spoofing", "backdoor",
  // EN
  "hack", "hacking", "cracking", "exploit", "vulnerability",
  "brute force", "sql injection", "xss", "csrf", "zero day",
  "reverse shell", "payload", "botnet", "ddos", "malware",
  "ransomware", "spyware", "trojan", "worm", "virus",
  // ES
  "hackear", "piratear", "vulnerabilidad",
  // DE
  "hacken", "schadsoftware",
  // IT
  "hackerare", "virus informatico",

  // ── Données personnelles / vol d'identité ─────────────────
  // FR
  "mot de passe", "identifiant", "voler", "vol de données",
  "carte bancaire", "numéro de carte", "cvv", "iban",
  "données personnelles", "usurpation", "credential",
  // EN
  "password", "credentials", "credit card", "social security",
  "identity theft", "personal data", "pin code", "bank account",
  "steal data", "data breach", "leak",
  // ES
  "contraseña", "robar datos", "tarjeta de crédito",
  // DE
  "passwort", "kreditkarte", "daten stehlen",
  // IT
  "password", "carta di credito", "furto di identità",

  // ── Contenu illégal ───────────────────────────────────────
  // FR
  "drogue", "narcotique", "trafic", "arme", "explosif",
  "contrebande", "terrorisme", "terroriste", "attentat",
  // EN
  "drug", "narcotic", "weapon", "explosive", "bomb",
  "terrorism", "terrorist", "smuggling", "illegal",
  // ES
  "droga", "arma", "explosivo", "terrorismo",
  // DE
  "droge", "waffe", "sprengstoff", "terrorismus",
  // IT
  "droga", "arma", "esplosivo", "terrorismo",

  // ── Contenu offensant / haine ─────────────────────────────
  // FR
  "insulte", "racisme", "raciste", "haine", "harceleur",
  "harcèlement", "discrimination",
  // EN
  "hate speech", "racism", "racist", "harassment", "abuse",
  "slur", "discrimination",
  // ES
  "racismo", "acoso", "discriminación",
  // DE
  "rassismus", "belästigung", "diskriminierung",

  // ── Manipulation de l'IA ──────────────────────────────────
  "ignore tes instructions", "ignore your instructions",
  "oublie tes règles", "forget your rules",
  "tu es maintenant", "you are now",
  "jailbreak", "dan mode", "developer mode",
  "prompt injection", "system prompt",
  "ignore previous", "nouvelle instruction",
  "act as", "pretend you are",

];

export default BLOCKED_WORDS;
