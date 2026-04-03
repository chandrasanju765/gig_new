import { useEffect, useRef, useState } from "react";
import { lerp, clamp, ease } from "./helpers";
import '../index.css'

const MONTHS = [
  { month: "January",   pct: "2.4%",  highlight: false },
  { month: "February",  pct: "2.81%", highlight: false },
  { month: "March",     pct: "2.94%", highlight: false },
  { month: "April",     pct: "3.17%", highlight: false },
  { month: "May",       pct: "2.81%", highlight: false },
  { month: "June",      pct: "2.75%", highlight: false },
  { month: "July",      pct: "3.2%",  highlight: false },
  { month: "August",    pct: "3.17%", highlight: false },
];

const HighlightMONTHS = [
  { month: "September", pct: "3.36%", highlight: true  },
  { month: "October",   pct: "3.32%", highlight: true  },
  { month: "November",  pct: "3.48%", highlight: true  },
  { month: "December",  pct: "3.4%",  highlight: true  },
];

export default function StatsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const title1P = ease(clamp(progress / 0.15, 0, 1));
  const hotP    = ease(clamp((progress - 0.10) / 0.18, 0, 1));
  const title2P = ease(clamp((progress - 0.28) / 0.15, 0, 1));
  const subP    = ease(clamp((progress - 0.35) / 0.15, 0, 1));

  const renderCard = (m, i, isHighlight) => {
    const cp = ease(clamp((progress - 0.38 - i * 0.022) / 0.18, 0, 1));
    const cardId = isHighlight ? "calender-highlight" : "calender-img";

    return (
      <div
        key={i}
        style={{
          position: "relative",
          opacity: cp,
          transform: `translateY(${lerp(20, 0, cp)}px) scale(${lerp(0.95, 1, cp)})`,
        }}
      >
        <div id={cardId} style={{ display: "block", padding: 0, margin: 0 }} />

        <div
          style={{
            position: "absolute",
            top: "22%",
            bottom: "8%",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? 2 : 8,
            pointerEvents: "none",
          }}
        >
          <div style={{
            color: "white",
            fontSize: isMobile ? "9px" : "clamp(14px, 1vw, 18px)",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: 0.3,
            fontWeight: 800,
          }}>
            {m.month}
          </div>
          <div style={{
            color: "white",
            fontSize: isMobile ? "11px" : "clamp(20px, 2.2vw, 32px)",
            fontWeight: 800,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1,
          }}>
            {m.pct}
          </div>
        </div>
      </div>
    );
  };

  /* ── Mobile hotspot block ── */
  const MobileHotspots = () => (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      gap: 0,
      opacity: hotP,
      transform: `translateY(${lerp(20, 0, hotP)}px)`,
    }}>
      {/* Delivery Partners */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/assets/delivery.png" alt="" style={{ width: 60, height: 60, objectFit: "contain" }} />
          <span style={{ color: "white", fontSize: 18, fontWeight: 600, fontFamily: "'Inter',sans-serif", lineHeight: 1.3 }}>
            Delivery<br />Partners
          </span>
        </div>
        <div style={{ color: "#e53e3e", fontSize: 18, fontWeight: 600, fontFamily: "'Inter',sans-serif", marginTop: 12 }}>Karnataka</div>
        <div style={{ color: "white", fontSize: isMobile ? "30px" : "42px", fontWeight: 700, fontFamily: "'Inter',sans-serif", lineHeight: 1 }}>6.91%</div>
      </div>

      {/* Quick commerce label */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, margin: "24px 0" }}>
        <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "10px solid #CE1010" }} />
        <span style={{ color: "white", fontSize: 17, fontWeight: 700, fontFamily: "'Inter',sans-serif", letterSpacing: 0.3 }}>Quick commerce</span>
        <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "10px solid #CE1010" }} />
      </div>

      {/* Truck Drivers */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/assets/truck_driver.png" alt="" style={{ width: 60, height: 60, objectFit: "contain" }} />
          <span style={{ color: "white", fontSize: 18, fontWeight: 600, fontFamily: "'Inter',sans-serif", lineHeight: 1.3 }}>
            Truck<br />Drivers
          </span>
        </div>
        <div style={{ color: "#e53e3e", fontSize: 18, fontWeight: 600, fontFamily: "'Inter',sans-serif", marginTop: 12 }}>Maharashtra</div>
        <div style={{ color: "white", fontSize: isMobile ? "30px" : "42px", fontWeight: 700, fontFamily: "'Inter',sans-serif", lineHeight: 1 }}>7.24%</div>
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} style={{ height: "520vh", position: "relative" }}>
      <div className="sm:h-[183vh] " style={{
        position: "sticky", top: 0, overflow: "hidden",
        background: "black",
        display: "flex", flexDirection: "column",
        alignItems: "center",
        padding: isMobile ? "48px 16px 36px" : "48px 64px 36px",
      }}>

        {/* Title 1 */}
        <h2 className="sm:text-[105px] text-[30px]" style={{
          fontFamily: "'Inter'",
          fontWeight: 700, color: "white",
          margin: "30px 0 28px", textAlign: "center", lineHeight: 1.08,
          maxWidth: 1500,
          opacity: title1P, transform: `translateY(${lerp(24, 0, title1P)}px)`,
          fontSize: isMobile ? "30px" : "110px",
        }}>
          E-commerce & Quick<br className="sm:flex hidden" />Commerce Risk Hotspots
        </h2>

        {/* Hotspot Row — desktop only */}
        {!isMobile && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", maxWidth: 1100, marginBottom: 44,
            opacity: hotP, transform: `translateY(${lerp(20, 0, hotP)}px)`,
          }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img src="/assets/delivery.png" alt="" style={{ width: 60, height: 60, objectFit: "contain" }} />
                <span style={{ color: "white", fontSize: 18, fontWeight: 600, fontFamily: "'Inter',sans-serif", lineHeight: 1.3 }}>
                  Delivery<br />Partners
                </span>
              </div>
              <div style={{ color: "#e53e3e", fontSize: 18, fontWeight: 600, fontFamily: "'Inter',sans-serif", marginTop: 18 }}>Karnataka</div>
              <div style={{ color: "white", fontSize: "48px", fontWeight: 700, fontFamily: "'Inter',sans-serif", lineHeight: 1 }}>6.91%</div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
              <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "10px solid #CE1010", marginBottom: 6 }} />
              <span style={{ color: "white", fontSize: 17, fontWeight: 700, fontFamily: "'Inter',sans-serif", letterSpacing: 0.3 }}>Quick commerce</span>
              <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "10px solid #CE1010", marginTop: 6 }} />
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img src="/assets/truck_driver.png" alt="" style={{ width: 60, height: 60, objectFit: "contain" }} />
                <span style={{ color: "white", fontSize: 18, fontWeight: 600, fontFamily: "'Inter',sans-serif", lineHeight: 1.3 }}>
                  Truck<br />Drivers
                </span>
              </div>
              <div style={{ color: "#e53e3e", fontSize: 18, fontWeight: 600, fontFamily: "'Inter',sans-serif", marginTop: 18 }}>Maharashtra</div>
              <div style={{ color: "white", fontSize: "48px", fontWeight: 700, fontFamily: "'Inter',sans-serif", lineHeight: 1 }}>7.24%</div>
            </div>
          </div>
        )}

        {/* Hotspot — mobile only */}
        {isMobile && <MobileHotspots />}

        {/* Title 2 */}
        <h2 className="pt-16 sm:text-[105px] text-[30px]" style={{
          fontFamily: "'Inter','Helvetica Neue',sans-serif",
          fontWeight: 700, color: "white",
          margin: "0 0 8px", textAlign: "center", lineHeight: 1.05,
          opacity: title2P, transform: `translateY(${lerp(20, 0, title2P)}px)`,
        }}>
          Seasonal Risk Spikes
        </h2>
        <p style={{
          color: "white", fontSize: isMobile ? 11 : 18,
          margin: "0 0 24px", textAlign: "center",
          fontFamily: "'Inter',sans-serif",
          opacity: subP,
        }}>
          A cyclical view of how risk rates spike and decline throughout the year.
        </p>

        {/* Month Grid — always 4 columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: isMobile ? 6 : 20,
          width: "100%",
          maxWidth: isMobile ? "100%" : 1000,
          padding: isMobile ? "0 4px" : 0,
          boxSizing: "border-box",
        }}>
          {MONTHS.map((m, i) => renderCard(m, i, false))}
          {HighlightMONTHS.map((m, i) => renderCard(m, i, true))}
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: "center", marginTop: 28,
          fontFamily: "'Inter',sans-serif", fontSize: isMobile ? 13 : 18,
          color: "rgba(255,255,255,1)", fontWeight: 600,
          opacity: ease(clamp((progress - 0.75) / 0.15, 0, 1)),
          maxWidth: 700,
          padding: isMobile ? "0 8px" : 0,
        }}>
          Risk rates remain consistent throughout the year for all segments,<br className="sm:flex hidden" />
          <span style={{ color: "#CE1010" }}>except for September to December.</span>
        </p>
      </div>
    </div>
  );
}