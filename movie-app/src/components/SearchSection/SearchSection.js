import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import FilterSection from './FilterSection';
import SearchBar from './SearchBar';
import axios from 'axios';
import { HistoryContext } from '../HistoryContext';
import HistoryList from '../HistoryList';
import {TMDB_API_KEY, TMDB_BASE_URL} from "../consts";

const SearchSection = ({ setProducts }) => {
    const { addToHistory } = useContext(HistoryContext);
    const [data,setData]=useState({
        url:`${TMDB_BASE_URL}/trending/all/day`,
        params:{ api_key: TMDB_API_KEY},
        options: {type:"trending"},
        fetchFromHistory:true,
    })

    useEffect(() => {
        fetchData(data.url,data.params,data.options,data.fetchFromHistory);
    }, [data]);

    const fetchData = async (url, paramsToFetch, typeOfFetch, fetchFromHistory) => {
        try {
            const response = await axios.get(url, {
                params: paramsToFetch,
            });
            if (typeOfFetch.type === 'filter') {
                response.data.type = typeOfFetch.data;
            }
            if (!fetchFromHistory) {
                handleSearchValue(url,paramsToFetch,typeOfFetch);
            }
            setProducts(response);
        } catch (error) {
            console.log('Error fetching genres:', error);
        }
    };

    const handleSearchValue=()=> {
        if (data.options.type === 'filter') {
            addToHistory({
                stringSearch: data.params.with_text_query,
                url: data.url,
                params: data.params,
                options: data.options,
            })
        } else {
            addToHistory({stringSearch: data.params.query, url: data.url, params: data.params, options: data.options,})
        }
    }



    return (
        <>
            <Row lg={2}>
                <Col lg={12} className='Search-Page'>
                    <SearchBar setData={setData} />
                </Col>

            </Row>
            <Col lg={4} sm={4} md={4}>
                <Row>
                    <FilterSection setData={setData} />
                </Row>
                <Row>
                    <HistoryList
                        setData={setData}
                    />
                </Row>
            </Col>

        </>
    );
};

export default SearchSection;
