import { useInView } from "./helpers";

export default function CaseFilesSection() {
  const [ref, visible] = useInView(0.15);

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
          <img src="/assets/Ellipse.png" alt="ellipse" style={{ width: "1200px", height: "760px",  }} />
        </div>
      {/* Main Title */}
      <h2 className="sm:text-[96px] text-[45px]" style={{
        fontWeight: 700,
        fontFamily: "'Inter',sans-serif", 
        background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(170,170,200,0.5) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textAlign: "center",
        marginBottom: "70px",
        lineHeight: "1.05",
      }}>
      Way Forward
      </h2>

      <div 
        ref={ref}
        style={{
         
          gap: "50px",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(50px)",
          transition: "all 1s ease-out",
        }}
      >
        {/* LEFT SIDE - 50% (Suspect Card + Timeline) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "45px" }}>

         

          {/* Timeline - Exactly like image */}
          
          
        </div>

        {/* RIGHT SIDE - 50% (Story Text) */}
        <div style={{ paddingTop: "10px" }}>
          <h2 className="text-center" style={{
            fontFamily: "'Inter',sans-serif", 
            fontSize: "20px",
            lineHeight: "1.35",
            marginBottom: "26px",
            fontWeight: 600,
          }}>
The gig economy is set to grow from 1 crore workers in 2025 to 2.35 crore by 2029–30.            </h2>

          <p className="text-center" style={{ fontSize: "16", lineHeight: "1.78", fontWeight:300, marginBottom: "20px", color: "white" }}>
But such massive growth in hiring also puts the industry under regulators' risk radar.<br className="sm:flex hidden"/>  Think about how many delivery agents you meet in a day. <br className="sm:flex hidden"/> <span className="mt-4 mb-5 pt-5 font-bold">Now imagine the impact if even one of those interactions goes wrong. </span> <br className="sm:flex hidden"/>With millions of daily customer touchpoints, companies are doubling down<br className="sm:flex hidden"/>
on making gig workers as secure and verified as their white-collar counterparts.<br className="sm:flex hidden"/>
In fact, AI-powered solutions already exist to keep fraudsters out of your gig workforce.          </p>

        

        
<div className="flex items-center justify-center">
    <div> <h2   className="sm:text-[70px] text-[35px] text-center" style={{
            fontFamily: "'Inter',sans-serif", 
            marginBottom: "26px",
            fontWeight: 700,
            lineHeight:1,
          }}>The real question is - <span className="sm:text-[70px] text-[35px] text-[#CE1010]">Are you ready to make that change</span></h2></div>
          <h2   className="sm:text-[125px] text-[75px] text-center  text-[#CE1010]" style={{
            fontFamily: "'Inter',sans-serif", 
            lineHeight: "1.35",
            marginBottom: "26px",
            fontWeight: 700,
          }}>?</h2>
        
          </div>
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