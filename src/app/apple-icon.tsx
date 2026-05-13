import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #38bdf8 0%, #6366f1 50%, #a855f7 100%)",
          borderRadius: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 110,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.05em",
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1,
            marginTop: -8,
          }}
        >
          {`{ }`}
        </div>
      </div>
    ),
    { ...size }
  );
}
