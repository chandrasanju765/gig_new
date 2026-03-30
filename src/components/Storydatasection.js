import { useEffect, useRef, useState } from "react";
import { clamp, ease } from "./helpers";

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

function InsightCard({ insight, progress, index, total }) {
  const segSize = 1 / total;
  const segStart = index * segSize;
  const segEnd   = segStart + segSize;
  const midStart = segStart + segSize * 0.15;
  const midEnd   = segEnd   - segSize * 0.15;

  const fadeIn  = ease(clamp((progress - segStart) / (segSize * 0.25), 0, 1));
  const fadeOut = ease(clamp((progress - midEnd)   / (segSize * 0.25), 0, 1));

  const opacity   = index === 0 && progress < segSize * 0.1
    ? 1
    : fadeIn * (1 - fadeOut);

  const translateY = (1 - fadeIn) * 30 - fadeOut * 30;

  if (opacity < 0.01) return null;

  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0,
      opacity,
      transform: `translateY(${translateY}px)`,
      willChange: "opacity, transform",
    }}>
      <div style={{
        width: 3, height: "100%",
        background: "#e53e3e",
        position: "absolute", left: -20, top: 0,
        borderRadius: 2,
      }}/>
      <h3 style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: "clamp(16px,1.3vw,20px)",
        fontWeight: 700, color: "white",
        marginBottom: 20, lineHeight: 1.4,
      }}>{insight.title}</h3>
      <p style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: "clamp(14px,1vw,16px)",
        color: "rgba(255,255,255,0.65)",
        lineHeight: 1.8, margin: 0,
      }}>{insight.body}</p>
    </div>
  );
}

export default function StoryDataSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      const total    = el.offsetHeight - window.innerHeight;
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

  const leftT = ease(clamp(progress / 0.12, 0, 1));

  return (
    <div ref={sectionRef} style={{ height: `${100 * (INSIGHTS.length + 1)}vh`, position: "relative" }}>
      <div style={{
        position: "sticky", 
        top: 0, 
        height: "100vh",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 20% 50%, #14080a 0%, #0d0d0d 50%, #080a14 100%)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
      }}>

        {/* Left Panel */}
        <div style={{
          width: isMobile ? "100%" : "42%", 
          flexShrink: 0,
          padding: isMobile ? "10vw 6vw 8vw" : "0 5vw 0 6vw",
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          borderRight: isMobile ? "none" : "1px solid #222",
          borderBottom: isMobile ? "1px solid #222" : "none",
          opacity: leftT,
          transform: `translateY(${(1 - leftT) * 30}px)`,
        }}>
          <h2 className="sm:text-[105px] text-[50px]" style={{
            fontFamily: "'Inter',sans-serif",
            fontWeight: 600, 
            color: "white",
            lineHeight: 1.0, 
            margin: "0 0 36px",
            letterSpacing: "-1px",
            fontSize: isMobile ? "52px" : undefined,
          }}>
            The Story<br className="sm:flex hidden" />Behind<br className="sm:flex hidden"  />the Data
          </h2>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: isMobile ? "15px" : "clamp(14px,1.05vw,17px)",
            color: "rgba(255,255,255,1)",
            lineHeight: 1.75, 
            margin: "0 0 48px",
          }}>
            After analyzing all the numbers, we identified a few observations
            across the segments of truck drivers, delivery partners, and dark
            store employees.
          </p>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {INSIGHTS.map((_, i) => (
              <div key={i} style={{
                width: activeIdx === i ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: activeIdx === i ? "#e53e3e" : "rgba(255,255,255,0.2)",
                transition: "all 0.4s ease",
              }}/>
            ))}
          </div>
        </div>

        {/* Right Panel - Insights */}
        <div style={{
          flex: 1,
          padding: isMobile ? "10vw 6vw" : "0 6vw 0 7vw",
          display: "flex", 
          alignItems: "center",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", 
            left: isMobile ? "6vw" : 0, 
            top: isMobile ? "20%" : "10%", 
            bottom: isMobile ? "20%" : "10%",
            width: 1, 
            background: "rgba(255,255,255,0.08)",
          }}/>

          <div style={{
            position: "relative", 
            width: "100%",
            minHeight: 300,
            paddingLeft: isMobile ? 0 : 24,
          }}>
            {INSIGHTS.map((insight, i) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                progress={progress}
                index={i}
                total={INSIGHTS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}