import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "112px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 300,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.05em",
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1,
            marginTop: -20,
          }}
        >
          {`{ }`}
        </div>
      </div>
    ),
    { ...size }
  );
}
