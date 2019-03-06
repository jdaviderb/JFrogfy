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
  controller: AbortController;
  signal: AbortSignal;
  task: any;

  constructor() {
    super(...arguments);

    this.controller = new AbortController();
    this.controller.signal
    this.signal = this.controller.signal;
  }

  play(track: Track): any {
    if (this.controller && this.task) {
      this.controller.abort();
      this.controller = new AbortController();
      this.signal = this.controller.signal;
      this.task.cancel();
    }
    // @ts-ignore
    this.task = this._load.perform(track);
    return this.task;
  }

  // @ts-ignore
  @task({ maxConcurrency: 2, drop: true })
  *_load(track: Track): any {
    let audio;
    const options = { method: 'get', signal: this.signal };

    try {
      this.audio.pause();
      const queryParams = encodeURI(`?artist=${track.artist}&song=${track.name}`);
      const response = yield fetch(this.host + this.endpoint + queryParams, options);
      const data = yield response.json();
      audio = decodeURIComponent(data.video);
      this.audio.play(audio);
    } catch(error) {
      this.audio.tracksManager.nextPlay();
    }

    return audio;
  }
}
