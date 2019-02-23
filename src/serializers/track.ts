import Track from 'client/src/pojo/track';

export default function serialize(item: any): Track {
  const hasImages = item.track.album && item.track.album.images;
  let artist;
  let image;

  if (!item.track) { return new Track({ available: false }); }

  if (item.track.artists) { artist = item.track.artists[0].name; }
  if (hasImages) { image = item.track.album.images[0].url; }

  return new Track({
    name: item.track.name,
    artist,
    image,
    available: true
  });
}
