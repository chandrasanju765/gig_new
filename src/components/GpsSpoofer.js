import { useInView } from "./helpers";
import { useState,useEffect } from "react";

export default function CaseFilesSection() {
  const [ref, visible] = useInView(0.15);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 1024);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);

  return (
    <section  className="flex justify-center" style={{
      background: "black",
      position: "relative",
      padding: "90px 5vw 100px",
      color: "white",
      fontFamily: "'Inter', sans-serif",
    }}>

<div className="max-w-5xl">
    <div style={{ position: "absolute", top: 40, left: 190, zIndex: 0 }}>
          <img src="/assets/Ellipse.png" alt="ellipse" style={{ width: "1200px", height: "1000px",  }} />
        </div>
      {/* Main Title */}
      <h1  className="sm:text-[96px] text-[45px]" style={{
        fontWeight: 700,
        fontFamily: "'Inter',sans-serif", 
        background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(170,170,200,0.5) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textAlign: "center",
        marginBottom: "70px",
        lineHeight: "1.05",
      }}>
        The GPS Spoofer
      </h1>

      <div 
        ref={ref}
       style={{
  display: "grid",
  gridTemplateColumns: isMobile ? "1fr" : "50% 50%",
  gap: isMobile ? "32px" : "50px",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: isMobile ? "0 20px" : "0",
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(50px)",
  transition: "all 1s ease-out",
}}
      >
        {/* LEFT SIDE - 50% (Suspect Card + Timeline) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "45px" }}>

          {/* Suspect Card - Made to match image exactly */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "14px",
            padding: "26px 24px",
          }}>
            <p style={{
              color: "#CE1010",
              fontSize: "15px",
              fontWeight: 700,
              marginBottom: "20px",
            }}>Suspect 1</p>

            <div style={{ display: "flex", gap: "22px" }}>
              <div style={{ flex: 1 }}>
                {[
                  { label: "Name", value: "Vishal Taleja" },
                  { label: "Date of Birth", value: "18th April 1995" },
                  { label: "Gender", value: "Male" },
                ].map((item) => (
                  <div key={item.label} style={{ marginBottom: "20px" }}>
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: "0 0 4px" }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: "18.5px", fontWeight: 700, margin: 0 }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Photo - Same position as image */}
              <div style={{
                width: "132px",
                height: "158px",
                background: "#111",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <img 
                  src="../../assets/a4.png" 
                  alt="Vishal Taleja"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          {/* Timeline - Exactly like image */}
          <div>
            <p style={{
              color: "white",
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "18px",
            }}>Timeline of events</p>

            <div style={{ lineHeight: "1.85", fontSize: "16.8px" }}>
              <strong>Day 1:</strong> Rohan’s application was submitted<br /><br />
              
              <strong>Day 2:</strong> During the Digital Address Verification call:<br />
              <span style={{  }}>His GPS showed Delhi.<br />His IP address showed Faridabad.</span><br /><br />
              
              <strong>Day 2 (Later):</strong> We detected a VPN signal. With help from a cousin, he attempted to mask his real location.
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - 50% (Story Text) */}
        <div style={{ paddingTop: "10px" }}>
          <h2 style={{
            fontFamily: "'Inter',sans-serif", 
            fontSize: "27.5px",
            lineHeight: "1.35",
            marginBottom: "26px",
            fontWeight: 600,
          }}>
            Rohan applied to be a truck driver at MPK Shipments Ltd.
          </h2>

          <p style={{ fontSize: "18", lineHeight: "1.78", fontWeight:300, marginBottom: "20px", color: "white" }}>
            ...and the address verification revealed something even bigger.
          </p>

          <p style={{ fontSize: "18px", lineHeight: "1.78", fontWeight:300, marginBottom: "20px", color: "white" }}>
            He was also flagged with two active FIRs linked to high-value cargo robbery, 
            both filed by his previous employers.
          </p>

          <p style={{ fontSize: "17.2px", lineHeight: "1.78",fontWeight:300, color: "#e0e0e0" }}>
            Rohan was aware of MPK’s high-value laptop inventory. His plan was simple: 
            steal the cargo, disappear, and leave no trace behind.
          </p>

          <p style={{ fontSize: "17.2px", lineHeight: "1.78",fontWeight:300, marginTop: "24px", color: "#e0e0e0" }}>
            The catch saved MPK Shipments Ltd. Several lakhs in potential cargo theft and 
            exposed how sophisticated address fraud has become with GPS spoofing and VPN usage.
          </p>
        </div>
      </div>

      {/* Responsive - Stack on mobile */}
      <style jsx>{`
        @media (max-width: 968px) {
          div[style*="gridTemplateColumns: \"50% 50%\""] {
            grid-template-columns: 1fr !important;
            gap: 60px;
          }
        }
      `}</style>
      </div>
    </section>
  );
}