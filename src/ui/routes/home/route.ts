import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';
import HomeState from 'client/src/services/data/home';

export default class HomeRoute extends Route {
  @service("data/home") homeState: HomeState;

  model(): any {
    return this.homeState.load();
  }
}
