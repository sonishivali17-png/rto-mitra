import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RTO Mitra — India's Smart Vehicle Help Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.9 }}>RTO Mitra</div>
        <div style={{ fontSize: 76, fontWeight: 800, marginTop: 12, lineHeight: 1.05 }}>
          All RTO help in one place
        </div>
        <div style={{ fontSize: 32, marginTop: 16, opacity: 0.9, maxWidth: 1000 }}>
          Trusted guides, AI assistance & end-to-end support for vehicle paperwork in India.
        </div>
      </div>
    ),
    { ...size }
  );
}
