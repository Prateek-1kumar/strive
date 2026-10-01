// Hero stairway geometry (SVG viewBox units) and the professional's one-time climb from step two to the top.
// Feet are either planted or swinging on arcs, the hip follows a smooth spline, legs are solved with two-bone IK.
export const STEPS = 7, W = 80, X0 = 330, RISE = 62, BASE = 780, DX = 38, DY = 22, FLOOR = 960;
export const S = 1.3; // figure scale
export const L1 = 24 * S, L2 = 23 * S, ANKLE = 3 * S; // thigh, shin, ankle height
const HIP = ANKLE + L1 + L2 - 1.5; // standing hip height, knees soft
const FROM = 1, TO = STEPS - 1, C = 1.1; // step two → top, seconds per stair
export const DURATION = (TO - FROM) * C;

type P = [number, number];
export const ground = (n: number) => BASE - RISE * n - DY / 2; // tread surface at the figure's depth
export const treadAt = (x: number) => Math.floor((x - X0 - DX / 2) / W);
const stand = (n: number) => X0 + W * n + DX / 2 + 18; // just past the stair's nose

const hipKeys: number[][] = []; // [t, x, y]
const swings: { leg: number; t0: number; t1: number; a: P; b: P; lead?: boolean }[] = [];
const feet0: P[] = [[stand(FROM) - 4, ground(FROM) - ANKLE], [stand(FROM) + 4, ground(FROM) - ANKLE]];
const pos = feet0.slice();
for (let k = 0; k < TO - FROM; k++) {
  const n = FROM + k, t = k * C, p = stand(n), lo = ground(n) - ANKLE, hi = ground(n + 1) - ANKLE;
  // two short steps up to the riser (lead foot lands in front), lead knee lifts onto the next stair, the other follows
  const lead = k % 2, other = 1 - lead, rear = pos[0][0] < pos[1][0] ? 0 : 1, front = 1 - rear;
  const to = (leg: number): P => [leg === lead ? p + 36 : p + 28, lo];
  swings.push(
    { leg: rear, t0: t, t1: t + 0.2 * C, a: pos[rear], b: to(rear) },
    { leg: front, t0: t + 0.22 * C, t1: t + 0.4 * C, a: pos[front], b: to(front) },
    { leg: lead, t0: t + 0.42 * C, t1: t + 0.63 * C, a: to(lead), b: [p + 84, hi], lead: true },
    { leg: other, t0: t + 0.64 * C, t1: t + 0.95 * C, a: to(other), b: [p + 76, hi] },
  );
  pos[lead] = [p + 84, hi];
  pos[other] = [p + 76, hi];
  const y = ground(n) - HIP;
  hipKeys.push(
    [t, p, y], [t + 0.2 * C, (to(rear)[0] + p + 4) / 2, y + 2], [t + 0.4 * C, p + 32, y + 1],
    [t + 0.66 * C, p + 38, y + 4], [t + 0.76 * C, p + 50, y - 34], [t + 0.88 * C, p + 72, y - RISE + 2],
  );
}
hipKeys.push([DURATION, stand(TO), ground(TO) - HIP]);

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

const foot = (leg: number, t: number): P => {
  let f = feet0[leg];
  for (const w of swings) {
    if (w.leg !== leg || t < w.t0) continue;
    if (t >= w.t1) { f = w.b; continue; }
    const u = (t - w.t0) / (w.t1 - w.t0), [ax, ay] = w.a, [bx, by] = w.b, lift = 9 * Math.sin(Math.PI * u);
    if (by === ay) return [ax + (bx - ax) * ease(u), ay - lift];
    // lead foot is ahead of the hip: knee lifts it up first, then it reaches over the nose
    if (w.lead) return [ax + (bx - ax) * ease(Math.max(0, (u - 0.3) / 0.7)), ay + (by - ay) * ease(Math.min(1, u / 0.6)) - lift];
    // trailing foot comes through under the hip (knee forward, slightly tucked) as the body rises, then plants
    const [hx, hy] = hip(t), hang = 50 - 16 * Math.sin(Math.PI * u), e1 = ease(Math.min(1, u / 0.35)), e2 = ease(Math.max(0, (u - 0.65) / 0.35));
    const x = ax + (hx - 6 - ax) * e1, y = Math.min(ay, ay + (hy + hang - ay) * e1);
    return [x + (bx - x) * e2, y + (by - y) * e2];
  }
  return f;
};

const knee = ([hx, hy]: P, [ax, ay]: P): P => {
  const d = Math.min(Math.hypot(ax - hx, ay - hy), L1 + L2 - 0.01);
  const a = Math.atan2(ay - hy, ax - hx) - Math.acos(Math.min(1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d))); // knee forward
  return [hx + L1 * Math.cos(a), hy + L1 * Math.sin(a)];
};

export function pose(t: number) {
  const h = hip(t), [px, py] = hip(t - 0.02), [nx, ny] = hip(t + 0.02);
  const vx = (nx - px) / 0.04, vy = (ny - py) / 0.04;
  const feet = [foot(0, t), foot(1, t)]; // 0 = near leg, 1 = far leg
  return {
    hip: h,
    feet,
    knees: feet.map((f) => knee(h, f)),
    lean: Math.min(3, Math.max(0, vx * 0.04)) + Math.min(7, Math.max(0, -vy * 0.05)), // degrees forward
    swing: Math.max(-20, Math.min(20, (feet[1][0] - feet[0][0]) * 0.5)), // near arm swings with the far leg
  };
}
