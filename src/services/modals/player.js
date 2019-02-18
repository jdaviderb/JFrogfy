import Service from '@ember/service';

export default class ModalsPlayerService extends Service {
  open = false;

  show() {
    this.set('open', true);
  }

  hide() {
    this.set('open', false);
  }
}
