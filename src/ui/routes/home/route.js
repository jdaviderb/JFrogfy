import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';

export default class HomeRoute extends Route {
  @service("data/home") homeState;

  model() {
    return this.homeState.load();
  }
}
