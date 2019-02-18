import Service from '@ember/service';
import { inject as service } from '@ember-decorators/service';
import { alias } from '@ember-decorators/object/computed';

const STORAGE_KEY = 'tracks-manager';

export default class DataTracksManagerService extends Service {
  @service fastboot;
  @service youtube;
  @service audio;
  @alias('fastboot.isFastBoot') isFastBoot;

  tracks = [];
  currentTrack = { name: 'loading...', artist: ' ' };

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

  play(track, tracks) {
    this.audio.setIsLoading();
    this.tracks.clear();

    this.tracks.pushObjects(tracks);
    this.set('currentTrack', track);

    this.audio.reset();
    this.youtube.play(track.name, track.artist);
    this.updateLocalStorage();
  }

  playLocal() {
    this.youtube.play(this.currentTrack.name, this.currentTrack.artist);
  }

  nextPlay() {
    const newTrackIndex = this.tracks.indexOf(this.currentTrack) + 1;
    const newTrack = this.tracks[newTrackIndex];
    if (newTrack) {
      this.youtube.play(newTrack.name, newTrack.artist);
      this.set('currentTrack', newTrack);
      this.updateLocalStorage();
    }
  }

  updateLocalStorage() {
    const { tracks, currentTrack } = this;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tracks, currentTrack })
    );
  }

  initialData() {
    return { tracks: [], currentTrack: {} };
  }

  getLocalStorage() {
    if (!window.localStorage[STORAGE_KEY]) { return this.initialData(); }
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY));
  }
}
