import Service from '@ember/service';
import { inject as service } from '@ember-decorators/service';
import Audio from 'client/src/services/audio';
import ENV from 'client/config/environment';
import { task } from 'ember-concurrency-decorators';
import Track from 'client/src/pojo/track';
export default class YoutubeService extends Service {
  @service
  audio: Audio;

  host: string = ENV.apiServer;
  endpoint: string = '/api/youtube/v1/get_video';

  play(track: Track) {
    // @ts-ignore
    return this._load.perform(track);
  }

  // @ts-ignore
  @task({ drop: true })
  *_load(track: Track): any {
    this.audio.pause();
    const queryParams = encodeURI(`?artist=${track.artist}&song=${track.name}`);
    const response = yield fetch(this.host + this.endpoint + queryParams);
    const data = yield response.json();
    const audio = decodeURIComponent(data.video);
    this.audio.play(audio);

    return audio;
  }
}
