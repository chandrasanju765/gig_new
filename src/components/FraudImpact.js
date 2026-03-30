import { useInView } from "./helpers";
import { useState,useEffect } from "react";

const CARDS = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="8" width="20" height="16" rx="2" stroke="white" strokeWidth="2"/>
        <path d="M8 12h8M8 16h5" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="26" cy="22" r="6" fill="#1a1a2e" stroke="#e53e3e" strokeWidth="2"/>
        <path d="M23 22l2 2 4-4" stroke="#e53e3e" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Inventory leakage in\nthe middle mile",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="14" r="6" stroke="white" strokeWidth="2"/>
        <path d="M6 30c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="28" cy="10" r="5" fill="#1a1a2e" stroke="#e53e3e" strokeWidth="2"/>
        <path d="M26 10h4M28 8v4" stroke="#e53e3e" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Customer safety incidents\nin the last mile",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="6" width="28" height="22" rx="2" stroke="white" strokeWidth="2"/>
        <path d="M9 14h18M9 19h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <circle cx="27" cy="25" r="6" fill="#1a1a2e" stroke="#e53e3e" strokeWidth="2"/>
        <path d="M27 22v4M25 26h4" stroke="#e53e3e" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Regulatory exposure\nin high-risk states",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" stroke="white" strokeWidth="1.5" fill="none"/>
        <circle cx="27" cy="26" r="7" fill="#1a1a2e" stroke="#e53e3e" strokeWidth="2"/>
        <path d="M24 26h6M27 23v6" stroke="#e53e3e" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 28c2-4 5-6 8-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
      </svg>
    ),
    title: "Brand damage amplified\nby digital virality",
  },
];

export default function FraudImpact() {
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 1024);
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  const [ref, visible] = useInView(0.2);
  const [headRef, headVisible] = useInView(0.3);

  return (
    <section style={{
      padding: "100px 6vw 120px",
      display: "flex", flexDirection: "column", alignItems: "center",justifyContent:"center",
      textAlign: "center",
    }}>

      {/* Heading */}
      <div ref={headRef} style={{
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s, transform 0.7s",
        marginBottom: 64,
      }}>
         <div
            style={{
              position: "absolute",
              top: 0,
              right: 50,
              zIndex: 0,
            }}
          >
            <img
              src="/assets/Ellipse.png"
              alt="ellipse"
              style={{
                width: "800px",
                height: "800px", // adjust size
                opacity: 1, // optional
              }}
            />
          </div>
        <h2 className="sm:text-[105px] text-[50px]" style={{
                fontFamily: "'Inter','Helvetica Neue',sans-serif",
          fontWeight: 700, color: "white",
          lineHeight: 1.05, margin: "0 0 4px",
        }}>
          Every fraudulent
        </h2>
        <h2 className="sm:text-[43px] text-[20px]"  style={{
                fontFamily: "'Inter','Helvetica Neue',sans-serif",
          fontWeight: 400, color: "rgba(255,255,255,1)",
          lineHeight: 1.1, margin: 0,
        }}>
          employee we caught helped avoid
        </h2>
      </div>

      {/* 2×2 grid */}
      <div ref={ref} style={{
    display: "grid",
    gridTemplateColumns: isMobile 
      ? "1fr" 
      : "repeat(2, minmax(280px, 480px))",
    gap: isMobile ? 24 : 16,
    width: "100%", 
    maxWidth: 1000,
    marginBottom: isMobile ? 50 : 72,
}}>
        {CARDS.map((card, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 14,
            padding: "14px 20px",
            display: "flex", alignItems: "center", gap: 24,
            textAlign: "left",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.6s ${i * 0.12}s, transform 0.6s ${i * 0.12}s`,
          }}>
            {/* Icon box */}
            <div style={{
              width: 70, height: 60, flexShrink: 0,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {card.icon}
            </div>
            <p style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "18px",
              color: "rgba(255,255,255,1)",
              lineHeight: 1.45, margin: 0,
              fontWeight: 400,
              whiteSpace: "pre-line",
            }}>{card.title}</p>
          </div>
        ))}
      </div>

      {/* Footer text */}
      <div style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.7s 0.55s",
      }}>
        <p style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: "20px",
          color: "white", fontWeight: 500,
          marginBottom: 12,
          position:'relative',
          zIndex:999,
        }}>
          Let's look at two real cases we uncovered.
        </p>
        <p style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: "clamp(14px,1.1vw,17px)",
          color: "rgba(255,255,255,0.60)",
          lineHeight: 1.65, margin: 0,
            position:'relative',
          zIndex:999, 
        }}>
          In both instances, fraudsters tried to game the system.<br />
          Here's how their seemingly sophisticated tactics quickly unraveled.
        </p>
      </div>
    </section>
  );
}