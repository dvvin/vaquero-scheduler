import React, { useState } from 'react';

const ForgotPassword: React.FC<{ onSignInClick: () => void }> = ({ onSignInClick }) => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement password reset logic
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md">
                <h1 className="text-2xl text-black font-bold mb-4 font-sans">Forgot Password</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-md mb-2 font-sans" htmlFor="email">Email</label>
                        <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="email" />
                    </div>

                    <button className="mt-4 mb-3 w-full bg-orange-500 hover:bg-orange-400
                    text-black py-2 rounded-md transition duration-100 font-sans">
                        Reset Password
                    </button>
                </form>

                <p className="text-black mt-4 font-sans">
                    Remember your password?
                    <span className="cursor-pointer text-sm text-blue-600 ml-1 font-sans" onClick={onSignInClick}>
                        Sign in now
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
