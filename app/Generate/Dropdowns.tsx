import { useState } from "react";

interface DropdownProps {
    onCampusSelected: (campus: string) => void;
    onClassTimeSelected: (classTime: string) => void;
    onDifficultySelected: (difficulty: string) => void;
    onStyleSelected: (style: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onCampusSelected, onClassTimeSelected, onDifficultySelected, onStyleSelected }) => {
    const [campusDropdown, setCampusDropdown] = useState(false);
    const [classTimeDropdown, setClassTimeDropdown] = useState(false);
    const [difficultyDropdown, setDifficultyDropdown] = useState(false);
    const [styleDropdown, setStyleDropdown] = useState(false);

    const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
    const [selectedClassTime, setSelectedClassTime] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

    const campusOptions = ["Edinburg", "Brownsville"];
    const classTimeOptions = ["Morning", "Afternoon", "Any"];
    const difficultyOptions = ["Low", "Moderate", "High", "Any"];
    const styleOptions = ["Free", "Strict", "Mixed", "Any"];

    const toggleCampusSelect = () => {
        setCampusDropdown(!campusDropdown);
        if (classTimeDropdown) setClassTimeDropdown(false);
        if (difficultyDropdown) setDifficultyDropdown(false);
        if (styleDropdown) setStyleDropdown(false);
    };

    const toggleClassTimeSelect = () => {
        setClassTimeDropdown(!classTimeDropdown);
        if (campusDropdown) setCampusDropdown(false);
        if (difficultyDropdown) setDifficultyDropdown(false);
        if (styleDropdown) setStyleDropdown(false);
    };

    const toggleDifficultySelect = () => {
        setDifficultyDropdown(!difficultyDropdown);
        if (campusDropdown) setCampusDropdown(false);
        if (classTimeDropdown) setClassTimeDropdown(false);
        if (styleDropdown) setStyleDropdown(false);
    };

    const toggleStyleSelect = () => {
        setStyleDropdown(!styleDropdown);
        if (campusDropdown) setCampusDropdown(false);
        if (classTimeDropdown) setClassTimeDropdown(false);
        if (difficultyDropdown) setDifficultyDropdown(false);
    };

    const handleCampusSelectDropdown = (campus: string) => {
        setSelectedCampus(campus);
        onCampusSelected(campus);
        setCampusDropdown(false);

        setSelectedClassTime(null);
        onClassTimeSelected("");
        setClassTimeDropdown(false);

        setSelectedDifficulty(null);
        onDifficultySelected("");
        setDifficultyDropdown(false);

        setSelectedStyle(null);
        onStyleSelected("");
        setStyleDropdown(false);
    };

    const handleClassTimeSelectDropdown = (classTime: string) => {
        setSelectedClassTime(classTime);
        onClassTimeSelected(classTime);
        setClassTimeDropdown(false);

        setSelectedDifficulty(null);
        onDifficultySelected("");
        setDifficultyDropdown(false);

        setSelectedStyle(null);
        onStyleSelected("");
        setStyleDropdown(false);
    };

    const handleDifficultySelectDropdown = (difficulty: string) => {
        setSelectedDifficulty(difficulty);
        onDifficultySelected(difficulty);
        setDifficultyDropdown(false);

        setSelectedStyle(null);
        onStyleSelected("");
        setStyleDropdown(false);
    };

    const handleStyleSelectDropdown = (style: string) => {
        setSelectedStyle(style);
        onStyleSelected(style);
        setStyleDropdown(false);
    };

    return (

        <div className="relative group flex">
            <button
                id="campus-Dropdown-button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                onClick={() => toggleCampusSelect()}
            >
                <span className="mr-2">{selectedCampus || "Select a Campus"}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {campusDropdown && (
                <div id="campus-Dropdown-menu" className="absolute mt-12 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ">
                    {campusOptions.map((campus, index) => (
                        <a key={index} href="#" onClick={() => handleCampusSelectDropdown(campus)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md whitespace-nowrap">
                            {campus}
                        </a>
                    ))}
                </div>
            )}

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
                        <div id="classTime-Dropdown-menu" className="min-w-[145px] absolute z-10 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
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
    );
}

export default Dropdown;
