import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';
import AlbumState from 'client/src/services/data/albums';
export default class AlbumsShowRoute extends Route {
  @service("data/albums") albumState: AlbumState;
  @service audio: any;

  model(params: any) {
    return this.albumState.load(params.id);
  }
}
