import Phaser from 'phaser';

const RUNNING_SPEED = 180;

export default class extends Phaser.Sprite {
  constructor(game, x, y, asset, frame) {
    super(game, x, y, asset, frame);
    this.game = game;
    this.anchor.setTo(0.5);
    this.initAnimation();
    this.addPhysicsToPlayer();
    this.createSound();
    this.game.add.existing(this);
  }

  update() {
    if (this.game.input.activePointer.isDown) {
      const targetX = this.game.input.activePointer.position.x;
      const direction = targetX >= this.game.world.centerX ? 1 : -1;
      this.move(direction);
    } else if (
      this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ||
      this.game.input.keyboard.isDown(Phaser.Keyboard.A)
    ) {
      this.move(-1);
    } else if (
      this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ||
      this.game.input.keyboard.isDown(Phaser.Keyboard.D)
    ) {
      this.move(1);
    } else {
      this.idle();
    }
  }

  move(direction) {
    this.body.velocity.x = direction * RUNNING_SPEED;
    this.scale.setTo(direction, 1);
    this.play('walking');
  }

  idle() {
    this.body.velocity.x = 0;
    this.frame = 0;
    this.animations.stop();
  }

  initAnimation() {
    this.animations.add('walking', [1, 2, 3, 4, 5, 6, 7, 8], 15, true);
  }

  addPhysicsToPlayer() {
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.allowGravity = false;
  }

  createSound() {
    this.lose = this.game.sound.add('lose');
    this.pickItem = this.game.sound.add('pickItem');
  }
}
