import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';
import HomeState from 'client/src/services/data/home';

export default class HomeRoute extends Route {
  @service headData: any;
  @service("data/home") homeState: HomeState;

  model(): any {
    return this.homeState.load();
  }

  afterModel() {
    this.headData.set('title', 'JFrogfy - music free everywhere');
  }
}
