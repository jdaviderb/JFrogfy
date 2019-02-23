import Controller from '@ember/controller';
import { inject as service } from '@ember-decorators/service';
import { action, observes } from '@ember-decorators/object';
import TracksManager from 'client/src/services/data/tracks-manager';
import SearchState from 'client/src/services/data/search';
import Track from 'client/src/pojo/track';

export default class SearchController extends Controller {
  @service('data/search') searchState: SearchState;
  @service('data/tracks-manager') tracksManager: TracksManager;

  @observes('searchState.keyword')
  search(): void {
    this.searchState.load(this.searchState.keyword);
  }

  @action
  play(track: Track, tracks: Track[]): any {
    return this.tracksManager.play(track, tracks);
  }
}
