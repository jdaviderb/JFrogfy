import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import TracksManager from 'client/src/services/data/tracks-manager';

export default class PlaylistsShowController extends Controller {
  @service youtube: any;
  @service('data/tracks-manager') tracksManager: TracksManager;

  @action
  play(track: any, tracks: any): void {
    return this.tracksManager.play(track, tracks);
  }
}
