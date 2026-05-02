import { describe, expect, it } from "vitest";
import { calculateDamage } from "../game/domain/rules/damage";

describe("calculateDamage", () => {
  it("never returns less than 4", () => {
    expect(calculateDamage(1, 40)).toBe(4);
  });

  it("scales with logic advantage", () => {
    expect(calculateDamage(20, 5)).toBeGreaterThan(calculateDamage(10, 5));
  });
});
