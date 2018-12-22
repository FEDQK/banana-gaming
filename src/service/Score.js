import Phaser from 'phaser';

export default class Score {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.updateScore = new Phaser.Signal();
  }

  set currentScore(val) {
    this.score = val;
    this.updateScore.dispatch();
    return this.score;
  }

  get currentScore() {
    return this.score;
  }

  load() {
    this.score = Number(localStorage.getItem(this.name)) || 0;
  }

  save() {
    localStorage.setItem(this.name, this.score);
  }
}
