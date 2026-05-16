export function JsonHighlightStyles() {
  return (
    <style>{`
      .json-output .tok-key { color: var(--tok-key); font-weight: 500; }
      .json-output .tok-str { color: var(--tok-str); }
      .json-output .tok-num { color: var(--tok-num); }
      .json-output .tok-bool { color: var(--tok-bool); }
      .json-output .tok-null { color: var(--tok-null); font-style: italic; }
      :root {
        --tok-key: oklch(0.45 0.16 250);
        --tok-str: oklch(0.5 0.13 145);
        --tok-num: oklch(0.55 0.18 35);
        --tok-bool: oklch(0.5 0.2 305);
        --tok-null: oklch(0.55 0 0);
      }
      .dark {
        --tok-key: oklch(0.78 0.12 250);
        --tok-str: oklch(0.82 0.13 145);
        --tok-num: oklch(0.82 0.13 60);
        --tok-bool: oklch(0.78 0.17 305);
        --tok-null: oklch(0.7 0 0);
      }
    `}</style>
  );
}
