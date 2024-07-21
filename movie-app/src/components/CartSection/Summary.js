import React from 'react';
import "./Summary.css";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

/**
 * Component that displays a summary of the cart, including the total price and shipping options.
 *
 * @param {Object[]} cart - The array of cart items.
 * @returns {JSX.Element} The JSX markup for rendering the cart summary.
 */
const Summary = ({cart}) => {
    /**
     * Calculates the total price of the items in the cart.
     *
     * @type {string} The total price with two decimal places.
     */
    const totalPrice = ((cart.length) * 3.99).toFixed(3);

    /**
     * Calculates the total price with delivery charge.
     *
     * @type {string} The total price with delivery charge with two decimal places.
     */
    const totalPriceWithDelivery = (parseFloat(totalPrice) + 5.00).toFixed(3);

    // JSX markup to render the cart summary
    return (
        <Col md={4} className="summary">
            <div>
                <h5>
                    <b>Summary</b>
                </h5>
            </div>

            <Row>
                <Col style={{paddingLeft: 0}}>items {cart.length}</Col>
                <Col className="text-right">&#36;{totalPrice}</Col>
            </Row>
            <form>
                <p>SHIPPING</p>
                <select>
                    <option className="text-muted">Standard-Delivery- &#36;5.00</option>
                </select>
            </form>
            <div className="row" style={{borderTop: '1px solid rgba(0, 0, 0, .1)', padding: '2vh 0'}}>
                <Col>TOTAL PRICE</Col>
                <Col className="text-right">&#36; {totalPriceWithDelivery}</Col>
            </div>
            <Link to="/checkout">
                <button className="btn">CHECKOUT</button>
            </Link>
        </Col>
    );
};

export default Summary;
