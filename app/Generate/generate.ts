// interface Course {
//     id: string;
//     number: string;
//     name: string;
//     professors: Professor[];
// }

// interface Professor {
//     id: string;
//     name: string;
//     difficultyRating: number;
//     teachingStyle: string;
//     campus: string[];
//     day: string[];
//     time: string[];
//     courses: Course[];
// }

// function generateSchedule(
//     courses: Course[],
//     campus: 'Edinburg' | 'Brownsville',
//     difficultyRating: 'Low' | 'Moderate' | 'High' | 'Any',
//     teachingStyle: 'Free' | 'Strict' | 'Mixed' | 'Any',
//     time: 'Morning' | 'Afternoon' | 'Any'
// ): Course[] {
//     return courses.filter(course =>
//         course.professors.some(professor =>
//             professor.campus.includes(campus) &&
//             matchesDifficulty(professor.difficultyRating, difficultyRating) &&
//             (teachingStyle === 'Any' || professor.teachingStyle === teachingStyle) &&
//             professor.time.some(t => time === 'Any' || t === time)
//         )
//     );
// }

// function matchesDifficulty(professorRating: number, desiredDifficulty: string): boolean {
//     switch (desiredDifficulty) {
//         case 'Low':
//             return professorRating >= 1 && professorRating <= 4;
//         case 'Moderate':
//             return professorRating >= 5 && professorRating <= 7;
//         case 'High':
//             return professorRating >= 8 && professorRating <= 10;
//         case 'Any':
//         default:
//             return true;
//     }
// }
