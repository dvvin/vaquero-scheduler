import { useEffect, useState } from 'react';
import CSCI_CatalogInfo from './Info';

interface ProfessorInfo {
    name: string;
    difficultyRating: number;
    teachingStyle: string;
    campus: string[];
    time: string[];
}

interface CourseInfo {
    number: string;
    name: string;
    professors: ProfessorInfo[];
}

const CSCI_Catalog: React.FC = () => {
    const [courses, setCourses] = useState<CourseInfo[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/csci-catalog');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
            <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-3/4  mb-6 pt-40 mx-auto">
                    <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                                    <span className="mr-3 font-semibold text-dark">2023-2024</span>
                                </h3>
                            </div>
                            <div className="flex-auto block py-8 pt-6 px-9">
                                <div className="overflow-x-hidden">
                                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                        <thead className="align-bottom">
                                            <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                                <th className="pb-3 pl-0 text-start min-w-[175px]">COURSE</th>
                                                <th className="pb-3 pl-14 text-start min-w-[175px]">CLASS</th>
                                            </tr>
                                        </thead>

                                        <CSCI_CatalogInfo courses={courses} />

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CSCI_Catalog;
