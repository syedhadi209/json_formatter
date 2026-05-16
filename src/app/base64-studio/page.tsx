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
  ArrowLeftRight,
  Binary,
  Check,
  Copy,
  Eraser,
  FileWarning,
  Sparkles,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToolHeader } from "@/components/tools/tool-header";
import { ToolPageShell } from "@/components/tools/tool-page-shell";
import {
  ToolPanel,
  toolPanelBodyClassName,
  toolPanelScrollBodyClassName,
} from "@/components/tools/tool-panel";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";
import { ToolStatusPill } from "@/components/tools/tool-status-pill";
import {
  SAMPLE_BASE64,
  SAMPLE_PLAIN,
  decodeText,
  encodeBytes,
  encodeText,
  isBinaryDecodeResult,
} from "@/lib/base64/codec";
import { bytesFor, countLines } from "@/lib/format/text-stats";
import { cn } from "@/lib/utils";
import { base64StudioFaqs } from "./faq-data";

const MAX_FILE_BYTES = 5 * 1024 * 1024;

type Mode = "encode" | "decode";
type CopiedKind = "input" | "output" | null;

export default function Base64StudioPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState<CopiedKind>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileEncodeOutput, setFileEncodeOutput] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<{ name: string; bytes: number } | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const codecOptions = useMemo(() => ({ urlSafe }), [urlSafe]);

  const encodeResult = useMemo(() => {
    if (fileEncodeOutput !== null) {
      return { ok: true as const, output: fileEncodeOutput };
    }
    return encodeText(input, codecOptions);
  }, [input, codecOptions, fileEncodeOutput]);

  const decodeResult = useMemo(
    () => decodeText(input, codecOptions),
    [input, codecOptions]
  );

  const result = mode === "encode" ? encodeResult : decodeResult;

  const outputText = useMemo(() => {
    if (!result.ok) return "";
    if (mode === "encode") return result.output;
    if ("isUtf8" in result && result.isUtf8 === false) return "";
    return result.output;
  }, [result, mode]);

  const inputStats = useMemo(
    () => ({
      chars: input.length,
      bytes: bytesFor(input),
      lines: countLines(input),
    }),
    [input]
  );

  const outputStats = useMemo(
    () => ({
      chars: outputText.length,
      bytes: bytesFor(outputText),
      lines: countLines(outputText),
    }),
    [outputText]
  );

  const isEmpty = !input.trim() && !fileEncodeOutput;
  const isSuccess =
    result.ok &&
    (mode === "encode" ||
      (result.ok && "isUtf8" in result && result.isUtf8 !== false));
  const binaryDecode =
    mode === "decode" && isBinaryDecodeResult(decodeResult)
      ? decodeResult
      : null;
  const isBinaryDecode = binaryDecode !== null;

  const tone = isEmpty ? "muted" : isSuccess || isBinaryDecode ? "ok" : "error";

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = useCallback(async (kind: "input" | "output") => {
    const text = kind === "input" ? input : outputText;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
    } catch {
      setCopied(null);
    }
  }, [input, outputText]);

  const handleClear = useCallback(() => {
    setInput("");
    setFileError(null);
    setFileEncodeOutput(null);
    setFileMeta(null);
    inputRef.current?.focus();
  }, []);

  const handleSample = useCallback(() => {
    setFileError(null);
    setFileEncodeOutput(null);
    setFileMeta(null);
    if (mode === "encode") {
      setInput(SAMPLE_PLAIN);
    } else {
      setInput(SAMPLE_BASE64);
    }
  }, [mode]);

  const handleSwap = useCallback(() => {
    if (!result.ok || !outputText) return;
    setInput(outputText);
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setFileError(null);
    setFileEncodeOutput(null);
    setFileMeta(null);
  }, [result.ok, outputText]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;

      setFileError(null);
      if (file.size > MAX_FILE_BYTES) {
        setFileError("File exceeds 5 MB limit.");
        return;
      }

      if (mode === "encode") {
        const reader = new FileReader();
        reader.onload = () => {
          if (!(reader.result instanceof ArrayBuffer)) return;
          const bytes = new Uint8Array(reader.result);
          const encoded = encodeBytes(bytes, codecOptions);
          if (encoded.ok) {
            setInput("");
            setFileEncodeOutput(encoded.output);
            setFileMeta({ name: file.name, bytes: bytes.length });
          } else {
            setFileError(encoded.error);
          }
        };
        reader.readAsArrayBuffer(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const text =
          typeof reader.result === "string" ? reader.result.trim() : "";
        setInput(text);
      };
      reader.readAsText(file);
    },
    [mode, codecOptions]
  );

  const inputLabel = mode === "encode" ? "Plain text" : "Base64";
  const outputLabel = mode === "encode" ? "Base64" : "Plain text";
  const inputPlaceholder =
    mode === "encode"
      ? "Type or paste text to encode…"
      : "Paste Base64 to decode…";
  const outputPlaceholder =
    mode === "encode"
      ? "Encoded output appears here"
      : "Decoded text appears here";

  return (
    <ToolPageShell>
      <ToolHeader
        icon={<Binary className="h-5 w-5" />}
        title="Base64 Studio"
        subtitle={
          mode === "encode"
            ? "Enter text on the left — Base64 output updates on the right."
            : "Paste Base64 on the left — decoded text appears on the right."
        }
        status={
          <ToolStatusPill
            ok={isSuccess || isBinaryDecode}
            empty={isEmpty}
            emptyLabel={mode === "encode" ? "Awaiting text" : "Awaiting Base64"}
            okLabel={mode === "encode" ? "Encoded" : "Decoded"}
            errorLabel={mode === "encode" ? "Encode error" : "Decode error"}
          />
        }
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border bg-card/60 p-1.5 shadow-sm backdrop-blur sm:gap-2 sm:p-2">
          <div className="flex items-center rounded-lg border bg-background/60 p-0.5">
            {(
              [
                { id: "encode" as const, label: "Encode" },
                { id: "decode" as const, label: "Decode" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setMode(tab.id);
                  setFileError(null);
                  setFileEncodeOutput(null);
                  setFileMeta(null);
                }}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
                  mode === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                aria-pressed={mode === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            variant={urlSafe ? "default" : "outline"}
            onClick={() => {
              setUrlSafe((v) => !v);
              setFileEncodeOutput(null);
              setFileMeta(null);
            }}
            aria-pressed={urlSafe}
            aria-label="Toggle URL-safe Base64"
          >
            URL-safe
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopy("output")}
            disabled={!outputText}
            aria-label="Copy output"
          >
            {copied === "output" ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {copied === "output" ? "Copied" : "Copy output"}
            </span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopy("input")}
            disabled={!input.trim()}
            aria-label="Copy input"
          >
            {copied === "input" ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {copied === "input" ? "Copied" : "Copy input"}
            </span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleSwap}
            disabled={!result.ok || !outputText}
            aria-label="Swap input and output"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Swap</span>
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
            disabled={!input}
          >
            <Eraser className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept={mode === "encode" ? "*" : ".txt,text/plain"}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {fileError && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive sm:text-sm">
            <FileWarning className="h-4 w-4 shrink-0" />
            {fileError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          <ToolPanel
            title="Input"
            subtitle={
              fileMeta
                ? `${inputLabel} · ${fileMeta.name} (${fileMeta.bytes} B)`
                : inputLabel
            }
            icon={<Binary className="h-4 w-4" />}
            stats={inputStats}
            tone={tone}
          >
            <div className={toolPanelBodyClassName}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setFileError(null);
                  setFileEncodeOutput(null);
                  setFileMeta(null);
                }}
                spellCheck={false}
                placeholder={inputPlaceholder}
                className="h-full w-full resize-none bg-transparent px-3 py-3 font-mono text-[12.5px] leading-6 break-all outline-none placeholder:text-muted-foreground/60 sm:px-4 sm:text-[13px]"
              />
            </div>
          </ToolPanel>

          <ToolPanel
            title="Output"
            subtitle={
              urlSafe
                ? `${outputLabel} · URL-safe`
                : outputLabel
            }
            icon={<Binary className="h-4 w-4" />}
            stats={outputStats}
            tone={tone}
          >
            <div className={cn(toolPanelScrollBodyClassName, "flex flex-col")}>
              {binaryDecode ? (
                <BinaryOutputView hexPreview={binaryDecode.hexPreview} />
              ) : !result.ok && !isEmpty ? (
                <CodecError error={result.error} />
              ) : isEmpty ? (
                <EmptyOutput mode={mode} />
              ) : (
                <pre className="h-full w-full overflow-auto whitespace-pre-wrap p-3 font-mono text-[12.5px] leading-6 break-all text-foreground/90 sm:p-4 sm:text-[13px]">
                  {outputText}
                </pre>
              )}
            </div>
          </ToolPanel>
        </div>

        <ToolSeoSection
          aboutId="about-base64-studio"
          aboutTitle="Encode and decode Base64 in your browser"
          aboutParagraphs={[
            <>
              Convert plain text to <strong>Base64</strong> or decode Base64
              back to readable text with full <strong>UTF-8</strong> support.
              Toggle <strong>URL-safe</strong> mode for JWT-style encoding
              without <code>+</code> or <code>/</code>.
            </>,
            <>
              Everything runs <strong>locally in your browser</strong>. Your data
              is never uploaded — ideal for API debugging, config snippets, and
              quick encoding tasks.
            </>,
          ]}
          featureList={[
            "Encode text to Base64",
            "Decode Base64 to text",
            "URL-safe Base64 mode",
            "UTF-8 & emoji support",
            "Upload small files",
            "100% client-side & free",
          ]}
          faqs={base64StudioFaqs}
        />
      </div>
    </ToolPageShell>
  );
}

function EmptyOutput({ mode }: { mode: Mode }) {
  return (
    <div className="flex h-full min-h-[200px] w-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
      <div className="max-w-sm">
        <Binary className="mx-auto mb-2 h-6 w-6 opacity-50" />
        {mode === "encode"
          ? "Encoded Base64 appears here as you type."
          : "Decoded text appears here when you paste valid Base64."}
      </div>
    </div>
  );
}

function CodecError({ error }: { error: string }) {
  return (
    <div className="flex w-full flex-col gap-3 p-4 sm:p-6">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
        {error.includes("Encode") ? "Encode error" : "Decode error"}
      </div>
      <pre className="overflow-auto rounded-lg border border-destructive/30 bg-destructive/5 p-3 font-mono text-[12px] leading-6 break-words whitespace-pre-wrap text-destructive sm:text-[12.5px]">
        {error}
      </pre>
    </div>
  );
}

function BinaryOutputView({ hexPreview }: { hexPreview: string }) {
  return (
    <div className="flex w-full flex-col gap-3 p-4 sm:p-6">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-800 dark:text-amber-200">
        Binary output (not UTF-8 text)
      </div>
      <p className="text-sm text-muted-foreground">
        Decoded bytes are not valid UTF-8. Hex preview (first 64 bytes):
      </p>
      <pre className="overflow-auto rounded-lg border bg-background/60 p-3 font-mono text-[12px] leading-6 break-all text-foreground/90 sm:text-[13px]">
        {hexPreview}
      </pre>
    </div>
  );
}
