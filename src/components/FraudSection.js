import { useEffect, useRef, useState } from "react";
import { lerp, clamp, ease } from "./helpers";

const DATA = [
  2.52, 2.61, 2.75, 2.88, 2.95, 3.10, 3.28, 3.45, 3.62, 3.85,
  4.10, 4.38, 4.70, 5.05, 5.45, 5.90, 6.40, 6.95, 7.55, 8.20,
  8.90, 9.30, 9.62, 9.85, 10.0
];

export default function FraudSection() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = clamp(-rect.top / (el.offsetHeight - window.innerHeight), 0, 1);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const titleP  = ease(clamp(progress / 0.25, 0, 1));
  const chartP  = ease(clamp((progress - 0.15) / 0.40, 0, 1));
  const bottomP = ease(clamp((progress - 0.50) / 0.25, 0, 1));
  const footerP = ease(clamp((progress - 0.70) / 0.20, 0, 1));

  const W = 900, H = 260;
  const pad = { top: 10, right: 10, bottom: 10, left: 10 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const minV = Math.min(...DATA), maxV = Math.max(...DATA);

  const pts = DATA.map((v, i) => ({
    x: pad.left + (i / (DATA.length - 1)) * innerW,
    y: pad.top + (1 - (v - minV) / (maxV - minV)) * innerH,
  }));

  const barBaseY = pad.top + innerH;
  const visibleCount = Math.max(2, Math.round(chartP * DATA.length));
  const visiblePts = pts.slice(0, visibleCount);
  const polyline = visiblePts.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div ref={sectionRef} style={{ height: "280vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 90, height: "100vh", overflow: "hidden",
        background: `
          black
        `,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "60px 64px 36px",
      }}>

        {/* Title */}
        <div style={{
          textAlign: "center", marginBottom: 22,
          opacity: titleP, transform: `translateY(${lerp(30, 0, titleP)}px)`,
        }}>
          <h2 className="sm:text-[105px] text-[50px]" style={{
            fontFamily: "'Inter','Helvetica Neue',sans-serif",
            fontWeight: 700, color: "white", margin: 0, lineHeight: 1.05,
          }}>
            The Fraud Behind <br  className="sm:flex hidden"/>the Workforce
          </h2>
         
        </div>

        {/* Subtitle */}
        <p style={{
          color: "white", fontSize: "clamp(14px,1.1vw,19px)",
          fontWeight: 600, margin: "0 0 28px", textAlign: "center" ,
          opacity: titleP, transform: `translateY(${lerp(20, 0, titleP)}px)`,
        }}>
          India's gig workforce has grown from
        </p>

        {/* Chart */}
        <div style={{
          width: "100%", maxWidth: 980,
          opacity: chartP, transform: `translateY(${lerp(20, 0, chartP)}px)`,
        }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", overflow: "visible" }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Thin vertical white lines from baseline up to each data point */}
            {pts.slice(0, visibleCount).map((p, i) => (
              <line
                key={`bar-${i}`}
                x1={p.x} y1={p.y}
                x2={p.x} y2={barBaseY}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.2"
              />
            ))}

            {/* Dashed baseline */}
            <line
              x1={pad.left} y1={barBaseY}
              x2={pad.left + innerW} y2={barBaseY}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              strokeDasharray="5 4"
            />

            {/* White line chart */}
            {visiblePts.length > 1 && (
              <polyline
                points={polyline}
                fill="none"
                stroke="white"
                strokeWidth="2.8"
                strokeLinejoin="round"
                strokeLinecap="round"
                filter="url(#glow)"
              />
            )}

            {/* Red dot on every visible data point */}
            {visiblePts.map((p, i) => (
              <circle
                key={`dot-${i}`}
                cx={p.x} cy={p.y}
                r={i === visiblePts.length - 1 ? 6 : 4}
                fill="#e53e3e"
              />
            ))}
          </svg>

          {/* Labels row */}
          <div style={{
            display: "flex", alignItems: "flex-start", justifyContent: "space-between",
            marginTop: 8,
            opacity: bottomP, transform: `translateY(${lerp(16, 0, bottomP)}px)`,
          }}>
            <div>
              <div style={{
                color: "#CE1010", fontSize: "22px", fontWeight: 800,
                fontFamily: "'Inter',sans-serif", lineHeight: 1.15,
              }}>25.2 lakh</div>
              <div style={{ color: "white", fontSize: 14, marginTop: 2 }}>workers in 2011</div>
            </div>

            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              flex: 1, margin: "6px 20px 0",
            }}>
              <div style={{ flex: 1, height: 1.5, background: "#e53e3e" }} />
              <span style={{ color: "white", fontSize: 11, fontWeight: 700, letterSpacing: 3 }}>TO</span>
              <div style={{ flex: 1, height: 1.5, background: "#e53e3e", position: "relative" }}>
                <div style={{
                  position: "absolute", right: -7, top: "50%", transform: "translateY(-50%)",
                  width: 0, height: 0,
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  borderLeft: "8px solid #e53e3e",
                }} />
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{
                color: "#CE1010", fontSize: "22px", fontWeight: 800,
                fontFamily: "'Inter',sans-serif", lineHeight: 1.15,
              }}>1 crore</div>
              <div style={{ color: "white", fontSize: 13, marginTop: 2 }}>in 2025</div>
            </div>
          </div>

          {/* Source */}
          <div style={{ textAlign: "center", marginTop: 10, marginBottom:10, opacity: footerP }}>
            <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 13 }}>
              Source:{" "}
              <a
                href="https://www.niti.gov.in/sites/default/files/2023-06/Policy_Brief_India%27s_Booming_Gig_and_Platform_Economy_27062022.pdf"
                target="_blank" rel="noreferrer"
                style={{ color: "rgba(255,255,255,0.58)", textDecoration: "underline", cursor: "pointer" }}
              >Niti Ayog</a>
              {" "}and{" "}
              
               <a href="https://www.livemint.com/money/personal-finance/indias-gig-economy-in-2025-growth-formalisation-and-financial-inclusion-explained-11753438649777.html"
                target="_blank" rel="noreferrer"
                style={{ color: "rgba(255,255,255,0.58)", textDecoration: "underline", cursor: "pointer" }}
              >Mint</a>
            </span>
          </div>
        </div>

        {/* Footer */}
        <p style={{
          color: "white", fontSize: "clamp(15px,1.3vw,21px)",
          textAlign: "center", marginTop: 24, maxWidth: 700,
          opacity: footerP, transform: `translateY(-31px)`,
        }}>
          But as the workforce expands, fraud scales alongside it.
        </p>
      </div>
    </div>
  );
}