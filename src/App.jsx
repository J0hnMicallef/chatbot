// ─────────────────────────────────────────────────────────────
// src/App.jsx
// Point d'entrée React : mise en page + import des styles.
// ─────────────────────────────────────────────────────────────

import "./styles/chat.css";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  return (
    <div className="page">
      {/* ── Titre ── */}
      <div className="title-block">
        <h1>ChatBot</h1>
      </div>

      {/* ── Chat ── */}
      <ChatWindow />
    </div>
  );
}
