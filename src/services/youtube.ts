import Service from '@ember/service';
import { inject as service } from '@ember-decorators/service';
import Audio from 'client/src/services/audio';
import ENV from 'client/config/environment';
import { task } from 'ember-concurrency-decorators';

export default class YoutubeService extends Service {
  @service
  audio: Audio;

  host: string = ENV.apiServer;
  endpoint: string = '/api/youtube/v1/get_video';

  play(song: any, artist: any) {
    // @ts-ignore
    return this._load.perform(song, artist);
  }

  // @ts-ignore
  @task({ drop: true })
  *_load(song: string = 'Hello, my baby', artist: string = 'The Chordettes'): any {
    this.audio.pause();
    const queryParams = encodeURI(`?artist=${artist}&song=${song}`);
    const response = yield fetch(this.host + this.endpoint + queryParams);
    const data = yield response.json();
    const audio = decodeURIComponent(data.video);
    this.audio.play(audio);

    return audio;
  }
}
