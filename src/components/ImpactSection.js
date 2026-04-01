import { useEffect, useRef, useState } from "react";
import { lerp, clamp, ease } from "./helpers";
import "../index.css";

export default function ImpactSection() {
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
  const text1P = ease(clamp((progress - 0.15) / 0.2, 0, 1));
  const amountP = ease(clamp((progress - 0.3) / 0.2, 0, 1));
  const text2P = ease(clamp((progress - 0.45) / 0.2, 0, 1));
  const sourceP = ease(clamp((progress - 0.6) / 0.2, 0, 1));

  return (
    <div ref={sectionRef} style={{ height: "350vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top half — dark */}
        <div
          style={{
            flex: 1,
            background: "#0a0a12",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "72px 80px 300px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: -450,
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
          {/* Faint grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
                "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 1200,
            }}
          >
            {/* Title */}
            <h2
              style={{
                fontFamily: "'Inter','Helvetica Neue',sans-serif",
                fontSize: "43px",
                fontWeight: 700,
                color: "white",
                margin: "0 0 36px",
                lineHeight: 1.15,
                opacity: titleP,
                transform: `translateY(${lerp(20, 0, titleP)}px)`,
              }}
            >
              The Impact of the fraud We Caught
            </h2>

            {/* Para 1 */}
            <p
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "24px",
                lineHeight: 1.4,
                margin: "0 auto 40px",
                maxWidth: 920,
                fontFamily: "'Inter',sans-serif",
                opacity: text1P,
                transform: `translateY(${lerp(16, 0, text1P)}px)`,
              }}
            >
              Even one missed red flag in any of these segments can increase the
              risk of <br className="sm:flex hidden" />
              high-value cargo being stolen, a customer being mistreated, or
              possible <br className="sm:flex hidden" />
              food adulteration in a dark store. Incidents such as this
            </p>

            {/* Amount */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                opacity: amountP,
                transform: `translateY(${lerp(16, 0, amountP)}px)`,
              }}
            >
              <span
                style={{
                  fontSize: "105px",
                  fontWeight: 700,
                  color: "#ce1010",
                  fontFamily: "'Inter',sans-serif",
                  lineHeight: 1,
                }}
              >
                ₹
              </span>
              <span className="sm:text-[105px] text-[50px]"
                style={{
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "'Inter','Helvetica Neue',sans-serif",
                  lineHeight: 1,
                }}
              >
                1.21 Crore
              </span>
            </div>
            {/* Para 2 */}
            <p
              style={{
                color: "rgba(255,255,255,0.92)",
                fontSize: "clamp(14px,1.15vw,28px)",
                lineHeight: 1.8,
                margin: "0 auto 24px",
                maxWidth: 820,
                marginTop: 40,
                marginBottom: 40,
                fontFamily: "'Inter',sans-serif",
                opacity: text2P,
                transform: `translateY(${lerp(16, 0, text2P)}px)`,
              }}
            >
              truck robbery involving smartphones, apparel, and perfumes
              highlight how gaps in background screening can increase exposure
              to serious financial losses and erode customer trust.
            </p>

            {/* Source */}
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 13,
                fontFamily: "'Inter',sans-serif",
                fontStyle: "italic",
                margin: 0,
                opacity: sourceP,
                position: "relative",   // ← add this
                zIndex: 2,
              }}
            >
              Source:{" "}
              <a
                href="https://www.logisticsinsider.in/%E2%82%B91-21-crore-worth-of-iphones-stolen-from-flipkart-truck-in-punjab/"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  textDecoration: "underline",
                  cursor: "pointer",
                  pointerEvents: "auto",

                }}
              >
                Logistics Insider
              </a>
            </p>
            <div
              id="gradient-bg"
              style={{
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "52px 80px 48px",
                textAlign: "center",
              }}
            ></div>
          </div>

          {/* Bottom half — blue, full width */}
          {/* <div id="gradient-bg"  style={{
          flex: "0 0 auto",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "52px 80px 48px",
          textAlign: "center",
        }}> */}
          {/* Para 2 */}
          {/* <p style={{
            color: "rgba(255,255,255,0.92)",
            fontSize: "clamp(14px,1.15vw,19px)",
            lineHeight: 1.8, margin: "0 auto 24px",
            maxWidth: 820,
            fontFamily: "'Inter',sans-serif",
            opacity: text2P, transform: `translateY(${lerp(16, 0, text2P)}px)`,
          }}>
            truck robbery involving smartphones, apparel, and perfumes highlight how
            gaps in background screening can increase exposure to serious financial
            losses and erode customer trust.
          </p> */}
        </div>
      </div>
    </div>
  );
}
