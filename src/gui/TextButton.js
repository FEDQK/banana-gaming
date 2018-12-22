import Phaser from 'phaser';

export default class TextButton extends Phaser.Button {
  constructor(game, x, y, key, callback, callbackContext, text, styleText) {
    super(game, x, y, key, callback, callbackContext);
    this.text = text;
    this.styleText = styleText;
    this.anchor.setTo(0.5);
    this.game.add.existing(this);
    this.createButtonText();
  }

  createButtonText() {
    this.buttonText = new Phaser.Text(
      this.game,
      this.position.x,
      this.position.y - 3,
      this.text,
      this.styleText,
    );
    this.buttonText.anchor.setTo(0.5);
    this.game.add.existing(this.buttonText);
  }
}
