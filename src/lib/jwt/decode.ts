import type { JwtClaimHighlight, JwtDecodeResult } from "./types";

function decodeBase64Url(segment: string): string {
  const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4;
  const padded =
    pad === 0 ? normalized : normalized + "=".repeat(4 - pad);
  return atob(padded);
}

function parseJsonSegment(
  segment: string,
  label: "header" | "payload"
): { ok: true; json: string; data: Record<string, unknown> } | { ok: false; error: string } {
  try {
    const decoded = decodeBase64Url(segment);
    const data = JSON.parse(decoded) as unknown;
    if (data === null || typeof data !== "object" || Array.isArray(data)) {
      return {
        ok: false,
        error: `JWT ${label} must be a JSON object.`,
      };
    }
    return {
      ok: true,
      data: data as Record<string, unknown>,
      json: JSON.stringify(data, null, 2),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      error: `Invalid JWT ${label}: ${message}`,
    };
  }
}

function formatUnixClaim(value: unknown, label: string): JwtClaimHighlight | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const date = new Date(value * 1000);
  if (Number.isNaN(date.getTime())) return null;
  const iso = date.toISOString();
  const now = Date.now();
  const diffMs = date.getTime() - now;
  const relative =
    Math.abs(diffMs) < 60_000
      ? "just now"
      : diffMs > 0
        ? `in ${formatRelative(diffMs)}`
        : `${formatRelative(-diffMs)} ago`;
  const tone =
    label === "exp" && diffMs < 0 ? "warn" : label === "nbf" && diffMs > 0 ? "warn" : undefined;
  return {
    key: label,
    label: label.toUpperCase(),
    value: `${iso} (${relative})`,
    tone,
  };
}

function formatRelative(ms: number): string {
  const sec = Math.floor(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const day = Math.floor(hr / 24);
  return `${day}d`;
}

function extractClaims(payload: Record<string, unknown>): JwtClaimHighlight[] {
  const claims: JwtClaimHighlight[] = [];

  const timeClaims = [
    formatUnixClaim(payload.exp, "exp"),
    formatUnixClaim(payload.iat, "iat"),
    formatUnixClaim(payload.nbf, "nbf"),
  ].filter((c): c is JwtClaimHighlight => c !== null);
  claims.push(...timeClaims);

  if (typeof payload.iss === "string") {
    claims.push({ key: "iss", label: "ISS", value: payload.iss });
  }
  if (typeof payload.aud === "string" || Array.isArray(payload.aud)) {
    claims.push({
      key: "aud",
      label: "AUD",
      value: Array.isArray(payload.aud) ? payload.aud.join(", ") : payload.aud,
    });
  }
  if (typeof payload.sub === "string") {
    claims.push({ key: "sub", label: "SUB", value: payload.sub });
  }

  return claims;
}

export function decodeJwt(token: string): JwtDecodeResult {
  const trimmed = token.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste a JWT to decode.", stage: "structure" };
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return {
      ok: false,
      error: "A JWT must have exactly three Base64URL segments separated by dots (header.payload.signature).",
      stage: "structure",
    };
  }

  const [headerSeg, payloadSeg, signatureSeg] = parts;
  if (!headerSeg || !payloadSeg || !signatureSeg) {
    return {
      ok: false,
      error: "JWT segments cannot be empty.",
      stage: "structure",
    };
  }

  const headerResult = parseJsonSegment(headerSeg, "header");
  if (!headerResult.ok) {
    return { ok: false, error: headerResult.error, stage: "header" };
  }

  const payloadResult = parseJsonSegment(payloadSeg, "payload");
  if (!payloadResult.ok) {
    return { ok: false, error: payloadResult.error, stage: "payload" };
  }

  const algorithm =
    typeof headerResult.data.alg === "string" ? headerResult.data.alg : null;
  const tokenType =
    typeof headerResult.data.typ === "string" ? headerResult.data.typ : null;

  return {
    ok: true,
    header: headerResult.data,
    payload: payloadResult.data,
    signatureSegment: signatureSeg,
    headerJson: headerResult.json,
    payloadJson: payloadResult.json,
    algorithm,
    tokenType,
    claims: extractClaims(payloadResult.data),
  };
}

export const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
