import axios from "axios";
import { FETCH_DATA_URL, fetchDataCart } from "../consts";
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import './CheckoutPage.css';

/**
 * Component for displaying the checkout page.
 *
 * @returns {JSX.Element} The JSX markup for rendering the checkout page.
 */
const CheckoutPage = () => {
    const [data, setData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        payment: 0.00,
    });
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidFirstName, setIsValidFirstName] = useState(true);
    const [isValidLastName, setIsValidLastName] = useState(true);

    /**
     * Fetches the cart data to get the payment amount and updates the data state.
     */
    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await fetchDataCart(`${FETCH_DATA_URL}total-price`);
                console.log(response);
                setData((prevData) => ({
                    ...prevData,
                    payment: response
                }));
            } catch (error) {
                console.error(error);
            }
        };

        getCart().catch(e => console.log(e));
    }, []);

    /**
     * Handles input changes in the form fields and updates the data state accordingly.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    /**
     * Handles form submission.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        const isValidEmail = validateEmail(data.email);
        setIsValidEmail(isValidEmail);

        // Validate first name
        const isValidFirstName = validateName(data.firstName);
        setIsValidFirstName(isValidFirstName);

        // Validate last name
        const isValidLastName = validateName(data.lastName);
        setIsValidLastName(isValidLastName);

        // Submit the form if all fields are valid
        if (isValidEmail && isValidFirstName && isValidLastName) {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("payment", data.payment);
            formData.append("firstName", data.firstName);
            formData.append("lastName", data.lastName);

            try {
                const response = await axios.post('/debug/purchases', formData);
                if (response.data) {
                    await fetchDataCart(`${FETCH_DATA_URL}`, "DELETE");
                    window.location.href = "/";
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    /**
     * Validates an email address.
     *
     * @param {string} email - The email address to validate.
     * @returns {boolean} true if the email is valid, false otherwise.
     */
    const validateEmail = (email) => {
        // Simple email validation regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    /**
     * Validates a name.
     *
     * @param {string} name - The name to validate.
     * @returns {boolean} true if the name is valid, false otherwise.
     */
    const validateName = (name) => {
        // Name should have at least 2 characters
        return name.length >= 2;
    };

    // JSX markup to render the checkout page
    return (
        <>
            <h3>Check Out Page</h3>
            <Form className="form" onSubmit={handleSubmit}>
                <FormGroup>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={handleInputChange}
                        isInvalid={!isValidEmail}
                    />
                    {!isValidEmail && (
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>
                    )}
                </FormGroup>
                <FormGroup>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Jane"
                        value={data.firstName}
                        onChange={handleInputChange}
                        isInvalid={!isValidFirstName}
                    />
                    {!isValidFirstName && (
                        <Form.Control.Feedback type="invalid">
                            First name should have at least 2 characters.
                        </Form.Control.Feedback>
                    )}
                </FormGroup>
                <FormGroup>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={data.lastName}
                        onChange={handleInputChange}
                        isInvalid={!isValidLastName}
                    />
                    {!isValidLastName && (
                        <Form.Control.Feedback type="invalid">
                            Last name should have at least 2 characters.
                        </Form.Control.Feedback>
                    )}
                </FormGroup>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control placeholder={data.payment} disabled />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </>
    );
};

export default CheckoutPage;
