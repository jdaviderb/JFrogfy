import Controller from '@ember/controller';
import { inject as service } from '@ember-decorators/service';
import { action, observes } from '@ember-decorators/object';

export default class SearchController extends Controller {
  @service('data/search') searchState;
  @service('data/tracks-manager') tracksManager;

  @observes('searchState.keyword')
  search() {
    this.searchState.load(this.searchState.keyword);
  }

  @action
  play(track, tracks) {
    return this.tracksManager.play(track, tracks);
  }
}
