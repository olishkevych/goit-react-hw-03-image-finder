import React from 'react';
import { Oval } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

import { fetchImages } from '../services/api/fetch';

import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';

const toastConfig = {
  position: 'top-right',
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export class App extends React.Component {
  state = {
    searchText: null,
    images: [],
    totalHits: null,
    error: null,
    page: 1,
    totalPages: 1,
    modal: { isOpen: false, selectedImage: null },
    isLoading: false,
    options: {
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 18,
    },
  };

  onOpenModal = selectedImage => {
    this.setState({ modal: { modalIsOpen: true, selectedImage } });
  };

  onCloseModal = () => {
    this.setState({ modal: { modalIsOpen: false, selectedImage: null } });
  };

  onSubmit = event => {
    event.preventDefault();
    if (event.target.searchText.value) {
      const searchText = event.target.searchText.value;
      this.setState({ searchText, page: 1, totalPages: 1, images: [] });
      event.target.searchText.value = '';
    } else {
      toast.error('Please enter a search term', toastConfig);
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText !== this.state.searchText) {
      this.handleFetchRequest();
    }
  }

  async handleFetchRequest() {
    try {
      this.setState({ isLoading: true });

      const response = (
        await fetchImages(
          this.state.searchText,
          this.state.page,
          this.state.options
        )
      ).data;
      const totalHits = response.totalHits;
      const images = response.hits;
      if (images.length === 0) {
        toast.warning(`No images found`, toastConfig);
      }

      if (this.state.page === 1 && totalHits > 0) {
        toast.success(`We've found ${totalHits} images`, toastConfig);
        const totalPages = totalHits / this.state.options.per_page;
        this.setState({ images, totalHits, totalPages });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
        }));
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleBtnClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    }, this.handleFetchRequest);
  };

  render() {
    return (
      <div className={css.App}>
        <ToastContainer />
        <SearchBar onSubmit={this.onSubmit} />

        {this.state.totalHits && (
          <ImageGallery
            images={this.state.images}
            onOpenModal={this.onOpenModal}
          />
        )}

        {this.state.totalHits && this.state.page < this.state.totalPages && (
          <Button handleBtnClick={this.handleBtnClick} />
        )}

        {this.state.isLoading && (
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass={css.LoaderWrapper}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
        {this.state.modal.modalIsOpen && (
          <Modal
            onCloseModal={this.onCloseModal}
            selectedImage={this.state.modal.selectedImage}
          />
        )}
      </div>
    );
  }
}
