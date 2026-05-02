import Phaser from "phaser";
import type { Enemy } from "../domain/entities/Enemy";
import { createPlayer, type Player } from "../domain/entities/Player";
import { enemyAttack, playerAttack } from "../systems/battle/BattleSystem";
import { applyVictoryRewards } from "../systems/battle/RewardSystem";
import { EventBus } from "../infra/EventBus";

export class BattleScene extends Phaser.Scene {
  private enemy!: Enemy;
  private player: Player = createPlayer();
  private logText!: Phaser.GameObjects.Text;

  constructor() {
    super("BattleScene");
  }

  init(data: { enemy: Enemy }): void {
    this.enemy = data.enemy;
  }

  create(): void {
    this.add.rectangle(480, 270, 960, 540, 0x20141b, 0.95);
    this.logText = this.add.text(30, 30, "", {
      color: "#f2f2f2",
      fontSize: "18px",
      fontFamily: "monospace"
    });

    this.refreshLog(`Encuentro contra ${this.enemy.name}.\n[A] atacar, [C] coffee break, [ESC] huir`);

    this.input.keyboard?.on("keydown-A", () => this.onPlayerAttack());
    this.input.keyboard?.on("keydown-C", () => this.onCoffeeBreak());
    this.input.keyboard?.on("keydown-ESC", () => this.endBattle("Huiste del combate."));
  }

  private onPlayerAttack(): void {
    const dealt = playerAttack(this.player, this.enemy);
    if (this.enemy.currentFocus <= 0) {
      const rewards = applyVictoryRewards(this.player.xp, 1);
      this.endBattle(`Ganaste. +${rewards.gainedXp} XP (total ${rewards.totalXp}).`);
      return;
    }

    const taken = enemyAttack(this.enemy, this.player);
    if (this.player.currentFocus <= 0) {
      this.endBattle("Perdiste el encuentro. Respiras y vuelves al mundo.");
      return;
    }

    this.refreshLog(
      `Atacaste por ${dealt}. ${this.enemy.name} tiene ${this.enemy.currentFocus} Focus.\n` +
        `${this.enemy.name} contraataco por ${taken}. Te quedan ${this.player.currentFocus} Focus.`
    );
  }

  private onCoffeeBreak(): void {
    this.player.currentFocus = Math.min(this.player.stats.focus, this.player.currentFocus + 10);
    this.refreshLog(`Coffee Break: recuperaste Focus. Actual: ${this.player.currentFocus}.`);
  }

  private refreshLog(text: string): void {
    this.logText.setText(text);
  }

  private endBattle(message: string): void {
    EventBus.emit("world:hint", message);
    this.scene.stop();
    this.scene.resume("WorldScene");
  }
}
