import type { Metadata } from "next";

import { absoluteFromOrigin, getPublicSiteUrl } from "@/lib/public-site-url";
import { siteConfig } from "@/lib/seo";
import { base64StudioFaqs } from "./faq-data";

const title = "Base64 Studio — Encode & Decode Text Online";
const description =
  "Free online Base64 encoder and decoder. Convert text to Base64 and back with URL-safe mode, file upload, copy tools, and UTF-8 support. 100% client-side, no signup.";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getPublicSiteUrl();
  const pageUrl = absoluteFromOrigin(origin, "/base64-studio");

  return {
    title: "Base64 Studio",
    description,
    keywords: [
      "base64 encode",
      "base64 decode",
      "base64 encoder",
      "base64 decoder",
      "base64 converter",
      "online base64",
      "base64 to text",
      "text to base64",
      "base64 url safe",
      "base64 encoder online",
      "decode base64",
      "encode base64",
    ],
    alternates: { canonical: "/base64-studio" },
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

export default async function Base64StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const origin = await getPublicSiteUrl();
  const toolUrl = absoluteFromOrigin(origin, "/base64-studio");

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Base64 Studio",
    alternateName: ["Base64 Encoder", "Base64 Decoder", "Base64 Converter"],
    description,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Encoding Tools",
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
      "Encode text to Base64",
      "Decode Base64 to text",
      "URL-safe Base64 mode",
      "UTF-8 support",
      "Upload small files",
      "100% client-side, private by default",
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin },
      {
        "@type": "ListItem",
        position: 2,
        name: "Base64 Studio",
        item: toolUrl,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: base64StudioFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
