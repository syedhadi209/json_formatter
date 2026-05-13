import { absoluteFromOrigin, getPublicSiteUrl } from "@/lib/public-site-url";
import { siteConfig } from "@/lib/seo";

export async function SiteJsonLd() {
  const url = await getPublicSiteUrl();
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.tagline,
    url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url,
      logo: {
        "@type": "ImageObject",
        url: absoluteFromOrigin(url, "/icon"),
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
    />
  );
}
