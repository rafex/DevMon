import Phaser from "phaser";

export const movePlayer = (
  sprite: Phaser.Physics.Arcade.Sprite,
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined,
  speed = 180
): void => {
  sprite.setVelocity(0);
  if (!cursors) return;
  if (cursors.left?.isDown) sprite.setVelocityX(-speed);
  if (cursors.right?.isDown) sprite.setVelocityX(speed);
  if (cursors.up?.isDown) sprite.setVelocityY(-speed);
  if (cursors.down?.isDown) sprite.setVelocityY(speed);
};
