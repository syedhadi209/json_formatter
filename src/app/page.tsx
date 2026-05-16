import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Binary,
  Boxes,
  Braces,
  Clock,
  Database,
  FileText,
  FileType2,
  GitCompare,
  Hash,
  KeyRound,
  Link2,
  Palette,
  Regex,
  ShieldCheck,
  Sparkles,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { absoluteFromOrigin, getPublicSiteUrl } from "@/lib/public-site-url";
import { siteConfig } from "@/lib/seo";

type Tool = {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  status: "available" | "soon";
  accent: string;
};

const tools: Tool[] = [
  {
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON side-by-side.",
    icon: Braces,
    href: "/json-formatter",
    status: "available",
    accent: "from-sky-500/40 to-indigo-500/40",
  },
  {
    name: "JWT Decoder",
    description: "Inspect headers, payloads, and signatures in real time.",
    icon: KeyRound,
    href: "/jwt-decoder",
    status: "available",
    accent: "from-amber-500/40 to-rose-500/40",
  },
  {
    name: "Base64 Studio",
    description: "Encode or decode text and small files instantly.",
    icon: Binary,
    href: "/base64-studio",
    status: "available",
    accent: "from-emerald-500/40 to-teal-500/40",
  },
  {
    name: "URL Encoder",
    description: "Round-trip safe URL components with one click.",
    icon: Link2,
    href: "#",
    status: "soon",
    accent: "from-fuchsia-500/40 to-violet-500/40",
  },
  {
    name: "Regex Tester",
    description: "Test patterns with live highlights and capture groups.",
    icon: Regex,
    href: "#",
    status: "soon",
    accent: "from-rose-500/40 to-orange-500/40",
  },
  {
    name: "Color Studio",
    description: "Convert between HEX, RGB, HSL, and OKLCH.",
    icon: Palette,
    href: "#",
    status: "soon",
    accent: "from-pink-500/40 to-purple-500/40",
  },
  {
    name: "UUID Generator",
    description: "Bulk-generate v4 / v7 UUIDs with copy & download.",
    icon: Hash,
    href: "#",
    status: "soon",
    accent: "from-cyan-500/40 to-blue-500/40",
  },
  {
    name: "SQL Formatter",
    description: "Pretty-print SELECT, JOIN, CTE and more.",
    icon: Database,
    href: "#",
    status: "soon",
    accent: "from-lime-500/40 to-emerald-500/40",
  },
  {
    name: "YAML ↔ JSON",
    description: "Round-trip convert between YAML and JSON.",
    icon: FileType2,
    href: "#",
    status: "soon",
    accent: "from-indigo-500/40 to-sky-500/40",
  },
  {
    name: "Markdown Preview",
    description: "Live render with GitHub-flavored syntax.",
    icon: FileText,
    href: "#",
    status: "soon",
    accent: "from-violet-500/40 to-fuchsia-500/40",
  },
  {
    name: "Diff Checker",
    description: "Side-by-side text and JSON diff with sync scroll.",
    icon: GitCompare,
    href: "#",
    status: "soon",
    accent: "from-orange-500/40 to-amber-500/40",
  },
  {
    name: "Cron Helper",
    description: "Build and explain cron schedules in plain English.",
    icon: Clock,
    href: "#",
    status: "soon",
    accent: "from-teal-500/40 to-cyan-500/40",
  },
];

const features = [
  {
    title: "Runs in your browser",
    description: "No data ever leaves your device. Every tool works offline-first.",
    icon: ShieldCheck,
  },
  {
    title: "Built for speed",
    description: "Instant formatting, parsing and conversion — no spinners, no waits.",
    icon: Zap,
  },
  {
    title: "Consistent design",
    description: "One coherent UI, keyboard friendly, light & dark themes everywhere.",
    icon: Sparkles,
  },
];

export default async function Home() {
  const origin = await getPublicSiteUrl();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} — Developer Tools`,
    description: siteConfig.description,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      description: tool.description,
      url: tool.href.startsWith("/")
        ? absoluteFromOrigin(origin, tool.href)
        : tool.href,
    })),
  };

  const homeSoftwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${siteConfig.name}: ${siteConfig.tagline}`,
    description: siteConfig.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: origin,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background text-foreground">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSoftwareJsonLd) }}
      />

      <BackgroundDecor />

      <Nav />

      <Hero />

      <section
        id="tools"
        className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-20"
      >
        <div className="mb-8 flex flex-col items-start gap-3 sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Boxes className="h-3.5 w-3.5" />
            12 tools and counting
          </span>
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            One toolbelt for every <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">small</span> developer task.
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Beautifully crafted utilities for the things you do every day. Free, fast,
            and respectful of your data.
          </p>
        </div>

        <div className="[perspective:1400px]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid grid-cols-1 gap-3 rounded-2xl border bg-card/40 p-4 backdrop-blur sm:grid-cols-3 sm:gap-4 sm:p-6">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex items-start gap-3 rounded-xl border bg-background/60 p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div className="space-y-1">
                <div className="text-sm font-medium">{title}</div>
                <p className="text-xs text-muted-foreground sm:text-sm">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <DecorStyles />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-[0_8px_24px_-8px_rgba(99,102,241,0.7)]">
            <Braces className="h-5 w-5" strokeWidth={2.25} />
            <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
          </span>
          <span className="text-base font-semibold tracking-tight sm:text-lg">
            Devkit
          </span>
          <span className="ml-1 hidden rounded-md border bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:inline-block">
            beta
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="#tools"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Tools
          </a>
          <a
            href="#features"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Features
          </a>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/json-formatter">
              Open JSON Formatter
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20 lg:pt-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            New: side-by-side JSON formatter
          </span>

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]">
            A modern{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                toolbelt
              </span>
              <span
                aria-hidden
                className="absolute -inset-2 -z-10 rounded-2xl bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-fuchsia-500/20 blur-2xl"
              />
            </span>{" "}
            for developers.
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Format JSON, decode JWTs, test regex, convert color spaces — and a dozen
            more everyday utilities. Designed to feel like one polished app, free
            forever and private by default.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/json-formatter">
                <Wand2 className="h-4 w-4" />
                Try the JSON formatter
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#tools">
                Browse all tools
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-2 flex items-center gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              No sign-up
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              100% client-side
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Zap className="h-3.5 w-3.5" />
              Instant
            </span>
          </div>
        </div>

        <HeroMock />
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none [perspective:1600px]">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sky-500/20 via-indigo-500/15 to-fuchsia-500/20 opacity-80 blur-3xl"
      />

      <div className="hero-float relative will-change-transform [transform-style:preserve-3d] [transform:rotateX(14deg)_rotateY(-18deg)_rotateZ(2deg)]">
        <div
          aria-hidden
          className="absolute -right-10 top-12 hidden h-40 w-56 rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 to-amber-500/20 shadow-2xl backdrop-blur-xl [transform:translateZ(60px)_rotate(8deg)] sm:block"
        />
        <div
          aria-hidden
          className="absolute -left-12 -bottom-8 hidden h-36 w-48 rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-sky-500/20 shadow-2xl backdrop-blur-xl [transform:translateZ(40px)_rotate(-10deg)] sm:block"
        />

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-background/60 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-rose-400/70" />
              <span className="size-2.5 rounded-full bg-amber-400/70" />
              <span className="size-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="flex items-center gap-1.5 rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              <Braces className="h-3 w-3" />
              json-formatter
            </div>
            <div className="w-12" />
          </div>

          <div className="grid grid-cols-2 divide-x divide-white/5">
            <pre className="hero-code px-4 py-4 font-mono text-[11.5px] leading-[1.55] text-muted-foreground">
{`{"name":"Aurora",
"version":"2.4.1",
"active":true,
"tags":["fast","tiny"]}`}
            </pre>
            <pre className="hero-code-pretty px-4 py-4 font-mono text-[11.5px] leading-[1.55]">
<span className="hk">{`"name"`}</span>{`: `}<span className="hs">{`"Aurora"`}</span>{`,`}<br/>
<span className="hk">{`"version"`}</span>{`: `}<span className="hs">{`"2.4.1"`}</span>{`,`}<br/>
<span className="hk">{`"active"`}</span>{`: `}<span className="hb">{`true`}</span>{`,`}<br/>
<span className="hk">{`"tags"`}</span>{`: [`}<br/>
{`  `}<span className="hs">{`"fast"`}</span>{`,`}<br/>
{`  `}<span className="hs">{`"tiny"`}</span><br/>
{`]`}
            </pre>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 bg-background/60 px-4 py-2 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Valid JSON
            </span>
            <span className="font-mono">4 ln · 89 ch</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  const isAvailable = tool.status === "available";

  const inner = (
    <div
      className={cn(
        "tool-card group relative h-full overflow-hidden rounded-2xl border bg-card/60 p-5 backdrop-blur transition-all duration-300 will-change-transform",
        "[transform-style:preserve-3d] hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.45)]",
        isAvailable
          ? "hover:border-primary/40"
          : "opacity-90 hover:border-border"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-30 blur-3xl transition-opacity duration-300 group-hover:opacity-70",
          tool.accent
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br shadow-inner transition-transform duration-300 group-hover:[transform:translateZ(30px)]",
            tool.accent
          )}
        >
          <Icon className="h-5 w-5 text-foreground" />
        </span>
        <StatusBadge status={tool.status} />
      </div>

      <div className="relative mt-4 space-y-1.5">
        <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-foreground">
          {tool.name}
        </h3>
        <p className="text-sm text-muted-foreground">{tool.description}</p>
      </div>

      <div className="relative mt-5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground/80">
          {isAvailable ? "Open the tool" : "We're working on it"}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-md border bg-background/60 px-2 py-1 font-medium transition-all duration-300",
            isAvailable
              ? "text-foreground group-hover:bg-primary group-hover:text-primary-foreground"
              : "text-muted-foreground"
          )}
        >
          {isAvailable ? "Launch" : "Soon"}
          <ArrowUpRight
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-300",
              isAvailable && "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            )}
          />
        </span>
      </div>
    </div>
  );

  if (!isAvailable) {
    return (
      <div aria-disabled className="cursor-not-allowed">
        {inner}
      </div>
    );
  }

  return (
    <Link href={tool.href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl">
      {inner}
    </Link>
  );
}

function StatusBadge({ status }: { status: "available" | "soon" }) {
  if (status === "available") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
      Soon
    </span>
  );
}

function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border/60 bg-background/40 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-white">
            <Braces className="h-4 w-4" />
          </span>
          <span className="text-sm font-medium">Devkit</span>
          <span className="text-xs text-muted-foreground">
            · Crafted for developers
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a className="hover:text-foreground" href="#tools">Tools</a>
          <a className="hover:text-foreground" href="#features">Features</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.muted/40),transparent_60%)]" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,160,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,160,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    </div>
  );
}

function DecorStyles() {
  return (
    <style>{`
      .orb {
        position: absolute;
        border-radius: 9999px;
        filter: blur(80px);
        opacity: 0.55;
        animation: float 18s ease-in-out infinite;
      }
      .dark .orb { opacity: 0.45; }
      .orb-1 {
        top: -8rem;
        left: -6rem;
        width: 28rem;
        height: 28rem;
        background: radial-gradient(circle at 30% 30%, oklch(0.7 0.18 250 / 0.6), transparent 60%);
        animation-delay: -2s;
      }
      .orb-2 {
        top: 10rem;
        right: -8rem;
        width: 32rem;
        height: 32rem;
        background: radial-gradient(circle at 70% 30%, oklch(0.7 0.2 310 / 0.55), transparent 60%);
        animation-delay: -7s;
      }
      .orb-3 {
        top: 40%;
        left: 30%;
        width: 24rem;
        height: 24rem;
        background: radial-gradient(circle at 50% 50%, oklch(0.75 0.16 200 / 0.4), transparent 60%);
        animation-delay: -12s;
      }
      @keyframes float {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        50% { transform: translate3d(40px, -30px, 0) scale(1.05); }
      }

      .hero-float { animation: heroFloat 9s ease-in-out infinite; }
      @keyframes heroFloat {
        0%, 100% { transform: rotateX(14deg) rotateY(-18deg) rotateZ(2deg) translateY(0); }
        50% { transform: rotateX(12deg) rotateY(-20deg) rotateZ(2deg) translateY(-10px); }
      }

      .hero-code-pretty .hk { color: oklch(0.78 0.12 250); font-weight: 500; }
      .hero-code-pretty .hs { color: oklch(0.82 0.13 145); }
      .hero-code-pretty .hb { color: oklch(0.78 0.17 305); }
      :root:not(.dark) .hero-code-pretty .hk { color: oklch(0.45 0.16 250); }
      :root:not(.dark) .hero-code-pretty .hs { color: oklch(0.5 0.13 145); }
      :root:not(.dark) .hero-code-pretty .hb { color: oklch(0.5 0.2 305); }

      @media (prefers-reduced-motion: reduce) {
        .orb, .hero-float { animation: none; }
      }
    `}</style>
  );
}
