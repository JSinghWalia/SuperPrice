import { Navbar } from '../components/navbar';

export default function Profile() {
    return (
        <main className="flex min-h-screen flex-col">
            <Navbar activePath="" />
            <div className="welcome-text">
                <h1>Profile</h1>
            </div>
        </main>
    )
}
