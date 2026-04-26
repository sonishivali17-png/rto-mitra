import { ImageResponse } from "next/og";
import { KNOWLEDGE_ARTICLES } from "@/data/knowledge-articles";
import { SEO_ARTICLES } from "@/data/seo-articles";

export const runtime = "edge";
export const alt = "RTO Mitra knowledge article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ALL = [...KNOWLEDGE_ARTICLES, ...SEO_ARTICLES];

export default async function ArticleOG({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const a = ALL.find((x) => x.slug === params.slug && x.categorySlug === params.category);
  const title = a?.title ?? "RTO Mitra";
  const category = a?.category ?? "Knowledge Hub";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 35%, #0ea5e9 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            R
          </div>
          <div style={{ fontSize: 22, opacity: 0.9 }}>RTO Mitra · {category}</div>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            maxWidth: 1050,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            opacity: 0.9,
          }}
        >
          <span>India's Smart Vehicle Help Platform</span>
          <span>rtomitra.in</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
