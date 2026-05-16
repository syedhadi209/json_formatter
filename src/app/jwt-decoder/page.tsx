"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import {
  Check,
  Copy,
  Eraser,
  KeyRound,
  Lock,
  Shield,
  Sparkles,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { JsonHighlightStyles } from "@/components/tools/json-highlight-styles";
import { ToolHeader } from "@/components/tools/tool-header";
import { ToolPageShell } from "@/components/tools/tool-page-shell";
import {
  ToolPanel,
  toolPanelBodyClassName,
  toolPanelScrollBodyClassName,
} from "@/components/tools/tool-panel";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";
import { ToolStatusPill } from "@/components/tools/tool-status-pill";
import { bytesFor, countLines } from "@/lib/format/text-stats";
import { highlightJson } from "@/lib/json/highlight";
import { SAMPLE_JWT, decodeJwt } from "@/lib/jwt/decode";
import { cn } from "@/lib/utils";
import { jwtDecoderFaqs } from "./faq-data";

type SegmentTab = "header" | "payload" | "signature";

export default function JwtDecoderPage() {
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState<SegmentTab>("payload");
  const [copied, setCopied] = useState<"header" | "payload" | "token" | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const result = useMemo(() => decodeJwt(token), [token]);

  const inputStats = useMemo(
    () => ({
      chars: token.length,
      bytes: bytesFor(token),
      lines: countLines(token),
    }),
    [token]
  );

  const activeJson = useMemo(() => {
    if (!result.ok) return "";
    if (activeTab === "header") return result.headerJson;
    if (activeTab === "payload") return result.payloadJson;
    return "";
  }, [result, activeTab]);

  const highlighted = useMemo(
    () => (activeJson ? highlightJson(activeJson) : ""),
    [activeJson]
  );

  const outputStats = useMemo(() => {
    if (!result.ok || activeTab === "signature") {
      return { chars: 0, lines: 0, bytes: 0 };
    }
    const text = activeTab === "header" ? result.headerJson : result.payloadJson;
    return {
      chars: text.length,
      bytes: bytesFor(text),
      lines: countLines(text),
    };
  }, [result, activeTab]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = useCallback(
    async (kind: "header" | "payload" | "token") => {
      let text = token;
      if (kind === "header" && result.ok) text = result.headerJson;
      if (kind === "payload" && result.ok) text = result.payloadJson;
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(kind);
      } catch {
        setCopied(null);
      }
    },
    [token, result]
  );

  const handleClear = useCallback(() => {
    setToken("");
    setActiveTab("payload");
    inputRef.current?.focus();
  }, []);

  const handleSample = useCallback(() => {
    setToken(SAMPLE_JWT);
    setActiveTab("payload");
  }, []);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result.trim() : "";
      setToken(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  const tone = !token.trim() ? "muted" : result.ok ? "ok" : "error";

  return (
    <ToolPageShell>
      <ToolHeader
        icon={<KeyRound className="h-5 w-5" />}
        title="JWT Decoder"
        subtitle="Paste a token on the left, inspect header and payload on the right."
        status={
          <ToolStatusPill
            ok={result.ok}
            empty={!token.trim()}
            emptyLabel="Awaiting token"
            okLabel="Valid JWT"
            errorLabel="Invalid JWT"
          />
        }
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border bg-card/60 p-1.5 shadow-sm backdrop-blur sm:gap-2 sm:p-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopy("header")}
            disabled={!result.ok}
            aria-label="Copy decoded header JSON"
          >
            {copied === "header" ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {copied === "header" ? "Copied" : "Copy header"}
            </span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopy("payload")}
            disabled={!result.ok}
            aria-label="Copy decoded payload JSON"
          >
            {copied === "payload" ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {copied === "payload" ? "Copied" : "Copy payload"}
            </span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopy("token")}
            disabled={!token.trim()}
            aria-label="Copy raw JWT"
          >
            {copied === "token" ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {copied === "token" ? "Copied" : "Copy token"}
            </span>
          </Button>
          <Button size="sm" variant="outline" onClick={handleUploadClick}>
            <Upload className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Upload</span>
          </Button>
          <Button size="sm" variant="outline" onClick={handleSample}>
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sample</span>
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleClear}
            disabled={!token}
          >
            <Eraser className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".jwt,.txt,text/plain"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          <ToolPanel
            title="Token"
            subtitle="Paste your JWT"
            icon={<KeyRound className="h-4 w-4" />}
            stats={inputStats}
            tone={tone}
          >
            <div className={toolPanelBodyClassName}>
              <textarea
                ref={inputRef}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                spellCheck={false}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="h-full w-full resize-none bg-transparent px-3 py-3 font-mono text-[12.5px] leading-6 break-all outline-none placeholder:text-muted-foreground/60 sm:px-4 sm:text-[13px]"
              />
            </div>
          </ToolPanel>

          <ToolPanel
            title="Decoded"
            subtitle={
              result.ok
                ? [
                    result.algorithm && `alg: ${result.algorithm}`,
                    result.tokenType && `typ: ${result.tokenType}`,
                  ]
                    .filter(Boolean)
                    .join(" · ") || "Header · Payload · Signature"
                : "Fix errors to preview"
            }
            icon={<Shield className="h-4 w-4" />}
            stats={outputStats}
            tone={tone}
          >
            <div className={cn(toolPanelScrollBodyClassName, "flex flex-col")}>
              {result.ok ? (
                <>
                  {result.claims.length > 0 && (
                    <div className="flex flex-wrap gap-2 border-b border-border/60 bg-background/40 px-3 py-2 sm:px-4">
                      {result.claims.map((claim) => (
                        <span
                          key={claim.key}
                          className={cn(
                            "inline-flex max-w-full flex-col rounded-lg border bg-card/80 px-2.5 py-1.5 text-[11px] sm:text-xs",
                            claim.tone === "warn" &&
                              "border-amber-500/40 bg-amber-500/10"
                          )}
                        >
                          <span className="font-mono font-medium text-muted-foreground">
                            {claim.label}
                          </span>
                          <span className="truncate font-mono text-foreground">
                            {claim.value}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-1 border-b border-border/60 bg-background/40 px-2 py-1.5 sm:px-3">
                    {(
                      [
                        { id: "header" as const, label: "Header" },
                        { id: "payload" as const, label: "Payload" },
                        { id: "signature" as const, label: "Signature" },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "rounded-md px-2.5 py-1 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
                          activeTab === tab.id
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        aria-pressed={activeTab === tab.id}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="min-h-0 flex-1 overflow-auto p-3 sm:p-4">
                    {activeTab === "signature" ? (
                      <SignatureView segment={result.signatureSegment} />
                    ) : (
                      <pre
                        className="json-output w-full whitespace-pre font-mono text-[12.5px] leading-6 sm:text-[13px]"
                        dangerouslySetInnerHTML={{ __html: highlighted }}
                      />
                    )}
                  </div>
                </>
              ) : token.trim() ? (
                <DecodeError error={result.error} stage={result.stage} />
              ) : (
                <EmptyDecode />
              )}
            </div>
          </ToolPanel>
        </div>

        <ToolSeoSection
          aboutId="about-jwt-decoder"
          aboutTitle="A fast, private JWT decoder for developers"
          aboutParagraphs={[
            <>
              Paste any JSON Web Token to instantly view its{" "}
              <strong>header</strong> and <strong>payload</strong> as prettified,
              syntax-highlighted JSON. Common claims like <strong>exp</strong>,{" "}
              <strong>iat</strong>, and <strong>nbf</strong> are converted to
              readable timestamps so you can spot expired tokens at a glance.
            </>,
            <>
              Everything runs <strong>locally in your browser</strong>. Tokens are
              never uploaded — ideal for debugging auth flows, inspecting API
              responses, and learning how JWTs are structured.
            </>,
          ]}
          featureList={[
            "Decode header & payload",
            "Readable exp / iat / nbf times",
            "Syntax-highlighted JSON",
            "Copy header, payload, or token",
            "Sample JWT included",
            "100% client-side & free",
          ]}
          faqs={jwtDecoderFaqs}
        />
      </div>

      <JsonHighlightStyles />
    </ToolPageShell>
  );
}

function SignatureView({ segment }: { segment: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-800 dark:text-amber-200 sm:text-sm">
        <Lock className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Signature verification is not performed. Validating a signature requires
          your secret or public key and depends on the algorithm in the header.
        </p>
      </div>
      <div>
        <div className="mb-1.5 text-xs font-medium text-muted-foreground">
          Signature segment (Base64URL)
        </div>
        <pre className="overflow-x-auto rounded-lg border bg-background/60 p-3 font-mono text-[12px] leading-6 break-all text-foreground/90 sm:text-[13px]">
          {segment}
        </pre>
      </div>
    </div>
  );
}

function EmptyDecode() {
  return (
    <div className="flex h-full min-h-[200px] w-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
      <div className="max-w-sm">
        <KeyRound className="mx-auto mb-2 h-6 w-6 opacity-50" />
        Decoded header and payload appear here when you paste a valid JWT.
      </div>
    </div>
  );
}

function DecodeError({
  error,
  stage,
}: {
  error: string;
  stage: string;
}) {
  return (
    <div className="flex w-full flex-col gap-3 p-4 sm:p-6">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
        Decode error
        <span className="font-mono text-[11px] opacity-80">{stage}</span>
      </div>
      <pre className="overflow-auto rounded-lg border border-destructive/30 bg-destructive/5 p-3 font-mono text-[12px] leading-6 break-words whitespace-pre-wrap text-destructive sm:text-[12.5px]">
        {error}
      </pre>
    </div>
  );
}
