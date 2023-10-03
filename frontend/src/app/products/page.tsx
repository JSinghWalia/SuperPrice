"use client"
import Image from 'next/image';
import Link from 'next/link';
import {Navbar} from '../components/navbar';
import * as React from "react";

//function to fetch products, with optional search term.
export async function fetchProducts(searchTerm = '') {
    try {
        //fetches from backend
        const url = `http://localhost:8080/${searchTerm}`;
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


export default function Products() {
    const [productsData, setProductsData] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    async function loadProducts(searchTerm = '') {
        const data = await fetchProducts(searchTerm);
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
            <Navbar activePath="Products" />
            <div className="welcome-text">
                <h1>Products</h1>
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
                {productsData.map(product => (
                    <Link key={product.id} href={`/products/${product.id}/${product.name}`}>
                        <div className="product-card">
                            <Image src={product.imageURL} alt={product.name} width={200} height={200} />
                            <h2>{product.name}</h2>
                            <h3>From: {product.store}</h3>
                            <p>${product.price}</p>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    );
}
``
