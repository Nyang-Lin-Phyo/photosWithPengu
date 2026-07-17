import { useEffect, useRef } from "react";
import NavBar from "../components/NavBar";

export default function SaveStrip({ onBack, onReset, frame, photos, stickers }) {
  const canvasRef = useRef();
  const slots = frame?.slots ?? 4;
  const W = 300;
  const H = 120;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = W;
    canvas.height = H * slots + 20;

    const theme = getComputedStyle(document.documentElement);
    ctx.fillStyle = theme.getPropertyValue("--color-navy").trim();
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    photos.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 10, i * H + 10, W - 20, H - 10);
        if (i === photos.length - 1) {
          stickers.forEach((s) => {
            ctx.font = theme.getPropertyValue("--font-canvas-sticker").trim();
            ctx.fillText(s.emoji, s.x, s.y);
          });
        }
      };
      img.src = src;
    });
  }, [photos, stickers, slots]);

  const download = () => {
    const link = document.createElement("a");
    link.download = "photostrip.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface)" }}>
      <NavBar onHome={onReset} />

      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-family-display)",
            fontSize: "var(--font-size-2xl)",
            marginBottom: "0.5rem",
            alignSelf: "flex-start",
          }}
        >
          Your photo strip!
        </h2>
        <p
          style={{
            color: "var(--color-text-subtle)",
            marginBottom: "2rem",
            alignSelf: "flex-start",
          }}
        >
          {"Looking good \ud83c\udf89"}
        </p>

        <canvas
          ref={canvasRef}
          style={{
            borderRadius: 12,
            boxShadow: "var(--shadow-strip)",
            maxWidth: "100%",
          }}
        />

        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-subtle)",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <button
            onClick={download}
            style={{
              background: "var(--color-accent-yellow)",
              color: "var(--color-navy)",
              border: "none",
              borderRadius: "999px",
              padding: "0.8rem 2rem",
              fontFamily: "var(--font-family-display)",
              fontWeight: "var(--font-weight-extra-bold)",
              fontSize: "var(--font-size-base)",
              cursor: "pointer",
            }}
          >
            Download Strip
          </button>
          <button
            onClick={onReset}
            style={{
              background: "var(--color-navy)",
              color: "var(--color-surface)",
              border: "none",
              borderRadius: "999px",
              padding: "0.8rem 2rem",
              fontFamily: "var(--font-family-display)",
              fontWeight: "var(--font-weight-extra-bold)",
              fontSize: "var(--font-size-base)",
              cursor: "pointer",
            }}
          >
            Start over
          </button>
        </div>
      </div>
    </div>
  );
}
