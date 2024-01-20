import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import vaqueroLogo from '../images/vaquero_trans.png';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import { useSessionData } from '../GetSessionData';

const SignInForm: React.FC = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const session = useSessionData();
    const router = useRouter();

    useEffect(() => {
        if (session && session.user && session.user.email) {
            router.push('/');
        }
    }, [session, router]);

    const toggleView = () => setIsRegistering(!isRegistering);
    const toggleResetPassword = () => setIsResettingPassword(!isResettingPassword);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result && result.error) {
                setErrorMessage(result.error === 'CredentialsSignin' ? 'Invalid email or password' : result.error);
            } else {
                router.push('/Student');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
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
                            <form onSubmit={handleSubmit} >
                                <div>
                                    <span className="text-sm text-black font-sans">Welcome back</span>
                                    <h1 className="text-2xl text-black font-bold font-sans">Sign In to your account</h1>
                                </div>

                                <div className="mt-5">
                                    <label className="block text-black text-md mb-2 font-sans" htmlFor="username">Email</label>
                                    <input className="px-4 w-full border-2 py-2 rounded-md text-black text-sm outline-none"
                                        type="text" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="my-3">
                                    <label className="block text-black text-md mb-2 font-sans" htmlFor="password">Password</label>
                                    <input className="px-4 w-full border-2 py-2 rounded-md text-black text-sm outline-none"
                                        type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}

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

export default SignInForm;
