export const jsonFormatterFaqs = [
  {
    question: "What is this JSON formatter?",
    answer:
      "It is a free online JSON formatter that prettifies, validates and minifies JSON. Paste any JSON on the left and you get a clean, syntax-highlighted version on the right with line numbers and error reporting.",
  },
  {
    question: "Is my JSON data safe?",
    answer:
      "Yes. The tool runs entirely in your browser — your JSON never leaves your device or hits any server. It also works offline once loaded.",
  },
  {
    question: "How do I beautify minified JSON?",
    answer:
      "Paste the minified JSON into the input panel. The formatted version is generated automatically with the indent size you choose (2 spaces, 4 spaces, or tab).",
  },
  {
    question: "How do I minify JSON?",
    answer:
      "Click the Minify button in the toolbar. The input is replaced with a single-line, whitespace-free version that you can copy or download.",
  },
  {
    question: "Why am I getting a parse error?",
    answer:
      "JSON requires double-quoted keys and strings, no trailing commas, and no comments. The error panel shows the line and column where parsing failed, which usually points right at the issue.",
  },
  {
    question: "Can I upload or download JSON files?",
    answer:
      "Yes. Use the Upload button to load a .json file from disk, or Download to save the formatted output as formatted.json.",
  },
  {
    question: "Is the JSON formatter free?",
    answer:
      "Yes, it is completely free, with no signup, no rate limits, and no ads.",
  },
] as const;

export type JsonFormatterFaq = (typeof jsonFormatterFaqs)[number];
