import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';
// const KEY = '39494477-7ec2664e0920ceb3e843d2790';
// // ***************створення класу для пошуку за запитом *****************************

// export class PixabayAPI {
//   constructor() {
//     this.page = 1;
//       this.per_page = 40;
//       this.searchQuery = '';
//     }
// fetchImage() {
//     return axios.get(`${BASE_URL}`, {
//         params: {
//             q: this.searchQuery,
//             page: this.page,
//             per_page: this.per_page,
//             image_type: 'photo',
//             orientation: 'horizontal',
//             safesearch: 'true',
//             key: KEY,
//         },
//     });
// }
//     resetPage() {
//     this.page = 1;
// }
//     get query() {
//     return this.searchQuery;
// }
//     set query(newQuery) {
//     this.searchQuery = newQuery;
// }
// }



// PixabayAPI.fetchImage ()



// СТВОРЕННЯ ЗАПИТУ


const URL = "https://pixabay.com/api/";
const KEY = "39494477-7ec2664e0920ceb3e843d2790";

export async function fetchPhoto(query, page, perPage) {
    const url = `${URL}?key=${KEY}&q=${query}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(url);
    // console.log(response);

    return response.data;  
};

// fetchPhoto ('dog', 1, 40)