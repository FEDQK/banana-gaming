import Phaser from 'phaser';
import Service from '../service';

export default class ScoreCounter extends Phaser.Text {
  constructor(game, x, y) {
    const style = {
      fill: '#fff',
      font: '30px Bangers',
    };
    super(game, x, y, '🍌 0 ', style);

    this.score = Service.get('Score');
    this.score.updateScore.add(this.updateScoreCount, this);
    this.game.add.existing(this);
  }

  updateScoreCount() {
    this.text = `🍌 ${this.score.currentScore} `;
  }
}
