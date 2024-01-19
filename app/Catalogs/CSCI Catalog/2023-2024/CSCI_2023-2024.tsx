import { useEffect, useState } from 'react';
import Navbar from '@/app/Navbar/Navbar';
import CSCI_CatalogInfo from '../Info';
import { useCourseData } from '@/app/GetSessionData';

interface ProfessorInfo {
    name: string;
    difficultyRating: number;
    teachingStyle: string;
    campus: string[];
    day: string[];
    time: string[];
}

interface CourseInfo {
    number: string;
    name: string;
    professors: ProfessorInfo[];
}

const Catalog_2023_2024: React.FC = () => {
    const courseData = useCourseData();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredCourses = courseData.filter(course =>
        course.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
                    <div className="flex flex-wrap">
                        <div className="w-3/4 pt-44 mx-auto">
                            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                                <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                                    <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                                        <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                                            <span className="mr-3 font-semibold text-dark">2023-2024</span>
                                        </h3>
                                        <div className="relative mr-1 max-w-sm mx-auto mt-4">
                                            <input className="text-black py-2 px-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 "
                                                type="search"
                                                placeholder="Search Courses"
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-auto block py-8 pt-6 px-9">
                                        <div className="">
                                            <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                                <thead className="align-bottom">
                                                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                                        <th className="pb-3 pl-0 text-start min-w-[175px]">COURSE</th>
                                                        <th className="pb-3 pl-14 text-start min-w-[175px]">CLASS</th>
                                                    </tr>
                                                </thead>

                                                <CSCI_CatalogInfo courses={filteredCourses} />

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </main>
        </>
    );
};

export default Catalog_2023_2024;
