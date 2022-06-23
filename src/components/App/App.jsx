import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Audio } from 'react-loader-spinner';

import { animateScroll as scroll } from 'react-scroll';

import Api from 'services/Api.js';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Modal from '../Modal';
import Loader from '../Loader';

import s from './App.module.css';

class App extends Component { 
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    showModal: false,
    status: 'idle',
    total: 0,
    largeImage: '',
  };
  
  componentDidUpdate = (prevProps, prevState) => {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({
        images: [],
        status: 'pending',
        page: 1,
      });

      this.getImages();
    }

    if (page !== prevState.page && page !== 1) {
      this.setState({
        status: 'pending'
      });
      this.getImages();
      scroll.scrollToBottom();
    }
  };

  async getImages() { 
    const { searchQuery, page } = this.state;

    try {
      const imagesGallery = await Api.ServiceApi(searchQuery, page);

      if (imagesGallery.hits.length === 0) {
        this.setState({
          status: 'idle',
        });
        toast.error(`${searchQuery} not found`);
      }
    
      this.setState(prevState => ({
        images: [...prevState.images, ...imagesGallery.hits],
        status: 'resolved',
        total: imagesGallery.totalHits,
      }));
    } catch (error) { 
      this.setState({
        error,
        status: 'rejected',
      });
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
    });
  };

  handleButtonClick = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickImage = e => {
    this.toggleModal();
    this.setState({ largeImage: e });
  };

  render() { 
    const {images, showModal, status, total, largeImage } = this.state;
    const { handleFormSubmit, toggleModal, handleButtonClick } = this;
    
    return (
      <div className={s['container']}>
        <Searchbar
          onSubmit={handleFormSubmit} />
        
        {status === 'resolved' && (
          <ImageGallery images={images} onClick={this.onClickImage} />
        )}

        {status === 'pending' && (
          <div>
            <Loader />
            <Audio
              height="100"
              width="100"
              color="#3f51b594"
              ariaLabel="loading"
            />
          </div>
        )}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img className={s['image']}
              src={largeImage}
              alt={''}  />
          </Modal>
        )}
                
        {images.length > 0 && images.length < total && (
          <Button onClick={handleButtonClick} />
        )}
        
        <ToastContainer autoClose={3000} />
        </div>
    )
  }
}

export default App;