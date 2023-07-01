import React from 'react';

import { ToastContainer, toast } from 'react-toastify';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

import { fetchImages } from '../services/api/fetch';

import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';
import { toastConfig } from 'services/toastify/toastConfig';
import { Loader } from './Loader/Loader';

export class App extends React.Component {
  state = {
    searchText: '',
    images: [],
    totalHits: 0,
    error: null,
    page: 0,
    modal: { isOpen: false, selectedImage: null },
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchText, page } = this.state;
    if (prevState.searchText !== searchText || prevState.page !== page) {
      this.handleFetchRequest();
    }
  }

  onSubmit = query => {
    if (this.state.searchText === query) {
      toast.warning('Search results are already displayed');
      return;
    }
    this.setState({ searchText: query, page: 1, images: [] });
  };

  handleBtnClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  async handleFetchRequest() {
    try {
      this.setState({ isLoading: true });

      const { totalHits, hits: images } = await fetchImages(
        this.state.searchText,
        this.state.page
      );

      if (!totalHits) {
        toast.warning(`No images found`, toastConfig);
        return;
      }

      if (this.state.page === 1) {
        toast.success(`We've found ${totalHits} images`, toastConfig);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onOpenModal = selectedImage => {
    this.setState({ modal: { isOpen: true, selectedImage } });
  };

  onCloseModal = () => {
    this.setState({ modal: { isOpen: false, selectedImage: null } });
  };

  render() {
    const { isLoading, images, totalHits, modal } = this.state;
    return (
      <div className={css.App}>
        <ToastContainer />
        <SearchBar onSubmit={this.onSubmit} />

        {totalHits > 0 && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}

        {!isLoading && images.length !== totalHits && (
          <Button handleBtnClick={this.handleBtnClick} />
        )}

        {isLoading && <Loader />}

        {modal.isOpen && (
          <Modal
            onCloseModal={this.onCloseModal}
            selectedImage={modal.selectedImage}
          />
        )}
      </div>
    );
  }
}
