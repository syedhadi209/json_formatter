export type Base64CodecOptions = {
  urlSafe?: boolean;
};

export type EncodeResult =
  | { ok: true; output: string }
  | { ok: false; error: string };

export type DecodeResult =
  | { ok: true; output: string; isUtf8: true }
  | {
      ok: true;
      output: string;
      isUtf8: false;
      hexPreview: string;
    }
  | { ok: false; error: string };
