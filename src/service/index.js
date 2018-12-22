import Score from './Score';

export default class Service {
  static get(name) {
    return Service.list[name];
  }

  static set(name, value) {
    Service.list[name] = value;
  }
}

Service.list = {
  Score: new Score('currentScore'),
  BestScore: new Score('bestScore'),
  Music: null,
};
