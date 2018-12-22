import Phaser from 'phaser';
import DroppedItem from '../sprites/DroppedItem';

export default class DroppedItemGenerator extends Phaser.Group {
  constructor(game) {
    super(game, undefined, 'droppedItemGenerator', false, true);
    this.game = game;
    this.types = ['banana', 'bomb'];
    this.droppedItemSpeed = 150;
    this.timeCreate = 1;
    this.droppedItemTimer = this.game.time.create(false);
    this.droppedItemTimer.start();
    this.scheduleDropping();
  }

  getPostionX(sprite) {
    const droppedItemWidth =
      sprite && sprite.body && sprite.body.halfWidth
        ? sprite.body.halfWidth
        : 60;
    return this.game.rnd.between(
      droppedItemWidth,
      this.game.width - droppedItemWidth,
    );
  }

  generateItems() {
    const quantity = 20;
    const offsetY = -30;
    for (let i = 0; i < quantity; i++) {
      const droppedItem = new DroppedItem(
        this.game,
        0,
        offsetY,
        this.game.rnd.pick(this.types),
      );
      droppedItem.position.x = this.getPostionX(droppedItem);
      droppedItem.scale.setTo(0.7);
      this.add(droppedItem);
    }
  }

  generate() {
    let droppedItem = this.game.rnd.pick(this.getAll('exists', false));
    const y = 0;
    if (!droppedItem) {
      this.generateItems();
      droppedItem = this.getFirstExists(true);
    } else {
      droppedItem.reset(this.getPostionX(droppedItem), y);
    }
    droppedItem.body.velocity.y = this.droppedItemSpeed;
  }

  scheduleDropping() {
    this.generate();
    this.droppedItemTimer.add(
      Phaser.Timer.SECOND / this.timeCreate,
      this.scheduleDropping,
      this,
    );
  }
}
