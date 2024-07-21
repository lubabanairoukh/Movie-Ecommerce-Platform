

import {MOVIE_IMAGE_PATH, fetchDataCart, FETCH_DATA_URL} from "../consts";

import React, { useState } from 'react';

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieCard = ({ movie }) => {

    const [expanded, setExpanded] = useState(false);
    const truncatedOverview = movie.overview.slice(0, 100) + "...";

    const handleReadMoreClick = () => {
        setExpanded(!expanded);
    };

    const handleAddToCart = async () => {
        const date = movie.release_date ? movie.release_date : "Null";
        const dataToPost = {
            id: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            releaseDate: date,
            price: 3.99,
        };

        try {
            const response = await fetchDataCart(`${FETCH_DATA_URL}`, "post", dataToPost);

            if (response) {
                toast.success("Item added to cart successfully!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 500,
                });
            } else {
                toast.error("Item is already in cart!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 500,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching data.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 500,
            });
        }
    };



    return (
        <>
            <div className="product">
                <img src={`${MOVIE_IMAGE_PATH}${movie.poster_path}`} alt={movie.title} />
                <div className="product-details">
                    {movie.release_date && <span className="tag">{movie.release_date}</span>}
                    <span className="tag">{movie.original_language}</span>
                    <span className="tag">{movie.type}</span>
                    <span className="tag-Price">3$</span>
                    <div className="product-title">{movie.title}</div>
                    <p>{expanded ? movie.overview : truncatedOverview}</p>
                    <button onClick={handleReadMoreClick}>
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                    <button onClick={handleAddToCart}>Add to Card</button>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default MovieCard;
