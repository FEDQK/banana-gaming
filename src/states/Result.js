import Phaser from 'phaser';
import TextButton from '../gui/TextButton';
import Service from '../service';

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.background = this.add.sprite(0, 0, 'background');
    this.initScore();
    this.createCurrentResult();
    this.createCaptionResult();
    this.createBestResult();
    this.createButtonMenu();
  }

  render() {}

  update() {}

  initScore() {
    this.score = Service.get('Score');
    this.bestScore = Service.get('BestScore');
    this.bestScore.load();
    this.checkBestScore();
  }

  checkBestScore() {
    if (this.bestScore.currentScore < this.score.currentScore) {
      this.bestScore.currentScore = this.score.currentScore;
      this.bestScore.save();
    }
  }

  createButtonMenu() {
    const text = ' MENU ';
    const textStyle = {
      font: '40px Bangers',
      fill: '#000',
      smoothed: false,
    };
    this.buttonMenu = new TextButton(
      this.game,
      this.game.world.centerX,
      this.game.world.centerY + 100,
      'button',
      this.handleClickButtonMenu,
      this,
      text,
      textStyle,
    );
  }

  handleClickButtonMenu() {
    this.score.currentScore = 0;
    this.state.start('Menu');
  }

  createCaptionResult() {
    const text = ' RESULT ';
    const textStyle = {
      font: '40px Bangers',
      fill: '#ffd221',
      smoothed: false,
    };
    this.captionResult = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY - 120,
      text,
      textStyle,
    );
    this.captionResult.anchor.setTo(0.5);
  }

  createCurrentResult() {
    const text = ` CURRENT - ${this.score.currentScore} `;
    const textStyle = {
      font: '30px Bangers',
      fill: '#fff',
      smoothed: false,
    };
    this.currentResult = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY - 50,
      text,
      textStyle,
    );
    this.currentResult.anchor.setTo(0.5);
  }

  createBestResult() {
    const text = ` BEST - ${this.bestScore.currentScore} `;
    const textStyle = {
      font: '30px Bangers',
      fill: '#fff',
      smoothed: false,
    };
    this.bestResult = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      text,
      textStyle,
    );
    this.bestResult.anchor.setTo(0.5);
  }
}
