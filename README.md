This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Google Search indexing

If `site:your-domain.com` shows no results yet, Google may not have crawled the domain yet (new sites often take days to weeks).

1. In Vercel, set **`NEXT_PUBLIC_SITE_URL`** to your production origin (for example `https://jsontoolkit.store`) for all production deployments, then redeploy.
2. In [Google Search Console](https://search.google.com/search-console), add a URL-prefix property for that origin, verify it, then submit **`/sitemap.xml`** under Sitemaps.
3. Use **URL Inspection** on the homepage and choose **Request indexing** after verification.

On Vercel, this app’s sitemap and root metadata also derive the public origin from the **request host**, so your custom domain’s sitemap should list the correct URLs when Google fetches `https://your-domain/sitemap.xml`.
