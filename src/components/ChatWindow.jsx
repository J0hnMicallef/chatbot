import { useState, useRef, useEffect }          from "react";
import { sendMessage }                          from "../api/claudeApi";
import { filterMessage, MAX_MSGS_PER_SESSION }  from "../utils/messageFilter";
import Message                                  from "./Message";
import TypingIndicator                          from "./TypingIndicator";
import InputBar                                 from "./InputBar";

const WELCOME = {
  role: "bot",
  text: "Bonjour ! Je suis GeminiBot. Comment puis-je t'aider ?",
};

export default function ChatWindow() {
  const [messages,     setMessages]     = useState([WELCOME]);
  const [input,        setInput]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // ── Limite de session ──────────────────────────────────
    if (userMsgCount >= MAX_MSGS_PER_SESSION) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text },
        { role: "bot",  text: `Limite de ${MAX_MSGS_PER_SESSION} messages atteinte pour cette session.` },
      ]);
      setInput("");
      return;
    }

    // ── Filtre de contenu ──────────────────────────────────
    const filterError = filterMessage(text);
    if (filterError) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text },
        { role: "bot",  text: filterError },
      ]);
      setInput("");
      return;
    }

    setInput("");
    setUserMsgCount((c) => c + 1);

    const updated = [...messages, { role: "user", text }];
    setMessages(updated);
    setLoading(true);

    try {
      const reply = await sendMessage(updated.slice(1));
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: `Erreur : ${err.message}` }]);
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
          GEMINIBOT — Gemini 1.5 Flash
        </span>
        <span className="chat-header__counter">
          {userMsgCount}/{MAX_MSGS_PER_SESSION}
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
