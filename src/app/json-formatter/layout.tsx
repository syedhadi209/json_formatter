import type { Metadata } from "next";

import { absoluteFromOrigin, getPublicSiteUrl } from "@/lib/public-site-url";
import { siteConfig } from "@/lib/seo";
import { jsonFormatterFaqs } from "./faq-data";

const title = "JSON Formatter — Format, Validate & Beautify JSON Online";
const description =
  "Free online JSON formatter and validator. Paste or upload JSON to get a prettified, syntax-highlighted, side-by-side view. Minify, copy, download — 100% client-side, no signup.";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getPublicSiteUrl();
  const pageUrl = absoluteFromOrigin(origin, "/json-formatter");

  return {
    title: "JSON Formatter",
    description,
    keywords: [
      "json formatter",
      "json beautifier",
      "json pretty print",
      "json validator",
      "json minifier",
      "json viewer",
      "json parser online",
      "format json online",
      "online json formatter",
      "free json formatter",
      "json lint",
      "prettify json",
    ],
    alternates: { canonical: "/json-formatter" },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: pageUrl,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const origin = await getPublicSiteUrl();
  const toolUrl = absoluteFromOrigin(origin, "/json-formatter");

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JSON Formatter",
    alternateName: ["JSON Beautifier", "JSON Validator", "JSON Pretty Print"],
    description,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "JSON Tools",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Works in all modern browsers.",
    url: toolUrl,
    isAccessibleForFree: true,
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: origin,
    },
    featureList: [
      "Format & beautify JSON",
      "Minify JSON",
      "Validate JSON with line/column error reporting",
      "Configurable indentation (2 spaces, 4 spaces, tabs)",
      "Syntax-highlighted side-by-side view",
      "Copy and download formatted JSON",
      "Upload JSON files",
      "Works offline, 100% client-side",
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: origin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "JSON Formatter",
        item: toolUrl,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: jsonFormatterFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
