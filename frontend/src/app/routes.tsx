"use client";
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./page";
import Products from "./products/page";
import ProductDetail from "./products/[id]/[name]/page";
import Cart from "./shoppingcart/page";
import Profile from "./profile/page";

export default function Router() {
    return (

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:productId" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>

    );
}