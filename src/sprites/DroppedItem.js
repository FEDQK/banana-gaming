import Phaser from 'phaser';

export default class DroppedItem extends Phaser.Sprite {
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }

  kill() {
    super.kill();
  }
}
