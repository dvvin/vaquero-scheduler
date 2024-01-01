import { useState } from 'react';

interface UserSelectionsProps {
    onYearSelected: (year: string) => void;
    onCatalogSelected: (catalog: string) => void;
}

const UserSelections: React.FC<UserSelectionsProps> = ({ onYearSelected, onCatalogSelected }) => {
    const [yearDropdown, setyearDropdown] = useState(false);
    const [catalogDropdown, setcatalogDropdown] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedCatalog, setSelectedCatalog] = useState<string | null>(null);

    const yearSelectOptions = [
        "2023-2024",
        "2024-2025",
    ];

    const catalogSelectOptions = [
        "Bachelor of Science Computer Science",
        "Bachelor of Science Computer Engineering"
    ];

    const toggleYearSelect = () => {
        setyearDropdown(!yearDropdown);
        if (catalogDropdown) {
            setcatalogDropdown(false);
        }
    };

    const toggleCatalogSelect = () => {
        setcatalogDropdown(!catalogDropdown);
        if (yearDropdown) {
            setyearDropdown(false);
        }
    };

    const handleYearSelectDropdown = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, year: string) => {
        event.stopPropagation();
        setSelectedYear(year);
        onYearSelected(year);
        setyearDropdown(false);
        setSelectedCatalog(null);
        onCatalogSelected("");
        setcatalogDropdown(false);
    };

    const handleCatalogSelectDropdown = (catalog: string) => {
        setSelectedCatalog(catalog);
        onCatalogSelected(catalog);
        setcatalogDropdown(false);
    }

    return (
        <div style={{ zIndex: 5000 }} className="absolute pt-28 top-0 left-1/2 transform -translate-x-1/2">
            <div className="relative group flex">
                <div>
                    <button
                        id="first-Dropdown-button"
                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                        onClick={toggleYearSelect}
                    >
                        <span className="mr-2">{selectedYear || "Select a year"}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {yearDropdown && (
                        <div id="first-Dropdown-menu" style={{ minWidth: '300px' }} className="absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                            {yearSelectOptions.map((year, index) => (
                                <a key={index} href="#" onClick={(event) => handleYearSelectDropdown(event, year)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md whitespace-nowrap">
                                    {year}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {selectedYear && (
                    <div className="ml-2">
                        <button
                            id="second-Dropdown-button"
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                            onClick={toggleCatalogSelect}
                        >
                            <span className="mr-2">{selectedCatalog || "Select a catalog"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {catalogDropdown && (
                            <div id="second-Dropdown-menu" style={{ minWidth: '300px' }} className="absolute z-10 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                                {catalogSelectOptions.map((catalog, index) => (
                                    <a key={index} href="#" onClick={() => handleCatalogSelectDropdown(catalog)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md whitespace-nowrap">
                                        {catalog}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserSelections;
