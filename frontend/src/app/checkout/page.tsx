"use client";
import "./checkout.css";
import { Navbar } from "../components/navbar";
import { useRouter } from 'next/navigation';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { Switch } from '@headlessui/react'
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useCart } from '../context/cartContext';
import { MouseEvent } from 'react';
import Link from "next/link";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

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
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    address1: string;
    address2: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    cardholderName: string;
    cardNumber: string;
    selectedDate: string;
    cvv: string;
    shippingOption: string;
}


export default function CheckOut(){
    const router = useRouter();
    const { form, updateFormData, clearFormData } = useCart();
    const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);
    const [formAlert, setFormAlert] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [isValidDate, setisValidDate] = useState(true);
    const [shippingOption, setShippingOption] = useState('5');
    const [selectedDate, setSelectedDate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');


    async function getCartItems(){
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
            console.log("cart2: ", cartItems);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function removeProductFromCart() {
        if(shoppingCart.length > 0) {
            const cartId = 4;
            for (let i = 0; i < shoppingCart.length; i++){
                const productId=shoppingCart[i].product.id;
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
    }, []);
    
    const handleFormAlertClose = () => {
        setFormAlert(false);
    }

    const handleAddingDetails = () => {
        const form: FormData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address1: address1,
            address2: address2,
            postalCode: postalCode,
            country: country,
            phoneNumber: phoneNumber,
            cardholderName: cardholderName,
            cardNumber: cardNumber,
            cvv: cvv,
            selectedDate: selectedDate,
            shippingOption: shippingOption,
        }

        updateFormData(form);
    };    

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Check if all required fields are filled in
        const requiredFields = [
            firstName,
            lastName,
            email,
            address1,
            postalCode,
            country,
            phoneNumber,
            cardholderName,
            cardNumber,
            selectedDate,
            cvv,
        ];

        const isFormValid = requiredFields.every((field) => field.trim() !== '');

        if (!isFormValid) {
            setFormAlert(true);
            return;
        }
        clearFormData();
        handleAddingDetails();
        router.push("/receipt");
    };

    const handleDateChange = (event: any) => {
        // Get the selected value
        const selectedValue = event.target.value;

        // Check if the selected date is in the future (today or later)
        const today = new Date();
        const selectedYear = parseInt(selectedValue.substring(0, 4), 10);
        const selectedMonth = parseInt(selectedValue.substring(5, 7), 10);

        if (selectedYear < today.getFullYear() || (selectedYear === today.getFullYear() && selectedMonth < today.getMonth() + 1)) {
            // Alert the user that the selected date is in the past
            setisValidDate(false);
            return;
        }

        // Update the state with the selected date
        setSelectedDate(selectedValue);
    };
    const handleValidDate = () => {
        setisValidDate(true);
    };

    const totalQuantity = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = shoppingCart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const shippingCost = parseFloat(shippingOption);
    const totalWithShipping = (totalPrice + shippingCost).toFixed(2);
    return(
        <>
        <Navbar activePath="checkout" />
            <section className="grid grid-cols-3 flex justify-stretch" style={{ backgroundColor: "#eee" }}>
                <div className="col-span-2 bg-white p-6 flex flex-col justify-center items-center">
                    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 flex flex-col justify-center items-center">
                        <div
                            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                            aria-hidden="true"
                        >
                            <div
                                className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                                style={{
                                    clipPath:
                                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                            />
                            </div>
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Checkout</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        First name *
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Last name *
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            autoComplete="family-name"
                                            required
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Email *
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Address Line 1 *
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={address1}
                                            onChange={(e) => setAddress1(e.target.value)}
                                            required
                                            autoComplete="organization"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Address Line 2
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={address2}
                                            onChange={(e) => setAddress2(e.target.value)}
                                            autoComplete="organization"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Postal Code *
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            required
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Country *
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Phone number *
                                    </label>
                                    <div className="relative mt-2.5">
                                        <div className="absolute inset-y-0 left-0 flex items-center">
                                            <label htmlFor="country" className="sr-only">
                                                Country
                                            </label>
                                            <select
                                                id="country"
                                                name="country"
                                                className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-3 text-gray-400 
                                                                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                required
                                            >
                                                <option>US</option>
                                                <option>CA</option>
                                                <option>EU</option>
                                                <option>AU</option>
                                            </select>
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone-number"
                                            id="phone-number"
                                            autoComplete="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                            className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Cardholder Name *
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="cardholderName"
                                            id="cardholderName"
                                            value={cardholderName}
                                            onChange={(e) => setCardholderName(e.target.value)}
                                            autoComplete="organization"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Card Number *
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Expiry Date *
                                    </label>
                                    <div className="mt-2.5" >
                                        <input
                                            type="month"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            required
                                            placeholder="MM/YY"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                        />
                                        <Snackbar open={!isValidDate} autoHideDuration={3000} onClose={handleValidDate}>
                                            <Alert onClose={handleValidDate} severity="error">
                                                Past date is invalid! Please try again.
                                            </Alert>
                                        </Snackbar>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        CVV *
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            placeholder="CVV"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            required
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                                    <div className="flex h-6 items-center">
                                        <Switch
                                            checked={agreed}
                                            onChange={setAgreed}
                                            className={classNames(
                                                agreed ? 'bg-indigo-600' : 'bg-gray-200',
                                                'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                            )}
                                        >
                                            <span className="sr-only">Agree to policies</span>
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                                                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                                )}
                                            />
                                        </Switch>
                                    </div>
                                    <Switch.Label className="text-sm leading-6 text-gray-600">
                                        By selecting this, you agree to our{' '}
                                        <a href="#" className="font-semibold text-indigo-600">
                                            privacy&nbsp;policy
                                        </a>
                                        .
                                    </Switch.Label>
                                </Switch.Group>
                            </div>
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Pay & Order
                                </button>
                            </div>
                            <Snackbar open={formAlert} autoHideDuration={3000} onClose={handleFormAlertClose}>
                                <Alert onClose={handleFormAlertClose} severity="error">
                                    Past date is invalid! Please try again.
                                </Alert>
                            </Snackbar>

                            <div className="pt-5">
                                <h6 className="mb-0">
                                    <Link
                                        href="/shoppingcart"
                                        className="text-blue-500 hover:underline"
                                        onClick={async () => {
                                            await removeProductFromCart()
                                        }}
                                    >
                                        <i className="fas fa-long-arrow-alt-left me-2"></i> Back to cart
                                    </Link>
                                </h6>
                            </div>
                        </form>
                    </div>

                    <hr className="my-4" />
                </div>
                <div className="p-5 col-span-1 bg-grey p-6 flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center h-full">
                        <div className="lg:w-8/12 bg-white p-8 rounded-lg shadow-lg">
                            <h1 className="text-2xl font-bold mb-5">Shopping Cart</h1>

                            <div className="grid grid-cols-3 gap-4 border-b-2 border-gray-300 pb-4 mb-4">
                                <div className="col-span-1">Product Name:</div>
                                <div className="col-span-1">Quantity:</div>
                                <div className="col-span-1">Price:</div>
                            </div>

                            {shoppingCart.map(({ product, quantity }) => (
                                <div key={product.id} className="grid grid-cols-4 gap-4 border-b-2 border-gray-300 py-4 flex">
                                    <div className="col-span-1 flex items-center justify-start ">
                                        <img src={product.imageURL} alt={product.name} className="w-20 h-auto" />
                                        <span className="ml-2"><h5 className="text-black">{product.name}</h5></span>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-end">
                                        <span className="px-3">{quantity}</span>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-end ">
                                        ${(product.price * quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                            <div className="mb-4 pb-2">
                                <select
                                    className="select p-2 rounded bg-white"
                                    style={{ width: "100%" }}
                                    onChange={(e) => setShippingOption(e.target.value)}
                                    value={shippingOption}
                                >
                                    <option value="5">Standard-Delivery (3-5 days)- $5.00</option>
                                    <option value="10">Express-Delivery (1-2 days)- $10.00</option>
                                    <option value="20">Same Day Delivery (1 day)- $20.00</option>
                                </select>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center font-bold">
                                    <span className="text-xl mr-2">Total Items: {totalQuantity}</span>
                                </div>
                                <div className="flex items-center font-bold">
                                    <span className="text-xl">Total Price: ${(totalPrice+parseInt(shippingOption)).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        </>
    );
}