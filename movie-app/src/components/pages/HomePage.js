import React, { useEffect, useReducer, useState } from 'react';
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import reducerProducts from "../consts";
import SearchSection from "../SearchSection/SearchSection";
import "../SearchSection/StyleSearchSection.css";
import MovieCard from "../SearchSection/MovieCard";
import { HistoryProvider } from "../HistoryContext";

/**
 * Component for rendering the home page.
 *
 * @returns {JSX.Element} The JSX markup for rendering the home page.
 */
const HomePage = () => {
    const [products, dispatch] = useReducer(reducerProducts, []);
    const [searchTitle, setSearchTitle] = useState("");

    /**
     * Checks the products state and sets the search title accordingly.
     */
    useEffect(() => {
        if (products.length === 0) {
            setSearchTitle("No results!");
        } else {
            setSearchTitle("");
        }
    }, [products]);

    /**
     * Sets the products state based on the response data.
     *
     * @param {Object} res - The response object containing the data.
     */
    const setProducts = (res) => {
        try {
            const data = res.data;
            dispatch({ type: 'reset', payload: data.results });
            data.results.forEach((item) => {
                const typeProduct = data.type ? data.type : item.media_type;
                dispatch({ type: typeProduct, payload: item });
            });
        } catch (error) {
            console.log("Error Fetching: ", error);
        }
    };

    /**
     * Renders the movie cards based on the products state.
     *
     * @returns {JSX.Element[]} An array of JSX elements representing the movie cards.
     */
    const renderProducts = () => {
        return products.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
        ));
    };

    // JSX markup to render the home page
    return (
        <Container>
            <Row>
                <HistoryProvider>
                    <SearchSection setProducts={setProducts} />
                </HistoryProvider>
                <Col lg={8} className="all-Products">
                    <Row>
                        {searchTitle ? <h2 style={{ color: 'white' }}>{searchTitle}</h2> : renderProducts()}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
