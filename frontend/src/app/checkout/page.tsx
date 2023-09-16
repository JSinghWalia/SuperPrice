"use client";
import "./checkout.css";
import { useCart } from "../context/cartContext";
import { Navbar } from "../components/navbar";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
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
import React, { useState } from "react";
import { Switch } from '@headlessui/react'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}


export default function checkout(){
    const { cart } = useCart();
    const [shippingOption, setShippingOption] = useState('5');
    const [agreed, setAgreed] = useState(false)

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const shippingCost = parseFloat(shippingOption);
    const totalWithShipping = (totalPrice + shippingCost).toFixed(2);
    return(
        <>
        <Navbar activePath="" />
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="8">
                                        <div className="p-5">
                                                <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
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
                                                    <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                                                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                                            <div>
                                                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    First name
                                                                </label>
                                                                <div className="mt-2.5">
                                                                    <input
                                                                        type="text"
                                                                        name="first-name"
                                                                        id="first-name"
                                                                        autoComplete="given-name"
                                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Last name
                                                                </label>
                                                                <div className="mt-2.5">
                                                                    <input
                                                                        type="text"
                                                                        name="last-name"
                                                                        id="last-name"
                                                                        autoComplete="family-name"
                                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-2">
                                                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Email
                                                                </label>
                                                                <div className="mt-2.5">
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        autoComplete="email"
                                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-2">
                                                                <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Address Line 1
                                                                </label>
                                                                <div className="mt-2.5">
                                                                    <input
                                                                        type="text"
                                                                        name="address"
                                                                        id="address"
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
                                                                        autoComplete="organization"
                                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Postal Code
                                                                </label>
                                                                <div className="mt-2.5">
                                                                    <input
                                                                        type="text"
                                                                        name="first-name"
                                                                        id="first-name"
                                                                        autoComplete="given-name"
                                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Country
                                                                </label>
                                                                <div className="mt-2.5">
                                                                    <input
                                                                        type="text"
                                                                        name="last-name"
                                                                        id="last-name"
                                                                        autoComplete="family-name"
                                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="sm:col-span-2">
                                                                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Phone number
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
                                                                        className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-2">
                                                                <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Cardholder Name
                                                                </label>
                                                                <div className="mt-2.5">
                                                                    <input
                                                                        type="text"
                                                                        name="cardholderName"
                                                                        id="cardholderName"
                                                                        autoComplete="organization"
                                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Card Number
                                                                </label>
                                                                <div className="mt-2.5">
                                                                    <input
                                                                        type="text"
                                                                        name="first-name"
                                                                        id="first-name"
                                                                        autoComplete="given-name"
                                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Expiry Date
                                                                </label>
                                                                <div className="mt-2.5">
                                                                    <input
                                                                        type="text"
                                                                        name="last-name"
                                                                        id="last-name"
                                                                        autoComplete="family-name"
                                                                        placeholder="MM/YY"
                                                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    CVV
                                                                </label>
                                                                <div className="mt-2.5">
                                                                    <input
                                                                        type="text"
                                                                        name="last-name"
                                                                        id="last-name"
                                                                        autoComplete="family-name"
                                                                        placeholder="CVV"
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
                                                    </form>
                                                </div>

                                            <hr className="my-4" />

                                            <div className="pt-5">
                                                <MDBTypography tag="h6" className="mb-0">
                                                    <MDBCardText tag="a" href="/shoppingcart" className="text-body">
                                                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                                                        to cart
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
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <MDBTypography tag="h6" className="text-center">
                                                        Product Name
                                                    </MDBTypography>
                                                    <MDBTypography tag="h6" className="text-center">
                                                        Quantity
                                                    </MDBTypography>
                                                    <MDBTypography tag="h6" className="text-center ">
                                                        Price
                                                    </MDBTypography>
                                                </div>

                                                {cart.map(({ product, quantity }) => (
                                                    <><hr className="my-4" /><MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                                                        <MDBCol md="2" lg="2" xl="2">
                                                            <MDBCardImage
                                                                src={product.imageURL}
                                                                fluid className="rounded-3 mb-5" alt={product.name} />
                                                        </MDBCol>
                                                        <MDBCol md="3" lg="3" xl="3">
                                                            <MDBTypography tag="h6" className="text-black mb-5">
                                                                {product.name}
                                                            </MDBTypography>
                                                        </MDBCol>
                                                        <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center mb-5">
                                                            {quantity}
                                                        </MDBCol>
                                                        <MDBCol md="3" lg="2" xl="2" className="d-flex">
                                                            <MDBTypography tag="h6" className="mb-5 ">
                                                                ${(product.price * quantity).toFixed(2)}
                                                            </MDBTypography>
                                                        </MDBCol>
                                                        <MDBTypography tag="h5" className="text-uppercase mb-3 mt-10">
                                                            Shipping
                                                        </MDBTypography>

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
                                                    </MDBRow></>

                                                ))}

                                            <div className="d-flex justify-content-between mb-5">
                                                <MDBTypography tag="h5" className="text-uppercase">
                                                    Total price
                                                </MDBTypography>
                                                <MDBTypography tag="h5">${totalWithShipping}</MDBTypography>
                                            </div>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
        </>
    );
}