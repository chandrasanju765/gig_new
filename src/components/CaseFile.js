import { useInView } from "./helpers";

export default function CaseFilesSection() {
  const [ref, visible] = useInView(0.15);

  return (
    <section style={{
      background: "linear-gradient(160deg, #0a0a18 0%, #111827 100%)",
      padding: "100px 6vw 80px",
      textAlign: "center",
    }}>

      {/* "Case Files" big heading */}
      <h1 className="sm:text-[105px] text-[50px]" style={{
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
        fontSize: "20px",
        color: "rgba(255,255,255,1)",
        marginBottom: 72,
      }}>
        A closer look at real employee fraud cases
      </p>

      {/* Case title */}
      <h2 style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: "clamp(22px,2.5vw,36px)",
        fontWeight: 800, color: "white",
        marginBottom: 40,
      }}>
        The Fake Referral Ring
      </h2>

      {/* Two suspect cards */}
      <div ref={ref} style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 20, maxWidth: 980,
        margin: "0 auto",
      }}>

        {/* Suspect 1 */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 16,
          padding: "32px 28px",
          textAlign: "left",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s, transform 0.6s",
        }}>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 15, fontWeight: 700,
            color: "#CE1010", marginBottom: 28,
            letterSpacing: 0.2,
          }}>Suspect 1</p>

          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            {/* Info */}
            <div style={{ flex: 1 }}>
              {[
                { label: "Name", value: "Vishal Taleja" },
                { label: "Date of Birth", value: "18th April 1995" },
                { label: "Gender", value: "Male" },
              ].map(row => (
                <div key={row.label} style={{ marginBottom: 20 }}>
                  <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 13, color: "rgba(255,255,255,0.45)",
                    margin: "0 0 3px",
                  }}>{row.label}</p>
                  <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 18, fontWeight: 700, color: "white",
                    margin: 0,
                  }}>{row.value}</p>
                </div>
              ))}
            </div>
            {/* Photo placeholder */}
            <div style={{
              width: 130, height: 155, flexShrink: 0,
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
            }} />
          </div>
        </div>

        {/* Accomplices */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 16,
          padding: "32px 28px",
          textAlign: "left",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s 0.15s, transform 0.6s 0.15s",
        }}>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 16, fontWeight: 700,
            color: "#CE1010", marginBottom: 28,
          }}>The Accomplice Vishal's friends</p>

          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            {/* Friends list */}
            <div style={{ flex: 1 }}>
              {["Rahul", "Chavan", "Trivam"].map((name, i) => (
                <div key={name} style={{ marginBottom: 22 }}>
                  <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 13, color: "rgba(255,255,255,0.45)",
                    margin: "0 0 3px",
                  }}>Friend {i + 1}</p>
                  <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 18, fontWeight: 700, color: "white",
                    margin: 0,
                  }}>{name}</p>
                </div>
              ))}
            </div>
            {/* Stacked photo placeholders */}
            <div style={{ position: "relative", width: 160, height: 180, flexShrink: 0 }}>
              {[
                { top: 0, left: 20, rotate: -4 },
                { top: 10, left: 50, rotate: 3 },
                { top: 40, left: 30, rotate: -2 },
              ].map((pos, i) => (
                <div key={i} style={{
                  position: "absolute",
                  top: pos.top, left: pos.left,
                  width: 100, height: 120,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  borderRadius: 6,
                  transform: `rotate(${pos.rotate}deg)`,
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}