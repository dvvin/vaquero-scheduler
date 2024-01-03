import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register: React.FC<{ onSignInClick: () => void }> = ({ onSignInClick }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                router.push('/Catalogs');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md">
                <h1 className="text-2xl text-black font-bold mb-4 font-sans">Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-md mb-2 font-sans" htmlFor="email">Email</label>
                        <input className="px-4 w-full border-2 py-2 rounded-md text-black text-sm outline-none"
                            type="email" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md mb-2 font-sans" htmlFor="username">Username</label>
                        <input className="px-4 w-full border-2 py-2 rounded-md text-black text-sm outline-none"
                            type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md mb-2 font-sans" htmlFor="password">Password</label>
                        <input className="px-4 w-full border-2 py-2 rounded-md text-black text-sm outline-none"
                            type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {error && <p className="text-red-500 text-xs italic">{error}</p>}

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
