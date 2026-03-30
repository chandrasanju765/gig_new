import { useEffect, useRef, useState } from "react";
import { lerp, clamp, ease } from "./helpers";

const HOTSPOTS = [
  {
    label: "Gujarat",
    pct: "6.63%",
    top: "28%",
    left: "22%",
    dotTop: "33%",
    dotLeft: "30%",
    anchor: "right",
  },
  {
    label: "Haryana",
    pct: "4.92%",
    top: "18%",
    left: "68%",
    dotTop: "22%",
    dotLeft: "58%",
    anchor: "left",
  },
  {
    label: "Maharashtra",
    pct: "7.75%",
    top: "52%",
    left: "16%",
    dotTop: "55%",
    dotLeft: "35%",
    anchor: "right",
  },
  {
    label: "Karnataka",
    pct: "3.33%",
    top: "62%",
    left: "72%",
    dotTop: "64%",
    dotLeft: "52%",
    anchor: "left",
  },
  {
    label: "Kerala",
    pct: "8.42%",
    top: "78%",
    left: "38%",
    dotTop: "76%",
    dotLeft: "44%",
    anchor: "right",
  },
];

const SEGMENTS = [
  {
    title: "Truck Drivers",
    content:
      "Truck drivers face elevated risk due to long-haul travel, extended driving hours, highway exposure, and fatigue-related incidents across inter‑state routes.",
  },
  {
    title: "Dark Store Workers",
    content:
      "Dark store workers experience localized operational risk driven by dense urban locations, late‑night activity, inventory movement, and limited on‑ground supervision.",
  },
  {
    title: "Delivery Partners",
    content:
      "Delivery partners encounter frequent risk events due to high trip volumes, time‑bound deliveries, traffic violations, and continuous exposure to congested city roads.",
  },
];

export default function GeographicSection() {
  const [openIndex, setOpenIndex] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);

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

  const titleP = ease(clamp(progress / 0.2, 0, 1));
  const leftP = ease(clamp((progress - 0.2) / 0.25, 0, 1));
  const mapP = ease(clamp((progress - 0.2) / 0.3, 0, 1));
  const dotsP = ease(clamp((progress - 0.4) / 0.35, 0, 1));

  return (
    <div ref={sectionRef} style={{ height: "350vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "135vh",
          overflow: "hidden",
          background: `
          black
        `,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "72px 56px 40px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: -450,
            zIndex: 0,
          }}
        >
          <img
            src="/assets/Ellipse.png"
            alt="ellipse"
            style={{
              width: "900px",
              height: "900px", // adjust size
              opacity: 1, // optional
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 8,
            opacity: titleP,
            transform: `translateY(${lerp(24, 0, titleP)}px)`,
          }}
        >
          <h2
           className="sm:text-[105px] text-[40px]"
            style={{
              fontFamily: "'Inter','Helvetica Neue',sans-serif",
              fontWeight: 700,
              color: "white",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Geographic Risk
            <br  className="sm:flex hidden"/>
            Concentration
          </h2>
          <p
            style={{
              color: "white",
              fontSize: "18px",
              margin: "12px 0 0",
              fontFamily: "'Inter',sans-serif",
            }}
          >
            A breakdown of states with the highest risk rates across India.
          </p>
        </div>

        {/* Body (Now using Tailwind Grid for Layout/Responsiveness while keeping spacing identical) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 w-full max-w-[1200px] flex-1 mt-6"
        >
          {/* Left panel */}
          <div
            style={{
              opacity: leftP,
              transform: `translateX(${lerp(-24, 0, leftP)}px)`,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              paddingTop: 8,
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: 16,
                lineHeight: 1.7,
                fontFamily: "'Inter',sans-serif",
                margin: 0,
                paddingLeft: 12,
              }}
            >
              Kerala records the highest risk rate in the country, with
              Maharashtra close behind, making them two of the highest risk
              concentration states across segments.
            </p>
            <p
              style={{
                color: "white",
                fontSize: 16,
                lineHeight: 1.7,
                fontFamily: "'Inter',sans-serif",
                margin: 0,
                paddingLeft: 12,
              }}
            >
              Another contributing factor behind this surge could be stronger
              crime reporting mechanisms in southern and western states. For
              example, in Kerala, many challans are automatically generated
              through AI-enabled monitoring cameras at traffic junctions.
            </p>

            {/* Segment list (Accordion) */}
            <div
              style={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {SEGMENTS.map((item, i) => {
                const isOpen = openIndex === i;

                return (
                  <div key={i}>
                    {/* Header */}
                    <div
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                        color: "white",
                        fontSize: 17,
                        fontWeight: 600,
                        fontFamily: "'Inter',sans-serif",
                        userSelect: "none",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        ▶
                      </span>
                      {item.title}
                    </div>

                    {/* Content */}
                    {isOpen && (
                      <div
                        style={{
                          marginLeft: 22,
                          marginTop: 6,
                          color: "rgba(255,255,255,0.75)",
                          fontSize: 14,
                          lineHeight: 1.6,
                          fontFamily: "'Inter',sans-serif",
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map */}
          <div
            style={{
              position: "relative",
              opacity: mapP,
              transform: `scale(${lerp(0.94, 1, mapP)})`,
              height: "100%",
              maxHeight: 520,
            }}
          >
            {/* Blue border box */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 4,
                zIndex: 1,
                pointerEvents: "none",
              }}
            />

            {/* India map image */}
            <img
              src="/assets/india.png"
              alt="India map"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                filter: "brightness(0.9)",
              }}
            />

            {/* Hotspot dots + labels (These will go here based on your HOTSPOTS array) */}
          </div>
        </div>
      </div>
    </div>
  );
}