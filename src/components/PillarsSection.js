import { useInView } from "./helpers";

const IMAGES = ["speed.png", "scale.png", "trust.png"];
const SWAYS = ["hang-0", "hang-0", "hang-2"];

function PillarCard({ title, index, visible }) {
  return (
    /* Outer wrapper: overflow visible so shadow + top of card shows */
    <div style={{
      flex: "1 1 280px", maxWidth: 360,
      transformOrigin: "50% 0%",
      /* padding-top so the rotated top edge & shadow aren't clipped */
      // paddingTop: 16,
      opacity: visible ? 1 : 0,
      marginTop: visible ? 0 : -40,
      transition: `opacity 0.65s ${0.18 * index}s cubic-bezier(0.4,1.56,0.64,1),
                   margin-top 0.65s ${0.1 * index}s cubic-bezier(0.34,1.56,0.64,1)`,
      animation: visible
        ? `${SWAYS[index]} ${3.5 + index * 0.4}s ease-in-out ${0.18 * index}s infinite`
        : "none",
    }}>
      {/* White card: NO overflow hidden here — let shadow render fully */}
      <div style={{
        background: "white",
        borderRadius: 18,
        boxShadow: "0 20px 60px rgba(0,0,0,0.20), 0 6px 20px rgba(0,0,0,0.10)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}>
        {/* Image container: overflow hidden only on the image crop */}
        <div style={{
          width: "100%", height: 300,
          borderRadius: 18,
          overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#f8f8f8",
        }}>
          <img
            src={`/assets/${IMAGES[index]}`}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function PillarsSection() {
  const [ref, visible] = useInView(0.2);
  const [headRef, headVisible] = useInView(0.3);

  return (
    <section style={{
      background: "white", padding: "0px 60px 120px",
      display: "flex", flexDirection: "column", alignItems: "center",
      overflow: "visible",
    }}>
      <style>{`
        @keyframes hang-0{0%,100%{transform:rotate(4deg)}50%{transform:rotate(-1.5deg)}}
        @keyframes hang-1{0%,100%{transform:rotate(2deg)}50%{transform:rotate(4.5deg)}}
        @keyframes hang-2{0%,100%{transform:rotate(3deg)}50%{transform:rotate(-0.5deg)}}
      `}</style>

      <h2 className="mt-0 sm:mt-6 sm:text-[55px] text-[30px]" ref={headRef} style={{
        fontFamily: "'Inter','system-ui',sans-serif",
        fontWeight: 700,
        color: "#343434", textAlign: "center", marginBottom: 56,
        letterSpacing: 0,
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s, transform 0.6s",
      }}>
        The three pillars of the gig economy
      </h2>

      {/* Cards row — extra padding so shadow + tilted corners aren't clipped */}
      <div ref={ref} style={{
        display: "flex", gap: 40,
        alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap",
        width: "100%", maxWidth: 1200,
        padding: "10px 24px 32px",
        overflow: "visible",
      }}>
        {["SPEED", "SCALE", "TRUST"].map((t, i) => (
          <PillarCard key={t} title={t} index={i} visible={visible} />
        ))}
      </div>

      <p style={{
        marginTop: 48,
                       fontFamily: "'Inter',sans-serif",

        fontSize: "clamp(15px,1.2vw,20px)", color: "#333",
        textAlign: "center",
        width: "100%", maxWidth: 1200,
        lineHeight: 1.75,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s 0.5s, transform 0.6s 0.5s",
      }}>
        When e-commerce <strong className="text-[#343434]">first entered India,</strong> people were{" "}
        <span style={{ color: "#CE1010", fontWeight: 700 }}>reluctant</span>{" "}
        to buy expensive <br/> things online.{" "}
        <strong>Today,</strong> however, these platforms have{" "}
        <strong>earned widespread trust.</strong>
      </p>
    </section>
  );
}