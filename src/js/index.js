import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPhoto } from "./api.js";


const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});



const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
    }

refs.searchForm.addEventListener('submit', onSearch)
      
refs.btnLoadMore.classList.add('is-hidden');

const perPage = 40;
let page = 1;
let query = '';



async function onSearch(event) {
  event.preventDefault();

  refs.gallery.innerHTML = '';
  page = 1;
  query = event.currentTarget.elements.searchQuery.value;
  // console.log(query);
  
    if (query === '') {
    Notiflix.Notify.info('Enter your request, please!');
    return;
  }
  
    await fetchPhoto(query, page, perPage).then(data => {
      if (data.totalHits === 0) {
       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
         
      else {
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
      refs.gallery.insertAdjacentHTML('beforeend', renderGalleryCards(data.hits));
      lightbox.refresh();
      }
      
      if (data.totalHits > perPage) {
      refs.btnLoadMore.classList.remove('is-hidden');
      }
    
    }).catch(onFetchError)
  
      refs.btnLoadMore.addEventListener('click', onLoadMore)
  
  }
        
async function onLoadMore() {
  page += 1;
  await fetchPhoto(query, page, perPage).then(data => {
    const numberOfPage = Math.ceil(data.totalHits / perPage);
    refs.gallery.insertAdjacentHTML('beforeend', renderGalleryCards(data.hits));
    lightbox.refresh();

    if (page === numberOfPage) {
      refs.btnLoadMore.classList.add('is-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      // btnLoadMore.removeEventListener('click', onClickLoadMore);
    }
  })
    .catch(onFetchError);
  }



function onFetchError() {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!');
};




function renderGalleryCards (data) {
const markup = data.map(
      item =>
        `<div class="photo-card">
        <a href='${item.largeImageURL}'>
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes<br>${item.likes}</b>
          </p>
          <p class="info-item">
            <b>Views<br>${item.views}</b>
          </p>
          <p class="info-item">
            <b>Comments<br>${item.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads<br>${item.downloads}</b>
          </p>
        </div>
      </div>`
    )
    .join('');

    refs.gallery.insertAdjacentHTML('beforeend', markup);

}


