import Service from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';
import ENV from 'client/config/environment';
import { inject as service } from '@ember-decorators/service';

export default class YoutubeService extends Service {
  @service audio;

  host = ENV.apiServer;
  endpoint = '/api/youtube/v1/get_video';

  play(song = 'Hello, my baby', artist = 'The Chordettes') {
    return this._load.perform(song, artist);
  }

  @task({ drop: true })
  *_load(song, artist) {
    this.audio.pause();
    const queryParams = encodeURI(`?artist=${artist}&song=${song}`);
    const response = yield fetch(this.host + this.endpoint + queryParams);
    const data = yield response.json();

    const audio = decodeURIComponent(data.video);
    this.audio.play(audio);
  }
}
