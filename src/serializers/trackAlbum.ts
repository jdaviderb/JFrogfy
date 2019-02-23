import Track from 'client/src/pojo/track';

export default function serialize(item: any): Track {
  let artist;
  if (item.artists) { artist = item.artists[0].name; }

  return new Track({
    name: item.name,
    available: true,
    image: '',
    artist
  });
}
