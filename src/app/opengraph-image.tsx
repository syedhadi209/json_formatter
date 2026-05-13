import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/seo";

export const alt = siteConfig.ogImage.alt;
export const size = {
  width: siteConfig.ogImage.width,
  height: siteConfig.ogImage.height,
};
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
            "radial-gradient(circle at 18% 22%, rgba(56,189,248,0.30), transparent 55%), radial-gradient(circle at 82% 24%, rgba(168,85,247,0.28), transparent 55%), radial-gradient(circle at 50% 100%, rgba(99,102,241,0.20), transparent 60%)",
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
            gap: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background:
                "linear-gradient(135deg, #38bdf8 0%, #6366f1 50%, #a855f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "white",
              boxShadow: "0 24px 60px -20px rgba(99,102,241,0.7)",
            }}
          >
            {`{ }`}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Devkit
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "6px 12px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Beta
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: 64,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              maxWidth: 900,
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            <span>A modern</span>
            <span
              style={{
                background:
                  "linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #f0abfc 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              toolbelt
            </span>
            <span>for developers.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            JSON formatter, JWT decoder, regex tester, color converters and more —
            fast, free, and 100% in your browser.
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["JSON", "JWT", "Base64", "Regex", "Colors", "Cron"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 20,
                  fontWeight: 500,
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 20,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#34d399",
              }}
            />
            12 tools · 100% client-side
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
