import { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdowns';
import GetSessionData from './GetSessionData';
import GenerateButton from './GenerateButton';
import CourseList from './CourseList';

const GenerateSchedule: React.FC = () => {
    const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
    const [selectedClassTime, setSelectedClassTime] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

    const [getScheduleData, setGetScheduleData] = useState<any[]>([]);
    const [isScheduleGenerated, setIsScheduleGenerated] = useState(false);

    const session = GetSessionData();

    const [visibleTimes, setVisibleTimes] = useState<string[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [popupWidth, setPopupWidth] = useState(0);
    const [isPositioned, setIsPositioned] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const [expandedCourses, setExpandedCourses] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchGetScheduleData = async () => {
            try {
                const response = await fetch('/api/getSchedule');
                const data = await response.json();
                setGetScheduleData(data);
            } catch (error) {
                console.error('Error fetching getSchedule data:', error);
            }
        };
        fetchGetScheduleData();
    }, []);

    const isSessionDataValid = () => {
        return getScheduleData.some(schedule =>
            schedule.StudentInfo.email === session?.user.email &&
            schedule.StudentInfo.studentID === session?.user.studentID
        );
    };

    const onScheduleGenerated = () => {
        setIsScheduleGenerated(true);
    };

    const shouldShowDropdownAndButton = () => {
        return session && !isScheduleGenerated && !isSessionDataValid();
    };

    const shouldShowCourseList = () => {
        return session && (isScheduleGenerated || isSessionDataValid());
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

    const toggleCourseDetails = (number: string) => {
        setExpandedCourses(prev => {
            if (prev.includes(number)) {
                return prev.filter(cn => cn !== number);
            } else {
                return [...prev, number];
            }
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            {shouldShowDropdownAndButton() && (
                <div style={{ zIndex: 5000 }} className="absolute pt-28 top-0 left-1/2 transform -translate-x-1/2">
                    <Dropdown
                        onCampusSelected={(campus) => setSelectedCampus(campus)}
                        onClassTimeSelected={(classTime) => setSelectedClassTime(classTime)}
                        onDifficultySelected={(difficulty) => setSelectedDifficulty(difficulty)}
                        onStyleSelected={(style) => setSelectedStyle(style)}
                    />

                    {selectedStyle && (
                        <GenerateButton
                            session={session}
                            selectedCampus={selectedCampus}
                            selectedClassTime={selectedClassTime}
                            selectedDifficulty={selectedDifficulty}
                            selectedStyle={selectedStyle}
                            onScheduleGenerated={onScheduleGenerated}
                        />
                    )}
                </div>
            )}

            {shouldShowCourseList() && (
                <CourseList
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
                    filterCriteria={{
                        campus: selectedCampus || "",
                        time: selectedClassTime || "",
                        difficultyRating: selectedDifficulty || "",
                        teachingStyle: selectedStyle || "",
                    }}
                />
            )}
        </>
    );
};

export default GenerateSchedule;
