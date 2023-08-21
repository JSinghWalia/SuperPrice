import Image from 'next/image'
import Link from 'next/link'; // Import the Link component

export default function products() {
    return (
        <main className="flex min-h-screen flex-col">
            <nav className="navbar">
                <div className="logo">
                    <Image src="/logo.png" alt="Logo" width={50} height={50} />
                </div>
                <ul className="nav-links">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/products">Products</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                </ul>
            </nav>
            <div className="welcome-text">
                <h1>Products</h1>
            </div>
        </main>
    )
}
