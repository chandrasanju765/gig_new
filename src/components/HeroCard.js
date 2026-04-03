import { lerp, clamp, ease } from "./helpers";

export const RX = 38;
export const RY = 28;

export default function HeroCard({ card, progress, vw }) {
  const rx = vw >= 1024 ? RX : vw >= 600 ? 26 : 32;
  const ry = vw >= 1024 ? RY : vw >= 600 ? 20 : 26;

  const cardWidth  = vw >= 1024 ? 185 : vw >= 600 ? 130 : 148;
  const cardHeight = vw >= 1024 ? 230 : vw >= 600 ? 162 : 185;
  const borderRad  = vw >= 1024 ? 16  : 10;

  const explodeDist = vw >= 1024 ? 140 : vw >= 600 ? 100 : 105;

  const rad = (card.angle * Math.PI) / 180;
  const ox = Math.cos(rad) * rx;
  const oy = -Math.sin(rad) * ry;
  const mag = Math.sqrt(ox * ox + oy * oy) || 1;
  const EX = (ox / mag) * explodeDist;
  const EY = (oy / mag) * explodeDist;

  const t       = ease(clamp((progress - 0.35) / 0.55, 0, 1));
  const tx      = lerp(ox, EX, t);
  const ty      = lerp(oy, EY, t);
  const opacity = lerp(1, 0, clamp((progress - 0.65) / 0.3, 0, 1));

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${tx}vw)`,
        top: `calc(50% + ${ty}vh)`,
        transform: `translate(-50%, -50%) rotate(${card.rotate}deg)`,
        opacity,
        zIndex: card.z,
        willChange: "transform, opacity",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: borderRad,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <img
            src={`/assets/img${card.id}.png`}  
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}