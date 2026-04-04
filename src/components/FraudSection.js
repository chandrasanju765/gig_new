import { useEffect, useRef, useState } from "react";
import { lerp, clamp, ease } from "./helpers";

export default function FraudSection() {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = clamp(-rect.top / (el.offsetHeight - window.innerHeight), 0, 1);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── PART 1 — Much faster entry: title visible almost immediately ──
  const titleP  = ease(clamp(progress / 0.04, 0, 1));        // was 0.10 → now 0.04
  const chartP  = ease(clamp((progress - 0.02) / 0.06, 0, 1)); // was 0.07/0.14 → now 0.02/0.06
  const footerP = ease(clamp((progress - 0.06) / 0.05, 0, 1)); // was 0.18/0.08 → now 0.06/0.05

  // ── PART 2 — Questions section ──
  const title1P = ease(clamp((progress - 0.20) / 0.06, 0, 1)); // was 0.27/0.08
  const cards1P = ease(clamp((progress - 0.24) / 0.08, 0, 1)); // was 0.32/0.10

  // ── PART 3 — People in focus (faster — no blank screen) ──
  const title2P = ease(clamp((progress - 0.30) / 0.05, 0, 1));
  const cards2P = ease(clamp((progress - 0.33) / 0.06, 0, 1));

  const questions = [
    { img: "/assets/question1.png", text: "Which segments are the most risk-prone?" },
    { img: "/assets/question2.png", text: "Where are the risk hotspots across the country?" },
    { img: "/assets/question3.png", text: "What correlations exist between risk rates and other factors?" },
  ];

  const people = [
    { label: "Truck drivers",      riskRate: "4.75%", meanAge: "30.90", img: "/assets/truck_driver.png" },
    { label: "Dark Store Workers",  riskRate: "2.36%", meanAge: "24.34", img: "/assets/store.png" },
    { label: "Delivery Partners",   riskRate: "3.04%", meanAge: "27.94", img: "/assets/delivery.png" },
  ];

  // ── Shared heading style from Figma specs ──
  const headingStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    color: "white",
    textAlign: "center",
    margin: 0,
    fontSize: isMobile ? "30px" : "120px",
    lineHeight: isMobile ? "40.86px" : "130px",
    letterSpacing: "-0.04em",
  };

  return (
    <div ref={sectionRef} style={{ height: "200vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: isMobile ? "85px 16px 20px" : "85px 64px 36px",
          overflowY: "auto",
        }}
      >
        {/* Ellipse decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: -430,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <img
            src="/assets/Ellipse.png"
            alt=""
            style={{ width: "900px", height: "900px" }}
          />
        </div>

        {/* ══════════════════════════════════════════════════
            PART 1 — Fraud / Chart
        ══════════════════════════════════════════════════ */}

        {/* Main heading */}
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            zIndex: 1,
            opacity: 1,
            transform: 'none',
            textAlign: "center",
            marginBottom: isMobile ? 8 : 12,
          }}
        >
          <h2 style={{ ...headingStyle }}>
            The Fraud Behind
            <br />
            the Workforce
          </h2>
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: "white",
            fontSize: isMobile ? "12px" : "30px",
            fontWeight: 600,
            margin: isMobile ? "0 0 12px" : "0 0 20px",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            zIndex: 1,
            opacity: 1,
            transform: 'none',
            lineHeight: isMobile ? "18px" : "36px",
          }}
        >
          India's gig workforce has grown from
        </p>

        {/* Chart GIF */}
        <div
          style={{
            width: "100%",
            maxWidth: isMobile ? "100%" : 880,
            opacity: chartP,
            transform: `translateY(${lerp(14, 0, chartP)}px)`,
            zIndex: 1,
          }}
        >
          <img
            src="/assets/graph.gif"
            alt="Gig workforce growth chart"
            style={{ width: "100%", display: "block", borderRadius: 4 }}
          />
          <div
            style={{
              textAlign: "center",
              marginTop: 6,
              marginBottom: 4,
              opacity: footerP,
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.38)",
                fontSize: isMobile ? 10 : 13,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Source:{" "}
              <a
                href="https://www.niti.gov.in/sites/default/files/2023-06/Policy_Brief_India%27s_Booming_Gig_and_Platform_Economy_27062022.pdf"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "rgba(255,255,255,0.58)",
                  textDecoration: "underline",
                }}
              >
                Niti Ayog
              </a>
              {" "}and{" "}
              <a
                href="https://www.livemint.com/money/personal-finance/indias-gig-economy-in-2025-growth-formalisation-and-financial-inclusion-explained-11753438649777.html"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "rgba(255,255,255,0.58)",
                  textDecoration: "underline",
                }}
              >
                Mint
              </a>
            </span>
          </div>
        </div>

        {/* Footer line */}
        <p
          style={{
            color: "white",
            fontSize: isMobile ? "13px" : "28px",
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            margin: isMobile ? "8px 0 20px" : "8px 0 40px",
            maxWidth: 700,
            zIndex: 1,
            opacity: footerP,
            lineHeight: "36px",
          }}
        >
          But as the workforce expands, fraud scales alongside it.
        </p>

        {/* ══ DIVIDER 1 ══ */}
        <div
          style={{
            width: "100%",
            maxWidth: 1300,
            height: 1,
            background: "rgba(255,255,255,0.12)",
            marginBottom: isMobile ? 20 : 40,
            opacity: title1P,
            zIndex: 1,
          }}
        />

        {/* ══════════════════════════════════════════════════
            PART 2 — Questions
        ══════════════════════════════════════════════════ */}
        <div style={{ width: "100%", maxWidth: 1300, zIndex: 1 }}>
          <h2
            style={{
              ...headingStyle,
              marginBottom: isMobile ? 20 : 32,
              opacity: title1P,
              transform: `translateY(${lerp(24, 0, title1P)}px)`,
            }}
          >
            This section
            <br />
            answers questions like
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? 12 : 16,
              width: "100%",
              marginBottom: isMobile ? 20 : 40,
            }}
          >
            {questions.map((q, i) => {
              const cp = ease(clamp(cards1P - i * 0.1, 0, 1));
              return (
                <div
                  key={i}
                  style={{
                    backgroundImage: "linear-gradient(#1d1d1d, #212121)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 16,
                    padding: isMobile ? "14px 14px" : "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? 12 : 16,
                    minHeight: isMobile ? 70 : 90,
                    opacity: cp,
                    transform: `translateY(${lerp(20, 0, cp)}px) scale(${lerp(0.97, 1, cp)})`,
                  }}
                >
                  <div
                    style={{
                      width: isMobile ? 48 : 64,
                      height: isMobile ? 48 : 64,
                      flexShrink: 0,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={q.img}
                      alt=""
                      style={{
                        width: isMobile ? 80 : 120,
                        height: isMobile ? 56 : 80,
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      color: "white",
                      fontSize: isMobile ? "13px" : "clamp(13px, 1.05vw, 17px)",
                      fontWeight: 500,
                      margin: 0,
                      lineHeight: 1.5,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {q.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ DIVIDER 2 ══ */}
        <div
          style={{
            width: "100%",
            maxWidth: 1300,
            height: 1,
            background: "rgba(255,255,255,0.08)",
            marginBottom: isMobile ? 20 : 40,
            opacity: title2P,
            zIndex: 1,
          }}
        />

        {/* ══════════════════════════════════════════════════
            PART 3 — People in focus
        ══════════════════════════════════════════════════ */}
        <div style={{ width: "100%", maxWidth: 1100, zIndex: 1 }}>
          <h2
            className="bg-gradient-to-r from-[#cdcdcd] to-white bg-clip-text text-transparent"
            style={{
              ...headingStyle,
              marginBottom: isMobile ? 20 : 32,
              opacity: title2P,
              transform: `translateY(${lerp(18, 0, title2P)}px)`,
            }}
          >
            People in focus
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? 12 : 16,
              width: "100%",
            }}
          >
            {people.map((p, i) => {
              const cp = ease(clamp(cards2P - i * 0.08, 0, 1));
              return (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    padding: isMobile ? "20px 20px 0" : "28px 30px 0",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    minHeight: isMobile ? 240 : 320,
                    opacity: cp,
                    transform: `translateY(${lerp(20, 0, cp)}px)`,
                  }}
                >
                  <div
                    style={{
                      color: "#CE1010",
                      fontSize: isMobile ? "16px" : "20px",
                      fontWeight: 600,
                      marginBottom: isMobile ? 10 : 14,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {p.label}
                  </div>

                  <div
                    style={{
                      color: "white",
                      fontSize: isMobile ? "36px" : "60px",
                      fontWeight: 800,
                      lineHeight: isMobile ? "42px" : "50px",
                      letterSpacing: "0",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {p.riskRate}
                  </div>
                  <div
                    style={{
                      color: "white",
                      fontSize: isMobile ? "14px" : "17px",
                      marginTop: 6,
                      marginBottom: isMobile ? 14 : 20,
                    }}
                  >
                    Risk Rate
                  </div>

                  <div
                    style={{
                      color: "white",
                      fontSize: isMobile ? "14px" : "17px",
                      marginBottom: 8,
                    }}
                  >
                    Mean Age
                  </div>
                  <div
                    style={{
                      color: "white",
                      fontSize: isMobile ? "36px" : "60px",
                      fontWeight: 800,
                      lineHeight: isMobile ? "42px" : "50px",
                      letterSpacing: "0",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {p.meanAge}
                  </div>
                  <div
                    style={{
                      color: "white",
                      fontSize: isMobile ? "14px" : "17px",
                      marginTop: 8,
                      marginBottom: 20,
                    }}
                  >
                    years
                  </div>

                  <img
                    src={p.img}
                    alt={p.label}
                    style={{
                      position: "absolute",
                      bottom: -10,
                      right: -10,
                      width: "38%",
                      maxWidth: 150,
                      objectFit: "contain",
                      objectPosition: "bottom right",
                      transform: "rotate(10deg)",
                      transformOrigin: "bottom right",
                      opacity: 0.88,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}