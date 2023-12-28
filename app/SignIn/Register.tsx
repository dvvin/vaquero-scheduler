import React from 'react';

const Register: React.FC<{ onSignInClick: () => void }> = ({ onSignInClick }) => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md">
                <h1 className="text-2xl text-black font-bold mb-4 font-sans">Register</h1>

                <form>
                    <div className="mb-4">
                        <label className="block text-black text-md mb-2 font-sans" htmlFor="email">Email</label>
                        <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                            type="email" name="email" placeholder="email" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md mb-2 font-sans" htmlFor="password">Password</label>
                        <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                            type="password" name="password" placeholder="password" />
                    </div>

                    <button className="mt-4 mb-3 w-full bg-orange-500 hover:bg-orange-400
                    text-black py-2 rounded-md transition duration-100 font-sans">
                        Register
                    </button>
                </form>

                <p className="text-black mt-4 font-sans">
                    Already have an account?
                    <span className="cursor-pointer text-sm text-blue-600 ml-1 font-sans" onClick={onSignInClick}>
                        Sign in now
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
