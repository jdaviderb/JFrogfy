import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';
import ArtistsState from 'client/src/services/data/artists';

export default class ArtistsRoute extends Route {
  @service('data/artists') artistsState: ArtistsState;

  model(params: any) {
    return this.artistsState.load(params.id);
  }
}
