import React from 'react';
import { useSelector} from 'react-redux';
import Image from './Image';

function Group({ tag }) {
  const images = useSelector(state => state.gif.images);
  const filteredImages = images.filter(image => {
    return image.tag === tag;
  })

  return (
    <div className='group'>
      <h2>{tag}</h2>
      <div className="groupped-list">
        {filteredImages.map(image => {
          return <Image
            key = {image.id}
            src = {image.src}
            tag = {image.tag}
          />
        })}
      </div>
    </div>
  )
}

export default Group;
