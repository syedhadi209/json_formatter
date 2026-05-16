export type JwtDecodeSuccess = {
  ok: true;
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signatureSegment: string;
  headerJson: string;
  payloadJson: string;
  algorithm: string | null;
  tokenType: string | null;
  claims: JwtClaimHighlight[];
};

export type JwtDecodeError = {
  ok: false;
  error: string;
  stage: "structure" | "header" | "payload";
};

export type JwtDecodeResult = JwtDecodeSuccess | JwtDecodeError;

export type JwtClaimHighlight = {
  key: string;
  label: string;
  value: string;
  tone?: "warn" | "muted";
};
