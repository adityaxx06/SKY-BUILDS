import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo/site";

/**
 * Default social sharing image (1200×630). Follows the approved v5
 * identity — deep atmospheric background, warm off-white type, single
 * indigo→magenta→amber accent bar. System fonts only so image
 * generation never depends on network font fetches.
 */
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "#120E1F",
          color: "#F5F1EC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: 4,
            color: "#FFC15C",
            marginBottom: 32,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Digital experiences built to move ideas forward.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: 48,
          }}
        >
          <div
            style={{
              width: 160,
              height: 8,
              borderRadius: 4,
              background:
                "linear-gradient(90deg, #5B78FF, #FF5DA2, #FFC15C)",
            }}
          />
          <div style={{ fontSize: 30, color: "#948BAE" }}>
            {SITE_DESCRIPTION}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
