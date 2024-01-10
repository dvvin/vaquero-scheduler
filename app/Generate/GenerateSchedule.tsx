import { useState, useEffect, useRef } from 'react';
import CampusDropdown from './Dropdowns/CampusDropdown';
import ClassTimeDropdown from './Dropdowns/ClassTimeDropdown';
import DifficultyDropdown from './Dropdowns/DifficultyDropdown';
import StyleDropdown from './Dropdowns/StyleDropdown';
import GetSessionData from './GetSessionData';
import GenerateButton from './GenerateButton';
import CourseList from './CourseList/CourseList';
import { courses } from './CourseList/courseData';

const GenerateSchedule: React.FC = () => {
    const [campusDropdown, setCampusDropdown] = useState(false);
    const [classTimeDropdown, setClassTimeDropdown] = useState(false);
    const [difficultyDropdown, setDifficultyDropdown] = useState(false);
    const [styleDropdown, setStyleDropdown] = useState(false);

    const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
    const [selectedClassTime, setSelectedClassTime] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

    const session = GetSessionData();

    const [visibleTimes, setVisibleTimes] = useState<string[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [popupWidth, setPopupWidth] = useState(0);
    const [isPositioned, setIsPositioned] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const [expandedCourses, setExpandedCourses] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

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
            <div style={{ zIndex: 5000 }} className="absolute pt-28 top-0 left-1/2 transform -translate-x-1/2">
                <div className="relative group flex">
                    <CampusDropdown
                        selectedCampus={selectedCampus}
                        setSelectedCampus={setSelectedCampus}
                        classTimeDropdown={classTimeDropdown}
                        setClassTimeDropdown={setClassTimeDropdown}
                        difficultyDropdown={difficultyDropdown}
                        setDifficultyDropdown={setDifficultyDropdown}
                        styleDropdown={styleDropdown}
                        setStyleDropdown={setStyleDropdown}
                    />

                    {selectedCampus && (
                        <ClassTimeDropdown
                            selectedClassTime={selectedClassTime}
                            setSelectedClassTime={setSelectedClassTime}
                            campusDropdown={campusDropdown}
                            setCampusDropdown={setCampusDropdown}
                            difficultyDropdown={difficultyDropdown}
                            setDifficultyDropdown={setDifficultyDropdown}
                            styleDropdown={styleDropdown}
                            setStyleDropdown={setStyleDropdown}
                        />
                    )}

                    {selectedClassTime && (
                        <DifficultyDropdown
                            selectedDifficulty={selectedDifficulty}
                            setSelectedDifficulty={setSelectedDifficulty}
                            campusDropdown={campusDropdown}
                            setCampusDropdown={setCampusDropdown}
                            classTimeDropdown={classTimeDropdown}
                            setClassTimeDropdown={setClassTimeDropdown}
                            styleDropdown={styleDropdown}
                            setStyleDropdown={setStyleDropdown}
                        />
                    )}

                    {selectedDifficulty && (
                        <StyleDropdown
                            selectedStyle={selectedStyle}
                            setSelectedStyle={setSelectedStyle}
                            campusDropdown={campusDropdown}
                            setCampusDropdown={setCampusDropdown}
                            classTimeDropdown={classTimeDropdown}
                            setClassTimeDropdown={setClassTimeDropdown}
                            difficultyDropdown={difficultyDropdown}
                            setDifficultyDropdown={setDifficultyDropdown}
                        />
                    )}
                </div>

                {selectedStyle && (
                    <GenerateButton
                        session={session}
                        selectedCampus={selectedCampus}
                        selectedClassTime={selectedClassTime}
                        selectedDifficulty={selectedDifficulty}
                        selectedStyle={selectedStyle}
                    />
                )}

            </div>

            {selectedStyle && (
                <CourseList
                    courses={courses}
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
                />
            )}
        </>
    );
};

export default GenerateSchedule;
