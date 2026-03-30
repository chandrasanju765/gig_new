import { useEffect, useRef, useState } from "react";
import { clamp, ease } from "./helpers";
import '../index.css'

export default function TrustSection() {
  const sectionRef = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      setP(Math.max(0, Math.min(1, scrolled / (total * 0.88))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lp = (start, end) => ease(clamp((p - start) / (end - start), 0, 1));

  // Only the ghost annotations animate — scroll windows
  const ghost1 = lp(0.15, 0.40); // left annotation slides in
  const ghost2 = lp(0.45, 0.70); // right annotation slides in

  const serif = "'Playfair Display','Georgia',serif";

  return (
    <div id="dots-png" ref={sectionRef} className="h-[100vh] sm:h-[280vh]"  style={{  position: "relative"}}>
      <div className="h-[72vh] sm:h-[100vh]"  style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        padding: "0 6vw",
      }}>

        {/* ── Static big text — always fully visible ─────────────────── */}
        <div style={{
          position: "relative",
          textAlign: "center",
          zIndex: 1,
          lineHeight: 1.08,
        }}>
          {/* Trust, */}
          <div>
            <span className="sm:text-[110px] text-[50px]" style={{
                    fontFamily: "'Inter',sans-serif",
              fontWeight: 600, color: "#1A3BB0",
              display: "block", lineHeight: 1.0,
            }}>Trust,</span>
          </div>

          {/* however is fragile. — same line */}
          <div style={{
            display: "flex", alignItems: "baseline",
            justifyContent: "center", gap: "0.2em", flexWrap: "wrap",
          }}>
            <span className="sm:text-[105px] text-[50px]" style={{
                    fontFamily: "'Inter',sans-serif",
              fontWeight: 300, color: "#5D5D5D", lineHeight: 1.0,
            }}>however is  </span>
            <span className="sm:text-[105px] text-[50px]"  style={{
                    fontFamily: "'Inter',sans-serif",
              fontWeight: 700, color: "#343434", lineHeight: 1.05,marginLeft:"14px",
            }}>fragile.</span>
          </div>

          {/* One news headline. */}
          <div>
            <span className="sm:text-[105px] text-[50px]" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, color: "#CE1010" }}>One </span>
            <span className="sm:text-[105px] text-[50px]" style={{ fontFamily: "'Inter',sans-serif",  fontWeight: 400, color: "#5d5d5d" }}>news headline.</span>
          </div>

          {/* One breach */}
          <div>
            <span className="sm:text-[105px] text-[50px]" style={{ fontFamily: "'Inter',sans-serif",  fontWeight: 700, color: "#CE1010" }}>One </span>
            <span className="sm:text-[105px] text-[50px]" style={{ fontFamily: "'Inter',sans-serif",  fontWeight: 400, color: "#5d5d5d" }}>breach</span>
          </div>

          {/* One bad experience. */}
          <div>
            <span className="sm:text-[105px] text-[50px]" style={{ fontFamily: "'Inter',sans-serif",  fontWeight: 700, color: "#CE1010" }}>One </span>
            <span className="sm:text-[105px] text-[50px]" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, color: "#5d5d5d"}}>bad experience.</span>
          </div>

          {/* Footer line */}
          <div style={{ marginTop: 28 }}>
            <p style={{ fontSize: "20px", color: "#343434", lineHeight: 1.6, margin: 0 }}>
              is all it takes to undo years of hard-earned customer confidence.
            </p>
          </div>
        </div>

        {/* ── Ghost annotation 1 — slides UP from below as user scrolls ── */}
        <div className="sm:left-[22%] left-[2%]" style={{
          position: "absolute",
          top: "42%",
          zIndex: 10,
          pointerEvents: "none",
          background: "rgba(243,242,242,0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 8,
          padding: "16px 22px",
          width: 390,
          opacity: ghost1,
          // Starts 120px below its final position, scrolls up into place
          transform: `translateY(${(1 - ghost1) * 120}px)`,
          transition: "none",
        }}>
          <p style={{
            fontSize: 14, color: "#343434", lineHeight: 1.7,
            fontFamily: "'Inter',sans-serif", margin: 0,
          }}>
            When speed and scale take priority, due diligence
            slips and blind spots widen. That's exactly what is
            happening in the gig economy today.
          </p>
        </div>

        {/* ── Ghost annotation 2 — slides UP from below, offset timing ─── */}
        <div style={{
          position: "absolute",
          right: "10%", bottom: "19%",
          zIndex: 10,
          pointerEvents: "none",
          background: "rgba(243,242,242,0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 8,
          padding: "16px 22px",
          width: 390,
          opacity: ghost1,
          // Starts 120px below, scrolls up into place
          transform: `translateY(${(1 - ghost1) * 120}px)`,
          transition: "none",
        }}>
          <p style={{
            fontSize: 14, color: "#343434", lineHeight: 1.7,
            fontFamily: "'Inter',sans-serif", margin: 0,
          }}>
            Identity swaps, impersonation, and hidden criminal
            histories do more than disrupt operations. They put
            safety, credibility, and customer trust at risk.
          </p>
        </div>

      </div>
    </div>
  );
}