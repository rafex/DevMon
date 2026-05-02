import Phaser from "phaser";
import { Logger } from "../infra/Logger";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create(): void {
    Logger.info("Boot complete");
    this.scene.start("UIScene");
    this.scene.start("WorldScene");
  }
}
