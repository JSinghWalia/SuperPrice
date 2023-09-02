import Image from 'next/image';
import Link from 'next/link';
import { productsData } from './productData'; // Make sure this path is correct
import { Navbar } from '../components/navbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as React from "react";


export default function Products() {
    return (
        <main className="flex min-h-screen flex-col">
            <Navbar activePath="Products" />
            <div className="welcome-text">
                <h1>Products</h1>
            </div>
            <section className="product-section">
                {productsData.map(product => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <div className="product-card">
                            <Image src={product.imageSrc} alt={product.name} width={200} height={200} />
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                            <button className="add-to-cart-button">
                                <span>Add to Cart</span>
                                <i className="material-icons"></i> {/* Example icon */}
                                <ShoppingCartIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    );
}
