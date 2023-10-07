// ShoppingCart.js
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/cartContext';
import { Navbar } from '../components/navbar';
import "./shoppingCart.css"
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    imageURL: string;
    price: number;
    quantity: number;
    description: string;
    store: string;
    discount: number;
    notification: boolean;
}

interface CartItem {
    product: Product;
    quantity: number;
}

export default function ShoppingCart() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
    const [isCheckoutAlertOpen, setIsCheckoutAlertOpen] = useState(false);
    const [isQuantityValidAlert, setIsQuantityValidAlert] = useState(false);
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);

    const router = useRouter();

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    
    async function getProducts() {
        try {
            const url = `http://localhost:8080/`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Network response was not ok (${res.status} - ${res.statusText})`);
            }
            const testData = await res.json();
            setProductsData(testData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function getCartItems() {
        try {
            const res = await fetch("http://localhost:8080/cart/4");
            if (!res.ok) {
                throw new Error(`Network response was not ok (${res.status} - ${res.statusText})`);
            }
            const apiData = await res.json();
            // Transform the API response into an array of CartItem objects
            const cartItems: CartItem[] = apiData.map((item: any) => ({
                product: {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    imageURL: item.imageURL,
                },
                quantity: item.quantity,
            }));

            setShoppingCart(cartItems);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    

    async function removeProductFromCart() {
        if (shoppingCart.length > 0) {
            const cartId = 4;
            for (let i = 0; i < shoppingCart.length; i++) {
                let productId = shoppingCart[i].product.id;
                try {
                    const response = await fetch(`http://localhost:8080/${cartId}/${productId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        router.push("/shoppingcart")
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

    async function addAllItemToCartAPI() {
        const cartId = 4;
        for (let i = 0; i < cart.length; i++) {
            const productId = cart[i].product.id;
            const quantity = cart[i].quantity;
            try {
                const res = await fetch("http://localhost:8080", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cartId: cartId,
                        productId: productId,
                        quantity: quantity,
                    }),
                });

                if (!res.ok) {
                    throw new Error(`Network response was not ok (${res.status} - ${res.statusText})`);
                }
                console.log("response: ", await res.json());
            } catch (error) {
                console.error("Error updating cart on the server:", error);
            }
        }

    }

    React.useEffect(() => {
        getProducts();
        getCartItems();
    }, []);

    const handleRemoveFromCart = (productId: number) => {
        removeFromCart(productId);
    };

    const handleIncreaseQuantity = (productId: number) => {
        const cartItem = cart.find((item) => item.product.id === productId);
        const productItem: any = productsData.find((product) => product.id === productId);
        if(cartItem && cartItem.quantity+1 <=productItem.quantity) {
            increaseQuantity(productId);
        }
        else{
            setIsQuantityValidAlert(true);
        }
    };
 
    const handleDecreaseQuantity = (productId: number) => {
        const cartItem = cart.find((item) => item.product.id === productId);

        if (cartItem && cartItem.quantity > 1) {
            decreaseQuantity(productId);
        } else {
            removeFromCart(productId);
        }
    };

    async function handleCheckout() {
        if (cart.length === 0) {
            // Show alert for an empty cart
            setIsCheckoutAlertOpen(true);
        } else {
            await removeProductFromCart();
            await addAllItemToCartAPI();
            router.push('/checkout');
        }
    };

    const handleCheckoutAlertClose = () => {
        setIsCheckoutAlertOpen(false);
    };

    const handleValidQuantityAlertClose = () => {
        setIsQuantityValidAlert(false);
    }


    return (
        <>
            <Navbar activePath="Shopping Cart" />
            <section className="h-screen bg-gray-100">
                <div className="container mx-auto p-5 ">
                    <div className="flex justify-center items-center h-full">
                        <div className="lg:w-8/12 bg-white p-8 rounded-lg shadow-lg">
                            <h1 className="text-2xl font-bold mb-5 textBlack" >Shopping Cart</h1>

                            <div className="grid grid-cols-3 gap-4 border-b-2 border-gray-300 pb-4 mb-4 textBlack">
                                <div className="col-span-1 ">Product Name:</div>
                                <div className="col-span-1 ">Quantity:</div>
                                <div className="col-span-1 ">Price:</div>
                            </div>

                            {cart.map(({ product, quantity }) => (
                                <div key={product.id} className="grid grid-cols-4 gap-4 border-b-2 border-gray-300 py-4 flex textBlack">
                                    <div className="col-span-1 flex items-center justify-start ">
                                        <img src={product.imageURL} alt={product.name} className="w-20 h-auto" />
                                        <span className="ml-2"><h5 className="text-black">{product.name}</h5></span>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-end">
                                        <button
                                            onClick={() => handleDecreaseQuantity(product.id)}
                                            className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800 rounded-full focus:outline-none"
                                        >
                                            -
                                        </button>
                                        <span className="px-3">{quantity}</span>
                                        <button
                                            onClick={() => handleIncreaseQuantity(product.id)}
                                            className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800 rounded-full focus:outline-none"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-end ">
                                        ${(product.price * quantity).toFixed(2)}
                                    </div>
                                    <div className="col-span-1 flex items-center justify-end">
                                        <button
                                            onClick={() => handleRemoveFromCart(product.id)}
                                            className="text-grey-600 hover:text-red-500 p-1 rounded-full focus:outline-none"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-5 textBlack flex justify-between items-center">
                                <div>
                                    <div className="flex items-center font-bold">
                                        <span className="text-xl mr-2">Total Items: {totalQuantity}</span>
                                    </div>
                                    <div className="flex items-center font-bold">
                                        <span className="text-xl">Total Price: ${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button 
                                    className="bg-gray-800 text-white px-2 py-2 rounded-md w-max hover:bg-gray-700 mr-4" 
                                    style={{ whiteSpace: 'nowrap' }}
                                    onClick={() => router.push('/products')}
                                    >
                                        Add more products
                                    </button>

                                    <button 
                                    className="bg-gray-800 text-white px-2 py-2 rounded-md w-max hover:bg-gray-700"
                                    onClick={clearCart}>
                                        Clear cart
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5">
                                <button
                                    onClick={handleCheckout}
                                    className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-700"
                                >
                                    Checkout
                                </button>
                            </div>

                            {/* Checkout alert */}
                            <div className={`mt-4 ${isCheckoutAlertOpen ? 'block' : 'hidden'}`}>
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Cart is empty.</strong> Add items to the cart before proceeding to checkout.
                                    <button
                                        onClick={handleCheckoutAlertClose}
                                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                                    >
                                        <span className="text-red-700 hover:text-red-900">×</span>
                                    </button>
                                </div>
                            </div>

                            {/* Quantity alert */}
                            <div className={`mt-4 ${isQuantityValidAlert ? 'block' : 'hidden'}`}>
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Stock Not available</strong>
                                    <button
                                        onClick={handleValidQuantityAlertClose}
                                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                                    >
                                        <span className="text-red-700 hover:text-red-900">×</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            

        </>
    );
}
