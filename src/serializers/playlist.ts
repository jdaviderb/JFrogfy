import Playlist from 'client/src/pojo/playlist';

export default function serialize(item: any): Playlist {
  return new Playlist({
    id: item.id,
    name: item.name,
    image: item.images[0].url
  });
}
