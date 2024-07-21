import 'bootstrap/dist/css/bootstrap.min.css';
import CheckoutPage from "./components/pages/CheckoutPage";

import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import MenuPage from './components/pages/MenuPage';
import CartPage from './components/pages/CartPage';
import { CartContext } from './components/CartContext';

function App() {
    const [cart, setCart] = useState([]);

    return (
        <BrowserRouter>
            <React.StrictMode>
                <CartContext.Provider value={[cart, setCart]}>
                    <Routes>
                        <Route path="/" element={<MenuPage />}>
                            <Route index element={<HomePage />} />
                            <Route path="cart" element={<CartPage cart={cart} setCart={setCart} />} />
                            <Route path="checkout" element={<CheckoutPage/>}/>
                            <Route path="*" element={<h1>ERROR!!!</h1>}/>
                        </Route>
                    </Routes>
                </CartContext.Provider>
            </React.StrictMode>
        </BrowserRouter>
    );
}

export default App;
