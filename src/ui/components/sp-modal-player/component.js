import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { alias } from '@ember-decorators/object/computed';
import { observes } from '@ember-decorators/object';

export default class SpModalPlayerComponent extends Component {
  @service audio;
  @service('data/tracks-manager') tracksManager;
  @service('modals/player') modalState;
  @alias('audio.isPlay') play;
  @alias('modalState.open') open;
  @alias('audio.isLoading') isLoading;

  classNames = ['sp-modal-player']

  constructor() {
    super(...arguments);
  }

  didRender() {
    this.openOrClose();
  }

  togglePlay() {
    this.audio.toggle();
  }

  hide() {
    this.modalState.hide();
  }

  @observes('open')
  openOrClose() {
    if (this.open) {
      this.element.style.top = "0";
    } else {
      this.element.style.top = "100vh";
    }
  }
}
