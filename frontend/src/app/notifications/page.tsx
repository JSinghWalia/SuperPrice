"use client"
import Image from 'next/image';
import Link from 'next/link';
import {Navbar} from '../components/navbar';
import * as React from "react";

//function to fetch products, with optional search term.
export async function fetchNotificationProducts(searchTerm = '') {
    try {
        //fetches from backend
        const baseUrl = 'http://localhost:8080/notifications'; // Define the base URL

        let url; // Declare a variable for the URL outside of the if-else blocks

        if (searchTerm === '') {
            url = baseUrl; // Assign the base URL when searchTerm is empty
        } else {
            url = `${baseUrl}/${searchTerm}`; // Assign the URL with searchTerm
        }

        const res = await fetch(url); // Use the correct variable name 'url'

        if (!res.ok) {
            throw new Error(`Network response was not ok (${res.status} - ${res.statusText})`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}


export default function NotificationProducts() {
    const [productsData, setProductsData] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    async function loadProducts(searchTerm = '') {
        const data = await fetchNotificationProducts(searchTerm);
        setProductsData(data);
    }

    React.useEffect(() => {
        loadProducts(); // Fetch products when the component mounts
    }, []);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        await loadProducts(searchTerm); // Fetch products when the form is submitted
    }

    return (
        <main className="flex min-h-screen flex-col">
            <Navbar activePath="Notifications" />
            <div className="welcome-text">
                <h1>Notifications</h1>
            </div>
            <div className="search-container">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        //sets search term when search bar is changed
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <section className="product-section">
                {productsData.map(product => {
                    // Calculate the new price after applying the discount
                    const newPrice = product.price * (1 - product.discount);

                    return (
                        <Link key={product.id} href={`/notifications/${product.id}/${product.name}`}>
                            <div className="product-card">
                                <Image src={product.imageURL} alt={product.name} width={200} height={200} />
                                <h2>{product.name}</h2>
                                <h3>From: {product.store}</h3>
                                <p>Originally: ${product.price}</p>
                                {product.discount && (
                                    <p className="text-red-500">Now: ${(product.price - (product.price * product.discount)).toFixed(2)}</p>
                                )}
                            </div>
                        </Link>

                    );
                })}
            </section>
        </main>
    );
}
``
