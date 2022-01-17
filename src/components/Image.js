import React from 'react';
import { useDispatch } from 'react-redux';
import { addImage } from '../store/gifSlice';

function Image({ src, tag }) {
  const dispatch = useDispatch();

  const imageClickHandler = () => {
    if(tag === 'random gif') {
      dispatch(addImage(''));
    } else {
      dispatch(addImage(tag));
    }
  }

  return (
    <div className='image-wrapper'>
      <img onClick={imageClickHandler} src={src} alt={tag} title={`Загрузить по тегу ${tag}`}/>
    </div>
  )
}

export default Image;
