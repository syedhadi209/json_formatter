import type { MetadataRoute } from "next";

import { absoluteFromOrigin, getPublicSiteUrl } from "@/lib/public-site-url";
import { liveTools } from "@/lib/tools/registry";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await getPublicSiteUrl();
  const now = new Date();

  return [
    {
      url: absoluteFromOrigin(base, "/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...liveTools.map((tool) => ({
      url: absoluteFromOrigin(base, tool.href),
      lastModified: now,
      changeFrequency: tool.sitemapChangeFrequency,
      priority: tool.sitemapPriority,
    })),
  ];
}
