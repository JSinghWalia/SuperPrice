// ShoppingCart.js
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './shoppingCart.css';
import { useCart } from '../context/cartContext';
import { Navbar } from '../components/navbar';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { productsData } from '../products/productData';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ShoppingCart() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const [shippingOption, setShippingOption] = useState('5'); // Default to the first option
    const [isCheckoutAlertOpen, setIsCheckoutAlertOpen] = useState(false);
    const router = useRouter();


    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const shippingCost = parseFloat(shippingOption);
    const totalWithShipping = totalPrice + shippingCost;



    const handleRemoveFromCart = (productId: number) => {
        removeFromCart(productId);
    };

    const handleIncreaseQuantity = (productId: number) => {
        increaseQuantity(productId);
    };
 
    const handleDecreaseQuantity = (productId: number) => {
        const cartItem = cart.find((item) => item.product.id === productId);

        if (cartItem && cartItem.quantity > 1) {
            decreaseQuantity(productId);
        } else {
            removeFromCart(productId);
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            // Show alert for an empty cart
            setIsCheckoutAlertOpen(true);
        } else {
            // Navigate to the checkout page or perform the desired action
            // Replace this with your actual navigation logic
            // For example: router.push('/checkout');
            router.push('/checkout');
        }
    };

    const handleCheckoutAlertClose = () => {
        setIsCheckoutAlertOpen(false);
    };


    return (
        <>
            <Navbar activePath="Shopping Cart" />
            <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol size="12">
                            <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                                <MDBCardBody className="p-0">
                                    <MDBRow className="g-0">
                                        <MDBCol lg="8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                        Shopping Cart
                                                    </MDBTypography>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <MDBTypography tag="h5" className="text-center">
                                                        Product Name:
                                                    </MDBTypography>
                                                    <MDBTypography tag="h5" className="text-center">
                                                        Quantity:
                                                    </MDBTypography>
                                                    <MDBTypography tag="h5" className="text-center mr-20">
                                                        Price:
                                                    </MDBTypography>
                                                    </div>
                                                {cart.map(({ product, quantity }) => (
                                                <><hr className="my-4" /><MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                                                        <MDBCol md="2" lg="2" xl="2">
                                                            <MDBCardImage
                                                                src={product.imageURL}
                                                                fluid className="rounded-3" alt="Cotton T-shirt" />
                                                        </MDBCol>
                                                        <MDBCol md="3" lg="3" xl="3">
                                                            <MDBTypography tag="h6" className="text-black mb-0">
                                                                {product.name}
                                                            </MDBTypography>
                                                        </MDBCol>
                                                        <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                            <MDBBtn color="link" className="px-2" onClick={() => handleDecreaseQuantity(product.id) }>
                                                                <MDBIcon fas icon="minus" />
                                                            </MDBBtn>

                                                            {quantity}

                                                            <MDBBtn color="link" className="px-2" onClick={() => handleIncreaseQuantity(product.id)}>
                                                                <MDBIcon fas icon="plus" />
                                                            </MDBBtn>
                                                        </MDBCol>
                                                        <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                            <MDBTypography tag="h6" className="mb-0">
                                                                ${(product.price * quantity).toFixed(2)}
                                                            </MDBTypography>
                                                        </MDBCol>
                                                        <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                            <a href="" className="text-muted">
                                                                <MDBIcon fas icon="times" onClick={() => handleRemoveFromCart(product.id)} />
                                                            </a>
                                                        </MDBCol>
                                                    </MDBRow></>

                                                ))}

                                                <div className="pt-5">
                                                    <MDBTypography tag="h6" className="mb-0">
                                                        <MDBCardText tag="a" href="/products" className="text-body">
                                                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                                                            to shop
                                                        </MDBCardText>
                                                    </MDBTypography>
                                                </div>
                                            </div>
                                        </MDBCol>
                                        
                                        <MDBCol lg="4" className="bg-grey">
                                            <div className="p-5">
                                                <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                                    Summary
                                                </MDBTypography>

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-4">
                                                    <MDBTypography tag="h5" className="text-uppercase">
                                                        Items {totalQuantity}
                                                    </MDBTypography>
                                                    <MDBTypography tag="h5">$ {totalPrice.toFixed(2)}</MDBTypography>
                                                </div>

                                                <MDBTypography tag="h5" className="text-uppercase mb-3">
                                                    Shipping
                                                </MDBTypography>

                                                <div className="mb-4 pb-2">
                                                    <select
                                                        className="select p-2 rounded bg-grey"
                                                        style={{ width: "100%" }}
                                                        onChange={(e) => setShippingOption(e.target.value)}
                                                        value={shippingOption}
                                                    >
                                                        <option value="5">Standard-Delivery (3-5 days)- $5.00</option>
                                                        <option value="10">Express-Delivery (1-2 days)- $10.00</option>
                                                        <option value="20">Same Day Delivery (1 day)- $20.00</option>
                                                    </select>
                                                </div>

                                                <MDBTypography tag="h5" className="text-uppercase mb-3">
                                                    Give code
                                                </MDBTypography>

                                                <div className="mb-5">
                                                    <MDBInput size="lg" label="Enter your code" />
                                                </div>

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-5">
                                                    <MDBTypography tag="h5" className="text-uppercase">
                                                        Total price
                                                    </MDBTypography>
                                                    <MDBTypography tag="h5">$ {totalWithShipping.toFixed(2)}</MDBTypography>
                                                </div>

                                                <MDBBtn color="dark" block size="lg" onClick={handleCheckout}>
                                                    Checkout
                                                </MDBBtn>

                                                <Snackbar open={isCheckoutAlertOpen} autoHideDuration={3000} onClose={handleCheckoutAlertClose}>
                                                    <Alert onClose={handleCheckoutAlertClose} severity="error">
                                                        Cart is empty. Add items to the cart before proceeding to checkout.
                                                    </Alert>
                                                </Snackbar>

                                            </div>
                                        </MDBCol>

                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>


            {/* <main className="container mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
                {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="mb-4 border p-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl">{product.name}</h2>
                            <p>Price: {product.price}</p>
                            <div className="flex items-center">
                                <p className="mr-2">Quantity: </p>
                                <button
                                    onClick={() => handleDecreaseQuantity(product.id)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    -
                                </button>
                                <p className="mx-2">{quantity}</p>
                                <button
                                    onClick={() => handleIncreaseQuantity(product.id)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    +
                                </button>
                            </div>
                            <p>Total: ${(product.price * quantity).toFixed(2)}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleRemoveFromCart(product.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                <div className="mt-4">
                    <p>Total Cart Price: ${
                        cart.reduce((total, { product, quantity }) => total + product.price * quantity, 0).toFixed(2)
                    }</p>
                </div>
            </main> */}
        </>
    );
}
