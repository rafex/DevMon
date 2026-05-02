import type { Player } from "../../domain/entities/Player";
import type { Enemy } from "../../domain/entities/Enemy";
import { getActionDamage } from "./DamageSystem";

export const playerAttack = (player: Player, enemy: Enemy): number => {
  const damage = getActionDamage(player.stats.logic, enemy.stats.communication, 1.1);
  enemy.currentFocus = Math.max(0, enemy.currentFocus - damage);
  return damage;
};

export const enemyAttack = (enemy: Enemy, player: Player): number => {
  const damage = getActionDamage(enemy.stats.logic, player.stats.communication, 1);
  player.currentFocus = Math.max(0, player.currentFocus - damage);
  return damage;
};
