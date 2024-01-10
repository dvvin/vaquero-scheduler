interface ProfessorInfo {
    name: string;
    difficultyRating: number;
    teachingStyle: string;
    campus: string[];
    day: string[];
    time: string[];
}

export interface CourseInfo {
    number: string;
    name: string;
    professors: ProfessorInfo[];
}

export const courses: CourseInfo[] = [
    {
        name: "Introduction to Computer Science",
        number: "1301",
        professors: [
            {
                name: "John Doe",
                difficultyRating: 3,
                teachingStyle: "Free",
                campus: ["Edinburg"],
                day: ["M/W"],
                time: ["12:00 P.M"]
            },
            {
                name: "Jane Doe",
                difficultyRating: 2,
                teachingStyle: "Strict",
                campus: ["Brownsville"],
                day: ["T/TR"],
                time: ["2:00 P.M"]
            }
        ]
    },
    {
        name: "Advanced Programming",
        number: "1302",
        professors: [
            {
                name: "Tim Wylie",
                difficultyRating: 5,
                teachingStyle: "Strict",
                campus: ["Edinburg"],
                day: ["M/W"],
                time: ["9:00 A.M"]
            },
            {
                name: "Jane Doe",
                difficultyRating: 9,
                teachingStyle: "Mixed",
                campus: ["Brownsville"],
                day: ["T/TR"],
                time: ["10:00 A.M"]
            }
        ]
    }
];
