'use client';
import Navbar from '../Navbar/page';
import ViewSchedules from './ViewSchedules';
import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { useSessionData, useCourseData, useScheduleData } from '../GetSessionData';

const SchedulesPage: React.FC = () => {
    const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
    const [selectedClassTime, setSelectedClassTime] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

    const [isScheduleGenerated, setIsScheduleGenerated] = useState(false);
    const session = useSessionData();
    const getScheduleData = useScheduleData();
    const [scheduleSaved, setScheduleSaved] = useState(false);

    const [visibleTimes, setVisibleTimes] = useState<string[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [popupWidth, setPopupWidth] = useState(0);
    const [isPositioned, setIsPositioned] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const [expandedCourses, setExpandedCourses] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleCourseDetails = useCallback((number: string) => {
        setExpandedCourses(prev => {
            if (prev.includes(number)) {
                return prev.filter(cn => cn !== number);
            } else {
                return [...prev, number];
            }
        });
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
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

    const togglePopup = useCallback((times: string[], event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setVisibleTimes(times);
        setShowPopup(!showPopup);
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
                    expandedCourses={expandedCourses}
                    toggleCourseDetails={toggleCourseDetails}
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
                />
            </main>
        </>
    );
};

export default SchedulesPage;
