import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import SplashState from './states/Splash';
import MenuState from './states/Menu';
import GameState from './states/Game';
import ResultState from './states/Result';

import config from './config';

class Game extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement;
    const width =
      docElement.clientWidth > config.gameWidth
        ? config.gameWidth
        : docElement.clientWidth;
    const height =
      docElement.clientHeight > config.gameHeight
        ? config.gameHeight
        : docElement.clientHeight;

    super(width, height, Phaser.AUTO);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Menu', MenuState, false);
    this.state.add('Game', GameState, false);
    this.state.add('Result', ResultState, false);

    if (!window.cordova) {
      this.state.start('Boot');
    }
  }
}

window.game = new Game();

if (window.cordova) {
  var app = {
    initialize: function() {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false,
      );
    },

    onDeviceReady: function() {
      this.receivedEvent('deviceready');

      window.game.state.start('Boot');
    },

    receivedEvent: function(id) {
      console.log('Received Event: ' + id);
    },
  };

  app.initialize();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
