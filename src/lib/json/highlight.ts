export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function highlightJson(formatted: string): string {
  if (!formatted) return "";
  const escaped = escapeHtml(formatted);
  return escaped.replace(
    /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "tok-num";
      if (match.startsWith("\"")) {
        cls = /:\s*$/.test(match) ? "tok-key" : "tok-str";
      } else if (match === "true" || match === "false") {
        cls = "tok-bool";
      } else if (match === "null") {
        cls = "tok-null";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}
