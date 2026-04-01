import { useEffect, useRef, useState } from "react";
import { lerp, clamp, ease } from "./helpers";

const SEGMENTS = [
  {
    title: "Truck Drivers",
    mapSrc: "/assets/truck driver.svg",
    content:
      "Truck drivers face elevated risk due to long-haul travel, extended driving hours, highway exposure, and fatigue-related incidents across inter‑state routes.",
  },
  {
    title: "Dark Store Workers",
    mapSrc: "/assets/dark store .svg",
    content:
      "Dark store workers experience localized operational risk driven by dense urban locations, late‑night activity, inventory movement, and limited on‑ground supervision.",
  },
  {
    title: "Delivery Partners",
    mapSrc: "/assets/delivery partners .svg",
    content:
      "Delivery partners encounter frequent risk events due to high trip volumes, time‑bound deliveries, traffic violations, and continuous exposure to congested city roads.",
  },
];

export default function GeographicSection() {
  const [openIndex, setOpenIndex] = useState(0);
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
  const leftP  = ease(clamp((progress - 0.2) / 0.25, 0, 1));
  const mapP   = ease(clamp((progress - 0.2) / 0.3, 0, 1));

  const activeIndex = openIndex === null ? 0 : openIndex;
  const activeMap   = SEGMENTS[activeIndex].mapSrc;

  return (
    <div ref={sectionRef} style={{ height: "350vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "135vh",
          overflow: "hidden",
          background: "black",
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
              height: "900px",
              opacity: 1,
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
            position: "relative",
            zIndex: 1,
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
            <br className="sm:flex hidden" />
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

        {/* Body */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 w-full max-w-[1200px] flex-1 mt-6"
          style={{ position: "relative", zIndex: 1 }}
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
                fontSize: 20,
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
                fontSize: 20,
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

            {/* Segment Accordion */}
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
                    <div
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                        color: isOpen ? "#e53e3e" : "white",
                        fontSize: 17,
                        fontWeight: 600,
                        fontFamily: "'Inter',sans-serif",
                        userSelect: "none",
                        transition: "color 0.2s ease",
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

          {/* Map — increased size */}
          <div
            style={{
              position: "relative",
              opacity: mapP,
              transform: `scale(${lerp(0.94, 1, mapP)})`,
              height: "100%",
              maxHeight: 680,
              minHeight: 420,
              transition: "opacity 0.35s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              key={activeMap}
              src={activeMap}
              alt={SEGMENTS[activeIndex].title + " map"}
              style={{
                width: "115%",
                maxWidth: "115%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                filter: "brightness(0.9)",
                transition: "opacity 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}