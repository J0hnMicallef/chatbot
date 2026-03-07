// ─────────────────────────────────────────────────────────────
// src/components/Message.jsx
// Affiche une bulle de message (bot ou user).
// ─────────────────────────────────────────────────────────────

/**
 * Transforme le markdown basique (**gras**, *italique*) en JSX.
 */
function parseMarkdown(text) {
  return text.split("\n").map((line, i) => {
    const parts = line
      .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
      .map((chunk, j) => {
        if (chunk.startsWith("**") && chunk.endsWith("**"))
          return <strong key={j}>{chunk.slice(2, -2)}</strong>;
        if (chunk.startsWith("*") && chunk.endsWith("*"))
          return <em key={j}>{chunk.slice(1, -1)}</em>;
        return chunk;
      });
    return <span key={i}>{parts}<br /></span>;
  });
}

export default function Message({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`message-row message-row--${isUser ? "user" : "bot"}`}>
      <div className={`message-bubble message-bubble--${isUser ? "user" : "bot"}`}>
        {parseMarkdown(text)}
      </div>
    </div>
  );
}
