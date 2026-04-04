import { useEffect, useRef, useState } from "react";
import HeroCard, { RX, RY } from "./HeroCard";
import { lerp, clamp, ease } from "./helpers";
import '../index.css';

const CARDS = [
  { id: 1,  label: "Vehicle RC",      angle: 180,   rotate: -14, z: 6 },
  { id: 2,  label: "DL Verification", angle: 147.3, rotate: 9,   z: 7 },
  { id: 3,  label: "KYC Check",       angle: 114.5, rotate: -6,  z: 8 },
  { id: 4,  label: "Aadhaar",         angle: 81.8,  rotate: 5,   z: 9 },
  { id: 5,  label: "Face Match",      angle: 49.1,  rotate: -9,  z: 9 },
  { id: 6,  label: "PAN Card",        angle: 16.4,  rotate: 12,  z: 8 },
  { id: 7,  label: "Fraud Alert",     angle: 343.6, rotate: -5,  z: 7 }, 
  { id: 8,  label: "Bank Verify",     angle: 310.9, rotate: 11,  z: 8 },
  { id: 9,  label: "Credit Score",    angle: 278.2, rotate: -5,  z: 9 },
  { id: 10, label: "Background Chk",  angle: 245.5, rotate: -10, z: 8 },
  { id: 11, label: "Employment",      angle: 212.7, rotate: 9,   z: 7 },
];

export default function HeroSection() {
  const [progress, setProgress] = useState(0);
  const [vw, setVw] = useState(0);
  const sectionRef = useRef(null);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const p = clamp(-el.getBoundingClientRect().top / (el.offsetHeight * 0.62), 0, 1);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track viewport width for responsive logic
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = vw < 600;
  const isTablet = vw >= 600 && vw < 1024;

  // --- Heading scale animation ---
  const headingScale = lerp(0.44, 1, ease(clamp(progress / 0.75, 0, 1)));

  // --- Subtitle fade/slide ---
  const subP = ease(clamp((progress - 0.60) / 0.30, 0, 1));

  return (
    <div ref={sectionRef} style={{ height: "300vh", position: "relative" }}>
      <div
        id="home-banner"
        style={{
          position: "sticky",
          top: 30,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "clamp(32px, 4vw, 48px) clamp(32px, 4vw, 48px)",
          }}
        />

        {/* Cards layer — no wrapper scaling; each HeroCard self-sizes via vw prop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            // overflow hidden prevents any card from causing a scrollbar
            overflow: "hidden",
          }}
        >
          {CARDS.map(c => (
            <HeroCard key={c.id} card={c} progress={progress} vw={vw} />
          ))}
        </div>

        {/* Hero text */}
        <div
          style={{
            position: "relative",
            zIndex: 20,
            textAlign: "center",
            transform: `scale(${headingScale})`,
            willChange: "transform",
            padding: "0 clamp(16px, 5vw, 120px)",
            maxWidth: 1800,
          }}
        >
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(36px, 8.5vw, 148px)",
              fontWeight: 900,
              color: "white",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Deception from <br /> Click to the Doorstep
          </h1>

          <p
            style={{
              fontSize: "60px",
              fontWeight: 700,
              color: "white",
              margin: "24px 0 0 0",
              lineHeight: 1.2,
            }}
          >
            A closer look at the risks in India's gig workforce.
          </p>
        </div>
      </div>
    </div>
  );
}