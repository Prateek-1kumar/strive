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

function Professional() {
  const x = X0 + W * PRO_STEP + W / 2 + DX / 2;
  const y = BASE - RISE * PRO_STEP - DY / 2;
  return (
    <g transform={`translate(${x} ${y}) scale(1.35)`}>
      <ellipse cx="-12" cy="1" rx="30" ry="4" fill="#06254a" fillOpacity=".4" />
      {/* trousers + shoes */}
      <path d="M-9,-50 L-0.5,-50 L-1.5,-4 L-8,-4Z" fill="#CFC3AA" />
      <path d="M0.5,-50 L9,-50 L8,-4 L2,-4Z" fill="#B9AD96" />
      <path d="M-9,-4 H-0.5 Q2,-3 2,0 H-9Z M2,-4 H8 Q11,-3 11,0 H2Z" fill="#0b1a30" />
      {/* far arm, jacket, shirt, tie */}
      <rect x="9" y="-92" width="6" height="42" rx="3" fill="#D8D1C1" />
      <path d="M-12,-88 Q-12,-95 -5,-95 H5 Q12,-95 12,-88 L11,-46 H-11Z" fill="#F8F6F1" />
      <path d="M-4,-95 L0,-74 L4,-95Z" fill="#D8CBB5" />
      <path d="M-4,-95 L-1,-72 M4,-95 L1,-72" stroke="#B9AD96" strokeWidth="1" fill="none" />
      <path d="M-1.8,-92 H1.8 L2.3,-72 L0,-66 L-2.3,-72Z" fill="#C9A24A" />
      <line x1="0" y1="-64" x2="0" y2="-46" stroke="#B9AD96" strokeWidth="1" />
      {/* near arm + briefcase */}
      <rect x="-16" y="-92" width="6" height="42" rx="3" fill="#EAE5D8" />
      <circle cx="-13" cy="-48" r="3.4" fill="#D8CBB5" />
      <rect x="-26" y="-34" width="26" height="18" rx="2" fill="#A9822F" />
      <rect x="-26" y="-34" width="26" height="4" rx="2" fill="#C9A24A" />
      <path d="M-17,-34 V-38 H-9 V-34" stroke="#7a5d22" strokeWidth="1.6" fill="none" />
      {/* head */}
      <rect x="-2.5" y="-99" width="5" height="6" fill="#CDB89C" />
      <ellipse cx="0" cy="-106" rx="8" ry="9.5" fill="#D8CBB5" />
      <path d="M-8.2,-106 Q-9,-117 0,-117 Q9,-117 8.2,-106 Q4,-111 -2,-110 Q-6,-109 -8.2,-106Z" fill="#3a2f27" />
    </g>
  );
}

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
        <Professional />
      </g>
    </svg>
  );
}
