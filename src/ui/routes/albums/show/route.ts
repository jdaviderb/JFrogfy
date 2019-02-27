import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';
import AlbumState from 'client/src/services/data/albums';
export default class AlbumsShowRoute extends Route {
  @service headData: any;
  @service("data/albums") albumState: AlbumState;

  model(params: any) {
    return this.albumState.load(params.id);
  }

  afterModel(model: any) {
    this.headData.set('title', model.title);
    this.headData.set('image', model.image);
  }
}
