
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {toast, ToastContainer} from "react-toastify";
import {FETCH_DATA_URL, fetchDataCart, MOVIE_IMAGE_PATH} from "../consts";
import React from 'react';
import "./CartProduct.css"
import {Col, Row} from "react-bootstrap";

/**
 * Component representing a single item in the cart.
 * It displays the product image, title, release date (if available), price, and a delete button.
 * The delete button allows the user to remove the item from the cart.
 *
 * @param {Object} cart - The cart item object.
 * @param {Function} deleteItem - Callback function to delete the item from the cart.
 * @returns {JSX.Element|null} The JSX markup for rendering the cart item.
 */
const CartProduct = ({cart, deleteItem}) => {
    /**
     * Handles the delete item action by sending a DELETE request to the server.
     * If the deletion is successful, it calls the `deleteItem` callback to update the cart.
     * If there's an error, it displays an error toast notification.
     */
    const handleDeleteItem = async () => {
        try {
            const response = await fetchDataCart(`${FETCH_DATA_URL}${cart.id}`, "DELETE");
            if (response) {
                deleteItem(cart.id);
            }
        } catch (error) {
            toast.error("Error deleting item.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 500,
            });
        }
    };

    // JSX markup to render the cart item
    return (
        cart ? (
            <Row className="border-top border-bottom">
                <Row className="main align-items-center">
                    <Col lg={2}>
                        <img className="img-fluid" src={MOVIE_IMAGE_PATH + cart.posterPath} alt="product-Picture"/>
                    </Col>
                    <Col>
                        <Row>{cart.title}</Row>
                        {cart.releaseDate !== "Null" && <Row className="text-muted">{cart.releaseDate}</Row>}
                    </Col>
                    <Col>&#36; {cart.price}</Col>
                    <Col>
                        <FontAwesomeIcon
                            onClick={handleDeleteItem}
                            icon={faXmark}
                            style={{color: "#000000"}}
                            className="delete-icon"
                        />
                    </Col>
                </Row>
                <ToastContainer/>
            </Row>
        ) : null
    );
};

export default CartProduct;
