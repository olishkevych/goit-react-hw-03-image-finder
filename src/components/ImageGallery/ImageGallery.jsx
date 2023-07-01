import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
