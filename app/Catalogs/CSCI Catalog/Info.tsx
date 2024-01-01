import { useState, useEffect, useRef } from 'react';

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

interface CSCI_CatalogInfoProps {
    courses: CourseInfo[];
}

const CSCI_CatalogInfo: React.FC<CSCI_CatalogInfoProps> = ({ courses }) => {
    const [visibleTimes, setVisibleTimes] = useState<string[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [popupWidth, setPopupWidth] = useState(0);
    const [isPositioned, setIsPositioned] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const [expandedCourses, setExpandedCourses] = useState<string[]>([]);

    const toggleCourseDetails = (number: string) => {
        setExpandedCourses(prev => {
            if (prev.includes(number)) {
                return prev.filter(cn => cn !== number);
            } else {
                return [...prev, number];
            }
        });
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setShowPopup(false);
            setIsPositioned(false);
        }
    };

    useEffect(() => {
        if (showPopup) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showPopup]);


    useEffect(() => {
        if (showPopup && popupRef.current) {
            const currentPopupWidth = popupRef.current.offsetWidth;
            setPopupWidth(currentPopupWidth);

            const button = document.activeElement as HTMLButtonElement;
            setPopupPosition({
                top: button.offsetTop,
                left: button.offsetLeft + button.offsetWidth
            });

            setIsPositioned(true);
        }
    }, [showPopup, visibleTimes]);


    const togglePopup = (times: string[], event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setVisibleTimes(times);
        setShowPopup(!showPopup);
        setIsPositioned(false);
    };

    return (
        <tbody>
            {courses.map((course) => (
                <>
                    <tr key={course.number} className="border-b border-dashed last:border-b-0">
                        <td className="p-3 text-start">
                            {course.number}
                        </td>
                        <td className="p-3 pl-0">
                            <a className="font-semibold cursor-pointer text-lg/normal text-secondary-inverse hover:text-primary"
                                onClick={() => toggleCourseDetails(course.number)}>
                                {course.name}
                            </a>
                        </td>
                    </tr>
                    {expandedCourses.includes(course.number) && (
                        <tr className="border-b border-dashed last:border-b-0">
                            <td colSpan={7}>
                                <div className="w-full">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                                <th className="text-center p-3">PROFESSOR</th>
                                                <th className="text-center p-3">DIFFICULTY</th>
                                                <th className="text-center p-3">STYLE</th>
                                                <th className="text-center p-3">CAMPUS</th>
                                                <th className="text-center p-3">DAY</th>
                                                <th className="text-center p-3">TIME</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {course.professors.map((professor, index) => (
                                                <tr key={index}>

                                                    <td className="p-3 pr-10 text-center">
                                                        <span className="font-semibold text-light-inverse text-md/normal">
                                                            {professor.name}
                                                        </span>
                                                    </td>
                                                    <td className="pl-0 text-center">
                                                        <span className={
                                                            `text-start align-baseline inline-flex px-4 py-3 mr-auto items-center
                                                                font-semibold text-[.95rem] leading-none rounded-lg
                                                                ${professor.difficultyRating >= 1 && professor.difficultyRating <= 4
                                                                ? "text-success bg-success-light"
                                                                : professor.difficultyRating >= 5 && professor.difficultyRating <= 7
                                                                    ? "text-warning bg-warning-light"
                                                                    : "text-danger bg-danger-light"
                                                            }`}>
                                                            {professor.difficultyRating >= 1 && professor.difficultyRating <= 4
                                                                ? "Low"
                                                                : professor.difficultyRating >= 5 && professor.difficultyRating <= 7
                                                                    ? "Moderate"
                                                                    : "High"
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="p-3 pl-8 text-center">
                                                        <span className="font-semibold text-light-inverse text-md/normal">
                                                            {professor.teachingStyle}
                                                        </span>
                                                    </td>

                                                    <td className="p-3 pl-10 text-center">
                                                        <span className="font-semibold text-light-inverse text-md/normal">
                                                            {professor.campus.join(', ')}
                                                        </span>
                                                    </td>

                                                    <td className="p-3 pl-10 text-center">
                                                        <span className="font-semibold text-light-inverse text-md/normal">
                                                            {professor.day.join(', ')}
                                                        </span>
                                                    </td>

                                                    <td className="p-3 pr-2 text-center">
                                                        <button onClick={(e) => togglePopup(professor.time, e)}
                                                            className="relative text-secondary-dark bg-light-dark hover:text-primary
                                                                flex items-center h-[25px] w-[25px] text-base font-medium leading-normal
                                                                text-center align-middle cursor-pointer rounded-2xl transition-colors
                                                                duration-200 ease-in-out shadow-none border-0 justify-center m-auto">
                                                            <span className="flex items-center justify-center pl-0 m-0 leading-none shrink-0 ">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                                    strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    )}
                </>
            ))}
            {showPopup && (
                <div
                    ref={popupRef}
                    className="absolute border border-gray-300 bg-white p-2 shadow-lg z-10"
                    style={{
                        visibility: isPositioned ? 'visible' : 'hidden',
                        top: `${popupPosition.top}px`,
                        left: `${popupPosition.left}px`
                    }}
                >
                    <div className="text-sm font-sans">
                        {visibleTimes.map((time, index) => (
                            <div key={index} className="">
                                {time}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </tbody>
    );
};

export default CSCI_CatalogInfo;
