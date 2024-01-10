'use client';
import Navbar from '../Navbar/page';
import GenerateSchedule from './GenerateSchedule';
import FilterButton from './FilterButton';

const GeneratePage: React.FC = () => {
    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
                <GenerateSchedule />
                {/* <FilterButton /> */}
            </main>
        </>
    );
};

export default GeneratePage;
