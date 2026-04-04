import { useEffect, useRef, useState } from "react";
import { lerp, clamp, ease } from "./helpers";

const SEGMENTS = [
  {
    title: "Truck Drivers",
    mapSrc: "/assets/truck driver.svg",
  },
  {
    title: "Dark Store Workers",
    mapSrc: "/assets/dark store .svg",
  },
  {
    title: "Delivery Partners",
    mapSrc: "/assets/delivery partners .svg",
  },
];

const DEFAULT_MAP = "/assets/india.png";

export default function GeographicSection() {
  const [openIndex, setOpenIndex] = useState(null); // null = default india.png
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

  const titleP = ease(clamp(progress / 0.35, 0, 1));
  const leftP  = ease(clamp((progress - 0.25) / 0.35, 0, 1));
  const mapP   = ease(clamp((progress - 0.25) / 0.40, 0, 1));

  // If nothing selected → show india.png, else show segment map
  const activeMap = openIndex === null ? DEFAULT_MAP : SEGMENTS[openIndex].mapSrc;

  const handleSegmentClick = (i) => {
    // clicking same index deselects → back to india.png
    setOpenIndex(prev => prev === i ? null : i);
  };

  return (
    <div ref={sectionRef} style={{ height: "200vh", position: "relative" }}>
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
        <div style={{ position: "absolute", top: 0, left: -450, zIndex: 0 }}>
          <img src="/assets/Ellipse.png" alt="ellipse" style={{ width: "900px", height: "900px", opacity: 1 }} />
        </div>

        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 8,
            opacity: titleP,
            transform: `none`,
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            className="sm:text-[105px] text-[40px]"
            style={{
              fontFamily: "Inter",
              fontWeight: 700,
              color: "white",
              margin: 0,
              lineHeight: 1.05,
              fontSize: isMobile ? "30px" : "120px",
            }}
          >
            Geographic Risk
            <br className="sm:flex hidden" />
            Concentration
          </h2>
          <p
            style={{
              color: "white",
              margin: "12px 0 0",
              fontFamily: "'Inter',sans-serif",
              fontSize: isMobile ? "11px" : "30px",
            }}
          >
            A breakdown of states with the highest risk rates across India.
          </p>
        </div>

        {/* Body */}
        <div
          className="flex flex-col-reverse lg:grid lg:grid-cols-[370px_1fr] gap-12 w-full max-w-[1400px] flex-1 mt-6"
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
              className="hidden lg:block"
              style={{ color: "white", fontSize: 30, lineHeight: "115%", fontFamily: "'Inter',sans-serif", margin: 0 }}
            >
              Kerala records the highest risk rate in the country, with
              Maharashtra close behind, making them two of the highest risk
              concentration states across segments.
            </p>
            <p
              className="hidden lg:block"
              style={{ color: "white", fontSize: 30, lineHeight: "115%", fontFamily: "'Inter',sans-serif", margin: 0 }}
            >
              Another contributing factor behind this surge could be stronger
              crime reporting mechanisms in southern and western states. For
              example, in Kerala, many challans are automatically generated
              through AI-enabled monitoring cameras at traffic junctions.
            </p>

            {/* Segment Accordion */}
            <div
              className="flex lg:flex-col flex-row justify-center lg:justify-start"
              style={{ marginTop: 8, gap: 10 }}
            >
              {SEGMENTS.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i}>
                    <div
                      onClick={() => handleSegmentClick(i)}
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
                  </div>
                );
              })}
            </div>

            {/* Mobile-only paragraphs */}
            <p
              className="block lg:hidden"
              style={{ color: "white", fontSize: 11, lineHeight: 1.7, fontFamily: "'Inter',sans-serif", margin: 0, textAlign: "center" }}
            >
              Kerala records the highest risk rate in the country, with
              Maharashtra close behind, making them two of the highest risk
              concentration states across segments.
            </p>
            <p
              className="block lg:hidden"
              style={{ color: "white", fontSize: 11, lineHeight: 1.7, fontFamily: "'Inter',sans-serif", margin: 0, textAlign: "center" }}
            >
              Another contributing factor behind this surge could be stronger
              crime reporting mechanisms in southern and western states. For
              example, in Kerala, many challans are automatically generated
              through AI-enabled monitoring cameras at traffic junctions.
            </p>
          </div>

          {/* Map */}
          <div
            style={{
              position: "relative",
              opacity: mapP,
              transform: `scale(${lerp(0.94, 1, mapP)})`,
              height: "100%",
              maxHeight: 680,
              minHeight: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              key={activeMap}
              src={activeMap}
              alt={openIndex === null ? "India map" : SEGMENTS[openIndex].title + " map"}
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