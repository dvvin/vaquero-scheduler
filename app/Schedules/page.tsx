'use client';
import Navbar from '../Navbar/page';
import ViewSchedules from './ViewSchedules';
import { useState, useCallback, useRef, useMemo, useEffect } from 'react';

const SchedulesPage: React.FC = () => {
    const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
    const [selectedClassTime, setSelectedClassTime] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

    const [visibleTimes, setVisibleTimes] = useState<string[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [popupWidth, setPopupWidth] = useState(0);
    const [isPositioned, setIsPositioned] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [scheduleExpandedCourses, setScheduleExpandedCourses] = useState<Record<number, string[]>>({});

    const toggleCourseDetails = useCallback((scheduleIndex: number, number: string) => {
        setScheduleExpandedCourses((prev) => {
            const updatedExpandedCourses = { ...prev };
            if (updatedExpandedCourses[scheduleIndex]?.includes(number)) {
                updatedExpandedCourses[scheduleIndex] = updatedExpandedCourses[scheduleIndex].filter(
                    (cn) => cn !== number
                );
            } else {
                updatedExpandedCourses[scheduleIndex] = updatedExpandedCourses[scheduleIndex]
                    ? [...updatedExpandedCourses[scheduleIndex], number]
                    : [number];
            }
            return updatedExpandedCourses;
        });
    }, []);

    const [scheduleSearchQueries, setScheduleSearchQueries] = useState<Record<number, string>>({});

    const handleSearchChange = useCallback((scheduleIndex: number, value: string) => {
        setScheduleSearchQueries(prev => ({
            ...prev,
            [scheduleIndex]: value
        }));
    }, []);

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

    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setShowPopup(false);
        }
    }, []);

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

    const [activePopupScheduleId, setActivePopupScheduleId] = useState<number | null>(null);

    const togglePopup = useCallback((times: string[], scheduleId: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setVisibleTimes(times);
        setShowPopup(!showPopup);
        setActivePopupScheduleId(scheduleId);
    }, [showPopup]);

    const filterCriteria = useMemo(() => ({
        campus: selectedCampus || "",
        time: selectedClassTime || "",
        difficultyRating: selectedDifficulty || "",
        teachingStyle: selectedStyle || "",
    }), [selectedCampus, selectedClassTime, selectedDifficulty, selectedStyle]);

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" />
                <ViewSchedules
                    scheduleExpandedCourses={scheduleExpandedCourses}
                    toggleCourseDetails={toggleCourseDetails}
                    scheduleSearchQueries={scheduleSearchQueries}
                    handleSearchChange={handleSearchChange}
                    searchQuery={searchQuery}
                    togglePopup={togglePopup}
                    visibleTimes={visibleTimes}
                    showPopup={showPopup}
                    popupPosition={popupPosition}
                    popupWidth={popupWidth}
                    isPositioned={isPositioned}
                    popupRef={popupRef}
                    filterCriteria={filterCriteria}
                    activePopupScheduleId={activePopupScheduleId}
                />
            </main>
        </>
    );
};

export default SchedulesPage;
