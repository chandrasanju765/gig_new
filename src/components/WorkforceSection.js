import { useEffect, useRef, useState } from "react";
import { clamp, ease } from "./helpers";

const TIMELINE = [
  {
    year: "1999",
    desc: "The first online shopping platform gained traction.",
    title: "Medium",
    sub: "Courier services",
    tilt: -2.5,
  },
  {
    year: "2015",
    desc: "A social media platform introduced shoppable tags, where people could directly sell on the platform.",
    title: "Medium",
    sub: "Fleet operators",
    tilt: 1.8,
  },
  {
    year: "2017",
    desc: "E-commerce platforms offered same-day delivery services to compete on speed and reach. Premium members.",
    title: "Medium",
    sub: "Fleet operators + delivery drivers",
    tilt: -1.5,
  },
  {
    year: "2019",
    desc: "Food delivery platforms competed for speed promising delivery in 10–15 minutes from micro-fulfillment centers.",
    title: "Medium",
    sub: "Delivery Partners + Dark stores",
    tilt: 2.2,
  },
  {
    year: "2021",
    desc: "Quick commerce gained popularity for providing sub-15 minute delivery for premium products.",
    title: "Medium",
    sub: "Delivery Partners + Dark stores",
    tilt: -1.8,
  },
  {
    year: "2025",
    desc: "On-demand services (cleaning, cooking, etc) can be booked instantly.",
    title: "Medium",
    sub: "For everything instantly",
    tilt: 1.2,
  },
];

function TimelineCard({ item, entrance }) {
  return (
    <div style={{
      opacity: entrance,
      transform: `translateX(${(1 - entrance) * 80}px) rotate(${item.tilt}deg)`,
      transformOrigin: "50% 0%",
      willChange: "transform, opacity",
      flexShrink: 0,
    }}>
      <div style={{
        width: 280,
        background: "#fff",
        borderRadius: 20,
        border: "2px solid #D7D7D7",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
      }}>
        {/* Year + desc */}
        <div style={{ padding: "20px 20px 12px" }}>
          <div style={{
            display: "inline-block",
            color: "#CE1010",
            fontSize: 22, fontWeight: 800,
            fontFamily: "'Inter',sans-serif",
            letterSpacing: -0.5,
            marginBottom: 10,
          }}>{item.year}</div>
          <p style={{
            fontSize: 13, color: "#444", lineHeight: 1.65,
            fontFamily: "'Inter',sans-serif", margin: 0,
          }}>{item.desc}</p>
        </div>

        {/* Medium + sub */}
        <div style={{ padding: "10px 20px 14px" }}>
          <p style={{
            fontSize: 16, fontWeight: 800, color: "#1a1a1a",
            fontFamily: "'Inter',sans-serif",
            marginBottom: 2, letterSpacing: 0.1,
          }}>{item.title}</p>
          <p style={{
            fontSize: 12, color: "#888",
            fontFamily: "'Inter',sans-serif", lineHeight: 1.5, margin: 0,
          }}>{item.sub}</p>
        </div>

        {/* Image — tall, fills card bottom */}
        <div style={{
          margin: "0 12px 12px",
          borderRadius: 12,
          overflow: "hidden",
          height: 200,
          background: "#f5f5f5",
        }}>
          <img
            src="/assets/workforce.png"
            alt="workforce"
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function WorkforceSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, scrolled / (total * 0.95))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerT = ease(clamp(progress / 0.10, 0, 1));

  // Rail: whole strip slides left slowly from right as user scrolls
  const railShift = ease(clamp((progress - 0.08) / 0.80, 0, 1));

  // Each card enters one-by-one with a long stagger window (slow, smooth)
  const cardEntrance = (i) => {
    const start = 0.08 + i * 0.10;   // each card starts 10% of scroll apart
    const end = start + 0.20;         // takes 20% of scroll to fully appear
    return ease(clamp((progress - start) / (end - start), 0, 1));
  };

  return (
    <div className="rounded-xl" ref={sectionRef} style={{ height: "500vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "135vh",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        background: "#fff",
        justifyContent: "center",
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: "0 ",
          textAlign: "center",
          opacity: headerT,
          transform: `translateY(${(1 - headerT) * 30}px)`,
          marginBottom: 52,
        }}>
          <h2  className="sm:text-[105px] text-[50px]" style={{
fontFamily: "'Inter',sans-serif",           
            fontWeight: 700, color: "#CE1010",
            lineHeight: 1.05, margin: "0 0 20px",
          }}>
            The Workforce<br />Behind Every Order
          </h2>
          <p style={{
            fontSize: "16px", color: "#343434",
            lineHeight: 1.75, maxWidth: 780,
            margin: "0 auto 10px",
          }}>
            India's doorstep economy operates at the intersection of logistics,
            technology, and human workforce. But that wasn't the case 15 years ago.
            Let's look at how the gig economy evolved with various business models
            over the last 3 decades.
          </p>
          <p style={{ fontSize: 13, color: "#aaa", fontStyle: "italic", margin: 0 }}>
            Sources:{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>Kearney</span>{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>Young Urban Project</span>{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>Shiproket</span>
          </p>
        </div>

        {/* ── Cards rail ── */}
        <div style={{
          width: "100%",
          overflow: "visible",
          paddingLeft: "6vw",
        }}>
          {/* Rail container moves slowly left as scroll advances */}
          <div style={{
            display: "flex",
            gap: 24,

            transform: `translateX(${(1 - railShift) * 55}vw)`,
            willChange: "transform",
            // smooth transition adds a subtle lag for a cinematic feel
            transition: "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}>
            {TIMELINE.map((item, i) => (
              <TimelineCard
                key={item.year}
                item={item}
                entrance={cardEntrance(i)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}