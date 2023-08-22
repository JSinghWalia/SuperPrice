import Image from 'next/image';
import Link from 'next/link';
import { productsData } from './productData'; // Make sure this path is correct

export default function Products() {
    return (
        <main className="flex min-h-screen flex-col">
            <nav className="navbar">
                <div className="logo">
                    <Link href="/">
                        <Image src="/logo.png" alt="Logo" width={200} height={50} />
                    </Link>
                </div>
                <ul className="nav-links">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/products">Products</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                    <li><Link href="/shoppingcart">Shopping Cart</Link></li>
                </ul>
            </nav>
            <div className="welcome-text">
                <h1>Products</h1>
            </div>
            <section className="product-section">
                {productsData.map(product => (
                    <Link key={product.id}  href={`/products/${product.id}`}>
                        <div className="product-card">
                            <Image src={product.imageSrc} alt={product.name} width={200} height={200} />
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    );
}
