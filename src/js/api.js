import axios from 'axios';

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