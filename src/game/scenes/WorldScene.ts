import Phaser from "phaser";
import { createCursorKeys } from "../systems/input/InputSystem";
import { movePlayer } from "../systems/world/MovementSystem";
import { shouldTriggerEncounter } from "../systems/world/EncounterSystem";
import { EventBus } from "../infra/EventBus";
import { Random } from "../infra/Random";
import type { Enemy } from "../domain/entities/Enemy";
import pmEnemy from "../data/enemies/pm.json";
import devEnemy from "../data/enemies/developer.json";

const ENEMIES = [pmEnemy, devEnemy] as const;

export class WorldScene extends Phaser.Scene {
  private playerSprite!: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super("WorldScene");
  }

  create(): void {
    const g = this.add.graphics();
    g.fillStyle(0x4f7942, 1);
    g.fillRect(0, 0, this.scale.width, this.scale.height);

    const texture = this.textures.createCanvas("player-box", 24, 24);
    const ctx = texture?.getContext();
    if (ctx) {
      ctx.fillStyle = "#5cd1ff";
      ctx.fillRect(0, 0, 24, 24);
      texture?.refresh();
    }

    this.playerSprite = this.physics.add.sprite(120, 120, "player-box");
    this.playerSprite.setCollideWorldBounds(true);
    this.cursors = createCursorKeys(this);

    this.input.keyboard?.on("keydown-SPACE", () => this.startBattle());
    EventBus.emit("world:hint", "Muevete con flechas. SPACE inicia encuentro.");
  }

  update(): void {
    movePlayer(this.playerSprite, this.cursors);

    if (shouldTriggerEncounter(Math.random(), 0.0008)) {
      this.startBattle();
    }
  }

  private startBattle(): void {
    const baseEnemy = Random.pick([...ENEMIES]);
    const enemy: Enemy = {
      ...baseEnemy,
      currentFocus: baseEnemy.stats.focus,
      currentEnergy: baseEnemy.stats.energy
    };

    this.scene.pause();
    this.scene.launch("BattleScene", { enemy });
  }
}
