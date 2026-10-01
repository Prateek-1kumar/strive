// Hero stairway geometry (SVG viewBox units) and the professional's one-time climb from step two to the top.
// Feet are either planted or swinging on arcs, the hip follows a smooth spline, legs are solved with two-bone IK.
export const STEPS = 7, W = 80, X0 = 330, RISE = 62, BASE = 780, DX = 38, DY = 22, FLOOR = 960;
export const S = 1.4; // figure scale (torso, shoes)
export const L1 = 50, L2 = 48, ANKLE = 4.5; // long legs (≈ half his height)
const HIP = ANKLE + L1 + L2 - 1.5; // standing hip height, knees soft
const FROM = 1, TO = STEPS - 1, C = 1.2, A = 8; // step two → top; seconds per stair; foot's distance past a stair's nose

type P = [number, number];
export const ground = (n: number) => BASE - RISE * n - DY / 2; // tread surface at the figure's depth
export const treadAt = (x: number) => Math.floor((x - X0 - DX / 2) / W);
const at = (n: number): P => [X0 + W * n + DX / 2 + A, ground(n) - ANKLE]; // ankle when standing on stair n

// One deliberate step per stair, body tall throughout (no knee folds past ~90°): standing on stair n, the lead foot
// reaches forward and up onto n+1, the body rises over it while the other foot comes up beneath and plants beside it.
// Lead legs alternate per stair.
const swings: { leg: number; t0: number; t1: number; pts: P[]; follow?: boolean }[] = [];
const hipKeys: number[][] = []; // [t, x, y]
for (let k = 0; k < TO - FROM; k++) {
  const n = FROM + k, t = k * C, [x, lo] = at(n), hi = at(n + 1)[1], lead = k % 2;
  swings.push(
    { leg: lead, t0: t + 0.05 * C, t1: t + 0.42 * C, pts: [[x, lo], [x + 30, lo - 22], [x + 62, lo - 70], [x + W, hi]] },
    { leg: 1 - lead, t0: t + 0.44 * C, t1: t + 0.86 * C, pts: [[x, lo], [x + W, hi]], follow: true },
  );
  const y = ground(n) - HIP;
  hipKeys.push([t, x, y], [t + 0.2 * C, x - 5, y], [t + 0.44 * C, x - 3, y], [t + 0.62 * C, x + 25, y - 39]);
}
export const DURATION = (TO - FROM) * C;
hipKeys.push([DURATION, at(TO)[0], ground(TO) - HIP]);

// Cubic Hermite through the keys; tangents flatten where motion turns (no overshoot) and at the ends (starts, stops at rest).
const hip = (t: number): P => {
  const K = hipKeys;
  let i = 0;
  while (i < K.length - 2 && t > K[i + 1][0]) i++;
  const h = K[i + 1][0] - K[i][0], u = Math.min(1, Math.max(0, (t - K[i][0]) / h)), u2 = u * u, u3 = u2 * u;
  const m = (j: number, d: number) =>
    j === 0 || j === K.length - 1 || (K[j][d] - K[j - 1][d]) * (K[j + 1][d] - K[j][d]) <= 0 ? 0 : (K[j + 1][d] - K[j - 1][d]) / (K[j + 1][0] - K[j - 1][0]);
  const at = (d: number) =>
    (2 * u3 - 3 * u2 + 1) * K[i][d] + (u3 - 2 * u2 + u) * h * m(i, d) + (3 * u2 - 2 * u3) * K[i + 1][d] + (u3 - u2) * h * m(i + 1, d);
  return [at(1), at(2)];
};

const ease = (u: number) => u * u * (3 - 2 * u);

// Lead foot: Catmull-Rom through its waypoints. Follow foot: hangs beneath the rising hip, then plants.
const foot = (leg: number, t: number): P => {
  let f = at(FROM);
  for (const w of swings) {
    if (w.leg !== leg || t < w.t0) continue;
    if (t >= w.t1) { f = w.pts[w.pts.length - 1]; continue; }
    const q = w.pts, r = (t - w.t0) / (w.t1 - w.t0), v = ease(r);
    if (w.follow) {
      const [[ax, ay], [bx, by]] = q, [hx, hy] = hip(t), e1 = ease(Math.min(1, r / 0.3)), e2 = ease(Math.max(0, (r - 0.6) / 0.4));
      const x = ax + (hx - 10 - ax) * e1, y = Math.min(ay, ay + (hy + 0.78 * (L1 + L2) - ay) * e1);
      return [x + (bx - x) * e2, y + (by - y) * e2];
    }
    const s = v * (q.length - 1), i = Math.min(q.length - 2, Math.floor(s)), u = s - i;
    const p0 = q[Math.max(0, i - 1)], p1 = q[i], p2 = q[i + 1], p3 = q[Math.min(q.length - 1, i + 2)];
    return [0, 1].map((d) =>
      0.5 * (2 * p1[d] + (p2[d] - p0[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u * u + (3 * p1[d] - p0[d] - 3 * p2[d] + p3[d]) * u * u * u),
    ) as P;
  }
  return f;
};

const knee = ([hx, hy]: P, [ax, ay]: P): P => {
  const d = Math.min(Math.hypot(ax - hx, ay - hy), L1 + L2 - 0.01);
  const a = Math.atan2(ay - hy, ax - hx) - Math.acos(Math.min(1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d))); // knee forward
  return [hx + L1 * Math.cos(a), hy + L1 * Math.sin(a)];
};

export function pose(t: number) {
  const h = hip(t), vx = (hip(t + 0.02)[0] - hip(t - 0.02)[0]) / 0.04;
  const feet = [foot(0, t), foot(1, t)]; // 0 = near leg, 1 = far leg
  return {
    hip: h,
    feet,
    knees: feet.map((f) => knee(h, f)),
    lean: Math.min(3, Math.max(0, vx * 0.02)), // degrees forward into the step, upright at rest
    swing: Math.max(-20, Math.min(20, (feet[1][0] - feet[0][0]) * 0.5)), // near arm swings with the far leg
  };
}
