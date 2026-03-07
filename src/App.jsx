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
        <h1>HaikuBot</h1>
        <p>Propulsé par Claude Haiku — léger &amp; rapide</p>
      </div>

      {/* ── Chat ── */}
      <ChatWindow />
    </div>
  );
}
