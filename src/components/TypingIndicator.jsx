// ─────────────────────────────────────────────────────────────
// src/components/TypingIndicator.jsx
// Animation "trois points" pendant que le bot réfléchit.
// ─────────────────────────────────────────────────────────────

export default function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  );
}
