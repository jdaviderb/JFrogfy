import Service from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';
import config from 'client/config/environment';
import serializeTrackAlbum from 'client/src/serializers/trackAlbum';
import serializePlaylist from 'client/src/serializers/playlist';
import serializeArtist from 'client/src/serializers/artist';

import Track from 'client/src/pojo/track';
import Playlist from 'client/src/pojo/playlist';
import Artist from 'client/src/pojo/artist';
export default class DataSearchService extends Service {
  host: any = config.apiServer;
  endpoint = '/api/spotify/v1/search/';
  keyword = '';
  playlists: Playlist[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  artist = null;
  controller: AbortController;
  signal: AbortSignal;
  _task: any;

  constructor() {
    super(...arguments);

    this.controller = new AbortController();
    this.controller.signal
    this.signal = this.controller.signal;
  }

  /**
  * load search data from spotify
  * @param keyword keyword to search
  */
  load(keyword: string): any {
    if (this._task) { this._task.cancel();  }

    // cancel request(fetch)
    if (this.controller) {
      this.controller.abort();
      this.controller = new AbortController();
      this.signal = this.controller.signal;
    }

    // @ts-ignore
    this._task = this._load.perform(keyword);

    return this._task;
  }

  @task
  *_load(keyword: string): any {
    const options = {
      method: 'get',
      signal: this.signal
    }
    const response = yield fetch(this.host + this.endpoint + keyword, options);
    const { data } = yield response.json();

    const playlists = data.table.playlists.items.slice(0, 10).map(serializePlaylist);
    const artists = data.table.artists.items.slice(0, 10).map(serializeArtist);
    const tracks = data.table.tracks.items.map(serializeTrackAlbum);

    this.artists.clear();
    this.artists.pushObjects(artists);

    this.setProperties({ playlists, tracks });
  }
}

declare module '@ember/service' {
  interface Registry {
    'data/search': DataSearchService;
  }
}