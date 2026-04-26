import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 192, height: 192 };
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
          background: "linear-gradient(135deg,#1d4ed8 0%,#2563eb 50%,#0ea5e9 100%)",
          color: "white",
          fontSize: 110,
          fontWeight: 800,
          fontFamily: "system-ui",
          letterSpacing: -3,
          borderRadius: 36,
        }}
      >
        R
      </div>
    ),
    { ...size }
  );
}
