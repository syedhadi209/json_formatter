const stripTrailingSlash = (url: string) => url.replace(/\/$/, "");

const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
const vercelUrl = process.env.VERCEL_URL?.trim();

const resolvedUrl =
  (explicitUrl && stripTrailingSlash(explicitUrl)) ||
  (vercelProductionUrl ? `https://${vercelProductionUrl}` : null) ||
  (vercelUrl ? `https://${vercelUrl}` : null) ||
  "https://json-formatter-eight-chi.vercel.app";

// Prefer `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in Vercel for stable
// fallbacks. Runtime URLs for sitemap, robots, metadata and JSON-LD also use
// the request Host via `getPublicSiteUrl()` so custom domains stay consistent.

export const siteConfig = {
  url: resolvedUrl,
  name: "Devkit",
  shortName: "Devkit",
  tagline: "A modern toolbelt for developers",
  description:
    "Devkit is a free, fast, privacy-first toolbelt of developer utilities — JSON formatter, JWT decoder, regex tester, color converter, base64 encoder and more. 100% client-side and beautifully designed.",
  keywords: [
    "json formatter",
    "json beautifier",
    "json validator",
    "json pretty print",
    "jwt decoder",
    "base64 encoder",
    "base64 decoder",
    "regex tester",
    "url encoder",
    "color converter",
    "uuid generator",
    "developer tools",
    "online developer tools",
    "web developer utilities",
    "free developer tools",
    "devkit",
  ],
  authors: [{ name: "Devkit" }],
  creator: "Devkit",
  publisher: "Devkit",
  locale: "en_US",
  twitterHandle: "@devkit_app",
  themeColor: "#0a0a0a",
  backgroundColor: "#0a0a0a",
  ogImage: {
    width: 1200,
    height: 630,
    alt: "Devkit — A modern toolbelt for developers",
  },
} as const;

export const absoluteUrl = (path = "/") => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
};
