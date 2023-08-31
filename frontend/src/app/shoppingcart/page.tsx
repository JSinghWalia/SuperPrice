import { Navbar } from '../components/navbar';

export default function ShoppingCart() {
    return (
        <main className="flex min-h-screen flex-col">
            <Navbar activePath="" />
            <div className="welcome-text">
                <h1>Shopping Cart</h1>
            </div>
        </main>
    )
}
