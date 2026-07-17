import { ChevronRight } from "lucide-react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import StepIndicator from "../components/StepIndicator";
import { SCREENS } from "../navigation";
import frame1 from "../assets/frames/framePoro.png";
import frame2 from "../assets/frames/frameLeague.png";
import frame3 from "../assets/frames/frameClouds.png";
import frame4 from "../assets/frames/frameCrown.png";

const FRAMES = [
  { id: "poro", label: "poro frenzy", img: frame1, slots: 3 },
  { id: "league", label: "league frenzy", img: frame2, slots: 3 },
  { id: "cloud", label: "cloud frenzy", img: frame3, slots: 3 },
  { id: "crown", label: "crown frenzy", img: frame4, slots: 3 },
];

const ROTATIONS = [-12, -5, 5, 12];

export default function ChooseFrame({
  frame,
  onExit,
  onNext,
  onReset,
  onSelectFrame,
}) {
  const [selected, setSelected] = useState(frame?.id ?? null);

  const handleSelect = (f) => {
    setSelected(f.id);
    onSelectFrame(f);
  };

  return (
    <>
      <style>{`
        .frame-card {
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), filter 0.3s ease;
          filter: drop-shadow(var(--shadow-frame-card));
        }
        .frame-card:hover {
          filter: drop-shadow(var(--shadow-frame-card-hover));
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          background: "var(--color-page)",
          fontFamily: "var(--font-family-body)",
          overflow: "hidden",
        }}
      >
        <NavBar onHome={onReset} />

        <StepIndicator currentScreen={SCREENS.CHOOSE_FRAME} />

        {/* Heading */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-base)",
            color: "var(--color-text-muted)",
            margin: "1.5rem 0 0",
          }}
        >
          choose your frame!
        </p>

        {/* Frames */}
        {/* Frames */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: "1rem 4rem",
            minHeight: 0,
            width: "100%",
          }}
        >
          {FRAMES.map((f, i) => {
            const isSelected = selected === f.id;
            const rotate = isSelected ? 0 : ROTATIONS[i];
            const scale = isSelected ? 1.15 : 1;
            const translateY = isSelected ? -20 : 0;

            return (
              <div
                key={f.id}
                className="frame-card"
                onClick={() => handleSelect(f)}
                style={{
                  transform: `rotate(${rotate}deg) scale(${scale}) translateY(${translateY}px)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <img
                  src={f.img}
                  alt={f.label}
                  style={{
                    height: "clamp(220px, 40vh, 500px)",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
                {isSelected && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontFamily: "var(--font-family-body)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "var(--font-size-lg)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "var(--color-success)",
                        flexShrink: 0,
                      }}
                    />
                    {f.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            padding: "1.5rem 2.5rem",
            flexShrink: 0,
          }}
        >
          <button
            onClick={onExit}
            style={{
              background: "var(--color-primary)",
              color: "var(--color-primary-contrast)",
              border: "none",
              borderRadius: "999px",
              padding: "0.8rem 2.5rem",
              fontFamily: "var(--font-family-body)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--font-size-base)",
              cursor: "pointer",
            }}
          >
            exit
          </button>
          <button
            onClick={() => selected && onNext()}
            disabled={!selected}
            style={{
              background: selected
                ? "var(--color-primary)"
                : "var(--color-page)",
              color: selected
                ? "var(--color-primary-contrast)"
                : "var(--color-text-disabled)",
              border: `2px solid ${selected ? "var(--color-primary)" : "var(--color-border-soft)"}`,
              borderRadius: "999px",
              padding: "0.8rem 2.5rem",
              fontFamily: "var(--font-family-body)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--font-size-base)",
              cursor: selected ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.2s ease",
            }}
          >
            pose pengu <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
