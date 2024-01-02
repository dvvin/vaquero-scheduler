import React, { useState } from 'react';
import vaqueroLogo from '../vaquero_trans.png';
import Register from './Register';
import ForgotPassword from './ForgotPassword'; // Import ForgotPassword component

const SignIn: React.FC = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false); // New state for Forgot Password

    const toggleView = () => {
        setIsRegistering(!isRegistering);
    };

    const toggleResetPassword = () => {
        setIsResettingPassword(!isResettingPassword);
    };

    return (
        <div className="min-h-screen bg-no-repeat bg-cover"
            style={{
                backgroundImage: `url(${vaqueroLogo.src})`,
                backgroundPosition: 'left center',
                backgroundSize: '60%',
                backgroundRepeat: 'no-repeat'
            }}>

            <div className="flex justify-end">
                <div className="bg-gray min-h-screen w-1/2 flex justify-center items-center">
                    <div>
                        {isRegistering ? (
                            <Register onSignInClick={toggleView} />
                        ) : isResettingPassword ? (
                            <ForgotPassword onSignInClick={toggleResetPassword} />
                        ) : (
                            <form>
                                <div>
                                    <span className="text-sm text-black font-sans">Welcome back</span>
                                    <h1 className="text-2xl text-black font-bold font-sans">Sign In to your account</h1>
                                </div>

                                <div className="mt-5">
                                    <label className="block text-black text-md mb-2 font-sans" htmlFor="password">Password</label>
                                    <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                                        type="password" name="password" placeholder="password" />
                                </div>

                                <div className="my-3">
                                    <label className="block text-black text-md mb-2 font-sans" htmlFor="email">Email</label>
                                    <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                                        type="email" name="email" placeholder="email" />
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex items-center">
                                        <input className="cursor-pointer" type="checkbox" name="rememberme" />
                                        <span className="ml-2 text-sm text-black font-sans">Remember Me</span>
                                    </div>
                                    <span className="text-sm text-blue-700 hover:underline cursor-pointer font-sans"
                                        onClick={toggleResetPassword}
                                    >
                                        Forgot password?</span>
                                </div>


                                <div>
                                    <button className="mt-4 mb-3 w-full bg-orange-500 hover:bg-orange-400
                                      text-black py-2 rounded-md transition duration-100">
                                        Login now
                                    </button>
                                </div>

                                <p className="text-black mt-1 font-sans">Don&apos;t have an account? <span className="cursor-pointer text-sm text-blue-600 font-sans"
                                    onClick={toggleView}
                                >
                                    Sign up now
                                </span>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
