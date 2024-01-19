import Image from 'next/image';
import Link from 'next/link';
import vaqueroLogo from '../vaquero_trans.png';
import { signOut } from 'next-auth/react';
import { useSessionData } from '../GetSessionData';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
    const router = useRouter();
    const session = useSessionData();
    const [isLoading, setIsLoading] = useState(true);
    console.log("Current session: ", session);

    useEffect(() => {
        if (!session && !isLoading) {
            router.push('/SignIn');
        } else if (session) {
            setIsLoading(false);
        }
    }, [session, isLoading, router]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 150);
        return () => clearTimeout(timer);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
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
                            <Link legacyBehavior href="/Generate">
                                <a className="
                            text-gray-800 text-sm font-semibold px-4 py-1 rounded-lg border border-transparent
                            hover:text-orange-600 hover:border hover:border-orange-600">
                                    Generate
                                </a>
                            </Link>

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
