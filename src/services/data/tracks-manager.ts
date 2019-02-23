import Service from '@ember/service';
import { inject as service } from '@ember-decorators/service';
import { alias } from '@ember-decorators/object/computed';
import Youtube from 'client/src/services/youtube';
import Audio from 'client/src/services/Audio';
import Track from 'client/src/pojo/track';
const STORAGE_KEY = 'tracks-manager';

export default class DataTracksManagerService extends Service {
  @service fastboot: any;
  @service youtube: Youtube;
  @service audio: Audio;
  @alias('fastboot.isFastBoot') isFastBoot: any;

  tracks: Track[] = [];
  currentTrack: Track;

  constructor() {
    super(...arguments);

    // load data from local storage
    if (!this.isFastBoot) {
      const { tracks, currentTrack } = this.getLocalStorage();

      this.setProperties({ tracks, currentTrack });

      this.audio.audio.currentTime = window.localStorage.currentTime || 0;
      this.audio.currentTimePretty = window.localStorage.currentTimePretty || 0;
      this.audio.currentTimePercent = window.localStorage.currentTimePercent || 0;
      this.audio.duration = window.localStorage.duration || 0;
      this.audio.durationPretty = window.localStorage.durationPretty || 0;
    }
  }

  /**
  * play an song
  * @param track track to play
  * @param tracks tracks collection
  */
  play(track: Track, tracks: Track[]): void {
    this.audio.setIsLoading();
    this.tracks.clear();

    this.tracks.pushObjects(tracks);
    this.set('currentTrack', track);

    this.audio.reset();
    this.youtube.play(track);
    this.updateLocalStorage();
  }

  /**
  * play an song with local storage data
  */
  playLocal(): void {
    this.youtube.play(this.currentTrack);
  }

  /**
  * next song
  */
  nextPlay(): void {
    const newTrackIndex = this.tracks.indexOf(this.currentTrack) + 1;
    const newTrack = this.tracks[newTrackIndex];
    if (newTrack) {
      this.youtube.play(newTrack);
      this.set('currentTrack', newTrack);
      this.updateLocalStorage();
    }
  }

  /**
  * save state to localStorage
  */
  updateLocalStorage(): void {
    const { tracks, currentTrack } = this;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tracks, currentTrack })
    );
  }

  /**
  * return initial data
  */
  initialData(): any {
    return { tracks: [], currentTrack: new Track({ available: false }) };
  }

  /**
  * get data from localStorage
  */
  getLocalStorage(): any {
    if (!window.localStorage[STORAGE_KEY]) { return this.initialData(); }
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '');
  }
}

declare module '@ember/service' {
  interface Registry {
    'data/tracks-manager': DataTracksManagerService;
  }
}
