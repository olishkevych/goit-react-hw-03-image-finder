import React from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

class Modal extends React.Component {
  componentDidMount() {
    this.scrollPosition = window.scrollY;
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    window.scrollTo(0, this.scrollPosition);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <div className={css.Modal} onClick={this.handleOverlayClick}>
        <img
          className={css.LargeImage}
          src={this.props.selectedImage.largeImageURL}
          alt={this.props.selectedImage.tags}
        />
        <button onClick={this.props.onCloseModal} className={css.CloseBtn}>
          &times;
        </button>
      </div>
    );
  }
}

Modal.propTypes = {
  selectedImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
