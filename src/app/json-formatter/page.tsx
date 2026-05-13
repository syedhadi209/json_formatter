"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  Braces,
  Check,
  ChevronLeft,
  Copy,
  Download,
  Eraser,
  FileJson,
  Minimize2,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { jsonFormatterFaqs } from "./faq-data";

type IndentOption = "2" | "4" | "tab";

type FormatResult =
  | { ok: true; formatted: string; minified: string; data: unknown }
  | { ok: false; error: string; line?: number; column?: number };

const SAMPLE_JSON = `{
  "name": "Aurora API",
  "version": "2.4.1",
  "released": "2026-04-12",
  "active": true,
  "maintainers": [
    { "name": "Ada Lovelace", "role": "lead", "commits": 142 },
    { "name": "Linus Torvalds", "role": "reviewer", "commits": 87 }
  ],
  "config": {
    "timeoutMs": 5000,
    "retries": 3,
    "features": ["streaming", "batching", "cache"],
    "experimental": null
  }
}`;

function getIndent(option: IndentOption): string | number {
  if (option === "tab") return "\t";
  return Number(option);
}

function parseErrorPosition(
  message: string,
  source: string
): { line?: number; column?: number; cleaned: string } {
  const cleaned = message.replace(/^JSON\.parse: /i, "").replace(/^SyntaxError: /, "");
  const posMatch = cleaned.match(/position (\d+)/i);
  if (!posMatch) return { cleaned };
  const pos = Number(posMatch[1]);
  if (Number.isNaN(pos)) return { cleaned };
  const slice = source.slice(0, pos);
  const line = slice.split("\n").length;
  const lastNewline = slice.lastIndexOf("\n");
  const column = lastNewline === -1 ? pos + 1 : pos - lastNewline;
  return { cleaned, line, column };
}

function tryFormat(input: string, indent: IndentOption): FormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: true, formatted: "", minified: "", data: undefined };
  }
  try {
    const data = JSON.parse(trimmed) as unknown;
    return {
      ok: true,
      formatted: JSON.stringify(data, null, getIndent(indent)),
      minified: JSON.stringify(data),
      data,
    };
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    const { cleaned, line, column } = parseErrorPosition(raw, trimmed);
    return { ok: false, error: cleaned, line, column };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightJson(formatted: string): string {
  if (!formatted) return "";
  const escaped = escapeHtml(formatted);
  return escaped.replace(
    /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "tok-num";
      if (match.startsWith("\"")) {
        cls = /:\s*$/.test(match) ? "tok-key" : "tok-str";
      } else if (match === "true" || match === "false") {
        cls = "tok-bool";
      } else if (match === "null") {
        cls = "tok-null";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

function countLines(text: string): number {
  if (!text) return 0;
  return text.split("\n").length;
}

function bytesFor(text: string): number {
  if (typeof TextEncoder === "undefined") return text.length;
  return new TextEncoder().encode(text).length;
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function JsonFormatterPage() {
  const [input, setInput] = useState<string>("");
  const [indent, setIndent] = useState<IndentOption>("2");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputScrollRef = useRef<HTMLDivElement>(null);
  const inputGutterRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => tryFormat(input, indent), [input, indent]);

  const inputLineCount = useMemo(() => Math.max(countLines(input), 1), [input]);
  const outputLineCount = useMemo(
    () => (result.ok ? Math.max(countLines(result.formatted), 1) : 1),
    [result]
  );

  const highlighted = useMemo(
    () => (result.ok ? highlightJson(result.formatted) : ""),
    [result]
  );

  const inputStats = useMemo(
    () => ({
      chars: input.length,
      bytes: bytesFor(input),
      lines: countLines(input),
    }),
    [input]
  );

  const outputStats = useMemo(() => {
    if (!result.ok) return { chars: 0, bytes: 0, lines: 0 };
    return {
      chars: result.formatted.length,
      bytes: bytesFor(result.formatted),
      lines: countLines(result.formatted),
    };
  }, [result]);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleFormat = useCallback(() => {
    if (result.ok && result.formatted) setInput(result.formatted);
  }, [result]);

  const handleMinify = useCallback(() => {
    if (result.ok && result.minified) setInput(result.minified);
  }, [result]);

  const handleCopy = useCallback(async () => {
    if (!result.ok || !result.formatted) return;
    try {
      await navigator.clipboard.writeText(result.formatted);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setInput("");
    inputRef.current?.focus();
  }, []);

  const handleSample = useCallback(() => {
    setInput(SAMPLE_JSON);
  }, []);

  const handleSwap = useCallback(() => {
    if (result.ok && result.formatted) setInput(result.formatted);
  }, [result]);

  const handleDownload = useCallback(() => {
    if (!result.ok || !result.formatted) return;
    const blob = new Blob([result.formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [result]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setInput(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  const syncGutter = useCallback(() => {
    const ta = inputRef.current;
    const gutter = inputGutterRef.current;
    if (!ta || !gutter) return;
    gutter.scrollTop = ta.scrollTop;
  }, []);

  return (
    <div className="flex min-h-svh flex-col bg-gradient-to-b from-background via-background to-muted/40 text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Back to home"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Braces className="h-5 w-5" />
            </div>
            <div className="min-w-0 leading-tight">
              <h1 className="truncate text-sm font-semibold tracking-tight sm:text-lg">
                JSON Formatter
              </h1>
              <p className="hidden truncate text-xs text-muted-foreground sm:block sm:text-sm">
                Paste JSON on the left, get prettified output on the right.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden md:block">
              <StatusPill ok={result.ok} empty={!input.trim()} />
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="border-t bg-background/60 px-3 py-1.5 md:hidden">
          <StatusPill ok={result.ok} empty={!input.trim()} />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border bg-card/60 p-1.5 shadow-sm backdrop-blur sm:gap-2 sm:p-2">
          <Button
            size="sm"
            onClick={handleFormat}
            disabled={!result.ok || !input.trim()}
            aria-label="Format JSON"
          >
            <Wand2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Format</span>
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleMinify}
            disabled={!result.ok || !input.trim()}
            aria-label="Minify JSON"
          >
            <Minimize2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Minify</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            disabled={!result.ok || !result.formatted}
            aria-label={copied ? "Copied" : "Copy formatted JSON"}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownload}
            disabled={!result.ok || !result.formatted}
            aria-label="Download formatted JSON"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleUploadClick}
            aria-label="Upload JSON file"
          >
            <Upload className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Upload</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleSample}
            aria-label="Load sample JSON"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sample</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSwap}
            disabled={!result.ok || !result.formatted}
            aria-label="Move output into input"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Use as input</span>
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleClear}
            disabled={!input}
            aria-label="Clear input"
          >
            <Eraser className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </Button>

          <div className="order-last flex w-full items-center justify-between gap-2 rounded-lg border bg-background/70 p-1 text-xs sm:order-none sm:ml-auto sm:w-auto">
            <span className="px-1.5 text-muted-foreground">Indent</span>
            <IndentToggle value={indent} onChange={setIndent} />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json,text/plain"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          <Panel
            title="Input"
            subtitle="Raw JSON"
            icon={<FileJson className="h-4 w-4" />}
            stats={inputStats}
            tone={
              !input.trim() ? "muted" : result.ok ? "ok" : "error"
            }
          >
            <div className="relative flex h-[50vh] min-h-[260px] overflow-hidden rounded-b-xl bg-muted/30 sm:h-[55vh] sm:min-h-[340px] lg:h-[60vh] lg:min-h-[420px]">
              <div
                ref={inputGutterRef}
                className="hidden w-9 shrink-0 select-none overflow-hidden border-r bg-muted/40 px-2 py-3 text-right font-mono text-[11px] leading-6 text-muted-foreground/70 sm:block sm:w-11 sm:px-3 sm:text-[12px]"
                aria-hidden
              >
                {Array.from({ length: inputLineCount }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onScroll={syncGutter}
                spellCheck={false}
                placeholder='Paste JSON here. Try {"hello": "world"}'
                className="h-full w-full resize-none bg-transparent px-3 py-3 font-mono text-[12.5px] leading-6 outline-none placeholder:text-muted-foreground/60 sm:px-4 sm:text-[13px]"
              />
            </div>
          </Panel>

          <Panel
            title="Formatted"
            subtitle={
              result.ok
                ? indent === "tab"
                  ? "Tab indent"
                  : `${indent}-space indent`
                : "Fix errors to preview"
            }
            icon={<Braces className="h-4 w-4" />}
            stats={outputStats}
            tone={
              !input.trim() ? "muted" : result.ok ? "ok" : "error"
            }
          >
            <div
              ref={outputScrollRef}
              className="relative flex h-[50vh] min-h-[260px] overflow-auto rounded-b-xl bg-muted/30 sm:h-[55vh] sm:min-h-[340px] lg:h-[60vh] lg:min-h-[420px]"
            >
              {result.ok ? (
                result.formatted ? (
                  <div className="flex w-full">
                    <div
                      className="hidden w-9 shrink-0 select-none border-r bg-muted/40 px-2 py-3 text-right font-mono text-[11px] leading-6 text-muted-foreground/70 sm:block sm:w-11 sm:px-3 sm:text-[12px]"
                      aria-hidden
                    >
                      {Array.from({ length: outputLineCount }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <pre
                      className="json-output min-w-0 flex-1 whitespace-pre px-3 py-3 font-mono text-[12.5px] leading-6 sm:px-4 sm:text-[13px]"
                      dangerouslySetInnerHTML={{ __html: highlighted }}
                    />
                  </div>
                ) : (
                  <EmptyState />
                )
              ) : (
                <ErrorState error={result.error} line={result.line} column={result.column} />
              )}
            </div>
          </Panel>
        </div>

        <SeoContent />
      </div>

      <style>{`
        .json-output .tok-key { color: var(--tok-key); font-weight: 500; }
        .json-output .tok-str { color: var(--tok-str); }
        .json-output .tok-num { color: var(--tok-num); }
        .json-output .tok-bool { color: var(--tok-bool); }
        .json-output .tok-null { color: var(--tok-null); font-style: italic; }
        :root {
          --tok-key: oklch(0.45 0.16 250);
          --tok-str: oklch(0.5 0.13 145);
          --tok-num: oklch(0.55 0.18 35);
          --tok-bool: oklch(0.5 0.2 305);
          --tok-null: oklch(0.55 0 0);
        }
        .dark {
          --tok-key: oklch(0.78 0.12 250);
          --tok-str: oklch(0.82 0.13 145);
          --tok-num: oklch(0.82 0.13 60);
          --tok-bool: oklch(0.78 0.17 305);
          --tok-null: oklch(0.7 0 0);
        }
      `}</style>
    </div>
  );
}

function StatusPill({ ok, empty }: { ok: boolean; empty: boolean }) {
  if (empty) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-muted-foreground/60" />
        Awaiting input
      </span>
    );
  }
  if (ok) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Valid JSON
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
      <span className="size-1.5 rounded-full bg-destructive" />
      Invalid JSON
    </span>
  );
}

function IndentToggle({
  value,
  onChange,
}: {
  value: IndentOption;
  onChange: (v: IndentOption) => void;
}) {
  const options: { label: string; value: IndentOption }[] = [
    { label: "2", value: "2" },
    { label: "4", value: "4" },
    { label: "Tab", value: "tab" },
  ];
  return (
    <div className="flex items-center gap-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium transition-colors",
            value === opt.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  icon,
  stats,
  tone,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  stats: { chars: number; lines: number; bytes: number };
  tone: "ok" | "error" | "muted";
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-colors",
        tone === "error" && "border-destructive/40",
        tone === "ok" && "border-emerald-500/20"
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b bg-background/60 px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            {icon}
          </span>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-medium">{title}</div>
            <div className="truncate text-[11px] text-muted-foreground">{subtitle}</div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-muted-foreground sm:gap-3">
          <span>{stats.lines} ln</span>
          <span>{stats.chars} ch</span>
          <span>{formatBytes(stats.bytes)}</span>
        </div>
      </header>
      {children}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex w-full items-center justify-center px-4 py-8 text-center text-sm text-muted-foreground sm:px-6 sm:py-10">
      <div className="max-w-sm">
        <Braces className="mx-auto mb-2 h-6 w-6 opacity-50" />
        Output appears here as soon as you start typing valid JSON.
      </div>
    </div>
  );
}

function SeoContent() {
  return (
    <section
      aria-labelledby="about-json-formatter"
      className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]"
    >
      <article className="prose-tool space-y-4 rounded-2xl border bg-card/40 p-5 backdrop-blur sm:p-6">
        <h2
          id="about-json-formatter"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          A fast, free JSON formatter and validator
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Paste raw JSON on the left and our formatter instantly produces a
          beautified, syntax-highlighted version on the right — with line numbers,
          live validation and human-readable parse errors. Switch between{" "}
          <strong>2-space</strong>, <strong>4-space</strong> or{" "}
          <strong>tab</strong> indentation, minify back to a single line, copy to
          clipboard, or download as a <code>.json</code> file.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Everything runs <strong>locally in your browser</strong>. Your JSON is
          never uploaded or stored, so it&apos;s safe for sensitive payloads,
          API tokens, internal schemas and production data.
        </p>
        <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:text-[15px]">
          {[
            "Prettify and validate JSON",
            "Minify back to one line",
            "Syntax highlighting + line numbers",
            "Configurable indentation",
            "Copy, download, and upload",
            "100% client-side & free",
          ].map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 rounded-lg border bg-background/60 px-3 py-2 text-foreground/90"
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {feature}
            </li>
          ))}
        </ul>
      </article>

      <div
        aria-labelledby="faq-heading"
        className="rounded-2xl border bg-card/40 p-5 backdrop-blur sm:p-6"
      >
        <h2
          id="faq-heading"
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Frequently asked questions
        </h2>
        <div className="mt-4 divide-y divide-border/60">
          {jsonFormatterFaqs.map((faq, idx) => (
            <details
              key={faq.question}
              className="group py-3 first:pt-0 last:pb-0"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-foreground sm:text-base">
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  className="text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ErrorState({
  error,
  line,
  column,
}: {
  error: string;
  line?: number;
  column?: number;
}) {
  return (
    <div className="flex w-full flex-col gap-3 p-4 sm:p-6">
      <div className="inline-flex w-fit flex-wrap items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
        Parse error
        {line !== undefined && column !== undefined && (
          <span className="font-mono text-[11px] opacity-80">
            line {line}, col {column}
          </span>
        )}
      </div>
      <pre className="overflow-auto rounded-lg border border-destructive/30 bg-destructive/5 p-3 font-mono text-[12px] leading-6 break-words whitespace-pre-wrap text-destructive sm:text-[12.5px]">
        {error}
      </pre>
      <p className="text-xs text-muted-foreground">
        Tip: JSON requires double-quoted keys and strings, no trailing commas, and no
        comments.
      </p>
    </div>
  );
}
