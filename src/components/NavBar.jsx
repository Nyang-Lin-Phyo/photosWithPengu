import { useState } from "react";
import penguIcon from "../assets/pengus/pengu.png";

export default function NavBar({ onHome }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const brand = (
    <>
      <img
        src={penguIcon}
        alt="pengu"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-family-display)",
          fontWeight: "var(--font-weight-regular)",
          fontSize: "var(--font-size-base)",
          color: "var(--color-text)",
        }}
      >
        pengu photobooth
      </span>
    </>
  );

  const confirmHome = () => {
    setShowConfirm(false);
    onHome?.();
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "1rem 2rem",
          borderBottom: "1px solid var(--color-border-muted)",
          flexShrink: 0,
        }}
      >
        {onHome ? (
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            {brand}
          </button>
        ) : (
          brand
        )}
      </nav>

      {showConfirm && (
        <div
          role="presentation"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-dialog-backdrop)",
            padding: "1rem",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="start-over-title"
            style={{
              width: "min(420px, 100%)",
              borderRadius: 12,
              background: "var(--color-page)",
              boxShadow: "var(--shadow-strip)",
              padding: "1.5rem",
            }}
          >
            <h2
              id="start-over-title"
              style={{
                marginBottom: "0.5rem",
                fontFamily: "var(--font-family-display)",
                fontSize: "var(--font-size-2xl)",
                lineHeight: "var(--line-height-tight)",
                color: "var(--color-text)",
              }}
            >
              Start over?
            </h2>
            <p
              style={{
                marginBottom: "1.5rem",
                color: "var(--color-text-muted)",
                fontSize: "var(--font-size-base)",
                lineHeight: "var(--line-height-label)",
              }}
            >
              This will clear your current frame, pengus, photos, and stickers.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.75rem",
              }}
            >
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                style={{
                  background: "var(--color-page)",
                  color: "var(--color-text)",
                  border: "2px solid var(--color-border-soft)",
                  borderRadius: "999px",
                  padding: "0.7rem 1.25rem",
                  fontFamily: "var(--font-family-body)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "var(--font-size-base)",
                  cursor: "pointer",
                }}
              >
                cancel
              </button>
              <button
                type="button"
                onClick={confirmHome}
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-primary-contrast)",
                  border: "none",
                  borderRadius: "999px",
                  padding: "0.7rem 1.25rem",
                  fontFamily: "var(--font-family-body)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "var(--font-size-base)",
                  cursor: "pointer",
                }}
              >
                start over
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
