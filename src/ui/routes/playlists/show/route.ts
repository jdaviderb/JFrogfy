import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';
import PlaylistState from 'client/src/services/data/playlists';

export default class PlaylistsShowRoute extends Route {
  @service headData: any;
  @service("data/playlists") playlistsState: PlaylistState;

  model(params: any) {
    return this.playlistsState.load(params.id);
  }

  afterModel(model: any): void {
    this.headData.set('title', model.title);
    this.headData.set('description', model.description);
    this.headData.set('image', model.image);
  }
}
