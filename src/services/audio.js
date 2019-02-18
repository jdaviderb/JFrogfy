import Service from '@ember/service';
import { inject as service } from '@ember-decorators/service';

export default class AudioService extends Service {
  @service('data/tracks-manager') tracksManager;

  currentTime=0
  currentTimePercent=0
  duration=0;
  isPlay=false
  isLoading=false;

  constructor() {
    super(...arguments);

    if (window.Audio) {
      this.audio = new Audio();
      this.audio.ontimeupdate	= this._onTimeUpdate.bind(this);
      this.audio.onplaying = this._onPlaying.bind(this);
      this.audio.onended = this._onEnd.bind(this);
    }
  }

  play(url) {
    this.setIsLoading();
    this.audio.pause();

    if (url) { this.audio.src = url; }
    if (!this.audio.src && !url) { this.tracksManager.playLocal(); }

    this.audio.play();
    this.set('isPlay', true);
  }

  setDuration(durationPercent) {
    const currentTime = (this.duration / 100) * durationPercent;
    this.audio.currentTime = currentTime;
    this.set('currentTimePercent', durationPercent);
    this.set('currentTimePretty', secondsToMinutes(currentTime));
  }

  setIsLoading() {
    this.set('isLoading', true);
  }

  pause() {
    this.set('isPlay', false);
    this.audio.pause();
  }

  reset() {
    this.audio.currentTime = 0;
    this.setProperties({
      currentTime: 0,
      currentTimePercent: 0,
      duration: 0
    });
  }

  toggle() {
    if (this.isPlay) {
      this.pause();
    } else {
      this.play();
    }
  }

  saveLocalStorage() {
    const currentTimePercent = (this.audio.currentTime * 100) / (this.audio.duration);

    window.localStorage.duration = this.audio.duration;
    window.localStorage.durationPretty = secondsToMinutes(this.audio.duration);
    window.localStorage.currentTime = this.audio.currentTime;
    window.localStorage.currentTimePretty = secondsToMinutes(this.audio.currentTime);
    window.localStorage.currentTimePercent = currentTimePercent;
  }

  _onTimeUpdate() {
    const currentTimePercent = (this.audio.currentTime * 100) / this.audio.duration;

    this.saveLocalStorage();

    this.setProperties({
      currentTime: this.audio.currentTime,
      duration: this.audio.duration,
      currentTimePercent,
      currentTimePretty: secondsToMinutes(this.audio.currentTime),
      durationPretty: secondsToMinutes(this.audio.duration)
    });
  }

  _onEnd() {
    this.reset();
    this.tracksManager.nextPlay();
  }

  _onPlaying() {
    this.set('isLoading', false);;
  }
}

function secondsToMinutes(time)
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

