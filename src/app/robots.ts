import type { MetadataRoute } from "next";

import { absoluteFromOrigin, getPublicSiteUrl } from "@/lib/public-site-url";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = await getPublicSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteFromOrigin(base, "/sitemap.xml"),
    host: base,
  };
}
