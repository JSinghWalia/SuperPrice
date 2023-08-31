import { Navbar } from './components/navbar';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">  
            <Navbar activePath="Home" />
            <div className="welcome-text">
                <h1>Welcome to SuperPrice</h1>
            </div>
        </main>
    )
}

