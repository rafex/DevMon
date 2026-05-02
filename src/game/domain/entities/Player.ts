import type { Stats } from "../valueObjects/Stats";

export interface Player {
  id: string;
  name: string;
  level: number;
  xp: number;
  currentFocus: number;
  currentEnergy: number;
  stats: Stats;
}

export const createPlayer = (): Player => ({
  id: "player-rafa",
  name: "Rafa",
  level: 1,
  xp: 0,
  currentFocus: 100,
  currentEnergy: 60,
  stats: {
    focus: 100,
    energy: 60,
    logic: 16,
    communication: 12,
    speed: 10,
    stress: 0
  }
});
