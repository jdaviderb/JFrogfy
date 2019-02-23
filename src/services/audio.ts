import Service from '@ember/service';
import { inject as service } from '@ember-decorators/service';
import TracksManager from 'client/src/services/data/tracks-manager';

export default class AudioService extends Service {
  @service('data/tracks-manager') tracksManager: TracksManager;

  currentTime: number = 0;
  currentTimePercent: number = 0;
  currentTimePretty: string = '0:00';
  durationPretty: string = '0:00';
  duration: number = 0;
  isPlay: boolean = false
  isLoading: boolean = false;
  audio: HTMLAudioElement;

  constructor() {
    super(...arguments);

    this.audio = new Audio();
    this.audio.ontimeupdate = this.onTimeUpdate.bind(this);
    this.audio.onplaying = this.onPlaying.bind(this);
    this.audio.onended = this.onEnd.bind(this);
    this.audio.onerror = this.onEnd.bind(this);
  }

  /**
  * play an audio from an url or play audio local
  * @param url url to play
  */
  play(url: any): void {
    this.setIsLoading();
    this.audio.pause();

    if (url) { this.audio.src = url; }
    if (!this.audio.src && !url) { this.tracksManager.playLocal(); }

    this.audio.play();
    this.set('isPlay', true);
  }

  /**
  * pause audio
  */
  pause(): void {
    this.set('isPlay', false);
    this.audio.pause();
  }

  /**
  * reset all properties
  */
  reset(): void {
    this.audio.currentTime = 0;
    this.setProperties({
      currentTime: 0,
      currentTimePercent: 0,
      duration: 0
    });
  }

  /**
  * play or pause
  */
  toggle(): void {
    if (this.isPlay) {
      this.pause();
    } else {
      this.play(null);
    }
  }

  /**
  * set duration to the audio
  * @param durationPercent the duration must be in percentage 50 = 50%
  */
  setDuration(durationPercent: number): void {
    const currentTime = (this.duration / 100) * durationPercent;
    this.audio.currentTime = currentTime;
    this.set('currentTimePercent', durationPercent);
    this.set('currentTimePretty', secondsToMinutes(currentTime));
  }

  /**
  * set isLoading
  */
  setIsLoading() {
    this.set('isLoading', true);
  }

  /**
  * save state in the localStorage
  */
  saveLocalStorage() {
    const currentTimePercent = (this.audio.currentTime * 100) / (this.audio.duration);

    window.localStorage.duration = this.audio.duration;
    window.localStorage.durationPretty = secondsToMinutes(this.audio.duration);
    window.localStorage.currentTime = this.audio.currentTime;
    window.localStorage.currentTimePretty = secondsToMinutes(this.audio.currentTime);
    window.localStorage.currentTimePercent = currentTimePercent;
  }

  onTimeUpdate(): void {
    const currentTimePercent = (this.audio.currentTime * 100) / this.audio.duration;

    this.saveLocalStorage();

    this.audio.currentTime

    this.setProperties({
      currentTime: this.audio.currentTime,
      duration: this.audio.duration,
      currentTimePretty: secondsToMinutes(this.audio.currentTime),
      durationPretty: secondsToMinutes(this.audio.duration),
      currentTimePercent: currentTimePercent,
    });
  }

  onPlaying(): void {
    this.set('isLoading', false);;
  }

  onEnd(): void {
    this.reset();
    this.tracksManager.nextPlay();
  }
}

function secondsToMinutes(time: number): string
{
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
