import Service from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';
import ENV from 'client/config/environment';
import SerializeArtist from 'client/src/serializers/artist';
import SerializeAlbum from 'client/src/serializers/album';
import Track from 'client/src/pojo/track';
import Artist from 'client/src/pojo/artist';
import Album from 'client/src/pojo/album';

export default class DataArtistsService extends Service {
  host: string = ENV.apiServer;
  endpoint: string = '/api/spotify/v1/artists/';
  artist: Artist;
  tracks: Track[] = [];
  albums: Album[] = [];

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

    const artist = SerializeArtist(data.artist.table);
    const albums = data.albums.table.items.map(SerializeAlbum);

    this.setProperties({ artist, albums });

    return { artist, albums };
  }
}

declare module '@ember/service' {
  interface Registry {
    'data/artists': DataArtistsService;
  }
}