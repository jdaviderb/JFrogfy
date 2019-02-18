import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import { computed } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';

export default class SpSongComponent extends Component {
  @service('data/tracks-manager') tracksManager;
  @alias('tracksManager.currentTrack') currentTrack;

  classNames = ['sp-song'];
  classNameBindings = ['isActive:active'];
  attributeBindings = ['onClick'];

  @computed('currentTrack')
  get isActive() {
    const song = this.song + this.artist;
    const currentSong = this.currentTrack.name + this.currentTrack.artist;

    return song == currentSong;
  }
}
