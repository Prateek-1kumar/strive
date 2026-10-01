import { Professional } from "@/components/illustrations/professional";

// Flat-editorial stairway with a luminous glow above. Layers (.px) drift at different speeds on scroll — see globals.css.
const STEPS = 7;
const W = 80, X0 = 330, RISE = 62, BASE = 780, DX = 38, DY = 22, FLOOR = 960;
const PRO_STEP = 4; // step the professional stands on

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
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#F4E2AE" stopOpacity=".55" />
          <stop offset=".35" stopColor="#E3C06E" stopOpacity=".24" />
          <stop offset="1" stopColor="#C9A24A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shaft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F1DC9C" stopOpacity=".2" />
          <stop offset="1" stopColor="#F1DC9C" stopOpacity="0" />
        </linearGradient>
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

      {/* mid: luminous glow at the top, light falling toward the summit */}
      <g className="px" style={px(190)}>
        <polygon points="820,60 960,60 1040,440 740,440" fill="url(#shaft)" />
        <ellipse cx="890" cy="150" rx="440" ry="320" fill="url(#halo)" />
        <ellipse cx="890" cy="140" rx="190" ry="130" fill="url(#halo)" />
      </g>

      {/* near: stairway + professional */}
      <g className="px" style={px(300)}>
        {steps}
        <Professional
          x={X0 + W * PRO_STEP + W / 2 + DX / 2}
          y={BASE - RISE * PRO_STEP - DY / 2}
          scale={1.35}
        />
      </g>
    </svg>
  );
}
