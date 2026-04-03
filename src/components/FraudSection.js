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

  return (
    // ── Height reduced: 200vh → 150vh ──
    <div ref={sectionRef} style={{ height: "150vh", position: "relative" }}>
      <div style={{
        position: "sticky",  top: isMobile ? -90 : 90, height: "100vh", overflow: "hidden",
        background: "black",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        // ── Mobile: tighter padding ──
        padding: isMobile ? "32px 20px 24px" : "60px 64px 36px",
      }}>

        {/* Title */}
        <div style={{
          textAlign: "center", marginBottom: isMobile ? 12 : 22,
          opacity: titleP, transform: `translateY(${lerp(30, 0, titleP)}px)`,
        }}>
          <h2
            className="sm:text-[105px] text-[42px]"
            style={{
              fontFamily: "'Inter'",
              fontWeight: 700, color: "white", margin: 0, lineHeight: 1.05, fontSize: isMobile ? "42px" : "120px",
            }}
          >
            The Fraud Behind{" "}
            <br className="sm:flex hidden" />
            the Workforce
          </h2>
        </div>

        {/* Subtitle */}
        <p style={{
          color: "white",
          fontSize: isMobile ? "13px" : "clamp(14px,1.1vw,19px)",
          fontWeight: 600,
          margin: isMobile ? "0 0 14px" : "0 0 28px",
          textAlign: "center",
          fontFamily: "'Inter',sans-serif",
          opacity: titleP, transform: `translateY(${lerp(20, 0, titleP)}px)`,
        }}>
          India's gig workforce has grown from
        </p>

        {/* Chart GIF */}
        <div style={{
          width: "100%", maxWidth: isMobile ? "100%" : 980,
          opacity: chartP, transform: `translateY(${lerp(20, 0, chartP)}px)`,
        }}>
          <img
            src="/assets/graph.gif"
            alt="Gig workforce growth chart"
            style={{ width: "100%", display: "block", borderRadius: 4 }}
          />

          {/* Source */}
          <div style={{ textAlign: "center", marginTop: isMobile ? 6 : 10, marginBottom: isMobile ? 6 : 10, opacity: footerP }}>
            <span style={{ color: "rgba(255,255,255,0.38)", fontSize: isMobile ? 11 : 13, fontFamily: "'Inter',sans-serif" }}>
              Source:{" "}
              <a
                href="https://www.niti.gov.in/sites/default/files/2023-06/Policy_Brief_India%27s_Booming_Gig_and_Platform_Economy_27062022.pdf"
                target="_blank" rel="noreferrer"
                style={{ color: "rgba(255,255,255,0.58)", textDecoration: "underline", cursor: "pointer" }}
              >Niti Ayog</a>
              {" "}and{" "}
              <a
                href="https://www.livemint.com/money/personal-finance/indias-gig-economy-in-2025-growth-formalisation-and-financial-inclusion-explained-11753438649777.html"
                target="_blank" rel="noreferrer"
                style={{ color: "rgba(255,255,255,0.58)", textDecoration: "underline", cursor: "pointer" }}
              >Mint</a>
            </span>
          </div>
        </div>

        {/* Footer */}
        <p style={{
          color: "white",
          fontSize: isMobile ? "14px" : "clamp(15px,1.3vw,21px)",
          fontFamily: "'Inter',sans-serif",
          textAlign: "center",
          marginTop: isMobile ? 10 : 24,
          maxWidth: 700,
          opacity: footerP,
          transform: `translateY(-31px)`,
        }}>
          But as the workforce expands, fraud scales alongside it.
        </p>
      </div>
    </div>
  );
}