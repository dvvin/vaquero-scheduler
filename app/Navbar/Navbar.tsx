import Image from 'next/image';
import Link from 'next/link';
import vaqueroLogo from '../vaquero_trans.png';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

interface SessionData {
    user: {
        fullName: string;
        email: string;
    };
    expires: string;
}

const Navbar: React.FC = () => {
    const [session, setSession] = useState<SessionData | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const res = await fetch('/api/auth/session');

            const data: SessionData = await res.json();

            console.log("Fetched session data:", data);

            if (data && data.user && data.user.email) {
                setSession(data);
            } else {
                setSession(null);
            }
        };

        fetchSession();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            setSession(null);
            window.location.reload();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div style={{ zIndex: 6000 }} className="fixed top-0 bg-gray-100 font-sans w-full m-0 z-50">
            <div className="bg-white shadow">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-2">
                        <Link legacyBehavior href="/">
                            <div className="flex items-center cursor-pointer">
                                <Image src={vaqueroLogo} alt="Vaquero" className="w-12 h-12" />
                                <span className="text-gray-800 text-lg font-semibold ml-2">CSCI Scheduler</span>
                            </div>
                        </Link>


                        <div className="hidden sm:flex sm:items-center">
                            <a className="
                            text-gray-800 text-sm font-semibold px-4 py-1 rounded-lg border border-transparent
                            hover:text-orange-600 hover:border hover:border-orange-600">
                                Generate
                            </a>

                            <Link legacyBehavior href="/Student">
                                <a className="
                                  text-gray-800 text-sm font-semibold px-4 py-1 rounded-lg border border-transparent
                                  hover:text-orange-600 hover:border hover:border-orange-600">
                                    Student
                                </a>
                            </Link>

                            <Link legacyBehavior href="/Catalogs">
                                <a className="text-gray-800 text-sm font-semibold px-4 py-1 rounded-lg border border-transparent hover:text-orange-600 hover:border hover:border-orange-600">
                                    Catalogs
                                </a>
                            </Link>

                            <a className="text-gray-800 text-sm font-semibold px-4 py-1 rounded-lg border border-transparent
                            hover:text-orange-600 hover:border hover:border-orange-600">
                                About
                            </a>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            {session && session.user ? (
                                <>
                                    <a className="ml-4 text-white bg-orange-600 text-sm font-semibold px-4 py-1 rounded-lg hover:bg-orange-700">
                                        Email: {session.user.email}
                                    </a>
                                    <button onClick={handleSignOut} className="ml-4 text-white bg-orange-600 text-sm font-semibold px-4 py-1 rounded-lg hover:bg-orange-700">
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link legacyBehavior href="/SignIn">
                                    <a className="ml-4 text-white bg-orange-600 text-sm font-semibold px-4 py-1 rounded-lg hover:bg-orange-700">
                                        Sign In
                                    </a>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
