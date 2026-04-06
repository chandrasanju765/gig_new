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

  const title1P = 1; // No animation — always fully visible, no delayed entry
  const hotP    = ease(clamp(progress / 0.12, 0, 1));           // starts immediately
  const title2P = ease(clamp((progress - 0.18) / 0.15, 0, 1)); // earlier trigger
  const subP    = ease(clamp((progress - 0.24) / 0.15, 0, 1)); // earlier trigger

  const renderCard = (m, i, isHighlight) => {
    const cp = ease(clamp((progress - 0.28 - i * 0.022) / 0.18, 0, 1));
    const imgSrc = isHighlight ? "/assets/highlight-card.png" : "/assets/calender.png";

    return (
      <div
        key={i}
        style={{
          position: "relative",
          opacity: cp,
          transform: `translateY(${lerp(20, 0, cp)}px) scale(${lerp(0.95, 1, cp)})`,
        }}
      >
        {/* Card background — img fills full width, height scales naturally */}
        <img
          src={imgSrc}
          alt=""
          style={{ width: "100%", display: "block", pointerEvents: "none", aspectRatio: "248/266" }}
        />

        {/* Text overlay — positioned relative to card image */}
        <div
          style={{
            position: "absolute",
            top: "28%",
            bottom: "6%",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "6%",
            pointerEvents: "none",
          }}
        >
          <div style={{
            color: "white",
            fontSize: "clamp(9px, 2.2vw, 30px)",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: 0.3,
            fontWeight: 500,
            textAlign: "center",
          }}>
            {m.month}
          </div>
          <div style={{
            color: "white",
            fontSize: "clamp(12px, 3.2vw, 65px)",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1,
            textAlign: "center",
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
          <span style={{ color: "white", fontSize: 22, fontWeight: 600, fontFamily: "Inter", lineHeight: 1.3 }}>
            Delivery<br />Partners
          </span>
        </div>
        <div style={{ color: "#e53e3e", fontSize: 22, fontWeight: 600, fontFamily: "Inter", marginTop: 12 }}>Karnataka</div>
        {/* Percentage increased */}
        <div style={{ color: "white", fontSize: isMobile ? "48px" : "65px", fontWeight: 700, fontFamily: "Inter", lineHeight: 1 }}>6.91%</div>
      </div>

      {/* Quick commerce label */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, margin: "24px 0" }}>
        <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "10px solid #CE1010" }} />
        <span style={{ color: "white", fontSize: 17, fontWeight: 700, fontFamily: "Inter", letterSpacing: 0.3 }}>Quick commerce</span>
        <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "10px solid #CE1010" }} />
      </div>

      {/* Truck Drivers */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/assets/truck_driver.png" alt="" style={{ width: 60, height: 60, objectFit: "contain" }} />
          <span style={{ color: "white", fontSize: 22, fontWeight: 600, fontFamily: "Inter", lineHeight: 1.3 }}>
            Truck<br />Drivers
          </span>
        </div>
        <div style={{ color: "#e53e3e", fontSize: 22, fontWeight: 600, fontFamily: "Inter", marginTop: 12 }}>Maharashtra</div>
        <div style={{ color: "white", fontSize: isMobile ? "48px" : "65px", fontWeight: 700, fontFamily: "Inter", lineHeight: 1 }}>7.24%</div>
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} style={{ height: "520vh", position: "relative" }}>
      <div className="h-auto sm:h-[210vh]" style={{
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
          opacity: title1P, transform: `none`,
          fontSize: isMobile ? "30px" : "110px",
        }}>
          E-commerce & Quick<br className="sm:flex hidden" />Commerce Risk Hotspots
        </h2>

        {/* Hotspot Row — desktop only */}
        {/* KEY FIX 1: maxWidth increased from 1100 → 1400, and font sizes bumped up */}
        {!isMobile && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", maxWidth: 1400, marginBottom: 44,
            opacity: hotP, transform: `translateY(${lerp(20, 0, hotP)}px)`,
          }}>
            {/* Delivery Partners — left */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <img src="/assets/delivery.png" alt="" style={{ width: 80, height: 80, objectFit: "contain" }} />
                <span style={{ color: "white", fontSize: 24, fontWeight: 600, fontFamily: "Inter", lineHeight: 1.3 }}>
                  Delivery<br />Partners
                </span>
              </div>
              <div style={{ color: "#e53e3e", fontSize: 24, fontWeight: 600, fontFamily: "Inter", marginTop: 18 }}>Karnataka</div>
              {/* KEY FIX 2: percentage font increased from 48px → 65px */}
              <div style={{ color: "white", fontSize: "65px", fontWeight: 700, fontFamily: "Inter", lineHeight: 1 }}>6.91%</div>
            </div>

            {/* Center label */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
              <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "13px solid #CE1010", marginBottom: 8 }} />
              <span style={{ color: "white", fontSize: 20, fontWeight: 700, fontFamily: "Inter", letterSpacing: 0.3 }}>Quick commerce</span>
              <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "13px solid #CE1010", marginTop: 8 }} />
            </div>

            {/* Truck Drivers — right */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <img src="/assets/truck_driver.png" alt="" style={{ width: 80, height: 80, objectFit: "contain" }} />
                <span style={{ color: "white", fontSize: 24, fontWeight: 600, fontFamily: "Inter", lineHeight: 1.3 }}>
                  Truck<br />Drivers
                </span>
              </div>
              <div style={{ color: "#e53e3e", fontSize: 24, fontWeight: 600, fontFamily: "Inter", marginTop: 18 }}>Maharashtra</div>
              {/* KEY FIX 2: percentage font increased from 48px → 65px */}
              <div style={{ color: "white", fontSize: "65px", fontWeight: 700, fontFamily: "Inter", lineHeight: 1 }}>7.24%</div>
            </div>
          </div>
        )}

        {/* Hotspot — mobile only */}
        {isMobile && <MobileHotspots />}

        {/* Title 2 */}
        <h2 className="pt-16 sm:text-[105px] text-[30px]" style={{
          fontFamily: "'Inter','Helvetica Neue',sans-serif",
          fontWeight: 700, color: "white",
          margin: "0 0 8px", textAlign: "center", lineHeight: isMobile ? 1.1 : "115%" ,
          opacity: title2P, transform: `translateY(${lerp(20, 0, title2P)}px)`,
          fontSize: isMobile ? "30px" : "120px",
        }}>
          Seasonal Risk Spikes
        </h2>
        <p style={{
          color: "white", fontSize: isMobile ? 11 : 18,
          margin: "0 0 24px", textAlign: "center",
          fontFamily: "Inter",
          opacity: subP,
          fontSize: isMobile ? "11px" : "30px",
          lineHeight: isMobile ? 1.3 : "150%",
        }}>
          A cyclical view of how risk rates spike and decline throughout the year.
        </p>

        {/* Month Grid — always 4 columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(4px, 1.5vw, 30px)",
          width: "100%",
          maxWidth: "min(100%, 1200px)",
          padding: isMobile ? "0 4px" : 0,
          boxSizing: "border-box",
        }}>
          {MONTHS.map((m, i) => renderCard(m, i, false))}
          {HighlightMONTHS.map((m, i) => renderCard(m, i, true))}
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: "center", marginTop: 28,
          fontFamily: "Inter", 
          color: "rgba(255,255,255,1)", fontWeight: 600,
          opacity: ease(clamp((progress - 0.60) / 0.15, 0, 1)),
          maxWidth: 700,
          padding: isMobile ? "0 8px" : 0,
          marginBottom: isMobile ? 0 : 40,
          fontSize: isMobile ? "13px" : "30px",
          maxWidth: isMobile ? "100%" : 1200,
        }}>
          Risk rates remain consistent throughout the year for all segments,<br className="sm:flex hidden" />
          <span style={{ color: "#CE1010" }}>except for September to December.</span>
        </p>
      </div>
    </div>
  );
}