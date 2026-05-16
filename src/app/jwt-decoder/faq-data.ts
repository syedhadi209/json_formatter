export const jwtDecoderFaqs = [
  {
    question: "What is a JWT decoder?",
    answer:
      "A JWT decoder reads a JSON Web Token and splits it into its three parts: header, payload, and signature. It Base64URL-decodes the header and payload so you can inspect claims like sub, exp, and iss in plain JSON.",
  },
  {
    question: "Is it safe to paste my JWT here?",
    answer:
      "Decoding happens entirely in your browser. The token is never sent to a server. Still treat JWTs as secrets — anyone with the token can often act as you until it expires.",
  },
  {
    question: "Does this tool verify the signature?",
    answer:
      "No. This decoder only parses and displays the token structure. Signature verification requires your signing secret or public key and is not performed here.",
  },
  {
    question: "Why does my token show as invalid?",
    answer:
      "Common causes: missing dots (JWTs need exactly two), invalid Base64URL encoding, or JSON that is not an object in the header or payload.",
  },
  {
    question: "What do exp, iat, and nbf mean?",
    answer:
      "They are Unix timestamps in seconds. exp is expiration, iat is issued-at, and nbf is not-before. This tool converts them to readable dates and shows whether the token is expired.",
  },
  {
    question: "Can I decode JWE (encrypted) tokens?",
    answer:
      "This tool is built for signed JWTs (JWS) with three dot-separated segments. Encrypted JWE tokens use a different format and are not supported.",
  },
  {
    question: "Is the JWT decoder free?",
    answer:
      "Yes. It is free, requires no signup, and works offline after the page loads.",
  },
] as const;
