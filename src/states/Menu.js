import Phaser from 'phaser';
import TextButton from '../gui/TextButton';
import Service from '../service';

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.background = this.add.sprite(0, 0, 'background');
    this.createButtonPlay();
    this.initMusic();
  }

  render() {}

  update() {}

  initMusic() {
    this.music = Service.get('Music');
    if (!this.music || !this.music.isPlaying) {
      this.music = this.game.sound.add('music', 1, true);
      this.music.play();
      Service.set('Music', this.music);
    }
  }

  createButtonPlay() {
    const text = ' PLAY ';
    const textStyle = {
      font: '40px Bangers',
      fill: '#000',
      smoothed: false,
    };
    this.buttonPlay = new TextButton(
      this.game,
      this.game.world.centerX,
      this.game.world.centerY,
      'button',
      this.handleClickButtonPlay,
      this,
      text,
      textStyle,
    );
  }

  handleClickButtonPlay() {
    this.state.start('Game');
  }
}
