import { describe, expect, it } from "vitest";
import { levelFromXp, xpForWin } from "../game/domain/rules/xp";

describe("xp rules", () => {
  it("gives base xp plus enemy level bonus", () => {
    expect(xpForWin(3)).toBe(50);
  });

  it("levels up every 100 xp", () => {
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(199)).toBe(2);
    expect(levelFromXp(200)).toBe(3);
  });
});
