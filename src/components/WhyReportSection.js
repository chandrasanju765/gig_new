import { useEffect, useRef, useState } from "react";
import { useInView } from "./helpers";

function CountUp({ target, duration = 1800, trigger }) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const run = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setVal(+(target * e).toFixed(1));
      if (t < 1) raf.current = requestAnimationFrame(run);
      else setVal(target);
    };
    raf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf.current);
  }, [trigger, target, duration]);
  return <>{val}</>;
}

const AIMS = [
  "Understanding the fraud-prone segments of the gig economy workforce",
  "Examining structural blind spots in the current risk assessment processes",
  "Quantifying these blind spots, uncovering fraud patterns, and highlighting where risk is quietly concentrating",
  "Covering real-life fraud stories that IDfy witnessed last year",
];

export default function WhyReportSection() {
  const [ref, visible] = useInView(0.2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      style={{
        background: "#fff",
        padding: isMobile ? "60px 6vw" : "80px 8vw",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Main heading - unchanged */}
      <h2 
        className="sm:text-[60px] text-[40px]"
        style={{
          fontWeight: 700,
          fontFamily: "'Inter',sans-serif",
          color: "#343434",
          textAlign: "center",
          marginBottom: 56,
          letterSpacing: "-0.02em",
        }}
      >
        Why we put this report together
      </h2>

      <div className="flex justify-center">
        <div 
          className="grid max-w-5xl gap-4"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "50px" : "40px",
          }}
        >
          {/* Left: Stat block */}
          <div className="col-span-1">
            <div
              ref={ref}
              style={{
                display: "flex",
                gap: 48,
                alignItems: "flex-start",
                flexWrap: "wrap",
                maxWidth: 1200,
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  flex: "0 0 auto",
                  minWidth: 260,
                  paddingTop: 12,
                }}
              >
                <p
                  style={{
                    fontSize: 18,
                    color: "#4b5563",
                    fontWeight: 500,
                    marginBottom: 8,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                  }}
                >
                  We analyzed over
                </p>

                <div
                  style={{
                    fontSize: "clamp(80px, 12vw, 120px)",
                    fontWeight: 700,
                    color: "#CE1010",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    marginTop: 4,
                    marginBottom: 8,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s 0.05s, transform 0.5s 0.05s",
                  }}
                >
                  <CountUp target={4.9} trigger={visible} duration={1600} />M
                </div>

                <p
                  style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 700,
                    color: "#343434",
                    lineHeight: 1.2,
                    marginTop: 12,
                    marginBottom: 16,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s 0.1s, transform 0.5s 0.1s",
                  }}
                >
                  Background
                  <br />
                  Verifications
                </p>

                <p
                  style={{
                    fontSize: 16,
                    color: "#5a6874",
                    lineHeight: 1.5,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s 0.15s, transform 0.5s 0.15s",
                  }}
                >
                  conducted last year to build
                  <br />
                  this report,
                </p>
              </div>
            </div>
          </div>

          {/* Right: Aims card */}
          <div className="col-span-1">
            <div
              style={{
                flex: 1,
                minWidth: 100,
                background: "#EEEEEE",
                borderRadius: 28,
                padding: isMobile ? "32px 24px" : "36px 40px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03)",
                border: "1px solid #edf2f7",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(24px)",
                transition: "opacity 0.6s 0.2s, transform 0.6s 0.2s",
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: "#343434",
                  fontWeight: 700,
                  marginBottom: 24,
                  letterSpacing: "0.5px",
                }}
              >
                with the aim of
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                }}
              >
                {AIMS.map((aim, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(12px)",
                      transition: `opacity 0.4s ${0.25 + i * 0.08}s, transform 0.4s ${0.25 + i * 0.08}s`,
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#d93025",
                        marginTop: 8,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 16,
                        color: "#2c3e4f",
                        lineHeight: 1.55,
                        fontWeight: 450,
                      }}
                    >
                      {aim}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}