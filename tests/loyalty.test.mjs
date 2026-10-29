import test from "node:test";
import assert from "node:assert/strict";
import { calculateLoyaltyPoints } from "../lib/loyalty.ts";

test("calculateLoyaltyPoints calculates standard 1 point per 10k VND", () => {
  assert.equal(calculateLoyaltyPoints(50000), 5);
  assert.equal(calculateLoyaltyPoints(0), 0);
  assert.equal(calculateLoyaltyPoints(-1000), 0);
});

test("calculateLoyaltyPoints applies tier multiplier", () => {
  assert.equal(calculateLoyaltyPoints(100000, 1.5), 15);
});
