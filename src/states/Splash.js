import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init() {}

  preload() {
    this.loaderBg = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'loaderBg',
    );
    this.loaderBar = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'loaderBar',
    );
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);

    this.load.image('background', 'assets/images/background.png');
    this.load.image('button', 'assets/images/button.png');
    this.load.image('banana', 'assets/images/banana.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.spritesheet('player', 'assets/images/player.png', 70, 84, 9);
    this.load.audio('music', [
      'assets/audio/music.mp3',
      'assets/audio/music.ogg',
    ]);
    this.load.audio('lose', [
      'assets/audio/sfx_lose.mp3',
      'assets/audio/sfx_lose.ogg',
    ]);
    this.load.audio('pickItem', [
      'assets/audio/sfx_pick-item.mp3',
      'assets/audio/sfx_pick-item.ogg',
    ]);
  }

  create() {
    this.state.start('Menu');
  }
}
