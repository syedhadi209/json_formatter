import { cache } from "react";
import { headers } from "next/headers";

import { siteConfig } from "@/lib/seo";

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/**
 * Public site origin for the current request (e.g. https://jsontoolkit.store).
 * Uses Host / X-Forwarded-* headers on Vercel so custom domains match sitemap,
 * robots, metadataBase and JSON-LD without relying on a rebuild.
 *
 * Falls back to `siteConfig.url` (env-based) when headers are unavailable.
 */
export const getPublicSiteUrl = cache(async (): Promise<string> => {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return siteConfig.url;

  const proto = h.get("x-forwarded-proto") ?? "https";
  return stripTrailingSlash(`${proto}://${host}`);
});

export function absoluteFromOrigin(origin: string, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${stripTrailingSlash(origin)}${normalized}`;
}
