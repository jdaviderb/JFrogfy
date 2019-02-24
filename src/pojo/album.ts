export interface AlbumItem {
  id: string,
  name: string,
  image?: string
}

export default class Album implements AlbumItem {
  id: string;
  name: string;
  image?: string;

  constructor(artistItem: AlbumItem) {
    this.id = artistItem.id;
    this.name = artistItem.name;
    this.image = artistItem.image;
  }
}

