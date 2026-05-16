export function countLines(text: string): number {
  if (!text) return 0;
  return text.split("\n").length;
}

export function bytesFor(text: string): number {
  if (typeof TextEncoder === "undefined") return text.length;
  return new TextEncoder().encode(text).length;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}
