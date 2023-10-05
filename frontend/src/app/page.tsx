"use client"
import { Navbar } from './components/navbar';
import { CartProvider } from './context/cartContext';
import Image from 'next/image';
import * as React from 'react';
import Link from 'next/link';

async function fetchRandomProductImages() {
    try {
        const res = await fetch('http://localhost:8080'); // Replace with your API endpoint that returns all products
        if (!res.ok) {
            throw new Error(`Network response was not ok (${res.status} - ${res.statusText})`);
        }
        const productImages = await res.json();
        return productImages;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}


export default function Home() {
    const [randomProductImages, setRandomProductImages] = React.useState([]);
    const [randomIndexes, setRandomIndexes] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        async function fetchRandomImages() {
            const images = await fetchRandomProductImages();
            setRandomProductImages(images);

            // Generate random indexes for selecting three images
            const maxIndex = images.length - 1;
            const randomIndexes = [];
            while (randomIndexes.length < 3) {
                const randomIndex = Math.floor(Math.random() * maxIndex);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                }
            }
            setRandomIndexes(randomIndexes);
        }

        fetchRandomImages();
    }, []);

    const cycleNextImage = () => {
        setCurrentIndex((currentIndex + 1) % 3);
    };
    const cyclePrevImage = () => {
        setCurrentIndex((currentIndex - 1 + 3) % 3);
    };


    // Function to automatically advance to the next image
    const autoAdvance = () => {
        cycleNextImage();
    };

    // Set up automatic image advance using setTimeout
    React.useEffect(() => {
        const intervalId = setInterval(autoAdvance, 3000); // Change the time (in milliseconds) as needed
        return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
    }, [currentIndex])

    return (
            <CartProvider>
                <main className="flex min-h-screen flex-col">
                    <Navbar activePath="Home" />
                    <div className="welcome-text">
                        <h1>Welcome to SuperPrice</h1>
                    </div>
                    <div className="random-products">
                        <button className="nav-arrow prev" onClick={cyclePrevImage}>
                            &lt; Prev
                        </button>
                        <button className="nav-arrow next" onClick={cycleNextImage}>
                            Next &gt;
                        </button>
                        <div className="random-product-images">
                            {randomIndexes.map((index, i) => (
                                <Link
                                    key={i}
                                    href={`/products/${randomProductImages[index].id}/${encodeURIComponent(randomProductImages[index].name)}`}
                                >
                                    {/* Use a custom component (e.g., <div>) as the Link child */}
                                    <div className={`product-image ${i === currentIndex ? 'big-image' : ''}`}>
                                        <Image
                                            src={randomProductImages[index].imageURL}
                                            alt={`Product ${index + 1}`}
                                            width={i === currentIndex ? 300 : 200}
                                            height={i === currentIndex ? 300 : 200}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="shop-now-button">
                            <Link href="/products">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </main>
            </CartProvider>
    )
}
