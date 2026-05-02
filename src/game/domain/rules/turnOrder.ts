import type { Player } from "../entities/Player";
import type { Enemy } from "../entities/Enemy";

export const playerStarts = (player: Player, enemy: Enemy): boolean => {
  return player.stats.speed >= enemy.stats.speed;
};
