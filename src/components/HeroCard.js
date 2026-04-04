import { lerp, clamp, ease } from "./helpers";

export const RX = 32;
export const RY = 24;

export default function HeroCard({ card, progress, vw }) {
  // Tighter orbit — pulled back in
  const rx = vw >= 1024 ? 32 : vw >= 600 ? 24 : 28;
  const ry = vw >= 1024 ? 24 : vw >= 600 ? 18 : 21;

  // Smaller cards
  const cardWidth  = vw >= 1024 ? 155 : vw >= 600 ? 115 : 130;
  const cardHeight = vw >= 1024 ? 192 : vw >= 600 ? 142 : 160;
  const borderRad  = vw >= 1024 ? 16  : 10;

  const explodeDist = vw >= 1024 ? 115 : vw >= 600 ? 82 : 92;

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
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}