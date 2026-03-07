// ─────────────────────────────────────────────────────────────
// src/components/ChatWindow.jsx
// Fenêtre principale : header + liste de messages + input.
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api/claudeApi";
import Message         from "./Message";
import TypingIndicator from "./TypingIndicator";
import InputBar        from "./InputBar";

const WELCOME = {
  role: "bot",
  text: "Bonjour ! Je suis HaikuBot, propulsé par Claude Haiku. Comment puis-je t'aider ?",
};

export default function ChatWindow() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const bottomRef = useRef(null);

  // Scroll automatique vers le bas à chaque nouveau message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);

    // 1. Ajouter le message utilisateur
    const updated = [...messages, { role: "user", text }];
    setMessages(updated);
    setLoading(true);

    try {
      // 2. On retire le message de bienvenue de l'historique envoyé à l'API
      //    (il n'a pas été produit par l'API, ce n'est qu'un message local)
      const history = updated.slice(1);

      // 3. Appel API (logique isolée dans claudeApi.js)
      const reply = await sendMessage(history);

      // 4. Ajouter la réponse du bot
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: ` Erreur : ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      {/* ── Header ── */}
      <div className="chat-header">
        <div className="chat-header__dot" />
        <span className="chat-header__label">
          CLAUDE HAIKU — claude-haiku-4-5-20251001
        </span>
      </div>

      {/* ── Messages ── */}
      <div className="messages-list">
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} text={msg.text} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* ── Saisie ── */}
      <InputBar
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={loading}
      />
    </div>
  );
}
