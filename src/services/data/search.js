import Service from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';
import ENV from 'client/config/environment';
import { timeout } from 'ember-concurrency';

const DEBOUNCE_MS = 300;

export default class DataSearchService extends Service {
  host = ENV.apiServer;
  endpoint = '/api/spotify/v1/search/';
  keyword = '';
  playlists = [];
  tracks = [];
  artist = null;

  constructor() {
    super(...arguments);

    if (window.AbortController) {
      this.controller = new AbortController();
      this.signal = this.controller.signal;
    }
  }

  load(keyword) {
    if (this._task) { this._task.cancel();  }

    // cancel request(fetch)
    if (this.controller) {
      this.controller.abort();
      this.controller = new AbortController();
      this.signal = this.controller.signal;
    }

    this._task = this._load.perform(keyword);
    return this._task;
  }

  @task
  *_load(keyword) {
    const options = {
      method: 'get',
      signal: this.signal
    }
    const response = yield fetch(this.host + this.endpoint + keyword, options);
    const { data } = yield response.json();

    const playlists = data.table.playlists.items.slice(0, 10).map(this._serializePlaylists);
    const tracks = data.table.tracks.items.map(this._serializeTrack);

    const artist = {
      name: data.table.artists.items[0].name,
      image: data.table.artists.items[0].images[0].url
    };

    this.setProperties({ playlists, tracks, artist });
    yield timeout(DEBOUNCE_MS);
  }

  _serializePlaylists(item) {
    return {
      id: item.id,
      name: item.name,
      image: item.images[0].url
    };
  }

  _serializeTrack(item) {
    let artist;
    let image;

    if (item.artists) { artist = item.artists[0].name; }
    if (item.album.images) { image = item.album.images[0].url; }

    return {
      name: item.name,
      artist,
      image
    };
  }
}
