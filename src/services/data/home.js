import Service from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';
import ENV from 'client/config/environment';

export default class DataHomeService extends Service {
  host = ENV.apiServer;
  endpoint = "/api/spotify/v1/home";
  title = '';
  playlists = [];

  load() {
    return this._load.perform();
  }

  /* eslint-disable */
  @task
  *_load() {
    const response = yield fetch(this.host + this.endpoint);
    const { data } = yield response.json();
    const sectionFeatured = data.table.content.items[0];
    const playlists = sectionFeatured.content.items.map(this._serializePlaylists);

    this.set('title', sectionFeatured.name);
    this.playlists.clear();
    this.playlists.pushObjects(playlists);

    return { playlists: this.playlists, title: this.title };
  }
  /* eslint-enable */

  _serializePlaylists(item) {
    return {
      id: item.id,
      name: item.name,
      image: item.images[0].url
    };
  }
}
