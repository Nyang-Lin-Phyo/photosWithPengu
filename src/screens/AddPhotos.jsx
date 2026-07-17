import { useState, useRef } from "react";
import { ChevronRight, ChevronLeft, Check, Plus, Upload } from "lucide-react";
import NavBar from "../components/NavBar";
import f1 from "../assets/frames/framePoro.png";
import f2 from "../assets/frames/frameLeague.png";
import f3 from "../assets/frames/frameClouds.png";
import f4 from "../assets/frames/frameCrown.png";

const FRAME_IMGS = { poro: f1, league: f2, cloud: f3, crown: f4 };

const SLOTS = [
  { topPct: 26 / 807, heightPct: (187 - 26) / 807 },
  { topPct: 216 / 807, heightPct: (377 - 216) / 807 },
  { topPct: 404 / 807, heightPct: (563 - 404) / 807 },
];

const steps = [
  { n: 1, label: "frame\nselection", done: true },
  { n: 2, label: "pose\npengu", done: true },
  { n: 3, label: "add your\nphotos", active: true },
  { n: 4, label: "decorate!" },
];

export default function AddPhotos({
  goTo,
  frame,
  photos,
  setPhotos,
  penguSlots,
}) {
  const slots = 3;
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [slotPhotos, setSlotPhotos] = useState(Array(slots).fill(null));
  const [activeSlot, setActiveSlot] = useState(0);
  const [draggingOver, setDraggingOver] = useState(false);
  const fileInputRef = useRef();

  const frameImg = FRAME_IMGS[frame?.id] ?? f1;
  const allFilled = slotPhotos.every(Boolean);

  const handleFiles = (files) => {
    const newPhotos = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      newPhotos.push(url);
    });
    setUploadedPhotos((prev) => [...prev, ...newPhotos]);
  };

  const onFileChange = (e) => handleFiles(e.target.files);

  const onDrop = (e) => {
    e.preventDefault();
    setDraggingOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const assignPhoto = (photoUrl) => {
    const updated = [...slotPhotos];
    updated[activeSlot] = photoUrl;
    setSlotPhotos(updated);
    setPhotos(updated);
    const nextEmpty = updated.findIndex((s, i) => i > activeSlot && !s);
    if (nextEmpty !== -1) setActiveSlot(nextEmpty);
  };

  return (
    <>
      <style>{`
        .upload-zone {
          border: 2px dashed var(--color-border-disabled);
          border-radius: 16px;
          transition: border-color 0.2s, background 0.2s;
          cursor: pointer;
        }
        .upload-zone:hover, .upload-zone.drag-over {
          border-color: var(--color-accent-yellow);
          background: var(--color-yellow-wash);
        }
        .thumb {
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid var(--color-transparent);
          transition: border 0.15s, transform 0.15s;
          aspect-ratio: 1;
          flex-shrink: 0;
        }
        .thumb:hover { border-color: var(--color-accent-yellow); transform: scale(1.04); }
        .ap-slot {
          position: absolute;
          left: 9%;
          right: 9%;
          overflow: hidden;
          border-radius: 6px;
          cursor: pointer;
          border: 3px solid var(--color-transparent);
          transition: border 0.15s;
          box-sizing: border-box;
        }
        .ap-slot.active { border-color: var(--color-accent-yellow); }
        .ap-slot.filled { border-color: var(--color-success); }
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
        <NavBar />

        {/* Step indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "1.5rem 2rem 0",
            flexShrink: 0,
          }}
        >
          {steps.map((step, i) => (
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
                    border: `2px solid ${step.done ? "var(--color-success)" : step.active ? "var(--color-text)" : "var(--color-text-disabled)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-family-display)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "var(--font-size-lg)",
                    color: step.done
                      ? "var(--color-primary-contrast)"
                      : step.active
                        ? "var(--color-text)"
                        : "var(--color-text-disabled)",
                    background: step.done
                      ? "var(--color-success)"
                      : "var(--color-page)",
                  }}
                >
                  {step.done ? (
                    <Check
                      size={16}
                      strokeWidth={3}
                      color="var(--color-primary-contrast)"
                    />
                  ) : (
                    step.n
                  )}
                </div>
                <div
                  style={{
                    fontSize: "var(--font-size-xs)",
                    color:
                      step.done || step.active
                        ? "var(--color-text)"
                        : "var(--color-text-disabled)",
                    textAlign: "center",
                    lineHeight: "var(--line-height-label)",
                    whiteSpace: "pre-line",
                    fontWeight: step.active
                      ? "var(--font-weight-bold)"
                      : "var(--font-weight-regular)",
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
                    background: step.done
                      ? "var(--color-success)"
                      : "var(--color-border-soft)",
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
            fontFamily: "var(--font-family-body)",
            fontSize: "var(--font-size-base)",
            color: "var(--color-text-muted)",
            margin: "1rem 0 0",
          }}
        >
          your turn to pose!
          {uploadedPhotos.length > 0 && " select your photos."}
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

            {/* Slots: photo bottom (z1), pengu middle (z2), frame top (z3) */}
            {SLOTS.map((slot, i) => (
              <div
                key={i}
                className={`ap-slot${activeSlot === i ? " active" : ""}${slotPhotos[i] ? " filled" : ""}`}
                style={{
                  top: `${slot.topPct * 100}%`,
                  height: `${slot.heightPct * 100}%`,
                  zIndex: 0,
                }}
                onClick={() => setActiveSlot(i)}
              >
                {/* Photo — bottom layer */}
                {slotPhotos[i] && (
                  <img
                    src={slotPhotos[i]}
                    alt=""
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 1,
                    }}
                  />
                )}
                {/* Pengu — middle layer */}
                {penguSlots?.[i] && (
                  <img
                    src={penguSlots[i]}
                    alt=""
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "70%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "bottom right",
                      zIndex: 2,
                      pointerEvents: "none",
                    }}
                  />
                )}
                {/* Empty state */}
                {!slotPhotos[i] && !penguSlots?.[i] && (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-light-overlay)",
                      fontSize: "var(--font-size-sm)",
                    }}
                  >
                    {i + 1}
                  </div>
                )}
                {/* Active indicator */}
                {activeSlot === i && (
                  <div
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      background: "var(--color-accent-yellow)",
                      borderRadius: "50%",
                      width: 16,
                      height: 16,
                      fontSize: "var(--font-size-2xs)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--color-text)",
                      zIndex: 4,
                    }}
                  >
                    ✎
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: upload or photo picker */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
              maxWidth: 680,
            }}
          >
            {uploadedPhotos.length === 0 ? (
              <div
                className={`upload-zone${draggingOver ? " drag-over" : ""}`}
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDraggingOver(true);
                }}
                onDragLeave={() => setDraggingOver(false)}
                onDrop={onDrop}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  padding: "4rem 2rem",
                  background: "var(--color-surface-light)",
                }}
              >
                <Upload size={40} color="var(--color-text-faint)" />
                <p
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-soft)",
                    margin: 0,
                  }}
                >
                  click to add or drag and drop your photos here
                </p>
                <p
                  style={{
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-text-faint)",
                    margin: 0,
                  }}
                >
                  JPEG and PNG formats, up to 50MB
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }}
                  style={{
                    background: "var(--color-primary)",
                    color: "var(--color-primary-contrast)",
                    border: "none",
                    borderRadius: "999px",
                    padding: "0.6rem 1.8rem",
                    fontFamily: "var(--font-family-body)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "var(--font-size-base)",
                    cursor: "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  browse
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  height: "500px",
                  alignItems: "stretch",
                }}
              >
                {/* Thumbnail column */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    width: 90,
                    overflowY: "auto",
                    flexShrink: 0,
                  }}
                >
                  <div
                    onClick={() => fileInputRef.current.click()}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      border: "2px dashed var(--color-border-disabled)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                      background: "var(--color-surface-light)",
                    }}
                  >
                    <Plus size={20} color="var(--color-text-faint)" />
                  </div>
                  {uploadedPhotos.map((url, i) => (
                    <div
                      key={i}
                      className="thumb"
                      onClick={() => assignPhoto(url)}
                      style={{ width: 80, height: 80 }}
                    >
                      <img
                        src={url}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Large preview */}
                <div
                  style={{
                    flex: 1,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "var(--color-surface-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {slotPhotos[activeSlot] ? (
                    <img
                      src={slotPhotos[activeSlot]}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "var(--color-text-soft-disabled)",
                      }}
                    >
                      <Upload size={32} />
                      <span style={{ fontSize: "var(--font-size-md)" }}>
                        click a photo to assign to slot {activeSlot + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Slot pagination */}
            {uploadedPhotos.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={() => setActiveSlot((s) => Math.max(0, s - 1))}
                  disabled={activeSlot === 0}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: activeSlot === 0 ? "not-allowed" : "pointer",
                    color:
                      activeSlot === 0
                        ? "var(--color-text-disabled)"
                        : "var(--color-text)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontFamily: "var(--font-family-body)",
                    fontWeight: "var(--font-weight-semibold)",
                    fontSize: "var(--font-size-md)",
                  }}
                >
                  <ChevronLeft size={16} /> previous frame
                </button>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {Array.from({ length: slots }).map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveSlot(i)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background:
                          activeSlot === i
                            ? "var(--color-primary)"
                            : slotPhotos[i]
                              ? "var(--color-success)"
                              : "var(--color-surface-subtle)",
                        color:
                          activeSlot === i || slotPhotos[i]
                            ? "var(--color-primary-contrast)"
                            : "var(--color-text-faint)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-family-display)",
                        fontWeight: "var(--font-weight-bold)",
                        fontSize: "var(--font-size-md)",
                        cursor: "pointer",
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setActiveSlot((s) => Math.min(slots - 1, s + 1))
                  }
                  disabled={activeSlot === slots - 1}
                  style={{
                    background: "none",
                    border: "none",
                    cursor:
                      activeSlot === slots - 1 ? "not-allowed" : "pointer",
                    color:
                      activeSlot === slots - 1
                        ? "var(--color-text-disabled)"
                        : "var(--color-text)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontFamily: "var(--font-family-body)",
                    fontWeight: "var(--font-weight-semibold)",
                    fontSize: "var(--font-size-md)",
                  }}
                >
                  next frame <ChevronRight size={16} />
                </button>
              </div>
            )}
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
            onClick={() => goTo("posePengu")}
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
            <ChevronLeft size={18} /> pose pengu
          </button>
          <button
            onClick={() => allFilled && goTo("decorate")}
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
            decorate <ChevronRight size={18} />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onFileChange}
          style={{ display: "none" }}
        />
      </div>
    </>
  );
}
