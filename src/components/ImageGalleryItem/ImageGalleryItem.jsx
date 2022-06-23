import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({cardUrl, alt, onClick}) => { 
  return (
    <li
      className={s['gallery-item']}
      onClick={onClick}
    >
      <img
        className={s['gallery-item__image']}
        src={cardUrl}
        alt={alt}
      />
    </li>
  )
}

ImageGalleryItem.prototype = {
  cardUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ImageGalleryItem;