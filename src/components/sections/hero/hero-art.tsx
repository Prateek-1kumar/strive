import { Professional } from "@/components/illustrations/professional";
import { STEPS, W, X0, RISE, BASE, DX, DY, FLOOR } from "@/components/illustrations/climb";

// Flat-editorial stairway lit from above. Layers (.px) drift at different speeds on scroll — see globals.css.

const lerp = (a: string, b: string, t: number) => {
  const c = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  const m = (i: number) => Math.round(c(a, i) + (c(b, i) - c(a, i)) * t);
  return `rgb(${m(0)},${m(1)},${m(2)})`;
};
const pts = (p: number[][]) => p.map((q) => q.join(",")).join(" ");
const px = (v: number) => ({ "--px": `${v}px` }) as React.CSSProperties;

export default function HeroArt() {
  const steps = Array.from({ length: STEPS }, (_, n) => {
    const x = X0 + W * n, top = BASE - RISE * n, t = n / (STEPS - 1);
    return (
      <g key={n}>
        <rect x={x} y={top} width={W} height={FLOOR - top} fill={lerp("#0d2b52", "#1f4a80", t)} />
        <polygon
          points={pts([[x, top], [x + W, top], [x + W + DX, top - DY], [x + DX, top - DY]])}
          fill={lerp("#8f8674", "#e6dcc8", t)}
        />
        {n < STEPS - 1 && (
          <polygon
            points={pts([[x + W - 22, top], [x + W, top], [x + W + DX, top - DY], [x + W - 22 + DX, top - DY]])}
            fill="#06254a" fillOpacity=".22"
          />
        )}
        <line x1={x} x2={x + W} y1={top} y2={top} stroke="#F8F6F1" strokeOpacity=".35" />
        {n === STEPS - 1 && (
          <polygon
            points={pts([[x + W, top], [x + W + DX, top - DY], [x + W + DX, FLOOR], [x + W, FLOOR]])}
            fill="#071d3a"
          />
        )}
      </g>
    );
  });

  return (
    <svg viewBox="0 0 1000 900" preserveAspectRatio="xMaxYMax slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="bloom">
          <stop offset="0" stopColor="#FFF0C8" stopOpacity=".42" />
          <stop offset=".3" stopColor="#F0D48A" stopOpacity=".16" />
          <stop offset=".65" stopColor="#C9A24A" stopOpacity=".05" />
          <stop offset="1" stopColor="#C9A24A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6E3AE" stopOpacity=".34" />
          <stop offset=".75" stopColor="#F6E3AE" stopOpacity=".1" />
          <stop offset="1" stopColor="#F6E3AE" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pool">
          <stop offset="0" stopColor="#FFF3D6" stopOpacity=".5" />
          <stop offset="1" stopColor="#FFF3D6" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-50%" y="-10%" width="200%" height="120%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a2f5c" />
          <stop offset="1" stopColor="#06254A" />
        </linearGradient>
      </defs>
      <rect width="1000" height="900" fill="url(#sky)" />

      {/* far: distant monoliths */}
      <g className="px" style={px(110)}>
        {[[470, 480, 60], [560, 400, 50], [640, 520, 70], [940, 440, 60]].map(([x, y, w]) => (
          <rect key={x} x={x} y={y} width={w} height={FLOOR - y} fill="#0b2c55" />
        ))}
      </g>

      {/* mid: soft light falling from above onto the summit (screen-blended so it brightens, never greys) */}
      <g className="px" style={{ ...px(190), mixBlendMode: "screen" }}>
        <ellipse cx="885" cy="10" rx="430" ry="300" fill="url(#bloom)" />
        <g filter="url(#soft)">
          <polygon points="825,-40 935,-40 1070,520 700,520" fill="url(#beam)" opacity=".35" />
          <polygon points="858,-40 908,-40 968,410 772,410" fill="url(#beam)" />
        </g>
      </g>

      {/* near: stairway + professional */}
      <g className="px" style={px(300)}>
        {steps}
        <ellipse
          cx={X0 + W * (STEPS - 1) + W / 2 + DX / 2} cy={BASE - RISE * (STEPS - 1) - DY / 2}
          rx="50" ry="11" fill="url(#pool)" style={{ mixBlendMode: "screen" }}
        />
        <Professional />
      </g>
    </svg>
  );
}
