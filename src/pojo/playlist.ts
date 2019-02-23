export interface PlaylistItem {
  id: string;
  image?: string,
  name: string
}

export default class Playlist implements PlaylistItem {
  id: string;
  image?: string;
  name: string;

  constructor(playlistItem: PlaylistItem) {
    this.id = playlistItem.id;
    this.image = playlistItem.image;
    this.name = playlistItem.name;
  }
}
