// node src/components/illustrations/climb.check.mjs — the climb never overstretches a leg, clips a stair or floats.
import assert from "node:assert";
import { pose, DURATION, L1, L2, S, ANKLE, X0, W, DX, ground, treadAt } from "./climb.ts";

for (let t = 0; t <= DURATION; t += 0.005) {
  const { hip, feet } = pose(t);
  let planted = 0;
  for (const [x, y] of feet) {
    assert(Math.hypot(x - hip[0], y - hip[1]) <= L1 + L2 + 0.5, `leg overstretched at t=${t.toFixed(3)}`);
    for (const sx of [x - 4.5 * S, x + 10 * S]) {
      const n = treadAt(sx), sole = y + ANKLE;
      assert(sole <= ground(n) + 0.5, `shoe clips stair ${n} at t=${t.toFixed(3)} (x=${sx.toFixed(1)})`);
    }
    if (Math.abs(y + ANKLE - ground(treadAt(x))) < 0.01) planted++;
  }
  assert(planted > 0, `both feet airborne at t=${t.toFixed(3)}`);
}
const end = pose(DURATION);
assert(treadAt(end.hip[0]) === 6 && end.hip[0] > X0 + W * 6 + DX / 2, "ends on the top step");
console.log("climb ok");
