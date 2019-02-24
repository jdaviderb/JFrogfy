import Artist from 'client/src/pojo/artist';

export default function serialize(item: any): Artist {
  let image;
  if (item.images.length > 0) { image = item.images[0].url; }
  return {
    id: item.id,
    name: item.name,
    image
  };
}
