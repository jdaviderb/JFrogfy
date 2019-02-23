import Service from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';
import ENV from 'client/config/environment';
import SerializeTrack from 'client/src/serializers/track';
import Track from 'client/src/pojo/track';

export default class DataPlaylistsService extends Service {
  host: string = ENV.apiServer;
  endpoint: string = '/api/spotify/v1/playlists/';
  title: string = '';
  image: any = null;
  tracks: Track[] = [];

  /**
  * load a playlist from spotify
  */
  load(id: string): any {
    // @ts-ignore
    return this._load.perform(id);
  }

  @task
  *_load(id: string) {
    const response = yield fetch(this.host + this.endpoint + id);
    const { data } = yield response.json();
    const tracksRaw = data.table.tracks.items;
    const tracks = tracksRaw.map(SerializeTrack).filter((item: Track) => item.available);

    this.setProperties({
      title: data.table.name,
      image: data.table.images[0].url
    });

    this.tracks.clear();
    this.tracks.pushObjects(tracks);

    return { tracks, title: this.title, image: this.image };
  }
}

declare module '@ember/service' {
  interface Registry {
    'data/playlists': DataPlaylistsService;
  }
}