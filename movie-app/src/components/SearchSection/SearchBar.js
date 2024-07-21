import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { TMDB_API_KEY, TMDB_BASE_URL } from "../consts";
import Message from "../Message";


const SearchBar = ({ setData }) => {

    const [searchKey, setSearchKey] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        if (searchKey) {
           setData({
                url: `${TMDB_BASE_URL}/search/multi`,
                params: {
                    api_key: TMDB_API_KEY,
                    include_adult: false,
                    query: searchKey,
                },
                options: { type: "searchBar", data: null },
                fetchFromHistory: false,
            });
        } else {
            setMessage("Please insert a valid string");
        }
    };


    return (
        <>

            <Row className="justify-content-md-center">
                <Row className="justify-content-md-center">
                    <form className="input-group" onSubmit={handleSubmit}>
                        <input
                            type="search"
                            className="form-control text-center rounded"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                        ></input>
                        <button className="input-group-text border-0" type="submit" id="search-addon">
                            <FontAwesomeIcon icon={faSearch} display="none" />
                        </button>
                    </form>
                </Row>
                {message ? (
                    <Row className="justify-content-md-center">
                        <Message message={message}></Message>
                    </Row>
                ) : null}
            </Row>

        </>
    );
};

export default SearchBar;
