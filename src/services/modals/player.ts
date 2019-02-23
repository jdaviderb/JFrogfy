import Service from '@ember/service';

export default class ModalsPlayerService extends Service {
  open: boolean = false;

  show(): void {
    this.set('open', true);
  }

  hide(): void {
    this.set('open', false);
  }
}


declare module '@ember/service' {
  interface Registry {
    'modals/player': ModalsPlayerService;
  }
}