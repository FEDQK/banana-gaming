import Phaser from 'phaser';
import Player from '../sprites/Player';
import DroppedItemGenerator from '../generators/DroppedItem';
import Service from '../service';
import ScoreCounter from '../gui/ScoreCounter';

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.initPhysics();
    this.createBackground();
    this.createPlayer();
    this.initDroppedItems();
    this.initScore();
    this.createScoreLabel();
  }

  render() {}

  update() {
    this.game.physics.arcade.overlap(
      this.droppedItems,
      this.player,
      this.takeDroppedItem,
      null,
      this,
    );
  }

  initPhysics() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  createBackground() {
    this.background = this.add.sprite(0, 0, 'background');
  }

  createPlayer() {
    this.player = new Player(
      this.game,
      this.game.world.centerX,
      this.game.world.height - 115,
      'player',
      0,
    );
  }

  initDroppedItems() {
    this.droppedItems = new DroppedItemGenerator(this.game);
  }

  gameOver() {
    this.state.start('Result');
  }

  takeDroppedItem(player, item) {
    if (item.key === 'bomb') {
      player.lose.play();
      this.gameOver();
    } else if (item.key === 'banana') {
      this.score.currentScore += 1;
      player.pickItem.play();
      item.kill();
    }
  }

  initScore() {
    this.score = Service.get('Score');
  }

  createScoreLabel() {
    this.scoreLabel = new ScoreCounter(this.game, 10, 0);
  }
}
