import { refs } from './refs';


// функція створення розмітки


export function renderGalleryCards(data) {
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
};





// export function createMarkup(searchResults) {
//     const arrPhotos = searchResults.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         return `<div class="photo-card">
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
//         </div>`
//     });
//     gallery.insertAdjacentHTML("beforeend", arrPhotos.join(''));
// };