import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';

export default class PlaylistsShowController extends Controller {
  @service youtube;
  @service('data/tracks-manager') tracksManager;

  @action
  play(track, tracks) {
    return this.tracksManager.play(track, tracks);
  }
}
