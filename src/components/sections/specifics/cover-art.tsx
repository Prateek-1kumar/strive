import type { Specific } from "@/content/site";

// Line drawings made for each cover. Every mark is plotted, not sourced.

function Psychology() {
  // Nested, slightly offset contours — the layered interior of a mind.
  const rings = Array.from({ length: 11 }, (_, i) => i);
  return (
    <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
      {rings.map((i) => (
        <ellipse
          key={i}
          cx={150 + i * 3.2}
          cy={150 - i * 1.6}
          rx={118 - i * 10}
          ry={92 - i * 7.4}
          stroke={i === 6 ? "var(--color-gold)" : "currentColor"}
          strokeOpacity={i === 6 ? 1 : 0.18 + i * 0.045}
          className="[transform:rotate(var(--a))] transition-transform duration-[1.4s] ease-editorial group-hover:[transform:rotate(var(--b))]"
          style={{
            ["--a" as string]: `${-14 + i * 2.2}deg`,
            ["--b" as string]: `${-10 + i * 3}deg`,
            transformOrigin: "150px 150px",
          }}
        />
      ))}
    </g>
  );
}

function Research() {
  // A field of observations, and the line of best fit drawn through them.
  const dots: [number, number, boolean][] = [];
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const x = 40 + c * 20;
      const y = 40 + r * 20;
      const onFinding = Math.abs(y - (250 - (x - 40) * 0.72)) < 11;
      dots.push([x, y, onFinding]);
    }
  }
  return (
    <g>
      {dots.map(([x, y, hit]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={hit ? 2.4 : 1.3}
          fill={hit ? "var(--color-ink)" : "currentColor"}
          fillOpacity={hit ? 1 : 0.28}
        />
      ))}
      <line
        x1="28"
        y1="259"
        x2="272"
        y2="83"
        stroke="var(--color-gold-deep)"
        strokeWidth="1"
        strokeDasharray="302"
        className="group-hover:[animation:strive-draw_1.4s_var(--ease-editorial)]"
      />
      <text x="276" y="80" fontSize="18" fill="var(--color-gold-deep)" fontFamily="var(--font-serif)">
        †
      </text>
    </g>
  );
}

function Growth() {
  // Rules of rising height, each a little longer than the last.
  const bars = Array.from({ length: 14 }, (_, i) => i);
  return (
    <g>
      {bars.map((i) => {
        const h = 18 + Math.pow(i, 1.55) * 4.6;
        const x = 46 + i * 15.5;
        return (
          <line
            key={i}
            x1={x}
            x2={x}
            y1={256}
            y2={256 - h}
            stroke={i === 13 ? "var(--color-gold-deep)" : "currentColor"}
            strokeOpacity={i === 13 ? 1 : 0.22 + i * 0.045}
            strokeWidth="1"
            className="origin-bottom transition-transform duration-[1s] ease-editorial group-hover:scale-y-[1.06]"
            style={{ transformBox: "fill-box", transitionDelay: `${i * 25}ms` }}
          />
        );
      })}
      <line x1="36" x2="264" y1="256.5" y2="256.5" stroke="currentColor" strokeOpacity=".4" />
      <path
        d="M247.5 30c.5 6.5 1.7 10 8 10.9-6.3.9-7.5 4.4-8 10.9-.5-6.5-1.7-10-8-10.9 6.3-.9 7.5-4.4 8-10.9Z"
        fill="var(--color-gold-deep)"
      />
    </g>
  );
}

export function CoverArt({ art }: { art: Specific["art"] }) {
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden="true">
      {art === "psychology" && <Psychology />}
      {art === "research" && <Research />}
      {art === "growth" && <Growth />}
    </svg>
  );
}
