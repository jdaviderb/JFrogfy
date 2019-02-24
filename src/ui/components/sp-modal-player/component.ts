import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { alias } from '@ember-decorators/object/computed';
import { observes } from '@ember-decorators/object';
import TracksManager from 'client/src/services/data/tracks-manager';
export default class SpModalPlayerComponent extends Component {
  @service audio: any;
  @service('data/tracks-manager') tracksManager: TracksManager;
  @service('modals/player') modalState: any;
  @alias('audio.isPlay') play: boolean;
  @alias('modalState.open') open: boolean;
  @alias('audio.isLoading') isLoading: boolean;
  classNames = ['sp-modal-player']

  constructor() {
    super(...arguments);
  }

  didRender(): void {
    this.openOrClose();
  }

  togglePlay(): void {
    this.audio.toggle();
  }

  nextPlay(): void {
    this.tracksManager.nextPlay();
  }

  previousPlay(): void {
    this.tracksManager.previousPlay();
  }

  hide(): void {
    this.modalState.hide();
  }

  @observes('open')
  openOrClose(): void {
    const element = this.element as HTMLElement;

    if (this.open) {
      (element).style.top = "0";
    } else {
      (element).style.top = "100vh";
    }
  }
}
