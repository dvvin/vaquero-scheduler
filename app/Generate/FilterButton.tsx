import { useEffect, useState } from 'react';

type Course = {
    id: string;
    number: string;
    name: string;
    professors: Professor[];
};

type Professor = {
    id: string;
    name: string;
    difficultyRating: number; // 1-4: "Low" or 5-7: "Moderate" or 8-10: "High" or "Any"
    teachingStyle: string; // "Strict" or "Free" or "Mixed" or "Any"
    campus: string[]; // Edinburg or Brownsville
    day: string[];
    time: string[]; // "X:XX A.M.": "Morning" or "X:XX P.M.": "Afternoon" or "Any"
    courses: Course[];
};

const FilterButton = () => {
    function getDifficultyRating(rating: number): string {
        if (rating <= 4) {
            return "Low";
        } else if (rating <= 7) {
            return "Moderate";
        } else if (rating >= 8) {
            return "High";
        } else {
            return "Any"; // Default case
        }
    }

    function getTime(time: string): string {
        if (time.includes("A.M.")) {
            return "Morning";
        } else if (time.includes("P.M.")) {
            return "Afternoon";
        } else {
            return "Any"; // Default case
        }
    }

    function getStyle(style: string): string {
        if (style === "Strict") {
            return "Strict";
        } else if (style === "Free") {
            return "Free";
        } else if (style === "Mixed") {
            return "Mixed";
        } else {
            return "Any";
        }
    }

    function filterCourses(courses: Course[], rating: string, style: string, campus: string[], timePref: string[]): [Course[], string | null] {
        let conflictWarning: string | null = null;

        const filteredCourses = courses.map(course => {
            let timeDayMap = new Map<string, string[]>();

            const filteredProfessors = course.professors.map(professor => {
                const isRatingMatch = rating === "Any" || getDifficultyRating(professor.difficultyRating) === rating;
                const isStyleMatch = style === "Any" || professor.teachingStyle === style;
                const isCampusMatch = campus.length === 0 || campus.includes(professor.campus[0]);

                let filteredTimes = timePref.includes("Any")
                    ? professor.time
                    : professor.time.filter(t => timePref.includes(getTime(t)));


                // Check for time conflicts within the same course
                filteredTimes.forEach(time => {
                    professor.day.forEach(day => {
                        const timeDayKey = `${day}-${time}`;
                        if (!timeDayMap.has(timeDayKey)) {
                            timeDayMap.set(timeDayKey, []);
                        }
                        timeDayMap.get(timeDayKey)?.push(professor.name);
                    });
                });

                if (isRatingMatch && isStyleMatch && isCampusMatch && filteredTimes.length > 0) {
                    return { ...professor, time: filteredTimes };
                }
                return null;
            }).filter(p => p !== null);

            // Check for conflicts after processing all professors in a course
            timeDayMap.forEach((professors, timeDayKey) => {
                if (professors.length > 1) {
                    conflictWarning = `Warning: Conflicting class times for ${professors.join(" and ")} on ${timeDayKey.replace('-', ' at ')}.`;
                }
            });

            if (filteredProfessors.length > 0) {
                return { ...course, professors: filteredProfessors };
            }
            return null;
        }).filter(course => course !== null); // Filter out null courses

        return [filteredCourses as Course[], conflictWarning];
    }

    const [courses, setCourses] = useState<Course[]>([]);
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

    const handleFilter = () => {
        const [filteredCourses, conflictWarning] = filterCourses(courses, "Any", "Any", ["Brownsville"], ["Any"]);
        console.log(JSON.stringify(filteredCourses, null, 2));
        if (conflictWarning) {
            console.warn(conflictWarning);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
}

export default FilterButton;
