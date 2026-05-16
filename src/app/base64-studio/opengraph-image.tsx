import { ImageResponse } from "next/og";

export const alt = "Base64 Studio — Encode and decode text online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#06070b",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(16,185,129,0.25), transparent 50%), radial-gradient(circle at 85% 25%, rgba(20,184,166,0.2), transparent 55%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            B64
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700 }}>Devkit</div>
        </div>
        <div
          style={{
            marginTop: 56,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            Base64 Studio
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 820,
            }}
          >
            Encode and decode text — 100% in your browser.
          </div>
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 10,
            position: "relative",
          }}
        >
          {["Encode", "Decode", "UTF-8", "Private"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 18,
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
