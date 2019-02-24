export interface ArtistItem {
  id: string,
  name: string,
  image?: string
}

export default class Track implements ArtistItem {
  id: string;
  name: string;
  image?: string;

  constructor(artistItem: ArtistItem) {
    this.id = artistItem.id;
    this.name = artistItem.name;
    this.image = artistItem.image;
  }
}

