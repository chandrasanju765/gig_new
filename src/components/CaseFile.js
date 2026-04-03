import { useInView } from "./helpers";
import { useState, useEffect } from "react";

export default function CaseFilesSection() {
  const [ref, visible] = useInView(0.15);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{
      background: "linear-gradient(160deg, #0a0a18 0%, #111827 100%)",
      padding: "30px 6vw 80px",
      textAlign: "center",
    }}>

      {/* "Case Files" big heading */}
      <h1 className="sm:text-[140px] text-[60px]" style={{
        fontFamily: "'Inter','Helvetica Neue',sans-serif",
        fontWeight: 700,
        background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(180,180,200,0.55) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        lineHeight: 1.0, margin: "0 0 18px",
      }}>
        Case Files
      </h1>
      <p style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: isMobile ? "19px" : "20px",
        color: "rgba(255,255,255,1)",
        marginBottom: 35,
      }}>
        A closer look at real employee fraud cases
      </p>

      {/* Case title */}
      <h2 style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: isMobile ? "20px" : "clamp(22px,2.5vw,36px)",
        fontWeight: 800, color: "white",
        marginBottom: 40,
      }}>
        The Fake Referral Ring
      </h2>

      {/* Two suspect cards */}
      <div ref={ref} style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 20, maxWidth: 980,
        margin: "0 auto",
      }}>

        {/* Suspect 1 */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 16,
          padding: isMobile ? "24px 20px" : "32px 28px",
          textAlign: "left",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s, transform 0.6s",
        }}>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: isMobile ? "18px" : 24,
            fontWeight: 700,
            color: "#CE1010", marginBottom: 28,
            letterSpacing: 0.2,
          }}>Suspect 1</p>

          <div style={{ display: "flex", gap: isMobile ? 16 : 24, alignItems: "flex-start" }}>
            {/* Info */}
            <div style={{ flex: 1 }}>
              {[
                { label: "Name", value: "Vishal Taleja" },
                { label: "Date of Birth", value: "18th April 1995" },
                { label: "Gender", value: "Male" },
              ].map(row => (
                <div key={row.label} style={{ marginBottom: isMobile ? 14 : 20 }}>
                  <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: isMobile ? "12px" : 14,
                    color: "rgba(255,255,255,0.45)",
                    margin: "0 0 4px",
                  }}>{row.label}</p>
                  <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: isMobile ? "15px" : 22,
                    fontWeight: 700, color: "white",
                    margin: 0,
                  }}>{row.value}</p>
                </div>
              ))}
            </div>

            {/* Suspect 1 Photo */}
            <div style={{
              width: isMobile ? 110 : 140,
              height: isMobile ? 132 : 168,
              flexShrink: 0,
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              <img
                src="/assets/suspect1.png"
                alt="Vishal Taleja"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </div>
        </div>

        {/* Accomplices */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: isMobile ? "24px 20px" : "32px 28px",
          textAlign: "left",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s 0.15s, transform 0.6s 0.15s",
        }}>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: isMobile ? "18px" : 24,
            fontWeight: 700,
            color: "#CE1010", marginBottom: 28,
          }}>The Accomplice Vishal's friends</p>

          <div style={{ display: "flex", gap: isMobile ? 16 : 24, alignItems: "flex-start" }}>
            {/* Friends list */}
            <div style={{ flex: 1 }}>
              {["Rahul", "Chavan", "Trivam"].map((name, i) => (
                <div key={name} style={{ marginBottom: isMobile ? 14 : 22 }}>
                  <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: isMobile ? "12px" : 14,
                    color: "rgba(255,255,255,0.45)",
                    margin: "0 0 4px",
                  }}>Friend {i + 1}</p>
                  <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: isMobile ? "15px" : 22,
                    fontWeight: 700, color: "white",
                    margin: 0,
                  }}>{name}</p>
                </div>
              ))}
            </div>

            {/* Stacked friend photos */}
            <div style={{
              position: "relative",
              width: isMobile ? 160 : 200,
              height: isMobile ? 168 : 210,
              flexShrink: 0,
            }}>
              {/* Rahul — top left */}
              <div style={{
                position: "absolute",
                top: 0, left: 0,
                width: isMobile ? 72 : 92,
                height: isMobile ? 86 : 110,
                borderRadius: 6, overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                zIndex: 1,
              }}>
                <img src="/assets/rahul.png" alt="Rahul"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>

              {/* Chavan — top right */}
              <div style={{
                position: "absolute",
                top: 0, left: isMobile ? 82 : 104,
                width: isMobile ? 72 : 92,
                height: isMobile ? 86 : 110,
                borderRadius: 6, overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                zIndex: 1,
              }}>
                <img src="/assets/chavam.png" alt="Chavan"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>

              {/* Trivam — bottom center */}
              <div style={{
                position: "absolute",
                top: isMobile ? 94 : 118,
                left: isMobile ? 41 : 52,
                width: isMobile ? 72 : 92,
                height: isMobile ? 86 : 110,
                borderRadius: 6, overflow: "hidden",
                zIndex: 2,
              }}>
                <img src="/assets/trivam.png" alt="Trivam"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}