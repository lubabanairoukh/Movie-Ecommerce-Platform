import {toast, ToastContainer} from "react-toastify";
import Summary from "../CartSection/Summary";
import {Col, Row} from "react-bootstrap";
import CartProduct from "../CartSection/CartProduct";
import {CartContext} from "../CartContext";
import React, {useContext, useEffect} from 'react';
import "../CartSection/Summary.css";
import {FETCH_DATA_URL, fetchDataCart} from "../consts";

/**
 * Component for displaying the shopping cart page.
 *
 * @returns {JSX.Element} The JSX markup for rendering the cart page.
 */
const CartPage = () => {
    const [cart, setCart] = useContext(CartContext);

    /**
     * Fetches the cart data from the server and updates the cart state.
     */
    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await fetchDataCart(FETCH_DATA_URL);
                const isAllNull = Object.values(response[0]).every((value) => value === null);
                if (isAllNull) {
                    if(response.length > 1)
                        setCart(prevCart => response.slice(1));
                } else {
                    if(response.length !== 0)
                        setCart(prevCart => response);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getCart().catch(e => console.log(e));
    }, [setCart]);

    /**
     * Deletes an item from the cart.
     *
     * @param {number} id - The ID of the item to be deleted.
     */
    const deleteItem = (id) => {
        setCart(cart.filter(c => c.id !== id));
    };

    /**
     * Renders the cart items.
     *
     * @returns {JSX.Element[]} An array of JSX elements representing the cart products.
     */
    const renderCart = () => {
        return cart.map(c => (
            c.title ? <CartProduct key={c.id} cart={c} deleteItem={deleteItem} /> : null
        ));
    };

    /**
     * Deletes all items from the cart.
     */
    const deleteAll = async () => {
        try {
            const response = await fetchDataCart(FETCH_DATA_URL, "DELETE");
            if (response)
                setCart([]);
        } catch (error) {
            toast.error("Error deleting all items.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 500,
            });
        }
    };

    // JSX markup to render the cart page
    return (
        cart.length > 0 ?
            <div className="cardss">
                <Row>
                    <Col md={8} className="cart">
                        <div className="title">
                            <Row>
                                <Col><h4><b>Shopping Cart</b></h4></Col>
                                <Col className="align-self-center text-right text-muted">{cart.length} items</Col>
                                <Col className="align-self-center text-right delete-all" onClick={deleteAll}>delete all</Col>
                            </Row>
                        </div>
                        {renderCart()}
                    </Col>
                    <Summary cart={cart} />
                </Row>
                <ToastContainer />
            </div>
            :
            <h2 style={{color: 'white'}}>Go and shop for products First!</h2>
    );
};

export default CartPage;
