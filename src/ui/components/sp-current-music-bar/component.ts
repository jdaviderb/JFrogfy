import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { alias } from '@ember-decorators/object/computed';
import TracksManager from 'client/src/services/data/tracks-manager';
import PlayerModal from 'client/src/services/modals/player';

export default class CurrentMusicBarComponent extends Component {
  @service audio: any;
  @service('data/tracks-manager') tracksManager : TracksManager;
  @service('modals/player') playerModal: PlayerModal;
  @alias('audio.isPlay') play: boolean;
  @alias('audio.isLoading') isLoading: boolean;

  classNames = ['sp-current-music-bar'];

  togglePlay(): void {
    this.audio.toggle();
  }

  showPlayerModal(): void {
    this.playerModal.show();
  }
}
