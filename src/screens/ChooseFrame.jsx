import { ChevronRight } from "lucide-react";
import { useState } from "react";
import penguIcon from "../assets/pengus/pengu.png";
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

export default function ChooseFrame({ goTo, setFrame }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (f) => {
    setSelected(f.id);
    setFrame(f);
  };

  return (
    <>
      <style>{`
        .frame-card {
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), filter 0.3s ease;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
        }
        .frame-card:hover {
          filter: drop-shadow(0 8px 24px rgba(0,0,0,0.25));
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          background: "#fff",
          fontFamily: "Nunito, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Navbar */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "1rem 2rem",
            borderBottom: "1px solid #eee",
            flexShrink: 0,
          }}
        >
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
              fontFamily: "Baloo 2",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#111",
            }}
          >
            pengu photobooth
          </span>
        </nav>

        {/* Step indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "0",
            padding: "1.5rem 2rem 0",
            flexShrink: 0,
          }}
        >
          {[
            { n: 1, label: "frame\nselection" },
            { n: 2, label: "pose\npengu" },
            { n: 3, label: "add your\nphotos" },
            { n: 4, label: "decorate!" },
          ].map((step, i) => (
            <div
              key={step.n}
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `2px solid ${step.n === 1 ? "#111" : "#ccc"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Baloo 2",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: step.n === 1 ? "#111" : "#ccc",
                    background: "#fff",
                  }}
                >
                  {step.n}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: step.n === 1 ? "#111" : "#ccc",
                    textAlign: "center",
                    lineHeight: 1.3,
                    whiteSpace: "pre-line",
                  }}
                >
                  {step.label}
                </div>
              </div>
              {i < 3 && (
                <div
                  style={{
                    width: 60,
                    height: 2,
                    background: "#ddd",
                    marginTop: 15,
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Heading */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "Nunito",
            fontSize: "1rem",
            color: "#333",
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
                      fontFamily: "Nunito",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "#333",
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#4CAF50",
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
            onClick={() => goTo("landing")}
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "0.8rem 2.5rem",
              fontFamily: "Nunito",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            exit
          </button>
          <button
            onClick={() => selected && goTo("posePengu")}
            disabled={!selected}
            style={{
              background: selected ? "#111" : "#fff",
              color: selected ? "#fff" : "#ccc",
              border: `2px solid ${selected ? "#111" : "#ddd"}`,
              borderRadius: "999px",
              padding: "0.8rem 2.5rem",
              fontFamily: "Nunito",
              fontWeight: 700,
              fontSize: "1rem",
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
