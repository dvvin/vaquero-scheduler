import Navbar from "./Navbar/Navbar";
import EIEAB_Building from './images/EIEAB_Building.jpg';
import CSCI_Catalog_2023_2024 from './images/2023-2024-CSCI-Catalog.jpg';
import EIEAB_Lab from './images/EIEAB_Lab.jpg';
import EIEAB_TA from './images/EIEAB_TA.jpg';
import { useSessionData } from "./GetSessionData";
import Link from 'next/link';

const Homepage: React.FC = () => {
    const session = useSessionData();

    return (
        <>
            <Navbar />
            <div className="pt-40">
                <main className="my-8">
                    <div className="container mx-auto px-6">
                        <div className="md:flex mt-8 md:-mx-4">
                            <div className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
                                style={{ backgroundImage: `url(${EIEAB_Building.src})` }}
                            >
                                <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                                    <div className="px-10 max-w-xl">
                                        <h2 className="text-3xl text-orange-200 font-semibold">Generate</h2>
                                        <p className="mt-2 text-xl text-gray-200">
                                            Filter courses by campus location, difficulty rating, teaching style, and time of day.
                                        </p>

                                        <Link legacyBehavior href="/Generate">
                                            <button
                                                className="flex items-center mt-4 px-3 py-2 bg-orange-500 text-white text-sm uppercase font-medium rounded hover:bg-orange-600 focus:outline-none focus:bg-orange-500">
                                                <span>Find a schedule</span>
                                                <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                                </svg>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
                                style={{ backgroundImage: `url(${CSCI_Catalog_2023_2024.src})` }}
                            >
                                <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                                    <div className="px-10 max-w-xl">
                                        <h2 className="text-3xl text-orange-200 font-semibold">Catalogs</h2>
                                        <p className="mt-2 text-xl text-gray-200">
                                            Browse catalogs for the 2023-2024 school year.
                                        </p>

                                        <Link legacyBehavior href="/Catalogs">
                                            <button
                                                className="flex items-center mt-4 px-3 py-2 bg-orange-500 text-white text-sm uppercase font-medium rounded hover:bg-orange-600 focus:outline-none focus:bg-orange-500">
                                                <span>Find a catalog</span>
                                                <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                                </svg>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:flex mt-8 md:-mx-4">
                            {session && session.user && (
                                <div className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
                                    style={{ backgroundImage: `url(${EIEAB_Lab.src})` }}
                                >
                                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                                        <div className="px-10 max-w-xl">
                                            <h2 className="text-3xl text-orange-200 font-semibold">Student</h2>
                                            <p className="mt-2 text-xl text-gray-200">
                                                Browse student information.
                                            </p>

                                            <Link legacyBehavior href="/Student">
                                                <button
                                                    className="flex items-center mt-4 px-3 py-2 bg-orange-500 text-white text-sm uppercase font-medium rounded hover:bg-orange-600 focus:outline-none focus:bg-orange-500">
                                                    <span>view student</span>
                                                    <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                                        strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                                    </svg>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {session && session.user ? (
                                <div className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
                                    style={{ backgroundImage: `url(${EIEAB_TA.src})` }}
                                >
                                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                                        <div className="px-10 max-w-xl">
                                            <h2 className="text-3xl text-orange-200 font-semibold">Schedules</h2>
                                            <p className="mt-2 text-xl text-gray-200">
                                                View and delete your generated schedules.
                                            </p>

                                            <Link legacyBehavior href="/Schedules">
                                                <button
                                                    className="flex items-center mt-4 px-3 py-2 bg-orange-500 text-white text-sm uppercase font-medium rounded hover:bg-orange-600 focus:outline-none focus:bg-orange-500">
                                                    <span>View Schedules</span>
                                                    <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                                        strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                                    </svg>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
                                    style={{ backgroundImage: `url(${EIEAB_Lab.src})` }}
                                >
                                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                                        <div className="px-10 max-w-xl">
                                            <h2 className="text-3xl text-orange-200 font-semibold">Sign In</h2>
                                            <p className="mt-2 text-xl text-gray-200">
                                                Sign in with your student account to save your generated schedule.
                                            </p>
                                            <button
                                                className="flex items-center mt-4 px-3 py-2 bg-orange-500 text-white text-sm uppercase font-medium rounded hover:bg-orange-600 focus:outline-none focus:bg-orange-500">
                                                <span>sign in</span>
                                                <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Homepage
