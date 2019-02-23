import Service from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';
import ENV from 'client/config/environment';
import SerializePlaylist from 'client/src/serializers/playlist';
import Playlist from 'client/src/pojo/playlist';

export default class DataHomeService extends Service {
  host: string = ENV.apiServer;
  endpoint: string = "/api/spotify/v1/home";
  title: string = '';
  playlists: Playlist[] = [];

  /**
  * load data from spotify
  */
  load(): any {
    // @ts-ignore
    return this._load.perform();
  }

  @task
  *_load(): any {
    const response = yield fetch(this.host + this.endpoint);
    const { data } = yield response.json();
    const sectionFeatured = data.table.content.items[0];
    const playlists = sectionFeatured.content.items.map(SerializePlaylist);

    this.set('title', sectionFeatured.name);
    this.playlists.clear();
    this.playlists.pushObjects(playlists);

    return { playlists: this.playlists, title: this.title };
  }
}


declare module '@ember/service' {
  interface Registry {
    'data/home': DataHomeService;
  }
}