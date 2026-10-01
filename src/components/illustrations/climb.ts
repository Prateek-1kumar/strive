// Hero stairway geometry (SVG viewBox units) and the professional's one-time climb from step two to the top.
// Feet are either planted or swinging on arcs, the hip follows a smooth spline, legs are solved with two-bone IK.
// Stair size is set against his leg length (rise ≈ ⅓ leg) so the climb is an ordinary, unhurried stair walk.
export const STEPS = 9, W = 62, X0 = 332, RISE = 36, BASE = 700, DX = 38, DY = 22, FLOOR = 960;
export const S = 1.4; // figure scale (torso, shoes)
export const L1 = 53, L2 = 51, ANKLE = 4.5; // long legs (≈ half his height)
const HIP = ANKLE + L1 + L2 - 1.5; // standing hip height, knees soft
const FROM = 1, TO = STEPS - 1, T = 0.62, A = 8; // step two → top; seconds per step; foot's distance past a stair's nose

type P = [number, number];
export const ground = (n: number) => BASE - RISE * n - DY / 2; // tread surface at the figure's depth
export const treadAt = (x: number) => Math.floor((x - X0 - DX / 2) / W);
const at = (n: number): P => [X0 + W * n + DX / 2 + A, ground(n) - ANKLE]; // ankle when standing on stair n

// Left, right, left…: each step lands one stair above the other foot, and every swing after the first passes the
// support foot to go two stairs up. The hip glides up a line parallel to the stairs at constant speed; a foot lands
// LAND ahead of the hip and pushes off once the hip is OFF past it. A final short step brings the trailing foot up
// beside the other on the summit, settling to a stand. (Values from a search keeping both knees ≥ ~80°.)
const LAND = 60, OFF = 10, H = Math.sqrt((0.975 * (L1 + L2)) ** 2 - OFF ** 2) - (RISE / W) * OFF; // hip above the ankle line
const ramp = (x: number) => at(FROM)[1] - H - (RISE / W) * (x - at(FROM)[0]);
const SWING = (2 - (LAND + OFF) / W) * T; // seconds a foot is in the air when passing two stairs
const land = (k: number) => 0.2 + 0.75 * T + (k - 1) * T; // footfall on stair FROM + k
const path = (from: number, to: number): P[] => {
  const [x, y] = at(from), up = (n: number) => y - RISE * (n - from); // clear each nose by 4 with the toe
  const pts: P[] = [[x, y], [x + (W - A - 14) / 2, y - 0.75 * RISE]];
  for (let n = from + 1; n <= to; n++) pts.push([X0 + W * n + DX / 2 - 14, up(n) - 4]);
  return [...pts, at(to)];
};
const swings: { leg: number; t0: number; t1: number; pts: P[] }[] = [];
const hipKeys: number[][] = [[0, at(FROM)[0], ground(FROM) - HIP]]; // [t, x, y]
const K = TO - FROM;
for (let k = 1; k <= K; k++) {
  const n = FROM + k, x = at(n)[0] - LAND;
  swings.push({ leg: (k + 1) % 2, t0: k === 1 ? 0.2 : land(k) - SWING, t1: land(k), pts: path(Math.max(FROM, n - 2), n) });
  hipKeys.push([land(k), x, ramp(x)]);
}
swings.push({ leg: K % 2, t0: land(K) + (OFF - (W - LAND)) / W * T, t1: land(K) + 0.75 * T, pts: path(TO - 1, TO) });
export const DURATION = land(K) + 1.25 * T;
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

// Swinging foot: Catmull-Rom through its waypoints, eased so it leaves and lands softly.
const foot = (leg: number, t: number): P => {
  let f = at(FROM);
  for (const w of swings) {
    if (w.leg !== leg || t < w.t0) continue;
    if (t >= w.t1) { f = w.pts[w.pts.length - 1]; continue; }
    const q = w.pts, v = ease((t - w.t0) / (w.t1 - w.t0));
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

// Arms follow the stride, averaged over ~half a step so they flow rather than snap, with a soft limit (≈ ±12°).
// The near arm swings forward as the far leg leads.
const armSwing = (t: number) => {
  let sum = 0;
  for (let i = -4; i <= 4; i++) sum += foot(1, t + i * 0.06)[0] - foot(0, t + i * 0.06)[0];
  return 16 * Math.tanh(sum / 9 / 50);
};

export function pose(t: number) {
  const h = hip(t), vx = (hip(t + 0.02)[0] - hip(t - 0.02)[0]) / 0.04;
  const feet = [foot(0, t), foot(1, t)]; // 0 = near leg, 1 = far leg
  return {
    hip: h,
    feet,
    knees: feet.map((f) => knee(h, f)),
    lean: Math.min(3, Math.max(0, vx * 0.02)), // degrees forward into the step, upright at rest
    swing: armSwing(t), // degrees forward for the near arm (far arm mirrors)
  };
}
