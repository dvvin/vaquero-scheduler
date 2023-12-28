import Image from 'next/image';
import vaqueroLogo from '../vaquero_trans.png';

const Navbar: React.FC = () => {
    return (
        <div className="fixed top-0 bg-gray-100 font-sans w-full m-0 z-50">
            <div className="bg-white shadow">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <Image src={vaqueroLogo} alt="Vaquero" className="w-12 h-12" />
                            <span className="text-gray-800 text-lg font-semibold ml-2">CSCI Scheduler</span>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <a className="
                            text-gray-800 text-sm font-semibold px-4 py-1 rounded-lg border border-transparent
                            hover:text-orange-600 hover:border hover:border-orange-600">
                                Generate
                            </a>

                            <a className="
                            text-gray-800 text-sm font-semibold px-4 py-1 rounded-lg border border-transparent
                            hover:text-orange-600 hover:border hover:border-orange-600">
                                Student
                            </a>

                            <a className="text-gray-800 text-sm font-semibold px-4 py-1 rounded-lg border border-transparent
                            hover:text-orange-600 hover:border hover:border-orange-600">
                                Catalogs
                            </a>
                            <a className="text-gray-800 text-sm font-semibold px-4 py-1 rounded-lg border border-transparent
                            hover:text-orange-600 hover:border hover:border-orange-600">
                                Search
                            </a>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <a className="text-gray-800 text-sm font-semibold px-4 py-1 rounded-lg border border-transparent
                            hover:text-orange-600 hover:border hover:border-orange-600">
                                Sign in
                            </a>

                            <a className="ml-4 text-white bg-orange-600 text-sm font-semibold px-4 py-1 rounded-lg
                            hover:bg-orange-700">
                                Sign up
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
