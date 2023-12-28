import React, { useState, useEffect, useRef } from 'react';

interface ClassInfo {
    name: string;
    professor: string;
    difficulty: string;
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
                left: button.offsetLeft - currentPopupWidth
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
            {classes.map((classInfo, index) => (
                <tr key={index} className="border-b border-dashed last:border-b-0">
                    <td className="p-3 pl-0">
                        <div className="flex items-center">
                            <div className="flex flex-col justify-start">
                                <a className="mb-1 font-semibold transition-colors duration-200 ease-in-out
                                    text-lg/normal text-secondary-inverse hover:text-primary">
                                    {classInfo.name}
                                </a>
                            </div>
                        </div>
                    </td>

                    <td className="p-3 pr-8 text-center">
                        <span className="font-semibold text-light-inverse text-md/normal">
                            {classInfo.professor}
                        </span>
                    </td>

                    <td className=" pl-8 text-center">
                        <span className={
                            `text-start align-baseline inline-flex px-4 py-3 mr-auto items-center
                                font-semibold text-[.95rem] leading-none rounded-lg
                                ${classInfo.difficulty === "Moderate"
                                ? "text-warning bg-warning-light"
                                : classInfo.difficulty === "Low"
                                    ? "text-success bg-success-light"
                                    : "text-danger bg-danger-light"
                            }`}>
                            {classInfo.difficulty}
                        </span>
                    </td>

                    <td className="p-3 pr-8 text-center">
                        <span className="font-semibold text-light-inverse text-md/normal">
                            {classInfo.style}
                        </span>
                    </td>

                    <td className="p-3 pr-8 text-center">
                        <span className="font-semibold text-light-inverse text-md/normal">
                            {classInfo.campus}
                        </span>
                    </td>

                    <td className="p-3 pr-2 text-center">
                        <button onClick={(e) => togglePopup(classInfo.time, e)}
                            className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary
                            flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center
                            align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none
                            border-0 justify-center">
                            <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-4 h-4 scale-x-[-1]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </button>
                    </td>
                </tr>
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
