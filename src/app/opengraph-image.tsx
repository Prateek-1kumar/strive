import { ImageResponse } from "next/og";

export const alt = "Strive — Build your future";
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
          justifyContent: "space-between",
          padding: 80,
          background: "#f8f6f1",
          color: "#06254a",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.3em" }}>STRIVE</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, lineHeight: 1.05 }}>Build your future.</div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#5d6066" }}>
            A career platform grounded in career psychology.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
