import Service from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';
import ENV from 'client/config/environment';

export default class DataPlaylistsService extends Service {
  host = ENV.apiServer;
  endpoint = '/api/spotify/v1/playlists/';
  title = '';
  image = null;
  tracks = [];

  load(id) {
    return this._load.perform(id);
  }

  @task
  *_load(id) {
    const response = yield fetch(this.host + this.endpoint + id);
    const { data } = yield response.json();
    const tracks = data.table.tracks.items.map(this._serializeTrack);

    this.setProperties({
      title: data.table.name,
      image: data.table.images[0].url
    })

    this.tracks.clear();
    this.tracks.pushObjects(tracks);

    return { tracks, title: this.title, image: this.image };
  }

  _serializeTrack(item) {
    let artist;
    let image;

    if (item.track.artists) { artist = item.track.artists[0].name; }
    if (item.track.album && item.track.album.images) { image = item.track.album.images[0].url; }

    return {
      name: item.track.name,
      artist,
      image
    };
  }
}
