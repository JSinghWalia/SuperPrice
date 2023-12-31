"use client"
import Image from 'next/image';
import Link from 'next/link';
import {Navbar} from '../components/navbar';
import * as React from "react";

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


//function to fetch products, with optional search term.
async function fetchNotificationProducts(searchTerm = '') {
    try {
        //fetches from backend
        const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/notifications";

        let url;

        if (searchTerm === '') {
            url = baseUrl; // Assign the base URL when searchTerm is empty
        } else {
            url = `${baseUrl}/${searchTerm}`; // Assign the URL with searchTerm
        }

        const res = await fetch(url);

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
    const [productsData, setProductsData] = React.useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    async function loadProducts(searchTerm = '') {
        const data = await fetchNotificationProducts(searchTerm);
        setProductsData(data);
    }

    React.useEffect(() => {
        loadProducts(); // Fetch products when the component mounts
    }, []);

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await loadProducts(searchTerm); // Fetch products when the form is submitted
    }
    async function handleToggleNotification(productId: number, currentNotification: boolean) {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/update_notification/${productId}/${currentNotification ? 'OFF' : 'ON'}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notification: !currentNotification }), // Toggle the notification
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status} - ${response.statusText})`);
            }

            // Update the product list to reflect the new notification status
            const updatedProductsData = productsData.map(product => {
                if (product.id === productId) {
                    return { ...product, notification: !currentNotification };
                }
                return product;
            });

            setProductsData(updatedProductsData);
        } catch (error) {
            console.error("Error toggling notification:", error);
        }
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
                        <div key={product.id} className="product-card">
                                <Link key={product.id} href={`/notifications/${product.id}/${product.name}`}>
                                <Image src={product.imageURL} alt={product.name} width={200} height={200} />
                                <h2>{product.name}</h2>
                                <h3>From: {product.store}</h3>
                                <p>Originally: ${product.price}</p>
                                {product.discount && (
                                    <p className="text-red-500">Now: ${(product.price - (product.price * product.discount)).toFixed(2)}</p>
                                )}
                                </Link>
                            <button
                                className="notification-toggle-button"
                                onClick={() => product && handleToggleNotification(product.id, product.notification)}
                            >
                                {product.notification ? 'Turn Off Notification' : 'Turn On Notification'}
                            </button>
                            </div>


                    );
                })}
            </section>
        </main>
    );
}
``
