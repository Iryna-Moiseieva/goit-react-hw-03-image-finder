import React from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({images, onClick }) => { 
  return (
    <ul className = {s['imageGallery']}> 
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          cardUrl={webformatURL}
          alt={tags}
          onClick={() => onClick(largeImageURL)}
        />
      ))}
    </ul>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.object.isRequired),
  onClick: PropTypes.func,
}

export default ImageGallery;