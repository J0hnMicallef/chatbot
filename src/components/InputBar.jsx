// ─────────────────────────────────────────────────────────────
// Zone de saisie + bouton d'envoi.
// ─────────────────────────────────────────────────────────────

export default function InputBar({ value, onChange, onSend, disabled }) {
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="input-bar">
      <input
        className="input-bar__field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Pose ta question…"
        disabled={disabled}
      />
      <button
        className="input-bar__btn"
        onClick={onSend}
        disabled={disabled || !value.trim()}
      >
        ➤
      </button>
    </div>
  );
}
