'use client';
import Navbar from '../Navbar/Navbar';
import SignIn from './SignIn';

const UserLogin: React.FC = () => {
    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
                <SignIn />
            </main>
        </>
    );
};

export default UserLogin;
