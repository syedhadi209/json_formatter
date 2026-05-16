import type { Metadata } from "next";

import { absoluteFromOrigin, getPublicSiteUrl } from "@/lib/public-site-url";
import { siteConfig } from "@/lib/seo";
import { jwtDecoderFaqs } from "./faq-data";

const title = "JWT Decoder — Decode & Inspect JSON Web Tokens Online";
const description =
  "Free online JWT decoder. Paste a token to inspect the header, payload, and signature with syntax-highlighted JSON, claim timestamps, and copy tools. 100% client-side, no signup.";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getPublicSiteUrl();
  const pageUrl = absoluteFromOrigin(origin, "/jwt-decoder");

  return {
    title: "JWT Decoder",
    description,
    keywords: [
      "jwt decoder",
      "decode jwt",
      "jwt parser",
      "jwt debugger",
      "json web token decoder",
      "jwt token decoder",
      "online jwt decoder",
      "free jwt decoder",
      "jwt payload decoder",
      "jwt header decoder",
      "inspect jwt",
      "jwt claims",
    ],
    alternates: { canonical: "/jwt-decoder" },
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

export default async function JwtDecoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const origin = await getPublicSiteUrl();
  const toolUrl = absoluteFromOrigin(origin, "/jwt-decoder");

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JWT Decoder",
    alternateName: ["JWT Parser", "JWT Debugger", "JSON Web Token Decoder"],
    description,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "JWT Tools",
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
      "Decode JWT header and payload",
      "Syntax-highlighted JSON output",
      "Human-readable exp, iat, and nbf timestamps",
      "Copy header, payload, or full token",
      "Sample JWT for quick testing",
      "100% client-side, private by default",
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin },
      { "@type": "ListItem", position: 2, name: "JWT Decoder", item: toolUrl },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: jwtDecoderFaqs.map((f) => ({
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
