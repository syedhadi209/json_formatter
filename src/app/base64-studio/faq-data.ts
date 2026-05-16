export const base64StudioFaqs = [
  {
    question: "What is Base64 encoding?",
    answer:
      "Base64 turns binary data into ASCII text using 64 safe characters (A–Z, a–z, 0–9, +, /). It is commonly used for embedding data in JSON, email, URLs, and configuration files.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. Encoding and decoding run entirely in your browser. Text and uploaded files never leave your device.",
  },
  {
    question: "What is URL-safe Base64?",
    answer:
      "URL-safe Base64 replaces + with - and / with _ so the string can appear in URLs and JWT segments without extra escaping. Padding (=) is often omitted.",
  },
  {
    question: "Why does decode show a hex preview?",
    answer:
      "When decoded bytes are not valid UTF-8 text, the tool shows a hex preview instead of garbled characters. Use a binary-aware tool if you need the raw bytes.",
  },
  {
    question: "Can I encode files?",
    answer:
      "Yes. Use Upload in encode mode to Base64-encode a small file. For decode mode, upload a .txt file containing Base64 text.",
  },
  {
    question: "What is the file size limit?",
    answer:
      "Files larger than 5 MB are rejected to keep the tab responsive. For huge payloads, use a command-line tool instead.",
  },
  {
    question: "Is Base64 Studio free?",
    answer:
      "Yes. It is free, requires no signup, and works offline after the page loads.",
  },
] as const;
