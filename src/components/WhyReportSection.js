import { useEffect, useRef, useState } from "react";
import { clamp, ease } from "./helpers";
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

const TIMELINE = [
  { year: "1999", desc: "The first online shopping platform gained traction.", title: "Medium", sub: "Courier services", tilt: -2.5 },
  { year: "2015", desc: "A social media platform introduced shoppable tags, where people could directly sell on the platform.", title: "Medium", sub: "Fleet operators", tilt: 1.8 },
  { year: "2017", desc: "E-commerce platforms offered same-day delivery services to compete on speed and reach. Premium members.", title: "Medium", sub: "Fleet operators + delivery drivers", tilt: -1.5 },
  { year: "2019", desc: "Food delivery platforms competed for speed promising delivery in 10–15 minutes from micro-fulfillment centers.", title: "Medium", sub: "Delivery Partners + Dark stores", tilt: 2.2 },
  { year: "2021", desc: "Quick commerce gained popularity for providing sub-15 minute delivery for premium products.", title: "Medium", sub: "Delivery Partners + Dark stores", tilt: -1.8 },
  { year: "2025", desc: "On-demand services (cleaning, cooking, etc) can be booked instantly.", title: "Medium", sub: "For everything instantly", tilt: 1.2 },
];

// Mobile card dimensions
const MOBILE_CARD_W = 240;
const MOBILE_GAP = 24;
const TOTAL_MOBILE_RAIL_W =
  TIMELINE.length * MOBILE_CARD_W + (TIMELINE.length - 1) * MOBILE_GAP; // 1560px

function TimelineCard({ item, entrance, isMobile, index }) {
  const cardWidth = isMobile ? MOBILE_CARD_W : 340;
  const imgHeight = isMobile ? 150 : 220;

  return (
    <div style={{
      opacity: entrance,
      transform: `translateX(${(1 - entrance) * 80}px) rotate(${item.tilt}deg)`,
      transformOrigin: "50% 0%",
      willChange: "transform, opacity",
      flexShrink: 0,
      transition: "opacity 0.35s ease-out, transform 0.45s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
    }}>
      <div style={{
        width: cardWidth,
        background: "#fff",
        borderRadius: 24,
        border: "2px solid #D7D7D7",
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
      }}>
        <div style={{ padding: isMobile ? "16px 16px 10px" : "24px 24px 16px" }}>
          <div style={{
            display: "inline-block", color: "#CE1010",
            fontSize: isMobile ? 20 : 26, fontWeight: 800,
            fontFamily: "'Inter',sans-serif", letterSpacing: -0.5, marginBottom: 8,
          }}>{item.year}</div>
          <p style={{
            fontSize: isMobile ? 13 : 15, color: "#444", lineHeight: 1.65,
            fontFamily: "'Inter',sans-serif", margin: 0,
          }}>{item.desc}</p>
        </div>

        <div style={{ padding: isMobile ? "8px 16px 12px" : "12px 24px 16px" }}>
          <p style={{ fontSize: isMobile ? 15 : 18, fontWeight: 800, color: "#1a1a1a", fontFamily: "'Inter',sans-serif", marginBottom: 4 }}>{item.title}</p>
          <p style={{ fontSize: isMobile ? 11 : 13, color: "#888", fontFamily: "'Inter',sans-serif", lineHeight: 1.5, margin: 0 }}>{item.sub}</p>
        </div>

        <div style={{ margin: isMobile ? "0 12px 12px" : "0 16px 16px", borderRadius: 16, overflow: "hidden", height: imgHeight, background: "#f5f5f5" }}>
          {/* ← only change: img1.png … img6.png via index */}
          <img
            src={`/assets/${index + 15}.png`}
            alt={item.year}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function WhyReportSection() {
  const [ref, visible] = useInView(0.2);
  const [isMobile, setIsMobile] = useState(false);
  const [vw, setVw] = useState(1440);
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setVw(window.innerWidth);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, scrolled / (total * 0.88))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const railShift = ease(clamp((progress - 0.05) / 0.85, 0, 1));
  const cardEntrance = (i) => {
    const start = 0.05 + i * 0.12;
    const end = start + 0.25;
    return ease(clamp((progress - start) / (end - start), 0, 1));
  };

  // Mobile: pixel-based rail so all 6 cards are reachable.
  // Container width = vw minus 4vw padding each side = 0.92 * vw.
  // Start: translateX(containerW)  → first card just off right edge
  // End:   translateX(-(TOTAL_MOBILE_RAIL_W - containerW)) → last card visible
  const mobileContainerW = vw * 0.92;
  const mobileRailTransform = `translateX(${
    mobileContainerW - railShift * (TOTAL_MOBILE_RAIL_W + mobileContainerW - mobileContainerW)
  }px)`;
  // Simplified: start = +containerW, travel = totalRailW, end = containerW - totalRailW
  const mobileTranslateX = mobileContainerW - railShift * TOTAL_MOBILE_RAIL_W;

  // Desktop: original percentage-based formula (unchanged)
  const desktopTranslateX = `calc(100% - ${railShift * 110}% + ${railShift * 20}px)`;

  return (
    <>
      {/* Why Report Section */}
      <section style={{
        background: "#fff",
        padding: isMobile ? "32px 5vw" : "50px 8vw",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        marginBottom: 0,
      }}>
        <h2
          className="sm:text-[60px] text-[32px]"
          style={{
            fontWeight: 700, fontFamily: "'Inter',sans-serif",
            color: "#343434", textAlign: "center",
            marginBottom: isMobile ? 32 : 56,
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
              gap: isMobile ? "32px" : "40px",
              width: "100%",
            }}
          >
            {/* Left: Stat block */}
            <div className="col-span-1">
              <div
                ref={ref}
                style={{
                  display: "flex", gap: 48,
                  alignItems: "flex-start", flexWrap: "wrap",
                  maxWidth: 1200, margin: "0 auto",
                }}
              >
                <div style={{
                  flex: "0 0 auto",
                  minWidth: isMobile ? "100%" : 260,
                  paddingTop: 12,
                  textAlign: isMobile ? "center" : "left",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMobile ? "center" : "flex-start",
                }}>
                  <p style={{
                    fontSize: 18, color: "#4b5563", fontWeight: 500, marginBottom: 8,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                  }}>
                    We analyzed over
                  </p>

                  <div style={{
                    fontSize: isMobile ? "80px" : "clamp(80px, 12vw, 120px)",
                    fontWeight: 700, color: "#CE1010", lineHeight: 1,
                    letterSpacing: "-0.02em", marginTop: 4, marginBottom: 8,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s 0.05s, transform 0.5s 0.05s",
                  }}>
                    <CountUp target={4.9} trigger={visible} duration={1600} />M
                  </div>

                  <p style={{
                    fontSize: isMobile ? "24px" : "clamp(24px, 3vw, 36px)",
                    fontWeight: 700, color: "#343434", lineHeight: 1.2,
                    marginTop: 12, marginBottom: 16,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s 0.1s, transform 0.5s 0.1s",
                  }}>
                    Background<br />Verifications
                  </p>

                  <p style={{
                    fontSize: 16, color: "#5a6874", lineHeight: 1.5,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s 0.15s, transform 0.5s 0.15s",
                  }}>
                    conducted last year to build<br />this report,
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Aims card */}
            <div className="col-span-1">
              <div style={{
                flex: 1, minWidth: 100,
                background: "#EEEEEE", borderRadius: 28,
                padding: isMobile ? "24px 20px" : "36px 40px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03)",
                border: "1px solid #edf2f7",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(24px)",
                transition: "opacity 0.6s 0.2s, transform 0.6s 0.2s",
              }}>
                <p style={{ fontSize: 16, color: "#343434", fontWeight: 700, marginBottom: 24, letterSpacing: "0.5px" }}>
                  with the aim of
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                  {AIMS.map((aim, i) => (
                    <li key={i} style={{
                      display: "flex", gap: 14, alignItems: "flex-start",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(12px)",
                      transition: `opacity 0.4s ${0.25 + i * 0.08}s, transform 0.4s ${0.25 + i * 0.08}s`,
                    }}>
                      <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: "#d93025", marginTop: 8 }} />
                      <span style={{ fontSize: isMobile ? 14 : 16, color: "#2c3e4f", lineHeight: 1.55, fontWeight: 450 }}>
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

      <div style={{ height: "100px", background: "#fff" }} />

      {/* Workforce Section */}
      <div className="rounded-xl" ref={sectionRef} style={{ height: "450vh", position: "relative", marginTop: 0 }}>
        <div style={{
          position: "sticky", top: 0, height: "100vh",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          background: "#fff",
          justifyContent: "center",
          paddingBottom: isMobile ? "40px" : "80px",
        }}>
          <div style={{ padding: "0", textAlign: "center", marginBottom: isMobile ? 28 : 52 }}>
            <h2
              className="sm:text-[105px] text-[38px]"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontWeight: 700, color: "#CE1010",
                lineHeight: 1.05, margin: "0 0 16px",
                padding: isMobile ? "0 12px" : 0,
              }}
            >
              The Workforce<br />Behind Every Order
            </h2>
            <p style={{
              fontSize: isMobile ? "14px" : "16px",
              color: "#343434", lineHeight: 1.75, maxWidth: 780,
              margin: "0 auto 10px",
              padding: isMobile ? "0 16px" : 0,
            }}>
              India's doorstep economy operates at the intersection of logistics,
              technology, and human workforce. But that wasn't the case 15 years ago.
              Let's look at how the gig economy evolved with various business models
              over the last 3 decades.
            </p>
            <p style={{ fontSize: 13, color: "#aaa", fontStyle: "italic", margin: 0 }}>
              Sources:{" "}
              {["Kearney", "Young Urban Project", "Shiproket"].map((s) => (
                <a
                  key={s}
                  href="https://www.youngurbanproject.com/what-is-quick-commerce/"
                  target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "underline", cursor: "pointer", color: "#aaa", marginRight: 6 }}
                  onMouseEnter={(e) => e.target.style.color = "#CE1010"}
                  onMouseLeave={(e) => e.target.style.color = "#aaa"}
                >
                  {s}
                </a>
              ))}
            </p>
          </div>

          <div style={{
            width: "100%",
            overflow: "visible",
            paddingLeft: isMobile ? "4vw" : "6vw",
            paddingRight: isMobile ? "4vw" : "6vw",
          }}>
            <div style={{
              display: "flex",
              gap: isMobile ? MOBILE_GAP : 48,
              // KEY FIX: mobile uses pixel-based translateX so all cards are reachable.
              // Start: +containerW (first card just off right edge)
              // End:   containerW - TOTAL_MOBILE_RAIL_W (last card visible)
              transform: isMobile
                ? `translateX(${mobileTranslateX}px)`
                : `translateX(${desktopTranslateX})`,
              willChange: "transform",
              transition: "transform 0.08s linear",
            }}>
              {TIMELINE.map((item, i) => (
                <TimelineCard
                  key={item.year}
                  item={item}
                  entrance={cardEntrance(i)}
                  isMobile={isMobile}
                  index={i}  
                />
              ))}
            </div>
          </div>

          <div style={{ height: isMobile ? "40px" : "80px" }} />
        </div>
      </div>
    </>
  );
}