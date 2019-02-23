export interface TrackItem {
  id?: string,
  name?: string,
  artist?: string,
  image?: string,
  available: boolean;
}

export default class Track implements TrackItem {
  name?: string;
  artist?: string;
  image?: string;
  available: boolean;

  constructor(trackItem: TrackItem) {
    this.name = trackItem.name;
    this.artist = trackItem.artist;
    this.image = trackItem.image;
    this.available = trackItem.available;
  }
}

