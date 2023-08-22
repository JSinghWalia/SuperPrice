import Image from 'next/image'
import Link from 'next/link'; // Import the Link component

export default function ShoppingCart() {
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
                <h1>Shopping Cart</h1>
            </div>
        </main>
    )
}
