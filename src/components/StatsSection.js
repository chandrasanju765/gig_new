import { useEffect, useRef, useState } from "react";
import { useInView } from "./helpers";

/* ── Count-up number ────────────────────────────────────────────────── */
function CountUp({ target, suffix = "", duration = 2000, trigger }) {
  const [current, setCurrent] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const run = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setCurrent(+(target * e).toFixed(1));
      if (t < 1) raf.current = requestAnimationFrame(run);
      else setCurrent(target);
    };
    raf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf.current);
  }, [trigger, target, duration]);
  return (
    <>
      {current}
      {suffix}
    </>
  );
}

/* ── Pulsing dot ─────────────────────────────────────────────────────── */
function PulseDot({ color = "#e53e3e", delay = 0, size = 14 }) {
  return (
    <span
      className="relative inline-block flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px solid ${color}`,
          animation: `pr 1.6s ease-out ${delay}s infinite`,
        }}
      />
      <span
        className="absolute rounded-full"
        style={{
          inset: Math.round(size * 0.21),
          background: color,
          animation: `pd 1.6s ease-in-out ${delay}s infinite`,
        }}
      />
      <style>{`
        @keyframes pr {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pd {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </span>
  );
}

/* ── Animated dots "..." that appear one by one ───────────────────────── */
function AnimatedDots({ trigger }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    setCount(0);
    const t1 = setTimeout(() => setCount(1), 400);
    const t2 = setTimeout(() => setCount(2), 900);
    const t3 = setTimeout(() => setCount(3), 1400);
    const loop = setInterval(() => {
      setCount(0);
      setTimeout(() => setCount(1), 400);
      setTimeout(() => setCount(2), 900);
      setTimeout(() => setCount(3), 1400);
    }, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(loop);
    };
  }, [trigger]);

  return (
    <span className="inline-flex gap-0.5 items-end ml-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block transition-opacity duration-150"
          style={{
            opacity: count > i ? 1 : 0,
          }}
        >
          .
        </span>
      ))}
    </span>
  );
}

export default function StatsSection() {
  const [ref, visible] = useInView(0.25);
  const [bigRef, bigVisible] = useInView(0.2);

  return (
    <>
      {/* Stats Section - Matching Figma Design */}
      <section
        ref={ref}
        className="bg-white    px-6 md:pt-[110px] md:px-[60px] flex flex-col items-center text-center" style={{ borderRadius:"23px 23px 0px 0px" }}
      >
        {/* Main Heading */}
        <h2 className="sm:mt-0 mt-5 text-[30px] sm:text-[54px] text-[#343434] leading-tight font-[300] max-w-[760px] mb-7 tracking-[-0.02em] " style={{         fontFamily: "'Inter',sans-serif",
 }}>
          The gig economy has changed{" "}
          <strong className="text-[30px] sm:text-[54px] text-[#343434]  font-bold leading-3">our consumption patterns</strong>
        </h2>
        
        {/* Subheading */}
        <p className="font-sans text-[#5D5D5D] text-[18px] sm:text-[20px]  leading-relaxed max-w-[960px] mb-3 font-light">
          becoming an integral part of everyday life. From late-night food deliveries <br  className="sm:flex hidden"/>
          and instant electronics, it has fundamentally reshaped urban living.
        </p>
        
        {/* Description with stats */}
        <p className="font-sans text-[#5D5D5D] text-[20px]  leading-relaxed max-w-[960px]  font-light mb-4 ">
          At the heart of this transformation are millions of gig workers powering <br  className="sm:flex hidden"/>
          the instant convenience ecosystem, a workforce that stood at<br  className="sm:flex hidden"/>
          <strong className="text-[#1A3BB0]  text-[18px] font-sans font-bold ">
            <CountUp target={7.7} suffix="M in 2020" trigger={visible} />
          </strong>{" "}
          and is expected to{" "}
          <strong className="text-[#1A3BB0]  text-[18px] font-sans font-bold">
            exceed <CountUp target={23.5} suffix="M by 2030." trigger={visible} duration={2400} />
          </strong>
        </p>

        {/* Stats Grid */}
        {/* <div className="flex gap-8 sm:gap-12 md:gap-16 items-center justify-center flex-wrap">
          {[
            { value: "4.9M", label: "Background Verifications", delay: 0 },
            { value: "2.3x", label: "Growth in gig workers", delay: 0.3 },
            { value: "63%", label: "Fraud cases undetected", delay: 0.6 },
            { value: "18+", label: "Verification categories", delay: 0.9 },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${0.12 * i}s`,
              }}
            >
              <PulseDot delay={s.delay} />
              <span className="font-serif text-[clamp(28px,3vw,44px)] font-black text-gig-dark leading-none tracking-[-0.02em]">
                {s.value}
              </span>
              <span className="font-sans text-xs sm:text-sm text-gig-light-gray font-semibold max-w-[120px] text-center leading-tight uppercase tracking-wide">
                {s.label}
              </span>
            </div>
          ))}
        </div> */}
      </section>

      {/* Risk Section - Matching Figma Design */}
      <section
        ref={bigRef}
        className="sm:pt-0 pb-5 sm:pb-0 pt-5 bg-white px-6 md:py-[50px] md:px-10 text-center"
      >
        <h2
          className="font-sans text-[45px] sm:text-[100px] font-black text-gig-red leading-[1.05] transition-all duration-700 tracking-[-0.03em]"
          style={{
                    fontFamily: "'Inter',sans-serif",
fontWeight:"700",
color:"#CE1010",
wordSpacing:"13px",
letterSpacing:"40px",
            letterSpacing: "-3%",
            opacity: bigVisible ? 1 : 0,
            transform: bigVisible ? "scale(1)" : "scale(0.88)",
          }}
        >
          The biggest risk <br  className="sm:flex hidden"/>   
          still remains<AnimatedDots trigger={bigVisible} />
        </h2>
      </section>
    </>
  );
}