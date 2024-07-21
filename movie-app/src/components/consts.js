import axios from "axios";

export const TMDB_API_KEY = 'e6cc2612009abb1cf6a8722c5d328468'; // TODO: must be in .env file

export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export default function reducerProducts(products, action) {
    const { poster_path, release_date, original_language, title, name, overview, id } = action.payload;

    switch (action.type) {
        case 'reset':
            return [];
        case 'movie':
            return [...products, { type: "movie", poster_path, release_date, original_language, title, overview, id }];
        case 'tv':
            return [...products, { type: "tv show", poster_path, release_date, original_language, title: name, overview, id }];
        default:
            return products;
    }
}

export const fetchDataCart = async (url, method = "get", data = {}) => {
    console.log(url)
    try {
        const response = await axios({
            method,
            url: url,
            data,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};


export const MOVIE_IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";
export const FETCH_DATA_URL="http://localhost:3000/products/";
























