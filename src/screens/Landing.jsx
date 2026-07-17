import { Camera, Sparkles, ChevronRight } from "lucide-react";
// import pengu from '../assets/penguMustacheSunglasses1.png'
// import penguIcon from '../assets/pengu1.png'
import pengu from "../assets/pengus/penguMustacheSunglasses.png";
import penguIcon from "../assets/pengus/pengu.png";

export default function Landing({ goTo }) {
  return (
    <>
      <style>{`
        @keyframes float1 {
          0%,100% { transform: translate(0px, 0px); }
          25%  { transform: translate(6px, -5px); }
          50%  { transform: translate(0px, -8px); }
          75%  { transform: translate(-6px, -5px); }
        }
        @keyframes float2 {
          0%,100% { transform: translate(0px, 0px); }
          25%  { transform: translate(-5px, 4px); }
          50%  { transform: translate(0px, 7px); }
          75%  { transform: translate(5px, 4px); }
        }
        @keyframes float3 {
          0%,100% { transform: translate(0px, 0px); }
          25%  { transform: translate(4px, 5px); }
          50%  { transform: translate(7px, 0px); }
          75%  { transform: translate(4px, -5px); }
        }
        @keyframes float4 {
          0%,100% { transform: translate(0px, 0px) rotate(0deg); }
          33%  { transform: translate(-8px, 6px) rotate(20deg); }
          66%  { transform: translate(5px, 9px) rotate(-10deg); }
        }
        @keyframes float5 {
          0%,100% { transform: translate(0px, 0px) rotate(0deg); }
          33%  { transform: translate(7px, -6px) rotate(-15deg); }
          66%  { transform: translate(-4px, -9px) rotate(10deg); }
        }
        @keyframes float6 {
          0%,100% { transform: translate(0px, 0px) rotate(0deg); }
          50%  { transform: translate(-6px, 7px) rotate(25deg); }
        }
        @keyframes float7 {
          0%,100% { transform: translate(0px, 0px) rotate(0deg); }
          50%  { transform: translate(8px, -5px) rotate(-20deg); }
        }
        @keyframes vibrate {
          0%,100% { transform: rotate(-1deg) translate(0px, 0px); }
          20%  { transform: rotate(-1deg) translate(1px, 0px); }
          40%  { transform: rotate(-1deg) translate(-1px, 0px); }
          60%  { transform: rotate(-1deg) translate(1px, 0px); }
          80%  { transform: rotate(-1deg) translate(-1px, 0px); }
        }
        @keyframes vibrate-fast {
          0%,100% { transform: rotate(-1deg) translate(0px, 0px); }
          10%  { transform: rotate(-2deg) translate(2px, 1px); }
          20%  { transform: rotate(0deg) translate(-2px, -1px); }
          30%  { transform: rotate(-2deg) translate(2px, 0px); }
          40%  { transform: rotate(0deg) translate(-2px, 1px); }
          50%  { transform: rotate(-2deg) translate(1px, -1px); }
          60%  { transform: rotate(0deg) translate(-1px, 1px); }
          70%  { transform: rotate(-2deg) translate(2px, 0px); }
          80%  { transform: rotate(0deg) translate(-2px, -1px); }
          90%  { transform: rotate(-2deg) translate(1px, 1px); }
        }
        .pengu-word {
          display: inline-block;
          color: #FF9A1F;
          border: 3px solid #FF9A1F;
          border-radius: 6px;
          padding: 0 0.3em;
          font-style: italic;
          line-height: 1.2;
          animation: vibrate 0.4s linear infinite;
          cursor: default;
        }
        .pengu-word:hover {
          animation: vibrate-fast 0.1s linear infinite;
        }
        .dot1 { animation: float1 6s ease-in-out infinite; }
        .dot2 { animation: float2 8s ease-in-out infinite; }
        .dot3 { animation: float3 7s ease-in-out infinite; }
        .icon1 { animation: float4 9s ease-in-out infinite; }
        .icon2 { animation: float5 7s ease-in-out infinite; }
        .icon3 { animation: float6 11s ease-in-out infinite; }
        .icon4 { animation: float7 8s ease-in-out infinite; }
        .icon5 { animation: float4 10s ease-in-out infinite reverse; }
        .icon6 { animation: float5 12s ease-in-out infinite reverse; }
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

        {/* Main */}
        <main
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: "2rem 4rem",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          {/* === SCATTERED ICONS ALL OVER === */}

          {/* Top-left area */}
          <div
            className="icon1"
            style={{ position: "absolute", top: "8%", left: "5%", zIndex: 4 }}
          >
            <Sparkles size={22} fill="#4FC3C3" strokeWidth={0} />
          </div>
          <div
            className="icon2"
            style={{ position: "absolute", top: "20%", left: "20%", zIndex: 4 }}
          >
            <Camera size={38} strokeWidth={1.5} color="#ccc" />
          </div>

          {/* Top-center */}
          <div
            className="icon3"
            style={{ position: "absolute", top: "5%", left: "45%", zIndex: 4 }}
          >
            <Camera size={60} strokeWidth={1.5} color="#bbb" />
          </div>
          <div
            className="icon4"
            style={{ position: "absolute", top: "12%", left: "60%", zIndex: 4 }}
          >
            <Sparkles size={18} fill="#FF9A1F" strokeWidth={0} />
          </div>

          {/* Top-right */}
          <div
            className="icon5"
            style={{ position: "absolute", top: "6%", right: "8%", zIndex: 4 }}
          >
            <Sparkles size={28} fill="#4FC3C3" strokeWidth={0} />
          </div>
          <div
            className="icon6"
            style={{
              position: "absolute",
              top: "25%",
              right: "15%",
              zIndex: 4,
            }}
          >
            <Camera size={44} strokeWidth={1.5} color="#ddd" />
          </div>

          {/* Mid-left */}
          <div
            className="icon2"
            style={{ position: "absolute", top: "50%", left: "8%", zIndex: 4 }}
          >
            <Sparkles size={20} fill="#FFD84D" strokeWidth={0} />
          </div>

          {/* Bottom-left */}
          <div
            className="icon3"
            style={{
              position: "absolute",
              bottom: "18%",
              left: "15%",
              zIndex: 4,
            }}
          >
            <Camera size={32} strokeWidth={1.5} color="#ccc" />
          </div>
          <div
            className="icon1"
            style={{
              position: "absolute",
              bottom: "10%",
              left: "40%",
              zIndex: 4,
            }}
          >
            <Sparkles size={16} fill="#FF9A1F" strokeWidth={0} />
          </div>

          {/* Bottom-center / right */}
          <div
            className="icon4"
            style={{
              position: "absolute",
              bottom: "15%",
              left: "55%",
              zIndex: 4,
            }}
          >
            <Sparkles size={24} fill="#4FC3C3" strokeWidth={0} />
          </div>

          {/* === FLOATING DOTS === */}
          <div
            className="dot1"
            style={{
              position: "absolute",
              top: "18%",
              left: "38%",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#FF9A1F",
              zIndex: 4,
            }}
          />
          <div
            className="dot2"
            style={{
              position: "absolute",
              bottom: "28%",
              left: "28%",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#4FC3C3",
              zIndex: 4,
            }}
          />
          <div
            className="dot3"
            style={{
              position: "absolute",
              top: "60%",
              left: "50%",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FFD84D",
              zIndex: 4,
            }}
          />

          {/* === LEFT TEXT === */}
          <div
            style={{
              position: "relative",
              zIndex: 4,
              maxWidth: 520,
              flexShrink: 0,
            }}
          >
            <h1
              style={{
                fontFamily: "Baloo 2",
                fontWeight: 800,
                fontSize: "clamp(3rem, 5vw, 5rem)",
                lineHeight: 1.05,
                color: "#111",
                marginBottom: "1.5rem",
              }}
            >
              Take photos
              <br />
              with <span className="pengu-word">PENGU</span>
            </h1>

            <button
              onClick={() => goTo("chooseFrame")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "999px",
                padding: "0.85rem 1.8rem",
                fontFamily: "Nunito",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              take your picture! <ChevronRight size={18} />
            </button>
          </div>

          {/* === PENGU RIGHT === */}
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              top: 0,
              zIndex: 2,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              width: "55%",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "5%",
                bottom: "-10%",
                width: "70%",
                paddingBottom: "70%",
                borderRadius: "50%",
                background: "#FFD84D",
                opacity: 0.4,
                zIndex: 0,
              }}
            />
            <img
              src={pengu}
              alt="Pengu"
              style={{
                position: "relative",
                zIndex: 1,
                height: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                objectPosition: "bottom right",
                display: "block",
              }}
            />
          </div>
        </main>

        {/* Footer — absolutely positioned bottom-left so it takes zero layout space */}
        <footer
          style={{
            position: "absolute",
            bottom: "0.75rem",
            left: "2rem",
            fontSize: "0.8rem",
            color: "#aaa",
            lineHeight: 1.8,
            zIndex: 5,
          }}
        >
          <div>designed by isecomfy</div>
          <div>developed by isecomfy & ramseymeow</div>
        </footer>
      </div>
    </>
  );
}
