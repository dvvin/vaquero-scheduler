import { useState, useEffect } from 'react';

interface SessionData {
    user: {
        fullName: string;
        email: string;
        id: string;
        studentID: string;
    };
    expires: string;
}

const GenerateSchedule: React.FC = () => {
    const [campusDropdown, setCampusDropdown] = useState(false);
    const [classTimeDropdown, setClassTimeDropdown] = useState(false);
    const [difficultyDropdown, setDifficultyDropdown] = useState(false);
    const [styleDropdown, setStyleDropdown] = useState(false);

    const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
    const [selectedClassTime, setSelectedClassTime] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

    const campusOptions = ["Edinburg", "Brownsville"];
    const classTimeOptions = ["Morning", "Afternoon", "Both"];
    const difficultyOptions = ["Low", "Moderate", "High", "Any"];
    const styleOptions = ["Free", "Strict", "Mixed", "Any"];

    const [session, setSession] = useState<SessionData | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchSession = async () => {
            const res = await fetch('/api/auth/session');

            const data: SessionData = await res.json();

            if (data && data.user && data.user.email) {
                setSession(data);
            } else {
                setSession(null);
            }
        };

        fetchSession();
    }, []);

    const toggleCampusSelect = () => {
        setCampusDropdown(!campusDropdown);
        if (classTimeDropdown) {
            setClassTimeDropdown(false);
        }
        if (difficultyDropdown) {
            setDifficultyDropdown(false);
        }
        if (styleDropdown) {
            setStyleDropdown(false);
        }
    };

    const handleCampusSelectDropdown = (campus: string) => {
        setSelectedCampus(campus);
        setCampusDropdown(false);
    }

    const toggleClassTimeSelect = () => {
        setClassTimeDropdown(!classTimeDropdown);
        if (campusDropdown) {
            setCampusDropdown(false);
        }
        if (difficultyDropdown) {
            setDifficultyDropdown(false);
        }
        if (styleDropdown) {
            setStyleDropdown(false);
        }
    };

    const handleClassTimeSelectDropdown = (classTime: string) => {
        setSelectedClassTime(classTime);
        setClassTimeDropdown(false);
    }

    const toggleDifficultySelect = () => {
        setDifficultyDropdown(!difficultyDropdown);
        if (campusDropdown) {
            setCampusDropdown(false);
        }
        if (classTimeDropdown) {
            setClassTimeDropdown(false);
        }
        if (styleDropdown) {
            setStyleDropdown(false);
        }
    };

    const handleDifficultySelectDropdown = (difficulty: string) => {
        setSelectedDifficulty(difficulty);
        setDifficultyDropdown(false);
    }

    const toggleStyleSelect = () => {
        setStyleDropdown(!styleDropdown);
        if (campusDropdown) {
            setCampusDropdown(false);
        }
        if (classTimeDropdown) {
            setClassTimeDropdown(false);
        }
        if (difficultyDropdown) {
            setDifficultyDropdown(false);
        }
    };

    const handleStyleSelectDropdown = (style: string) => {
        setSelectedStyle(style);
        setStyleDropdown(false);
    }

    const handleGenerateSchedule = async () => {
        if (!session) {
            setErrorMessage('You must be signed in to generate a schedule.');
            return;
        }

        const selectedOptions = {
            campus: selectedCampus,
            time: selectedClassTime,
            difficultyRating: selectedDifficulty,
            teachingStyle: selectedStyle,
            studentInfo:
            {
                fullName: session?.user.fullName,
                email: session?.user.email,
                id: session?.user.id,
                studentID: session?.user.studentID
            }
        };

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedOptions),
            });

            const data = await response.json();
            console.log('Schedule Generated:', data);
            console.log(session);
        } catch (error) {
            console.error('Error generating schedule:', error);
        }
    };

    return (
        <div style={{ zIndex: 5000 }} className="absolute pt-28 top-0 left-1/2 transform -translate-x-1/2">
            <div className="relative group flex">
                <div>
                    <button
                        id="campus-Dropdown-button"
                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                        onClick={() => toggleCampusSelect()}
                    >
                        <span className="mr-2">{selectedCampus || "Select a Campus"}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {campusDropdown && (
                        <div id="campus-Dropdown-menu" style={{ minWidth: '300px' }} className="absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                            {campusOptions.map((campus, index) => (
                                <a key={index} href="#" onClick={() => handleCampusSelectDropdown(campus)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md whitespace-nowrap">
                                    {campus}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {selectedCampus && (
                    <div className="ml-2">
                        <button
                            id="classTime-Dropdown-button"
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                            onClick={() => toggleClassTimeSelect()}
                        >
                            <span className="mr-2">{selectedClassTime || "Select a Class Time"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {classTimeDropdown && (
                            <div id="classTime-Dropdown-menu" style={{ minWidth: '300px' }} className="absolute z-10 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                                {classTimeOptions.map((classTime, index) => (
                                    <a key={index} href="#" onClick={() => handleClassTimeSelectDropdown(classTime)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md whitespace-nowrap">
                                        {classTime}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {selectedClassTime && (
                    <div className="ml-2">
                        <button
                            id="difficulty-Dropdown-button"
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                            onClick={() => toggleDifficultySelect()}
                        >
                            <span className="mr-2">{selectedDifficulty || "Select a Difficulty"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {difficultyDropdown && (
                            <div id="difficulty-Dropdown-menu" style={{ minWidth: '300px' }} className="absolute z-10 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                                {difficultyOptions.map((difficulty, index) => (
                                    <a key={index} href="#" onClick={() => handleDifficultySelectDropdown(difficulty)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md whitespace-nowrap">
                                        {difficulty}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {selectedDifficulty && (
                    <div className="ml-2">
                        <button
                            id="style-Dropdown-button"
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                            onClick={() => toggleStyleSelect()}
                        >
                            <span className="mr-2">{selectedStyle || "Select a Style"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {styleDropdown && (
                            <div id="style-Dropdown-menu" style={{ minWidth: '300px' }} className="absolute z-10 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                                {styleOptions.map((style, index) => (
                                    <a key={index} href="#" onClick={() => handleStyleSelectDropdown(style)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md whitespace-nowrap">
                                        {style}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {selectedStyle && (
                <div className="flex items-center justify-center pt-10">
                    <div onClick={() => handleGenerateSchedule()} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-100 bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <button type="button" className="">Generate Schedule</button>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="text-center my-4">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )}
        </div >
    );
};

export default GenerateSchedule;
