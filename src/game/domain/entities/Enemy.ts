import type { Stats } from "../valueObjects/Stats";

export type EnemyType = "pm" | "manager" | "customer" | "developer";

export interface Enemy {
  id: string;
  name: string;
  type: EnemyType;
  currentFocus: number;
  currentEnergy: number;
  stats: Stats;
  skills: string[];
  aiProfile: "aggressive" | "control" | "defensive";
}
