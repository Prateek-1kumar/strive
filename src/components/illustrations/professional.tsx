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

  // Arm in torso space: upper arm from the shoulder, forearm bends a little more as the arm swings forward.
  const arm = (a: number) => {
    const r = (a * Math.PI) / 180, f = r + ((10 + Math.max(0, a) * 0.7) * Math.PI) / 180;
    const sh: P = [0.5, -43], el: P = [sh[0] + 21 * Math.sin(r), sh[1] + 21 * Math.cos(r)];
    const wr: P = [el[0] + 19 * Math.sin(f), el[1] + 19 * Math.cos(f)];
    return { sh, el, wr, deg: (-f * 180) / Math.PI, grip: [wr[0] + 4 * Math.sin(f), wr[1] + 4 * Math.cos(f)] as P };
  };
  const drawArm = ({ sh, el, wr, deg }: ReturnType<typeof arm>, sleeve: string, skin: string) => (
    <>
      <path d={limb(sh, el, 3.3, 2.9)} fill={sleeve} />
      <path d={limb(el, wr, 2.9, 2.5)} fill={sleeve} />
      <g transform={`translate(${wr}) rotate(${deg})`}>
        <rect x="-2.3" y="-0.6" width="4.6" height="1.8" rx="0.6" fill="#FFFFFF" />
        <path d="M-2,1 Q-2.5,5 -0.6,6.4 Q1.9,6.8 2.4,3.8 L2.2,1Z" fill={skin} />
        <path d="M2.1,1.6 Q3.4,2.8 2.5,4.2" stroke={skin} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </g>
    </>
  );
  const far = arm(-swing), near = arm(swing);

  const leg = (i: number, cloth: string, crease: string) => {
    const lift = Math.min(1, Math.max(0, (ground(treadAt(feet[i][0])) - ANKLE - feet[i][1]) / 12)); // 0 planted → 1 airborne
    return (
      <g key={i}>
        <path d={limb(hip, knees[i], 7, 5.6)} fill={cloth} />
        <path d={limb(knees[i], feet[i], 5.5, 4.8)} fill={cloth} />
        <path d={`M${mix(hip, knees[i], 0.25)} L${knees[i]} L${mix(knees[i], feet[i], 0.85)}`} stroke={crease} strokeWidth=".8" fill="none" />
        {/* shoe over the trouser hem */}
        <g transform={`translate(${feet[i]}) rotate(${10 * lift}) scale(${S})`}>
          <path d="M-4.6,-2 Q-5,0.4 -4.6,2.3 H8.6 Q11,2.3 10.8,0.6 Q10.3,-1.2 6,-1.8 L2.5,-2.7 Q-1,-3.3 -4.6,-2Z" fill="#0b1a30" />
          <path d="M-4.8,2.2 H9.4 Q10.8,2.2 10.6,3 H-4.8Z" fill="#2c2219" />
          <path d="M3,-1.7 Q7.4,-1.3 9.6,0.2" stroke="#FFFFFF" strokeOpacity=".22" strokeWidth=".7" fill="none" />
        </g>
      </g>
    );
  };

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
        {/* far arm + briefcase (hangs upright from the hand) */}
        <g transform={`translate(${far.grip}) scale(.82)`}>
          <path d="M-4.5,3 V-0.6 Q-4.5,-1.6 -3.5,-1.6 H3.5 Q4.5,-1.6 4.5,-0.6 V3" stroke="#6b4f1c" strokeWidth="1.6" fill="none" />
          <rect x="-12.5" y="2.4" width="25" height="16.5" rx="1.8" fill="#9C7629" />
          <rect x="-12.5" y="2.4" width="25" height="4.2" rx="1.6" fill="#B88D35" />
          <rect x="-11" y="8" width="22" height="9.4" rx="1" fill="none" stroke="#86641F" strokeWidth=".5" strokeDasharray="1 .8" />
          <rect x="-1.6" y="5.2" width="3.2" height="2.6" rx=".5" fill="#E2C77A" />
          <rect x="-12.5" y="16.6" width="25" height="2.3" rx="1" fill="#7f5f22" />
        </g>
        {drawArm(far, "#D6CFC0", "#C9B597")}
      </g>
      {leg(1, "#B4A891", "#A39880")}
      {leg(0, "#CFC3AA", "#BDB198")}
      <g transform={`translate(${hip}) rotate(${lean}) scale(${S})`}>
        {/* jacket: body, back shading, pockets, buttons */}
        <path d="M-8.5,-38 Q-9,-46.5 -1,-46.5 H4 Q10,-46 10,-39 L11,-12 Q11.5,0 11,6.5 H-8.8 Q-9.6,-6 -8.8,-16Z" fill="#F8F6F1" />
        <path d="M-8.8,-16 Q-9.6,-6 -8.8,6.5 H-5.6 Q-6.4,-6 -5.8,-20Z" fill="#E7E2D6" />
        <path d="M-8.5,-38 Q-9,-46.5 -1,-46.5 H1 Q-5,-45 -6.2,-38Z" fill="#E7E2D6" />
        <path d="M2.8,-7.5 H9.8 M5,-33 H8.8" stroke="#DAD3C5" strokeWidth=".9" />
        <circle cx="10.4" cy="-21.5" r=".75" fill="#C6BCA8" />
        <circle cx="10.7" cy="-14.5" r=".75" fill="#C6BCA8" />
        {/* shirt collar, tie, lapel */}
        <path d="M-2.4,-47.6 Q1,-49.6 5,-47 L4.6,-45 Q1,-46.6 -2.2,-45.6Z" fill="#FFFFFF" />
        <path d="M3.6,-47 L9.9,-44.2 L8.8,-36Z" fill="#FFFFFF" />
        <path d="M7.6,-45 H9.7 L9.5,-42.7 H7.8Z" fill="#B08A3B" />
        <path d="M7.8,-42.7 H9.5 L10.7,-28 L9.5,-25.4 L8.4,-28Z" fill="#C9A24A" />
        <path d="M3.8,-46.6 L9,-38.5 L7.4,-37.2 L10.3,-30" stroke="#D3CCBD" strokeWidth=".9" strokeLinejoin="round" fill="none" />
        {/* neck, head in profile, ear, face, hair */}
        <path d="M-1.6,-52 H4 L4.6,-45.6 H-1.2Z" fill="#C9B597" />
        <path
          d="M-5.5,-60 Q-6,-68.5 2,-68.5 Q8.6,-68.5 9.2,-62.5 L9.4,-60.6 L11.4,-57.4 L9.6,-56.6 L9.9,-55.2 L9.4,-54.4 L9.8,-53.2 Q9.6,-51 6.8,-50.8 Q4,-50.6 2.5,-51.8 L-1,-51.8 Q-5,-53.5 -5.5,-60Z"
          fill="#D8CBB5"
        />
        <path d="M2.5,-51.8 Q5,-51.2 6.8,-50.8" stroke="#C4AF92" strokeWidth=".6" fill="none" />
        <ellipse cx="0.8" cy="-58.2" rx="1.6" ry="2.3" fill="#CDB89C" />
        <path d="M1.2,-59.6 Q0.1,-58.2 1.1,-56.8" stroke="#B49C7E" strokeWidth=".5" fill="none" />
        <ellipse cx="7.3" cy="-59.5" rx=".55" ry=".75" fill="#2a211b" />
        <path d="M5.8,-61.7 Q7.4,-62.4 8.9,-61.6" stroke="#3a2f27" strokeWidth=".8" strokeLinecap="round" fill="none" />
        <path d="M8.5,-54.4 H9.4" stroke="#B0967A" strokeWidth=".5" />
        <path
          d="M-6,-59 Q-7.5,-69.6 2.5,-69.6 Q9.6,-69.7 9.8,-63.5 Q8.4,-65 6.5,-64.6 Q4,-64.3 2.5,-63.4 L1.7,-58.8 Q0.8,-57.8 0,-58.9 L-0.4,-55.8 Q-3.6,-54.6 -5.4,-56Z"
          fill="#3a2f27"
        />
        <path d="M-2,-67.7 Q2.5,-69.1 6.6,-67.6" stroke="#5c4a3c" strokeWidth=".9" strokeLinecap="round" fill="none" />
        {drawArm(near, "#EFEBE1", "#D8CBB5")}
      </g>
    </g>
  );
}

type P = [number, number];
const mix = (a: P, b: P, u: number): P => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
// Tapered limb from a (radius r1) to b (radius r2) with rounded ends.
const limb = ([ax, ay]: P, [bx, by]: P, r1: number, r2: number) => {
  const l = Math.hypot(bx - ax, by - ay) || 1, nx = (ay - by) / l, ny = (bx - ax) / l;
  return `M${ax + nx * r1},${ay + ny * r1} L${bx + nx * r2},${by + ny * r2} A${r2},${r2} 0 0 0 ${bx - nx * r2},${by - ny * r2} L${ax - nx * r1},${ay - ny * r1} A${r1},${r1} 0 0 0 ${ax + nx * r1},${ay + ny * r1}Z`;
};
