export type ToolSlug = "json-formatter" | "jwt-decoder" | "base64-studio";

export type ToolDefinition = {
  slug: ToolSlug;
  name: string;
  description: string;
  href: `/${ToolSlug}`;
  sitemapPriority: number;
  sitemapChangeFrequency: "weekly" | "monthly";
};

export const liveTools: ToolDefinition[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON side-by-side.",
    href: "/json-formatter",
    sitemapPriority: 0.9,
    sitemapChangeFrequency: "monthly",
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode JWT headers, payloads, and claims in your browser.",
    href: "/jwt-decoder",
    sitemapPriority: 0.9,
    sitemapChangeFrequency: "monthly",
  },
  {
    slug: "base64-studio",
    name: "Base64 Studio",
    description: "Encode or decode text and small files in your browser.",
    href: "/base64-studio",
    sitemapPriority: 0.9,
    sitemapChangeFrequency: "monthly",
  },
];
