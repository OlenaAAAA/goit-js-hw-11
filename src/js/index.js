import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPhoto } from "./api.js";

let lightbox;
// let lightbox = new SimpleLightbox('.gallery a');

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
    // submitBtn: document.querySelector('.submit-btn'),
}

refs.searchForm.addEventListener('submit', onSearch)


const perPage = 40;
let page = 1;
let query = '';



function onSearch(event) {
  event.preventDefault();

  refs.gallery.innerHTML = '';
  page = 1;
  query = event.currentTarget.elements.searchQuery.value;
  // console.log(query);
  
    if (query === '') {
    Notiflix.Notify.info('Enter your request, please!');
    return;
  }
  
    fetchPhoto(query, page, perPage).then(data => {
      if (data.totalHits === 0) {
       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
         
      else {
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        refs.gallery.insertAdjacentHTML('beforeend', renderGalleryCards(data.hits));
    lightBox = new SimpleLightbox('.gallery a').refresh();

      }

      if (data.totalHits > perPage) {
      refs.btnLoadMore.hidden = false;
      }


      // const searchResults = data.hits;
      // if (data.totalHits === 0) {
      //   Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.', paramsForNotify);
      // } else {
      //   Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
      //   console.log(searchResults);
      //   renderGalleryCards(searchResults);
      //   // lightbox.refresh();

      // };
      // if (data.totalHits > perPage) {
      //   btnLoadMore.classList.remove('is-hidden');
      //   // window.addEventListener('scroll', showLoadMorePage);
      // };
      // scrollPage();
    }).catch(onFetchError)
  
      refs.btnLoadMore.addEventListener('click', onLoadMore)
  
  }
        
function onLoadMore() {
  page += 1;
  fetchPhoto(query, page, perPage).then(data => {
    const numberOfPage = Math.ceil(data.totalHits / perPage);
    refs.gallery.insertAdjacentHTML('beforeend', renderGalleryCards(data.hits));
    lightbox.refresh();

    if (page === numberOfPage) {
      refs.btnLoadMore.hidden = true;
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      // btnLoadMore.removeEventListener('click', onClickLoadMore);
    }
  })
    .catch(onFetchError);
  }




function onFetchError() {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!');
};


// refs.submitBtn.addEventListener('submit', onSearch)

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '39494477-7ec2664e0920ceb3e843d2790';

// fetchPhoto ('dog', 1, 40);

// function onSearch(event) {
//   event.preventDefault();
// getImages().then(data => console.log(data)).catch(error=> console.log(error))

//   // const searchQuery = 
// }


// function getImages() {
//     const params = {
//         q: this.searchQuery,
//         page: this.page,
//         per_page: this.per_page,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//         // key: KEY,
//     };
//     return fetch(`${BASE_URL}?key=${KEY}&${params}`).then(resp => {
//         if (!resp.ok) {
//             throw new Error(resp.statusText)
//         };
//         // console.log(resp);
//         return (resp.json());
//     });
// } 


// function createMarkup(arr) {
//     console.log(arr);
//     return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         (`<div class="photo-card">
//         <div class="img_wrap">
//             <a class="gallery_link" href="${largeImageURL}">
//                 <img src="${webformatURL}" alt="${tags}" width="300" loading="lazy" />
//             </a>
//         </div>
//         <div class="info">
//             <p class="info-item">
//             <b>Likes: ${likes}</b>
//             </p>
//             <p class="info-item">
//             <b>Views: ${views}</b>
//             </p>
//             <p class="info-item">
//             <b>Comments: ${comments}</b>
//             </p>
//             <p class="info-item">
//             <b>Downloads: ${downloads}</b>
//             </p>
//         </div>
//         </div>`).join('');
//     })

// }
    
// console.log(getImages().then(data => refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.results)).catch(err => console.log(err))));
// getImages().then(data => refs.gallery.insertAdjacentHTML('beforeend', renderGalleryCards(data.hits)).catch(error=> console.log(error)));

// fetchPhoto()
// fetchPhoto().then(data => refs.gallery.insertAdjacentHTML('beforeend', renderGalleryCards(data.hits)).catch(error => console.log(error)));
    

function renderGalleryCards (data) {
const markup = data.map(
      item =>
        `<div class="photo-card">
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
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



// function createMarkup(images) {
//     // Перевірка чи існує галерея перед вставкою даних
//     // if (!refs.gallery) {
//     //     return;
//     // }

//     const markup = images.map(image => {
//             const {
//                 id,
//                 largeImageURL,
//                 webformatURL,
//                 tags,
//                 likes,
//                 views,
//                 comments,
//                 downloads,
//             } = image;
//             return `
//         <a class="gallery__link" href="${largeImageURL}">
//           <div class="gallery-item" id="${id}">
//             <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
//             <div class="info">
//               <p class="info-item"><b>Likes</b>${likes}</p>
//               <p class="info-item"><b>Views</b>${views}</p>
//               <p class="info-item"><b>Comments</b>${comments}</p>
//               <p class="info-item"><b>Downloads</b>${downloads}</p>
//             </div>
//           </div>
//         </a>
//       `;
//         })
//         .join('');

//     refs.gallery.insertAdjacentHTML('beforeend', markup);

// }















// import axios from "axios";
// axios.defaults.headers.common["x-api-key"] = "39494477-7ec2664e0920ceb3e843d2790";




// import { createMarkup } from './markup';
// import { fetchPhoto } from './api.js';
// // const pixabayApi = new PixabayAPI();

// import { refs } from "./refs";
// const { searchForm, gallery, btnLoadMore } = refs;


// const BASE_URL = 'https://pixabay.com/api/';
// const KEY = '39494477-7ec2664e0920ceb3e843d2790';

// const perPage = 40;
// let page = 1;
// let keyOfSearchPhoto = '';

// btnLoadMore.classList.add('is-hidden');


// // searchOnSubmit()
 
// // fetchImage()

// // ***** функція пошуку при сабміті форми 1 variant    **********************************
// refs.searchForm.addEventListener('submit', getImages)





// // function getImages (event) {
// //     event.preventDefault();

// //     gallery.innerHTML = '';
    
// //     page = 1;
// //     const { searchQuery } = event.currentTarget.elements;
// //     keyOfSearchPhoto = searchQuery.value
// //         .trim()
// //         .toLowerCase()
// //         .split(' ')
// //         .join('+');
// //     console.log(keyOfSearchPhoto);

// //     if (keyOfSearchPhoto === '') {
// //         Notiflix.Notify.info('Enter your request, please!');
// //         return;
// //     }

// //     fetchPhoto(keyOfSearchPhoto, page, perPage)
// //         // .then(response => response.json())
// //         .then(data => {
// //             const searchResults = data.hits;
// //             if (data.totalHits === 0) {
// //                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.', paramsForNotify);
// //             } else {
// //                 Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
// //                 console.log(searchResults);
// //                 createMarkup(searchResults);
// //                 // lightbox.refresh();

// //             };
// //             if (data.totalHits > perPage) {
// //                 btnLoadMore.classList.remove('is-hidden');
// //                 // window.addEventListener('scroll', showLoadMorePage);
// //             };
// //             // scrollPage();
// //         })
// //         .catch(onFetchError);

// //     btnLoadMore.addEventListener('click', onClickLoadMore);

// //     event.currentTarget.reset();
// // };














// function renderGallery(images) {
//     // Перевірка чи існує галерея перед вставкою даних
//     if (!gallery) {
//         return;
//     }

//     const markup = images.map(image => {
//             const {
//                 id,
//                 largeImageURL,
//                 webformatURL,
//                 tags,
//                 likes,
//                 views,
//                 comments,
//                 downloads,
//             } = image;
//             return `
//         <a class="gallery__link" href="${largeImageURL}">
//           <div class="gallery-item" id="${id}">
//             <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
//             <div class="info">
//               <p class="info-item"><b>Likes</b>${likes}</p>
//               <p class="info-item"><b>Views</b>${views}</p>
//               <p class="info-item"><b>Comments</b>${comments}</p>
//               <p class="info-item"><b>Downloads</b>${downloads}</p>
//             </div>
//           </div>
//         </a>
//       `;
//         })
//         .join('');

//     gallery.insertAdjacentHTML('beforeend', markup);

// }








// function getImages (event) {
//     event.preventDefault();

//    page = 1;
//   query = event.currentTarget.elements.searchQuery.value.trim();
//   gallery.innerHTML = '';

//   if (query === '') {
//     Notiflix.Notify.failure(
//       'The search string cannot be empty. Please specify your search query.',
//     );
//     return;
//   }

//   fetchImages(query, page, perPage)
//     .then(data => {
//       if (data.totalHits === 0) {
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.',
//         );
//       } else {
//         renderGallery(data.hits);
//         simpleLightBox = new SimpleLightbox('.gallery a').refresh();
//         Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//       }
//     })
//     .catch(error => console.log(error))
//     .finally(() => {
//       searchForm.reset();
//     });
// }




// async function fetchImages(query, page, perPage) {
//   const response = await axios.get(
//     `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
//   );
//   return response.data;
// }

// fetchImages('cat', 1, 40)





























// // ***** функція пошуку при сабміті форми **********************************

// // refs.searchForm.addEventListener('submit', getImages)

// // function searchOnSubmit(event) {
// //     event.preventDefault();
// //     pixabayApi.query = event.currentTarget.elements.query.value;
// //     pixabayApi.resetPage();
// //     pixabayApi.fetchImage().then(response => console.log(response));

// // }

// // function getImages (page = 1) {
// //     const params = {
// //         q: this.searchQuery,
// //         page: this.page,
// //         per_page: this.per_page,
// //         image_type: 'photo',
// //         orientation: 'horizontal',
// //         safesearch: 'true',
// //         key: KEY,
// //     };
// //     // const options = {
// //     //     headers: {
// //     //         Authorization: `Bearer ${KEY}`
// //     //     }
    
    
// //     return fetch(`${BASE_URL}?key=${KEY}&q="cat"`).then(resp => console.log(resp));
// // }

// // getImages()


//  return fetch(`${BASE_URL}?key=${KEY}&q="cat"`).then(resp => console.log(resp));