import Service from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';
import ENV from 'client/config/environment';
import SerializeTrackAlbum from 'client/src/serializers/trackAlbum';
import Track from 'client/src/pojo/track';

export default class DataAlbumsService extends Service {
  host: string = ENV.apiServer;
  endpoint: string = '/api/spotify/v1/albums/';
  title: string = '';
  description: string = '';
  image: any = null;
  tracks: Track[] = [];

  /**
  * load an album from spotify
  */
  load(id: string): any {
    // @ts-ignore
    return this._load.perform(id);
  }

  @task
  *_load(id: string) {
    const response = yield fetch(this.host + this.endpoint + id);
    const { data } = yield response.json();

    const image = data.table.images[0].url;
    const tracksRaw = data.table.tracks.items;
    const tracks = tracksRaw.map(SerializeTrackAlbum).filter((item: Track) => item.available);

    // set images
    tracks.forEach((track: Track) => track.image = image)

    const album = {
      title: data.table.name,
      description: data.table.description,
      image,
      tracks
    };

    this.setProperties(album);

    return album;
  }
}

declare module '@ember/service' {
  interface Registry {
    'data/albums': DataAlbumsService;
  }
}