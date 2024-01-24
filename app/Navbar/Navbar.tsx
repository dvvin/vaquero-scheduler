import Image from 'next/image';
import Link from 'next/link';
import vaqueroLogo from '../images/vaquero_trans.png';
import { signOut } from 'next-auth/react';
import { useSessionData } from '../GetSessionData';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
    const session = useSessionData();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
            router.push('/');
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
                            text-gray-800 text-sm mr-2 font-semibold px-4 py-1 rounded-lg border border-transparent
                            hover:text-orange-600 hover:border hover:border-orange-600">
                                    Generate
                                </a>
                            </Link>

                            <Link legacyBehavior href="/Catalogs">
                                <a className="text-gray-800 text-sm mr-2 font-semibold px-4 py-1 rounded-lg border border-transparent hover:text-orange-600 hover:border hover:border-orange-600">
                                    Catalogs
                                </a>
                            </Link>

                            {session && session.user && (
                                <>
                                    <Link legacyBehavior href="/Student">
                                        <a className="text-gray-800 text-sm mr-2 font-semibold px-4 py-1 rounded-lg border border-transparent hover:text-orange-600 hover:border hover:border-orange-600">
                                            Student
                                        </a>
                                    </Link>
                                    <Link legacyBehavior href="/Schedules">
                                        <a className="text-gray-800 text-sm mr-2 font-semibold px-4 py-1 rounded-lg border border-transparent hover:text-orange-600 hover:border hover:border-orange-600">
                                            Schedules
                                        </a>
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            {session && session.user ? (
                                <>
                                    <button onClick={handleSignOut} className="ml-4 text-white bg-orange-500 text-sm font-semibold px-4 py-1 rounded-lg hover:bg-orange-600">
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link legacyBehavior href="/SignIn">
                                    <a className="ml-4 text-white bg-orange-500 text-sm font-semibold px-4 py-1 rounded-lg hover:bg-orange-600">
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
