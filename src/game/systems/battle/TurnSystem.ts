import type { Player } from "../../domain/entities/Player";
import type { Enemy } from "../../domain/entities/Enemy";
import { playerStarts } from "../../domain/rules/turnOrder";

export const initialTurn = (player: Player, enemy: Enemy): "player" | "enemy" =>
  playerStarts(player, enemy) ? "player" : "enemy";
