'use client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Navbar } from '../components/navbar';
import { useCart } from '../context/cartContext';
import { useEffect, useState } from 'react';
import React from 'react';
import Link from 'next/link';


interface CartItem {
    product: Product;
    quantity: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageURL: string;
    discount: number;
    notification: boolean;
}

export default function Receipt(){
    const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);
    const {clearCart, form}= useCart();

    async function getCartItems() {
        try {
            const res = await fetch("http://localhost:8080/cart/4");
            if (!res.ok) {
                throw new Error(`Network response was not ok (${res.status} - ${res.statusText})`);
            }
            const apiData = await res.json();
            console.log("apidata", apiData);
            // Transform the API response into an array of CartItem objects
            const cartItems: CartItem[] = apiData.map((item: any) => ({
                product: {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    imageURL: item.imageURL,
                    discount: item.discount,
                    notification: item.notification
                },
                quantity: item.quantity,
            }));

            setShoppingCart(cartItems);
            console.log("cart8: ", cartItems);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function removeProductFromCart() {
        if (shoppingCart.length > 0) {
            const cartId = 4;
            for (let i = 0; i < shoppingCart.length; i++) {
                const productId = shoppingCart[i].product.id;
                try {
                    const response = await fetch(`http://localhost:8080/${cartId}/${productId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json', // You can adjust the content type as needed
                        },
                    });

                    if (response.ok) {
                        // Product removed successfully
                    } else {
                        // Handle the error, such as showing an error message
                        console.error('Failed to remove product from cart:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error while removing product from cart:', error);
                }
            }
        }
    }

    React.useEffect(() => {
        getCartItems(); // Fetch products when the component mounts
        console.log("shoppingcart: ", shoppingCart);
    }, []);

    const totalQuantity = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = shoppingCart.reduce((total, item) => {
        const product = item.product;

        // Check if the product has a notification and a discount
        if (product.notification && product.discount) {
            // Calculate the discounted price
            return total + (product.price - (product.price * product.discount)) * item.quantity;
        } else {
            // Use the normal price if no notification or discount
            return total + product.price * item.quantity;
        }
    }, 0);

    return (
        <>
        <Navbar activePath='' />
            <section className="bg-white">
                <div className="container flex justify-center w-max p-5">
                    <div className="flex justify-center items-center w-full">
                        <div className="lg:w-8/12 bg-white p-8 rounded-lg shadow-lg">
                            <h1 className="text-2xl font-bold mb-5">Order Confirmed</h1>
                            <hr className="my-4" />
                            <div className="mb-5">
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Order Placed </strong><br></br>
                                    Your order has been confirmed and is being processed.  <strong>Here is your receipt!</strong>
                                </div>
                            </div>
                            <hr className="my-4" />
                                <div>
                                    <h1 className="text-2xl font-bold mb-5">Receipt</h1>
                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            <div className="col-span-1">Product Name:</div>
                                            <div className="col-span-1">Quantity:</div>
                                            <div className="col-span-1">Price:</div>
                                        </div>
                                    <hr className="my-4" />
                                    {shoppingCart.map(({ product, quantity }) => (
                                        <div key={product.id} className="mb-4">
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="col-span-1 flex items-center justify-start ">
                                                    <img src={product.imageURL} alt={product.name} className="w-20 h-auto" />
                                                    <span className="ml-2"><h6 className="text-black">{product.name}</h6></span>
                                                </div>
                                                <div className="col-span-1 flex items-center justify-start">
                                                    {quantity}
                                                </div>
                                                <div className="col-span-1 text-right flex items-center justify-start">
                                                    {product.notification ?
                                                        `$${((product.price - (product.price * product.discount)) * quantity).toFixed(2)} (Discounted)` :
                                                        `$${(product.price * quantity).toFixed(2)}`
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <hr className="my-4" />
                                    <div className="mt-5">
                                    <div className="">
                                        <strong>Shipping Option: </strong>{" "}
                                        {form.shippingOption === "5"
                                            ? "Standard-Delivery (3-5 days) - $5.00"
                                            : form.shippingOption === "10"
                                                ? "Express-Delivery (1-2 days) - $10.00"
                                                : form.shippingOption === "20"
                                                    ? "Same Day Delivery (1 day) - $20.00"
                                                    : ""}
                                    </div>
                                    <div className="">
                                        <div className="flex items-center font-semibold">
                                            <span className="text-lg mr-2">Total Items: {totalQuantity}</span>
                                        </div>
                                        <div className="flex items-center font-semibold">
                                            <span className="text-lg">Total Price: ${(totalPrice + parseInt(form.shippingOption)).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <h1 className="text-xl font-bold">Delivery Details</h1>
                                            <div className="">
                                                <div className="flex items-center">
                                                    <span className="text-lg mr-2"><strong>Name</strong>: {form.firstName} {form.lastName}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-lg"><strong>Email</strong>: {form.email}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-lg"><strong>Address</strong>: {form.address1} {form.address2}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-lg"><strong>Country</strong>: {form.country}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-lg"><strong>Postal</strong>: {form.postalCode}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-lg"><strong>Phone Number</strong>: {form.phoneNumber}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <h1 className="text-xl font-bold">Card Details</h1>
                                            <div className="">
                                                <div className="flex items-center">
                                                    <span className="text-lg mr-2"><strong>Card Holder Name</strong>: {form.cardholderName}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-lg"><strong>Card Number</strong>: {form.cardNumber}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-lg"><strong>Expiry Date</strong>: {form.selectedDate}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-lg"><strong>Type</strong>: Debit</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <div className="mt-5">
                                        <h6 className="mb-0">
                                            <a 
                                            href="/products" 
                                            className="text-blue-500 hover:underline" 
                                            onClick={(event) => {
                                                removeProductFromCart(); 
                                                clearCart();
                                            }}
                                            >
                                                <i className="fas fa-long-arrow-alt-left me-2"></i> Back to shop
                                            </a>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </section>

</>
    );
}