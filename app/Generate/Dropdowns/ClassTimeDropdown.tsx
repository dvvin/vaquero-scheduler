import { useState } from "react";

interface CLassTimeDropdownProps {
    selectedClassTime: string | null;
    setSelectedClassTime: (classTime: string) => void;
    campusDropdown: boolean;
    setCampusDropdown: (value: boolean) => void;
    difficultyDropdown: boolean;
    setDifficultyDropdown: (value: boolean) => void;
    styleDropdown: boolean;
    setStyleDropdown: (value: boolean) => void;
}

const ClassTimeDropdown: React.FC<CLassTimeDropdownProps> = ({ selectedClassTime, setSelectedClassTime, campusDropdown, setCampusDropdown,
    difficultyDropdown, setDifficultyDropdown, styleDropdown, setStyleDropdown }) => {

    const [classTimeDropdown, setClassTimeDropdown] = useState(false);
    const classTimeOptions = ["Morning", "Afternoon", "Both"];

    const toggleClassTimeSelect = () => {
        setClassTimeDropdown(!classTimeDropdown);
        if (campusDropdown) setCampusDropdown(false);
        if (difficultyDropdown) setDifficultyDropdown(false);
        if (styleDropdown) setStyleDropdown(false);
    };

    const handleClassTimeSelectDropdown = (classTime: string) => {
        setSelectedClassTime(classTime);
        setClassTimeDropdown(false);
    };

    return (
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
    );
}

export default ClassTimeDropdown;
