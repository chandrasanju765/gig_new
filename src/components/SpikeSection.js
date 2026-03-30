import { useInView } from "./helpers";

const SPIKES = [
  { id: 1, label: "Festive hiring surges" },
  { id: 2, label: "Inventory scale-up" },
  { id: 3, label: "Accelerated onboarding cycles & compromised verification processes", wide: true },
];

function SpikeCard({ item, delay, visible }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 18,
      backgroundImage:"linear-gradient(rgb(29, 29, 29), rgb(33, 33, 33))" ,
      borderRadius: 14,
      border: "1px solid white",
      padding: "10px 18px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.55s ${delay}s, transform 0.55s ${delay}s`,
    }}>
      {/* Spike.png icon in white rounded box */}
      <div style={{
        flexShrink: 0,
        width: 68, height: 68,
        background: "white",
        borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <img
          src="/assets/Spike.png"
          alt="spike icon"
          style={{ width: 52, height: 52, objectFit: "contain" }}
        />
      </div>

      <span style={{
        fontFamily: "'Inter',sans-serif",
        
        fontSize: "clamp(15px,1.15vw,19px)",
        fontWeight: 500, color: "white", lineHeight: 1.5,
      }}>{item.label}</span>
    </div>
  );
}

export default function SpikesSection() {
  const [ref, visible] = useInView(0.2);

  return (
    <section style={{
      background: "radial-gradient(ellipse at 60% 40%, #1a0a0a 0%, #0d0d0d 60%, #0a0a12 100%)",
      padding: "80px 8vw 100px",
      display: "flex", flexDirection: "column", alignItems: "center",
      textAlign: "center",
    }}>

      {/* Vertical connector — big dot → line → small dot */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
        <div style={{
          width: 24, height: 24, borderRadius: "50%",
          background: "#e53e3e",
          border: "3px solid black",
          boxShadow: "0 0 0 3px #e53e3e",
          flexShrink: 0,
        }}/>
        <div style={{
          width: 2, height: 90,
          background: "linear-gradient(180deg, #e53e3e 0%, #e53e3e66 100%)",
        }}/>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e53e3e" }}/>
      </div>

      {/* Heading */}
      <h2 style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: "28px",
        fontWeight: 700, color: "white",
        marginBottom: 48, lineHeight: 1.3,
      }}>
        These spikes typically occur due to
      </h2>

      {/* Cards — 2-column grid, last card full width */}
      <div ref={ref} style={{
        width: "100%", maxWidth: 1040,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
        marginBottom: 56,
      }}>
        {SPIKES.slice(0, 2).map((item, i) => (
          <SpikeCard key={item.id} item={item} delay={0.1 * i} visible={visible} />
        ))}
        <div style={{ gridColumn: "1 / -1" }}>
          <SpikeCard item={SPIKES[2]} delay={0.22} visible={visible} />
        </div>
      </div>

      {/* Body text */}
      <p style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: "19px",
        fontWeight:300,
        color: "rgba(255,255,2551 )",
        lineHeight: 1.6, maxWidth: 820,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.55s 0.38s, transform 0.55s 0.38s",
      }}>
        When hiring volume spikes, verification compromises follow and{" "}
        <strong style={{ color: "#CE1010" }}>risk rates</strong>  <br  className="sm:flex hidden"/>
        inch upward. Even a <strong style={{ color: "white" }}>0.3%</strong>{" "}
        increase at scale translates into{" "}
        <strong style={{ color: "#CE1010" }}>thousands</strong><br  className="sm:flex hidden"/>
        of additional high-risk profiles entering the ecosystem.
      </p>
    </section>
  );
}