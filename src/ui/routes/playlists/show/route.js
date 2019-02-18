import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';

export default class PlaylistsShowRoute extends Route {
  @service("data/playlists") playlistsState;
  @service audio;

  model({ id }) {
    return this.playlistsState.load(id);
  }
}
