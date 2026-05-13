import { ImageResponse } from "next/og";

export const alt =
  "JSON Formatter — Format, validate, and beautify JSON online";
export const size = {
  width: 1200,
  height: 630,
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
            "radial-gradient(circle at 12% 12%, rgba(56,189,248,0.28), transparent 50%), radial-gradient(circle at 90% 18%, rgba(168,85,247,0.22), transparent 55%)",
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
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, #38bdf8 0%, #6366f1 50%, #a855f7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.04em",
              }}
            >
              {`{ }`}
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Devkit
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 18,
              padding: "8px 16px",
              border: "1px solid rgba(52, 211, 153, 0.35)",
              background: "rgba(52, 211, 153, 0.10)",
              color: "#6ee7b7",
              borderRadius: 999,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#34d399",
              }}
            />
            Live
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background:
                  "linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #f0abfc 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              JSON
            </span>
            <span>Formatter</span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 880,
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            Paste JSON, get a prettified, syntax-highlighted view side-by-side.
            Free, instant, 100% in your browser.
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            position: "relative",
            display: "flex",
            alignItems: "stretch",
            padding: 28,
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(12, 14, 22, 0.7)",
            boxShadow: "0 30px 80px -30px rgba(99,102,241,0.55)",
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
            fontSize: 22,
            lineHeight: 1.55,
            gap: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                color: "rgba(255,255,255,0.45)",
                fontSize: 16,
              }}
            >
              Input
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <div style={{ display: "flex" }}>{'{"name":"Aurora",'}</div>
              <div style={{ display: "flex" }}>{'"version":"2.4.1",'}</div>
              <div style={{ display: "flex" }}>{'"active":true}'}</div>
            </div>
          </div>
          <div
            style={{
              width: 1,
              alignSelf: "stretch",
              background: "rgba(255,255,255,0.08)",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                color: "rgba(255,255,255,0.45)",
                fontSize: 16,
              }}
            >
              Formatted
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex" }}>
                <span style={{ color: "#93c5fd" }}>&quot;name&quot;</span>
                <span>:&nbsp;</span>
                <span style={{ color: "#86efac" }}>&quot;Aurora&quot;</span>
                <span>,</span>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ color: "#93c5fd" }}>&quot;version&quot;</span>
                <span>:&nbsp;</span>
                <span style={{ color: "#86efac" }}>&quot;2.4.1&quot;</span>
                <span>,</span>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ color: "#93c5fd" }}>&quot;active&quot;</span>
                <span>:&nbsp;</span>
                <span style={{ color: "#f0abfc" }}>true</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
