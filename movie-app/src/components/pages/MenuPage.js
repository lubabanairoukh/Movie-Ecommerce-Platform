
import React from 'react';
import Container from 'react-bootstrap/Container';
import {Outlet} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const MenuPage = () =>{
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="p-3">
                <Container >
                    <Navbar.Brand >Movie-Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className="text-decoration-none text-white">
                                Home
                            </Nav.Link>
                            <Nav.Link className="text-decoration-none text-white" href="/Cart">
                                Cart
                            </Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>

    );
}
export default MenuPage;