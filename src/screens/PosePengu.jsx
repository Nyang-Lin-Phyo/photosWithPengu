import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import NavBar from "../components/NavBar";
import StepIndicator from "../components/StepIndicator";
import { SCREENS } from "../navigation";
import p1 from "../assets/pengus/pengu.png";
import p2 from "../assets/pengus/penguBlur.png";
import p3 from "../assets/pengus/penguYozu.png";
import p4 from "../assets/pengus/penguMustache.png";
import p5 from "../assets/pengus/penguSunglasses.png";
import p6 from "../assets/pengus/penguMustacheSunglasses.png";
import f1 from "../assets/frames/framePoro.png";
import f2 from "../assets/frames/frameLeague.png";
import f3 from "../assets/frames/frameClouds.png";
import f4 from "../assets/frames/frameCrown.png";

const PENGUS = [
  { id: "p1", src: p1 },
  { id: "p2", src: p2 },
  { id: "p3", src: p3 },
  { id: "p4", src: p4 },
  { id: "p5", src: p5 },
  { id: "p6", src: p6 },
];

const FRAME_IMGS = { poro: f1, league: f2, cloud: f3, crown: f4 };

const SLOTS = [
  { topPct: 26 / 807, heightPct: (187 - 26) / 807 },
  { topPct: 216 / 807, heightPct: (377 - 216) / 807 },
  { topPct: 404 / 807, heightPct: (563 - 404) / 807 },
];

export default function PosePengu({
  frame,
  onBack,
  onNext,
  onReset,
  penguSlots,
  setPenguSlots,
}) {
  const slots = 3;
  const [slotContents, setSlotContents] = useState(() =>
    Array.from({ length: slots }, (_, i) => {
      const src = penguSlots?.[i];
      if (!src) return null;
      const pengu = PENGUS.find((p) => p.src === src);
      return { penguId: pengu?.id ?? `slot-${i}`, src };
    }),
  );
  const [dragging, setDragging] = useState(null);
  const [hoveringSlot, setHoveringSlot] = useState(null);

  const frameImg = FRAME_IMGS[frame?.id] ?? f1;
  const allFilled = slotContents.every(Boolean);

  const onDragStartPengu = (e, pengu) => {
    setDragging({ penguId: pengu.id, src: pengu.src, fromSlot: null });
    e.dataTransfer.effectAllowed = "copy";
  };

  const onDragStartSlot = (e, slotIndex) => {
    const content = slotContents[slotIndex];
    if (!content) return;
    setDragging({
      penguId: content.penguId,
      src: content.src,
      fromSlot: slotIndex,
    });
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOverSlot = (e, slotIndex) => {
    e.preventDefault();
    setHoveringSlot(slotIndex);
  };

  const onDropSlot = (e, slotIndex) => {
    e.preventDefault();
    if (!dragging) return;
    const updated = [...slotContents];
    if (dragging.fromSlot !== null) updated[dragging.fromSlot] = null;
    updated[slotIndex] = { penguId: dragging.penguId, src: dragging.src };
    setSlotContents(updated);
    setPenguSlots(updated.map((s) => s?.src ?? null));
    setDragging(null);
    setHoveringSlot(null);
  };

  const onDropRightPanel = (e) => {
    e.preventDefault();
    if (!dragging || dragging.fromSlot === null) return;
    const updated = [...slotContents];
    updated[dragging.fromSlot] = null;
    setSlotContents(updated);
    setPenguSlots(updated.map((s) => s?.src ?? null));
    setDragging(null);
    setHoveringSlot(null);
  };

  const onDragEnd = () => {
    setDragging(null);
    setHoveringSlot(null);
  };

  return (
    <>
      <style>{`
        .pengu-card {
          cursor: grab;
          border-radius: 12px;
          overflow: hidden;
          background: var(--color-surface-warm);
          border: 3px solid var(--color-transparent);
          transition: border 0.15s, transform 0.15s, box-shadow 0.15s;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .pengu-card:hover {
          border-color: var(--color-accent-yellow);
          transform: scale(1.05);
          box-shadow: var(--shadow-pengu-card);
        }
        .pengu-card:active { cursor: grabbing; }
        .pp-slot {
          position: absolute;
          left: 9%;
          right: 9%;
          overflow: hidden;
          border-radius: 6px;
          border: 2px dashed var(--color-transparent);
          transition: border 0.15s, background 0.15s;
          box-sizing: border-box;
        }
        .pp-slot.hovering {
          border-color: var(--color-accent-yellow) !important;
          background: var(--color-yellow-hover);
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

        <StepIndicator currentScreen={SCREENS.POSE_PENGU} />

        {/* Heading */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-base)",
            color: "var(--color-text-muted)",
            margin: "1rem 0 0",
          }}
        >
          pick your pengu partner!
        </p>

        {/* Content row */}
        <div
          style={{
            flex: 1,
            display: "flex",
            minHeight: 0,
            padding: "1rem 2rem",
            gap: "2rem",
            alignItems: "center",
            overflowY: "auto",
          }}
        >
          {/* Left: frame */}
          <div
            style={{
              flexShrink: 0,
              position: "relative",
              marginLeft: "100px",
              alignSelf: "center",
              height: "min(80vh, 807px)",
            }}
          >
            <img
              src={frameImg}
              alt="frame"
              style={{
                height: "100%",
                width: "auto",
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
                position: "relative",
                zIndex: 3,
              }}
            />
            {SLOTS.map((slot, i) => (
              <div
                key={i}
                className={`pp-slot${hoveringSlot === i ? " hovering" : ""}`}
                style={{
                  top: `${slot.topPct * 100}%`,
                  height: `${slot.heightPct * 100}%`,
                  zIndex: 1,
                }}
                onDragOver={(e) => onDragOverSlot(e, i)}
                onDrop={(e) => onDropSlot(e, i)}
                onDragLeave={() => setHoveringSlot(null)}
                draggable={!!slotContents[i]}
                onDragStart={(e) => onDragStartSlot(e, i)}
                onDragEnd={onDragEnd}
              >
                {slotContents[i] && (
                  <img
                    src={slotContents[i].src}
                    alt=""
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "70%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "bottom right",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right: pengu picker */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onDragOver={(e) => {
              if (dragging?.fromSlot !== null) e.preventDefault();
            }}
            onDrop={onDropRightPanel}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "0.75rem",
                maxWidth: 700,
              }}
            >
              {PENGUS.map((p, i) => {
                const usedInSlots = slotContents.filter(
                  (s) => s?.penguId === p.id,
                ).length;
                return (
                  <div
                    key={p.id}
                    className="pengu-card"
                    draggable
                    onDragStart={(e) => onDragStartPengu(e, p)}
                    onDragEnd={onDragEnd}
                  >
                    <img
                      src={p.src}
                      alt={`pengu ${i + 1}`}
                      style={{
                        width: "85%",
                        height: "85%",
                        objectFit: "contain",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    />
                    {usedInSlots > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: 6,
                          right: 6,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "var(--color-primary)",
                          color: "var(--color-primary-contrast)",
                          fontSize: "var(--font-size-xs)",
                          fontWeight: "var(--font-weight-bold)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {usedInSlots}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p
              style={{
                marginTop: "1rem",
                fontSize: "var(--font-size-sm)",
                color: "var(--color-text-faint)",
              }}
            >
              drag a pengu into a slot · drag out of the frame to remove
            </p>
          </div>
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
            onClick={onBack}
            style={{
              background: "var(--color-primary)",
              color: "var(--color-primary-contrast)",
              border: "none",
              borderRadius: "999px",
              padding: "0.8rem 2rem",
              fontFamily: "var(--font-family-body)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--font-size-base)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <ChevronLeft size={18} /> frame selection
          </button>
          <button
            onClick={() => allFilled && onNext()}
            disabled={!allFilled}
            style={{
              background: allFilled
                ? "var(--color-primary)"
                : "var(--color-page)",
              color: allFilled
                ? "var(--color-primary-contrast)"
                : "var(--color-text-disabled)",
              border: `2px solid ${allFilled ? "var(--color-primary)" : "var(--color-border-soft)"}`,
              borderRadius: "999px",
              padding: "0.8rem 2rem",
              fontFamily: "var(--font-family-body)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--font-size-base)",
              cursor: allFilled ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.2s ease",
            }}
          >
            add your photos <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
