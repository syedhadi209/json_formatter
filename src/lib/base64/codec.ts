import type {
  Base64CodecOptions,
  DecodeResult,
  EncodeResult,
} from "./types";

export function isBinaryDecodeResult(
  result: DecodeResult
): result is Extract<DecodeResult, { ok: true; isUtf8: false }> {
  return result.ok && "isUtf8" in result && result.isUtf8 === false;
}

export const SAMPLE_PLAIN = "Hello, Devkit! 🚀\nEncode and decode in your browser.";

export const SAMPLE_BASE64 =
  "SGVsbG8sIERldmtpdCEg8J+aggpFbmNvZGUgYW5kIGRlY29kZSBpbiB5b3VyIGJyb3dzZXIu";

function utf8ToBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function bytesToBase64(bytes: Uint8Array, urlSafe: boolean): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  let b64 = btoa(binary);
  if (urlSafe) {
    b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return b64;
}

function normalizeBase64Input(input: string, urlSafe: boolean): string {
  const trimmed = input.replace(/\s/g, "");
  if (!trimmed) return "";
  let normalized = trimmed;
  if (urlSafe) {
    normalized = normalized.replace(/-/g, "+").replace(/_/g, "/");
  }
  const pad = normalized.length % 4;
  return pad === 0 ? normalized : normalized + "=".repeat(4 - pad);
}

function isValidBase64Alphabet(input: string): boolean {
  const stripped = input.replace(/\s/g, "");
  if (!stripped) return true;
  return /^[A-Za-z0-9+/_-]*={0,2}$/.test(stripped);
}

function base64ToBytes(b64: string, urlSafe: boolean): Uint8Array {
  const normalized = normalizeBase64Input(b64, urlSafe);
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array, maxBytes = 64): string {
  const slice = bytes.slice(0, maxBytes);
  const hex = Array.from(slice)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");
  if (bytes.length > maxBytes) {
    return `${hex} … (+${bytes.length - maxBytes} bytes)`;
  }
  return hex;
}

export function encodeText(
  plain: string,
  options?: Base64CodecOptions
): EncodeResult {
  if (!plain) {
    return { ok: true, output: "" };
  }
  try {
    const bytes = utf8ToBytes(plain);
    return {
      ok: true,
      output: bytesToBase64(bytes, options?.urlSafe ?? false),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `Encode failed: ${message}` };
  }
}

export function encodeBytes(
  bytes: Uint8Array,
  options?: Base64CodecOptions
): EncodeResult {
  try {
    return {
      ok: true,
      output: bytesToBase64(bytes, options?.urlSafe ?? false),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `Encode failed: ${message}` };
  }
}

export function decodeText(
  b64: string,
  options?: Base64CodecOptions
): DecodeResult {
  const trimmed = b64.trim();
  if (!trimmed) {
    return { ok: true, output: "", isUtf8: true };
  }

  const urlSafe = options?.urlSafe ?? false;
  if (!isValidBase64Alphabet(trimmed)) {
    return {
      ok: false,
      error:
        "Invalid Base64: use A–Z, a–z, 0–9, +, /, -, _, and optional padding.",
    };
  }

  try {
    const bytes = base64ToBytes(trimmed, urlSafe);
    try {
      const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
      return { ok: true, output: text, isUtf8: true };
    } catch {
      return {
        ok: true,
        output: "",
        isUtf8: false,
        hexPreview: bytesToHex(bytes),
      };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `Decode failed: ${message}` };
  }
}
