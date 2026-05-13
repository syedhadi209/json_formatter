import type { MetadataRoute } from "next";

import { absoluteFromOrigin, getPublicSiteUrl } from "@/lib/public-site-url";

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
    {
      url: absoluteFromOrigin(base, "/json-formatter"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
