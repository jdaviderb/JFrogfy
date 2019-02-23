import Service from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';
import config from 'client/config/environment';

export default class DataSearchService extends Service {
  host: any = config.apiServer;
  endpoint = '/api/spotify/v1/search/';
  keyword = '';
  playlists = [];
  tracks = [];
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

    const playlists = data.table.playlists.items.slice(0, 10).map(this._serializePlaylists);
    const tracks = data.table.tracks.items.map(this._serializeTrack);

    const artist = {
      name: data.table.artists.items[0].name,
      image: data.table.artists.items[0].images[0].url
    };

    this.setProperties({ playlists, tracks, artist });
  }

  _serializePlaylists(item: any): any {
    return {
      id: item.id,
      name: item.name,
      image: item.images[0].url
    };
  }

  _serializeTrack(item: any): any {
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

declare module '@ember/service' {
  interface Registry {
    'data/search': DataSearchService;
  }
}