import { useState, useEffect } from "react";

export interface SessionData {
    user: {
        fullName: string;
        email: string;
        id: string;
        studentID: string;
        classification: string;
    };
    expires: string;
}

export interface StudentInfo {
    email: string;
    studentID: string;
}

export interface ScheduleData {
    id: string;
    StudentInfo: StudentInfo;
    campus: string;
    time: string;
    difficultyRating: string;
    teachingStyle: string;
}

export interface CourseData {
    professors: any;
    name: any;
    number: any;
}

export const useSessionData = (): SessionData | null => {
    const [session, setSession] = useState<SessionData | null>(null);
    // console.log(session);

    useEffect(() => {
        const fetchSession = async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_FETCH_SESSION || '');
            const data: SessionData = await res.json();

            if (data && data.user && data.user.email) {
                setSession(data);
            } else {
                setSession(null);
            }
        };

        fetchSession();
    }, []);

    return session;
}

export const useScheduleData = (): ScheduleData[] => {
    const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);

    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_FETCH_SCHEDULE || '');
                const data: ScheduleData[] = await response.json();
                setScheduleData(data);
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };
        fetchScheduleData();
    }, []);

    return scheduleData;
}

export const useCourseData = (): CourseData[] => {
    const [courseData, setCourseData] = useState<CourseData[]>([]);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_FETCH_COURSES || '');
                const data: CourseData[] = await response.json();
                setCourseData(data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };
        fetchCourseData();
    }, []);

    return courseData;
}

export const useGenerateSchedule = () => {
    const generateSchedule = async (selectedOptions: any) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_GENERATE_SCHEDULE_API || '', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedOptions),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error generating schedule');
        }
    };

    return generateSchedule;
};

export const useRegister = () => {
    const register = async (userData: any) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_REGISTER_API || '', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error during registration');
        }
    };

    return register;
};

export const useDeleteSchedule = () => {
    const deleteSchedule = async (studentID: string) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_FETCH_NEW_SCHEDULE || '', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentID }),
            });

            const data = await response.json();
            console.log('Schedule Deleted:', data);
            return data;
        } catch (error) {
            throw new Error('Error deleting schedule');
        }
    };

    return deleteSchedule;
};
