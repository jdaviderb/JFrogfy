import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { alias } from '@ember-decorators/object/computed';

export default class CurrentMusicBarComponent extends Component {
  @service audio;
  @service('data/tracks-manager') tracksManager;
  @service('modals/player') playerModal;
  @alias('audio.isPlay') play;
  @alias('audio.isLoading') isLoading;

  classNames = ['sp-current-music-bar'];

  togglePlay() {
    this.audio.toggle();
  }

  showPlayerModal() {
    this.playerModal.show();
  }
}
