import React, { useState, useEffect, useRef } from 'react';

interface ClassInfo {
    courseNumber: string;
    name: string;
    professor: string;
    difficulty: number;
    style: string;
    campus: string;
    time: string[];
}

interface CSCI_CatalogInfoProps {
    classes: ClassInfo[];
}

const CSCI_CatalogInfo: React.FC<CSCI_CatalogInfoProps> = ({ classes }) => {
    const [visibleTimes, setVisibleTimes] = useState<string[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [popupWidth, setPopupWidth] = useState(0);
    const [isPositioned, setIsPositioned] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const [expandedCourses, setExpandedCourses] = useState<string[]>([]);

    const toggleCourseDetails = (courseNumber: string) => {
        setExpandedCourses(prev => {
            if (prev.includes(courseNumber)) {
                return prev.filter(cn => cn !== courseNumber);
            } else {
                return [...prev, courseNumber];
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
            {classes.map((classInfo) => (
                <>
                    <tr key={classInfo.courseNumber} className="border-b border-dashed last:border-b-0">
                        <td className="p-3 text-start">
                            {classInfo.courseNumber}
                        </td>
                        <td className="p-3 pl-0" onClick={() => toggleCourseDetails(classInfo.courseNumber)}>
                            <a className="font-semibold cursor-pointer text-lg/normal text-secondary-inverse hover:text-primary">
                                {classInfo.name}
                            </a>
                        </td>
                    </tr>
                    {expandedCourses.includes(classInfo.courseNumber) && (
                        <tr className="border-b border-dashed last:border-b-0">
                            <td colSpan={7}>
                                <div className="w-full overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                                <th className="text-center p-3">PROFESSOR</th>
                                                <th className="text-center p-3">DIFFICULTY</th>
                                                <th className="text-center p-3">STYLE</th>
                                                <th className="text-center p-3">CAMPUS</th>
                                                <th className="text-center p-3">TIME</th>
                                            </tr>
                                        </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 pr-10 text-center">
                                                <span className="font-semibold text-light-inverse text-md/normal">
                                                    {classInfo.professor}
                                                </span>
                                            </td>
                                            <td className="pl-0 text-center">
                                                <span className={
                                                    `text-start align-baseline inline-flex px-4 py-3 mr-auto items-center
                                                    font-semibold text-[.95rem] leading-none rounded-lg
                                                    ${classInfo.difficulty >= 1 && classInfo.difficulty <= 4
                                                        ? "text-success bg-success-light"
                                                        : classInfo.difficulty >= 5 && classInfo.difficulty <= 7
                                                            ? "text-warning bg-warning-light"
                                                            : "text-danger bg-danger-light"
                                                    }`}>
                                                    {classInfo.difficulty >= 1 && classInfo.difficulty <= 4
                                                        ? "Low"
                                                        : classInfo.difficulty >= 5 && classInfo.difficulty <= 7
                                                            ? "Moderate"
                                                            : "High"
                                                    }
                                                </span>
                                            </td>

                                            <td className="p-3 pl-8 text-center">
                                                <span className="font-semibold text-light-inverse text-md/normal">
                                                    {classInfo.style}
                                                </span>
                                            </td>

                                            <td className="p-3 pl-10 text-center">
                                                <span className="font-semibold text-light-inverse text-md/normal">
                                                    {classInfo.campus}
                                                </span>
                                            </td>

                                            <td className="p-3 pr-2 text-center">
                                                <button onClick={(e) => togglePopup(classInfo.time, e)}
                                                    className="relative text-secondary-dark bg-light-dark hover:text-primary
                                                    flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center
                                                    align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none
                                                    border-0 justify-center m-auto">
                                                    <span className="flex items-center justify-center pl-0 m-0 leading-none shrink-0 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                            stroke="currentColor" className="w-4 h-4 scale-x-[-1]">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
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
                            <div key={index} className="mb-1">
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
