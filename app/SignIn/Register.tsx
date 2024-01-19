import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegister } from '../Generate/GetSessionData';

const Register: React.FC<{ onSignInClick: () => void }> = ({ onSignInClick }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [studentID, setStudentID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [selectedClassification, setSelectedClassification] = useState<string | null>(null);
    const [classificationDropdown, setClassificationDropdown] = useState(false);

    const classificationSelectOptions = [
        "Freshman",
        "Sophomore",
        "Junior",
        "Senior"
    ];

    const toggleClassificationSelect = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setClassificationDropdown(!classificationDropdown);
    };

    const handleClassificationSelectDropdown = (classification: string) => {
        setSelectedClassification(classification);
        setClassificationDropdown(false);
    }

    const router = useRouter();
    const register = useRegister();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!fullName || !email || !studentID || !password || !selectedClassification) {
            setError('Please fill in all fields.');
            return;
        }

        setError('');

        try {
            const userData = {
                fullName,
                email,
                studentID,
                password,
                classification: selectedClassification,
            };

            const data = await register(userData);

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
                        <label className="block text-black text-md mb-2 font-sans" htmlFor="username">Classification</label>
                        <button
                            type="button"
                            id="first-Dropdown-button"
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                            onClick={toggleClassificationSelect}
                        >
                            <span className="mr-2">{selectedClassification || "Select a classification"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {classificationDropdown && (
                            <div className="absolute mt-2 rounded-md shadow-lg text-gray-600 bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                                {classificationSelectOptions.map((option) => (
                                    <div
                                        key={option}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md whitespace-nowrap"
                                        onClick={() => handleClassificationSelectDropdown(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md mb-2 font-sans" htmlFor="email">Full Name</label>
                        <input className="px-4 w-full border-2 py-2 rounded-md text-black text-sm outline-none"
                            type="fullName" name="fullName" placeholder="full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md mb-2 font-sans" htmlFor="email">Email</label>
                        <input className="px-4 w-full border-2 py-2 rounded-md text-black text-sm outline-none"
                            type="email" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-md mb-2 font-sans" htmlFor="username">Student ID</label>
                        <input className="px-4 w-full border-2 py-2 rounded-md text-black text-sm outline-none"
                            type="text" name="username" placeholder="username" value={studentID} onChange={(e) => setStudentID(e.target.value)} />
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
