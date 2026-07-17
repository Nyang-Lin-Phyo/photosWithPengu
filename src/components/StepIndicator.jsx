import { Check } from "lucide-react";
import { WIZARD_STEPS } from "../navigation";

export default function StepIndicator({ currentScreen }) {
  const currentIndex = WIZARD_STEPS.findIndex(
    (step) => step.screen === currentScreen,
  );

  if (currentIndex === -1) return null;

  return (
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
      {WIZARD_STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;

        return (
          <div
            key={step.screen}
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
                  border: `2px solid ${
                    done
                      ? "var(--color-success)"
                      : active
                        ? "var(--color-text)"
                        : "var(--color-text-disabled)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-family-display)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "var(--font-size-lg)",
                  color: done
                    ? "var(--color-primary-contrast)"
                    : active
                      ? "var(--color-text)"
                      : "var(--color-text-disabled)",
                  background: done
                    ? "var(--color-success)"
                    : "var(--color-page)",
                }}
              >
                {done ? (
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
                    done || active
                      ? "var(--color-text)"
                      : "var(--color-text-disabled)",
                  textAlign: "center",
                  lineHeight: "var(--line-height-label)",
                  whiteSpace: "pre-line",
                  fontWeight: active
                    ? "var(--font-weight-bold)"
                    : "var(--font-weight-regular)",
                }}
              >
                {step.label}
              </div>
            </div>
            {i < WIZARD_STEPS.length - 1 && (
              <div
                style={{
                  width: 60,
                  height: 2,
                  background: done
                    ? "var(--color-success)"
                    : "var(--color-border-soft)",
                  marginTop: 15,
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
