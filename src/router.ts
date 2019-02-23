import EmberRouter from "@ember/routing/router";
import config from "../config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('search');

  this.route('playlists', function() {
    this.route('show', { path: ':id' })
  });
});

export default Router;
