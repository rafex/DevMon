import Phaser from "phaser";
import { BootScene } from "../scenes/BootScene";
import { WorldScene } from "../scenes/WorldScene";
import { BattleScene } from "../scenes/BattleScene";
import { UIScene } from "../scenes/UIScene";

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 960,
  height: 540,
  backgroundColor: "#10131a",
  physics: { default: "arcade", arcade: { debug: false } },
  scene: [BootScene, WorldScene, BattleScene, UIScene]
};
