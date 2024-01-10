import { CourseInfo } from "./courseData";

interface CourseListProps {
    courses: CourseInfo[];
    toggleCourseDetails: (number: string) => void;
    searchQuery: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    expandedCourses: string[];
    showPopup: boolean;
    popupRef: React.RefObject<HTMLDivElement>;
    isPositioned: boolean;
    popupPosition: { top: number, left: number };
    visibleTimes: string[];
    togglePopup: (times: string[], event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    popupWidth: number;
}

const CourseList: React.FC<CourseListProps> = ({
    courses,
    toggleCourseDetails,
    searchQuery,
    handleSearchChange,
    expandedCourses,
    showPopup,
    popupRef,
    isPositioned,
    popupPosition,
    visibleTimes,
    togglePopup,
    popupWidth
}) => {

    const filteredCourses = courses.filter(course =>
        course.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-wrap">
            <div className="w-3/4 mt-24 pt-44 mx-auto">
                <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                    <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                        <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                            <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                                <span className="mr-3 font-semibold text-dark">Your Schedule</span>
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

                                    <tbody>
                                        {filteredCourses.map(course => (
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
                                                    width: popupWidth,
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
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseList;
