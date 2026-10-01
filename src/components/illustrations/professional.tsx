"use client";

import { useEffect, useState } from "react";
import { pose, DURATION, S, ANKLE, ground, treadAt } from "./climb";

// Flat-editorial professional in profile, climbing once on load from step two to the summit (see climb.ts).
export function Professional() {
  const [t, setT] = useState(0);

  useEffect(() => {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches; // reduced motion: straight to the summit
    let raf = 0, start = 0;
    const tick = (now: number) => {
      start ||= now;
      const s = still ? DURATION : Math.min(DURATION, Math.max(0, (now - start) / 1000 - 0.6)); // brief beat on step two first
      setT(s);
      if (s < DURATION) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const { hip, feet, knees, lean, swing } = pose(t);
  const arm = (a: number, color: string, hand: string) => {
    const r = (a * Math.PI) / 180, hx = 34 * Math.sin(r), hy = -42 + 34 * Math.cos(r);
    return { hx, hy, el: (
      <>
        <line x1="0" y1="-42" x2={hx} y2={hy} stroke={color} strokeWidth="6" strokeLinecap="round" />
        <circle cx={hx} cy={hy} r="3.2" fill={hand} />
      </>
    ) };
  };
  const far = arm(-swing, "#D8D1C1", "#CDB89C"), near = arm(swing, "#EAE5D8", "#D8CBB5");
  const leg = (i: number, color: string) => (
    <g key={i}>
      <polyline
        points={[hip, knees[i], feet[i]].join(" ")}
        fill="none" stroke={color} strokeWidth={8.5 * S} strokeLinecap="round" strokeLinejoin="round"
      />
      <path transform={`translate(${feet[i]}) scale(${S})`} d="M-4.5,-1.5 H4 Q10,-1.5 10,3 H-4.5Z" fill="#0b1a30" />
    </g>
  );

  return (
    <g>
      {/* contact shadows fade as each foot lifts */}
      {feet.map(([x, y], i) => (
        <ellipse
          key={i} cx={x + 2.5 * S} cy={ground(treadAt(x))} rx={10 * S} ry={1.8 * S} fill="#06254a"
          fillOpacity={0.45 * Math.max(0, 1 - (ground(treadAt(x)) - ANKLE - y) / 10)}
        />
      ))}
      <g transform={`translate(${hip}) rotate(${lean}) scale(${S})`}>
        {/* far arm + briefcase */}
        <g transform={`translate(${far.hx} ${far.hy})`}>
          <path d="M-4,3 V-1 H4 V3" stroke="#7a5d22" strokeWidth="1.6" fill="none" />
          <rect x="-12" y="2.5" width="24" height="16" rx="2" fill="#A9822F" />
          <rect x="-12" y="2.5" width="24" height="3.5" rx="1.5" fill="#C9A24A" />
        </g>
        {far.el}
      </g>
      {leg(1, "#B9AD96")}
      {leg(0, "#CFC3AA")}
      <g transform={`translate(${hip}) rotate(${lean}) scale(${S})`}>
        {/* jacket, shirt, tie */}
        <path d="M-8,-38 Q-8,-46 -1,-46 H3 Q9,-46 9.5,-38 L10.5,5 H-8.5Z" fill="#F8F6F1" />
        <path d="M4,-46.5 L8.8,-44 L6.6,-39Z" fill="#D8CBB5" />
        <path d="M8,-44 H10 L10.8,-30 L9.4,-27 L8.4,-30Z" fill="#C9A24A" />
        <path d="M4,-46 L9.6,-33" stroke="#D8CBB5" strokeWidth="1" />
        {/* head */}
        <rect x="-1" y="-51" width="5" height="7" fill="#CDB89C" />
        <ellipse cx="2" cy="-58" rx="7.5" ry="9" fill="#D8CBB5" />
        <path d="M9,-60 L11.3,-56 L9.2,-55Z" fill="#D8CBB5" />
        <path d="M-5.6,-55 Q-7,-67.5 2,-67.5 Q9.6,-67.5 9.4,-61 Q6,-64 2.5,-63 Q0.5,-59 -1,-54 Q-4,-52.5 -5.6,-55Z" fill="#3a2f27" />
        <circle cx="0.5" cy="-57.5" r="1.7" fill="#CDB89C" />
        {near.el}
      </g>
    </g>
  );
}
