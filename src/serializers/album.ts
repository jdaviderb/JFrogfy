import Album from 'client/src/pojo/album';

export default function serialize(item: any): Album {
  let image;
  if (item.images.length > 0) { image = item.images[0].url; }
  return {
    id: item.id,
    name: item.name,
    image
  };
}
