import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Dropdown from './Dropdowns';
import { useSessionData, useScheduleData } from '../GetSessionData';
import GenerateButton from './GenerateButton';
import CourseList from './CourseList';
import SaveScheduleButton from './SaveScheduleButton';

const GenerateSchedule: React.FC = () => {
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

    const isUserSignedIn = session != null;

    const isSessionDataValid = useCallback(() => {
        return getScheduleData.some(schedule =>
            schedule.StudentInfo.email === session?.user.email &&
            schedule.StudentInfo.studentID === session?.user.studentID
        );
    }, [getScheduleData, session?.user.email, session?.user.studentID]);

    const onScheduleGenerated = useCallback(() => {
        setIsScheduleGenerated(true);
        setScheduleSaved(false);
    }, []);

    const onScheduleSaved = () => {
        resetScheduleGeneration();
        setScheduleSaved(true);
        setIsScheduleGenerated(false);

        setTimeout(() => {
            setScheduleSaved(false);
        }, 2000);
    };

    const courseListStyle = {
        marginTop: scheduleSaved ? '4rem' : '0',
    };

    const shouldShowDropdownAndButton = useMemo(() => {
        return session && !isScheduleGenerated || scheduleSaved;
    }, [session, isScheduleGenerated, scheduleSaved]);

    const shouldShowCourseList = useMemo(() => {
        return session && isScheduleGenerated && !scheduleSaved;
    }, [session, isScheduleGenerated, scheduleSaved]);

    const resetScheduleGeneration = () => {
        setIsScheduleGenerated(false);
        setSelectedCampus(null);
        setSelectedClassTime(null);
        setSelectedDifficulty(null);
        setSelectedStyle(null);
    };

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

    const filterCriteria = useMemo(() => ({
        campus: selectedCampus || "",
        time: selectedClassTime || "",
        difficultyRating: selectedDifficulty || "",
        teachingStyle: selectedStyle || "",
    }), [selectedCampus, selectedClassTime, selectedDifficulty, selectedStyle]);

    return (
        <>
            {!isUserSignedIn && (
                <div style={{ zIndex: 5000 }} className="absolute text-red-400 pt-28 top-0 left-1/2 transform -translate-x-1/2">
                    <p>You must be signed in to use the Scheduler</p>
                </div>
            )}

            {scheduleSaved && (
                <div style={{ zIndex: 5000 }} className="absolute text-green-400 pt-44 top-0 left-1/2 transform -translate-x-1/2">
                    Schedule saved successfully!
                </div>
            )}

            {isUserSignedIn && shouldShowDropdownAndButton && (
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

            {isUserSignedIn && shouldShowCourseList && (
                <>
                    <SaveScheduleButton session={session} onScheduleSaved={onScheduleSaved} />

                    <div style={courseListStyle}>
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
                            filterCriteria={filterCriteria}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default GenerateSchedule;
