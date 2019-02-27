import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';
export default class SearchRoute extends Route {
  @service headData: any;

  afterModel() {
    this.headData.set('title', 'JFrogfy - search everywhere');
  }
}
