import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, onOpenModal }) => {
  return (
    <li className={css.ImageGalleryImage} onClick={() => onOpenModal(image)}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={css.ImageGalleryImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  image: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
};
