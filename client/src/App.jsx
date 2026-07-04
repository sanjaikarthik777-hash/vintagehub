import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist';
import { useAppStore } from './store/store';

function App() {
    const { darkMode } = useAppStore();

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col font-sans bg-gray-50 transition-colors duration-300">
                <Navbar />
                <main className="flex-grow pb-16 md:pb-0">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/shop/gender/:gender" element={<Shop />} />
                        <Route path="/shop/category/:category" element={<Shop />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
