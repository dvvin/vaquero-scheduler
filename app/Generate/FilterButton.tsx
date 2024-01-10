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

const jsonData = `
[
    {
        "id":"clqqkaawp000010felbymt1jm",
        "number":"1101",
        "name":"Introduction to Computer Science",
        "professors":[
            {
                "id":"clqqkcmmo000210fencutghcf",
                "name":"Charlie Ticer",
                "difficultyRating":9,
                "teachingStyle":"Free",
                "campus":["Brownsville"],
                "day":["M/W"],
                "time":["9:00 A.M.","1:00 P.M."],
                "courses":[
                    {
                        "id":"clqqkaawp000010felbymt1jm",
                        "number":"1101",
                        "name":"Introduction to Computer Science"
                    }
                ]
            },
            {
                "id":"clqqkdvqt000310feqmznl458",
                "name":"Robert Schweller",
                "difficultyRating":3,
                "teachingStyle":"Mixed",
                "campus":["Edinburg"],
                "day":["M/W"],
                "time":["10:00 A.M.", "4:00 P.M."],
                "courses":[
                    {
                        "id":"clqqkaawp000010felbymt1jm",
                        "number":"1101",
                        "name":"Introduction to Computer Science"
                    }
                ]
            }
        ]
    },
    {
        "id":"clqqkauuo000110fe01yp708s",
        "number":"1470",
        "name":"Computer Science I",
        "professors":[
            {
                "id":"clqqkfi6h000410feljx3uukt",
                "name":"Charlie Ticer",
                "difficultyRating":5,
                "teachingStyle":"Strict",
                "campus":["Edinburg"],
                "day":["T/TR"],
                "time":["12:00 P.M.","2:00 P.M."],
                "courses":[
                    {
                        "id":"clqqkauuo000110fe01yp708s",
                        "number":"1470",
                        "name":"Computer Science I"
                    }
                ]
            },
            {
                "id":"clqqkhiof000510febq4xdhfl",
                "name":"Robert Schweller",
                "difficultyRating":8,
                "teachingStyle":"Free",
                "campus":["Brownsville"],
                "day":["T/TR"],
                "time":["1:00 P.M.","3:00 P.M."],
                "courses":[
                    {
                        "id":"clqqkauuo000110fe01yp708s",
                        "number":"1470",
                        "name":"Computer Science I"
                    }
                ]
            }
        ]
    }
]`;

function getDifficultyRating(rating: number): string {
    if (rating <= 4) {
        return "Low";
    } else if (rating <= 7) {
        return "Moderate";
    } else {
        return "High";
    }
}

function getTime(time: string): string {
    if (time.includes("A.M.")) {
        return "Morning";
    } else if (time.includes("P.M.")) {
        return "Afternoon";
    } else {
        return "Any";
    }
}

function getStyle(style: string): string {
    if (style === "Strict") {
        return "Strict";
    } else if (style === "Free") {
        return "Free";
    } else {
        return "Mixed";
    }
}

function filterCourses(courses: Course[], rating: string, style: string, campus: string[], timePref: string[]): [Course[], string | null] {
    let conflictWarning: string | null = null;

    const filteredCourses = courses.map(course => {
        let timeDayMap = new Map<string, string[]>(); // Map to track day and time for each course

        const filteredProfessors = course.professors.map(professor => {
            const isRatingMatch = getDifficultyRating(professor.difficultyRating) === rating;
            const isStyleMatch = professor.teachingStyle === style;
            const isCampusMatch = campus.length === 0 || campus.includes(professor.campus[0]);

            let filteredTimes = professor.time.filter(t => timePref.includes(getTime(t)) || timePref.includes("Any"));

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
        }).filter(p => p !== null); // Remove null entries

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

const courses: Course[] = JSON.parse(jsonData);
const [filteredCourses, conflictWarning] = filterCourses(courses, "High", "Free", ["Brownsville"], ["Afternoon"]);

console.log(JSON.stringify(filteredCourses, null, 2));
if (conflictWarning) {
    console.warn(conflictWarning);
}

const FilterButton = () => {
    return (
        <div>
            <button>Filter</button>
        </div>
    );
}

export default FilterButton;
