import Phaser from "phaser";
import { EventBus } from "../infra/EventBus";

export class UIScene extends Phaser.Scene {
  private hintText!: Phaser.GameObjects.Text;

  constructor() {
    super("UIScene");
  }

  create(): void {
    this.hintText = this.add.text(16, 500, "", {
      fontFamily: "monospace",
      fontSize: "16px",
      color: "#ffffff"
    });
    EventBus.on("world:hint", (hint: string) => this.hintText.setText(hint));
  }
}
