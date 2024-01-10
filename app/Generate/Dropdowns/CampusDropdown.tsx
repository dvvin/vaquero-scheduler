import { useState } from 'react';

interface CampusDropdownProps {
    selectedCampus: string | null;
    setSelectedCampus: (campus: string) => void;
    classTimeDropdown: boolean;
    setClassTimeDropdown: (value: boolean) => void;
    difficultyDropdown: boolean;
    setDifficultyDropdown: (value: boolean) => void;
    styleDropdown: boolean;
    setStyleDropdown: (value: boolean) => void;
}

const CampusDropdown: React.FC<CampusDropdownProps> = ({ selectedCampus, setSelectedCampus, classTimeDropdown, setClassTimeDropdown,
    difficultyDropdown, setDifficultyDropdown, styleDropdown, setStyleDropdown }) => {

    const [campusDropdown, setCampusDropdown] = useState(false);
    const campusOptions = ["Edinburg", "Brownsville"];

    const toggleCampusSelect = () => {
        setCampusDropdown(!campusDropdown);
        if (classTimeDropdown) setClassTimeDropdown(false);
        if (difficultyDropdown) setDifficultyDropdown(false);
        if (styleDropdown) setStyleDropdown(false);
    };

    const handleCampusSelectDropdown = (campus: string) => {
        setSelectedCampus(campus);
        setCampusDropdown(false);
    };

    return (
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
    );
};

export default CampusDropdown;
