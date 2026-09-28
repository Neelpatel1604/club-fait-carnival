export const metadata = {
  title: "AWS Carnival Poster",
  description: "Printable 8.5×11 AWS Carnival club fair poster",
};

export default function PosterPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#131b24",
        color: "#fff4de",
        padding: "24px 16px 48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>AWS Carnival Poster</h1>
      <p style={{ margin: 0, opacity: 0.85, textAlign: "center" }}>
        Letter size 8.5″ × 11″ — download PNG or JPG to print
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <a
          href="/aws-carnival-poster.png"
          download="aws-carnival-poster.png"
          style={{
            background: "#ff9900",
            color: "#16202b",
            fontWeight: 700,
            padding: "12px 20px",
            borderRadius: 999,
            textDecoration: "none",
          }}
        >
          Download PNG
        </a>
        <a
          href="/aws-carnival-poster.jpg"
          download="aws-carnival-poster.jpg"
          style={{
            background: "transparent",
            color: "#fff4de",
            fontWeight: 700,
            padding: "12px 20px",
            borderRadius: 999,
            textDecoration: "none",
            border: "2px solid rgba(255,244,222,0.35)",
          }}
        >
          Download JPG
        </a>
      </div>
      <div
        style={{
          marginTop: 12,
          maxWidth: 520,
          width: "100%",
          borderRadius: 12,
          overflow: "hidden",
          border: "2px solid rgba(255,153,0,0.4)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/aws-carnival-poster.png"
          alt="AWS Carnival printable poster with QR code"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>
    </main>
  );
}
