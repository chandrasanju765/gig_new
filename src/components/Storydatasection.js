import { useEffect, useRef, useState } from "react";
import { clamp } from "./helpers";

const INSIGHTS = [
  {
    id: 1,
    title: "The Middle-mile has the highest risk concentration of any segment",
    body: "Truck drivers operate across multiple states, making criminal and accident records harder to track. Local police checks often miss interstate cases. Add direct access to high-value goods, and the middle-mile becomes one of the most risk-prone segments of the gig economy.",
  },
  {
    id: 2,
    title: "Higher age corresponds to higher risk",
    body: "Despite being older on average, truck drivers exhibit the highest risk rates, indicating that risk correlates more with operational factors mentioned above than age alone.",
  },
  {
    id: 3,
    title: "External hiring agencies often take verification shortcuts",
    body: "Many drivers are hired through contractors or informal hubs with minimal documentation. Identity and license checks are sometimes limited to verbal assurances rather than robust background screening. This increases the chances of red flags emerging later.",
  },
  {
    id: 4,
    title: "High-risk delivery partners compromise customer safety",
    body: "Delivery partners interact with customers daily. In regions like Maharashtra, where risk rates cross 7%, the probability of fraud, theft, or misconduct rises. Every instance can directly affect customer trust.",
  },
  {
    id: 5,
    title: "Shorter onboarding cycles often result in weaker verification systems",
    body: "During peak seasons, thousands of delivery partners are onboarded rapidly. The focus is often shifted to speed over safety. As a result, companies skip deeper verification.",
  },
  {
    id: 6,
    title: "The nature of dark stores may contribute to lower risk",
    body: "Dark store employees operate in supervised locations with no direct customer interaction. Their relatively younger age also reduces the likelihood of criminal involvement. Many companies also conduct mandatory PCC verifications for these employees.",
  },
];

export default function StoryDataSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      setProgress(clamp(scrolled / (total * 0.95), 0, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIdx = Math.min(
    Math.floor(progress * INSIGHTS.length),
    INSIGHTS.length - 1
  );
  const nextIdx = (activeIdx + 1) % INSIGHTS.length;

  return (
    /* Original height formula — no extra multiplier */
    <div ref={sectionRef} style={{ height: `${100 * (INSIGHTS.length + 1)}vh`, position: "relative" }}>

      {/* Sticky viewport */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at 20% 50%, #14080a 0%, #0d0d0d 50%, #080a14 100%)",
        overflow: "hidden",
      }}>

        {/* ── Main content row ── */}
        <div style={{
          width: "100%",
          maxWidth: 1200,
          padding: "0 6vw",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: 0,
        }}>

          {/* Left Panel */}
          <div style={{
            width: "38%",
            flexShrink: 0,
            paddingRight: "5vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 8,
            paddingBottom: 8,
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                color: "white",
                fontSize: "clamp(36px, 4vw, 64px)",
                lineHeight: 1.05,
                margin: "0 0 24px",
                letterSpacing: "-1.5px",
              }}>
                The Story<br />Behind<br />the Data
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 1vw, 15px)",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.75,
                margin: "0 0 32px",
              }}>
                After analyzing all the numbers, we identified a few observations
                across the segments of truck drivers, delivery partners, and dark
                store employees.
              </p>
            </div>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {INSIGHTS.map((_, i) => (
                <div key={i} style={{
                  width: activeIdx === i ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: activeIdx === i ? "#e53e3e" : "rgba(255,255,255,0.2)",
                  transition: "all 0.4s ease",
                }} />
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div style={{
            flex: 1,
            paddingLeft: "4vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
            minHeight: 260,
          }}>
            <div key={activeIdx} style={{ animation: "fadeSlideIn 0.45s ease forwards" }}>

              {/* Active insight */}
              <div style={{
                borderLeft: "3px solid #e53e3e",
                paddingLeft: 20,
                marginBottom: 28,
              }}>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(14px, 1.15vw, 17px)",
                  fontWeight: 700,
                  color: "white",
                  margin: "0 0 12px",
                  lineHeight: 1.4,
                }}>
                  {INSIGHTS[activeIdx].title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(13px, 0.95vw, 15px)",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.75,
                  margin: 0,
                }}>
                  {INSIGHTS[activeIdx].body}
                </p>
              </div>

              {/* Next insight preview */}
              <div style={{ paddingLeft: 23 }}>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(13px, 1vw, 16px)",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.28)",
                  margin: 0,
                  lineHeight: 1.4,
                }}>
                  {INSIGHTS[nextIdx].title}
                </h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}