import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../consts';
import Message from '../Message';

/**
 * Component for rendering the filter section.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.setData - The function to set the data.
 * @returns {JSX.Element} The JSX markup for rendering the filter section.
 */
const FilterSection = ({ setData }) => {
    const [message, setMessage] = useState('');
    const [genreType, setGenreType] = useState([]);
    const [filterData, setFilterData] = useState({
        query: "",
        options: { id: null, type: null },
        releaseYear: "",
    });

    /**
     * Handles the change event of the type options.
     *
     * @param {Object} event - The event object.
     */
    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        const optionLookup = {
            '1': { id: 1, type: 'movie' },
            '2': { id: 2, type: 'tv' },
        };
        const updatedOption = optionLookup[selectedValue] || { id: null, type: null };
        setMessage('');
        setFilterData((prevFilterData) => ({
            ...prevFilterData,
            options: updatedOption,
        }));
    };

    /**
     * Fetches the genre data based on the selected type.
     */
    const fetchData = async () => {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/genre/${filterData.options.type}/list`, {
                params: {
                    api_key: TMDB_API_KEY,
                },
            });
            const { genres } = response.data;
            const updatedGenres = genres.map((genre) => ({
                ...genre,
                isChecked: false,
            }));

            setGenreType(updatedGenres);
        } catch (error) {
            console.log('Error fetching genres:', error);
        }
    };

    useEffect(() => {
        if (filterData.options.type) {
            fetchData();
        } else {
            setGenreType([]);
        }
    }, [filterData.options.type]);

    /**
     * Handles the form submission.
     *
     * @param {Object} e - The event object.
     */
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (!filterData.options.type) {
            setMessage('Please select type of products');
        } else {
            const selectedGenres = genreType.filter((genre) => genre.isChecked);
            const selectedGenreIds = selectedGenres.map((genre) => genre.id).join('|');

            setData({
                url: `${TMDB_BASE_URL}/discover/${filterData.options.type}`,
                params: {
                    api_key: TMDB_API_KEY,
                    with_text_query: filterData.query,
                    include_adult: false,
                    primary_release_year: parseInt(filterData.releaseYear, 10),
                    first_air_date_year: parseInt(filterData.releaseYear, 10),
                    with_genres: selectedGenreIds,
                },
                options: { type: 'filter', data: filterData.options.type },
                fetchFromHistory: false
            });
        }

        // Reset the form
        setFilterData({
            query: "",
            options: { id: null, type: null },
            releaseYear: "",
        });
    };

    /**
     * Handles the change event of the genre switch.
     *
     * @param {number} genreId - The ID of the genre.
     */
    const handleGenreSwitchChange = (genreId) => {
        const updatedGenreType = genreType.map((genre) => {
            if (genre.id === genreId) {
                return {
                    ...genre,
                    isChecked: !genre.isChecked,
                };
            }
            return genre;
        });

        setGenreType(updatedGenreType);
    };

    /**
     * Renders the genre switches.
     *
     * @returns {JSX.Element[]} An array of JSX elements representing the genre switches.
     */
    const renderGenreSwitches = () =>
        genreType.map((genre) => (
            <Col lg={6} key={genre.id}>
                <Form.Check
                    type="switch"
                    label={genre.name}
                    checked={genre.isChecked}
                    onChange={() => handleGenreSwitchChange(genre.id)}
                />
            </Col>
        ));

    // JSX markup to render the filter section
    return (
        <>
            <Row className="Filter-side">
                <Row style={{ marginTop: '3vh' }}>
                    <h1>Filter Search</h1>
                </Row>
                <Row>
                    <Form onSubmit={handleSubmitForm}>
                        <Row className="mt-3">
                            <Col>
                                <Form.Label>Query</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="kill"
                                    value={filterData.query}
                                    onChange={(e) =>
                                        setFilterData({
                                            ...filterData,
                                            query: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col lg={6}>
                                <Form.Label>Select Type of Objects</Form.Label>
                            </Col>
                            <Col lg={6}>
                                <Form.Select size="sm" onChange={handleOptionChange} value={filterData.options.id || ''}>
                                    <option value="">Select Type</option>
                                    <option value="1">Movies</option>
                                    <option value="2">TV Shows</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Label>Release Year</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="yyyy"
                                    value={filterData.releaseYear}
                                    onChange={(e) =>
                                        setFilterData({
                                            ...filterData,
                                            releaseYear: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            {message ? <Message message={message}/> : null}
                        </Row>
                        <Row>{genreType && renderGenreSwitches()}</Row>
                        <Button variant="primary" type="submit" style={{ marginBottom: '3vh' }}>
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Row>
        </>
    );
};

export default FilterSection;
