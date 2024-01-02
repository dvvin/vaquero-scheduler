'use client';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import UserSelections from './UserSelections';
import Catalog_2023_2024 from './CSCI Catalog/2023-2024/CSCI_2023-2024';
import Catalog_2024_2025 from './CSCI Catalog/2023-2024/CSCI_2024-2025';


const Catalogs: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedCatalog, setSelectedCatalog] = useState<string | null>(null);

    return (
        <>
            <Navbar />
            <UserSelections
                onYearSelected={setSelectedYear}
                onCatalogSelected={setSelectedCatalog}
            />
            <main className="bg-gray-100 min-h-screen">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
                {selectedYear === '2023-2024' && selectedCatalog === 'Bachelor of Science Computer Science' && (
                    <Catalog_2023_2024 />
                )}
                {selectedYear === '2024-2025' && selectedCatalog === 'Bachelor of Science Computer Science' && (
                    <Catalog_2024_2025 />
                )}
            </main>
        </>
    );
};

export default Catalogs;
